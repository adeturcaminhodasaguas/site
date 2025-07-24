import Image from "next/image";
import Container from "./Container";

import MunicipioSvg from "../../public//city.svg";
import ComidaSvg from "../../public//food.svg";
import TurismoSvg from "../../public//tourism.svg";


export default function CardInfo() {
    return (
        <div className="py-10">
            <Container>
                <div className="flex bg-background-secondary p-6 rounded-2xl justify-between items-start gap-10 flex-wrap md:flex-nowrap">
                    <div className="flex flex-col items-center text-center flex-1 px-4">
                        <Image
                            src={MunicipioSvg}
                            alt="Município"
                            className="w-12 h-12"
                        />
                        <h2 className="text-foreground font-bold text-xl mt-4">MUNICÍPIOS</h2>
                        <p className="text-foreground-secondary text-sm mt-2 max-w-xs">
                            Descubra a diversidade e a riqueza cultural dos nossos municípios.
                            Conheça suas histórias, tradições e belezas naturais.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center flex-1 px-4">
                        <Image
                            src={ComidaSvg}
                            alt="Comida"
                            className="w-12 h-12"
                        />
                        <h2 className="text-foreground font-bold text-xl mt-4">SABORES E CULTURAS</h2>
                        <p className="text-foreground-secondary text-sm mt-2 max-w-xs">
                            Explore os sabores autênticos da nossa região.
                            Uma viagem gastronômica que celebra a cultura local.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center flex-1 px-4">
                        <Image
                            src={TurismoSvg}
                            alt="Turismo"
                            className="w-12 h-12"
                        />
                        <h2 className="text-foreground font-bold text-xl mt-4">TURISMO E EXPERIÊNCIAS</h2>
                        <p className="text-foreground-secondary text-sm mt-2 max-w-xs">
                            Descubra as melhores experiências turísticas da nossa região.
                            Aventure-se por paisagens deslumbrantes e vivencie momentos inesquecíveis.
                        </p>
                    </div>
                </div>
            </Container>
        </div>

    );
}