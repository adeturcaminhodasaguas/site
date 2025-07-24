import Container from "./Container";
import Logo from "./Logo";
import ItemMenu from "./ItemMenu";
import SocialMedia from "./SocialMedia";
import Separator from "./Separator";

export default function Footer() {
    return (
        <footer className="bg-gray-50 text-foreground mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start py-8 gap-8">

                    {/* Logo + Redes Sociais */}
                    <div className="flex flex-col gap-10">
                        <Logo width={150} height={150} />
                        <SocialMedia />
                    </div>

                    {/* Navegação */}
                    <ul className="flex flex-col  gap-4 text-sm">
                        <li>
                            <ItemMenu label="Sobre Nós" href="#" />
                        </li>
                        <li>
                            <ItemMenu label="Municipios" href="#" />
                        </li>
                        <li>
                            <ItemMenu label="Turismo e Experiências" href="#" />
                        </li>
                        <li>
                            <ItemMenu label="Sabores e Culturas" href="#" />
                        </li>
                    </ul>

                    {/* Contato / Endereço */}
                    <div className="text-sm space-y-1">
                        <p className="poppins"><strong>Endereço:</strong> Rua Exemplo, 123 - Centro, Cidade - UF</p>
                        <p className="poppins"><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                        <p className="poppins"><strong>Telefone:</strong> (44) 1234-5678</p>
                        <p className="poppins"><strong>Email:</strong> contato@turismo.com</p>
                    </div>
                </div>

                <Separator position="horizontal" />

                {/* Direitos Autorais */}
                <div className="text-sm text-center text-gray-500 mt-4 mb-4">
                    &copy; {new Date().getFullYear()} Todos os direitos reservados.
                </div>
            </Container>
        </footer>
    );
}
