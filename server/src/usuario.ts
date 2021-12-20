import { Carrinho } from "./carrinho";
import { Observador } from "./interfaces/observer";
import { Pedido, StatusPedido } from "./pedido";
import { ServicoPagamento } from "./servicoPagamento";

export class Usuario {
    id: number;
    private nome: string;
    private carrinho: Carrinho = new Carrinho();
    private pedidos: Pedido[] = [];

    constructor (id: number, nome: string, carrinho: Carrinho = undefined, pedidos: Pedido[] = undefined) {
        this.id = id;
        this.nome = nome;
        this.carrinho = carrinho || new Carrinho();
        this.pedidos = pedidos || [];
    }

    pegarNome(): string {
        return this.nome;
    }

    pegarCarrinho(): Carrinho {
        return this.carrinho;
    }

    pegarPedidos(): Pedido[] {
        return this.pedidos;
    }

    realizarPedido() {
        if (this.pegarCarrinho().pegarItens().length === 0) {
            throw new Error("Carrinho vazio");
        }

        let pedido = new Pedido(<Pedido>{
            id: this.pedidos.length + 1,
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            valorTotal: this.carrinho.calcularPrecoTotal(),
            itens: this.carrinho.pegarItens(),
            data: new Date(),
            horaPedido: new Date(),
            restaurante: this.carrinho.pegarRestaurante()
        });
        pedido.adicionarObservador(this);
        ServicoPagamento.getInstance().pagarPedido(pedido)
        this.pedidos.push(pedido);
        this.carrinho = new Carrinho();
    }

    notificarMudanca(pedido: Pedido) {
        switch (pedido.status) {
            case StatusPedido.AGUARDANDO_PAGAMENTO:
                console.log(`${this.nome} - Pedido ${pedido.id} aguardando pagamento`);
                break;
            case StatusPedido.AGUARDANDO_CONFIRMAÇÃO:
                console.log(`${this.nome} - Pedido ${pedido.id} aguardando confirmação`);
                break;
            case StatusPedido.SENDO_PREPARADO:
                console.log(`${this.nome} - Pedido ${pedido.id} sendo preparado`);
                break;
            case StatusPedido.AGUARDANDO_ENTREGADOR:
                console.log(`${this.nome} - Pedido ${pedido.id} aguardando entregador`);
                break;
            case StatusPedido.SENDO_ENTREGUE:
                console.log(`${this.nome} - Pedido ${pedido.id} sendo entregue`);
                break;
            case StatusPedido.AGUARDANDO_COLETA:
                console.log(`${this.nome} - Pedido ${pedido.id} aguardando coleta`);
                break;
            case StatusPedido.COMPLETO:
                console.log(`${this.nome} - Pedido ${pedido.id} completo`);
                break;
            case StatusPedido.CANCELADO_PELO_CLIENTE:
                console.log(`${this.nome} - Pedido ${pedido.id} cancelado pelo cliente`);
                break;
            case StatusPedido.CANCELADO_PELO_RESTAURANTE:
                console.log(`${this.nome} - Pedido ${pedido.id} cancelado pelo restaurante`);
                break;
            default:
                break;
        }
    }
}