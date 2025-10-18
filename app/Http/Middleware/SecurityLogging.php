<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class SecurityLogging
{
    /**
     * Handle an incoming request.
     *
     * Este middleware registra todas las actividades de seguridad importantes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        $response = $next($request);

        // Log security-relevant activities
        $this->logSecurityActivity($request, $response, $user);

        return $response;
    }

    /**
     * Log security-relevant activities
     */
    private function logSecurityActivity(Request $request, Response $response, $user): void
    {
        $path = $request->path();
        $method = $request->method();
        $ip = $request->ip();
        $userAgent = $request->userAgent();
        $statusCode = $response->getStatusCode();

        // Define security-sensitive routes
        $securityRoutes = [
            'login' => 'auth.login',
            'register' => 'auth.register',
            'password' => 'auth.password',
            'two-factor' => 'auth.two_factor',
            'profile' => 'user.profile',
            'plan' => 'user.plan',
            'affiliate' => 'user.affiliate',
            'admin' => 'admin.access',
        ];

        // Check if this is a security-relevant route
        $securityCategory = $this->getSecurityCategory($path, $securityRoutes);

        if ($securityCategory) {
            $this->logSecurityEvent($securityCategory, $request, $response, $user, [
                'path' => $path,
                'method' => $method,
                'ip_address' => $ip,
                'user_agent' => $userAgent,
                'status_code' => $statusCode,
                'timestamp' => now()->toISOString(),
            ]);
        }

        // Log failed authentication attempts
        if ($this->isFailedAuthAttempt($path, $statusCode)) {
            $this->logFailedAuthAttempt($request, $user);
        }

        // Log admin access
        if ($this->isAdminAccess($path) && $user) {
            $this->logAdminAccess($request, $user);
        }

        // Log sensitive data access
        if ($this->isSensitiveDataAccess($path) && $user) {
            $this->logSensitiveDataAccess($request, $user);
        }
    }

    /**
     * Get security category for the route
     */
    private function getSecurityCategory(string $path, array $securityRoutes): ?string
    {
        foreach ($securityRoutes as $route => $category) {
            if (str_contains($path, $route)) {
                return $category;
            }
        }

        return null;
    }

    /**
     * Log security event
     */
    private function logSecurityEvent(string $category, Request $request, Response $response, $user, array $data): void
    {
        $logData = array_merge($data, [
            'user_id' => $user?->id,
            'user_email' => $user?->email,
            'category' => $category,
            'session_id' => $request->session()->getId(),
        ]);

        Log::channel('security')->info("Security event: {$category}", $logData);
    }

    /**
     * Check if this is a failed authentication attempt
     */
    private function isFailedAuthAttempt(string $path, int $statusCode): bool
    {
        return str_contains($path, 'login') && $statusCode === 422;
    }

    /**
     * Log failed authentication attempt
     */
    private function logFailedAuthAttempt(Request $request, $user): void
    {
        Log::channel('security')->warning('Failed authentication attempt', [
            'email' => $request->input('email'),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp' => now()->toISOString(),
        ]);
    }

    /**
     * Check if this is admin access
     */
    private function isAdminAccess(string $path): bool
    {
        return str_starts_with($path, 'admin/');
    }

    /**
     * Log admin access
     */
    private function logAdminAccess(Request $request, $user): void
    {
        Log::channel('security')->info('Admin access', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'path' => $request->path(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp' => now()->toISOString(),
        ]);
    }

    /**
     * Check if this is sensitive data access
     */
    private function isSensitiveDataAccess(string $path): bool
    {
        $sensitivePaths = [
            'settings/profile',
            'settings/password',
            'settings/plan',
            'settings/affiliate',
            'admin/affiliate',
        ];

        foreach ($sensitivePaths as $sensitivePath) {
            if (str_contains($path, $sensitivePath)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Log sensitive data access
     */
    private function logSensitiveDataAccess(Request $request, $user): void
    {
        Log::channel('security')->info('Sensitive data access', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'path' => $request->path(),
            'method' => $request->method(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp' => now()->toISOString(),
        ]);
    }
}
