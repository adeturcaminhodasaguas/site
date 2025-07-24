import FacebookSvg from "../../public/facebook.svg";
import InstagramSvg from "../../public/instagram.svg";
import Separator from "./Separator";
import ItemMenu from "./ItemMenu";

export default function SocialMedia() {
    return (
        <ul className="flex items-center gap-4">
            <li>
                <span className="font-normal poppins text-sm text-foreground">Redes Sociais</span>
            </li>

            <li className="h-4">
                <Separator position="left" />
            </li>

            <li className="flex items-center gap-2">
                <ItemMenu icon={FacebookSvg} label="Facebook" href="#" />
            </li>

            <li className="h-4">
                <Separator position="left" />
            </li>

            <li className="flex items-center gap-2">
                <ItemMenu icon={InstagramSvg} label="Instagram" href="#" />
            </li>
        </ul>
    );
}