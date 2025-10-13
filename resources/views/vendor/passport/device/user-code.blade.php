<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Introduce el código del dispositivo</title>
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

        label {
            display: block;
            margin: 1.5rem 0 0.75rem;
            font-weight: 600;
            color: #f1f5f9;
        }

        input {
            width: 100%;
            padding: 0.85rem;
            border-radius: 0.75rem;
            border: 1px solid rgba(148, 163, 184, 0.4);
            background: rgba(15, 23, 42, 0.6);
            color: #f8fafc;
            font-size: 1rem;
            letter-spacing: 0.3rem;
            text-transform: uppercase;
        }

        button {
            margin-top: 1.75rem;
            width: 100%;
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
    <h1>Introduce el código</h1>
    <p>Escribe el código que ves en tu dispositivo para continuar.</p>

    <form method="POST" action="{{ route('passport.device.authorizations.authorize') }}">
        @csrf
        <label for="user_code">Código</label>
        <input id="user_code" name="user_code" value="{{ old('user_code') }}" required autofocus>

        <button type="submit">Continuar</button>
    </form>
</div>
</body>
</html>
