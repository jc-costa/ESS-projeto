import { Carrinho } from '../src/carrinho';
import { ItemCarrinho } from '../src/itemCarrinho';

describe("O carrinho de compras de um usuário", () => {
    var carrinho: Carrinho;
    
    beforeEach(() => carrinho = new Carrinho());

    it("É inicialmente vazio", () => {
        expect(carrinho.pegarItens().length).toBe(0);
    })

    it("Adiciona itens corretamente", () => {
        // Given eu tenho um carrinho vazio
        // When eu adiciono um item
        const pizzaGrande = <ItemCarrinho> {
            id: 1,
            descricao: "Pizza Grande",
            preco: 40.00,
            quantidade: 1
        }

        carrinho.adicionarItem(pizzaGrande);

        // Then o carrinho deve conter 1 item
        expect(carrinho.pegarItens().length).toBe(1);

        // And o item no carrinho deve ser o mesmo que eu adicionei
        const item = carrinho.pegarItens()[0];
        expect(item.id).toBe(1);
        expect(item.descricao).toBe("Pizza Grande");
        expect(item.preco).toBe(40.00);
        expect(item.quantidade).toBe(1);
    })

    it("Remove itens corretamente", () => {
        // Given eu tenho um carrinho com um item
        const pizzaGrande = <ItemCarrinho> {
            id: 1,
            descricao: "Pizza Grande",
            preco: 40.00,
            quantidade: 1
        }
        carrinho.adicionarItem(pizzaGrande);

        // When eu removo o item
        carrinho.removerItem(pizzaGrande.id);

        // Then o carrinho deve estar vazio
        expect(carrinho.pegarItens().length).toBe(0);
    })

    it("Atualiza a quantidade de um item corretamente", () => {
        // Given eu tenho um carrinho com o item ("Pizza Grande", 40.00, 1)
        var pizzaGrande = <ItemCarrinho> {
            id: 1,
            descricao: "Pizza Grande",
            preco: 40.00,
            quantidade: 1
        }
        carrinho.adicionarItem(pizzaGrande);

        // When eu atualizo a quantidade do item para 2
        pizzaGrande.quantidade = 2;
        carrinho.atualizarItem(pizzaGrande);

        // Then a quantidade do item deve ser 2
        const item = carrinho.pegarItens()[0];
        expect(item.quantidade).toBe(2);

        // When eu atualizo a quantidade do item para 0
        pizzaGrande.quantidade = 0;
        carrinho.atualizarItem(pizzaGrande);

        // Then o item deve ser removido do carrinho
        expect(carrinho.pegarItens().length).toBe(0);
    })

    it("Calcula preço total corretamente", () => {
        // Given eu tenho um carrinho com o item ("Pizza Grande", 40.00, 1) e o item ("Pizza Média", 30.00, 1)
        const pizzaGrande = <ItemCarrinho> {
            id: 1,
            descricao: "Pizza Grande",
            preco: 40.00,
            quantidade: 1
        }
        const pizzaMedia = <ItemCarrinho> {
            id: 2,
            descricao: "Pizza Média",
            preco: 30.00,
            quantidade: 1
        }
        carrinho.adicionarItem(pizzaGrande);
        carrinho.adicionarItem(pizzaMedia);

        // When eu calculo o preço total
        const precoTotal = carrinho.calcularPrecoTotal();
        
        // Then o preço total deve ser 70.00
        expect(precoTotal).toBe(70.00);
    })

    it("Limpa o carrinho corretamente", () => {
        // Given eu tenho um carrinho com o item ("Pizza Grande", 40.00, 1) e o item ("Pizza Média", 30.00, 1)
        const pizzaGrande = <ItemCarrinho> {
            id: 1,
            descricao: "Pizza Grande",
            preco: 40.00,
            quantidade: 1
        }
        const pizzaMedia = <ItemCarrinho> {
            id: 2,
            descricao: "Pizza Média",
            preco: 30.00,
            quantidade: 1
        }
        carrinho.adicionarItem(pizzaGrande);
        carrinho.adicionarItem(pizzaMedia);
        
        // When eu limpo o carrinho
        carrinho.limpar();

        // Then o carrinho deve estar vazio
        expect(carrinho.pegarItens().length).toBe(0);
    })
});
