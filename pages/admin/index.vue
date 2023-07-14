<template>
  <v-container>
    <h1
    class="text-center accent--text"
    >Olá chefinho, seja bem vindo!</h1>
    <v-row class="mt-5 mb-5">
      <card
      style="box-shadow: -2px -10px 20px #FDF9FA, 2px 10px 20px #FDF9FA;"
      nome = 'Produtos' 
      icon = 'mdi-cart-variant'
      link = '/admin/Produtos'
      ></card>

      <card
      style="box-shadow: -2px -10px 20px #FDF9FA, 2px 10px 20px #FDF9FA;"
      nome = 'Categorias'
      icon = 'mdi-bookshelf'
      link = '/admin/Categorias'
      ></card>
    </v-row>

    <v-row class="mb-5">
      <card
      style="box-shadow: -2px -10px 20px #FDF9FA, 2px 10px 20px #FDF9FA;"
      nome = 'Pagamentos'
      icon = 'mdi-cash-register'
      link = '/admin/Pagamentos'
      ></card>

      <card
      style="box-shadow: -2px -10px 20px #FDF9FA, 2px 10px 20px #FDF9FA;"
      nome = 'Cupons' 
      icon = 'mdi-sale'
      link = '/admin/Cupons'
      ></card>
    </v-row>

    <v-row class="mb-5">
      <card
      style="box-shadow: -2px -10px 20px #FDF9FA, 2px 10px 20px #FDF9FA;"
      nome = 'Usuários'
      icon = 'mdi-account'
      link = '/admin/Usuarios'
      ></card>

      <card
      style="box-shadow: -2px -10px 20px #FDF9FA, 2px 10px 20px #FDF9FA;"
      nome = 'Endereços'
      icon = 'mdi-shield-home'
      link = '/admin/Enderecos'
      ></card>
    </v-row>

    <v-row class="mb-5">
      <card
      style="box-shadow: -2px -10px 20px #FDF9FA, 2px 10px 20px #FDF9FA;"
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

  async created() {
    await this.valida();
  },

  methods: {
    async valida() {
      const { role } = await this.$api.get('/users/validate');
      if(role && !(role === 'Administrador')) {
        this.$router.push('/');
      }
    },
  }
}
</script>