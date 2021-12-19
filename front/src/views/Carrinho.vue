<template>
<v-app>
  <v-skeleton-loader type="card, list-item" v-if="this.loading"></v-skeleton-loader>
  <v-container v-else class="d-flex flex-column grow">
        <v-row no-gutters class="grow mb-5">
          <v-row v-if="carrinhoVazio" justify="center" align="center">
            <h2>Não há pedidos no carrinho</h2>
          </v-row>
          <v-row v-else no-gutters>
            <Pedido
              :carrinho="this.carrinho"
              @remove-pedido="removeItem($event)"
              />
          </v-row>
        </v-row>
        <v-row v-if="!carrinhoVazio" no-gutters class="align-end shrink">
          <v-col>
            <v-card style="height: 90px">
              <v-card-text class="rounded-xl">
                <v-row no-gutters>
                  <v-col cols="10">
                    <v-row no-gutters>
                      <h2 class="ma-0">Valor total:</h2>
                    </v-row>
                    <v-row>
                      <h3 class="ml-10" style="font-weight:normal">R$ {{this.carrinho.data.precoTotal.toFixed(2)}}</h3>
                    </v-row>
                  </v-col>
                  <v-col cols="2" class="d-flex align-end justify-center">
                    <template>
                      <div class="text-center">
                        <v-btn
                          color="deep-purple accent-4"
                          class="white--text"
                          @click="overlay = !overlay; fazerPedido()"
                        >
                          Confirmar
                          <v-icon right>
                            mdi-open-in-new
                          </v-icon>
                        </v-btn>
                        <v-overlay :value="overlay">
                          <v-progress-circular
                            indeterminate
                            size="64"
                          ></v-progress-circular>
                        </v-overlay>
                      </div>
                      <template>
                        <v-row justify="space-around">
                          <v-col cols="auto">
                            <v-dialog
                              overflow="hidden"
                              v-if="dialogPagamento" v-model="dialogPagamento"
                              transition="dialog-top-transition"
                              max-width="600"
                            >
                              <template>
                                <v-card style="overflow: hidden">
                                  <v-row justify="center">
                                    <v-icon v-if="checkPagamento()" size="200" color="green">mdi-check-bold</v-icon>
                                  </v-row>
                                  <v-row justify="center">
                                    <v-icon v-if="!checkPagamento()" size="200" color="red">mdi-alert-circle-outline</v-icon>
                                  </v-row>
                                  <v-card-text>
                                    <div v-if="checkPagamento()" class="text-center text-h2 pa-12">Pagamento confirmado!</div>
                                    <div v-if="!checkPagamento()" class="text-center text-h2 pa-12">Pagamento Negado!</div>
                                  </v-card-text>
                                  <v-card-actions class="justify-end">
                                    <v-btn
                                      text
                                      @click="dialog = false; goToPedidos()"
                                    >Ok</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </template>
                            </v-dialog>
                          </v-col>
                        </v-row>
                      </template>
                    </template>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <template>
          <v-snackbar :color="snackbar.color" v-model="snackbar.show">
            {{ snackbar.message }}
          </v-snackbar>
        </template>
  </v-container>
  <!-- <v-btn @click="addItem()">
    add
  </v-btn> -->
</v-app>
</template>

<script>
import Pedido from '../components/pedidoCarrinho.vue'
import { _enum } from '../utils/enum.js'
const axios = require('axios')
export default {
  name: 'Carrinho',

  data () {
    return {
      // carrinho: this.$store.state.carrinho,
      loading: true,
      carrinho: null,
      pedido: null,
      overlay: false,
      statusPedido: this.$store.state.statusPedido,
      dialogPagamento: false,
      snackbar: {
        show: false,
        message: null,
        color: null
      }
    }
  },

  methods: {
    goToPedidos () {
      if (this.pedido.status !== 0) {
        this.$router.push('/pedidos')
      } else {
        this.dialogPagamento = false
      }
    },

    checkPagamento () {
      return this.pedido.status >= _enum.AGUARDANDO_CONFIRMAÇÃO
    },

    async getCarrinho () {
      try {
        await axios.get('http://localhost:3000/usuario/2/carrinho')
          .then(resp => {
            console.log('Data received (carrinho)')
            console.log(resp.data)
            this.carrinho = resp.data
            this.loading = false
          })
        // const data = req.data
        // console.log(data)
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    },

    async fazerPedido () {
      try {
        await axios.post('http://localhost:3000/usuario/2/pedidos')
          .then(resp => {
            console.log('Data received (pedido)')
            console.log(resp.data)
            this.pedido = resp.data.data.slice(-1)[0]
            console.log(this.pedido)
            setTimeout(() => {
              this.overlay = false
              this.dialogPagamento = true
            }, 500)
          })
        // const data = req.data
        // console.log(data)
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    },

    async addItem () {
      try {
        await axios.post('http://localhost:3000/usuario/2/carrinho', {
          id: 1,
          restaurante: {
            id: 1,
            nome: 'Pizza Hut'
          },
          quantidade: 2
        }).then(resp => {
          console.log('Data received (carrinho)')
          console.log(resp.data)
          this.carrinho = resp.data
          this.loading = false
        })
        // const data = req.data
        // console.log(data)
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    },

    async removeItem (id) {
      try {
        console.log('Removing item')
        await axios.delete(`http://localhost:3000/usuario/2/carrinho/${id}`)
          .then(resp => {
            console.log('Pedido excluido')
            console.log(resp.data)
            this.carrinho = resp.data
            // this.loading = false
          })
        // const data = req.data
        // console.log(data)
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    }
  },

  components: {
    Pedido
  },

  computed: {
    carrinhoVazio () {
      return this.carrinho.data.itens.length === 0
    }
  },

  created () {
    this.getCarrinho()
  }

}
</script>

<style scoped>
</style>
