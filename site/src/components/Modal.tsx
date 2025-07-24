import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
};

export default function Modal({
    isOpen,
    onClose,
    children,
    title,
    className = "",
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className={`
                    w-full
                    sm:max-w-xl
                    md:max-w-2xl
                    lg:max-w-4xl
                    xl:max-w-6xl
                    max-h-[90vh]
                    overflow-y-auto
                    border-none
                    ${className}
                `}
            >
                <DialogHeader>
                    {title && <DialogTitle className="poppins">{title}</DialogTitle>}
                </DialogHeader>

                <div className="mt-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
