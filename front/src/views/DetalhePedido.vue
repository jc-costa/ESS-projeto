<template>
  <v-main>
    <v-row no-gutters justify="center" align="center">
      <v-col lg=8>
        <v-card>
          <v-card-title>
            Pedido #{{this.$route.params.id}}
          </v-card-title>
          <v-card-text>
            <span>Items</span>
            <br>
            <span>{{this.informacao}}</span>
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
      informacao: 'Informação do pedido'
    }
  }
}
</script>

<style>

</style>
