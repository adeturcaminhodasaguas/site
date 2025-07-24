import React from 'react';
import { Button } from './ui/button';

type PrimaryButtonProps = {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    type?: 'button' | 'submit';
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    fullWidth?: boolean;
};

export default function PrimaryButton({ variant = "default", type = "button", onClick, disabled = false, children, fullWidth }: PrimaryButtonProps) {
    return (
        <Button
            type={type}
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            size="lg"
            className={`transition duration-200 ease-in-out cursor-pointer hover:scale-105 ${fullWidth ? "w-full" : ""}`}
        >
            {children}
        </Button>
    );
}
