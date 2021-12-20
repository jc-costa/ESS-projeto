import { Restaurante } from "./restaurante";

export class ItemCarrinho {
    id: number;
    descricao: string;
    preco: number;
    quantidade: number;
    restaurante: Restaurante;
    detalhes: string;

    constructor(id: number, descricao: string, preco: number, quantidade: number, restaurante: Restaurante, detalhes: string) {
        this.id = id;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.restaurante = restaurante;
        this.detalhes = detalhes;
    }

    pegarInformacao() {
        return {
            id: this.id,
            descricao: this.descricao,
            preco: this.preco,
            quantidade: this.quantidade,
            restaurante: this.restaurante.pegarInformacao(),
            detalhes: this.detalhes
        }
    }
}