<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238">{{beneficioSelected.title.rendered}}</h2>
          <h3 class="font-weight-black" style="color:#263238">Beneficio disponible todos los días</h3>
        </v-flex>
        <v-flex xs12 sm12 md6 lg8 xl8 text-center>
          <h3 class=".subheading font-weight-light" text-center>
            <div v-html="beneficioSelected.content.rendered"></div>
          </h3>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import router from '../router';

export default {
    components:{
    },
    data () {
      return {
      }
    },
    created:function(){
      this.verifyData();
    },
    computed:{
      beneficioSelected(){
        console.log("Beneficio Detalle: ",store.state.beneficios.selected);
        return store.state.beneficios.selected;
      }
    },
    watch:{
      beneficiosSelected(){}
    },
    methods:{
      verifyData:function(){
        if(store.state.beneficios.selected.title.rendered == ""){
          router.push("/");
        }
      }
    }
}
</script>

<style>

</style>
