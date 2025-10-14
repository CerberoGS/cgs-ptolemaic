import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\JournalEntryController::csv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/csv'
 */
export const csv = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: csv.url(args, options),
    method: 'get',
})

csv.definition = {
    methods: ["get","head"],
    url: '/{locale?}/journal/export/csv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JournalEntryController::csv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/csv'
 */
csv.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args?.locale ?? 'es',
                }

    return csv.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JournalEntryController::csv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/csv'
 */
csv.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: csv.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JournalEntryController::csv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/csv'
 */
csv.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: csv.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::csv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/csv'
 */
    const csvForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: csv.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::csv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/csv'
 */
        csvForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: csv.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::csv
 * @see app/Http/Controllers/JournalEntryController.php:376
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/csv'
 */
        csvForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: csv.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    csv.form = csvForm
/**
* @see \App\Http\Controllers\JournalEntryController::pdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/pdf'
 */
export const pdf = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/{locale?}/journal/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JournalEntryController::pdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/pdf'
 */
pdf.url = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "locale",
        ])

    const parsedArgs = {
                        locale: args?.locale ?? 'es',
                }

    return pdf.definition.url
            .replace('{locale?}', parsedArgs.locale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JournalEntryController::pdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/pdf'
 */
pdf.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JournalEntryController::pdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/pdf'
 */
pdf.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JournalEntryController::pdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/pdf'
 */
    const pdfForm = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JournalEntryController::pdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/pdf'
 */
        pdfForm.get = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JournalEntryController::pdf
 * @see app/Http/Controllers/JournalEntryController.php:463
 * @param locale - Default: 'es'
 * @route '/{locale?}/journal/export/pdf'
 */
        pdfForm.head = (args?: { locale?: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pdf.form = pdfForm
const exportMethod = {
    csv: Object.assign(csv, csv),
pdf: Object.assign(pdf, pdf),
}

export default exportMethod