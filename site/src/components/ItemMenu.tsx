import Image from "next/image";
import Link from "next/link";

type ItemMenuProps = {
    icon?: string;
    label: string;
    href: string;
};

export default function ItemMenu({ icon, label, href }: ItemMenuProps) {
    return (
        <div className="flex items-center gap-2">
            {icon && <Image src={icon} alt={label} width={10} height={14} />}
            <Link href={href}>
                <span className="poppins text-sm text-foreground hover:text-primary">{label}</span>
            </Link>
        </div>
    );
}