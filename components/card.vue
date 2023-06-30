<template>
  <v-card
    class="mx-auto mb-5"
    width="500"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ nome }}
        </v-list-item-title>
        <v-list-item-subtitle> Alterar / Cadastrar</v-list-item-subtitle>
      </v-list-item-content>

      <v-icon
        size="80"
      >{{ icon }}</v-icon>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        :to="link"
      >
        Acessar
      </v-btn>
    </v-card-actions>
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

</style>