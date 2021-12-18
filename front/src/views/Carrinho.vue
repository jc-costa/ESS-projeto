<template>
<v-app>
  <v-container class="d-flex flex-column grow">
        <v-row no-gutters class="grow mb-5">
          <v-col>
            <v-row no-gutters>
              <Pedido />
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters class="align-end shrink">
          <v-col>
            <v-card style="height: 90px">
              <v-card-text class="rounded-xl">
                <v-row no-gutters>
                  <v-col cols="10">
                    <v-row no-gutters>
                      <h2 class="ma-0">Valor total:</h2>
                    </v-row>
                    <v-row>
                      <h4 class="ml-10" style="font-weight:normal">R$ YY,YY</h4>
                    </v-row>
                  </v-col>
                  <v-col cols="2" class="d-flex align-end justify-center">
                    <template>
                      <div class="text-center">
                        <v-btn
                          color="deep-purple accent-4"
                          class="white--text"
                          @click="overlay = !overlay"
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
                              v-if="showDialog" v-model="showDialog"
                              transition="dialog-top-transition"
                              max-width="600"
                            >
                              <template>
                                <v-card style="overflow: hidden">
                                  <v-row justify="center">
                                    <v-icon size="200" color="green">mdi-check-bold</v-icon>
                                  </v-row>
                                  <v-card-text>
                                    <div class="text-center text-h2 pa-12">Pagamento confirmado!</div>
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
  </v-container>
</v-app>
</template>

<script>
import Pedido from '../components/pedidoCarrinho.vue'
export default {
  name: 'Carrinho',

  data () {
    return {
      overlay: false,
      carrinho: this.$store.state.carrinho
    }
  },

  watch: {
    overlay (val) {
      setTimeout(() => {
        this.showDialog = true
      }, 950)
      val &&
      setTimeout(() => {
        this.overlay = false
      }, 1000)
    }
  },

  methods: {
    goToPedidos () {
      this.$router.push({ path: '/pedidos', query: { pedido: 'aceito' } })
    }
  },

  components: {
    Pedido
  }

}
</script>

<style scoped>
</style>
