<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Autoriza tu dispositivo</title>
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            min-height: 100vh;
            margin: 0;
            display: grid;
            place-items: center;
            background: #0f172a;
            color: #e2e8f0;
        }

        .card {
            max-width: 28rem;
            padding: 2.5rem;
            background: rgba(15, 23, 42, 0.9);
            border-radius: 1.25rem;
            box-shadow: 0 30px 50px rgba(15, 23, 42, 0.4);
        }

        h1 {
            margin: 0 0 1rem;
            font-size: 1.75rem;
            color: #f8fafc;
        }

        p {
            line-height: 1.6;
        }

        .code {
            margin: 1.5rem 0;
            font-size: 2rem;
            letter-spacing: 0.35rem;
            font-weight: 700;
            text-transform: uppercase;
            text-align: center;
            color: #38bdf8;
        }

        .actions {
            display: flex;
            gap: 0.75rem;
            margin-top: 2rem;
        }

        button {
            flex: 1;
            cursor: pointer;
            padding: 0.85rem;
            border: none;
            border-radius: 999px;
            font-weight: 600;
            background: linear-gradient(135deg, #38bdf8, #2563eb);
            color: white;
            box-shadow: 0 18px 30px rgba(59, 130, 246, 0.25);
            transition: transform 160ms ease;
        }

        button:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
<div class="card">
    <h1>Autoriza tu dispositivo</h1>
    <p>Ingresa el siguiente código en el dispositivo que deseas autorizar:</p>

    <div class="code">{{ $user_code ?? '' }}</div>

    <p>Si ya ingresaste el código, confirma la autorización.</p>

    <div class="actions">
        <form method="POST" action="{{ route('passport.device.authorizations.approve') }}">
            @csrf
            <input type="hidden" name="user_code" value="{{ $user_code ?? '' }}">
            <button type="submit">Autorizar dispositivo</button>
        </form>
    </div>
</div>
</body>
</html>
