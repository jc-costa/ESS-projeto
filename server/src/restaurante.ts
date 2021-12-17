export class Restaurante {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    horárioFuncionamento: string;
    tempoMedioDePreparo: number;

    constructor(restaurante: Restaurante) {
        this.id = restaurante.id;
        this.nome = restaurante.nome;
        this.endereco = restaurante.endereco;
        this.telefone = restaurante.telefone;
        this.horárioFuncionamento = restaurante.horárioFuncionamento;
    }
}