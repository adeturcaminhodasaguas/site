'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Controller, Control, FieldError } from 'react-hook-form';

interface ImageFile {
    file?: File;
    preview: string;
    id: string;
    isExisting?: boolean; // Para identificar imagens que já existem no servidor
}

interface ImageUploadProps {
    label: string;
    name: string;
    control?: Control<any>;
    error?: FieldError;
    value?: File[] | File | null;
    onChange?: (files: File[] | File | null) => void;
    accept?: string;
    maxFiles?: number;
    maxSize?: number; // MB
    className?: string;
    required?: boolean;
    multiple?: boolean; // Nova prop para controlar se aceita múltiplas imagens
    existingImages?: string | string[]; // URLs das imagens existentes
}

// Componente interno para o upload
function ImageUploadInternal({
    label,
    value,
    onChange,
    accept = 'image/*',
    maxFiles = 5,
    maxSize = 5,
    className = '',
    required = false,
    multiple = true,
    error,
    existingImages,
}: Omit<ImageUploadProps, 'name' | 'control'>) {
    const [images, setImages] = useState<ImageFile[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect para carregar imagens existentes
    useEffect(() => {
        if (existingImages) {
            const urls = multiple ?
                (Array.isArray(existingImages) ? existingImages : [existingImages]) :
                (typeof existingImages === 'string' ? [existingImages] : []);

            if (urls.length > 0) {
                const existingImageFiles = urls.map((url: string) => ({
                    preview: url,
                    id: Math.random().toString(36).substring(2, 9),
                    isExisting: true,
                }));

                // Substitui apenas as imagens existentes, mantendo os arquivos
                setImages(prev => {
                    const fileImages = prev.filter(img => !img.isExisting);
                    return [...existingImageFiles, ...fileImages];
                });
            }
        } else {
            // Se não há imagens existentes, remove apenas as imagens existentes
            setImages(prev => prev.filter(img => !img.isExisting));
        }
    }, [existingImages, multiple]);

    useEffect(() => {
        // Se não há value (arquivos novos), limpa apenas os arquivos, mantém existentes
        if (!value || (Array.isArray(value) && value.length === 0)) {
            const filesToClean = images.filter(img => !img.isExisting);

            // Limpa URLs de objeto dos arquivos (não das imagens existentes)
            filesToClean.forEach((img: ImageFile) => {
                if (img.preview.startsWith('blob:')) {
                    URL.revokeObjectURL(img.preview);
                }
            });

            setImages(prev => prev.filter(img => img.isExisting));

            // Limpa também o input file
            if (inputRef.current) {
                inputRef.current.value = '';
            }
            return;
        }

        if (value) {
            const files = multiple ? (Array.isArray(value) ? value : [value]) : (value instanceof File ? [value] : []);
            if (files.length > 0) {
                // Mantém as imagens existentes e adiciona as novas
                const existingImagesInState = images.filter(img => img.isExisting);

                // Limpa apenas as imagens de arquivo anteriores
                const oldFileImages = images.filter(img => !img.isExisting);
                oldFileImages.forEach((img: ImageFile) => {
                    if (img.preview.startsWith('blob:')) {
                        URL.revokeObjectURL(img.preview);
                    }
                });

                const newFileImages = files.map((file: File) => ({
                    file,
                    preview: URL.createObjectURL(file),
                    id: Math.random().toString(36).substring(2, 9),
                    isExisting: false,
                }));

                setImages([...existingImagesInState, ...newFileImages]);

                // Cleanup function para quando o componente for desmontado
                return () => {
                    newFileImages.forEach((img: ImageFile) => {
                        if (img.preview.startsWith('blob:')) {
                            URL.revokeObjectURL(img.preview);
                        }
                    });
                };
            }
        }
    }, [value, multiple]);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const newFiles: File[] = [];
        const validationErrors: string[] = [];

        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) {
                validationErrors.push(`${file.name} não é uma imagem`);
                return;
            }
            if (file.size > maxSize * 1024 * 1024) {
                validationErrors.push(`${file.name} excede o tamanho máximo de ${maxSize}MB`);
                return;
            }
            newFiles.push(file);
        });

        if (validationErrors.length > 0) {
            alert(validationErrors.join('\n'));
            return;
        }

        if (multiple) {
            const currentFiles = images.filter(img => img.file).map(i => i.file).filter((file): file is File => file !== undefined);
            const allFiles = [...currentFiles, ...newFiles].slice(0, maxFiles);
            onChange?.(allFiles);
        } else {
            // Para uma única imagem, pega apenas o primeiro arquivo
            onChange?.(newFiles[0] || null);
        }
    };

    const removeImage = (id: string) => {
        const updated = images.filter(img => img.id !== id);
        setImages(updated);

        if (multiple) {
            const files = updated.map(i => i.file).filter((file): file is File => file !== undefined);
            onChange?.(files);
        } else {
            onChange?.(null);
        }
    };

    const openFileDialog = () => inputRef.current?.click();

    return (
        <div className={`space-y-2 ${className}`}>
            <Label className="text-sm font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                onClick={openFileDialog}
            >
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                    Clique para selecionar ou arraste {multiple ? 'imagens' : 'uma imagem'} aqui
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {multiple ? `Até ${maxFiles} imagens` : '1 imagem'} • máx {maxSize}MB cada
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={e => handleFiles(e.target.files)}
                    className="hidden"
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">{error.message}</p>
            )}

            {images.length > 0 && (
                <div
                    className={`flex flex-wrap gap-3`}
                >
                    {images.map(img => (
                        <div key={img.id} className="relative group w-12 h-12">
                            <img
                                src={img.preview}
                                alt="preview"
                                className="w-full h-full object-cover rounded border"
                            />
                            <Button
                                size="icon"
                                variant="destructive"
                                className="absolute -top-2 -right-2 h-4 w-4 p-0 opacity-80 hover:opacity-100"
                                onClick={() => removeImage(img.id)}
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

// Componente principal que integra com react-hook-form
export function ImageUpload({
    name,
    control,
    label,
    accept = 'image/*',
    maxFiles = 5,
    maxSize = 5,
    className = '',
    required = false,
    multiple = true,
    error,
    existingImages,
}: ImageUploadProps) {
    if (control) {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <ImageUploadInternal
                        label={label}
                        value={field.value}
                        onChange={field.onChange}
                        accept={accept}
                        maxFiles={maxFiles}
                        maxSize={maxSize}
                        className={className}
                        required={required}
                        multiple={multiple}
                        error={fieldState.error}
                        existingImages={existingImages}
                    />
                )}
            />
        );
    }

    // Fallback para uso sem react-hook-form
    return (
        <ImageUploadInternal
            label={label}
            accept={accept}
            maxFiles={maxFiles}
            maxSize={maxSize}
            className={className}
            required={required}
            multiple={multiple}
            error={error}
            existingImages={existingImages}
        />
    );
}
