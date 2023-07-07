<template>
  <v-container>
    <v-row class="mt-5 mb-5">
      <card
      nome = 'Produtos' 
      icon = 'mdi-cart-variant'
      link = '/admin/Produtos'
      ></card>

      <card
      nome = 'Categorias'
      icon = 'mdi-bookshelf'
      link = '/admin/Categorias'
      ></card>
    </v-row>

    <v-row class="mb-5">
      <card
      nome = 'Pagamentos'
      icon = 'mdi-cash-register'
      link = '/admin/Pagamentos'
      ></card>

      <card
      nome = 'Cupons' 
      icon = 'mdi-sale'
      link = '/admin/Cupons'
      ></card>
    </v-row>

    <v-row class="mb-5">
      <card
      nome = 'Usuários'
      icon = 'mdi-account'
      link = '/admin/Usuarios'
      ></card>

      <card
      nome = 'Endereços'
      icon = 'mdi-shield-home'
      link = '/admin/Enderecos'
      ></card>
    </v-row>

    <v-row class="mb-5">
      <card
      nome = 'Pedidos'
      icon = 'mdi-basket'
      link = '/admin/Pedidos'
      ></card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
