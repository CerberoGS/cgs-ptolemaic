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
        // Step 1: Rename and add new columns (all nullable)
        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->renameColumn('plan_type', 'slug');
        });

        Schema::table('pricing_plans', function (Blueprint $table) {
            // Campos de presentación (i18n keys) - nullable para permitir migración
            $table->string('name_key', 255)->nullable()->after('slug')->comment('Translation key for plan name');
            $table->string('tagline_key', 255)->nullable()->after('name_key')->comment('Translation key for tagline');
            $table->string('description_key', 255)->nullable()->after('tagline_key')->comment('Translation key for description');
            $table->string('emoji', 10)->nullable()->after('description_key')->comment('Plan emoji');
            $table->string('accent_color', 50)->nullable()->after('emoji')->comment('Plan accent color');
            $table->string('icon_url', 255)->nullable()->after('accent_color')->comment('Icon URL');

            // Currency
            $table->string('currency', 3)->default('USD')->after('price_yearly')->comment('Price currency');

            // Cambiar offer_description a key
            $table->string('offer_description_key', 255)->nullable()->after('offer_name')->comment('Translation key for offer description');

            // Cambiar scarcity_message a key
            $table->string('scarcity_message_key', 255)->nullable()->after('scarcity_active')->comment('Translation key for scarcity message');

            // Campos de visibilidad
            $table->boolean('is_public')->default(true)->after('is_active')->comment('Show in public pricing page');
            $table->boolean('is_featured')->default(false)->after('is_public')->comment('Highlight as featured/recommended');
            $table->integer('display_order')->default(0)->after('is_featured')->comment('Display order in pricing page');

            // Spatie role integration
            $table->foreignId('role_id')->nullable()->after('display_order')->constrained('roles')->onDelete('set null')->comment('Spatie role for permissions');
        });

        // Step 2: Fill existing records with default values
        $driver = \DB::getDriverName();
        if ($driver === 'sqlite') {
            \DB::table('pricing_plans')->update([
                'name_key' => \DB::raw("'plans.labels.' || slug"),
                'tagline_key' => \DB::raw("'plans.taglines.' || slug"),
                'description_key' => \DB::raw("'plans.descriptions.' || slug"),
            ]);
        } else {
            // PostgreSQL, MySQL, etc.
            \DB::table('pricing_plans')->update([
                'name_key' => \DB::raw("CONCAT('plans.labels.', slug)"),
                'tagline_key' => \DB::raw("CONCAT('plans.taglines.', slug)"),
                'description_key' => \DB::raw("CONCAT('plans.descriptions.', slug)"),
            ]);
        }

        // Step 3: Drop old columns and update indices
        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->dropColumn(['offer_description', 'scarcity_message']);

            // Actualizar índices
            try {
                $table->dropIndex(['plan_type', 'is_active']);
            } catch (\Exception $e) {
                // Index might not exist
            }
            $table->index(['slug', 'is_active']);
            $table->index(['is_active', 'is_public']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->renameColumn('slug', 'plan_type');

            $table->dropColumn([
                'name_key',
                'tagline_key',
                'description_key',
                'emoji',
                'accent_color',
                'icon_url',
                'currency',
                'offer_description_key',
                'scarcity_message_key',
                'is_public',
                'is_featured',
                'display_order',
            ]);

            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');

            $table->text('offer_description')->nullable()->after('offer_name');
            $table->string('scarcity_message')->nullable()->after('scarcity_active');

            $table->dropIndex(['slug', 'is_active']);
            $table->dropIndex(['is_active', 'is_public']);
            $table->index(['plan_type', 'is_active']);
        });
    }
};
