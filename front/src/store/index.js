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
    },
    user: {
      id: null,
      name: null
    }
  },
  mutations: {
    assign (state, payload) {
      // console.log('Salvando dados')
      state.pedidos = payload
    },
    updateUltimoPedido (state, payload) {
      state.ultimoPedido.id = payload
    },
    updateUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    assignPedidos ({ commit }, payload) {
      commit('assign', payload)
    },
    atualizaUltimoPedido ({ commit }, payload) {
      commit('updateUltimoPedido', payload)
    },
    atualizaUser ({ commit }, payload) {
      commit('updateUser', payload)
    }
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
