<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238"></h2>
        </v-flex>
        <v-flex xs12 sm12 md6 lg8 xl8>
          <h3 class=".subheading font-weight-light">
            <!-- <div v-html="misionVision.content.rendered"></div> -->
          </h3>
          <v-card color="basil">
            <v-card-title class="text-center justify-center py-6">
              <h2 class="font-weight-bold display-2 basil--text">ACTAS</h2>
            </v-card-title>

            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
            >
              <v-tab
                v-for="tab_item in items"
                :key="tab_item"
              >
                {{ tab_item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="acta in actas"
                :key="acta.id"
              >
                <v-card flat color="basil">
                  <v-card-text>
                        <div v-html="acta.content.rendered"></div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
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
        tab: null,
        items: [
          'Actas Asambleas Ordinarias', 'Actas del Consejo Superior'
        ],
      }
    },
    created:function(){
      store.dispatch('COLEGIO_retrieveActas');
    },
    computed:{
      actas(){
        return store.state.colegio.actas;
      }
    },
    watch:{
      actas(){}
    },
    methods:{
    }
}
</script>

<style>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #263238 !important;
}
.acta {
  text-decoration: none;
}
.acta:hover{
  text-decoration:underline;
}

a{
  text-decoration: none;
}
</style>
