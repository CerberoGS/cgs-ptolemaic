<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('journal_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Trade Basic Info
            $table->string('symbol', 20); // AAPL, TSLA, BTC/USD, etc.
            $table->enum('direction', ['long', 'short']);
            $table->enum('asset_type', ['stock', 'forex', 'crypto', 'option', 'future'])->default('stock');

            // Trade Execution
            $table->decimal('entry_price', 15, 8);
            $table->decimal('exit_price', 15, 8)->nullable();
            $table->decimal('quantity', 15, 4);
            $table->decimal('pnl', 15, 2)->nullable(); // Profit & Loss
            $table->decimal('pnl_percentage', 8, 4)->nullable(); // % gain/loss

            // Trade Strategy
            $table->string('setup_type', 50)->nullable(); // breakout, reversal, pullback, etc.
            $table->text('notes')->nullable(); // Rich text notes

            // Trade Metadata
            $table->json('tags')->nullable(); // ["momentum", "high-confidence", etc.]
            $table->json('images')->nullable(); // Array of image paths
            $table->tinyInteger('emotion')->nullable(); // 1-5 scale

            // Trade Timing
            $table->timestamp('trade_date');
            $table->timestamp('entry_time')->nullable();
            $table->timestamp('exit_time')->nullable();

            $table->timestamps();

            // Indexes for performance
            $table->index(['user_id', 'trade_date']);
            $table->index(['user_id', 'asset_type']);
            $table->index(['user_id', 'setup_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_entries');
    }
};
