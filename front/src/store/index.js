import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pedidos: [
      {
        dataPedido: '12/12/2021',
        infoPedidos: [
          {
            nomeRestaurante: 'A',
            id: '45487214',
            restaurante: 'res1',
            items: ['Pizza grande Pepperoni', 'Pizza pequena Calabresa', 'Pizza média Portuguesa'],
            descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non dui a nisl consectetur tristique sed non orci. Cras ligula enim, facilisis quis lacus non, auctor interdum ante. Fusce justo tellus, elementum non erat a, pulvinar varius est. Ut nec risus mollis odio porttitor tristique. Cras egestas suscipit neque. Maecenas dapibus nibh sed luctus sodales. Cras lectus nibh, congue in sapien eget, porta molestie lectus. Sed auctor, justo in varius lacinia, orci enim tincidunt nulla, id bibendum neque lectus at nisl. Quisque consectetur, neque sed varius pretium, neque purus vehicula turpis, id elementum est turpis in lorem. Vestibulum sit amet nulla massa. Fusce mi dui, vestibulum viverra sagittis ut, pretium ut justo. Proin mattis sem vitae dapibus sagittis. Duis tempus diam sit amet leo blandit bibendum eu nec lectus.'
          },
          {
            nomeRestaurante: 'B',
            id: '5467613546',
            valor: '30',
            descricao: 'Lorem ipsum dolor '
          }
        ]
      },
      {
        dataPedido: '11/12/2021',
        infoPedidos: [
          {
            nomeRestaurante: 'C',
            id: '454872134',
            valor: '25',
            descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non dui a nisl consectetur tristique sed non orci. Cras ligula enim, facilisis quis lacus non, auctor interdum ante. Fusce justo tellus, elementum non erat a, pulvinar varius est. Ut nec risus mollis odio porttitor tristique. Cras egestas suscipit neque. Maecenas dapibus nibh sed luctus sodales. Cras lectus nibh, congue in sapien eget, porta molestie lectus. Sed auctor, justo in varius lacinia, orci enim tincidunt nulla, id bibendum neque lectus at nisl. Quisque consectetur, neque sed varius pretium, neque purus vehicula turpis, id elementum est turpis in lorem. Vestibulum sit amet nulla massa. Fusce mi dui, vestibulum viverra sagittis ut, pretium ut justo. Proin mattis sem vitae dapibus sagittis. Duis tempus diam sit amet leo blandit bibendum eu nec lectus.'
          },
          {
            nomeRestaurante: 'D',
            id: '5467613123546',
            valor: '35',
            descricao: 'Lorem ipsum dolor '
          }
        ]

      }
    ],
    carrinho: {
      nomeRestaurante: 'C',
      itens: [
        {
          qtd: '1',
          valor: '24.00',
          id: '123123',
          descricao: 'Pizza Grande',
          detalhes: ['Sem cebola', 'Calabresa']
        },
        {
          qtd: '2',
          valor: '123.00',
          id: '1223s',
          descricao: 'Parmegiana'
        }
      ]
    }

  },
  mutations: {
    mRemovePedido (state, payload) {
      // console.log('Alterando o estado do pedido ' + payload)
      // console.log(state.carrinho.itens)
      state.carrinho.itens = state.carrinho.itens.filter(el => el.id !== payload)
      // state.carrinho = []
      // console.log(state.carrinho.itens)
    },
    addPedido (state, payload) {
      state.carrinho = payload
    }
  },
  actions: {
    removePedidoCarrinho ({ commit }, payload) {
      console.log('Removendo o pedido ' + payload + ' da store')
      commit('mRemovePedido', payload)
    },
    adicionaItens ({ commit }, payload) {
      console.log(payload.nomeRestaurante)
      commit('addPedido', payload)
    }
  },
  modules: {
  }
})
