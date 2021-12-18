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
}