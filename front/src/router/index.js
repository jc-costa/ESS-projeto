import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import Pedidos from '../views/Pedidos.vue'
import DetalhePedido from '../views/DetalhePedido.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: Test
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
  {
    path: '/detalhe/:id',
    name: 'Detalhe Pedido',
    component: DetalhePedido
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
