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
          <v-row no-gutters>
            <v-card id="date" class="rounded-xl mt-12">
              <v-card-title>
                {{pedido.dataPedido}}
              </v-card-title>
            </v-card>
          </v-row>
          <v-row
            no-gutters
            v-for="(infoPedido, index) in pedido.infoPedidos" :key="index"
          >
            <v-card id="pedido" class="mt-3 rounded-xl">
              <v-card-title>
                <span>Pedido #{{infoPedido.id}} </span>
                <v-spacer></v-spacer>
                <v-btn icon @click="detalhePedido(infoPedido.id)">
                  <v-icon>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text style="text-align: justify" class="pr-13 pb-5">
                {{infoPedido.descricao}}
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
                    <v-icon v-if="statusPedido.confirmado" size="200" color="green">mdi-check-bold</v-icon>
                  </v-row>
                  <v-row justify="center">
                    <v-icon v-if="!statusPedido.confirmado" size="200" color="red">mdi-alert-circle-outline</v-icon>
                  </v-row>
                  <v-card-text>
                    <div v-if="statusPedido.confirmado" class="text-center text-h2 pa-12">Pedido confirmado!</div>
                    <div v-if="!statusPedido.confirmado" class="text-center text-h2 pa-12">Pedido Negado!</div>
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
export default {
  name: 'Pedidos',
  data () {
    return {
      // data -> Todos os pedidos dessa data
      pedidos: this.$store.state.pedidos,
      statusPedido: this.$store.state.statusPedido,
      showDialog: false

    }
  },
  methods: {
    detalhePedido (id) {
      this.$router.push(`/detalhe/${id}`)
    },

    limpaCarrinho () {
      this.$store.dispatch('limparCarrinho')
    },

    pedidoAceito () {
      if (Math.random() >= 0.3) {
        this.statusPedido.confirmado = true
        this.limpaCarrinho()
      }
      this.showDialog = true
    }
  },

  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.from = from
    })
  },

  beforeMount () {
    this.statusPedido.confirmado = false
    console.log(this.$router.history._startLocation)
    if (this.$router.history._startLocation === '/carrinho' && this.statusPedido.pagamento === true) {
      this.pedidoAceito()
      console.log(this.showDialog)
    }
  },

  computed: {

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

</style>>
