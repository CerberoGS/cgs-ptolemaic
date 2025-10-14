<?php

namespace Database\Factories;

use App\Models\JournalEntry;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JournalEntry>
 */
class JournalEntryFactory extends Factory
{
    protected $model = JournalEntry::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $symbols = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'SPY', 'QQQ', 'BTC/USD', 'ETH/USD', 'EUR/USD'];
        $setupTypes = ['breakout', 'reversal', 'pullback', 'support', 'resistance', 'momentum', 'mean-reversion', 'trend-following'];
        $assetTypes = ['stock', 'forex', 'crypto', 'option'];
        $directions = ['long', 'short'];
        $tags = ['high-confidence', 'momentum', 'low-risk', 'swing-trade', 'day-trade', 'scalp', 'mistake', 'emotional', 'perfect-setup'];

        $direction = fake()->randomElement($directions);
        $assetType = fake()->randomElement($assetTypes);
        $symbol = fake()->randomElement($symbols);

        // Generate realistic prices based on symbol
        $basePrice = match (true) {
            str_contains($symbol, 'BTC') => fake()->randomFloat(2, 40000, 50000),
            str_contains($symbol, 'ETH') => fake()->randomFloat(2, 2000, 3000),
            str_contains($symbol, 'EUR') => fake()->randomFloat(4, 1.05, 1.15),
            str_contains($symbol, 'NVDA') => fake()->randomFloat(2, 400, 600),
            str_contains($symbol, 'TSLA') => fake()->randomFloat(2, 200, 300),
            default => fake()->randomFloat(2, 100, 500),
        };

        $entryPrice = $basePrice;
        $quantity = match ($assetType) {
            'crypto' => fake()->randomFloat(4, 0.1, 5),
            'forex' => fake()->numberBetween(10000, 100000),
            default => fake()->numberBetween(10, 500),
        };

        // 70% profitable, 30% losing (realistic win rate)
        $isProfitable = fake()->boolean(70);
        $percentageChange = $isProfitable
            ? fake()->randomFloat(2, 0.5, 8) // +0.5% to +8%
            : fake()->randomFloat(2, -6, -0.3); // -6% to -0.3%

        $exitPrice = $direction === 'long'
            ? $entryPrice * (1 + ($percentageChange / 100))
            : $entryPrice * (1 - ($percentageChange / 100));

        $priceDiff = $direction === 'long'
            ? $exitPrice - $entryPrice
            : $entryPrice - $exitPrice;

        $pnl = $priceDiff * $quantity;
        $pnlPercentage = ($priceDiff / $entryPrice) * 100;

        $tradeDate = fake()->dateTimeBetween('-90 days', 'now');
        $entryTime = (clone $tradeDate)->setTime(fake()->numberBetween(9, 15), fake()->numberBetween(0, 59));
        $exitTime = (clone $entryTime)->modify('+'.fake()->numberBetween(30, 480).' minutes');

        return [
            'user_id' => User::factory(),
            'symbol' => $symbol,
            'direction' => $direction,
            'asset_type' => $assetType,
            'entry_price' => $entryPrice,
            'exit_price' => $exitPrice,
            'quantity' => $quantity,
            'pnl' => round($pnl, 2),
            'pnl_percentage' => round($pnlPercentage, 4),
            'setup_type' => fake()->randomElement($setupTypes),
            'notes' => fake()->boolean(80) ? fake()->paragraph() : null,
            'tags' => fake()->boolean(70) ? fake()->randomElements($tags, fake()->numberBetween(1, 3)) : null,
            'images' => null, // Will be populated separately if needed
            'emotion' => fake()->numberBetween(1, 5),
            'trade_date' => $tradeDate,
            'entry_time' => $entryTime,
            'exit_time' => $exitTime,
        ];
    }

    /**
     * Indicate that the trade is still open (no exit).
     */
    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'exit_price' => null,
            'exit_time' => null,
            'pnl' => null,
            'pnl_percentage' => null,
        ]);
    }

    /**
     * Indicate that the trade is profitable.
     */
    public function profitable(): static
    {
        return $this->state(function (array $attributes) {
            $percentageChange = fake()->randomFloat(2, 1, 10);
            $direction = $attributes['direction'];
            $entryPrice = $attributes['entry_price'];
            $quantity = $attributes['quantity'];

            $exitPrice = $direction === 'long'
                ? $entryPrice * (1 + ($percentageChange / 100))
                : $entryPrice * (1 - ($percentageChange / 100));

            $priceDiff = $direction === 'long'
                ? $exitPrice - $entryPrice
                : $entryPrice - $exitPrice;

            return [
                'exit_price' => $exitPrice,
                'pnl' => round($priceDiff * $quantity, 2),
                'pnl_percentage' => round(($priceDiff / $entryPrice) * 100, 4),
            ];
        });
    }

    /**
     * Indicate that the trade is losing.
     */
    public function losing(): static
    {
        return $this->state(function (array $attributes) {
            $percentageChange = fake()->randomFloat(2, -8, -0.5);
            $direction = $attributes['direction'];
            $entryPrice = $attributes['entry_price'];
            $quantity = $attributes['quantity'];

            $exitPrice = $direction === 'long'
                ? $entryPrice * (1 + ($percentageChange / 100))
                : $entryPrice * (1 - ($percentageChange / 100));

            $priceDiff = $direction === 'long'
                ? $exitPrice - $entryPrice
                : $entryPrice - $exitPrice;

            return [
                'exit_price' => $exitPrice,
                'pnl' => round($priceDiff * $quantity, 2),
                'pnl_percentage' => round(($priceDiff / $entryPrice) * 100, 4),
            ];
        });
    }
}
