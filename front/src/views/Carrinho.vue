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
                    <v-btn class="mt-3" color="green" dark style="text">Confirmar</v-btn>
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
      carrinho: this.$store.state.carrinho
    }
  },

  components: {
    Pedido
  }

}
</script>

<style scoped>
</style>
