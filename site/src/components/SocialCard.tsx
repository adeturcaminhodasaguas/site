import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type SocialCardProps = {
    icon: LucideIcon;
    name: string;
    url: string;
}; 

export default function SocialCard({
    icon: Icon,
    name,
    url,
}: SocialCardProps) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 bg-primary  group font-semibold cursor-pointer poppins rounded-full transition-all duration-300 transform hover:scale-105  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none  justify-center"
        >
            <Icon className={`w-6 h-6 text-background `} />
            <span className="font-medium text-background">{name}</span>
        </Link>
    );
}
