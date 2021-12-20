export interface Observador {
    notificarMudanca(observable: Observavel): void;
}

export class Observavel {
    private observadores: Observador[] = [];

    adicionarObservador(observador: Observador) {
        this.observadores.push(observador);
    }

    removerObservador(observador: Observador) {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }

    notificarObservadores() {
        this.observadores.forEach(observer => observer.notificarMudanca(this));
    }
}