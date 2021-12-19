<template>
    <div class="ma-0 pa-0">
      <v-row
        class="ma-0"
        no-gutters
        align="center"
        justify="center"
        v-for="(pedido, index) in this.pedidos" :key="index"
      >
        <v-col lg=8>
          <v-row
            no-gutters
          >
            <v-card id="pedido" class="mt-3 rounded-xl">
              <v-card-title>
                <span>Pedido #{{pedido.id}} </span>
                <v-spacer></v-spacer>
                <v-btn icon @click="detalhePedido(pedido.id)">
                  <v-icon>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text style="text-align: justify">
                <p>Restaurante:</p>
                <p id="descricao">- {{pedido.itens[0].restaurante.nome}}</p>
                <p>Itens: </p>
                <div v-for="(item, index) in pedido.itens" :key="index">
                  <p id="descricao">- {{item.descricao}}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
      <template>
        <!-- <v-btn @click="showDialog = true">Show Dialog</v-btn> -->
        <v-row justify="space-around">
          <v-col cols="auto">
            <v-dialog
              overflow="hidden"
              v-if="showDialog" v-model="showDialog"
              transition="dialog-top-transition"
              max-width="600"
            >
              <template>
                <v-card style="overflow: hidden">
                  <v-row justify="center">
                    <v-icon v-if="checkPedidoConfirmado()" size="200" color="green">mdi-check-bold</v-icon>
                  </v-row>
                  <v-row justify="center">
                    <v-icon v-if="!checkPedidoConfirmado()" size="200" color="red">mdi-alert-circle-outline</v-icon>
                  </v-row>
                  <v-card-text>
                    <div v-if="checkPedidoConfirmado()" class="text-center text-h2 pa-12">Pedido confirmado!</div>
                    <div v-if="checkPedidoConfirmado()" class="text-center text-h5 pa-12">Seu pedido está com o restaurante e
já esta sendo preparado!</div>
                    <div v-if="!checkPedidoConfirmado()" class="text-center text-h2 pa-12">Pedido Negado!</div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      @click="showDialog = false"
                    >Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </template>
    </div>
</template>

<script>
import { _enum } from '../utils/enum.js'
const axios = require('axios')
export default {
  name: 'Pedidos',
  data () {
    return {
      ultimoPedido: this.$store.state.ultimoPedido,
      showDialog: false,
      pedido: null,
      pedidos: ''
    }
  },
  methods: {
    detalhePedido (id) {
      this.$router.push(`/detalhe/${id}`)
    },

    checkNovoPedido () {
      return this.pedidos.slice(-1)[0].id !== this.ultimoPedido.id
    },

    checkPedidoConfirmado () {
      return this.pedidos.slice(-1)[0].status === _enum.SENDO_PREPARADO
    },

    async getPedidos () {
      const userId = this.$store.state.user.id
      await axios.get(`http://localhost:3000/usuario/${userId}/pedidos`)
        .then(resp => {
          this.pedidos = resp.data.data
          this.$store.dispatch('assignPedidos', resp.data)
          const pedido = this.pedidos.slice(-1)[0]
          if (this.checkPedidoConfirmado() && this.checkNovoPedido()) {
            this.showDialog = true
            this.$store.dispatch('atualizaUltimoPedido', pedido.id)
          }
        })
        .catch(e => { console.log(e) })
    }
  },

  computed: {

  },

  beforeMount () {
    this.getPedidos()
  }
}
</script>

<style scoped>

#date {
  width: 150px;
}

#pedido {
  width: 100%;
}

p {
  color: black;
  font-size: 1rem;
  margin-left: 30px;
}
#descricao{
  margin-left: 50px
}

</style>>
