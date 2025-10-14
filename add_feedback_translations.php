<?php

// Feedback translations
$newTranslations = [
    // Feedback Types
    'Report Bug' => 'Reportar Bug',
    'Suggestion' => 'Sugerencia',
    'Question' => 'Pregunta',
    'Praise' => 'Elogio',
    'Data Issue' => 'Problema de Datos',

    // Button & Modal
    'Feedback' => 'Feedback',
    'Send us your feedback' => 'Envíanos tu feedback',
    'Help us improve! Report bugs, suggest features, or share your thoughts.' => '¡Ayúdanos a mejorar! Reporta bugs, sugiere funciones o comparte tus ideas.',
    'Feedback Type' => 'Tipo de Feedback',
    'Subject' => 'Asunto',
    'Brief description of your feedback' => 'Breve descripción de tu feedback',
    'Message' => 'Mensaje',
    'Provide details about your feedback...' => 'Proporciona detalles sobre tu feedback...',
    'characters' => 'caracteres',
    'Current page URL will be automatically included to help us locate the issue.' => 'La URL de la página actual se incluirá automáticamente para ayudarnos a localizar el problema.',
    'Send Feedback' => 'Enviar Feedback',
    'Sending...' => 'Enviando...',

    // Validation
    'Please select a feedback type.' => 'Por favor selecciona un tipo de feedback.',
    'Please provide a subject.' => 'Por favor proporciona un asunto.',
    'Please provide a message.' => 'Por favor proporciona un mensaje.',
    'Screenshot must be an image file.' => 'La captura debe ser un archivo de imagen.',
    'Screenshot must not exceed :max KB.' => 'La captura no debe exceder :max KB.',

    // Success Message
    'Thank you for your feedback! We will review it shortly.' => '¡Gracias por tu feedback! Lo revisaremos pronto.',

    // Admin Panel
    'Feedback Management' => 'Gestión de Feedback',
    'View and manage user feedback' => 'Ver y gestionar feedback de usuarios',
    'total' => 'total',
    'Filters' => 'Filtros',
    'Search subject or message...' => 'Buscar en asunto o mensaje...',
    'Type' => 'Tipo',
    'All Types' => 'Todos los Tipos',
    'Status' => 'Estado',
    'All Statuses' => 'Todos los Estados',
    'Priority' => 'Prioridad',
    'All Priorities' => 'Todas las Prioridades',
    'Apply Filters' => 'Aplicar Filtros',
    'No feedback found.' => 'No se encontró feedback.',
    'View Details' => 'Ver Detalles',
    'View Page' => 'Ver Página',

    // Feedback Detail
    'Back' => 'Volver',
    'Screenshot' => 'Captura',
    'Admin Notes' => 'Notas del Admin',
    'Notes' => 'Notas',
    'Add internal notes about this feedback...' => 'Agregar notas internas sobre este feedback...',
    'Save Changes' => 'Guardar Cambios',
    'User Information' => 'Información del Usuario',
    'Name' => 'Nombre',
    'Email' => 'Email',
    'Technical Information' => 'Información Técnica',
    'Page URL' => 'URL de la Página',
    'Open page' => 'Abrir página',
    'User Agent' => 'User Agent',
    'Created' => 'Creado',
    'Updated' => 'Actualizado',
    'Anonymous' => 'Anónimo',
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

echo "✅ Feedback translations added successfully!\n";
echo '   Added '.count($newTranslations)." new translation pairs\n";
