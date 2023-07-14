<template>
  <v-card
  class="mx-auto mb-5"
  width="500"
  shaped
  color="accent"
  >
  <v-list-item

  >
    <v-col>
      <v-list-item-content
    class="text-center"
    >
      <v-list-item-title class="text-h5 black--text">
        {{ nome }}
          <v-icon
            color="primary"
            size="60"
            >{{ icon }}</v-icon>
      </v-list-item-title>
        <v-list-item-subtitle
          class="black--text text-h6"
          > Alterar e Cadastrar
        </v-list-item-subtitle>
      </v-list-item-content>
      
      <v-card-actions
      class="justify-center"
      >
        <v-btn
          id="btn-admin"
          class="black--text"
          color="info"
          :to="link"
          elevation="8"
          rounded
        >
          Acessar
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-list-item>
</v-card>
</template>

<script>
export default {
  name: "CardComponent",

  props: {
    nome: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: true
    },

    link: {
      type: String,
      required: true
    }
    }
  }
</script>

<style>
  #btn-admin{
    cursor: pointer;
  }

  #btn-admin:hover {
    transform: scale(1.3);
    transition: all 1s;
  }
</style>