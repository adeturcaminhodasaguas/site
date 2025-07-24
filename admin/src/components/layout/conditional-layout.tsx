"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname();

    // Rotas que não devem exibir a sidebar
    const authRoutes = ['/auth/login', '/auth/register'];
    const shouldHideSidebar = authRoutes.some(route => pathname.startsWith('/auth'));

    if (shouldHideSidebar) {
        // Para rotas de autenticação, renderiza apenas o children sem sidebar
        return <>{children}</>;
    }

    // Para outras rotas, renderiza com sidebar
    return (
        <SidebarProvider>
            <AppSidebar />
            {children}
        </SidebarProvider>
    );
}
