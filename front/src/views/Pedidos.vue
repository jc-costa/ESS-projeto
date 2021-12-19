<template>
  <div>
    <v-container v-if="!temPedido" class="d-flex flex-column grow">
      <v-col>
        <v-row align="center" justify="center" style="height: calc(100vh - 100px) !important">
          <h2>Não existem pedidos realizados!</h2>
        </v-row>
      </v-col>
    </v-container>
    <div v-else>
      <v-row
        class="ma-0"
        no-gutters
        align="center"
        justify="center"
        v-for="(pedido, index) in this.pedidos" :key="index"
      >
        <v-col lg=10>
            <v-card id="pedido" class="mt-3 rounded-xl">
              <v-card-title>
                <span>Pedido #{{pedido.id}} </span>
                <v-spacer></v-spacer>
                <v-btn icon data-cy="btn-detalhesPedido" @click="detalhePedido(pedido.id)">
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
                <div class="text-h5 pa-12"> {{getStatusPedido(pedido)}}</div>
              </v-card-text>
            </v-card>
        </v-col>
      </v-row>
      <template>
        <!-- <v-btn @click="showDialog = true">Show Dialog</v-btn> -->
            <v-dialog
              overflow="hidden"
              v-model="showDialog"
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
                      data-cy="btn-ok-pedido-confirmado"
                      @click="showDialog = false"
                    >Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
      </template>
    </div>
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

    getStatusPedido (pedido) {
      switch (pedido.status) {
        case 0:
          return 'Aguardando Pagamento'
        case 1:
          return 'Aguardando Confirmação'
        case 2:
          return 'Sendo Preparado'
        case 3:
          return 'Aguardando Entregador'
        case 4:
          return 'Sendo Entregue'
        case 5:
          return 'Aguardando Coleta'
        case 6:
          return 'Completo'
        case 7:
          return 'Cancelado pelo cliente'
        case 8:
          return 'Cancelado pelo restaurante'
      }
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
          console.log(this.pedidos)
          if (this.pedidos.length > 0) {
            this.$store.dispatch('assignPedidos', resp.data)
            const pedido = this.pedidos.slice(-1)[0]
            if (this.checkPedidoConfirmado() && this.checkNovoPedido()) {
              this.showDialog = true
              this.$store.dispatch('atualizaUltimoPedido', pedido.id)
            }
          }
        })
        .catch(e => { console.log(e) })
    }
  },

  computed: {
    temPedido () {
      return this.pedidos.length > 0
    }
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
