import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pedidos: null,
    carrinho: null,
    ultimoPedido: {
      id: null
    }
  },
  mutations: {
    assign (state, payload) {
      console.log('Salvando dados')
      state.pedidos = payload
    },
    updateUltimoPedido (state, payload) {
      state.ultimoPedido.id = payload
    }
  },
  actions: {
    assignPedidos ({ commit }, payload) {
      commit('assign', payload)
    },
    atualizaUltimoPedido ({ commit }, payload) {
      commit('updateUltimoPedido', payload)
    }
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
