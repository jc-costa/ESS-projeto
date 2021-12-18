<template>
  <v-container fluid class="ma-0 pa-0">
    <div v-for="(pedido, index) in this.carrinho.data.itens" :key="index">
      <v-card class="mt-5">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="10">
              <v-row>
                <h2 class="pa-2">{{ pedido.descricao }}</h2>
              </v-row>
              <v-row v-if="pedido.detalhes">
                <v-col>
                  <v-row>
                    <h3>Notas do cliente: </h3>
                  </v-row>
                  <v-row>
                    <span id="detalhe">- {{pedido.detalhes}}</span>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <h3>Quantidade: {{pedido.quantidade}}</h3>
              </v-row>
              <v-row>
                <h3 class="last">Valor: R$ {{pedido.preco * pedido.quantidade}}</h3>
              </v-row>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-menu offset-y left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in dropdown"
                    :key="index"
                    link
                  >
                    <v-list-item-title @click="action(item, pedido)">{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="350"
    >
    <v-card>
      <v-card-title>Tem certeza que deseja excluir?</v-card-title>
      <v-card-actions>
        <v-btn plain @click="dialog = false">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" plain @click="cancelarPedido()">Excluir</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>

  </v-container>
</template>

<script>

export default {
  name: 'Pedidos',
  props: ['carrinho'],
  data () {
    return {
      dropdown: [
        { title: 'Editar Pedido' },
        { title: 'Cancelar Pedido' }
      ],
      dialog: false,
      editDialog: false,
      idPedido: null,
      loading: true,
      detalhe: '',
      editPedido: ''
    }
  },
  created () {
    // this.addData()
  },
  computed: {
    // carrinho () {
    //   // console.log(this.$store.state.carrinho)
    //   return this.$store.state.carrinho
    // }
  },
  methods: {
    action (item, pedido) {
      switch (item.title) {
        case 'Editar Pedido':
          this.editarPedido(pedido)
          break
        case 'Cancelar Pedido':
          this.showDialog()
          this.idPedido = pedido.id
          break
      }
    },
    editarPedido (pedido) {
      console.log(pedido.id + ' Pedido editado')
    },
    cancelarPedido () {
      console.log(this.idPedido + ' Pedido Cancelado')
      this.$emit('remove-pedido', this.idPedido)
      // this.$store.dispatch('removePedidoCarrinho', this.idPedido)
      this.closeDialog()
    },
    showDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    }

  }
}
</script>

<style scoped>

#detalhe {
  margin-left: 70px;
}

h3 {
  font-weight: normal;
  margin-left: 40px;
  margin-top: 10px;
}

h3.last{
  margin-bottom: 20px;
}

</style>
