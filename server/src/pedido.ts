import { Comanda, StatusComanda } from "./comanda";
import { Observavel, Observador } from "./interfaces/observer";
import { ItemCarrinho } from "./itemCarrinho";
import { Restaurante } from "./restaurante";
import { Pagamento, ServicoPagamento, StatusPagamento } from "./servicoPagamento";

export enum StatusPedido {
    AGUARDANDO_PAGAMENTO,
    AGUARDANDO_CONFIRMAÇÃO,
    SENDO_PREPARADO,
    AGUARDANDO_ENTREGADOR,
    SENDO_ENTREGUE,
    AGUARDANDO_COLETA,
    COMPLETO,
    CANCELADO_PELO_CLIENTE,
    CANCELADO_PELO_RESTAURANTE
}

export class Pedido extends Observavel implements Observador {
    id: number;
    itens: ItemCarrinho[];
    valorTotal: number;
    data: Date;
    horaPedido: Date;
    horaEntrega: Date;
    status: StatusPedido;
    restaurante: Restaurante;

    constructor(pedido: Pedido) {
        super();
        this.id = pedido.id;
        this.itens = pedido.itens;
        this.valorTotal = pedido.valorTotal;
        this.data = pedido.data;
        this.horaPedido = pedido.horaPedido;
        this.horaEntrega = pedido.horaEntrega;
        this.status = pedido.status;
        this.restaurante = pedido.restaurante;
        
        ServicoPagamento.getInstance().pagarPedido(this)
    }

    pegarInformacao() {
        return {
            id: this.id,
            itens: this.itens.map(item => item.pegarInformacao()),
            valorTotal: this.valorTotal,
            data: this.data,
            horaPedido: this.horaPedido,
            horaEntrega: this.horaEntrega,
            status: this.status,
            restaurante: {
                id: this.restaurante.id,
                nome: this.restaurante.nome,
            }
        }
    }

    private atualizarStatus(newStatus: StatusPedido) {
        if (newStatus === StatusPedido.CANCELADO_PELO_CLIENTE) {
            // Verificar que o pedido ainda pode ser cancelado
        } else if (newStatus === StatusPedido.CANCELADO_PELO_RESTAURANTE) {
            // Verificar que o pedido ainda pode ser cancelado
        }

        this.status = newStatus;

        // Se o pagamento foi aceito,
        if (this.status === StatusPedido.AGUARDANDO_CONFIRMAÇÃO) {
            this.restaurante.gerarComanda(this);
        }

        this.notificarObservadores();
    }

    cancelar() {
        this.atualizarStatus(StatusPedido.CANCELADO_PELO_CLIENTE);
    }

    notificarMudanca(observavel: Observavel) {
        if (observavel instanceof Pagamento) {
            switch (observavel.status) {
                case StatusPagamento.APROVADO:
                    this.atualizarStatus(StatusPedido.AGUARDANDO_CONFIRMAÇÃO);
                    break;
                case StatusPagamento.RECUSADO:
                    break;
                case StatusPagamento.CANCELADO:
                    this.atualizarStatus(StatusPedido.CANCELADO_PELO_CLIENTE);
                    break;
            }
        } else if (observavel instanceof Comanda) {
            switch (observavel.status) {
                case StatusComanda.ABERTA:
                    break;
                case StatusComanda.EM_PREPARO:
                    this.atualizarStatus(StatusPedido.SENDO_PREPARADO);
                    break;
                case StatusComanda.CONCLUIDA:
                    this.atualizarStatus(StatusPedido.AGUARDANDO_ENTREGADOR);
                    break;
                case StatusComanda.REJEITADA:
                    this.atualizarStatus(StatusPedido.CANCELADO_PELO_RESTAURANTE);
                    break;
                case StatusComanda.CANCELADA:
                    this.atualizarStatus(StatusPedido.CANCELADO_PELO_RESTAURANTE);
                    break;
            }
        }
    }
}