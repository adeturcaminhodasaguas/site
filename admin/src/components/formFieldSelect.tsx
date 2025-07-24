'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface FormFieldSelectProps<T> {
    id: string;
    label: string;
    options: T[];
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
    getLabel: (option: T) => string;
    getValue: (option: T) => string;
}

export function FormFieldSelect<T>({
    id,
    label,
    options,
    control,
    error,
    required = false,
    getLabel,
    getValue,
}: FormFieldSelectProps<T>) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <Controller
                name={id}
                control={control}
                render={({ field }) => (
                    <Select value={field.value || ''} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option, index) => (
                                <SelectItem key={index} value={getValue(option)}>
                                    {getLabel(option)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />

            {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
    );
}
