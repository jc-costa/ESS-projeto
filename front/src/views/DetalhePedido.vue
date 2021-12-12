<template>
  <v-main>
    <v-row no-gutters justify="center" align="center">
      <v-col lg=8>
        <v-card>
          <v-card-title>
            Pedido #{{this.$route.params.id}}
          </v-card-title>
          <v-card-text>
            Data: #
            <br>
            Nome Restaurante: #
            <br>
            <p class ="ml-6">Item(s):</p>
            <!-- o v-for irá gerar essas tags de dentro do span, a quantidade de vezes q tem em informação. key  -->
            <span v-for="(info, index) in this.informacao" :key="index">
            <span class ="ml-6">{{info}}</span>
            <br>
            </span>
            <br>
            <span>Valor R$:</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  data () {
    return {
      informacao: [
        'Teste1',
        'Teste2'
      ]
    }
  }
}
</script>

<style>

</style>
