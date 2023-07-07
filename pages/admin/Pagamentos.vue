<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container text-center>
    <h1 class="mb-10">Cadastro de pagamentos</h1>
    <v-card>
      <v-card-title>
        <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          hide-details
          solo
          outlined
        ></v-text-field>
        </v-col>
        <v-col cols="1">
        <v-btn
          elevation="15"
          fab
          small
          color="secondary" 
          @click="dialog = true">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
        </v-col>
      </v-card-title>
      <v-data-table 
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
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="1">
              <v-text-field
              v-model="id"
              outlined
              disabled
              label="Id:"
              placeholder="Id:"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
              v-model="pagar"
              outlined
              color="accent"
              label="Pagamento:"
              placeholder="Pagamento:"
              :items="pagarCom"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
      <v-btn 
        color="warning"
        @click="persist"
      >
        Cadastrar
      </v-btn>
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
  },

  methods: {

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
