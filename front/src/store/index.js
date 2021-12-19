import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pedidos: null,
    carrinho: null

  },
  mutations: {
    assign (state, payload) {
      console.log('Salvando dados')
      state.pedidos = payload
    }
  },
  actions: {
    assignPedidos ({ commit }, payload) {
      commit('assign', payload)
    }
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
