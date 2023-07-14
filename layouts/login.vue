<template>
  <v-app 
    style="
    background: rgb(255,255,255);
    background: linear-gradient(310deg, rgba(255,255,255,1) 20%, rgba(146,20,12,1) 80%); "
  >
    <v-main>
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout'
}
</script>

<style>
  .v-btn{
    cursor: pointer;
  }
  
  .v-btn:hover{
    transform: scale(1.3);
    transition: all 1s;
  }
</style>