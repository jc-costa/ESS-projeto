import { Observavel } from './interfaces/observer';
import { Pedido } from './pedido';

export class ServicoPagamento {
    private static instance: ServicoPagamento;
    public static getInstance(): ServicoPagamento {
        if (!this.instance) {
            this.instance = new ServicoPagamento();
        }
        return this.instance;
    }
    public static reset() {
        this.instance = null;
    }


    pagamentos: Pagamento[] = [];

    pagarPedido(pedido: Pedido) {
        const pagamento = new Pagamento();
        this.pagamentos.push(pagamento);
        pagamento.adicionarObservador(pedido);
    }

    pagamentoAceito(pagamento: Pagamento) {
        pagamento.atualizarStatus(StatusPagamento.APROVADO);
    }

    pagamentoRecusado(pagamento: Pagamento) {
        pagamento.atualizarStatus(StatusPagamento.RECUSADO);
    }

    pagamentoCancelado(pagamento: Pagamento) {
        pagamento.atualizarStatus(StatusPagamento.CANCELADO);
    }
}

export class Pagamento extends Observavel {
    status: StatusPagamento;

    atualizarStatus(status: StatusPagamento) {
        this.status = status;
        this.notificarObservadores();
    }
}

export enum StatusPagamento {
    PENDENTE,
    APROVADO,
    RECUSADO,
    CANCELADO
}