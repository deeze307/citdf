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
          <!-- <h2 class="display-1 font-weight-black" style="color:#263238">Requisitos para Baja o Suspensión de Matrícula</h2> -->
          <h2 class="display-1 font-weight-black" style="color:#263238">Requisitos para Baja de Matrícula</h2>
        </v-flex>
        
        <v-flex xs12 sm12 md6 lg8 xl8>
          <h3 class=".subheading font-weight-light">
            <div v-html="bajaSuspension.content.rendered"></div>
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
      store.dispatch('MATRICULADOS_retrieveBajaSuspension');
    },
    computed:{
      bajaSuspension(){
        console.log("Baja o Suspension: ",store.state.matriculados.baja_suspension.info);
        return store.state.matriculados.baja_suspension.info;
      }
    },
    watch:{
      bajaSuspension(val){
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
