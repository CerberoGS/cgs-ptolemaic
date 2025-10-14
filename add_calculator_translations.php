<?php

// New translations for Position Sizing Calculator
$newTranslations = [
    // Calculator Direction
    'Trade Direction' => 'Dirección del Trade',
    'LONG (Buy)' => 'LONG (Comprar)',
    'SHORT (Sell)' => 'SHORT (Vender)',
    'LONG: You buy expecting price to rise. Stop loss protects if price falls.' => 'LONG: Compras esperando que el precio suba. El stop loss protege si el precio baja.',
    'SHORT: You sell expecting price to fall. Stop loss protects if price rises.' => 'SHORT: Vendes esperando que el precio baje. El stop loss protege si el precio sube.',

    // Field Help Texts
    'Total capital available for trading. Example: $10,000' => 'Capital total disponible para operar. Ejemplo: $10,000',
    'Maximum % of your account to risk on this trade. Recommended: 1-2%' => 'Porcentaje máximo de tu cuenta a arriesgar en esta operación. Recomendado: 1-2%',
    'Price at which you will BUY. Example: $150.00' => 'Precio al cual COMPRARÁS. Ejemplo: $150.00',
    'Price at which you will SELL SHORT. Example: $50.00' => 'Precio al cual VENDERÁS EN CORTO. Ejemplo: $50.00',
    'Price to exit if trade goes wrong (must be BELOW entry). Example: $145.00 if entry is $150.00' => 'Precio para salir si la operación sale mal (debe estar POR DEBAJO de la entrada). Ejemplo: $145.00 si la entrada es $150.00',
    'Price to exit if trade goes wrong (must be ABOVE entry). Example: $52.00 if entry is $50.00' => 'Precio para salir si la operación sale mal (debe estar POR ENCIMA de la entrada). Ejemplo: $52.00 si la entrada es $50.00',

    // Validation Errors
    'Account size must be greater than zero' => 'El tamaño de la cuenta debe ser mayor que cero',
    'Risk percentage must be greater than zero' => 'El porcentaje de riesgo debe ser mayor que cero',
    'Entry price must be greater than zero' => 'El precio de entrada debe ser mayor que cero',
    'Stop loss must be greater than zero' => 'El stop loss debe ser mayor que cero',
    'Entry price and stop loss cannot be the same' => 'El precio de entrada y el stop loss no pueden ser iguales',
    'For LONG trades, stop loss must be BELOW entry price (stop loss protects if price falls)' => 'Para operaciones LONG, el stop loss debe estar POR DEBAJO del precio de entrada (el stop loss protege si el precio baja)',
    'For SHORT trades, stop loss must be ABOVE entry price (stop loss protects if price rises)' => 'Para operaciones SHORT, el stop loss debe estar POR ENCIMA del precio de entrada (el stop loss protege si el precio sube)',

    // Warnings
    'Warning: Risking more than 10% per trade is extremely dangerous' => 'Advertencia: Arriesgar más del 10% por operación es extremadamente peligroso',
    'Warning: Risking more than 5% per trade is very aggressive' => 'Advertencia: Arriesgar más del 5% por operación es muy agresivo',
    'Warning: Stop loss is very far (:percent% from entry). Consider a tighter stop loss.' => 'Advertencia: El stop loss está muy lejos (:percent% de la entrada). Considera un stop loss más ajustado.',
    'Warning: Stop loss is very tight (:percent% from entry). May trigger easily.' => 'Advertencia: El stop loss está muy ajustado (:percent% de la entrada). Puede activarse fácilmente.',
    'Cannot buy even 1 share with this stop loss. Your stop loss is too far ($:risk per share). Reduce your stop loss distance or increase risk percentage.' => 'No puedes comprar ni siquiera 1 acción con este stop loss. Tu stop loss está muy lejos ($:risk por acción). Reduce la distancia del stop loss o aumenta el porcentaje de riesgo.',
    'Warning: Position size ($:position) exceeds account size ($:account)' => 'Advertencia: El tamaño de la posición ($:position) excede el tamaño de la cuenta ($:account)',

    // Results Labels
    'Shares to Sell Short' => 'Acciones a Vender en Corto',
    'Number of shares/contracts for this trade' => 'Número de acciones/contratos para esta operación',
    'Total capital invested (shares × entry price)' => 'Capital total invertido (acciones × precio de entrada)',
    'Risk Per Share' => 'Riesgo por Acción',
    'Distance between entry and stop loss' => 'Distancia entre entrada y stop loss',
    'Maximum Loss' => 'Pérdida Máxima',
    'Loss if stop loss is triggered' => 'Pérdida si se activa el stop loss',
    'of account' => 'de la cuenta',

    // Trade Summary
    'Trade Summary' => 'Resumen del Trade',
    'BUY' => 'COMPRAR',
    'SELL SHORT' => 'VENDER EN CORTO',
    'Exit if price' => 'Salir si el precio',
    'falls to' => 'cae a',
    'rises to' => 'sube a',
    'Total investment' => 'Inversión total',
    'Maximum risk' => 'Riesgo máximo',
    'of' => 'de',
];

// Read existing translations
$enFile = __DIR__.'/lang/en.json';
$esFile = __DIR__.'/lang/es.json';

$enData = json_decode(file_get_contents($enFile), true);
$esData = json_decode(file_get_contents($esFile), true);

// Add new translations
foreach ($newTranslations as $en => $es) {
    if (! isset($enData[$en])) {
        $enData[$en] = $en;
        $esData[$en] = $es;
    }
}

// Sort alphabetically
ksort($enData);
ksort($esData);

// Save back
file_put_contents($enFile, json_encode($enData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n");
file_put_contents($esFile, json_encode($esData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n");

echo "✅ Calculator translations added successfully!\n";
echo '   Added '.count($newTranslations)." new translation pairs\n";
