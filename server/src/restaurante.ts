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


    deveAceitar: boolean = true;
    deveFinalizar: boolean = false;
    deveCancelar: boolean = false;

    constructor(id: number, nome: string, endereco: string, telefone: string, horárioFuncionamento: string) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.horárioFuncionamento = horárioFuncionamento;
    }

    gerarComanda(pedido: Pedido) {
        const novaComanda = new Comanda(<Comanda> {
            id: this.comandas.length + 1,
            itens: pedido.itens,
        });
        novaComanda.adicionarObservador(pedido);
        this.comandas.push(novaComanda);

        if (this.deveAceitar) {
            this.confirmarComanda(novaComanda);
            if (this.deveFinalizar) {
                this.finalizarComanda(novaComanda);
            } else if (this.deveCancelar) {
                this.cancelarComanda(novaComanda);
            }
        } else {
            this.rejeitarComanda(novaComanda);
        }
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