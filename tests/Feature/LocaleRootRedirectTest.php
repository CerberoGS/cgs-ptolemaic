<?php

it('redirige la raíz al home localizado', function () {
    $response = $this->get('/');

    $response->assertRedirect(route('home', ['locale' => config('app.locale')], absolute: false));
});

it('normaliza la redirección incluso cuando hay query string', function () {
    $response = $this->get('/?utm_source=test');

    $response->assertRedirect(route('home', ['locale' => config('app.locale')], absolute: false));
});

it('normaliza la url del home localizado', function () {
    $locale = config('app.locale');

    $response = $this->get("/{$locale}?_token=test-token");

    $response->assertRedirect(route('home', ['locale' => $locale], absolute: false));
});
