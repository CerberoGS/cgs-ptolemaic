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
        Schema::create('news_provider_key_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('news_provider_key_id');
            $table->enum('status', ['pending', 'passed', 'failed'])->default('pending');
            $table->unsignedSmallInteger('response_code')->nullable();
            $table->text('message')->nullable();
            $table->json('payload')->nullable();
            $table->foreignIdFor(User::class, 'verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->foreign('news_provider_key_id', 'news_provider_key_ver_key_fk')
                ->references('id')
                ->on('news_provider_keys')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_provider_key_verifications');
    }
};
