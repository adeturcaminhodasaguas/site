import React from 'react';

type PrimaryButtonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    type?: 'button' | 'submit'  ;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
};

export default function PrimaryButton({
    children,
    variant = 'primary',
    type = 'button',
    size = 'md',
    fullWidth = false,
    onClick,
    disabled = false,
    className = ''
}: PrimaryButtonProps) {
    const baseClasses = "font-semibold cursor-pointer poppins rounded-full transition-all duration-300 transform hover:scale-105  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2";

    const variantClasses = {
        primary: "bg-[#2D2F93] text-white hover:bg-[#1f2170] focus:ring-[#2D2F93]",
        secondary: "bg-white text-[#2D2F93] border-2 border-gray-300 hover:border-[#2D2F93] hover:text-[#1f2170] hover:shadow-lg focus:ring-[#2D2F93]",
        outline: "border-2 border-[#2D2F93] text-[#2D2F93] hover:bg-[#f0f1fa] hover:text-[#1f2170] focus:ring-[#2D2F93]"
    };

    const sizeClasses = {
        sm: "px-4 py-2 text-sm h-10 min-w-[120px]",
        md: "px-6 py-3 text-base h-12 min-w-[160px]",
        lg: "px-8 py-4 text-lg h-14 min-w-[200px]"
    };

    const widthClass = fullWidth ? "w-full" : "";

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

    return (
        <button
            type={type}
            className={combinedClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
