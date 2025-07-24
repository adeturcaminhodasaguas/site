type ContainerProps = {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="w-full max-w-[1200px] px-4 mx-auto">
            {children}
        </div>
    );
}