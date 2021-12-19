import { Observavel } from "./interfaces/observer";
import { ItemCarrinho } from "./itemCarrinho";

export enum StatusComanda {
    AGUARDANDO_CONFIRMAÇÃO,
    ABERTA,
    EM_PREPARO,
    CONCLUIDA,
    REJEITADA,
    CANCELADA
}

export class Comanda extends Observavel {
    id: number;
    itens: ItemCarrinho[];
    status: StatusComanda;

    constructor(comanda: Comanda) {
        super();
        this.id = comanda.id;
        this.itens = comanda.itens;
        this.status = StatusComanda.AGUARDANDO_CONFIRMAÇÃO
    }

    atualizarStatus(status: StatusComanda) {
        this.status = status;
        this.notificarObservadores();
    }
}