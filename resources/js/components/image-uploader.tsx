import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTrans } from '@/hooks/useTrans';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

type ImageUploaderProps = {
    value: string[];
    onChange: (files: string[]) => void;
    maxFiles?: number;
};

export function ImageUploader({ value = [], onChange, maxFiles = 5 }: ImageUploaderProps) {
    const t = useTrans();
    const [previews, setPreviews] = useState<string[]>(value);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
            const updatedPreviews = [...previews, ...newPreviews].slice(0, maxFiles);
            setPreviews(updatedPreviews);
            onChange(updatedPreviews);
        },
        [previews, onChange, maxFiles],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
        },
        maxFiles: maxFiles - previews.length,
        disabled: previews.length >= maxFiles,
    });

    const removeImage = (index: number) => {
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        onChange(updatedPreviews);
    };

    return (
        <div className="space-y-4">
            {/* Dropzone */}
            {previews.length < maxFiles && (
                <div
                    {...getRootProps()}
                    className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                        isDragActive
                            ? 'border-primary bg-primary/10'
                            : 'border-muted-foreground/25 hover:border-primary/50'
                    }`}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-2">
                        <Upload
                            className={`h-10 w-10 ${
                                isDragActive ? 'text-primary' : 'text-muted-foreground'
                            }`}
                        />
                        {isDragActive ? (
                            <p className="text-sm font-medium text-primary">
                                {t('Drop images here...')}
                            </p>
                        ) : (
                            <>
                                <p className="text-sm font-medium">
                                    {t('Drag & drop images here, or click to select')}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {t('PNG, JPG, GIF up to 10MB')} ({previews.length}/{maxFiles})
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Image Previews */}
            {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {previews.map((preview, index) => (
                        <Card key={index} className="relative overflow-hidden">
                            <CardContent className="p-2">
                                <div className="group relative aspect-square overflow-hidden rounded-md">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {previews.length === 0 && (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                        <ImageIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            {t('No images uploaded yet')}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

