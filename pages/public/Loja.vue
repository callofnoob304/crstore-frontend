<template>
  <v-container>
    <header class="text-center mb-10">
      <h2 class="accent--text">BEM VINDO A LOJA DO CRS! <v-icon color="accent" class="mb-1">mdi-emoticon-happy</v-icon></h2>
      <h4 class="accent--text">COMPRE PRODUTOS DE QUALIDADE AQUI!!!</h4>
    </header>
    <v-row class="mt-10">
      <v-col
        v-for="item in carros"
        :key="item.id"
      >
        <carros
          style="box-shadow: -2px -10px 20px #75DDDD, 2px 10px 20px #75DDDD;"
          :imagem="item.image"
          :preco="item.price"
          :name="item.name"
          :descricao="item.description"
          @comprar="comecar"
          @visualiza="visualiza"
        ></carros>
      </v-col>
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
            color="primary"
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
            color="75DDDD"
            class="ml-3"
            @click="close"
            >Fechar</v-btn>
            <v-btn
            outlined
            color="info"
            class="mr-3"
            @click="persistPayments"
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
      carros: [],
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
      logado: false,
      dialog2: null,
    }
  },

  async created() {
    await this.getProdutos();
  },

  methods: {

    async getProdutos() {
      try {
        const response = await this.$api.get('/produtos');
        this.carros = response.data;
      } catch (error) {
        return this.$toast.error('Não deu');
      }
    },

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
        this.$toast.error('Faltou dinheiro, compro nao realizada seu pbre vai trabalhar krl')
      }
    },

    async persistOrders() {
      try {
        const request = {
          id: this.id,
          status: this.status,
          total: this.total,
          totalDiscount: this.totalDiscount,
          idUserCostumer: this.idUserCostumer,
          idUserDeliver: this.idUserDeliver,
          idAdresses: this.idAdresses,
          idPayment: this.idPayment,
          idCupoms: this.idCupoms,
        }
        if (this.id) {
          await this.$api.patch(`/orders/persist/${this.id}`, request);
          this.$toast.info('Pedido editado com sucesso!')
        } else {
          await this.$api.post(`/orders/persist`, request);
          this.$toast.info('Pedido registrado com sucesso!')
        }
        this.id = null
        this.status = null
        this.total = null
        this.totalDiscount = null
        this.idUserCostumer = null
        this.idUserDeliver = null
        this.idAdresses = null
        this.idPayment = null
        this.idCupoms = null
        this.dialog = false
        await this.getProduto();
      } catch (error) {
        return this.$toast.error('Moio persist');
      }
    },
  }
}
</script>
