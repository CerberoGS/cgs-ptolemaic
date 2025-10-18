<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TelegramConfig extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'telegram_config';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'bot_token',
        'chat_id',
        'is_active',
        'webhook_url',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];
}