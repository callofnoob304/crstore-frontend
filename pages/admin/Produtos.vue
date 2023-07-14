 <!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container text-center>
    <h1 class="mb-10 accent--text">Cadastro de produtos</h1>
    <v-card 
    color="primary"
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
      style="overflow: hidden;">
      <h1
      class="accent--text ml-5"
      >
        Informações do produto
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
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
          <v-row justify="center">
            <v-col cols="5">
              <v-text-field
              v-model="name"
              outlined
              solo-inverted
              color="black"
              background-color="accent"
              label="Nome do produto"
              ></v-text-field>
              <v-text-field
              v-model="price"
              outlined
              solo-inverted
              color="black"
              background-color="accent"
              label="Valor"
              ></v-text-field>
              <v-text-field
              v-model="image"
              outlined
              solo-inverted
              color="black"
              background-color="accent"
              label="Imagem"
              ></v-text-field>
              <v-text-field
              v-model="description"
              outlined
              solo-inverted
              color="black"
              background-color="accent"
              label="Descrição"
              ></v-text-field>
              <v-autocomplete
              v-model="idCategoria"
              color="black"
              outlined
              solo-inverted
              background-color="accent"
              label="Categoria"
              item-text="name"
              item-value="id"
              :items="categories"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="1">
              <v-btn
              class="mb-5 black--text"
              color="info"
              elevation="8"
              @click="persist"
              >
              Cadastrar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
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
          this.$toast.info('Produto editado com sucesso!');
        } else {
          await this.$api.post(`/produtos/persist`, request);
          this.$toast.info('Produto registrado com sucesso!');
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
        this.$toast.info('Produto deletado com sucesso!')
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

<style>
.v-btn {
  cursor: pointer;
}

.v-btn:hover {
  transform: scale(1.1);
  transition: all 1s;
}
</style>
