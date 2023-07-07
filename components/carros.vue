<template>
  <v-card width="350">
    <v-img
      height="200"
      :src="imagem"
      >
    </v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text class="text--primary">
      <p>{{ descricao }}</p>
      <p>{{ preco }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn 
      color="warning" 
      text
      outlined
      @click="buy"
      > Comprar </v-btn>
      <v-btn 
      color="warning" 
      text
      outlined
      @click="view"
      > Visualizar </v-btn>
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