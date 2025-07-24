import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import SocialCard from "./SocialCard";

export default function CardRedesSocias() {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-xl font-bold text-[#1E1E1E] mb-6 montserrat">
                Redes Sociais
            </h2>
            <div className="grid grid-cols-2 gap-4 ">
                <SocialCard
                    icon={Facebook}
                    name="Facebook"
                    url="#"
                />
                <SocialCard
                    icon={Instagram}
                    name="Instagram"
                    url="#"
                />
                <SocialCard
                    icon={Youtube}
                    name="YouTube"
                    url="#"
                />
                <SocialCard
                    icon={MessageCircle}
                    name="Whatsapp"
                    url="#"
                />
            </div>
        </div>
    );
}