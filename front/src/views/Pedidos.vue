<template>
    <v-main>
      <v-row
        no-gutters
        align="center"
        justify="center"
        v-for="(pedido, index) in this.pedidos" :key="index"
      >
        <v-col lg=8>
          <v-row no-gutters>
            <v-card id="date" class="rounded-xl mt-6">
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
              <v-card-text>
                {{infoPedido.descricao}}
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
</template>

<script>
export default {
  name: 'Pedidos',
  data () {
    return {
      // data -> Todos os pedidos dessa data
      pedidos: [
        {
          dataPedido: '12/12/2021',
          infoPedidos: [
            {
              id: '45487214',
              descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non dui a nisl consectetur tristique sed non orci. Cras ligula enim, facilisis quis lacus non, auctor interdum ante. Fusce justo tellus, elementum non erat a, pulvinar varius est. Ut nec risus mollis odio porttitor tristique. Cras egestas suscipit neque. Maecenas dapibus nibh sed luctus sodales. Cras lectus nibh, congue in sapien eget, porta molestie lectus. Sed auctor, justo in varius lacinia, orci enim tincidunt nulla, id bibendum neque lectus at nisl. Quisque consectetur, neque sed varius pretium, neque purus vehicula turpis, id elementum est turpis in lorem. Vestibulum sit amet nulla massa. Fusce mi dui, vestibulum viverra sagittis ut, pretium ut justo. Proin mattis sem vitae dapibus sagittis. Duis tempus diam sit amet leo blandit bibendum eu nec lectus.'
            },
            {
              id: '5467613546',
              descricao: 'Lorem ipsum dolor '
            }
          ]
        },
        {
          dataPedido: '11/12/2021',
          infoPedidos: [
            {
              id: '45487214',
              descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non dui a nisl consectetur tristique sed non orci. Cras ligula enim, facilisis quis lacus non, auctor interdum ante. Fusce justo tellus, elementum non erat a, pulvinar varius est. Ut nec risus mollis odio porttitor tristique. Cras egestas suscipit neque. Maecenas dapibus nibh sed luctus sodales. Cras lectus nibh, congue in sapien eget, porta molestie lectus. Sed auctor, justo in varius lacinia, orci enim tincidunt nulla, id bibendum neque lectus at nisl. Quisque consectetur, neque sed varius pretium, neque purus vehicula turpis, id elementum est turpis in lorem. Vestibulum sit amet nulla massa. Fusce mi dui, vestibulum viverra sagittis ut, pretium ut justo. Proin mattis sem vitae dapibus sagittis. Duis tempus diam sit amet leo blandit bibendum eu nec lectus.'
            },
            {
              id: '5467613546',
              descricao: 'Lorem ipsum dolor '
            }
          ]

        }
      ]
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
