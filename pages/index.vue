<template>
  <v-container class="d-flex align-center" style="height: 100vh;">
    <v-row class="justify-center">
      <v-col cols="6">
        <form
        style="background-color: #17bebb; border-radius: 50px; border: solid #fff;"
        >
          <v-row class="text-center">
            <v-col>
              <h1 style="color: #fff;">Acesse sua conta</h1>
            </v-col>
          </v-row>
          <v-row justify="center ml-5 mr-5">
            <v-col>
              <v-text-field
              v-model="email"
              outlined
              rounded
              solo
              clearable
              append-icon="mdi-email"
              label="E-mail"
              placeholder="E-mail"
              :rules="[rules.valido]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center ml-5 mr-5">
            <v-col>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.valido]"
                :type="show1 ? 'text' : 'password'"
                label="Senha"
                counter
                outlined
                rounded
                solo
                color="#75DDDD"
                @click:append="show1 = !show1"
              ></v-text-field>
              <!-- <v-text-field
              v-model="password"
              outlined
              rounded
              solo
              clearable
              append-icon="mdi-account"
              label="Senha"
              placeholder="Senha"
              ></v-text-field> -->
            </v-col>
          </v-row>
          <v-row class="text-center mb-5">
            <v-col>
              <v-btn
              :disabled="!email || !password"
              @click="enter"
              >Entrar</v-btn>
            </v-col>
            <v-col>
              <v-btn
              @click="$router.push('/public/cadastro')"
              >Fazer Cadastro</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  layout: 'login',

  data() {
    return {
      email: null,
      password: '',
      show1: false,
      show2: true,
      show3: false,
      show4: false,

      rules: {
        valido: input => !!input || 'Campo obrigatório'
      },
    }
  },

  methods: {
    async enter() {
      try {
        const request = {
          email: this.email,
          password: this.password
        }
        const response = await this.$api.get(`/users/login?email=${request.email}&password=${request.password}`);
        if (response.type === 'success') {
          localStorage.setItem('crstore-api-token', response.token)
          return this.$router.push('/public/Loja');
        }
      } catch (error) {
        this.$toast.error('Login inválido');
      }
    },
  }
}
</script>

<style>

</style>