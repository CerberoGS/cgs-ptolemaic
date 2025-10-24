<?php

namespace App\Http\Controllers\Admin;

use App\Enums\FeedbackPriority;
use App\Enums\FeedbackStatus;
use App\Enums\FeedbackType;
use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackController extends Controller
{
    public function index(string $locale, Request $request): Response
    {
        $query = Feedback::query()->with('user:id,name,email')->latest();

        // Filters
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('subject', 'like', '%'.$request->search.'%')
                    ->orWhere('message', 'like', '%'.$request->search.'%');
            });
        }

        $feedbacks = $query->paginate(15)->withQueryString();

        return Inertia::render('admin/feedback/index', [
            'feedbacks' => $feedbacks->through(fn ($feedback) => [
                'id' => $feedback->id,
                'type' => $feedback->type->value,
                'typeLabel' => $feedback->type->label(),
                'typeIcon' => $feedback->type->icon(),
                'typeColor' => $feedback->type->color(),
                'status' => $feedback->status->value,
                'statusLabel' => $feedback->status->label(),
                'statusColor' => $feedback->status->color(),
                'priority' => $feedback->priority->value,
                'priorityLabel' => $feedback->priority->label(),
                'priorityColor' => $feedback->priority->color(),
                'subject' => $feedback->subject,
                'message' => $feedback->message,
                'url' => $feedback->url,
                'screenshot' => $feedback->screenshot ? asset('storage/'.$feedback->screenshot) : null,
                'user' => $feedback->user ? [
                    'id' => $feedback->user->id,
                    'name' => $feedback->user->name,
                    'email' => $feedback->user->email,
                ] : null,
                'created_at' => $feedback->created_at->diffForHumans(),
                'created_at_full' => $feedback->created_at->format('Y-m-d H:i:s'),
            ]),
            'pagination' => [
                'current_page' => $feedbacks->currentPage(),
                'last_page' => $feedbacks->lastPage(),
                'per_page' => $feedbacks->perPage(),
                'total' => $feedbacks->total(),
            ],
            'filters' => [
                'type' => $request->type,
                'status' => $request->status,
                'priority' => $request->priority,
                'search' => $request->search,
            ],
            'types' => collect(FeedbackType::cases())->map(fn ($type) => [
                'value' => $type->value,
                'label' => $type->label(),
                'icon' => $type->icon(),
            ]),
            'statuses' => collect(FeedbackStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => $status->label(),
            ]),
            'priorities' => collect(FeedbackPriority::cases())->map(fn ($priority) => [
                'value' => $priority->value,
                'label' => $priority->label(),
            ]),
        ]);
    }

    public function show(string $locale, Feedback $feedback): Response
    {
        $feedback->load('user:id,name,email');

        return Inertia::render('admin/feedback/show', [
            'feedback' => [
                'id' => $feedback->id,
                'type' => $feedback->type->value,
                'typeLabel' => $feedback->type->label(),
                'typeIcon' => $feedback->type->icon(),
                'status' => $feedback->status->value,
                'statusLabel' => $feedback->status->label(),
                'priority' => $feedback->priority->value,
                'priorityLabel' => $feedback->priority->label(),
                'subject' => $feedback->subject,
                'message' => $feedback->message,
                'url' => $feedback->url,
                'user_agent' => $feedback->user_agent,
                'screenshot' => $feedback->screenshot ? asset('storage/'.$feedback->screenshot) : null,
                'admin_notes' => $feedback->admin_notes,
                'user' => $feedback->user ? [
                    'id' => $feedback->user->id,
                    'name' => $feedback->user->name,
                    'email' => $feedback->user->email,
                ] : [
                    'name' => __('Anonymous'),
                ],
                'created_at' => $feedback->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $feedback->updated_at->format('Y-m-d H:i:s'),
            ],
            'statuses' => collect(FeedbackStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => $status->label(),
            ]),
            'priorities' => collect(FeedbackPriority::cases())->map(fn ($priority) => [
                'value' => $priority->value,
                'label' => $priority->label(),
            ]),
        ]);
    }

    public function update(string $locale, Request $request, Feedback $feedback)
    {
        $validated = $request->validate([
            'status' => ['sometimes', 'string'],
            'priority' => ['sometimes', 'string'],
            'admin_notes' => ['nullable', 'string'],
        ]);

        $feedback->update($validated);

        return back()->with('success', __('Feedback updated successfully.'));
    }
}
