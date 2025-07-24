import Link from "next/link";

type TableLinkProps = {
    value: string;
    icon: React.ReactNode;
    label: string;
};

export default function TableLink({ value, icon, label }: TableLinkProps) {
    return (
        <Link
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-center hover:underline"
        >
            {icon}
            <span>
                {label}
            </span>
        </Link>
    );
}