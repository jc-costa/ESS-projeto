import { StatusComanda } from './comanda';
import { Comanda } from './comanda';
import { Pedido } from './pedido';

export class Restaurante {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    horárioFuncionamento: string;
    tempoMedioDePreparo: number;
    comandas: Comanda[] = [];

    constructor(restaurante: Restaurante) {
        this.id = restaurante.id;
        this.nome = restaurante.nome;
        this.endereco = restaurante.endereco;
        this.telefone = restaurante.telefone;
        this.horárioFuncionamento = restaurante.horárioFuncionamento;
    }

    gerarComanda(pedido: Pedido) {
        const novaComanda = new Comanda(<Comanda> {
            id: this.comandas.length + 1,
            itens: pedido.itens,
        });
        novaComanda.adicionarObservador(pedido);
        this.comandas.push(novaComanda);
    }

    confirmarComanda(comanda: Comanda) {
        comanda.atualizarStatus(StatusComanda.EM_PREPARO);
    }

    finalizarComanda(comanda: Comanda) {
        comanda.atualizarStatus(StatusComanda.CONCLUIDA);
    }

    rejeitarComanda(comanda: Comanda) {
        comanda.atualizarStatus(StatusComanda.REJEITADA);
    }

    cancelarComanda(comanda: Comanda) {
        comanda.atualizarStatus(StatusComanda.CANCELADA);
    }
}