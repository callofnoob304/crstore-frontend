<template>
  <v-app 
    style="background-color: #FDF9FA">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      color="#FDF9FA"
      app
    >
    <v-list>
      <v-list-item>
        <v-container 
          v-if="logado"
        >
          <v-row>
            <v-col cols="4">
              <v-list-item-avatar>
                <v-avatar>
                  <v-icon
                  color="#75DDDD"
                  >
                    mdi-account
                  </v-icon>
                </v-avatar>
              </v-list-item-avatar>
            </v-col>
            <v-col>
              <v-list-item-content>
                <v-list-item-title
                class="black--text"
                >
                  {{ user.name }}
                </v-list-item-title>
                <v-list-item-subtitle
                class="black--text"
                >
                  {{ user.email }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else>
          <v-list-item-avatar>
            <v-avatar>
              <v-icon
              color="#75DDDD"
              >
                mdi-account
              </v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-action>
            <v-btn
            to="/"
            class="black--text"
            color="#75DDDD"
            >Entrar</v-btn>
          </v-list-item-action>
        </v-container>
      </v-list-item>

        <v-divider class="info"></v-divider>

        <v-container v-if="logado">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            color="#75DDDD"
            @click="item.action"
          >
            <v-list-item-action>
              <v-icon color="#75DDDD">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="black--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-container>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon
      @click.stop="drawer = !drawer, opaco()" />
    </v-app-bar>
    <div id="back"></div>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      logado: false,
      user: {
        name: null,
        email: null,
      },
      items: [
        {
          icon: 'mdi-store',
          title: 'Loja CRS',
          to: '/public/Loja',
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          action: this.sairConta,
        },
        {
          icon: 'mdi-shield-key',
          title: 'ADMIN LOJA-CRS',
          to: '/admin/',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  
  async created() {
    this.getUsuario();
    await this.getByToken();
  },
  
  methods: {
    getUsuario() {
      const token = localStorage.getItem('crstore-api-token');
      if(token) {
        this.logado = true;
      }
    },
    
    async getByToken() {
      const response = await this.$api.get('/users/get-token');
      if(response) {
        this.user = {
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        }
        if(this.user.role !== 'Administrador') {
          this.items.pop();
        }
      }
    },

    sairConta() {
      this.logado = false;
      localStorage.removeItem('crstore-api-token');
      this.$router.push('/');
    },

    opaco() {
      const back = document.getElementById('back');
      if(this.drawer) {
        back.style.display = 'block';
      } else {
        back.style.display = 'none';
      }
    },
  },

}
</script>

<style>
  #back {
    display: none;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
  }

  .v-btn{
    cursor: pointer;
  }
  
  .v-btn:hover{
    transform: scale(1.3);
    transition: all 1s;
  }
</style>