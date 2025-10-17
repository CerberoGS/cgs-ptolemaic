<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class LanguageController extends Controller
{
    public function index(): Response
    {
        $languages = Language::ordered()->get();
        
        return Inertia::render('admin/languages/index', [
            'languages' => $languages,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/languages/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => 'required|string|size:2|unique:languages,code',
            'name' => 'required|string|max:255',
            'native_name' => 'required|string|max:255',
            'flag' => 'required|string|max:10',
            'sort_order' => 'integer|min:0',
        ]);

        // Crear registro en BD
        $language = Language::create($request->all());

        // Crear archivos de traducción
        $this->createTranslationFiles($language->code);

        return redirect()->route('admin.languages.index')
            ->with('success', "Idioma {$language->native_name} creado exitosamente");
    }

    public function edit(string $locale, $language): Response
    {
        // Handle both model binding and manual ID resolution
        if (is_string($language) || is_numeric($language)) {
            $language = Language::findOrFail($language);
        }
        
        return Inertia::render('admin/languages/edit', [
            'language' => $language,
        ]);
    }

    public function update(Request $request, string $locale, $language): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($language) || is_numeric($language)) {
            $language = Language::findOrFail($language);
        }
        
        $request->validate([
            'name' => 'required|string|max:255',
            'native_name' => 'required|string|max:255',
            'flag' => 'required|string|max:10',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $language->update($request->all());

        return redirect()->route('admin.languages.index')
            ->with('success', "Idioma {$language->native_name} actualizado exitosamente");
    }

    public function destroy(string $locale, $language): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($language) || is_numeric($language)) {
            $language = Language::findOrFail($language);
        }
        
        // No permitir eliminar el idioma por defecto
        if ($language->is_default) {
            return redirect()->back()
                ->with('error', 'No se puede eliminar el idioma por defecto');
        }

        // Eliminar archivos de traducción
        $this->deleteTranslationFiles($language->code);

        $language->delete();

        return redirect()->route('admin.languages.index')
            ->with('success', "Idioma {$language->native_name} eliminado exitosamente");
    }

    public function toggleActive(string $locale, $language): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($language) || is_numeric($language)) {
            $language = Language::findOrFail($language);
        }
        
        $language->update(['is_active' => !$language->is_active]);

        $status = $language->is_active ? 'activado' : 'desactivado';
        
        return redirect()->back()
            ->with('success', "Idioma {$language->native_name} {$status}");
    }

    public function setDefault(string $locale, $language): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($language) || is_numeric($language)) {
            $language = Language::findOrFail($language);
        }
        
        // Quitar default de otros idiomas
        Language::where('is_default', true)->update(['is_default' => false]);
        
        // Establecer como default
        $language->update(['is_default' => true]);

        return redirect()->back()
            ->with('success', "{$language->native_name} establecido como idioma por defecto");
    }

    private function createTranslationFiles(string $code): void
    {
        $langPath = base_path("lang/{$code}");
        
        // Crear directorio si no existe
        if (!File::exists($langPath)) {
            File::makeDirectory($langPath, 0755, true);
        }

        // Archivos base a crear
        $baseFiles = [
            'auth.php', 'general.php', 'settings.php', 'journal.php',
            'admin.php', 'components.php', 'plans.php', 'achievements.php',
            'feedback.php', 'invitations.php', 'pricing.php'
        ];

        foreach ($baseFiles as $file) {
            $targetFile = "{$langPath}/{$file}";
            
            if (!File::exists($targetFile)) {
                // Copiar desde inglés como base
                $sourceFile = base_path("lang/en/{$file}");
                if (File::exists($sourceFile)) {
                    File::copy($sourceFile, $targetFile);
                } else {
                    // Crear archivo vacío con estructura básica
                    File::put($targetFile, "<?php\n\nreturn [\n    // Traducciones para {$code}\n];\n");
                }
            }
        }
    }

    private function deleteTranslationFiles(string $code): void
    {
        $langPath = base_path("lang/{$code}");
        
        if (File::exists($langPath)) {
            File::deleteDirectory($langPath);
        }
    }
}
