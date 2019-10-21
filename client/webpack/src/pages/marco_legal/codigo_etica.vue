<template>
    <v-container class="ml-0 mr-0" fluid>
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
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238">Código de Ética</h2>
        </v-flex>
        
        <v-flex xs12 sm12 md6 lg8 xl8>
          <h3 class=".subheading font-weight-light">
            <div v-html="codigoEtica.content.rendered"></div>
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
        spinner:true
      }
    },
    created:function(){
      store.dispatch('MARCOLEGAL_retrieveCodigoEtica');
    },
    computed:{
      codigoEtica(){
        console.log("Código de Ética: ",store.state.marco_legal.codigo_etica);
        return store.state.marco_legal.codigo_etica;
      }
    },
    watch:{
      codigoEtica(val){
        if(val.content.rendered !== ""){
          this.spinner = false;
        }
      }
    },
    methods:{
    }
}
</script>

<style>
  .dialog.centered-dialog,
  .v-dialog.centered-dialog
  {
    /* background: #282c2dad; */
    box-shadow: none;
    border-radius: 6px;
    width: auto;
    color: whitesmoke;
  }
</style>
