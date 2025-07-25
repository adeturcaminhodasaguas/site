"use client";

import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import HeaderSection from "@/components/headerSection";
import Container from "@/components/layout/container";
import Tables from "@/components/table/table";
import TableLink from "@/components/table/tableLink";
import MunicipioService from "@/lib/service/municipioService";
import { MunicipioType } from "@/lib/types/municipioType";
import { formatarTelefone } from "@/lib/utils/mascara";
import { Instagram, Link2, Pencil, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormDialog } from '@/hooks/use-form-dialog';
import { useEffect, useRef, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { MunicipioForm, municipioSchema } from "@/lib/schemas/schemas";
import FormMunicipio from "@/components/forms/formMunicipio";
import { Button } from "@/components/ui/button";
import Modal from "@/components/dialog/Modal";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Paginacao } from "@/components/paginacao";
import { useSearchParams, useRouter } from "next/navigation";

function MunicipiosContent() {
    const [municipios, setMunicipios] = useState<MunicipioType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [municipioId, setMunicipioId] = useState<string>("");
    const [existingImages, setExistingImages] = useState<{ brasao?: string, destaque?: string[] }>({});
    const totalPage = useRef<number>(1);
    const totalResultados = useRef<number>(1);
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;
    const defaultValue = {
        nome: "",
        descricao: "",
        contato: "",
        instagram: "",
        site: "",
        brasao: undefined,
        destaque: undefined,
    }

    const {
        isOpen,
        editingId,
        openNew,
        openEdit,
        close,
        isDeleting,
        isSubmitting,
        isFetchingEdit,
        setIsDeleting,
        toast,
        setIsSubmitting,
        setIsFetchingEdit,
    } = useFormDialog();

    const form = useForm<MunicipioForm>({
        resolver: zodResolver(municipioSchema),
        defaultValues: {
            ...defaultValue,
        }
    });

    const listarMunicipios = async (page: number = 0) => {
        setIsLoading(true);
        try {
            const municipioService = new MunicipioService();
            const municipios = await municipioService.listar(page);
            setMunicipios(municipios?.content || []);
            totalResultados.current = municipios?.totalElements || 0;
            totalPage.current = municipios?.totalPages || 1;
            setIsLoading(false);
        } catch (error) {
            toast("error", "Erro ao listar os municípios");
        } finally {
            setIsLoading(false);
        }
    };



    useEffect(() => {
        // Se não há parâmetro de página na URL, definir como página 1
        if (!searchParams.get("page")) {
            router.push('?page=1', { scroll: false });
            return;
        }

        // Converte a página do frontend (baseada em 1) para o backend (baseada em 0)
        const pageForBackend = currentPage - 1;
        listarMunicipios(pageForBackend);
    }, [currentPage, searchParams, router]);

    const handleOpen = () => {
        openNew();
    };

    const onSubmit = async (data: MunicipioForm) => {
        setIsSubmitting(true);
        const formData = new FormData();

        if (editingId) {
            formData.append('id', editingId);
        }

        formData.append('nome', data.nome);
        formData.append('instagram', data?.instagram || '');
        formData.append('site', data.site || '');
        formData.append('contato', data.contato);
        formData.append('descricao', data.descricao);

        if (data.brasao) {
            formData.append('brasao', data.brasao);
        }

        if (data.destaque && data.destaque.length > 0) {
            data.destaque.forEach((file: File) => {
                formData.append('destaque', file);
            });
        }

        try {
            if (editingId) {
                await editar(formData);
            } else {
                await salvar(formData);
            }
        } catch (error) {
            toast("error", "Erro ao salvar o município");
        } finally {
            setIsSubmitting(false);
        }
    };

    const salvar = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const municipioService = new MunicipioService();
            await municipioService.salvar(data);
            // Após salvar, voltar para a página 1 e recarregar a lista
            router.push('?page=1', { scroll: false });
            const pageForBackend = 0; // Página 1 do frontend = página 0 do backend
            listarMunicipios(pageForBackend);
            reset();
            toast("success", "Município salvo com sucesso");
        } catch (error: any) {
            console.log(error);
            toast("error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const editar = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const municipioService = new MunicipioService();
            await municipioService.alterar(municipioId, data);
            // Manter na página atual após editar
            const pageForBackend = currentPage - 1;
            listarMunicipios(pageForBackend);
            reset();
            toast("success", "Município atualizado com sucesso");
        } catch (error: any) {
            toast("error", error.message || "Erro ao atualizar o município");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleStatus = async (id: string, novoStatus: boolean) => {
        try {

            const municipioService = new MunicipioService();
            await municipioService.alterarStatus(id);

            setMunicipios(prev => {
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

            toast("success", `Município ${novoStatus ? "ativado" : "inativado"} com sucesso`);
        } catch (error) {
            toast("error", "Erro ao atualizar o status do município");
        }
    };


    const columns = [
        { headerName: "Nome", field: "nome" },
        {
            headerName: "Instagram", field: "instagram", valueGetter: (value: string) => {
                if (value) {
                    return (
                        <div className="flex justify-start">
                            <TableLink value={value} icon={<Instagram className="w-4 h-4" />} label="Instagram" />
                        </div>
                    );
                }
                return "Não informado";
            }
        },
        {
            headerName: "Site", field: "site", valueGetter: (value: string) => {
                if (value) {
                    return (
                        <div className="flex justify-start">
                            <TableLink value={value} icon={<Link2 className="w-4 h-4" />} label="Site" />
                        </div>
                    );
                }
                return "Não informado";
            }
        },
        {
            headerName: "Contato", field: "contato", valueGetter: (value: string) => {
                if (value) {
                    return formatarTelefone(value);
                }
                return "Não informado";
            }
        },
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
            headerName: "Ações", field: "acoes", isCenter: true, renderCell: (params: { row: MunicipioType }) => {
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
                                onClick={() => buscar(params.row.id)}
                                className="disabled:opacity-50 hover:opacity-100"
                                disabled={isFetchingEdit}
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
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

    const buscar = async (id: string) => {
        setIsFetchingEdit(true);
        setMunicipioId(id);
        try {
            const municipioService = new MunicipioService();
            const municipio = await municipioService.buscarPorId(id);

            setExistingImages({
                brasao: municipio.brasao,
                destaque: municipio.destaque
            });

            form.reset({
                id: municipio.id,
                contato: municipio.contato,
                descricao: municipio.descricao,
                instagram: municipio.instagram,
                nome: municipio.nome,
                site: municipio.site,
                brasao: undefined,
                destaque: undefined,
            });
            openEdit(id);
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetchingEdit(false);
        }
    };


    const reset = () => {
        form.reset({
            ...defaultValue,
        });
        setExistingImages({});
        close();
        setIsFetchingEdit(false);
    };

    const excluir = async (id: string) => {
        setIsDeleting(true);
        setMunicipioId(id);
    };

    const confirmarExclusao = async () => {
        if (!municipioId) return;

        try {
            const municipioService = new MunicipioService();
            await municipioService.excluir(municipioId);

            // Após excluir, verificar se precisa voltar para página anterior
            const pageForBackend = currentPage - 1;
            const response = await municipioService.listar(pageForBackend);

            // Se a página atual ficou vazia e não é a primeira página, voltar uma página
            if (response.content.length === 0 && currentPage > 1) {
                router.push(`?page=${currentPage - 1}`, { scroll: false });
            } else {
                // Caso contrário, recarregar a página atual
                listarMunicipios(pageForBackend);
            }

            setIsDeleting(false);
            toast("success", "Município excluído com sucesso");
        } catch (error) {
            toast("error", "Erro ao excluir o município");
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <Container title="Municípios">
            <HeaderSection
                title="Municípios"
                description="Gerencie os municípios"
                onClick={handleOpen}
                icon={<Plus />}
            />

            <FadeInOnScroll
                direction="up"
                delay={0.2}
                duration={0.6}
            >
                <div className="space-y-4">
                    <Tables data={municipios} columns={columns} isLoading={isLoading} />
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

            <Modal isOpen={isOpen} onClose={reset} title={editingId ? "Editar Município" : "Novo Município"}>
                <div className="space-y-4">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormMunicipio
                            register={form.register}
                            errors={form.formState.errors}
                            control={form.control}
                            existingBrasao={existingImages.brasao}
                            existingDestaque={existingImages.destaque}
                        />
                        <div className="flex gap-2 pt-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                {editingId ? 'Atualizar' : 'Salvar'}
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
                    </form>
                </div>
            </Modal>

            <Modal isOpen={isDeleting} onClose={reset} title="Excluir Município">
                <div className="space-y-4">
                    <p>Tem certeza que deseja excluir este município?</p>
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

export default function Municipios() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Carregando...</div>}>
            <MunicipiosContent />
        </Suspense>
    );
}
