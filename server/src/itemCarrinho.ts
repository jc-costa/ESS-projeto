import { Restaurante } from "./restaurante";

export class ItemCarrinho {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    restaurante: Restaurante;

    constructor(item: ItemCarrinho) {
        this.id = item.id;
        this.nome = item.nome;
        this.preco = item.preco;
        this.quantidade = item.quantidade;
        this.restaurante = item.restaurante;
    }
}