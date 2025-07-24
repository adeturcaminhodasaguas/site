import Image from "next/image";

import LogoPng from "../../public//logo.png";

type LogoProps = {
    width?: number;
    height?: number;
}

export default function Logo({ width, height }: LogoProps) {
    return (
        <Image
            src={LogoPng}
            alt="Logo"
            width={width || 100}
            height={height || 100}
        />
    );
}