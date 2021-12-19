import express from 'express';
import bodyParser from 'body-parser';

import { Carrinho } from './src/carrinho';
import { ItemCarrinho } from './src/itemCarrinho';
import { Usuario } from './src/usuario';
import { Restaurante } from './src/restaurante'
import { ServicoPagamento } from './src/servicoPagamento';
import { Pedido, StatusPedido } from './src/pedido';

var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

var configs = {
    pagamentoCancelado: false,
    restauranteRejeita: false,
    restauranteFinaliza: true,
    restauranteCancela: false
}

function atualizarConfigs() {
    ServicoPagamento.getInstance().deveAceitar = !configs.pagamentoCancelado;
    restaurantes.forEach(restaurante => {
        restaurante.deveAceitar = !configs.restauranteRejeita;
        restaurante.deveFinalizar = configs.restauranteFinaliza;
        restaurante.deveCancelar = configs.restauranteCancela;
    })
}

var restaurantes = [
    new Restaurante(1, "Pizza Hut", "Rua A", "(99) 9999-9999", "10:00 - 21:30"),
]
var itens = [
    new ItemCarrinho(<ItemCarrinho> {
        id: 1,
        descricao: "Pizza Grande",
        preco: 40,
        quantidade: 1,
        detalhes: "Sem cebola",
        restaurante: restaurantes[0]
    }),
    new ItemCarrinho(<ItemCarrinho> {
        id: 1,
        descricao: "Coca-Cola",
        preco: 10,
        quantidade: 1,
        detalhes: "",
        restaurante: restaurantes[0]
    })
]
var usuarios = [
    new Usuario(1, "Breno Miranda", new Carrinho(restaurantes[0], itens)),
    new Usuario(2, "Paulo Borba", undefined, [new Pedido(<Pedido> {id: 1, itens: [itens[0]], valorTotal: 40, status: StatusPedido.COMPLETO, restaurante: restaurantes[0]})])
]

/*
 * @api {put} /configs Define as configurações pra propósitos de teste
 */
app.put('/configs', function (req, res) {
    configs = req.body;
    atualizarConfigs();

    return res.status(200);
});

/**
 * @api {get} /usuarios/:id/carrinho Retorna os itens do carrinho do usuário // TODO: Melhor retornar o carrinho completo (uma representação dele)
 */
app.get('/usuario/:id/carrinho', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        return res.status(200).json({data: usuario.pegarCarrinho().pegarInformacao()});
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }
});

/**
 * @api {post} /usuarios/:id/carrinho Adiciona um item ao carrinho do usuário, retornando o carrinho atualizado
 */
app.post('/usuario/:id/carrinho', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        const newItem: ItemCarrinho = <ItemCarrinho> req.body;
        try {
            usuario.pegarCarrinho().adicionarItem(newItem);
            return res.status(200).json({data: usuario.pegarCarrinho().pegarInformacao()});
        } catch (error) {
            console.log(error);
        } 
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }

    
});

/**
 * @api {delete} /usuario/:id/carrinho/:idItem Remove o item com a id informada do carrinho do usuário, retornando o carrinho atualizado
 */
app.delete('/usuario/:id/carrinho/:idItem', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        const idItem: number = +req.params.idItem;
        usuario.pegarCarrinho().removerItem(idItem);

        return res.status(200).json({data: usuario.pegarCarrinho().pegarInformacao()});
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }
});

/**
 * @api {put} /usuario/:id/carrinho Atualiza o item com a id informada do carrinho do usuário, retornando o carrinho atualizado
 */
app.put('/usuario/:id/carrinho', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        const item: ItemCarrinho = <ItemCarrinho> req.body;
        usuario.pegarCarrinho().atualizarItem(item);
        return res.status(200).json({data: usuario.pegarCarrinho().pegarInformacao()});
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }
});

/**
 * @api {get} /usuario/:id/carrinho/total Retorna o valor total do carrinho do usuário
 */
app.get('/usuario/:id/carrinho/total', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        return res.status(200).json({data: usuario.pegarCarrinho().calcularPrecoTotal()});
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }
});

/** 
 * @api {get} /usuario/:id/pedidos Retorna os pedidos do usuário
 */
app.get('/usuario/:id/pedidos', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        return res.status(200).json({data: usuario.pegarPedidos().map(pedido => pedido.pegarInformacao())});
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }
})

/** 
 * @api {post} /usuario/:id/pedidos Cria um novo pedido a partir do carrinho. Retorna um erro se o carrinho estiver vazio.
 */
app.post('/usuario/:id/pedidos', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        try {
            usuario.realizarPedido();
        } catch (erro) {
            return res.status(409).json({error: "Não é possível criar um pedido com o carrinho vazio"});
        }
        return res.status(200).json({data: usuario.pegarPedidos().map(pedido => pedido.pegarInformacao())});
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }
})

/** 
 * @api {put} /usuario/:id/pedidos/:idPedido/cancelar Cancela o pedido com a id informada, se ainda for possível. Senão, retorna erro 409.
 */
app.put('/usuario/:id/pedidos/:idPedido/cancelar', function (req, res) {
    const id: number = +req.params.id;
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        const idPedido = +req.params.idPedido;
        const pedido = usuario.pegarPedidos().find(pedido => pedido.id == idPedido);
        try {
            pedido.cancelar();
            return res.status(200).json({data: pedido.pegarInformacao()});
        } catch (erro) {
            return res.status(409).json({error: erro.message});
        }
    } else {
        return res.status(404).json({error: "Usuário não encontrado"});
    }
})

export { app };