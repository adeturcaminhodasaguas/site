"use client";

import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import HeaderSection from "@/components/headerSection";
import Container from "@/components/layout/container";
import Tables from "@/components/table/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormDialog } from '@/hooks/use-form-dialog';
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UsuarioForm, usuarioSchema, usuarioEditSchema } from "@/lib/schemas/schemas";
import { Button } from "@/components/ui/button";
import Modal from "@/components/dialog/Modal";
import TurismoExperienciaService from "@/lib/service/turismoExperienciaService";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { UsuarioType } from "@/lib/types/usuarioType";
import UsuarioService from "@/lib/service/usuarioService";
import { useAuth } from "@/contexts/AuthContexts";
import FormUsuario from "@/components/forms/FormUsuario";
import { Paginacao } from "@/components/paginacao";
import { useRouter, useSearchParams } from "next/navigation";

export default function Usuario() {
    const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [usuarioId, setUsuarioId] = useState<string>("");
    const totalPage = useRef<number>(1);
    const totalResultados = useRef<number>(1);
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;

    const { user } = useAuth();

    const defaultValue = {
        nome: "",
        email: "",
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


    const form = useForm<any>({
        resolver: zodResolver(editingId ? usuarioEditSchema : usuarioSchema),
        defaultValues: ({
            ...defaultValue,
        })
    });

    const listar = async (page: number = 0) => {
        setIsLoading(true);
        try {
            const service = new UsuarioService();
            const turismos = await service.listar(page);
            setUsuarios(turismos?.content || []);
            totalPage.current = turismos?.totalPages || 1;
            totalResultados.current = turismos?.totalElements || 0;
            setIsLoading(false);
        } catch (error) {
            toast("error", "Erro ao listar os usuários");
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
        listar(pageForBackend);
    }, [currentPage, searchParams, router]);

    const handleOpen = () => {
        openNew();
    };

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            if (editingId) {
                await editar(data);
            } else {
                await salvar(data);
            }
        } catch (error) {
            toast("error", "Erro ao salvar o usuário");
        } finally {
            setIsSubmitting(false);
        }
    };

    const editar = async (data: any) => {
        setIsSubmitting(true);
        try {
            const service = new UsuarioService();
            // Se a senha está vazia, remove ela do objeto
            const dataToSend = { ...data };
            if (!dataToSend.senha || dataToSend.senha.trim() === '') {
                delete dataToSend.senha;
            }
            await service.alterar(usuarioId, dataToSend);
            // Manter na página atual após editar
            const pageForBackend = currentPage - 1;
            listar(pageForBackend);
            reset();
            toast("success", "Usuário atualizado com sucesso");
        } catch (error: any) {
            toast("error", error.message || "Erro ao atualizar o usuário");
        } finally {
            setIsSubmitting(false);
        }
    };

    const salvar = async (data: any) => {
        setIsSubmitting(true);
        try {
            const service = new UsuarioService();
            await service.salvar(data);
            listar();
            reset();
            toast("success", "Usuário salvo com sucesso");
        } catch (error: any) {
            console.log(error);
            toast("error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleStatus = async (id: string, novoStatus: boolean) => {
        try {

            if (id == user?.id) {
                toast("error", "Você não pode alterar o seu próprio status");
                return;
            }

            const service = new UsuarioService();
            await service.alterarStatus(id);

            setUsuarios(prev => {
                const atualizados = prev.map(m =>
                    m.id === id ? { ...m, status: novoStatus ? "Ativo" : "Inativo" } : m
                );

                return atualizados.sort((a, b) => {
                    if (a.status === b.status) return 0;
                    return a.status === "Ativo" ? -1 : 1;
                });
            });

            toast("success", `Usuário ${novoStatus ? "ativado" : "inativado"} com sucesso`);
        } catch (error) {
            toast("error", "Erro ao atualizar o status do usuário");
        }
    };

    const columns = [
        { headerName: "Nome", field: "nome" },
        { headerName: "Email", field: "email" },
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
            headerName: "Ações", field: "acoes", isCenter: true, renderCell: (params: { row: UsuarioType }) => {
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
        close();
        form.reset({
            ...defaultValue,
        });
        setIsFetchingEdit(false);
    };

    const buscar = async (id: string) => {

        if (id == user?.id) {
            toast("error", "Você não pode alterar o seu próprio status");
            return;
        }

        setIsFetchingEdit(true);
        setUsuarioId(id);
        try {
            const service = new UsuarioService();
            const usuario = await service.buscarPorId(id);

            form.reset({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            });
            openEdit(id);
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetchingEdit(false);
        }
    };

    const excluir = async (id: string) => {
        if (id == user?.id) {
            toast("error", "Você não pode deletar seu próprio usuário");
            return;
        }

        setIsDeleting(true);
        setUsuarioId(id);
    };

    const confirmarExclusao = async () => {
        if (!usuarioId) return;

        try {
            const service = new UsuarioService();
            await service.excluir(usuarioId);
            listar();
            setIsDeleting(false);
            toast("success", "Usuário excluído com sucesso");
        } catch (error) {
            toast("error", "Erro ao excluir o usuário");
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <Container title="Usuários">
            <HeaderSection
                title="Usuários"
                description="Gerencie os usuários"
                onClick={handleOpen}
                icon={<Plus />}
            />
            <FadeInOnScroll
                direction="up"
                delay={0.2}
                duration={0.6}
            >
                <div className="space-y-4">
                    <Tables data={usuarios} columns={columns} isLoading={isLoading} />
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

            <Modal isOpen={isOpen} onClose={reset} title={editingId ? "Editar Usuário" : "Novo Usuário"}>
                <div className="space-y-4">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormUsuario
                            register={form.register}
                            errors={form.formState.errors}
                            editingId={editingId}
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

            <Modal isOpen={isDeleting} onClose={reset} title="Excluir usuário">
                <div className="space-y-4">
                    <p>Tem certeza que deseja excluir este usuário?</p>
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
