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
            valor: '50',
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
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
