import { Carrinho } from "./carrinho.js";
import { ItemCarrinho } from "./itemCarrinho.js";

export class Usuario {
    id: number;
    nome: string;
    carrinho: Carrinho = new Carrinho();

    constructor (id: number, nome: string) {
        this.id = id;
        this.nome = nome;
    }
}