import { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import { FormField } from "../formField";
import { TurismoExperienciaForm } from "@/lib/schemas/schemas";
import { ImageUpload } from "../imageUpload";
import { FormFieldSelect } from "../formFieldSelect";
import { MunicipioSelectType } from "@/lib/types/municipioType";

type FormTurismoExperienciaProps = {
    register: UseFormRegister<TurismoExperienciaForm>;
    errors: FieldErrors<TurismoExperienciaForm>;
    control: Control<TurismoExperienciaForm>;
    municipios: MunicipioSelectType[];
    existingImagem?: string;
};

export default function FormTurismoExperiencia({ register, errors, control, existingImagem, municipios }: FormTurismoExperienciaProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    id="nome"
                    label="Nome"
                    placeholder="Nome do turismo & experiência"
                    register={register}
                    error={errors.nome}
                    required
                />
                <FormField
                    id="contato"
                    label="Contato"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    register={register}
                    error={errors.contato}
                    required
                />
            </div>

            <FormField
                id="descricao"
                label="Descrição"
                placeholder="Descrição do turismo & experiência"
                register={register}
                maxLength={255}
                error={errors.descricao}
                multiline
                rows={5}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    id="instagram"
                    label="Instagram"
                    type="url"
                    placeholder="https://instagram.com/municipio"
                    register={register}
                    error={errors.instagram}
                />
                <FormField
                    id="site"
                    label="Site"
                    type="url"
                    placeholder="https://municipio.gov.br"
                    register={register}
                    error={errors.site}
                />
            </div>

            <FormFieldSelect
                id="municipioId"
                label="Município"
                control={control}
                error={errors.municipioId}
                required
                options={municipios}
                getLabel={(m: MunicipioSelectType) => m.nome}
                getValue={(m: MunicipioSelectType) => m.id}
            />


            <div className="space-y-4">
                <ImageUpload
                    name="imagem"
                    label="Imagem"
                    control={control}
                    multiple={false}
                    maxFiles={1}
                    required={true}
                    existingImages={existingImagem}
                />
            </div>
        </div>
    );
}