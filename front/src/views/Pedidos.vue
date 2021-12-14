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
    </div>
</template>

<script>
export default {
  name: 'Pedidos',
  data () {
    return {
      // data -> Todos os pedidos dessa data
      pedidos: this.$store.state.pedidos
    }
  },
  methods: {
    detalhePedido (id) {
      this.$router.push(`/detalhe/${id}`)
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
