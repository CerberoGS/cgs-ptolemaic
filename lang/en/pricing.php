<?php

return [
    // General
    'title' => 'Pricing Management',
    'manage_pricing' => 'Manage Pricing',
    'pricing_plans' => 'Pricing Plans',
    'edit_pricing' => 'Edit Pricing',
    'updated_successfully' => 'Pricing plan updated successfully',
    'offer_activated' => 'Offer activated successfully',
    'offer_deactivated' => 'Offer deactivated successfully',
    'scarcity_activated' => 'Scarcity activated successfully',
    'scarcity_deactivated' => 'Scarcity deactivated successfully',
    'scarcity_incremented' => 'Scarcity count incremented',
    'scarcity_reset' => 'Scarcity count reset',

    // Plan types
    'plan_types' => [
        'managed' => 'Cosmographer',
        'pro' => 'Astronomer',
        'enterprise' => 'Heliopolis',
    ],

    // Fields
    'fields' => [
        'plan_type' => 'Plan Type',
        'price_monthly' => 'Monthly Price',
        'price_yearly' => 'Yearly Price',
        'offer_price_monthly' => 'Offer Monthly Price',
        'offer_price_yearly' => 'Offer Yearly Price',
        'offer_active' => 'Offer Active',
        'offer_name' => 'Offer Name',
        'offer_description' => 'Offer Description',
        'offer_starts_at' => 'Offer Starts At',
        'offer_ends_at' => 'Offer Ends At',
        'scarcity_active' => 'Scarcity Active',
        'scarcity_message' => 'Scarcity Message',
        'scarcity_limit' => 'Scarcity Limit',
        'scarcity_sold' => 'Scarcity Sold',
        'is_active' => 'Active',
    ],

    // Actions
    'actions' => [
        'edit' => 'Edit',
        'update' => 'Update',
        'toggle_offer' => 'Toggle Offer',
        'toggle_scarcity' => 'Toggle Scarcity',
        'increment_scarcity' => 'Increment Scarcity',
        'reset_scarcity' => 'Reset Scarcity',
        'save' => 'Save Changes',
        'cancel' => 'Cancel',
    ],

    // Status
    'status' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
        'offer_active' => 'Offer Active',
        'offer_inactive' => 'Offer Inactive',
        'scarcity_active' => 'Scarcity Active',
        'scarcity_inactive' => 'Scarcity Inactive',
    ],

    // Validation messages
    'validation' => [
        'price_monthly_required' => 'Monthly price is required',
        'price_monthly_numeric' => 'Monthly price must be a number',
        'price_monthly_min' => 'Monthly price must be at least 0',
        'price_yearly_required' => 'Yearly price is required',
        'price_yearly_numeric' => 'Yearly price must be a number',
        'price_yearly_min' => 'Yearly price must be at least 0',
        'offer_price_monthly_numeric' => 'Offer monthly price must be a number',
        'offer_price_monthly_min' => 'Offer monthly price must be at least 0',
        'offer_price_yearly_numeric' => 'Offer yearly price must be a number',
        'offer_price_yearly_min' => 'Offer yearly price must be at least 0',
        'offer_name_max' => 'Offer name cannot exceed 100 characters',
        'offer_description_max' => 'Offer description cannot exceed 500 characters',
        'offer_starts_at_date' => 'Offer start date must be a valid date',
        'offer_starts_at_after_or_equal' => 'Offer start date must be today or in the future',
        'offer_ends_at_date' => 'Offer end date must be a valid date',
        'offer_ends_at_after' => 'Offer end date must be after start date',
        'scarcity_message_max' => 'Scarcity message cannot exceed 200 characters',
        'scarcity_limit_integer' => 'Scarcity limit must be an integer',
        'scarcity_limit_min' => 'Scarcity limit must be at least 1',
        'scarcity_sold_integer' => 'Scarcity sold must be an integer',
        'scarcity_sold_min' => 'Scarcity sold must be at least 0',
        'offer_price_monthly_required_when_active' => 'Offer monthly price is required when offer is active',
        'offer_price_yearly_required_when_active' => 'Offer yearly price is required when offer is active',
        'scarcity_message_required_when_active' => 'Scarcity message is required when scarcity is active',
        'scarcity_limit_required_when_active' => 'Scarcity limit is required when scarcity is active',
        'scarcity_sold_exceeds_limit' => 'Scarcity sold cannot exceed the limit',
    ],

    // Help text
    'help' => [
        'offer_name' => 'Give your offer a catchy name like "Black Friday Sale" or "New Year Special"',
        'offer_description' => 'Describe what makes this offer special and why users should act now',
        'offer_starts_at' => 'When should this offer become available? Leave empty to start immediately',
        'offer_ends_at' => 'When should this offer expire? Leave empty for no expiration',
        'scarcity_message' => 'Create urgency with messages like "Only 50 spots left!" or "Limited time offer"',
        'scarcity_limit' => 'How many units are available? This creates artificial scarcity',
        'scarcity_sold' => 'How many have been sold? This shows progress toward the limit',
    ],
];
