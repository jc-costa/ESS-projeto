import { Carrinho } from "./carrinho";

export class Usuario {
    id: number;
    private nome: string;
    private carrinho: Carrinho = new Carrinho();

    constructor (id: number, nome: string) {
        this.id = id;
        this.nome = nome;
    }

    pegarNome(): string {
        return this.nome;
    }

    pegarCarrinho(): Carrinho {
        return this.carrinho;
    }

}