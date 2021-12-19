<template>
  <v-container fluid fill-height>
    <v-row no-gutters justify="center" align="center">
      <v-col lg=10 sm=10>
        <v-card class="rounded-xl" max-height="600">
          <v-card-title>
            <v-btn icon @click="goBack()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            Pedido #{{this.$route.params.id}}
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
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DetalhePedido',
  data () {
    return {
      pedidos: this.$store.state.pedidos,
      id: this.$route.params.id,
      itens: '',
      date: ' ',
      nomeRestaurante: ' ',
      valor: ' '
    }
  },
  computed: {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getInfoPedidos () {
      console.log(this.pedidos.data)
      this.pedidos.data.forEach(pedido => {
        if (this.id === pedido.id.toString()) {
          // console.log(pedido)
          // console.log(new Date(pedido.data).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
          this.date = new Date(pedido.data).toLocaleString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          this.nomeRestaurante = pedido.restaurante.nome
          this.valor = pedido.valorTotal
          this.itens = pedido.itens
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