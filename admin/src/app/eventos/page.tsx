"use client";

import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import HeaderSection from "@/components/headerSection";
import Container from "@/components/layout/container";
import Tables from "@/components/table/table";
import MunicipioService from "@/lib/service/municipioService";
import { MunicipioSelectType } from "@/lib/types/municipioType";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormDialog } from '@/hooks/use-form-dialog';
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { EventoForm, eventoSchema } from "@/lib/schemas/schemas";
import { Button } from "@/components/ui/button";
import Modal from "@/components/dialog/Modal";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { EventoType } from "@/lib/types/EventoType";
import EventoService from "@/lib/service/EventoService";
import FormEvento from "@/components/forms/formEvento";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginacao } from "@/components/paginacao";

export default function Eventos() {
    const [eventos, setEventos] = useState<EventoType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [eventoId, setEventoId] = useState<string>("");
    const [categorias, setCategorias] = useState<string[]>([]);
    const [municipios, setMunicipios] = useState<MunicipioSelectType[]>([]);
    const [existingImages, setExistingImages] = useState<{ imagem?: string }>({});
    const totalPage = useRef<number>(1);
    const totalResultados = useRef<number>(1);
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;


    const defaultValue = {
        id: "",
        nome: "",
        descricao: "",
        data: "",
        horaInicio: "",
        horaFim: "",
        local: "",
        categoria: "",
        destaque: false,
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
        isSubmitting,
        isFetchingEdit,
        setIsDeleting,
        toast,
        setIsSubmitting,
        setIsFetchingEdit,
    } = useFormDialog();

    const form = useForm<EventoForm>({
        resolver: zodResolver(eventoSchema),
        defaultValues: {
            ...defaultValue,
        }
    });

    const listar = async (page: number = 0) => {
        setIsLoading(true);
        try {
            const service = new EventoService();
            const eventos = await service.listar(page);
            setEventos(eventos?.content || []);
            totalPage.current = eventos?.totalPages || 1;
            totalResultados.current = eventos?.totalElements || 0;
            setIsLoading(false);
        } catch (error) {
            toast("error", "Erro ao eventos os evetos");
        } finally {
            setIsLoading(false);
        }
    };

    const listarCategorias = async () => {
        try {
            const service = new EventoService();
            const categorias = await service.listarCategorias();
            setCategorias(categorias);
        } catch (error) {
            toast("error", "Erro ao listar categorias");
        }
    };

    const listarMunicipios = async () => {
        try {
            const service = new MunicipioService();
            const municipios = await service.listarMunicipioSelect();
            setMunicipios(municipios);
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
        listarCategorias();
        listarMunicipios();
    }, [currentPage, searchParams, router]);

    const handleOpen = () => {
        openNew();
    };

    const onSubmit = async (data: EventoForm) => {
        setIsSubmitting(true);
        const formData = new FormData();

        if (editingId) {
            formData.append('id', editingId);
        }

        formData.append('nome', data.nome);
        formData.append('descricao', data.descricao);
        formData.append('data', data.data);
        formData.append('horaInicio', data.horaInicio);
        formData.append('horaFim', data.horaFim);
        formData.append('local', data.local);
        formData.append('municipioId', data.municipioId);

        if (data.imagem) {
            formData.append('imagem', data.imagem);
        }

        formData.append('categoria', data.categoria);
        formData.append('destaque', data.destaque ? "true" : "false");

        try {
            if (editingId) {
                await editar(formData);
            } else {
                await salvar(formData);
            }
        } catch (error) {
            toast("error", "Erro ao salvar o evento");
        } finally {
            setIsSubmitting(false);
        }

    };

    const salvar = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const service = new EventoService();
            await service.salvar(data);
            // Após salvar, voltar para a página 1 e recarregar a lista
            router.push('?page=1', { scroll: false });
            const pageForBackend = 0; // Página 1 do frontend = página 0 do backend
            listar(pageForBackend);
            reset();
            toast("success", "Evento salvo com sucesso");
        } catch (error: any) {
            toast("error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const editar = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const service = new EventoService();
            await service.alterar(eventoId, data);
            // Manter na página atual após editar
            const pageForBackend = currentPage - 1;
            listar(pageForBackend);
            reset();
            toast("success", "Evento atualizado com sucesso");
        } catch (error: any) {
            toast("error", error.message || "Erro ao atualizar o evento");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleStatus = async (id: string, novoStatus: boolean) => {
        try {

            const service = new EventoService();
            await service.alterarStatus(id);

            setEventos(prev => {
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

            toast("success", `Evento ${novoStatus ? "ativado" : "inativado"} com sucesso`);
        } catch (error) {
            toast("error", "Erro ao atualizar o status do evento");
        }
    };


    const columns = [
        { headerName: "Nome", field: "nome" },
        { headerName: "Municipio", field: "municipio", renderCell: (params: { row: EventoType }) => params.row.municipio.nome },
        {
            headerName: "Data", field: "data", renderCell: (params: { row: EventoType }) => {
                const data = new Date(params.row.data);
                return data.toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            }
        },
        { headerName: "Categoria", field: "categoria" },
        {
            headerName: "Destaque", field: "destaque", renderCell: (params: { row: EventoType }) => {
                if (params.row.destaque) {
                    return <Check className=" text-green-600" />;
                }
                return <X className=" text-red-600" />;
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
            headerName: "Ações", field: "acoes", isCenter: true, renderCell: (params: { row: EventoType }) => {
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
        setEventoId(id);
        try {
            const service = new EventoService();
            const evento = await service.buscarPorId(id);

            setExistingImages({
                imagem: evento.urlImagem
            });

            form.reset({
                id: evento.id,
                nome: evento.nome,
                descricao: evento.descricao,
                data: new Date(evento.data).toISOString().split('T')[0],
                horaInicio: evento.horaInicio,
                horaFim: evento.horaFim,
                local: evento.local,
                categoria: evento.categoria,
                destaque: evento.destaque,
                municipioId: evento.municipio.id
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
        setEventoId(id);
    };

    const confirmarExclusao = async () => {
        if (!eventoId) return;

        try {
            const eventoService = new EventoService();
            await eventoService.excluir(eventoId);

            // Após excluir, verificar se precisa voltar para página anterior
            const pageForBackend = currentPage - 1;
            const response = await eventoService.listar(pageForBackend);

            // Se a página atual ficou vazia e não é a primeira página, voltar uma página
            if (response.content.length === 0 && currentPage > 1) {
                router.push(`?page=${currentPage - 1}`, { scroll: false });
            } else {
                // Caso contrário, recarregar a página atual
                listar(pageForBackend);
            }

            setIsDeleting(false);
            toast("success", "Evento excluído com sucesso");
        } catch (error) {
            toast("error", "Erro ao excluir o evento");
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <Container title="Eventos">
            <HeaderSection
                title="Eventos"
                description="Gerencie os eventos."
                onClick={handleOpen}
                icon={<Plus />}
            />

            <FadeInOnScroll
                direction="up"
                delay={0.2}
                duration={0.6}
            >
                <div className="space-y-4">
                    <Tables data={eventos} columns={columns} isLoading={isLoading} />
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

            <Modal isOpen={isOpen} onClose={reset} title={editingId ? "Editar Evento" : "Novo Evento"}>
                <div className="space-y-4">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormEvento
                            register={form.register}
                            errors={form.formState.errors}
                            control={form.control}
                            urlDestaque={existingImages.imagem}
                            categorias={categorias}
                            municipios={municipios}
                        />
                        <div className="flex gap-2 pt-4 items-center">
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

            <Modal isOpen={isDeleting} onClose={reset} title="Excluir Evento">
                <div className="space-y-4">
                    <p>Tem certeza que deseja excluir este evento?</p>
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
