<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      style="height: 64px"
    >
      <span>Nome App</span>
      <v-spacer></v-spacer>
      <span>Nome Usuario</span>
      <v-btn icon class="ml-3" @click="goToView('Carrinho')">
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

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    goToView (page) {
      switch (page) {
        case 'Carrinho':
          this.$router.push('/carrinho')
          break
        case 'Pedidos':
          this.$router.push('/pedidos')
      }
    }
  }
}
</script>

<style>
  div.v-application--wrap {
    min-height:calc(100vh - 100px) !important;
  }
</style>
