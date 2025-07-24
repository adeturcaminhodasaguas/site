import { EventoForm } from "@/lib/schemas/schemas";
import { Control, FieldErrors, UseFormRegister, Controller } from "react-hook-form";
import { FormField } from "@/components/formField";
import { FormFieldSelect } from "@/components/formFieldSelect";
import { ImageUpload } from "@/components/imageUpload";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MunicipioSelectType } from "@/lib/types/municipioType";

type FormEventoProps = {
    register: UseFormRegister<EventoForm>;
    errors: FieldErrors<EventoForm>;
    categorias: string[];
    municipios: MunicipioSelectType[];
    control: Control<EventoForm>;
    urlDestaque?: string;
};

export default function FormEvento({
    register,
    errors,
    control,
    urlDestaque,
    categorias,
    municipios
}: FormEventoProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    id="nome"
                    label="Nome do Evento"
                    type="text"
                    placeholder="Digite o nome do evento"
                    register={register}
                    error={errors.nome}
                    required
                />

                <FormFieldSelect
                    id="categoria"
                    label="categoria"
                    options={categorias}
                    control={control}
                    error={errors.categoria}
                    required
                    getLabel={(categoria) => categoria}
                    getValue={(categoria) => categoria}
                />
            </div>

            <FormField
                id="descricao"
                label="Descrição"
                placeholder="Descreva o evento"
                register={register}
                error={errors.descricao}
                required
                multiline
                rows={4}
                maxLength={255}
            />

            <FormField
                id="data"
                label="Data do Evento"
                type="date"
                register={register}
                error={errors.data}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    id="horaInicio"
                    label="Hora de Início"
                    type="time"
                    register={register}
                    error={errors.horaInicio}
                    required
                />

                <FormField
                    id="horaFim"
                    label="Hora de Fim"
                    type="time"
                    register={register}
                    error={errors.horaFim}
                    required
                />
            </div>

            <FormField
                id="local"
                label="Local"
                type="text"
                placeholder="Digite o local do evento"
                register={register}
                error={errors.local}
                required
            />

            <FormFieldSelect
                id="municipioId"
                label="Município"
                options={municipios}
                control={control}
                error={errors.municipioId}
                required
                getLabel={(municipio) => municipio.nome}
                getValue={(municipio) => municipio.id}
            />

            <ImageUpload
                label="Imagem do Evento"
                name="imagem"
                control={control}
                error={errors.imagem}
                multiple={false}
                maxFiles={1}
                maxSize={5}
                required
                existingImages={urlDestaque}
            />

            <div className="space-y-2">
                <Label htmlFor="destaque">
                    Evento em Destaque
                </Label>
                <Controller
                    name="destaque"
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="destaque"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <span className="text-sm text-muted-foreground">
                                {field.value ? 'Sim' : 'Não'}
                            </span>
                        </div>
                    )}
                />
                {errors.destaque && (
                    <p className="text-sm text-red-600">{errors.destaque.message}</p>
                )}
            </div>
        </div>
    );
}