'use client';

import { showToast, ToastType } from '@/components/ShowToast';
import { useState } from 'react';

export function useFormDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingEdit, setIsFetchingEdit] = useState(false);

    const openNew = () => {
        setEditingId(null);
        setIsDeleting(false);
        setIsOpen(true);
        setIsFetchingEdit(false);
        setIsSubmitting(false);
    };

    const openEdit = (id: string) => {
        setEditingId(id);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setIsDeleting(false);
        setEditingId(null);
        setIsSubmitting(false);
        setIsFetchingEdit(false);
    };

    const toast = (type: ToastType, message: string) => {
        showToast(type, message);
    };

    return {
        isOpen,
        editingId,
        isDeleting,
        isSubmitting,
        isFetchingEdit,
        setIsOpen,
        setIsDeleting,
        setIsSubmitting,
        setIsFetchingEdit,
        openNew,
        openEdit,
        toast,
        close,
    };
}
