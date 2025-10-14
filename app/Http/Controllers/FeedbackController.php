<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedbackRequest;
use App\Models\Feedback;
use Illuminate\Http\RedirectResponse;

class FeedbackController extends Controller
{
    public function store(StoreFeedbackRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Handle screenshot upload
        if ($request->hasFile('screenshot')) {
            $path = $request->file('screenshot')->store('feedback-screenshots', 'public');
            $validated['screenshot'] = $path;
        }

        // Add user_id if authenticated
        if ($request->user()) {
            $validated['user_id'] = $request->user()->id;
        }

        // Add user agent
        $validated['user_agent'] = $request->userAgent();

        // Create feedback
        Feedback::create($validated);

        // TODO: Send email notification to admin

        return back()->with('success', __('Thank you for your feedback! We will review it shortly.'));
    }
}
