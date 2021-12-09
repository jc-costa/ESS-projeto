<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <span>Nome App</span>
      <v-spacer></v-spacer>
      <span>Nome Usuario</span>
      <v-btn icon class="ml-3">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon class="ml-3">
        <v-icon>mdi-clipboard-text</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon class="ml-3">
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

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
