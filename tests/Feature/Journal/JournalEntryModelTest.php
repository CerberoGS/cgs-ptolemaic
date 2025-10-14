<?php

use App\Models\JournalEntry;
use App\Models\User;

it('belongs to a user', function () {
    $user = User::factory()->create();
    $entry = JournalEntry::factory()->create(['user_id' => $user->id]);

    expect($entry->user)->toBeInstanceOf(User::class)
        ->and($entry->user->id)->toBe($user->id);
});

it('calculates pnl correctly for long positions', function () {
    $entry = JournalEntry::factory()->make([
        'direction' => 'long',
        'entry_price' => 100,
        'exit_price' => 110,
        'quantity' => 10,
        'pnl' => null,
        'pnl_percentage' => null,
    ]);

    $entry->calculatePnL();

    expect($entry->pnl)->toEqual('100.00') // (110 - 100) * 10
        ->and($entry->pnl_percentage)->toEqual('10.0000'); // ((110 - 100) / 100) * 100
});

it('calculates pnl correctly for short positions', function () {
    $entry = JournalEntry::factory()->make([
        'direction' => 'short',
        'entry_price' => 100,
        'exit_price' => 90,
        'quantity' => 10,
        'pnl' => null,
        'pnl_percentage' => null,
    ]);

    $entry->calculatePnL();

    expect($entry->pnl)->toEqual('100.00') // (100 - 90) * 10
        ->and($entry->pnl_percentage)->toEqual('10.0000'); // ((100 - 90) / 100) * 100
});

it('identifies closed trades correctly', function () {
    $closedEntry = JournalEntry::factory()->create(['exit_price' => 150]);
    $openEntry = JournalEntry::factory()->create(['exit_price' => null]);

    expect($closedEntry->isClosed())->toBeTrue()
        ->and($openEntry->isClosed())->toBeFalse();
});

it('identifies profitable trades correctly', function () {
    $profitableEntry = JournalEntry::factory()->create(['pnl' => 100]);
    $losingEntry = JournalEntry::factory()->create(['pnl' => -50]);

    expect($profitableEntry->isProfitable())->toBeTrue()
        ->and($losingEntry->isProfitable())->toBeFalse();
});

it('calculates hold time in minutes correctly', function () {
    $entryTime = now();
    $exitTime = now()->addMinutes(125);

    $entry = JournalEntry::factory()->create([
        'entry_time' => $entryTime,
        'exit_time' => $exitTime,
    ]);

    expect($entry->getHoldTimeInMinutes())->toBe(125);
});

it('formats hold time correctly', function () {
    $entryTime = now();

    // Test minutes only
    $entry1 = JournalEntry::factory()->create([
        'entry_time' => $entryTime,
        'exit_time' => $entryTime->copy()->addMinutes(45),
    ]);
    expect($entry1->getFormattedHoldTime())->toBe('45m');

    // Test hours and minutes
    $entry2 = JournalEntry::factory()->create([
        'entry_time' => $entryTime,
        'exit_time' => $entryTime->copy()->addMinutes(125), // 2h 5m
    ]);
    expect($entry2->getFormattedHoldTime())->toBe('2h 5m');
});

it('returns null for hold time when entry or exit time is missing', function () {
    $entry = JournalEntry::factory()->create([
        'entry_time' => now(),
        'exit_time' => null,
    ]);

    expect($entry->getHoldTimeInMinutes())->toBeNull()
        ->and($entry->getFormattedHoldTime())->toBeNull();
});

it('filters by asset type correctly', function () {
    User::factory()->create()->journalEntries()->createMany([
        ['symbol' => 'AAPL', 'asset_type' => 'stock', 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
        ['symbol' => 'BTC/USD', 'asset_type' => 'crypto', 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
        ['symbol' => 'TSLA', 'asset_type' => 'stock', 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
    ]);

    $stockEntries = JournalEntry::ofAssetType('stock')->get();

    expect($stockEntries)->toHaveCount(2)
        ->and($stockEntries->every(fn ($entry) => $entry->asset_type === 'stock'))->toBeTrue();
});

it('filters profitable trades correctly', function () {
    User::factory()->create()->journalEntries()->createMany([
        ['symbol' => 'AAPL', 'pnl' => 100, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
        ['symbol' => 'TSLA', 'pnl' => -50, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
        ['symbol' => 'NVDA', 'pnl' => 200, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
    ]);

    $profitableTrades = JournalEntry::profitable()->get();

    expect($profitableTrades)->toHaveCount(2)
        ->and($profitableTrades->every(fn ($entry) => $entry->pnl > 0))->toBeTrue();
});

it('filters losing trades correctly', function () {
    User::factory()->create()->journalEntries()->createMany([
        ['symbol' => 'AAPL', 'pnl' => 100, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
        ['symbol' => 'TSLA', 'pnl' => -50, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
        ['symbol' => 'NVDA', 'pnl' => -30, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
    ]);

    $losingTrades = JournalEntry::losing()->get();

    expect($losingTrades)->toHaveCount(2)
        ->and($losingTrades->every(fn ($entry) => $entry->pnl < 0))->toBeTrue();
});

it('filters closed and open trades correctly', function () {
    User::factory()->create()->journalEntries()->createMany([
        ['symbol' => 'AAPL', 'exit_price' => 110, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
        ['symbol' => 'TSLA', 'exit_price' => null, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
        ['symbol' => 'NVDA', 'exit_price' => 95, 'entry_price' => 100, 'quantity' => 10, 'direction' => 'long', 'trade_date' => now()],
    ]);

    $closedTrades = JournalEntry::closed()->get();
    $openTrades = JournalEntry::open()->get();

    expect($closedTrades)->toHaveCount(2)
        ->and($openTrades)->toHaveCount(1);
});

it('casts tags and images as arrays', function () {
    $entry = JournalEntry::factory()->create([
        'tags' => ['momentum', 'high-confidence'],
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);

    expect($entry->tags)->toBeArray()
        ->and($entry->tags)->toBe(['momentum', 'high-confidence'])
        ->and($entry->images)->toBeArray()
        ->and($entry->images)->toBe(['image1.jpg', 'image2.jpg']);
});

it('casts dates correctly', function () {
    $entry = JournalEntry::factory()->create();

    expect($entry->trade_date)->toBeInstanceOf(\Illuminate\Support\Carbon::class)
        ->and($entry->entry_time)->toBeInstanceOf(\Illuminate\Support\Carbon::class);
});
