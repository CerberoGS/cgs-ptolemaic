<?php

use App\Models\User;
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
        Schema::create('ai_provider_key_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ai_provider_key_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['pending', 'passed', 'failed'])->default('pending');
            $table->unsignedSmallInteger('response_code')->nullable();
            $table->text('message')->nullable();
            $table->json('payload')->nullable();
            $table->foreignIdFor(User::class, 'verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_provider_key_verifications');
    }
};
