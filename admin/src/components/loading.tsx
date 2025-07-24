import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

type LoadingProps = {
    size?: string;
    speed?: string;
    color?: string;
    fullScreen?: boolean;
};

export default function Loading({ size = '45', speed = '1.75', color = 'black', fullScreen = false }: LoadingProps) {
    return (
        <div className={fullScreen ? 'fixed top-0 left-0 w-full h-full flex items-center justify-center' : ''}>
            <Bouncy size={size} speed={speed} color={color} />
        </div>
    );
}