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
        Schema::table('users', function (Blueprint $table) {
            $table->string('affiliate_code', 20)->nullable()->unique();
            $table->string('referred_by_code', 20)->nullable();
            $table->integer('monthly_analysis_bonus')->default(0);
            $table->decimal('affiliate_discount_percentage', 5, 2)->default(0);
            $table->timestamp('affiliate_discount_expires_at')->nullable();
            
            $table->index(['affiliate_code']);
            $table->index(['referred_by_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'affiliate_code',
                'referred_by_code', 
                'monthly_analysis_bonus',
                'affiliate_discount_percentage',
                'affiliate_discount_expires_at'
            ]);
        });
    }
};
