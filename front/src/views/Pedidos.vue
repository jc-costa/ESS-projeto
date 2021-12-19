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
    </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Pedidos',
  data () {
    return {
      pedidos: ''
    }
  },
  methods: {
    detalhePedido (id) {
      this.$router.push(`/detalhe/${id}`)
    },
    async getPedidos () {
      try {
        await axios.get('http://localhost:3000/usuario/2/pedidos')
          .then(resp => {
            // console.log('Data pedidos received')
            this.pedidos = resp.data.data
            this.$store.dispatch('assignPedidos', resp.data)
            console.log(this.$store.state.pedidos)
            // console.log(this.pedidos)
          })
      } catch (e) {
        console.log(e)
      }
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
