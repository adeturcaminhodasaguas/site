import { Instagram, Link, Phone } from "lucide-react";
import { formatarTelefone } from "../lib/utils/MaskPhone";

type ContactSectionProps = {
    instagram?: string;
    site?: string;
    contato: string;
};

export default function Contact({ instagram, site, contato }: ContactSectionProps) {
    return (
        <div className=" border-background-secondary">
            <div>
                <h4 className="text-sm font-semibold text-foreground-secondary montserrat mb-3">
                    Contatos
                </h4>

                <div className="flex flex-col gap-2 flex-wrap justify-start">
                    <div className="inline-flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="poppins font-medium text-primary hover:underline hover:underline-offset-2 hover:decoration-primary">
                            {formatarTelefone(contato)}
                        </span>
                    </div>

                    {site && (
                        <a
                            href={site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm"
                        >
                            <Link className="w-4 h-4 text-primary" />
                            <span className="poppins font-medium text-primary hover:underline hover:underline-offset-2 hover:decoration-primary">
                                Site
                            </span>
                        </a>
                    )}

                    {instagram && (
                        <a
                            href={instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm"
                        >
                            <Instagram className="w-4 h-4 text-primary" />
                            <span className="poppins font-medium text-primary hover:underline hover:underline-offset-2 hover:decoration-primary">
                                Instagram
                            </span>
                        </a>
                    )}
                </div>

            </div>
        </div>
    );
}