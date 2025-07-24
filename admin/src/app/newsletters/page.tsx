"use client";

import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import Modal from "@/components/dialog/Modal";
import Container from "@/components/layout/container";
import { Paginacao } from "@/components/paginacao";
import Tables from "@/components/table/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useFormDialog } from "@/hooks/use-form-dialog";
import NewsletterService from "@/lib/service/NewsletterService";
import { NewsletterType } from "@/lib/types/NewsletterType";
import { Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Newsletters() {
    const [newsletters, setNewsletters] = useState<NewsletterType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newsletterId, setNewsletterId] = useState<string | null>(null);
    const totalPage = useRef<number>(1);
    const totalResultados = useRef<number>(1);
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        isDeleting,
        isSubmitting,
        isFetchingEdit,
        setIsDeleting,
        toast,
    } = useFormDialog();

    const listar = async (page: number = 0) => {
        setIsLoading(true);
        try {
            const service = new NewsletterService();
            const data = await service.listar(page);
            setNewsletters(data?.content || []);
            totalPage.current = data?.totalPages || 1;
            totalResultados.current = data?.totalElements || 0;
        } catch (error) {
            toast("error", "Erro ao listar os newsletters");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // Se não há parâmetro de página na URL, definir como página 1
        if (!searchParams.get("page")) {
            router.push('?page=1', { scroll: false });
            return;
        }

        // Converte a página do frontend (baseada em 1) para o backend (baseada em 0)
        const pageForBackend = currentPage - 1;
        listar(pageForBackend);
    }, [currentPage, searchParams, router]);

    const toggleStatus = async (id: string, novoStatus: boolean) => {
        try {

            const service = new NewsletterService();
            await service.alterarStatus(id);

            setNewsletters(prev => {
                // Atualiza o status
                const atualizados = prev.map(m =>
                    m.id === id ? { ...m, status: novoStatus ? "Ativo" : "Inativo" } : m
                );

                // Ordena: "Ativo" vem antes de "Inativo"
                return atualizados.sort((a, b) => {
                    if (a.status === b.status) return 0;
                    return a.status === "Ativo" ? -1 : 1;
                });
            });

            toast("success", `Newsletter ${novoStatus ? "ativado" : "inativado"} com sucesso`);
        } catch (error) {
            toast("error", "Erro ao atualizar o status do newsletter");
        }
    };

    const excluir = async (id: string) => {
        setIsDeleting(true);
        setNewsletterId(id);
    };

    const confirmarExclusao = async () => {
        if (!newsletterId) return;

        try {
            const newsletterService = new NewsletterService();
            await newsletterService.excluir(newsletterId);

            // Após excluir, verificar se precisa voltar para página anterior
            const pageForBackend = currentPage - 1;
            const response = await newsletterService.listar(pageForBackend);

            // Se a página atual ficou vazia e não é a primeira página, voltar uma página
            if (response.content.length === 0 && currentPage > 1) {
                router.push(`?page=${currentPage - 1}`, { scroll: false });
            } else {
                // Caso contrário, recarregar a página atual
                listar(pageForBackend);
            }

            setIsDeleting(false);
            toast("success", "Newsletter excluído com sucesso");
        } catch (error) {
            toast("error", "Erro ao excluir o newsletter");
        } finally {
            setIsDeleting(false);
        }
    };

    const reset = () => {
        setIsDeleting(false);
        setNewsletterId(null);
    };

    const columns = [
        { headerName: "E-mail", field: "email" },
        {
            headerName: "Status", field: "status", valueGetter: (value: string) => {
                return < Badge
                    className={`w-25 p-[6px] border ${value === "Ativo"
                        ? "bg-green-500/50 border-green-600 text-green-800"
                        : "bg-red-500/50 border-red-600 text-red-800"
                        }`
                    }
                >
                    {value}
                </ Badge>
            }
        },
        {
            headerName: "Ações", field: "acoes", isCenter: true, renderCell: (params: { row: NewsletterType }) => {
                return (
                    <div className="flex gap-2 items-center justify-center">
                        <div>
                            <Switch
                                checked={params.row.status === "Ativo"}
                                onCheckedChange={(checked) => toggleStatus(params.row.id, checked)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => excluir(params.row.id)}
                                disabled={isFetchingEdit}
                                className="disabled:opacity-50 hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                );
            }
        }

    ];

    return (
        <Container title="Newsletters">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">
                        Newsletters
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie os newsletters.
                    </p>
                </div>
            </div>

            <FadeInOnScroll
                direction="up"
                delay={0.2}
                duration={0.6}
            >
                <div className="space-y-4">
                    <Tables data={newsletters} columns={columns} isLoading={isLoading} />
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {totalResultados.current} {totalResultados.current === 1 ? "resultado" : "resultados"}
                        </div>

                        <div className="flex-1 flex justify-center">
                            <Paginacao totalPage={totalPage.current} />
                        </div>

                        <div className="flex-1" />
                    </div>
                </div>
            </FadeInOnScroll>

            <Modal isOpen={isDeleting} onClose={reset} title="Excluir Newsletter">
                <div className="space-y-4">
                    <p>Tem certeza que deseja excluir este newsletter?</p>
                    <div className="flex gap-2 pt-4">
                        <Button
                            type="button"
                            variant="destructive"
                            className="flex-1"
                            onClick={confirmarExclusao}
                            disabled={isSubmitting}
                        >
                            Excluir
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={reset}
                            size="lg"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal>
        </Container>
    );
}