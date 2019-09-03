<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238">Deberes y Atribuciones</h2>
        </v-flex>
        <v-flex xs12 sm12 md6 lg8 xl8>
          <h3 class=".subheading font-weight-light">
            <div v-html="deberesAtribuciones.content.rendered"></div>
          </h3>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    components:{
    },
    data () {
      return {
      }
    },
    created:function(){
      store.dispatch('COLEGIO_retrieveDeberesAtribuciones');
    },
    computed:{
      deberesAtribuciones(){
        return store.state.colegio.deberes_atribuciones;
      }
    },
    watch:{
      deberesAtribuciones(){}
    },
    methods:{
    }
}
</script>

<style>

</style>
