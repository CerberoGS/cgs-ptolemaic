<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = [
        'code',
        'name', 
        'native_name',
        'flag',
        'is_active',
        'is_default',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_default' => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'id';
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    public static function getDefault()
    {
        return static::where('is_default', true)->first() 
            ?? static::where('code', 'en')->first();
    }

    public static function getActiveLanguages()
    {
        return static::active()->ordered()->get();
    }
}
