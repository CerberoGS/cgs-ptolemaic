<?php

namespace App\Filament\Navigation;

enum AdminNavigationGroup: string
{
    case Dashboard = 'Escritorio';
    case UsersAccess = 'Usuarios & Acceso';
    case ProviderConfiguration = 'Config. Proveedores';
    case Affiliate = 'Sistema de Afiliados';
    case PlansBilling = 'Planes & Facturación';
    case Trading = 'Trading';
    case Gamification = 'Gamificación';
    case Engagement = 'Engagement';
    case Configuration = 'Configuración';
}
