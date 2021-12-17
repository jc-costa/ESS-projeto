import { ItemCarrinho } from "./itemCarrinho";
import { Restaurante } from "./restaurante";

export class Carrinho {
    restaurante: Restaurante;
    itens: ItemCarrinho[] = [];

    pegarItens(): ItemCarrinho[] {
        return this.itens;
    }

    limpar() {
        this.itens = [];
    }

    adicionarItem(item: ItemCarrinho) {
        if (item.quantidade === 0) {
            throw new Error('Quantidade não pode ser 0');
        }
        if (item.restaurante != this.restaurante) {
            throw new Error('O item não pertence ao restaurante');
        }

        if (this.restaurante === null) {
            this.restaurante = item.restaurante;
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
            this.restaurante = null;
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