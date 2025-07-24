"use client";

type SeparatorProps = {
    position?: "left" | "right" | "horizontal";
    className?: string;
};

export default function Separator({ position = "left", className }: SeparatorProps) {
    const positionClasses: Record<string, string> = {
        left: "border-l h-full",
        right: "border-r h-full",
        horizontal: "border-b w-full",
    };

    return (
        <div className={`${positionClasses[position] || positionClasses.left} border-foreground mx-2 ${className}`} />
    );
}

