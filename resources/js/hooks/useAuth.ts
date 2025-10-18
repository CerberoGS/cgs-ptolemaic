import { usePage } from '@inertiajs/react'
import type { Auth, AuthGates, PlanSummary, SharedData, User } from '@/types'

/**
 * Custom hook para acceder a la información de autenticación y autorización
 * del usuario actual desde cualquier componente React.
 *
 * @example
 * ```tsx
 * const { can, user, plan, isAuthenticated } = useAuth()
 *
 * if (can('canUseAdvancedAnalytics')) {
 *   return <AnalyticsButton />
 * }
 * ```
 */
export function useAuth() {
    const { auth } = usePage<SharedData>().props

    return {
        // User data
        user: auth.user as User | null,
        roles: auth.roles as string[],
        permissions: auth.permissions as string[],
        plan: auth.plan as PlanSummary | null,
        gates: auth.gates as AuthGates | null,
        hasPassword: auth.hasPassword ?? false,

        // Authorization helpers
        /**
         * Verifica si el usuario tiene acceso a una funcionalidad específica.
         * @param gate - El nombre del gate a verificar
         * @returns true si el usuario tiene acceso, false en caso contrario
         */
        can: (gate: keyof AuthGates): boolean => {
            return auth.gates?.[gate] ?? false
        },

        /**
         * Verifica si el usuario NO tiene acceso a una funcionalidad específica.
         * @param gate - El nombre del gate a verificar
         * @returns true si el usuario NO tiene acceso, false en caso contrario
         */
        cannot: (gate: keyof AuthGates): boolean => {
            return !(auth.gates?.[gate] ?? false)
        },

        /**
         * Verifica si el usuario tiene acceso a AL MENOS UNA de las funcionalidades.
         * @param gates - Array de gates a verificar
         * @returns true si el usuario tiene acceso a al menos uno
         */
        canAny: (gates: Array<keyof AuthGates>): boolean => {
            if (!auth.gates) return false
            return gates.some((gate) => auth.gates![gate] === true)
        },

        /**
         * Verifica si el usuario tiene acceso a TODAS las funcionalidades.
         * @param gates - Array de gates a verificar
         * @returns true solo si el usuario tiene acceso a todos
         */
        canAll: (gates: Array<keyof AuthGates>): boolean => {
            if (!auth.gates) return false
            return gates.every((gate) => auth.gates![gate] === true)
        },

        // Role & Permission helpers
        /**
         * Verifica si el usuario tiene un rol específico.
         * @param role - El nombre del rol
         */
        hasRole: (role: string): boolean => {
            return auth.roles.includes(role)
        },

        /**
         * Verifica si el usuario tiene UN rol de los especificados.
         * @param roles - Array de nombres de roles
         */
        hasAnyRole: (roles: string[]): boolean => {
            return roles.some((role) => auth.roles.includes(role))
        },

        /**
         * Verifica si el usuario tiene TODOS los roles especificados.
         * @param roles - Array de nombres de roles
         */
        hasAllRoles: (roles: string[]): boolean => {
            return roles.every((role) => auth.roles.includes(role))
        },

        /**
         * Verifica si el usuario tiene un permiso específico.
         * @param permission - El nombre del permiso
         */
        hasPermission: (permission: string): boolean => {
            return auth.permissions.includes(permission)
        },

        /**
         * Verifica si el usuario tiene UN permiso de los especificados.
         * @param permissions - Array de nombres de permisos
         */
        hasAnyPermission: (permissions: string[]): boolean => {
            return permissions.some((permission) => auth.permissions.includes(permission))
        },

        /**
         * Verifica si el usuario tiene TODOS los permisos especificados.
         * @param permissions - Array de nombres de permisos
         */
        hasAllPermissions: (permissions: string[]): boolean => {
            return permissions.every((permission) => auth.permissions.includes(permission))
        },

        // Status helpers
        /**
         * Verifica si hay un usuario autenticado.
         */
        isAuthenticated: (): boolean => {
            return auth.user !== null
        },

        /**
         * Verifica si el usuario es invitado (no autenticado).
         */
        isGuest: (): boolean => {
            return auth.user === null
        },

        /**
         * Verifica si el usuario tiene un plan pagado.
         */
        isPaidUser: (): boolean => {
            return auth.plan?.isPaid ?? false
        },

        /**
         * Verifica si el usuario está en trial.
         */
        isOnTrial: (): boolean => {
            return auth.plan?.isTrial ?? false
        },

        /**
         * Verifica si el usuario tiene un plan específico.
         * @param planType - El tipo de plan a verificar
         */
        hasPlan: (planType: string): boolean => {
            return auth.plan?.type === planType
        },

        /**
         * Verifica si el usuario es Admin.
         */
        isAdmin: (): boolean => {
            return auth.roles.includes('Admin')
        },

        /**
         * Verifica si el usuario es Super Admin.
         */
        isSuperAdmin: (): boolean => {
            return auth.roles.includes('Super Admin')
        },
    }
}
