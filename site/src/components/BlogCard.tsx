"use client";

import Image from "next/image";
import { BlogType } from "@/lib/interfaces/BlogType";
import { Calendar, User, Tag } from "lucide-react";
import formatLabel from "@/lib/helper/formatLabel";

interface BlogCardProps {
    blog: BlogType;
    onClick?: () => void;
}

export default function BlogCard({ blog, onClick }: BlogCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div
            className="bg-background rounded-xl shadow-md overflow-hidden group cursor-pointer flex flex-col justify-between w-[520px]"
            onClick={onClick}
        >
            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={blog.urlImagem}
                    alt={blog.titulo}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute top-4 right-4 poppins bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-highlight">
                    <Tag className="w-4 h-4 inline-block mr-1" />
                    {formatLabel(blog.categoria)}
                </div>

                {blog.destaque && (
                    <div className="absolute top-4 left-4 poppins bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-white">
                        Destaque
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-lg font-bold text-foreground mb-3 montserrat group-hover:text-primary transition-colors duration-200">
                    {blog.titulo}
                </h3>

                <p className="text-sm text-foreground-secondary leading-relaxed poppins mb-4 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {blog.resumo}
                </p>

                <div className="space-y-2 text-sm text-foreground-secondary mt-auto">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-highlight" />
                        <span>{formatDate(blog.dataPublicacao)}</span>
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-highlight" />
                        <span>{blog.autor}</span>
                    </div>
                    <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-highlight" />
                        <span>{formatLabel(blog.categoria)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
