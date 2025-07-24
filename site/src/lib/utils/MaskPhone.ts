export function formatarTelefone(telefone: string): string {
    const apenasNumeros = telefone.replace(/\D/g, '').slice(0, 11);

    if (apenasNumeros.length === 11) {
        return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    if (apenasNumeros.length === 10) {
        return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return apenasNumeros;
}
