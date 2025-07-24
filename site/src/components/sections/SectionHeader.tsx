type SectionHeaderProps = {
    title: string;
    subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className="flex p-6 justify-center items-center w-full h-72 relative animate-fade">
            <div className="absolute z-20 flex flex-col gap-2 justify-center items-center w-full h-full text-center">
                <h1 className="text-2xl md:text-5xl font-bold uppercase text-gradient mb-2 montserrat text-primary">
                    {title}
                </h1>
                {subtitle && (
                    <h2 className="text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed text-highlight font-medium poppins tracking-wider mb-2">
                        {subtitle}
                    </h2>
                )}
            </div>

        </div>
    );
}
