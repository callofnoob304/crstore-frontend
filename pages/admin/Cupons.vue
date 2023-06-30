<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container text-center>
    <h1 class="mb-10">Cadastro de cupons</h1>
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
              v-model="code"
              outlined
              color="accent"
              label="Código"
              placeholder="Código"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
              v-model="type"
              :items="tipo"
              outlined
              color="accent"
              label="Tipo"
              placeholder="Tipo"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-text-field
              v-model="value"
              outlined
              color="accent"
              label="Valor"
              placeholder="Valor"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
              v-model="uses"
              outlined
              multiple
              color="accent"
              label="Vezes usado"
              placeholder="Vezes usado"
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
      tipo: ['Porcentagem', 'Reais'],
      id: null,
      code: null,
      type: null,
      value: null,
      uses: null,
      dialog: false,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Código',
          value: 'code',
          align: 'center'
        },
        {
          text: 'Tipo',
          value: 'type',
          align: 'center'
        },
        {
          text: 'Valor',
          value: 'value',
          align: 'center'
        },
        {
          text: 'Vezes usado',
          value: 'uses',
          align: 'center'
        },
        {text: '', value: 'actions', filterable: false}
      ],
    }
  },
  async created() {
    await this.getCupoms();
  },

  methods: {

    update(item) {
      this.id = item.id
      this.code = item.code
      this.type = item.type
      this.value = item.value
      this.uses = item.uses
      this.dialog = true
    },
    
    async persist() {
      try {
        const request = {
          code: this.code,
          type: this.type,
          value: this.value,
          uses: this.uses
        }
        if (this.id) {
          await this.$api.patch(`/cupons/persist/${this.id}`, request);
          this.$toast.info('Cupom editado com sucesso!')
        } else {
          await this.$api.post(`/cupons/persist`, request);
          this.$toast.info('Cupom registrado com sucesso!')
        }
        this.id = null
        this.code = null
        this.type = null
        this.value = null
        this.uses = null
        this.dialog = false
        await this.getCupoms();
      } catch (error) {
        return this.$toast.error('Moio persist');
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/cupons/destroy/${item.id}`)
        this.$toast.info('Cupom deletado com sucesso!')
        await this.getCupoms()
      } catch (error) {
        return this.$toast.error('Moio delete')
      }
    },
      
    async getCupoms() {
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
