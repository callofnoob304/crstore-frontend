<template>
  <v-card
  width="350"
  rounded="xl"
  color="accent"
  >
    <v-img
      height="200"
      :src="imagem"
      >
    </v-img>
    <v-card-title 
    style="height: 100px;">{{ name }}</v-card-title>
    <v-card-text 
    style="height: 100px;" 
    class="primary--text"
    >
      <h3><p>{{ descricao }}</p></h3>
      <h3><p>R$: {{ preco }}</p></h3>
    </v-card-text>
      <v-card-actions  
      class="justify-space-around" 
      style="height: 100px;">
      <v-btn 
      style="border: hidden; border-radius: 10px 0 10px 0;"
      class="primary--text"
      color="accent"
      elevation="8"
      @click="buy"
      ><h4> Comprar </h4></v-btn>
      <v-btn 
      style="border: hidden; border-radius: 10px 0 10px 0;"
      class="primary--text"
      color="accent"
      elevation="8"
      @click="view"
      ><h4> Visualizar </h4></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CarComponent',

  props: {
    imagem: {
      type: String,
      required: true
    },

    preco:{
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    descricao: {
      type: String,
      required: true
    },
  },

  methods: {

    view() {
      this.$emit('visualiza', this.imagem);
    },

    buy() {
      this.$emit('comprar', this.imagem);
    }
  }
}
</script>