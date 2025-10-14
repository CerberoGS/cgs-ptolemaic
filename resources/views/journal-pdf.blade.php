<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Trading Journal - {{ now()->format('Y-m-d') }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #333;
        }
        h1 {
            text-align: center;
            color: #1a202c;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #4a5568;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f7fafc;
        }
        .profit {
            color: #38a169;
            font-weight: bold;
        }
        .loss {
            color: #e53e3e;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #718096;
        }
    </style>
</head>
<body>
    <h1>Trading Journal</h1>
    <p style="text-align: center; color: #718096;">Generated on {{ now()->format('F d, Y') }}</p>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Symbol</th>
                <th>Direction</th>
                <th>Asset</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Qty</th>
                <th>P&L</th>
                <th>P&L %</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($entries as $entry)
            <tr>
                <td>{{ $entry->trade_date->format('Y-m-d') }}</td>
                <td>{{ $entry->symbol }}</td>
                <td>{{ ucfirst($entry->direction instanceof \BackedEnum ? $entry->direction->value : $entry->direction) }}</td>
                <td>{{ ucfirst($entry->asset_type instanceof \BackedEnum ? $entry->asset_type->value : $entry->asset_type) }}</td>
                <td>${{ number_format($entry->entry_price, 2) }}</td>
                <td>{{ $entry->exit_price ? '$' . number_format($entry->exit_price, 2) : '-' }}</td>
                <td>{{ $entry->quantity }}</td>
                <td class="{{ $entry->isProfitable() ? 'profit' : 'loss' }}">
                    {{ $entry->pnl ? '$' . number_format($entry->pnl, 2) : '-' }}
                </td>
                <td class="{{ $entry->isProfitable() ? 'profit' : 'loss' }}">
                    {{ $entry->pnl_percentage ? number_format($entry->pnl_percentage, 2) . '%' : '-' }}
                </td>
                <td>{{ $entry->isClosed() ? 'Closed' : 'Open' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>{{ config('app.name') }} - Trading Journal Report</p>
    </div>
</body>
</html>

