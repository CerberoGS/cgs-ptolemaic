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
        Schema::table('journal_entries', function (Blueprint $table) {
            // AI Analysis results
            $table->text('ai_analysis')->nullable()->after('notes');
            $table->timestamp('analyzed_at')->nullable()->after('ai_analysis');
            $table->string('analyzed_by_provider', 50)->nullable()->after('analyzed_at');
            $table->integer('analysis_tokens_used')->nullable()->after('analyzed_by_provider');

            // AI Analysis failure tracking
            $table->timestamp('analysis_failed_at')->nullable()->after('analysis_tokens_used');
            $table->text('analysis_error')->nullable()->after('analysis_failed_at');

            // Index for querying analyzed entries
            $table->index('analyzed_at');
            $table->index('analysis_failed_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('journal_entries', function (Blueprint $table) {
            // Drop indexes first
            $table->dropIndex(['analyzed_at']);
            $table->dropIndex(['analysis_failed_at']);

            // Drop columns
            $table->dropColumn([
                'ai_analysis',
                'analyzed_at',
                'analyzed_by_provider',
                'analysis_tokens_used',
                'analysis_failed_at',
                'analysis_error',
            ]);
        });
    }
};
