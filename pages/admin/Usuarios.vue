<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container text-center>
    <h1 class="mb-10 accent--text">Cadastro de usuários</h1>
    <v-card
    color="primary"
    >
      <v-card-title>
        <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          color="black"
          background-color="info"
          rounded
          outlined
        ></v-text-field>
        </v-col>
        <v-col cols="1">
        <v-btn
          class="mb-7 black--text"
          elevation="15"
          fab
          small
          color="info" 
          @click="dialog = true">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
        </v-col>
      </v-card-title>
      <v-data-table 
      style="background-color: #52b788;"
      :headers="headers" 
      :items="items" 
      :search="search"
      > 
      <template #item.actions="{ item }">
        <v-icon 
        small 
        color="info" 
        @click="update(item)"
        >
          mdi-pencil 
        </v-icon>
        <v-icon 
        small 
        color="warning" 
        @click="destroy(item)"
        > 
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    </v-card>
    <v-dialog
    v-model="dialog"
    >
      <v-card 
      class="primary"
      style="overflow: hidden;">
      <h1
      class="accent--text ml-5"
      >
        Informações do usuário
      </h1>
        <v-card-title>
          <v-row justify="center">
          <v-col cols="1">
              <v-text-field
              v-model="id"
              outlined
              background-color="accent"
              disabled
              label="Id:"
              placeholder="Id:"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
          <v-row justify="center">
            <v-col cols="5">
              <v-text-field
              v-model="username"
              outlined
              solo-inverted
              background-color="accent"
              color="black"
              label="Nome de usuário"
              placeholder="Nome de usuário"
              ></v-text-field>
              <v-text-field
              v-model="name"
              outlined
              solo-inverted
              background-color="accent"
              color="black"
              label="Seu nome"
              placeholder="Seu nome"
              ></v-text-field>
              <v-text-field
              v-model="cpf"
              outlined
              solo-inverted
              background-color="accent"
              color="black"
              label="CPF"
              placeholder="CPF"
              ></v-text-field>
              <v-text-field
              v-model="phone"
              outlined
              solo-inverted
              background-color="accent"
              color="black"
              label="Telefone"
              placeholder="Telefone"
              ></v-text-field>
              <v-text-field
              v-model="email"
              outlined
              solo-inverted
              background-color="accent"
              color="black"
              label="E-mail"
              placeholder="E-mail"
              ></v-text-field>
              <v-autocomplete
              v-model="role"
              height="20px"
              outlined
              solo-inverted
              background-color="accent"
              color="black"
              label="Role"
              placeholder="Role"
              :items="list"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="1">
              <v-btn 
              class="mb-5 black--text"
              color="info"
              elevation="8"
              @click="persist"
              >
              Cadastrar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "Usuários",

  data() {
    return {
      search: null,
      items: [],
      list: ['Comprador', 'Entregador'],
      id: null,
      username: null,
      cpf: null,
      name: null,
      phone: null,
      passwordHash: null,
      token: null,
      role: null,
      cart: null,
      email: null,
      recuperation: null,
      dialog: false,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Nome de usuário',
          value: 'username',
          align: 'center'
        },
        {
          text: 'Seu nome',
          value: 'name',
          align: 'center'
        },
        {
          text: 'CPF',
          value: 'cpf',
          align: 'center'
        },
        {
          text: 'Telefone',
          value: 'phone',
          align: 'center'
        },
        {
          text: 'E-mail',
          value: 'email',
          align: 'center'
        },
        {
          text: 'Função',
          value: 'role',
          align: 'center'
        },
        {text: '', value: 'actions', filterable: false}
      ],
    }
  },
  async created() {
    await this.getUsuarios();
    await this.valida();
  },

  methods: {

    async valida() {
      const { role } = await this.$api.get('/users/validate');
      if(role && !(role === 'Administrador')) {
        this.$router.push('/');
      }
    },

    update(item) {
      this.id = item.id
      this.username = item.username
      this.cpf = item.cpf
      this.name = item.name
      this.phone = item.phone
      this.passwordHash = item.passwordHash
      this.token = item.token
      this.role = item.role
      this.cart = item.cart
      this.email = item.email
      this.recuperation = item.recuperations
      this.dialog = true
    },
    
    async persist() {
      try {
        const request = {
          id: this.id,
          username: this.username,
          cpf: this.cpf,
          name: this.name,
          phone: this.phone,
          passwordHash: this.passwordHash,
          token: this.token,
          role: this.role,
          cart: this.cart,
          email: this.email,
          recuperation: this.recuperation,
        }
        if (this.id) {
          await this.$api.patch(`/users/persist/${this.id}`, request);
          this.$toast.info('Usuário editado com sucesso!')
        } else {
          await this.$api.post(`/users/persist`, request);
          this.$toast.info('Usuário registrado com sucesso!')
        }
        this.id = null
        this.username = null
        this.cpf = null
        this.name = null
        this.phone = null
        this.passwordHash = null
        this.token = null
        this.role = null
        this.cart = null
        this.email = null
        this.recuperation = null
        this.dialog = false
        await this.getUsuarios();
      } catch (error) {
        return this.$toast.error('Moio');
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/users/destroy/${item.id}`)
        this.$toast.info('Usuário deletado com sucesso!')
        await this.getUsuarios()
      } catch (error) {
        return this.$toast.error('Moio')
      }
    },
      
    async getUsuarios() {
      try {
        const response = await this.$api.get('/users');
        this.items = response.data;
      } catch (error) {
        return this.$toast.error('moia');
      }
    },


  }
}
</script>

<style></style>
