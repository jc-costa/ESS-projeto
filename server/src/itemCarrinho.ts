import { Restaurante } from "./restaurante";

export class ItemCarrinho {
    id: number;
    descricao: string;
    preco: number;
    quantidade: number;
    restaurante: Restaurante;
    detalhes: string;

    constructor(item: ItemCarrinho) {
        this.id = item.id;
        this.descricao = item.descricao;
        this.preco = item.preco;
        this.quantidade = item.quantidade;
        this.restaurante = item.restaurante;
        this.detalhes = item.detalhes;
    }

    pegarInformacao() {
        return {
            id: this.id,
            descricao: this.descricao,
            preco: this.preco,
            quantidade: this.quantidade,
            restaurante: {
                id: this.restaurante.id,
                nome: this.restaurante.nome
            },
            detalhes: this.detalhes
        }
    }
}