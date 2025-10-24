@php($tabs = $this->getTabs())

<x-filament-panels::page>
    <div class="space-y-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {{ $tabs[$activeTab]['label'] }}
                </h2>

                <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ $tabs[$activeTab]['description'] }}
                </p>
            </div>

            <x-filament::button
                color="primary"
                :tag="'a'"
                :href="$tabs[$activeTab]['createRoute']"
                icon="heroicon-o-plus"
            >
                Nuevo {{ $tabs[$activeTab]['label'] }}
            </x-filament::button>
        </div>

        <x-filament::tabs aria-label="Tabs de proveedores" contained>
            @foreach ($tabs as $tabKey => $tab)
                <x-filament::tabs.item
                    :active="$activeTab === $tabKey"
                    type="button"
                    wire:click="setActiveTab('{{ $tabKey }}')"
                >
                    {{ $tab['label'] }}
                </x-filament::tabs.item>
            @endforeach
        </x-filament::tabs>

        <div wire:key="providers-table-{{ $activeTab }}">
            {{ $this->table }}
        </div>
    </div>
</x-filament-panels::page>

