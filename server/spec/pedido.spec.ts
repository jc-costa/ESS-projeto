import { Usuario } from '../src/usuario';
import { Restaurante } from '../src/restaurante';
import { ItemCarrinho } from '../src/itemCarrinho';
import { Pedido, StatusPedido } from '../src/pedido';
import { ServicoPagamento } from '../src/servicoPagamento';
import { Carrinho } from '../src/carrinho';

describe("Realização de Pedidos", () => {
    var usuario: Usuario;

    beforeEach(() => {
        usuario = new Usuario(1, "Breno Miranda");
        ServicoPagamento.reset();
    });

    it("É inicialmente vazio", () => {
        expect(usuario.pegarPedidos().length).toEqual(0);
    })

    it("Cria um pedido baseado no carrinho", () => {
        // Given um usuario com um carrinho
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const itens = [
            new ItemCarrinho(1, "Pizza", 1, 40.0, restaurante, "sem cebola"),
        ];
        const carrinho = new Carrinho(restaurante, itens);
        usuario = new Usuario(1, "Breno Miranda", carrinho);

        // When ele realiza o pedido
        usuario.realizarPedido();

        // Then o pedido deve ser adicionado a lista de pedidos do usuário
        expect(usuario.pegarPedidos().length).toBe(1);
        
    })

    it("Não cria o pedido se o carrinho estiver vazio", () => {
        expect(() => { usuario.realizarPedido() }).toThrow("Carrinho vazio");
    })

    it("Passa para 'AGUARDANDO_CONFIRMAÇÃO' se o pagamento for aceito e cria uma comanda no restaurante", () => {
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const pedido = new Pedido(<Pedido> {
            id: 1,
            itens: [{id: 1, descricao: "X-Salada", quantidade: 1, preco: 10.0, restaurante: restaurante}],
            valorTotal: 10.0,
            data: new Date(),
            horaPedido: new Date(),
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            restaurante: restaurante
        });

        ServicoPagamento.getInstance().pagamentoAceito(ServicoPagamento.getInstance().pagamentos[0]);

        expect(pedido.status).toEqual(StatusPedido.AGUARDANDO_CONFIRMAÇÃO);
        expect(restaurante.comandas.length).toEqual(1);
    })

    it("Passa para 'CANCELADO_PELO_RESTAURANTE' quando o restaurante rejeita", () => {
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const pedido = new Pedido(<Pedido> {
            id: 1,
            itens: [{id: 1, descricao: "X-Salada", quantidade: 1, preco: 10.0, restaurante: restaurante}],
            valorTotal: 10.0,
            data: new Date(),
            horaPedido: new Date(),
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            restaurante: restaurante
        });
        ServicoPagamento.getInstance().pagamentoAceito(ServicoPagamento.getInstance().pagamentos[0]);

        restaurante.rejeitarComanda(restaurante.comandas[0]);

        expect(pedido.status).toEqual(StatusPedido.CANCELADO_PELO_RESTAURANTE);

    })

    it("Passa para 'SENDO_PREPARADO' quando o restaurante começa a preparar a comanda", () => {
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const pedido = new Pedido(<Pedido> {
            id: 1,
            itens: [{id: 1, descricao: "X-Salada", quantidade: 1, preco: 10.0, restaurante: restaurante}],
            valorTotal: 10.0,
            data: new Date(),
            horaPedido: new Date(),
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            restaurante: restaurante
        });
        ServicoPagamento.getInstance().pagamentoAceito(ServicoPagamento.getInstance().pagamentos[0]);

        restaurante.confirmarComanda(restaurante.comandas[0]);

        expect(pedido.status).toEqual(StatusPedido.SENDO_PREPARADO);
    })

    it("Passa para 'AGUARDANDO_ENTREGADOR' quando o restaurante finaliza o preparo", () => {
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const pedido = new Pedido(<Pedido> {
            id: 1,
            itens: [{id: 1, descricao: "X-Salada", quantidade: 1, preco: 10.0, restaurante: restaurante}],
            valorTotal: 10.0,
            data: new Date(),
            horaPedido: new Date(),
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            restaurante: restaurante
        });
        ServicoPagamento.getInstance().pagamentoAceito(ServicoPagamento.getInstance().pagamentos[0]);

        restaurante.confirmarComanda(restaurante.comandas[0]);
        restaurante.finalizarComanda(restaurante.comandas[0]);

        expect(pedido.status).toEqual(StatusPedido.AGUARDANDO_ENTREGADOR);
    })

    it("Passa para 'CANCELADO_PELO_RESTAURANTE' quando o restaurante cancela", () => {
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const pedido = new Pedido(<Pedido> {
            id: 1,
            itens: [{id: 1, descricao: "X-Salada", quantidade: 1, preco: 10.0, restaurante: restaurante}],
            valorTotal: 10.0,
            data: new Date(),
            horaPedido: new Date(),
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            restaurante: restaurante
        });
        ServicoPagamento.getInstance().pagamentoAceito(ServicoPagamento.getInstance().pagamentos[0]);

        restaurante.confirmarComanda(restaurante.comandas[0]);
        restaurante.cancelarComanda(restaurante.comandas[0]);

        expect(pedido.status).toEqual(StatusPedido.CANCELADO_PELO_RESTAURANTE);
    })

    it("Passa para 'SENDO_ENTREGUE' quando o entregador confirma a coleta", () => {
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const pedido = new Pedido(<Pedido> {
            id: 1,
            itens: [{id: 1, descricao: "X-Salada", quantidade: 1, preco: 10.0, restaurante: restaurante}],
            valorTotal: 10.0,
            data: new Date(),
            horaPedido: new Date(),
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            restaurante: restaurante
        });
        ServicoPagamento.getInstance().pagamentoAceito(ServicoPagamento.getInstance().pagamentos[0]);

        restaurante.confirmarComanda(restaurante.comandas[0]);
        restaurante.finalizarComanda(restaurante.comandas[0]);

        expect(pedido.status).toEqual(StatusPedido.SENDO_ENTREGUE);
    })

    it("Passa para 'AGUARDANDO_COLETA' quando o entregador chega ao destino", () => {
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const pedido = new Pedido(<Pedido> {
            id: 1,
            itens: [{id: 1, descricao: "X-Salada", quantidade: 1, preco: 10.0, restaurante: restaurante}],
            valorTotal: 10.0,
            data: new Date(),
            horaPedido: new Date(),
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            restaurante: restaurante
        });
        ServicoPagamento.getInstance().pagamentoAceito(ServicoPagamento.getInstance().pagamentos[0]);

        restaurante.confirmarComanda(restaurante.comandas[0]);
        restaurante.finalizarComanda(restaurante.comandas[0]);

        expect(pedido.status).toEqual(StatusPedido.AGUARDANDO_COLETA);
    })

    it("Passa para 'COMPLETO' quando o entregador confirma a entrega", () => {
        const restaurante = new Restaurante(1, "Pizza Hut", "Rua A", "(99) 99999-9999", "10:00-22:00")
        const pedido = new Pedido(<Pedido> {
            id: 1,
            itens: [{id: 1, descricao: "X-Salada", quantidade: 1, preco: 10.0, restaurante: restaurante}],
            valorTotal: 10.0,
            data: new Date(),
            horaPedido: new Date(),
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            restaurante: restaurante
        });
        ServicoPagamento.getInstance().pagamentoAceito(ServicoPagamento.getInstance().pagamentos[0]);

        restaurante.confirmarComanda(restaurante.comandas[0]);
        restaurante.finalizarComanda(restaurante.comandas[0]);

        expect(pedido.status).toEqual(StatusPedido.COMPLETO);
    })
});