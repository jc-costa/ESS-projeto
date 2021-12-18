import { ItemCarrinho } from "./itemCarrinho";
import { Restaurante } from "./restaurante";

export class Carrinho {
    private restaurante: Restaurante = null;
    private itens: ItemCarrinho[] = [];

    constructor(itens: ItemCarrinho[] = undefined) {
        if (!itens) {
            return
        }
        
        this.itens = itens;
        this.restaurante = itens[0].restaurante;

        // Verifica se todos os itens são do mesmo restaurante
        this.itens.forEach(item => {
            if (item.restaurante != this.restaurante) {
                throw new TypeError("Todos os itens devem ser do mesmo restaurante");
            }
        });
    }

    pegarRestaurante(): Restaurante {
        return this.restaurante;
    }

    pegarItens(): ItemCarrinho[] {
        return this.itens;
    }

    pegarDetalhamento() {
        return {
            restaurante: this.restaurante,
            itens: this.itens,
            precoTotal: this.calcularPrecoTotal()
        }
    }

    limpar() {
        this.itens = [];
    }

    adicionarItem(item: ItemCarrinho) {
        if (item.quantidade === 0) {
            throw new Error('Quantidade não pode ser 0');
        }

        if (this.restaurante === undefined) {
            this.restaurante = item.restaurante;
        }
        if (item.restaurante != this.restaurante) {
            throw new Error('O item não pertence ao restaurante');
        }
        let foundItem = this.itens.find((mItem) => mItem.id === item.id);
        if (foundItem) {
            foundItem.quantidade += item.quantidade;
        } else {
            this.itens.push(item);
        }
    }

    atualizarItem(item: ItemCarrinho) {
        if (item.quantidade === 0) { // Zerar o item é o mesmo que remover
            this.removerItem(item.id);
            return;
        }

        let foundItem = this.itens.find((mItem) => mItem.id === item.id);
        if (foundItem) {
            foundItem.quantidade = item.quantidade;
        }
    }

    removerItem(idItem: number) {
        let index = this.itens.findIndex((mItem) => mItem.id === idItem);
        if (index >= 0) {
            this.itens.splice(index, 1);
        }
        
        // Se o carrinho ficar vazio, ele não tem mais um restaurante
        if (this.itens.length === 0) {
            this.restaurante = undefined;
        }
    }

    calcularPrecoTotal(): number {
        let total: number = 0;
        this.itens.forEach((item) => {
            total += item.quantidade * item.preco;
        });
        return total;
    }
}