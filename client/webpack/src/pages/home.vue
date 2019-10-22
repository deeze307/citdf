<template>
  <div>
    <!-- PARALLAX -->
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      :height=parallaxHeight
    >
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 v-if="!isMobile" class="display-2 font-weight-thin mb-3">Colégio de Ingenieros de Tierra del Fuego</h1>
        <h4 v-if="!isMobile" class="display-1 font-weight-thin">Antártida e Islas del Atlántico Sur</h4>

        <h1 v-if="isMobile" style="text-align:center;" class="font-weight-thin mb-3">Colégio de Ingenieros de Tierra del Fuego</h1>
        <h4 v-if="isMobile" class="font-weight-thin">Antártida e Islas del Atlántico Sur</h4>
      </v-layout>
    </v-parallax>
    <!-- Fin PARALLAX -->

    <!-- Carousel -->
    <v-container justify-center>
      <v-layout align-center justify-space-around row>
        <v-carousel 
          id="carousel"
          cycle
          show-arrows-on-hover
          hide-delimiter-background
          next-icon="keyboard_arrow_right"
          prev-icon="keyboard_arrow_left"
          delimiter-icon="fiber_manual_record"
          v-if="carouselItems.length > 0"
        >
          <v-carousel-item
            v-for="(item,i) in carouselItems"
            :key="i"
          >
            <img :src="item.src" :style="carouselStyle"/>
          </v-carousel-item>
              
        </v-carousel>
        
      </v-layout>
    </v-container>
    <!-- Fin Carousel -->

    <!-- BOX's de acciones -->
    <v-container>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md2 lg3 xl3>
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 5" height=280 class="mx-auto">
              <v-img
                class="white--text"
                height="108px"
                :src="require('@/assets/box1.png')"
                gradient='to bottom, rgba(0,115,255,.7), rgba(25,32,72,.7)'
              >
                <v-container fill-height fluid text-center class="mt-4">
                  <v-layout fill-height text-center>
                    <v-flex xs12 align-end flexbox >
                      <h3 class="headline font-weight-black">Beneficios</h3>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-text>
                <p>Conozca que a que beneficios puede acceder por estar matriculado en la provincia.</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="indigo" @click="goTo('beneficios')">Ver Más</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm12 md3 lg3 xl3>
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 5" height=280 class="mx-auto">
              <v-img
                class="white--text"
                height="108px"
                :src="require('@/assets/box2.png')"
                gradient='to bottom, rgba(0,115,255,.7), rgba(25,32,72,.7)'
              >
                <v-container fill-height fluid text-center class="mt-4">
                  <v-layout fill-height text-center>
                    <v-flex xs12 align-end flexbox >
                      <h3 class="headline font-weight-black">¿Cómo Matricularse?</h3>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-text>
                <p>Descargue el formulario de matriculación e informese sobre los requisitos y modalidad para matricularse.</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="indigo" @click="goTo('como-matricularse')">Ver Más</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm12 md3 lg3 xl3>
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 5" height=280>
              <v-img
                class="white--text"
                height="108px"
                :src="require('@/assets/box3.png')"
                gradient='to bottom, rgba(0,115,255,.7), rgba(25,32,72,.7)'
              >
                <v-container fill-height fluid text-center class="mt-4">
                  <v-layout fill-height text-center>
                    <v-flex xs12 align-end flexbox >
                      <h3 class="headline font-weight-black">Listado de Matriculados</h3>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-text>
                <p>Acceda a la lista completa de los matriculados del Colegio de Ingenieros de Tierra del Fuego.</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="indigo" @click="goTo('lista-de-matriculados')">Ver Más</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Fin BOX's de acciones -->

    <!-- Noticias -->
    <v-parallax
      dark
      :src="require('@/assets/parallax5.jpg')"
      style="height:auto;"
    >
    <!-- <v-container class="ml-0 mr-0" fluid style="background-color: #1976D2;"> -->
        <v-layout align-center justify-space-around row>
          <v-flex xs12 sm12 md8 lg8 xl8>
            <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-3 pb-3">
              <h1 class="display-2 font-weight-black" style="color:white">NOVEDADES</h1>
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
      
    <!-- </v-container> -->
    </v-parallax>
    <!-- Fin Noticias -->

    <!-- Bolsa de Trabajo -->
    <v-container class="ml-0 mr-0" fluid>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h1 class="display-2 font-weight-black" style="color:#263238">BOLSA DE TRABAJO</h1>
        </v-flex>
        <v-layout align-center justify-space-around row fill-height>
            
          <v-flex xs12 sm12 md3 lg3 xl3 class="mb-3" v-for="(bolsa, i) in bolsaTrabajo" :key="i">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 5" :height=bolsaTrabajoStyle.cardHeight class="flexcard">
                <v-card-title class="mb-2 pb-0" :style="bolsaTrabajoStyle.title">
                  <h3 style="color:#0277BD;" class=".subheading font-weight-light">{{bolsa.title.rendered}}</h3>
                </v-card-title>
                <v-card-text class="mb-0 pt-1 pb-1 grow">
                  <span style="color:#0277BD;" class="caption right">{{bolsa.date | fechaSinHora}}</span>
                  <div class="job_desc pt-4" v-html="bolsa.content.rendered.substring(0,200) + ' [...]'"></div>
                </v-card-text>  
                <v-card-actions id="create" class="pa-3">
                  <v-spacer></v-spacer>
                  <social-sharing url="http://www.citdf.org.ar/#/bolsa-de-trabajo"
                      :title=bolsa.title.rendered
                      :description=bolsa.excerpt.rendered
                      :quote=bolsa.excerpt.rendered
                      hashtags="CITDF"
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
    <!-- Fin Bolsa de Trabajo -->
      
  </div>

</template>


<script>
  import router from '../router'
  import login_api from '../components/login_api'

  export default {
    data(){
      return{
        
        carouselStyle:'',
        novedadesStyle:[],
        bolsaTrabajoStyle:[],
        parallaxHeight:200,
        isMobile:false,
        fab: false,
        top: false,
        right: true,
        bottom: true,
        left: false,
        carouselItems: []
      }
    },
    created: function(){
      // store.commit('updateTitle',"SIEP | Servicio");
      this.carouselImages(require.context("@/assets/carousel", true, /\.jpg$/));
      store.dispatch('BOLSA_TRABAJO_retrievePosts',3);
      store.dispatch('NOVEDADES_retrievePosts',3);
    },
    mounted: function() {
      this.onResize();
    },
    components:{
      login_api
    },
    computed:{
      // user(){
      //   return store.state.login_api.user
      // },
      // persona(){
      //   return store.getters.persona;
      // },
      bolsaTrabajo(){
        return store.state.bolsa_trabajo.items;
      },
      novedades(){
        return store.state.novedades.items;
      },
      bolsaTrabajoSelected:{
        get:function(){
          return store.state.bolsa_trabajo.selected;
        },
        set:function(selected){
          store.state.bolsa_trabajo.selected = selected;
        }
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
    watch: {
      bolsaTrabajo(){},
      novedades(){}
    },
    methods:{
      carouselImages(r) {
        var imgs = {}
        r.keys().forEach(key => (imgs[key] = require("@/assets/carousel"+key.substr(1)),
        this.carouselItems.push({src : imgs[key]})
        ))
      },
      irBolsaTrabajo(bolsa) {
        store.dispatch('BOLSA_TRABAJO_goWithSelected',bolsa);
        router.push('bolsa-de-trabajo/detalle');
      },
      irNovedad(novedad) {
        store.dispatch('NOVEDADES_goWithSelected',novedad);
        router.push('novedades/detalle');
      },
      goTo(route){
        router.push(route);
      },
      onResize(){
        if(window.innerWidth <= 480){
          this.isMobile = true;
          this.parallaxHeight = 160;

          this.novedadesStyle.cardHeight = "auto"
          this.novedadesStyle.title = "height:auto;"
          this.novedadesStyle.body = "height:auto;"

          this.bolsaTrabajoStyle.cardHeight = "auto"
          this.bolsaTrabajoStyle.title = "height:auto;"
          this.bolsaTrabajoStyle.body = "height:auto;"

          this.carouselStyle = "width:"+window.innerWidth+"px;height:auto;"
        }else{
          this.isMobile = false;
          this.parallaxHeight = 200;

          this.novedadesStyle.cardHeight = 280
          this.novedadesStyle.title = "height:80px;"
          this.novedadesStyle.body = "height:140px;"

          this.bolsaTrabajoStyle.cardHeight = 350
          this.bolsaTrabajoStyle.title = "height:80px;"
          this.bolsaTrabajoStyle.body = "height:140px;"
          
          this.carouselStyle = "width:auto;height:auto;"
        }
      }
  }
}
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}

#carousel{
    max-width:958px; 
    max-height:364px;
  }

@media only screen and (max-width: 480px) {
  #carousel{
    max-width:480px; 
    max-height:200px;
  }
}

</style>