'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'date' | 'time' | 'tel' | 'url';
    placeholder?: string;
    register: UseFormRegister<any>;
    maxLength?: number;
    error?: FieldError;
    required?: boolean;
    multiline?: boolean;
    rows?: number;
}

export function FormField({
    id,
    label,
    type = 'text',
    placeholder,
    register,
    error,
    maxLength,
    required = false,
    multiline = false,
    rows = 3,
}: FormFieldProps) {
    const max = maxLength ? maxLength : undefined;
    const [remainingChars, setRemainingChars] = React.useState(max);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (maxLength && value.length > maxLength) {
            e.target.value = value.slice(0, maxLength);
        }
        setRemainingChars(maxLength ? maxLength - value.length : undefined);
    };


    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            {multiline ? (
                <Textarea
                    id={id}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    {...register(id)}
                    onChange={handleTextareaChange}
                    className={`min-h-[${rows * 25}px]`}
                />
            ) : (
                <Input
                    id={id}
                    type={type}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    {...register(id)}
                />
            )}

            {maxLength ? (
                <p className="text-sm text-muted-foreground flex justify-end">
                    {remainingChars} caracteres restantes
                </p>
            ) : null}

            {error && (
                <p className="text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
}
