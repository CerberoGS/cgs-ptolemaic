<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Inertia\Inertia;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Inertia::setRootView('testing');
    }

    protected function tearDown(): void
    {
        Inertia::setRootView('app');

        parent::tearDown();
    }
}
