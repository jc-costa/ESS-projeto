<template>
  <v-container fluid fill-height>
    <v-row no-gutters justify="center" align="center">
      <v-col lg=10 sm=10>
        <v-card class="rounded-xl" max-height="600">
          <v-card-title>
            <v-btn data-cy="btn-voltarPedidos" icon @click="goBack()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            Pedido #{{this.$route.params.id + ' ' + getStatusPedido(this.status)}}
          </v-card-title>
          <v-card-text>
            <v-col class="ml-10">
              <v-row>
                <p style="font-color: black">Data: {{this.date}}</p>
              </v-row>
              <v-row>
                <p>Restaurante: {{this.nomeRestaurante}}</p>
              </v-row>
              <v-row>
                <span class ="ml-6 mb-3">Item(s):</span>
              </v-row>
              <!-- o v-for irá gerar essas tags de dentro do span, a quantidade de vezes q tem em informação. key  -->
              <v-row v-for="(info, index) in itens" :key="index">
                <p id="items">- {{info.descricao}} - R$ {{info.preco}}</p>
              </v-row>
              <v-row>
                <p class="mt-8">Valor Total R$: {{this.valor}}</p>
              </v-row>
              <v-row>
                <v-btn
                  v-if="podeCancelar()"
                  depressed
                  large
                  color="error"
                  @click="cancelaPedido()"
                >
                  Cancelar
                </v-btn>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { _enum } from '../utils/enum.js'
const axios = require('axios')
export default {
  name: 'DetalhePedido',
  data () {
    return {
      userId: this.$store.state.user.id,
      pedidos: this.$store.state.pedidos,
      id: this.$route.params.id,
      itens: '',
      date: ' ',
      nomeRestaurante: ' ',
      valor: ' ',
      status: ' '
    }
  },
  computed: {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },

    podeCancelar () {
      return this.status === _enum.SENDO_PREPARADO
    },

    getStatusPedido (status) {
      switch (status) {
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

    async cancelaPedido () {
      await axios.put(`http://localhost:3000/usuario/${this.userId}/pedidos/${this.$route.params.id}/cancelar`, {
        id: this.userId,
        idPedido: this.$route.params.id
      })
        .then(resp => {
          console.log('cancela pedido')
          console.log(resp.data)
          this.carrinho = resp.data
          this.$router.push('/pedidos')
        })
        .catch(e => {
          console.log(e)
        })
    },

    getInfoPedidos () {
      console.log(this.pedidos.data)
      this.pedidos.data.forEach(pedido => {
        if (this.id === pedido.id.toString()) {
          this.date = new Date(pedido.data).toLocaleString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          this.nomeRestaurante = pedido.restaurante.nome
          this.valor = pedido.valorTotal
          this.itens = pedido.itens
          this.status = pedido.status
        }
      })
    }
  },
  created () {
    console.log(this.$store.state.pedidos)
    this.getInfoPedidos()
  }
}
</script>

<style>

#items {
  margin: 0 60px
}

</style>
