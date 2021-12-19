import { Carrinho } from '../src/carrinho';
import { ItemCarrinho } from '../src/itemCarrinho';
import { Restaurante } from '../src/restaurante';

describe("O carrinho de compras de um usuário", () => {
    var carrinho: Carrinho;
    var restaurantes: Restaurante[];
    var itens: ItemCarrinho[];
    
    beforeEach(() => {
        carrinho = new Carrinho();
        restaurantes = [
            new Restaurante(1, "Restaurante 1", "Endereço 1", "Telefone 1", "Horário de funcionamento 1"),
            new Restaurante(2, "Restaurante 2", "Endereço 2", "Telefone 2", "Horário de funcionamento 2"),
            new Restaurante(3, "Restaurante 3", "Endereço 3", "Telefone 3", "Horário de funcionamento 3")
        ];
        itens = [
            new ItemCarrinho(1, "Item 1", 10, 1, restaurantes[0], "Detalhes 1"),
            new ItemCarrinho(2, "Item 2", 20, 1, restaurantes[0], "Detalhes 2"),
            new ItemCarrinho(3, "Item 3", 30, 1, restaurantes[1], "Detalhes 3"),
            new ItemCarrinho(4, "Item 4", 40, 1, restaurantes[1], "Detalhes 4"),
            new ItemCarrinho(5, "Item 5", 50, 1, restaurantes[2], "Detalhes 5"),
            new ItemCarrinho(6, "Item 6", 60, 1, restaurantes[2], "Detalhes 6")  
        ];
    });

    it("É inicialmente vazio", () => {
        expect(carrinho.pegarItens().length).toBe(0);
    })

    it("Adiciona itens corretamente", () => {
        // Given eu tenho um carrinho vazio
        // When eu adiciono um item
        carrinho.adicionarItem(itens[0]);
        // Then o carrinho deve conter 1 item
        expect(carrinho.pegarItens().length).toBe(1);

        // And o item no carrinho deve ser o mesmo que eu adicionei
        const item = carrinho.pegarItens()[0];
        expect(item.id).toBe(1);
        expect(item.descricao).toBe("Item 1");
        expect(item.preco).toBe(10);
        expect(item.quantidade).toBe(1);
    })

    it("Remove itens corretamente", () => {
        // Given eu tenho um carrinho com um item
        carrinho.adicionarItem(itens[0]);

        // When eu removo o item
        carrinho.removerItem(itens[0].id);

        // Then o carrinho deve estar vazio
        expect(carrinho.pegarItens().length).toBe(0);
    })

    it("Atualiza a quantidade de um item corretamente", () => {
        // Given eu tenho um carrinho com o item ("Pizza Grande", 40.00, 1)
        carrinho.adicionarItem(itens[0]);

        // When eu atualizo a quantidade do item para 2
        itens[0].quantidade = 2;
        carrinho.atualizarItem(itens[0]);

        // Then a quantidade do item deve ser 2
        const item = carrinho.pegarItens()[0];
        expect(item.quantidade).toBe(2);

        // When eu atualizo a quantidade do item para 0
        itens[0].quantidade = 0;
        carrinho.atualizarItem(itens[0]);

        // Then o item deve ser removido do carrinho
        expect(carrinho.pegarItens().length).toBe(0);
    })

    it("Calcula preço total corretamente", () => {
        // Given eu tenho um carrinho com o item ("Pizza Grande", 40.00, 1) e o item ("Pizza Média", 30.00, 1)
        carrinho.adicionarItem(itens[0]);
        carrinho.adicionarItem(itens[1]);

        // When eu calculo o preço total
        const precoTotal = carrinho.calcularPrecoTotal();
        
        // Then o preço total deve ser 30
        expect(precoTotal).toBe(30);
    })

    it("Limpa o carrinho corretamente", () => {
        // Given eu tenho um carrinho com o item ("Pizza Grande", 40.00, 1) e o item ("Pizza Média", 30.00, 1)
        carrinho.adicionarItem(itens[0]);
        carrinho.adicionarItem(itens[1]);
        
        // When eu limpo o carrinho
        carrinho.limpar();

        // Then o carrinho deve estar vazio
        expect(carrinho.pegarItens().length).toBe(0);
    })
});
