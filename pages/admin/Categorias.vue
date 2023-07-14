<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container text-center>
    <h1 class="mb-10 accent--text">Cadastro de categorias</h1>
    <v-card
    class="primary"
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
      style="overflow: hidden;"
      >
      <h1
      class="accent--text ml-5"
      >
        Informações da categoria
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
              <v-text-field
              v-model="nome"
              outlined
              solo-inverted
              color="black"
              background-color="accent"
              label="Nome da categoria"
              placeholder="Nome da categoria"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn
              class="black--text mt-2"
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
  name: "Categorias",

  data() {
    return {
      search: null,
      items: [],
      id: null,
      nome: null,
      dialog: false,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Categorias',
          value: 'name',
          align: 'center'
        },
        {text: '', value: 'actions', filterable: false}
      ],
    }
  },
  async created() {
    await this.getCategorias();
    await this.valida();
  },

  methods: {

    update(item) {
      this.id = item.id
      this.nome = item.name
      this.dialog = true
    },
    
    async persist() {
      try {
        const request = {
          name: this.nome
        }
        if (this.id) {
          await this.$api.patch(`/categorias/persist/${this.id}`, request);
          this.$toast.info('Categoria editada com sucesso!')
        } else {
          await this.$api.post(`/categorias/persist`, request);
          this.$toast.info('Categoria registrada com sucesso!')
        }
        this.id = null
        this.nome = null
        this.dialog = false
        await this.getCategorias();
      } catch (error) {
        return this.$toast.error('Moio');
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/categorias/destroy/${item.id}`)
        this.$toast.info('Categoria deletada com sucesso!')
        await this.getCategorias()
      } catch (error) {
        return this.$toast.error('Moio')
      }
    },
      
    async getCategorias() {
      try {
        const response = await this.$api.get('/categorias');
        this.items = response.data;
      } catch (error) {
        return this.$toast.error('moia');
      }
    },

    async valida() {
      const { role } = await this.$api.get('/users/validate');
      if(role && !(role === 'Administrador')) {
        this.$router.push('/');
      }
    },


  }
}
</script>

<style></style>
