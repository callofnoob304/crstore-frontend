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
              <v-autocomplete
              v-model="status"
              outlined
              color="accent"
              label="Status"
              placeholder="Status"
              :items="pedido"
              ></v-autocomplete>
              <v-text-field
              v-model="total"
              outlined
              color="accent"
              label="Total"
              placeholder="Total"
              ></v-text-field>
              <v-autocomplete
              v-model="totalDiscount"
              outlined
              color="accent"
              label="Total de desconto"
              placeholder="Total de desconto"
              :items="descontos"
              ></v-autocomplete>
              <v-autocomplete
              v-model="idUserCostumer"
              outlined
              color="accent"
              label="Comprador"
              placeholder="Comprador"
              item-text="name"
              item-value="id"
              :items="usuarios.filter(user => user.role === 'Comprador')"
              ></v-autocomplete>
              <v-autocomplete
              v-model="idUserDeliver"
              outlined
              color="accent"
              label="Entregador"
              placeholder="Entregador"
              item-text="name"
              item-value="id"
              :items="usuarios.filter(user => user.role === 'Entregador')"
              ></v-autocomplete>
              <v-text-field
              v-model="idAdresses"
              outlined
              color="accent"
              label="Endereço"
              placeholder="Endereço"
              ></v-text-field>
              <v-text-field
              v-model="idPayment"
              outlined
              color="accent"
              label="Pagamento"
              placeholder="Pagamento"
              ></v-text-field>
              <v-text-field
              v-model="idCupoms"
              outlined
              color="accent"
              label="Cupom"
              placeholder="Cupom"
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
  name: "Pedidos",

  data() {
    return {
      search: null,
      items: [],
      descontos: ['10%', '20%', '30%', '40%', '50%', '60%', '70%'],
      pedido: ['Cancelado', 'Aguardando retirada', 'A caminho', 'Finalizado'],
      usuarios: [],
      id: null,
      status: null,
      total: null,
      totalDiscount: null,
      idUserCostumer: null,
      idUserDeliver: null,
      idAdresses: null,
      idPayment: null,
      idCupoms: null,
      dialog: false,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Status',
          value: 'status',
          align: 'center'
        },
        {
          text: 'Total',
          value: 'total',
          align: 'center'
        },
        {
          text: 'Total de desconto',
          value: 'totalDiscount',
          align: 'center'
        },
        {
          text: 'Comprador',
          value: 'idUserCostumer',
          align: 'center'
        },
        {
          text: 'Endereço',
          value: 'idAdresses',
          align: 'center'
        },
        {
          text: 'Payment',
          value: 'idPayment',
          align: 'center'
        },
        {
          text: 'Cupom',
          value: 'idCupoms',
          align: 'center'
        },
        {text: '', value: 'actions', filterable: false}
      ],
    }
  },
  async created() {
    await this.getProduto();
    await this.getUsers();
    await this.getAdress();
    await this.getPayment();
    await this.getCupoms();
  },

  methods: {

    update(item) {
      this.id = item.id
      this.status = item.status
      this.total = item.total
      this.totalDiscount = item.totalDiscount
      this.idUserCostumer = item.idUserCostumer
      this.idUserDeliver = item.idUserDeliver
      this.idAdresses = item.idAdresses
      this.idPayment = item.idPayment
      this.idCupoms = item.idCupoms
      this.dialog = true
    },
    
    async persist() {
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

    async destroy(item) {
      try {
        await this.$api.delete(`/orders/destroy/${item.id}`)
        this.$toast.info('Pedido deletado com sucesso!')
        await this.getProduto()
      } catch (error) {
        return this.$toast.error('Moio delete')
      }
    },
      
    async getProduto() {
      try {
        const response = await this.$api.get('/orders');
        this.items = response.data;
      } catch (error) {
        return this.$toast.error('Moio get');
      }
    },

    async getUsers() {
      try {
        const response = await this.$api.get('/users');
        this.usuarios = response.data;
      } catch (error) {
        return this.$toast.error('Moio get');
      }
    },

    async getAdress() {
      try {
        const response = await this.$api.get('/adresses');
        this.adress = response.data;
      } catch (error) {
        return this.$toast.error('Moio get');
      }
    },
    async getPayment() {
      try {
        const response = await this.$api.get('/payments');
        this.payment = response.data;
      } catch (error) {
        return this.$toast.error('Moio get');
      }
    },
    async getCupoms() {
      try {
        const response = await this.$api.get('/cupons');
        this.cupoms = response.data;
      } catch (error) {
        return this.$toast.error('Moio get');
      }
    },
  }
}
</script>

<style></style>
