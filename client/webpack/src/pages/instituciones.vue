<template >
    <v-container fluid text-xs-center >
      <v-layout v-resize="onResize" id="top" flex row wrap align-content-space-between justify-center >
        <v-flex v-bind:class="{ 'scrollable-content' : !isMobile, 'scrollable-content-mobile' : isMobile}" xs12 sm12 md5 lg5 xl5 mb-2>
            <v-flex xs12 md12 lg12 xl12>
              <!-- <v-text-field
                v-model="filtro.nombre"
                label="Busque por Nombre de Institución"
              ></v-text-field> -->
              <select-api-forms 
              v-model="filtro.nombre" 
              form="centros" 
              label="Busque por Nombre de Institución" 
              custom="nombre"/>
            </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <div class="text-center">
              <p ligth>Si lo desea, además puede utilizar los filtros</p>
            </div>
          </v-flex>

            <v-combobox
                    v-model="filtro.ciudad"
                    :items="combo_ciudades_api"
                    :loading="combo_ciudades_searching"
                    label="Seleccione Ubicación"
            ></v-combobox>

            <v-combobox
                    v-model="filtro.nivel_servicio"
                    :items="combo_niveles"
                    label="Seleccione Nivel"
            ></v-combobox>

            <v-combobox
                    v-model="filtro.sector"
                    :items="combo_sectores"
                    label="Seleccione Sector"
            ></v-combobox>

             <v-combobox
                    v-model="filtro.ambito"
                    :items="combo_ambito"
                    label="Seleccione Ambito"
            ></v-combobox>

            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-btn
                  class="mx-0"
                  color="primary"
                  v-scroll-to="{
                    el: '#results',
                    duration: 500,
                    easing: 'ease-in-out',
                    offset: -100,
                    force: true,
                    cancelable: true,
                    onDone: findInstitution,
                    x: false,
                    y: true
                  }"
                  :loading="searching"
                  ref="button"
                >
                    <v-icon left large>search</v-icon>Buscar
                </v-btn>
            </v-flex>


            <!-- Resultados de busqueda -->
            <div id="results" ref="results">
              <div v-for="item in resultado" :key="item.id">
                <v-card>
                  <v-divider></v-divider>
                  <v-list dense>
                    <h3 class="subheading mb-0 align-start"><strong>CUE Anexo: </strong>{{ item.cue }} - {{ item.nombre }}</h3>
                  </v-list>
                  <v-btn  v-scroll-to="{
                    el: '#maps',
                    duration: 500,
                    easing: 'ease-in-out',
                    offset: -50,
                    force: true,
                    cancelable: true,
                    onStart: function(element) {
                      showCenterInfo(item);
                    },
                    x: false,
                    y: true
                  }"
                   outline color="indigo">
                    Ver En Mapa
                  </v-btn>
                </v-card>
              </div>
            </div>

        </v-flex>
        <!-- Google Maps -->
        <v-flex xs12 sm12 md7 lg7 x7 id="maps" ref="maps">
          <google-map :coords="coords" :markers_array="markers"/>
        </v-flex>
      </v-layout>
    </v-container>

</template>

<script>
  import router from '../router'
  import axios from 'axios'
  import * as easings from 'vuetify/es5/util/easing-patterns'


  import SelectApiForms from '../components/apiforms/selectbox'
  // Modelo de Instituciones
  import instituciones from '../store/model/instituciones'

  // Google Maps
  import GoogleMap from "../components/GoogleMap";

  export default {
    components: { GoogleMap, SelectApiForms },
    mounted: function(){
      this.fillLocations();
      this.onResize();
    },
    created: function(){
      store.commit('updateTitle',"SIEP | Instituciones");
    },
    data: ()=>({
      isMobile:false,
      coords:{
        latitud: -68.2746,
        longitud: -68.3186003,
      },
      markers:[],
      selected: 'Button',
      elements: ['Button', 'Radio group'],
      duration: 800,
      offset: -10,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings),
      error:"",
      searching:false,
      headers:['Nombre'],
      hidden:false,
      apigw: process.env.SIEP_API_GW_INGRESS,
      filtro:{},
      resultado:[],
      findCentroRunning:false,
      centro_nombre:"",
      combo_ciudades_api:[],
      combo_ciudades_searching:false,
      combo_niveles: ['Maternal - Inicial','Común - Inicial','Común - Primario','Adultos - Primario','Común - Secundario','Adultos - Secundario', 'Común - Superior'],
      combo_sectores:["ESTATAL","PRIVADO"],
      combo_ambito: ['Rural', 'Urbano'],
      dialog_ops:{
        dialog: false,
        buttonName:"",
        dialogTitle:"Información del Centro",
        dialogContent:instituciones,
        icon:"visibility"
  }
    }),
    computed:{
      targetSearch () {
        this.findInstitution()
        return this.$refs.button;
      },
      targetMap () {
        return this.$refs.maps;
      },
      scrollOptions () {
        return {
          duration: this.duration,
          offset: this.offset
        }
      },
      element () {
        if (this.selected === 'Button') return this.$refs.button
        else if (this.selected === 'Radio group') return this.$refs.radio
      }
    },
    methods:{
      onResize () {
        if(window.innerWidth <= 480){
          this.isMobile = true;
        }else{
          this.isMobile = false;
        }
      },

      fillLocations: function() {
        var vm = this;
        const curl = axios.create({
          baseURL: vm.apigw
        });
        vm.combo_ciudades_searching = true;
        return curl.get('/api/public/siep_admin/v1/forms/ciudades')
          .then(function (response) {
            vm.combo_ciudades_api  = response.data.map(x => {
              return x.nombre
            });
            vm.combo_ciudades_searching = false;
          })
          .catch(function (error) {
            vm.error = error.message;
            // vm.loading_nivel = false;
            console.log(vm.error);
            vm.searching = false;
            vm.combo_ciudades_searching = false;
          });
      },

      findInstitution: function () {
        var vm = this;
        vm.searching = true;
        vm.markers = [];

        const curl = axios.create({
          baseURL: vm.apigw
        });
        vm.filtro.with='barrio,cursos.titulacion';
        return curl.get('/api/public/siep_admin/v1/centros',{
          params: _.omitBy(vm.filtro, _.isEmpty)
        })
          .then(function (response) {
            let render = response.data.map(function(x) {
              let res ={
                position:{
                  lat: x.lat,
                  lng: x.lng
                },
                data:x
              };
              if(x.lng != 0 && x.lat != 0 && !isNaN(x.lng) && !isNaN(x.lat)){
                vm.markers.push(res);
              }
              return x;
            });

            vm.resultado = render;
            vm.searching = false;
          })
          .catch(function (error) {
            vm.error = error.message;
            vm.loading_nivel = false;
            console.log(vm.error);

            vm.searching = false;
          });

          // var options = {
          //   el: '#results', 
          //   easing: 'ease-in',
          //   duration: 800,
          //   offset: 0,
          //   force: true,
          //   cancelable: true,
          //   x: false,
          //   y: true
          // }

          // VueScrollTo.scrollTo(options);
      },

      findInstitutionByName:function(){
        var vm = this;
      },

      showCenterInfo(centro){

        let vm = this;
        vm.coords ={
          latitud: centro.lat,
          longitud: centro.lng
        };
      },

      goBack:function(){
        router.go(-1);
      },

      goTop:function(){
        var element = document.getElementById("top");
        var top = element.offsetTop;
        element.scrollTo(0,0);
      },

      verifyFilters:function(){
        this.filtro = _.remove(this.filtro , function(f){
          return f.isNaN
        })
      }
    }
  }
</script>

<style scoped>

  .scrollable-content {
    height: 550px;
    background: white;
    flex-grow: 1;

    overflow: auto;

    /* for Firefox */
    min-height: 0;
  }

  .scrollable-content-mobile {
    height: 600px;
    background: white;
    flex-grow: 1;

    overflow: auto;

    /* for Firefox */
    min-height: 0;
  }


</style>
