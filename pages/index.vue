<template>
  <v-container>
    <v-row class="justify-center mt-12">
      <v-col cols="8">
        <form
        style="background-color: #f15025; border-radius: 50px; border: solid #fff;"
        >
          <v-row class="text-center">
            <v-col>
              <h1 style="color: #fff;">Faça seu cadastro</h1>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="5">
              <v-text-field 
              v-model="username"
              outlined
              rounded
              solo
              clearable
              prepend-inner-icon="mdi-account"
              color="#f15025"
              label="Nome de usuário"
              placeholder="Nome de usuário"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
              v-model="password"
              outlined
              rounded
              solo
              clearable
              prepend-inner-icon="mdi-account"
              color="#f15025"
              label="Senha"
              placeholder="Senha"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="5">
              <v-text-field
              v-model="name"
              outlined
              rounded
              solo
              clearable
              prepend-inner-icon="mdi-account"
              color="#f15025"
              label="Seu nome"
              placeholder="Seu nome"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
              v-model="cpf"
              v-mask="'###.###.###-##'"
              outlined
              rounded
              solo
              clearable
              prepend-inner-icon="mdi-account"
              color="#f15025"
              label="CPF"
              placeholder="CPF"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="5">
              <v-text-field
              v-model="email"
              outlined
              rounded
              solo
              clearable
              prepend-inner-icon="mdi-account"
              color="#f15025"
              label="E-mail"
              placeholder="E-mail"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-autocomplete
              v-model="role"
              outlined
              rounded
              solo
              clearable
              prepend-inner-icon="mdi-account"
              color="#f15025"
              label="Função"
              placeholder="Função"
              :items="funcoes"  
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="5">
              <v-text-field
              v-model="phone"
              v-mask="'(##) # ####-####'"
              outlined
              rounded
              solo
              clearable
              prepend-inner-icon="mdi-account"
              color="#f15025"
              label="Telefone"
              placeholder="Telefone"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="text-center mb-5">
            <v-col>
              <v-btn
              class="mr-16"
              @click="cadastrar"
              >
                Cadastrar
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
              class="ml-16"
              to="/admin/Login"
              >
                Fazer login
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      username: null,
      password: null,
      name: null,
      cpf: null,
      email: null,
      role: null,
      funcoes: ['Comprador', 'Entregador', 'Administrador'],
      phone: null,
    }
  },

  methods: {
    async cadastrar() {
      try {
        const request = {
          username: this.username,
          password: this.password,
          name: this.name,
          cpf: this.cpf,
          email: this.email,
          role: this.role,
          phone: this.phone,
          cart: {},
          recuperation: ''
        }
        await this.$api.post('/users/persist', request);
        this.$toast.info('Você foi cadastrado, agora acesse sua conta!');
        this.$router.push({ name: 'admin-Login' });
      } catch (error) {
        this.$toast.error('Algo deu errado :(')
      }
    }
  }
}
</script>

<style>

</style>