<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238">Links de Interés</h2>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl6>
          CIRSOC
          <p><a href="http://www.inti.gob.ar/cirsoc" target="_blank">www.inti.gob.ar/cirsoc</a></p>
          AABH
          <p><a href="http://www.aabh.org.ar" target="_blank">www.aabh.org.ar</a></p>
          Asociación Argentina de Hormigón Elaborado
          <p><a href="http://www.hormigonelaborado.com" target="_blank">www.hormigonelaborado.com</a></p>
          IRAM
          <p><a href="http://www.iram.org.ar" target="_blank">www.iram.org.ar</a></p>
          PCR
          <p><a href="http://www.pcrsa.com.ar" target="_blank">www.pcrsa.com.ar</a></p>
          Instituto del Cemento Portland Argentino
          <p><a href="http://www.icpa.org.ar" target="_blank">www.icpa.org.ar</a></p>
          American Society for Testing and Materials (ASTM)
          <p><a href="http://www.astm.org" target="_blank">www.astm.org</a></p>
          American Concrete Pavement Association (ACPA)
          <p><a href="http://www.pavement.com" target="_blank">www.pavement.com</a></p>
          Asociación Forestal Argentina (AFOA)
          <p><a href="https://www.afoa.org.ar" target="_blank">www.afoa.org.ar</a></p>
          INTI MADERAS / MUEBLES
          <p><a href="http://www.inti.gob.ar/maderaymuebles/" target="_blank">www.inti.gob.ar/maderaymuebles</a></p>
          Federación Argentina de la Industria de la Madera y el Mueble (FAIMA)
          <p><a href="http://www.faima.org.ar" target="_blank">www.faima.org.ar</a></p>
          Ministerio de Ambiente y Desarrollo Sustentable Rep. Arg.
          <p><a href="https://www.argentina.gob.ar/ambiente" target="_blank">www.argentina.gob.ar/ambiente</a></p>
          Gobierno de Tierra del Fuego (Secretaría de Desarrollo Sustentable y Cambio Climático TDF y Ministerio de Agricultura, Ganadería y Pesca TDF)
          <p><a href="https://www4.tierradelfuego.gov.ar" target="_blank">www4.tierradelfuego.gov.ar</a></p>
          Comité Argentino de la UICN
          <p><a href="http://www.uicn.org.ar" target="_blank">www.uicn.org.ar</a></p> 
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
        aranceles: [
          {
            rubro: "Encomienda y certificaciones",
            unidad: "Módulo",
            cantidad: "1"
          },
          {
            rubro: "Inscripción*",
            unidad: "Módulo",
            cantidad: "5"
          },
          {
            rubro:"Matrícula Anual",
            unidad: "Módulo",
            cantidad:"5"
          },
          {
            rubro:"Menos de 1 año de recibido",
            unidad:"",
            cantidad:"bonificación del 50% en inscripción y matrícula anual (fecha de entrega del diploma)"
          }
        ],
        valor_modulo:[
          {
            trimestre:"1er trimestre", 
            fecha:"Hasta el 31 de Marzo 2019",
            valor: "$ 1000"
          },
          {
            trimestre:"2do trimestre", 
            fecha:"Hasta el 30 de Junio 2019",
            valor: "$ 1050"
          },
          {
            trimestre: "3er trimestre", 
            fecha:"Hasta el 30 de Septiembre 2019",
            valor: "$ 1100"
          },
          {
            trimestre:"4to trimestre", 
            fecha:"Hasta el 31 de Diciembre 2019",
            valor: "$ 1150"
          }
        ],
      }
    },
    created:function(){
      store.dispatch('COLEGIO_retrieveAutoridades');
    },
    computed:{
      // autoridades(){
      //   return store.state.colegio.autoridades;
      // }
    },
    watch:{
      // autoridades(){
      //   this.parseAutoridades();
      // }
    },
    methods:{
      parseAutoridades(){
        console.log("Parseando Autoridades",store.state.colegio.autoridades.content.rendered);
      }
    }
}
</script>

<style>

</style>
