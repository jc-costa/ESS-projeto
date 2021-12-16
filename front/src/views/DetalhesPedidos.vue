<template>
  <v-container fluid fill-height>
    <v-row no-gutters justify="center" align="center">
      <v-col lg=8>
        <v-card class="rounded-xl">
          <v-card-title>
            <v-btn icon @click="goBack()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            Pedido #{{this.$route.params.id}}
          </v-card-title>
          <v-card-text>
            <div class="pl-10">
              Data: {{this.date}}
              <br>
              Nome Restaurante: {{this.nomeRestaurante}}
              <br>
              <p class ="ml-6">Item(s):</p>
              <!-- o v-for irá gerar essas tags de dentro do span, a quantidade de vezes q tem em informação. key  -->
              <span v-for="(info, index) in getInfoPedidos" :key="index">
              <p id="items">- {{info.descricao}}</p>
              <br>
              </span>
              <br>
              <span class="">Valor R$: {{this.valor}}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Detalhe Pedido',
  data () {
    return {
      pedidos: this.$store.state.pedidos,
      id: this.$route.params.id,
      date: ' ',
      nomeRestaurante: ' ',
      valor: ' '
    }
  },
  computed: {
    getInfoPedidos () {
      const informacao = []
      this.pedidos.forEach(pedido => {
        pedido.infoPedidos.forEach(info => {
          if (this.id === info.id) {
            informacao.push(info)
            this.date = pedido.dataPedido
            this.nomeRestaurante = info.nomeRestaurante
            this.valor = info.valor
          }
        })
      })
      return informacao
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

#items {
  margin: 0 60px
}

</style>
