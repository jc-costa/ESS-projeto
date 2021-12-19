<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      style="height: 64px"
    >
      <span>CInFood/span>
      <v-spacer></v-spacer>
      <span>{{this.$store.state.user.name}}</span>
      <v-btn icon class="ml-3" data-cy="btn-carrinho" @click="goToView('Carrinho')">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon class="ml-3" @click="goToView('Pedidos')">
        <v-icon>mdi-clipboard-text</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon class="ml-3 mr-1">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-btn>
          <v-icon>mdi-logout</v-icon>
          <span>Sair</span>
        </v-btn>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
const axios = require('axios')
export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    goToView (page) {
      switch (page) {
        case 'Carrinho':
          if (this.$route.name !== 'CarrinhoCompras') { this.$router.push('/carrinho') }
          break
        case 'Pedidos':
          if (this.$route.name !== 'Pedidos') { this.$router.push('/pedidos') }
      }
    },
    async getUser () {
      try {
        const id = 1
        await axios.get(`http://localhost:3000/usuario/${id}`)
          .then(resp => {
            const payload = {
              name: resp.data.data,
              id: id
            }
            this.$store.dispatch('atualizaUser', payload)
          })
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    }
  },
  beforeMount () {
    this.getUser()
  }
}
</script>

<style>
  div.v-application--wrap {
    min-height:calc(100vh - 100px) !important;
  }
</style>
