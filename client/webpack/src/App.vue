<template>
  <v-app>
      
      <header-component></header-component>
      
      <v-dialog v-model="spinner" persistent content content-class="centered-dialog">
        <v-container fill-height>
          <v-layout column justify-center align-center>
            <v-progress-circular
              :size="50"
              :width="7"
              color="primary"
              indeterminate
              v-if="spinner"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>

      <!-- CONTENIDO DE NAVEGACION !-->
      <v-slide-y-transition mode="out-in">
        <v-content>
          <router-view/>
        </v-content>
      </v-slide-y-transition>
      <!-- FIN CONTENIDO DE NAVEGACION !-->
    <footer-component></footer-component>
  </v-app>
  
</template>

<script>
  
  import footerComponent from './components/index/footer'
  import headerComponent from './components/index/header'


  export default {
    components :{footerComponent, headerComponent},
    data () {
      return {
        group:null,
        toolbar_disabled:true,
        maintenanceMode: false,
        spinner:false
      }
    },
    
    
    methods: {
      
    },
    name: 'App'
  }
</script>
<style scoped>
  .tile {
    margin: 5px;
    border-radius: 4px;
  }
  .tile:hover {
    background: #1976D2;
  }
  .tile:active {
    background: #FF9800;
  }
</style>
