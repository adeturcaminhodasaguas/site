interface MapContainerProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function MapContainer({ children, className = '', style = {} }: MapContainerProps) {
    return (
        <div
            className={`aspect-video rounded-2xl overflow-hidden  border border-background-alt bg-background ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
