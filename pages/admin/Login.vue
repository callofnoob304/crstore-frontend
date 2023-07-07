<template>
  <v-container>
    <v-row class="justify-center mt-12">
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
              append-icon="mdi-account"
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
              outlined
              rounded
              solo
              clearable
              append-icon="mdi-account"
              label="Senha"
              placeholder="Senha"
              :rules="[rules.valido]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="text-center mb-5">
            <v-col>
              <v-btn
              :disabled="!email || !password"
              @click="enter"
              >Entrar</v-btn>
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

  data() {
    return {
      email: null,
      password: null,

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
          return this.$router.push({ name: 'admin-Loja'});
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