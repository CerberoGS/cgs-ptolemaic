<?php

namespace App\Models;

use App\Enums\FeedbackPriority;
use App\Enums\FeedbackStatus;
use App\Enums\FeedbackType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedback';

    protected $fillable = [
        'user_id',
        'type',
        'subject',
        'message',
        'screenshot',
        'url',
        'user_agent',
        'status',
        'admin_notes',
        'priority',
    ];

    protected function casts(): array
    {
        return [
            'type' => FeedbackType::class,
            'status' => FeedbackStatus::class,
            'priority' => FeedbackPriority::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeNew($query)
    {
        return $query->where('status', FeedbackStatus::New);
    }

    public function scopeByType($query, FeedbackType $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByStatus($query, FeedbackStatus $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByPriority($query, FeedbackPriority $priority)
    {
        return $query->where('priority', $priority);
    }
}
