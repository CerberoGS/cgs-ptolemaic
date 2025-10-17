import { useState, useCallback } from 'react';

interface AjaxResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Record<string, string[]>;
}

interface UseAjaxOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
    showAlerts?: boolean;
}

export function useAjax() {
    const [loading, setLoading] = useState(false);

    const request = useCallback(async <T = any>(
        url: string,
        options: RequestInit = {},
        ajaxOptions: UseAjaxOptions = {}
    ): Promise<AjaxResponse<T>> => {
        const { onSuccess, onError, showAlerts = true } = ajaxOptions;
        
        setLoading(true);
        
        try {
            // Ensure proper headers for Laravel AJAX requests
            const defaultHeaders = {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            };

            const response = await fetch(url, {
                ...options,
                headers: {
                    ...defaultHeaders,
                    ...options.headers,
                },
            });

            // Log response details for debugging
            console.log('AJAX Response Debug:', {
                url,
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                contentType: response.headers.get('content-type'),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const text = await response.text();
            console.log('Raw response text:', text);

            if (!text) {
                throw new Error('Empty response received');
            }

            let data: AjaxResponse<T>;
            try {
                data = JSON.parse(text);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.error('Response text that failed to parse:', text);
                throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
            }

            console.log('Parsed response data:', data);

            if (data.success !== false && onSuccess) {
                onSuccess(data);
            }

            if (data.success === false && onError) {
                onError(data.message || 'Request failed');
            }

            return data;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('AJAX Request Error:', error);
            
            if (showAlerts) {
                alert(`Error: ${errorMessage}`);
            }
            
            if (onError) {
                onError(errorMessage);
            }

            return {
                success: false,
                message: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    }, []);

    return { request, loading };
}
