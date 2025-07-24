"use client";

import { useState } from "react";
import Container from "./Container";
import ItemMenu from "./ItemMenu";
import Logo from "./Logo";
import Separator from "./Separator";
import SocialMedia from "./SocialMedia";
import PrimaryButton from "./PrimaryButton";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <Container>
                <div>
                    <div className="flex items-center justify-end py-4">
                        <SocialMedia />
                    </div>
                    <Separator position="horizontal" />

                    <div className="flex items-center justify-between py-2">
                        <div className="pl-4">
                            <Logo />
                        </div>

                        <ul className="hidden md:flex items-center gap-6">
                            <li className="relative group cursor-pointer text-primary transition-colors duration-300">
                                <ItemMenu label="Sobre Nós" href="/" />
                                <span className="absolute left-0 bottom-0 h-[2px] w-full origin-bottom-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"></span>
                            </li>
                            <li className="relative group cursor-pointer text-primary transition-colors duration-300">
                                <ItemMenu label="Municípios" href="/municipios" />
                                <span className="absolute left-0 bottom-0 h-[2px] w-full origin-bottom-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"></span>
                            </li>
                            <li className="relative group cursor-pointer text-primary transition-colors duration-300">
                                <ItemMenu label="Turismo e Experiências" href="/turismo-experiencia" />
                                <span className="absolute left-0 bottom-0 h-[2px] w-full origin-bottom-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"></span>
                            </li>
                            <li className="relative group cursor-pointer text-primary transition-colors duration-300">
                                <ItemMenu label="Sabores e Culturas" href="/sabores-cultura" />
                                <span className="absolute left-0 bottom-0 h-[2px] w-full origin-bottom-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"></span>
                            </li>
                            <li className="relative group cursor-pointer text-primary transition-colors duration-300">
                                <ItemMenu label="Eventos" href="/eventos" />
                                <span className="absolute left-0 bottom-0 h-[2px] w-full origin-bottom-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"></span>
                            </li>
                            {/* <li className="relative group cursor-pointer text-primary transition-colors duration-300">
                                <ItemMenu label="Blog" href="/blog" />
                                <span className="absolute left-0 bottom-0 h-[2px] w-full origin-bottom-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"></span>
                            </li> */}
                        </ul>

                        <div className="hidden md:block">
                            <PrimaryButton variant="outline">
                                <Link href="/contato">
                                    <span className="text-sm poppins">CONTATO</span>
                                </Link>
                            </PrimaryButton>
                        </div>


                        <div className="md:hidden pr-4">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-primary rounded-lg"
                                aria-expanded={menuOpen}
                            >
                                {menuOpen ? (
                                    <X
                                        className="w-6 h-6 text:bg-primary"
                                    />
                                ) : (

                                    <Menu
                                        className="w-6 h-6 text:bg-primary"
                                    />
                                )}

                            </button>
                        </div>
                    </div>

                    {menuOpen && (
                        <div className="md:hidden px-4 mt-4 pb-4 ">
                            <ul className="flex flex-col gap-6">
                                <li>
                                    <ItemMenu label="Sobre Nós" href="/" />
                                </li>
                                <li>
                                    <ItemMenu label="Municípios" href="/municipios" />
                                </li>
                                <li>
                                    <ItemMenu label="Turismo e Experiências" href="/turismo-experiencia" />
                                </li>
                                <li>
                                    <ItemMenu label="Sabores e Culturas" href="/sabores-cultura" />
                                </li>
                                <li>
                                    <ItemMenu label="Eventos" href="/eventos" />
                                </li>
                                <li>
                                    <ItemMenu label="Blog" href="/blog" />
                                </li>
                            </ul>
                            <div className="mt-8">
                                <PrimaryButton variant="outline" size="lg" className="w-full">
                                    <Link href="/contato">
                                        <span className="text-sm poppins">CONTATO</span>
                                    </Link>
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
}
