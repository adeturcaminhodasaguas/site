"use client";

import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import Modal from "@/components/dialog/Modal";
import FormSaboresCultura from "@/components/forms/formSaboresCultura";
import HeaderSection from "@/components/headerSection";
import Container from "@/components/layout/container";
import Tables from "@/components/table/table";
import TableLink from "@/components/table/tableLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFormDialog } from "@/hooks/use-form-dialog";
import { saboresCulturaSchema, SaboresCulturaForm } from "@/lib/schemas/schemas";
import MunicipioService from "@/lib/service/municipioService";
import SaboresCulturaService from "@/lib/service/saboresCulturaService";
import { MunicipioSelectType } from "@/lib/types/municipioType";
import { SaboresCulturaType } from "@/lib/types/saboresCulturaType";
import { formatarTelefone } from "@/lib/utils/mascara";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Instagram, Link2, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginacao } from "@/components/paginacao";

function SaboresCulturasContent() {
    const [lista, setLista] = useState<MunicipioSelectType[]>([]);
    const [saboreCulturaLista, setSaboreCulturaLista] = useState<SaboresCulturaType[]>([]);
    const [saboresCulturaId, setSaboresCulturaId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [existingImages, setExistingImages] = useState<{ imagem?: string }>({});
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
        municipioId: "",
        imagem: undefined,
    }

    const form = useForm<SaboresCulturaForm>({
        resolver: zodResolver(saboresCulturaSchema),
        defaultValues: ({
            ...defaultValue,
        })
    });

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

    const listarMunicipios = async () => {
        try {
            const service = new MunicipioService();
            const municipios = await service.listarMunicipioSelect();
            setLista(municipios);
        } catch (error) {
            toast("error", "Erro ao listar os municípios");
        }
    }

    const listarSaboresCultura = async (page: number = 0) => {
        try {
            setIsLoading(true);
            const service = new SaboresCulturaService();
            const saboresCultura = await service.listar(page);
            setSaboreCulturaLista(saboresCultura?.content || []);
            totalPage.current = saboresCultura?.totalPages || 1;
            totalResultados.current = saboresCultura?.totalElements || 0;
        } catch (error) {
            toast("error", "Erro ao listar os sabores & culturas");
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
        listarSaboresCultura(pageForBackend);
        listarMunicipios();
    }, [currentPage, searchParams, router]);

    const handleOpen = () => {
        openNew();
    };

    const toggleStatus = async (id: string, novoStatus: boolean) => {
        try {

            const saboresCulturaService = new SaboresCulturaService();
            await saboresCulturaService.alterarStatus(id);

            setSaboreCulturaLista(prev => {
                const atualizados = prev.map(m =>
                    m.id === id ? { ...m, status: novoStatus ? "Ativo" : "Inativo" } : m
                );

                return atualizados.sort((a, b) => {
                    if (a.status === b.status) return 0;
                    return a.status === "Ativo" ? -1 : 1;
                });
            })

            toast("success", `Sabores & Culturas ${novoStatus ? "ativado" : "inativado"} com sucesso`);
        } catch (error) {
            toast("error", "Erro ao atualizar o status do sabores & culturas");
        }
    };

    const columns = [
        { headerName: "Nome", field: "nome" },
        { headerName: "Municipio", field: "municipio", renderCell: (params: { row: SaboresCulturaType }) => params.row.municipio.nome },
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
            headerName: "Ações", field: "acoes", isCenter: true, renderCell: (params: { row: SaboresCulturaType }) => {
                return (
                    <div className="flex gap-2 justify-center items-center">
                        <div>
                            <Switch
                                checked={params.row.status === "Ativo"}
                                onCheckedChange={(checked) => toggleStatus(params.row.id, checked)}
                            />
                        </div>
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
                );
            }
        }
    ];

    const buscar = async (id: string) => {
        setIsFetchingEdit(true);
        setSaboresCulturaId(id);
        try {
            const service = new SaboresCulturaService();
            const saboresCultura = await service.buscarPorId(id);

            setExistingImages({
                imagem: saboresCultura.urlImagem
            });

            form.reset({
                id: saboresCultura.id,
                contato: saboresCultura.contato,
                descricao: saboresCultura.descricao,
                instagram: saboresCultura.instagram,
                nome: saboresCultura.nome,
                site: saboresCultura.site,
                municipioId: saboresCultura.municipio.id
            });
            openEdit(id);
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetchingEdit(false);
        }
    };

    const excluir = async (id: string) => {
        setIsDeleting(true);
        setSaboresCulturaId(id);
    };

    const reset = () => {
        setIsDeleting(false);
        setIsSubmitting(false);
        setIsFetchingEdit(false);
        setExistingImages({});
        close();
        form.reset({
            ...defaultValue,
        });
    }

    const confirmarExclusao = async () => {
        if (!saboresCulturaId) return;

        try {
            setIsSubmitting(true);
            const service = new SaboresCulturaService();
            await service.excluir(saboresCulturaId);

            // Após excluir, verificar se precisa voltar para página anterior
            const pageForBackend = currentPage - 1;
            const response = await service.listar(pageForBackend);

            // Se a página atual ficou vazia e não é a primeira página, voltar uma página
            if (response.content.length === 0 && currentPage > 1) {
                router.push(`?page=${currentPage - 1}`, { scroll: false });
            } else {
                // Caso contrário, recarregar a página atual
                listarSaboresCultura(pageForBackend);
            }

            setIsDeleting(false);
            toast("success", "Sabores & Culturas excluído com sucesso");
        } catch (error) {
            toast("error", "Erro ao excluir o sabores & culturas");
        } finally {
            setIsSubmitting(false);
        }
    }

    const onSubmit = async (data: SaboresCulturaForm) => {
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
        formData.append('municipioId', data.municipioId);

        if (data.imagem) {
            formData.append('imagem', data.imagem);
        }

        try {
            if (editingId) {
                await editar(formData);
            } else {
                await salvar(formData);
            }
        } catch (error) {
            toast("error", "Erro ao salvar o sabores & culturas");
        } finally {
            setIsSubmitting(false);
        }
    }

    const salvar = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const service = new SaboresCulturaService();
            await service.salvar(data);
            // Após salvar, voltar para a página 1 e recarregar a lista
            router.push('?page=1', { scroll: false });
            const pageForBackend = 0; // Página 1 do frontend = página 0 do backend
            listarSaboresCultura(pageForBackend);
            reset();
            toast("success", "Sabores & Culturas salvo com sucesso");
        } catch (error) {
            toast("error", "Erro ao salvar o sabores & culturas");
        } finally {
            setIsSubmitting(false);
        }
    }

    const editar = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const service = new SaboresCulturaService();
            await service.alterar(saboresCulturaId, data);
            // Manter na página atual após editar
            const pageForBackend = currentPage - 1;
            listarSaboresCultura(pageForBackend);
            reset();
            toast("success", "Sabores & Culturas atualizado com sucesso");
        } catch (error) {
            toast("error", "Erro ao atualizar o sabores & culturas");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container title="Sabores & Culturas">
            <HeaderSection
                title="Sabores & Culturas"
                description="Gerencie os sabores & culturas"
                onClick={handleOpen}
                icon={<Plus />}
            />
            <FadeInOnScroll
                direction="up"
                delay={0.2}
                duration={0.6}
            >
                <div className="space-y-4">
                    <Tables data={saboreCulturaLista} columns={columns} isLoading={isLoading} />
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

            <Modal isOpen={isOpen} onClose={reset} title={editingId ? "Editar sabores & culturas" : "Novo sabores & culturas"}>
                <div className="space-y-4">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormSaboresCultura
                            register={form.register}
                            errors={form.formState.errors}
                            control={form.control}
                            existingImagem={existingImages.imagem}
                            municipios={lista}
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

            <Modal isOpen={isDeleting} onClose={reset} title="Excluir sabores & culturas">
                <div className="space-y-4">
                    <p>Tem certeza que deseja excluir este sabores & culturas?</p>
                    <div className="flex gap-2 pt-4">
                        <Button
                            type="button"
                            variant="destructive"
                            className="flex-1"
                            onClick={confirmarExclusao}
                        >
                            Excluir
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={reset}
                            size="lg"
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal>
        </Container>
    );
}

export default function SaboresCulturas() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Carregando...</div>}>
            <SaboresCulturasContent />
        </Suspense>
    );
}