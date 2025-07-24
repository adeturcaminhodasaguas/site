import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Archive, ArchiveRestore } from "lucide-react";
import Image from "next/image";

type Column<T> = {
    field: keyof T | string;
    headerName: string;
    isCenter?: boolean;
    renderCell?: (params: { row: T }) => React.ReactNode;
    valueGetter?: (value: any) => React.ReactNode;
};

type TablesProps<T> = {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
};

function Tables<T extends Record<string, any>>({
    data,
    columns,
    isLoading = false,
}: TablesProps<T>) {
    const isListValid = Array.isArray(data) && data.length > 0;

    return (
        <div>
            <Table >
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={String(column.field)}
                                className={
                                    column.isCenter
                                        ? "text-center px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
                                        : "px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
                                }
                            >
                                {column.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        [...Array(5)].map((_, idx) => (
                            <TableRow key={idx}>
                                {columns.map((col, colIdx) => (
                                    <TableCell key={colIdx} className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : isListValid ? (
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                className="align-middle hover:bg-gray-50 transition"
                            >
                                {columns.map((col) => (
                                    <TableCell
                                        key={String(col.field)}
                                        className="px-6 py-4 text-sm font-medium text-gray-800"
                                    >
                                        {col.renderCell
                                            ? col.renderCell({ row })
                                            : col.valueGetter
                                                ? col.valueGetter(row[col.field])
                                                : row[col.field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-8 text-gray-500 text-[1.2rem]"
                            >
                                <div className="flex justify-center items-center pb-2">
                                    <ArchiveRestore size={45}></ArchiveRestore>
                                </div>
                                Nenhum dado disponível
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default Tables;
