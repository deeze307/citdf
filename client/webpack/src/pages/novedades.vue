<template>
    <v-container>
      <v-layout align-center justify-space-around row>
        <v-flex xs12 sm12 md8 lg8 xl8>
          <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-3 pb-3">
            <h1 class="display-2 font-weight-black" style="color:#263238">NOVEDADES</h1>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12 class="mb-3" v-for="(novedad, index) in novedades" :key="index">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 5" :height=novedadesStyle.cardHeight>
                <v-card-title class="mb-0 pb-0" :style="novedadesStyle.title">
                  <h3 style="color:#0277BD;" class=".subheading font-weight-light">{{novedad.title.rendered}}</h3>
                </v-card-title>
                <v-card-text class="mb-0 pt-0" :style="novedadesStyle.body">
                  <span style="color:#0277BD;" class="caption">{{novedad.date | fechaSinHora}}</span>
                  <div class="job_desc pt-3" v-html="novedad.content.rendered.substring(0,400) + ' [...]'"></div>
                </v-card-text>
                <v-card-actions id="create" class="">
                  <v-spacer></v-spacer>
                  <social-sharing url="http://www.citdf.org.ar/#/novedades"
                      :title=novedad.title.rendered
                      :description=novedad.excerpt.rendered
                      :quote=novedad.excerpt.rendered
                      hashtags="CITDF"
                      inline-template>
                    <div>
                      <v-speed-dial
                      :id="index"
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
                  <v-btn text color="primary" @click="irNovedad(novedad)">Ver Más</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
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
        novedadesStyle:[],
        isMobile:false,
      }
    },
    mounted:function(){
      this.onResize()
      window.scrollTo(0, 0)
    },
    created: function(){
      store.dispatch('NOVEDADES_retrievePosts');
    },
    computed:{
      novedades(){
        return store.state.novedades.items;
      },
      novedadSelected:{
        get:function(){
          return store.state.novedades.selected;
        },
        set:function(selected){
          store.state.novedades.selected = selected;
        }
      }
    },
    watch:{
      novedades(){}
    },
    methods:{
      irNovedad(novedad) {
        store.dispatch('NOVEDADES_goWithSelected',novedad);
        router.push('novedades/detalle');
      },
      onResize(){
        if(window.innerWidth <= 480){
          this.isMobile = true;

          this.novedadesStyle.cardHeight = "auto"
          this.novedadesStyle.title = "height:auto;"
          this.novedadesStyle.body = "height:auto;"

        }else{
          this.isMobile = false;

          this.novedadesStyle.cardHeight = 280
          this.novedadesStyle.title = "height:80px;"
          this.novedadesStyle.body = "height:140px;"
        }
      }
    }
}
</script>

<style>

</style>
