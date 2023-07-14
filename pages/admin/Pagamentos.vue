<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container text-center>
    <h1 class="mb-10 accent--text">Cadastro de pagamentos</h1>
    <v-card class="primary">
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
        Informe o método de pagamento
      </h1>
        <v-card-title>
          <v-row justify="center">
            <v-col cols="1">
              <v-text-field
              v-model="id"
              outlined
              disabled
              background-color="accent"
              label="Id:"
              placeholder="Id:"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
              v-model="pagar"
              outlined
              solo-inverted
              color="black"
              background-color="accent"
              label="Pagamento:"
              placeholder="Pagamento:"
              :items="pagarCom"
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-btn
              class="mt-2 black--text" 
              color="info"
              elevation="8"
              @click="persist"
              >
              Cadastrar
              </v-btn>
            </v-col>
        </v-row>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "Pagamentos",

  data() {
    return {
      search: null,
      items: [],
      id: null,
      pagar: null,
      dialog: false,
      pagarCom: ['Dinheiro', 'Crédito', 'Débito', 'À vistá', 'À prazo', 'PIX'],
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Tipo de pagamento',
          value: 'name',
          align: 'center'
        },
        {text: '', value: 'actions', filterable: false}
      ],
    }
  },
  async created() {
    await this.getPagamentos();
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
      this.pagar = item.name
      this.dialog = true
    },
    
    async persist() {
      try {
        const request = {
          name: this.pagar
        }
        if (this.id) {
          await this.$api.patch(`/payments/persist/${this.id}`, request);
          this.$toast.info('Pagamento editado com sucesso!')
        } else {
          await this.$api.post(`/payments/persist`, request);
          this.$toast.info('Pagamento registrado com sucesso!')
        }
        this.id = null
        this.pagar = null
        this.dialog = false
        await this.getPagamentos();
      } catch (error) {
        return this.$toast.error('Moio');
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/payments/destroy/${item.id}`)
        this.$toast.info('Pagamento deletado com sucesso!')
        await this.getPagamentos()
      } catch (error) {
        return this.$toast.error('Moio')
      }
    },
      
    async getPagamentos() {
      try {
        const response = await this.$api.get('/payments');
        this.items = response.data;
      } catch (error) {
        return this.$toast.error('moia');
      }
    },


  }
}
</script>

<style></style>
