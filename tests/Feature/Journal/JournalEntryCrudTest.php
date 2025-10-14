<?php

use App\Models\JournalEntry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('displays paginated journal entries for authenticated user', function () {
    JournalEntry::factory()->count(25)->create(['user_id' => $this->user->id]);
    JournalEntry::factory()->count(5)->create(); // Other users' entries

    $response = $this->actingAs($this->user)
        ->get(route('journal.index', ['locale' => 'es']));

    $response->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('journal/index')
            ->has('entries.data', 20) // First page
            ->has('stats')
            ->has('filters'));
});

it('filters journal entries by asset type', function () {
    JournalEntry::factory()->create(['user_id' => $this->user->id, 'asset_type' => 'stock']);
    JournalEntry::factory()->create(['user_id' => $this->user->id, 'asset_type' => 'crypto']);
    JournalEntry::factory()->create(['user_id' => $this->user->id, 'asset_type' => 'forex']);

    $response = $this->actingAs($this->user)
        ->get(route('journal.index', ['locale' => 'es', 'asset_type' => 'stock']));

    $response->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('journal/index')
            ->has('entries.data', 1)
            ->where('entries.data.0.asset_type', 'stock'));
});

it('filters journal entries by status', function () {
    JournalEntry::factory()->create([
        'user_id' => $this->user->id,
        'exit_price' => 120,
        'entry_price' => 100,
        'quantity' => 10,
        'direction' => 'long',
        'pnl' => 200,
    ]);

    JournalEntry::factory()->create([
        'user_id' => $this->user->id,
        'exit_price' => null,
        'pnl' => null,
    ]);

    $response = $this->actingAs($this->user)
        ->get(route('journal.index', ['locale' => 'es', 'status' => 'closed']));

    $response->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('journal/index')
            ->has('entries.data', 1));
});

it('shows create form for authenticated users', function () {
    $response = $this->actingAs($this->user)
        ->get(route('journal.create', ['locale' => 'es']));

    $response->assertSuccessful()
        ->assertInertia(fn ($page) => $page->component('journal/create'));
});

it('creates a new journal entry with valid data', function () {
    $data = [
        'symbol' => 'AAPL',
        'direction' => 'long',
        'asset_type' => 'stock',
        'entry_price' => 150.00,
        'quantity' => 10,
        'trade_date' => now()->format('Y-m-d'),
        'setup_type' => 'Breakout',
        'notes' => 'Strong momentum breakout above resistance.',
        'tags' => 'momentum, high-confidence',
        'emotion' => 4,
    ];

    $response = $this->actingAs($this->user)
        ->post(route('journal.store', ['locale' => 'es']), $data);

    $response->assertRedirect();

    $this->assertDatabaseHas('journal_entries', [
        'user_id' => $this->user->id,
        'symbol' => 'AAPL',
        'direction' => 'long',
        'entry_price' => 150.00,
    ]);
});

it('calculates pnl when exit price is provided on creation', function () {
    $data = [
        'symbol' => 'TSLA',
        'direction' => 'long',
        'asset_type' => 'stock',
        'entry_price' => 200.00,
        'exit_price' => 220.00,
        'quantity' => 5,
        'trade_date' => now()->format('Y-m-d'),
    ];

    $this->actingAs($this->user)
        ->post(route('journal.store', ['locale' => 'es']), $data);

    $entry = JournalEntry::where('symbol', 'TSLA')->first();

    expect($entry->pnl)->toBe('100.00')
        ->and($entry->pnl_percentage)->toBe('10.0000');
});

it('validates required fields when creating entry', function () {
    $response = $this->actingAs($this->user)
        ->post(route('journal.store', ['locale' => 'es']), []);

    $response->assertSessionHasErrors(['symbol', 'direction', 'asset_type', 'entry_price', 'quantity', 'trade_date']);
});

it('shows journal entry to owner', function () {
    $entry = JournalEntry::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->get(route('journal.show', ['locale' => 'es', 'journal' => $entry->id]));

    $response->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('journal/show')
            ->where('entry.id', $entry->id)
            ->where('entry.symbol', $entry->symbol));
});

it('prevents viewing other users journal entries', function () {
    $otherUser = User::factory()->create();
    $entry = JournalEntry::factory()->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($this->user)
        ->get(route('journal.show', ['locale' => 'es', 'journal' => $entry->id]));

    $response->assertForbidden();
});

it('shows edit form to owner', function () {
    $entry = JournalEntry::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->get(route('journal.edit', ['locale' => 'es', 'journal' => $entry->id]));

    $response->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('journal/edit')
            ->where('entry.id', $entry->id));
});

it('prevents editing other users journal entries', function () {
    $otherUser = User::factory()->create();
    $entry = JournalEntry::factory()->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($this->user)
        ->get(route('journal.edit', ['locale' => 'es', 'journal' => $entry->id]));

    $response->assertForbidden();
});

it('updates journal entry with valid data', function () {
    $entry = JournalEntry::factory()->create([
        'user_id' => $this->user->id,
        'symbol' => 'GOOG',
        'exit_price' => null,
    ]);

    $updateData = [
        'symbol' => 'GOOG',
        'direction' => $entry->direction,
        'asset_type' => $entry->asset_type,
        'entry_price' => $entry->entry_price,
        'exit_price' => 2900.00,
        'quantity' => $entry->quantity,
        'trade_date' => $entry->trade_date->format('Y-m-d'),
        'notes' => 'Updated notes after closing position.',
    ];

    $response = $this->actingAs($this->user)
        ->put(route('journal.update', ['locale' => 'es', 'journal' => $entry->id]), $updateData);

    $response->assertRedirect();

    $entry->refresh();

    expect((float) $entry->exit_price)->toBe(2900.00)
        ->and($entry->notes)->toBe('Updated notes after closing position.')
        ->and($entry->pnl)->not->toBeNull();
});

it('prevents updating other users journal entries', function () {
    $otherUser = User::factory()->create();
    $entry = JournalEntry::factory()->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($this->user)
        ->put(route('journal.update', ['locale' => 'es', 'journal' => $entry->id]), [
            'symbol' => 'TEST',
            'direction' => 'long',
            'asset_type' => 'stock',
            'entry_price' => 100,
            'quantity' => 1,
            'trade_date' => now()->format('Y-m-d'),
        ]);

    $response->assertForbidden();
});

it('deletes journal entry for owner', function () {
    $entry = JournalEntry::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->delete(route('journal.destroy', ['locale' => 'es', 'journal' => $entry->id]));

    $response->assertRedirect(route('journal.index', ['locale' => 'es']));

    $this->assertDatabaseMissing('journal_entries', ['id' => $entry->id]);
});

it('prevents deleting other users journal entries', function () {
    $otherUser = User::factory()->create();
    $entry = JournalEntry::factory()->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($this->user)
        ->delete(route('journal.destroy', ['locale' => 'es', 'journal' => $entry->id]));

    $response->assertForbidden();

    $this->assertDatabaseHas('journal_entries', ['id' => $entry->id]);
});

it('requires authentication for all journal routes', function () {
    $entry = JournalEntry::factory()->create();

    $this->get(route('journal.index', ['locale' => 'es']))->assertRedirect();
    $this->get(route('journal.create', ['locale' => 'es']))->assertRedirect();
    $this->post(route('journal.store', ['locale' => 'es']), [])->assertRedirect();
    $this->get(route('journal.show', ['locale' => 'es', 'journal' => $entry->id]))->assertRedirect();
    $this->get(route('journal.edit', ['locale' => 'es', 'journal' => $entry->id]))->assertRedirect();
    $this->put(route('journal.update', ['locale' => 'es', 'journal' => $entry->id]), [])->assertRedirect();
    $this->delete(route('journal.destroy', ['locale' => 'es', 'journal' => $entry->id]))->assertRedirect();
});

it('calculates accurate trading statistics', function () {
    // Create winning trades
    JournalEntry::factory()->create([
        'user_id' => $this->user->id,
        'entry_price' => 100,
        'exit_price' => 120,
        'quantity' => 10,
        'direction' => 'long',
        'pnl' => 200,
    ]);

    JournalEntry::factory()->create([
        'user_id' => $this->user->id,
        'entry_price' => 50,
        'exit_price' => 60,
        'quantity' => 10,
        'direction' => 'long',
        'pnl' => 100,
    ]);

    // Create losing trade
    JournalEntry::factory()->create([
        'user_id' => $this->user->id,
        'entry_price' => 150,
        'exit_price' => 140,
        'quantity' => 10,
        'direction' => 'long',
        'pnl' => -100,
    ]);

    $response = $this->actingAs($this->user)
        ->get(route('journal.index', ['locale' => 'es']));

    $response->assertInertia(fn ($page) => $page
        ->where('stats.total_trades', 3)
        ->where('stats.win_rate', 66.67)
        ->where('stats.total_pnl', 200));
});
