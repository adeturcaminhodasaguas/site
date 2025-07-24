
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import BreadcrumbComponent from "./breadcrumb";


type ContainerProps = {
    children: React.ReactNode;
    title: string;
}

export default function Container({ children, title }: ContainerProps) {
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <BreadcrumbComponent title={title} />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-12 max-w-8xl ">
                {children}
            </div>
        </SidebarInset>
    );
}