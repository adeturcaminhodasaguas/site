import { Frown } from "lucide-react";


export default function FilterNotFound() {
    return (
        <div className="text-center text-foreground-secondary col-span-full">
            <Frown className="mx-auto mb-4 w-52 h-52 text-foreground-secondary" />
            <h2 className="text-2xl poppins font-semibold mb-2">Nenhum resultado encontrado</h2>
        </div>
    );
}