<template>
  <v-container>
    <header class="text-center mb-10">
      <h2>BEM VINDO A LOJA DO CRS! <v-icon>mdi-emoticon-happy</v-icon></h2>
      <h4>COMPRE PRODUTOS DE QUALIDADE AQUI!!!</h4>
    </header>
    <v-row class="justify-space-between mt-16">
      <carros
        imagem="https://images.drive.com.au/driveau/image/upload/t_wp-default/v1/cms/uploads/ipbwdw9jxtiewinmhsdr"
        preco="R$: 1.500.000"
        name="Skyline R34"
        descricao="Motor RB26 bi-turbo, cor roxo meia-noite, suspenção de corrida, 0-100KM em 3.0 segundos"
        @comprar="comecar"
        @visualiza="visualiza"
      ></carros>
      <carros
        imagem="https://www.wallpaperflare.com/static/321/499/800/toyota-supra-mk4-white-toyota-supra-wallpaper.jpg"
        preco="R$: 1.200.000"
        name="Supra MK4"
        descricao="Motor 2JZ bi-turbo, cor branca, suspensao esportiva, 0-100KM em 3.5 segundos "
        @comprar="comecar"
        @visualiza="visualiza"
      ></carros>
      <carros
        imagem="https://cdn.luxatic.com/wp-content/uploads/2017/03/Official-Koenigsegg-Agera-RS-Gryphon-1.jpg"
        preco="R$: 12.350.000"
        name="Koenigsegg Agera RS"
        descricao="Motor V12 bi-turbo, cor fibra de carbono + ouro 24k, 0-100KM em 1.5 segundos"
        @comprar="comecar"
        @visualiza="visualiza"
      ></carros>
    </v-row>

    <v-dialog v-model="view">
      <v-card>
        <v-container>
          <v-row>
            <v-img
              class="mb-5"
              :src="imgCarro"
              width="600"
              ></v-img>
            </v-row>
            <v-row
            class="justify-end mb-5"
            >
            <v-btn
            outlined
            color="secondary"
            @click="view = false"
            >Voltar</v-btn>
          </v-row>
          </v-container>
        </v-card>
    </v-dialog>

    <v-dialog v-model="comprarCarro">
      <v-card>
        <v-container>
          <v-card-title>Forma de pagamento</v-card-title>
            <v-row>
              <v-col>  
              <v-autocomplete
              v-model="pagar"
              outlined
              color="accent"
              label="Pagar com:"
              placeholder="Pagar com:"
              :items="pagarCom"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="justify-space-between mb-3">
            <v-btn
            outlined
            color="warning"
            class="ml-3"
            @click="close"
            >Fechar</v-btn>
            <v-btn
            outlined
            color="secondary"
            class="ml-3"
            @click="persist"
            >Comprar</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      view: null,
      imgCarro: null,
      cliente: null,
      comprarCarro: null,
      pagarCom: ['Dinheiro', 'Crédito', 'Débito', 'À vistá', 'À prazo', 'PIX'],
      nome: null,
      cpf: null,
      telefone: null,
      email: null,
      estado: null,
      cidade: null,
      bairro: null,
      rua: null,
      numero: null,
      cep: null,
      pagar: null,
      dialog2: null,
    }
  },

  methods: {
    visualiza(imagem) {
      this.view = true;
      this.imgCarro = imagem;
    },

    comecar() {
      this.comprarCarro = true
    },

    close() {
      this.comprarCarro = false;
      this.dialog2 = false;
    },

    persist() {
      try {
        this.$toast.info('Compra realizada!!!')
      } catch (error) {
        
      }
    },

  }
}
</script>
