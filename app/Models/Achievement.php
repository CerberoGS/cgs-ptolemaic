<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Achievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'name',
        'description',
        'icon',
        'tier',
        'points',
        'criteria',
    ];

    protected function casts(): array
    {
        return [
            'criteria' => 'array',
            'points' => 'integer',
        ];
    }

    /**
     * Users who have unlocked this achievement.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_achievements')
            ->withTimestamps()
            ->withPivot('unlocked_at');
    }
}
