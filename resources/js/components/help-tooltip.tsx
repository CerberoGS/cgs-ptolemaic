import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useTrans } from '@/hooks/useTrans';

interface HelpTooltipProps {
    content: string;
    detailedContent?: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
    variant?: 'default' | 'info';
}

export function HelpTooltip({ 
    content, 
    detailedContent, 
    side = 'top',
    className = '',
    variant = 'default'
}: HelpTooltipProps) {
    const t = useTrans();
    const [isOpen, setIsOpen] = useState(false);
    
    const Icon = variant === 'info' ? Info : HelpCircle;
    
    return (
        <div className={`inline-flex items-center ${className}`}>
            {/* Tooltip para desktop */}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsOpen(true)}
                        >
                            <Icon className="h-3 w-3" />
                            <span className="sr-only">Ayuda</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={side} className="max-w-xs">
                        <p className="text-sm">{content}</p>
                        {detailedContent && (
                            <p className="text-xs text-muted-foreground mt-1">
                                {t('affiliate.help_click_for_details')}
                            </p>
                        )}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
            {/* Modal para contenido detallado */}
            {detailedContent && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {t('affiliate.help_detailed_information')}
                            </DialogTitle>
                            <DialogDescription className="text-sm leading-relaxed">
                                {detailedContent}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

// Componente específico para estadísticas
interface StatHelpProps {
    title: string;
    description: string;
    example?: string;
    className?: string;
}

export function StatHelp({ title, description, example, className = '' }: StatHelpProps) {
    const t = useTrans();
    const detailedContent = example 
        ? `${description}\n\nEjemplo: ${example}`
        : description;
    
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <span className="text-sm font-medium">{title}</span>
            <HelpTooltip 
                content={description}
                detailedContent={detailedContent}
                variant="info"
            />
        </div>
    );
}
