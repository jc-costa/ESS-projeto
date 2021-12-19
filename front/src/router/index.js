import Vue from 'vue'
import VueRouter from 'vue-router'
import Pedidos from '../views/Pedidos.vue'
import DetalhesPedidos from '../views/DetalhesPedidos.vue'
import Carrinho from '../views/Carrinho.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
  {
    path: '/detalhe/:id',
    name: 'DetalhePedido',
    component: DetalhesPedidos
  },
  {
    path: '/carrinho',
    name: 'CarrinhoCompras',
    component: Carrinho
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
