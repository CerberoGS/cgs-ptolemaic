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
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('type', ['bug', 'suggestion', 'question', 'praise', 'data_issue']);
            $table->string('subject');
            $table->text('message');
            $table->string('screenshot')->nullable();
            $table->string('url', 500)->nullable();
            $table->text('user_agent')->nullable();
            $table->enum('status', ['new', 'in_review', 'resolved', 'closed'])->default('new');
            $table->text('admin_notes')->nullable();
            $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index(['type', 'created_at']);
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback');
    }
};
