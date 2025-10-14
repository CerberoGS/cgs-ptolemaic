<?php

namespace App\Policies;

use App\Models\Feedback;
use App\Models\User;

class FeedbackPolicy
{
    /**
     * Determine if the user can view any feedback (admin only).
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('feedback.manage');
    }

    /**
     * Determine if the user can view the feedback (admin only).
     */
    public function view(User $user, Feedback $feedback): bool
    {
        return $user->hasPermissionTo('feedback.manage');
    }

    /**
     * Determine if the user can update the feedback (admin only).
     */
    public function update(User $user, Feedback $feedback): bool
    {
        return $user->hasPermissionTo('feedback.manage');
    }

    /**
     * Determine if the user can delete the feedback (admin only).
     */
    public function delete(User $user, Feedback $feedback): bool
    {
        return $user->hasPermissionTo('feedback.manage');
    }
}
