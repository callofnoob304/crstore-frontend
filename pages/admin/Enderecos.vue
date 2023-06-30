<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container text-center>
    <h1 class="mb-10">Cadastro de endereços</h1>
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
            <v-col cols="2">
              <v-text-field
              v-model="zipCode"
              outlined
              color="accent"
              label="Código"
              placeholder="Código"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
              v-model="state"
              outlined
              color="accent"
              label="Estado"
              placeholder="Estado"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
              v-model="city"
              outlined
              color="accent"
              label="Cidade"
              placeholder="Cidade"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
              v-model="street"
              outlined
              color="accent"
              label="Rua"
              placeholder="Rua"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
              v-model="district"
              outlined
              color="accent"
              label="Distrito"
              placeholder="Distrito"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
              v-model="numberForget"
              outlined
              color="accent"
              label="Número"
              placeholder="Número"
              ></v-text-field>
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
  name: "Cupons",

  data() {
    return {
      search: null,
      items: [],
      id: null,
      zipCode: null,
      state: null,
      city: null,
      street: null,
      district: null,
      numberForget: null,
      dialog: false,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Código',
          value: 'zipCode',
          align: 'center'
        },
        {
          text: 'Estado',
          value: 'state',
          align: 'center'
        },
        {
          text: 'Cidade',
          value: 'city',
          align: 'center'
        },
        {
          text: 'Rua',
          value: 'street',
          align: 'center'
        },
        {
          text: 'Distrito',
          value: 'district',
          align: 'center'
        },
        {
          text: 'Número',
          value: 'numberForget',
          align: 'center'
        },
        {text: '', value: 'actions', filterable: false}
      ],
    }
  },
  async created() {
    await this.getEnderecos();
  },

  methods: {

    update(item) {
      this.id = item.id
      this.zipCode = item.zipCode
      this.state = item.state
      this.city = item.city
      this.street = item.street
      this.district = item.district
      this.numberForget = item.numberForget
      this.dialog = true
    },
    
    async persist() {
      try {
        const request = {
          id: this.id,
          zipCode: this.zipCode,
          state: this.state,
          city: this.city,
          street: this.street,
          district: this.district,
          numberForget: this.numberForget,
        }
        if (this.id) {
          await this.$api.patch(`/cupons/persist/${this.id}`, request);
          this.$toast.info('Cupom editado com sucesso!')
        } else {
          await this.$api.post(`/cupons/persist`, request);
          this.$toast.info('Cupom registrado com sucesso!')
        }
        this.id = null 
        this.zipCode = null 
        this.state = null
        this.city = null
        this.street = null
        this.district = null
        this.numberForget = null
        this.dialog = false
        await this.getEnderecos();
      } catch (error) {
        return this.$toast.error('Moio persist');
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/cupons/destroy/${item.id}`)
        this.$toast.info('Cupom deletado com sucesso!')
        await this.getEnderecos()
      } catch (error) {
        return this.$toast.error('Moio delete')
      }
    },
      
    async getEnderecos() {
      try {
        const response = await this.$api.get('/cupons');
        this.items = response.data;
      } catch (error) {
        return this.$toast.error('Moio get');
      }
    },
  }
}
</script>

<style></style>
