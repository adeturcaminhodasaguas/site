"use client";

import PrimaryButton from "./PrimaryButton";

type HeaderSectionProps = {
    title: string;
    description: string;
    onClick?: () => void;
    icon: React.ReactNode;
}

export default function HeaderSection({ title, description, onClick, icon }: HeaderSectionProps) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div>
                <PrimaryButton onClick={onClick}>
                    {icon}
                    Adicionar {title}
                </PrimaryButton>
            </div>
        </div>
    );
}