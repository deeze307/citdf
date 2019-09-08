<template>
  <div>
    <v-container class="ml-0 mr-0" fluid>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h1 class="display-2 font-weight-black" style="color:#263238">BENEFICIOS</h1>
        <h3 class="subheading font-weight-black" style="color:#263238">
          Aquí ustéd podrá consultar los convenios a los que accede por estar matriculado.
        </h3>
        
      </v-flex>
      <v-layout align-center justify-space-around row fill-height>
          
        <v-flex xs12 sm12 md3 lg3 xl3 class="ma-3" v-for="(beneficio, i) in beneficios" :key="i">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 5" class="flexcard">
              <v-img
              src="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/09/slider1.jpg"
              class="white--text"
              height="200px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title class="fill-height align-end"
                  v-text="beneficio.title.rendered">
                </v-card-title>
              </v-img>
              <v-card-actions id="create" class="pa-3">
                <v-spacer></v-spacer>
                <social-sharing url="http://citdf.org/beneficios"
                      title="Colegio de Ingenieros de Tierra del Fuego"
                      :description=beneficio.excerpt.rendered
                      :quote=beneficio.excerpt.rendered
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
                <v-btn text color="primary" @click="irBeneficio(beneficio)">Ver Más</v-btn>
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
        // beneficios:[
        //   {
        //     "titulo":"5% de Descuento en Hotel Arakur",
        //     "descripcion": "Presentando su credencial de Matriculado, obtiene automáticamente un 5% de descuento en su alojamiento en el Hotel Arakur.",
        //     "periodo": "todos los días",
        //     "createdAt":"2019-08-29"
        //   }
        // ]
      }
    },
    created: function(){
      store.dispatch('BENEFICIOS_retrievePosts');
    },
    computed:{
      beneficios(){
        let items = store.state.beneficios.items;
        return items;
      },
      beneficiosSelected:{
        get:function(){
          return store.state.beneficios.selected;
        },
        set:function(selected){
          store.state.beneficios.selected = selected;
        }
      }
    },
    watch:{
      beneficios(){}
    },
    methods:{
      irBeneficio(beneficio) {
        store.dispatch('BENEFICIOS_goWithSelected',beneficio);
        router.push('beneficios/detalle');
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
