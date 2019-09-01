<template>
  <div>
    <v-container class="ml-0 mr-0" fluid>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h1 class="display-2 font-weight-black" style="color:#263238">BOLSA DE TRABAJO</h1>
        
      </v-flex>
      <v-layout align-center justify-space-around row fill-height>
          
        <v-flex xs12 sm12 md3 lg3 xl3 class="ma-3" v-for="(bolsa, i) in bolsaTrabajo" :key="i">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 5" height=350 class="flexcard">
              <v-card-title class="mb-2 pb-0">
                <h3 style="color:#0277BD;" class=".subheading font-weight-light">{{bolsa.title.rendered}}</h3>
              </v-card-title>
              <v-card-text class="mb-0 pt-1 pb-1 grow">
                <span style="color:#0277BD;" class="caption right">{{bolsa.date | fechaSinHora}}</span>
                <div class="job_desc pt-4" v-html="bolsa.content.rendered.substring(0,220) + ' [...]'"></div>
              </v-card-text>  
              <v-card-actions id="create" class="pa-3">
                <v-spacer></v-spacer>
                <social-sharing url="http://citdf.org"
                      title="Colegio de Ingenieros de Tierra del Fuego"
                      :description=bolsa.excerpt.rendered
                      :quote=bolsa.excerpt.rendered
                      hashtags="CITDF"
                      twitter-user="citdf"
                      inline-template>
                  <div>
                    <v-speed-dial
                    :id="i"
                    :top="top"
                    :bottom="bottom"
                    :right="right"
                    :left="left"
                    direction="left"
                    transition="slide-y-reverse-transition"
                    >
                      <v-btn
                        small
                        :id="i"
                        slot="activator"
                        color="primary"
                        text
                        fab
                      >
                        <v-icon>share</v-icon>
                      </v-btn>
                      <!-- Opciones del Menú -->
                      <v-btn
                        fab
                        dark
                        small
                        color="primary"
                      >
                        <network network="facebook">
                          <font-awesome-icon :icon="['fab','facebook-f']"/>
                        </network>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        small
                        color="indigo"
                      >
                        <network network="linkedin">
                          <font-awesome-icon :icon="['fab','linkedin-in']"/>
                        </network>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        small
                        color="info"
                      >
                        <network network="twitter">
                          <font-awesome-icon :icon="['fab','twitter']"/>
                        </network> 
                      </v-btn>
                      <!-- FIN Opciones del Menú -->
                    </v-speed-dial>
                  </div>
                </social-sharing>
                <v-btn text color="primary" @click="irBolsaTrabajo(bolsa)">Ver Más</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
    
</template>

<script>
import router from '../router'
import axios from 'axios'

export default {
    components:{
    },
    data () {
      return {
        fab: false,
        top: false,
        right: true,
        bottom: true,
        left: false,
      }
    },
    created: function(){
      store.dispatch('BOLSA_TRABAJO_retrievePosts');
    },
    computed:{
      bolsaTrabajo(){
        let items = store.state.bolsa_trabajo.items;
        return items;
      },
      bolsaTrabajoSelected:{
        get:function(){
          return store.state.bolsa_trabajo.selected;
        },
        set:function(selected){
          store.state.bolsa_trabajo.selected = selected;
        }
      }
    },
    watch:{
      bolsaTrabajo(){}
    },
    methods:{
      irBolsaTrabajo(bolsa) {
        store.dispatch('BOLSA_TRABAJO_goWithSelected',bolsa);
        router.push('bolsa-de-trabajo/detalle');
      }
    }
}
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}

  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: relative;
  }

  #create .v-btn--floating {
    position: relative;

  }
</style>
