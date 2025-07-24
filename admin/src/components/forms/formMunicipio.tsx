import { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import { FormField } from "../formField";
import { MunicipioForm } from "@/lib/schemas/schemas";
import { ImageUpload } from "../imageUpload";

type FormMunicipioProps = {
    register: UseFormRegister<MunicipioForm>;
    errors: FieldErrors<MunicipioForm>;
    control: Control<MunicipioForm>;
    existingBrasao?: string;
    existingDestaque?: string[];
};

export default function FormMunicipio({ register, errors, control, existingBrasao, existingDestaque }: FormMunicipioProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    id="nome"
                    label="Nome"
                    placeholder="Nome do município"
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
                placeholder="Descrição do município"
                register={register}
                error={errors.descricao}
                maxLength={255}
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

            <div className="space-y-4">
                <ImageUpload
                    name="brasao"
                    label="Brasão"
                    control={control}
                    multiple={false}
                    maxFiles={1}
                    required={true}
                    existingImages={existingBrasao}
                />
                <ImageUpload
                    name="destaque"
                    label="Destaques"
                    control={control}
                    multiple={true}
                    maxFiles={5}
                    required={true}
                    existingImages={existingDestaque}
                />
            </div>

        </div>
    );
}