<template>
  <v-container class="d-flex align-center" style="height: 100vh;">
    <v-row class="justify-center">
      <v-col cols="8">
        <form
        style="background-color: #52b788; border-radius: 50px; border: solid #fff;"
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
              color="#75DDDD"
              label="Nome de usuário"
              placeholder="Nome de usuário"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Senha"
                hint="Mínimo 8 caracteres"
                counter
                outlined
                rounded
                solo
                color="#75DDDD"
                @click:append="show1 = !show1"
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
              color="#75DDDD"
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
              prepend-inner-icon="mdi-key"
              color="#75DDDD"
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
              prepend-inner-icon="mdi-email"
              color="#75DDDD"
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
              color="#75DDDD"
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
              prepend-inner-icon="mdi-phone"
              color="#75DDDD"
              label="Telefone"
              placeholder="Telefone"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="text-center mb-5">
            <v-col>
              <v-btn
              class="mr-16 black--text"
              color="info"
              elevation="8"
              @click="cadastrar"
              >
                Cadastrar
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
              class="ml-16 black--text"
              color="info"
              elevation="8"
              to="/public/Loja"
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
  layout: 'login',

  data() {
    return {
      username: null,
      password: '',
      name: null,
      cpf: null,
      email: null,
      role: null,
      funcoes: ['Comprador', 'Entregador'],
      phone: null,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      },
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
        this.$router.push('/');
      } catch (error) {
        this.$toast.error('Algo deu errado :(')
      }
    }
  }
}
</script>

<style>

</style>
