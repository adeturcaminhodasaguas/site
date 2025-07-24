import formatLabel from "@/lib/helper/formatLabel";
import { FilterIcon } from "lucide-react";

type FilterProps = {
    onFilterChange: (filter: string) => void;
    selectedFilter: string;
    filters: string[];
}


export default function Filter({ onFilterChange, selectedFilter, filters }: FilterProps) {
    return (
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg">
            <div className="flex items-center gap-2 p-2 rounded-lg">
                <FilterIcon className="w-6 h-6 text-primary mr-2" />
                <span className="font-semibold text-foreground poppins">Filtrar por:</span>
            </div>
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`p-2 rounded-4xl transition-colors ${selectedFilter === filter
                        ? 'bg-primary text-white'
                        : 'bg-foreground-secondary/50 text-white hover:bg-primary hover:text-white'
                        }`}
                >
                    <span className="font-semibold poppins">{formatLabel(filter)}</span>
                </button>
            ))}
        </div>
    );
}