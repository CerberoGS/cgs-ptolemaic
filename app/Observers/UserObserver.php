<?php

namespace App\Observers;

use App\Enums\PlanType;
use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        $this->assignPlanByRole($user);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        $this->assignPlanByRole($user);
    }

    /**
     * Assign plan based on user role.
     */
    protected function assignPlanByRole(User $user): void
    {
        // Admin gets Internal plan automatically
        if ($user->hasRole('Admin') && $user->plan !== PlanType::Internal) {
            $user->updateQuietly(['plan' => PlanType::Internal]);

            return;
        }

        // Manager gets Staff plan automatically
        if ($user->hasRole('Manager') && ! $user->plan->isInternal()) {
            $user->updateQuietly(['plan' => PlanType::Staff]);

            return;
        }
    }
}
