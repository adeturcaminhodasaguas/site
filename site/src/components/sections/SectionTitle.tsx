import React from "react";

interface SectionTitleProps {
    children: React.ReactNode;
    subtitle?: string;
}

export default function SectionTitle({ children, subtitle }: SectionTitleProps) {
    return (
        <div className="mb-6 flex flex-col items-center text-center">
            <h2 className="text-4xl text-primary md:text-5xl font-bold text-gradient mb-6 montserrat">
                {children}
            </h2>
            {subtitle && (
                <h6 className="text-xl text-foreground-secondary poppins max-w-3xl mx-auto leading-relaxed">
                    {subtitle}
                </h6>
            )}
        </div>
    );
}
