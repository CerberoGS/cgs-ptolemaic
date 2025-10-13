<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Authorize Application</title>
    <style>
        :root {
            color-scheme: light dark;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        body {
            margin: 0;
            background: #0f172a;
            color: #f8fafc;
            display: flex;
            justify-content: center;
            min-height: 100vh;
        }

        .card {
            margin: 3rem 1rem;
            max-width: 32rem;
            width: 100%;
            padding: 2.5rem;
            background: rgba(15, 23, 42, 0.85);
            border-radius: 1.25rem;
            box-shadow: 0 45px 90px rgba(15, 23, 42, 0.35);
        }

        h1 {
            font-size: 1.75rem;
            margin-bottom: 0.75rem;
        }

        h2 {
            font-size: 1.1rem;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
        }

        p {
            line-height: 1.6;
            color: #cbd5f5;
        }

        ul {
            margin: 0.75rem 0 1.5rem;
            padding-left: 1.2rem;
            color: #cbd5f5;
        }

        li + li {
            margin-top: 0.4rem;
        }

        .actions {
            display: flex;
            gap: 0.75rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }

        button {
            cursor: pointer;
            font-weight: 600;
            border: none;
            border-radius: 999px;
            padding: 0.85rem 1.8rem;
            font-size: 1rem;
            transition: transform 160ms ease, box-shadow 160ms ease;
        }

        button.approve {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            box-shadow: 0 20px 35px rgba(34, 197, 94, 0.25);
        }

        button.deny {
            background: rgba(148, 163, 184, 0.2);
            color: #f8fafc;
            border: 1px solid rgba(148, 163, 184, 0.3);
        }

        button:hover {
            transform: translateY(-2px);
        }

        .meta {
            display: grid;
            gap: 0.6rem;
            margin: 1.25rem 0 0.5rem;
        }

        .meta span {
            font-size: 0.95rem;
            color: #e2e8f0;
        }
    </style>
</head>
<body>
@php
    use Illuminate\Support\Str;

    $scopeCollection = collect($scopes ?? []);
@endphp
<div class="card">
    <h1>Authorize “{{ $client->name }}”</h1>
    <p>
        Esta aplicación solicita permiso para acceder a tu cuenta. Revisa los alcances y confirma si deseas continuar.
    </p>

    @if ($scopeCollection->isNotEmpty())
        <h2>Permisos solicitados</h2>
        <ul>
            @foreach ($scopeCollection as $scope)
                @php
                    $scope = (object) $scope;
                @endphp
                <li>{{ $scope->description ?? $scope->id ?? $scope }}</li>
            @endforeach
        </ul>
    @else
        <h2>Permisos solicitados</h2>
        <p>Se solicitará acceso básico a tu cuenta.</p>
    @endif

    <div class="meta">
        <span><strong>Cliente:</strong> {{ $client->name }}</span>
        <span><strong>Redirección:</strong> {{ Str::of(request('redirect_uri'))->limit(80) }}</span>
    </div>

    <div class="actions">
        <form method="POST" action="{{ route('passport.authorizations.approve') }}">
            @csrf
            <input type="hidden" name="state" value="{{ request('state') }}">
            <input type="hidden" name="client_id" value="{{ $client->id }}">
            <input type="hidden" name="auth_token" value="{{ $authToken }}">
            <button type="submit" class="approve">Autorizar</button>
        </form>

        <form method="POST" action="{{ route('passport.authorizations.deny') }}">
            @csrf
            <input type="hidden" name="state" value="{{ request('state') }}">
            <input type="hidden" name="client_id" value="{{ $client->id }}">
            <input type="hidden" name="auth_token" value="{{ $authToken }}">
            <button type="submit" class="deny">Cancelar</button>
        </form>
    </div>
</div>
</body>
</html>