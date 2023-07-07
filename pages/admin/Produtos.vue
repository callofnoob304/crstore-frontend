 <!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container text-center>
    <h1 class="mb-10">Cadastro de pedidos</h1>
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
          <v-row justify="center">
            <v-col cols="5">
              <v-text-field
              v-model="id"
              outlined
              disabled
              label="Id:"
              placeholder="Id:"
              ></v-text-field>
              <v-text-field
              v-model="name"
              outlined
              color="accent"
              label="Nome do produto"
              placeholder="Nome do produto"
              ></v-text-field>
              <v-text-field
              v-model="price"
              outlined
              color="accent"
              label="Valor"
              placeholder="Valor"
              ></v-text-field>
              <v-text-field
              v-model="image"
              outlined
              color="accent"
              label="Imagem"
              placeholder="Imagem"
              ></v-text-field>
              <v-text-field
              v-model="description"
              outlined
              color="accent"
              label="Descrição"
              placeholder="Descrição"
              ></v-text-field>
              <v-autocomplete
              v-model="idCategoria"
              outlined
              color="accent"
              label="Categoria"
              placeholder="Categoria"
              item-text="name"
              item-value="id"
              :items="categories"
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
  name: "Produtos",

  data() {
    return {
      search: null,
      items: [],
      id: null,
      name: null,
      price: null,
      image: null,
      description: null,
      idCategoria: null,
      categories: [],
      dialog: false,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Nome do produto',
          value: 'name',
          align: 'center'
        },
        {
          text: 'Valor',
          value: 'price',
          align: 'center'
        },
        {
          text: 'Imagem',
          value: 'image',
          align: 'center'
        },
        {
          text: 'Descrição',
          value: 'description',
          align: 'center'
        },
        {text: '', value: 'actions', filterable: false}
      ],
    }
  },
  async created() {
    await this.getProdutos();
    await this.getCategorias();
  },

  methods: {

    update(item) {
      this.id = item.id
      this.name = item.name
      this.price = item.price
      this.image = item.image
      this.description = item.description
      this.idCategoria = item.name
      this.dialog = true
    },
    
    async persist() {
      try {
        const request = {
          id: this.id,
          name: this.name,
          price: this.price,
          image: this.image,
          description: this.description,
          idCategory: this.idCategoria,  
        }
        if (this.id) {
          await this.$api.patch(`/produtos/persist/${this.id}`, request);
          this.$toast.info('Pedidos editado com sucesso!')
        } else {
          await this.$api.post(`/produtos/persist`, request);
          this.$toast.info('Pedidos registrado com sucesso!')
        }
        this.id = null
        this.name = null
        this.price = null
        this.image = null
        this.description = null
        this.idCategoria = null
        this.dialog = false
        await this.getProdutos();
      } catch (error) {
        return this.$toast.error('Moio persist');
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/produtos/destroy/${item.id}`)
        this.$toast.info('Pedidos deletado com sucesso!')
        await this.getProdutos()
      } catch (error) {
        return this.$toast.error('Moio delete')
      }
    },
      
    async getProdutos() {
      try {
        const response = await this.$api.get('/produtos');
        this.items = response.data;
      } catch (error) {
        return this.$toast.error('Moio get');
      }
    },

    async getCategorias() {
      try {
        const response = await this.$api.get('/categorias');
        this.categories = response.data;
      } catch (error) {
        return this.$toast.error('Moio get');
      }
    },
  }
}
</script>

<style></style>
