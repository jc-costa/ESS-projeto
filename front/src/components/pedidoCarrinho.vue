<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row align="center" justify="center">
      <v-col lg=10 sm=10 xs=10 v-for="(pedido, index) in this.carrinho.data.itens" :key="index">
        <v-card class="mt-5 rounded-xl">
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="10">
                <v-row>
                  <h2 class="pt-4 pl-4">{{ pedido.descricao }}</h2>
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
                      <v-list-item-title @click="test()">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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

    <v-dialog
      v-model="editDialog"
      max-width="600"
    >
    <v-card>
      <v-card-title>Editando o pedido</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <span class="ml-3 mt-3" style="font-size: 1.1rem; color:black">Notas do cliente</span>
            </v-row>
            <v-row>
              <v-textarea class="ml-3 mr-3" auto-grow v-model="editPedido.detalhes"></v-textarea>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="mr-1" style="color: black; font-size: 1rem">Quantidade</span>
            <v-btn icon class="mr-1" @click="aumentaQuantidade()">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
              {{this.editPedido.quantidade}}
            <v-btn icon class="ml-1" @click="diminuiQuantidade()">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn plain @click="closeDialog()">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" plain @click="salvaPedidoEditado()">Confirmar</v-btn>
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
    console.log('Prop received')
    console.log(this.carrinho.data)
  },
  computed: {
    // carrinho () {
    //   // console.log(this.$store.state.carrinho)
    //   return this.$store.state.carrinho
    // }
  },
  methods: {
    test () {
      console.log('clicado')
    },
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
      this.editPedido = pedido
      this.editDialog = true
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
      this.editDialog = false
    },
    aumentaQuantidade () {
      this.editPedido.quantidade = this.editPedido.quantidade + 1
    },
    diminuiQuantidade () {
      if (this.editPedido.quantidade > 1) { this.editPedido.quantidade = this.editPedido.quantidade - 1 }
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
