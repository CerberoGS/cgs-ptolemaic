<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



Route::get('/login-google', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/google-callback', function () {
    $googleUser = Socialite::driver('google')->user();
    
    // Buscar o crear el usuario
    $user = App\Models\User::firstOrCreate(
        ['email' => $googleUser->getEmail()],
        [
            'name' => $googleUser->getName(),
            'email' => $googleUser->getEmail(),
            'email_verified_at' => now(),
            'google_id' => $googleUser->getId(),
            'password' => null, // Los usuarios OAuth no necesitan password
        ]
    );
    
    // Loguear al usuario
    Auth::login($user, true);
    
    // Redirigir al dashboard
    return redirect()->route('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
