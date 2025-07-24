"use client";

import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import HeaderSection from "@/components/headerSection";
import Container from "@/components/layout/container";
import Tables from "@/components/table/table";
import TableLink from "@/components/table/tableLink";
import { formatarTelefone } from "@/lib/utils/mascara";
import { Instagram, Link2, Pencil, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormDialog } from '@/hooks/use-form-dialog';
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { turismoExperienciaSchema, TurismoExperienciaForm } from "@/lib/schemas/schemas";
import { Button } from "@/components/ui/button";
import Modal from "@/components/dialog/Modal";
import TurismoExperienciaService from "@/lib/service/turismoExperienciaService";
import { TurismoExperienciaType } from "@/lib/types/turismoExperienciaType";
import FormTurismoExperiencia from "@/components/forms/formTurismoExperiencia";
import MunicipioService from "@/lib/service/municipioService";
import { MunicipioSelectType } from "@/lib/types/municipioType";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginacao } from "@/components/paginacao";

export default function TurismoExperiencia() {
    const [turismoExperienciaLista, setTurismoExperienciaLista] = useState<TurismoExperienciaType[]>([]);
    const [lista, setLista] = useState<MunicipioSelectType[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [turismoExperienciaId, setTurismoExperienciaId] = useState<string>("");
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

    const {
        isOpen,
        editingId,
        openNew,
        openEdit,
        close,
        isDeleting,
        toast,
        isSubmitting,
        isFetchingEdit,
        setIsDeleting,
        setIsSubmitting,
        setIsFetchingEdit,
    } = useFormDialog();


    const form = useForm<TurismoExperienciaForm>({
        resolver: zodResolver(turismoExperienciaSchema),
        defaultValues: ({
            ...defaultValue,
        })
    });

    const listar = async (page: number = 0) => {
        setIsLoading(true);
        try {
            const service = new TurismoExperienciaService();
            const turismos = await service.listar(page);
            setTurismoExperienciaLista(turismos?.content || []);
            totalPage.current = turismos?.totalPages || 1;
            totalResultados.current = turismos?.totalElements || 0;
            setIsLoading(false);
        } catch (error) {
            toast("error", "Erro ao listar os turismos & experiências");
        } finally {
            setIsLoading(false);
        }
    };

    const listarMunicipios = async () => {
        try {
            const service = new MunicipioService();
            const municipios = await service.listarMunicipioSelect();
            setLista(municipios);
        } catch (error) {
            toast("error", "Erro ao listar os turismos & experiências");
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
        listarMunicipios();
    }, [currentPage, searchParams, router]);

    const handleOpen = () => {
        openNew();
    };

    const onSubmit = async (data: TurismoExperienciaForm) => {
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
            setIsSubmitting(true);
            if (editingId) {
                await editar(formData);
            } else {
                await salvar(formData);
            }
        } catch (error) {
            toast("error", "Erro ao salvar o turismo & experiência");
        } finally {
            setIsSubmitting(false);
        }
    };

    const editar = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const service = new TurismoExperienciaService();
            await service.alterar(turismoExperienciaId, data);
            // Manter na página atual após editar
            const pageForBackend = currentPage - 1;
            listar(pageForBackend);
            reset();
            toast("success", "Turismo & Experiência atualizado com sucesso");
        } catch (error: any) {
            toast("error", error.message || "Erro ao atualizar o turismo & experiência");
        } finally {
            setIsSubmitting(false);
        }
    };

    const salvar = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const service = new TurismoExperienciaService();
            await service.salvar(data);
            // Após salvar, voltar para a página 1 e recarregar a lista
            router.push('?page=1', { scroll: false });
            const pageForBackend = 0; // Página 1 do frontend = página 0 do backend
            listar(pageForBackend);
            reset();
            toast("success", "Turismo & Experiência salvo com sucesso");
        } catch (error: any) {
            toast("error", error.message || "Erro ao salvar o turismo & experiência");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleStatus = async (id: string, novoStatus: boolean) => {
        try {

            const turismoExperienciaService = new TurismoExperienciaService();
            await turismoExperienciaService.alterarStatus(id);

            setTurismoExperienciaLista(prev => {
                const atualizados = prev.map(m =>
                    m.id === id ? { ...m, status: novoStatus ? "Ativo" : "Inativo" } : m
                );

                // Ordena: "Ativo" vem antes de "Inativo"
                return atualizados.sort((a, b) => {
                    if (a.status === b.status) return 0;
                    return a.status === "Ativo" ? -1 : 1;
                });
            });

            toast("success", `Turismo & Experiência ${novoStatus ? "ativado" : "inativado"} com sucesso`);
        } catch (error) {
            toast("error", "Erro ao atualizar o status do turismo & experiência");
        }
    };

    const columns = [
        { headerName: "Nome", field: "nome" },
        { headerName: "Municipio", field: "municipio", renderCell: (params: { row: TurismoExperienciaType }) => params.row.municipio.nome },
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
            headerName: "Ações", field: "acoes", isCenter: true, renderCell: (params: { row: TurismoExperienciaType }) => {
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

    const reset = () => {
        setExistingImages({});
        close();
        form.reset({
            ...defaultValue,
        });
        setIsFetchingEdit(false);
    };

    const buscar = async (id: string) => {
        setIsFetchingEdit(true);
        setTurismoExperienciaId(id);
        try {
            const service = new TurismoExperienciaService();
            const turismo = await service.buscarPorId(id);

            setExistingImages({
                imagem: turismo.urlImagem
            });

            form.reset({
                id: turismo.id,
                contato: turismo.contato,
                descricao: turismo.descricao,
                instagram: turismo.instagram,
                nome: turismo.nome,
                site: turismo.site,
                municipioId: turismo.municipio.id
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
        setTurismoExperienciaId(id);
    };

    const confirmarExclusao = async () => {
        if (!turismoExperienciaId) return;

        try {
            const turismoExperienciaService = new TurismoExperienciaService();
            await turismoExperienciaService.excluir(turismoExperienciaId);

            // Após excluir, verificar se precisa voltar para página anterior
            const pageForBackend = currentPage - 1;
            const response = await turismoExperienciaService.listar(pageForBackend);

            // Se a página atual ficou vazia e não é a primeira página, voltar uma página
            if (response.content.length === 0 && currentPage > 1) {
                router.push(`?page=${currentPage - 1}`, { scroll: false });
            } else {
                // Caso contrário, recarregar a página atual
                listar(pageForBackend);
            }

            setIsDeleting(false);
            toast("success", "Turismo & Experiência excluído com sucesso");
        } catch (error) {
            toast("error", "Erro ao excluir o turismo & experiência");
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <Container title="Turismos & experiências">
            <HeaderSection
                title="Turismos & experiências"
                description="Gerencie os turismos & experiências"
                onClick={handleOpen}
                icon={<Plus />}
            />
            <FadeInOnScroll
                direction="up"
                delay={0.2}
                duration={0.6}
            >
                <div className="space-y-4">

                    <Tables data={turismoExperienciaLista} columns={columns} isLoading={isLoading} />
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

            <Modal isOpen={isOpen} onClose={reset} title={editingId ? "Editar Turismo & Experiência" : "Novo Turismo & Experiência"}>
                <div className="space-y-4">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormTurismoExperiencia
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

            <Modal isOpen={isDeleting} onClose={reset} title="Excluir Turismo & Experiência">
                <div className="space-y-4">
                    <p>Tem certeza que deseja excluir este turismo & experiência?</p>
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
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal>

        </Container>
    );
}
