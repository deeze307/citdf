<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238">Resoluciones</h2>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl6>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left" style="width:15%;">Res N°</th>
                <th class="text-left" style="width:20%;">Fecha</th>
                <th class="text-left" style="width:65%;">Concepto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in resoluciones" :key="item.res">
                <td>{{ item.res }}</td>
                <td>{{ item.fecha }}</td>
                <td class="resolucion" v-html="item.concepto"></td>
              </tr>
            </tbody>
          </v-simple-table>
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
        resoluciones: [
          {
            res: "159",
            fecha: "06/08/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/08/Resolución-Nº159.pdf" target="_blank">Aceptar solicitud de baja M.P.N°317 y 140.</a>'
          },
          {
            res: "158",
            fecha: "22/07/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/08/Resolución-Nº158.pdf" target="_blank">Otorga M.P.N° 359 y 360.</a>'
          },
          {
            res: "157",
            fecha: "10/07/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/08/Resolución-Nº157.pdf" target="_blank">Otorga M.P.N° 357 y 358.</a>'
          },
          {
            res: "156",
            fecha: "24/06/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/08/Resolución-Nº156.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 39.</a>'
          },
          {
            res: "155",
            fecha: "24/06/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/07/Resolución-Nº155.pdf" target="_blank">Otorga M.P.N° 355 y 356.</a>'
          },
          {
            res: "154",
            fecha: "24/05/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/06/Resolución-Nº154.pdf" target="_blank">Apertura de cuenta bancaria en el Banco de la Nación Argentina</a>'
          },
          {
            res: "153",
            fecha: "14/05/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/06/Resolución-Nº153.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 180.</a>'
          },
          {
            res: "152",
            fecha: "13/05/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/06/Resolución-Nº152.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 220.</a>'
          },
          {
            res: "151",
            fecha: "13/05/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/06/Resolución-Nº151.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 221.</a>'
          },
          {
            res: "150",
            fecha: "06/05/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/05/Resolución-Nº150.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 274.</a>'
          },
        ],
        
      }
    },
    created:function(){
      store.dispatch('COLEGIO_retrieveAutoridades');
    },
    computed:{
      autoridades(){
        return store.state.colegio.autoridades;
      }
    },
    watch:{
      autoridades(){
        this.parseAutoridades();
      }
    },
    methods:{
      parseAutoridades(){
        console.log("Parseando Autoridades",store.state.colegio.autoridades.content.rendered);
      }
    }
}
</script>

<style>
.resolucion {
  text-decoration: none;
}
.resolucion:hover{
  text-decoration:underline;
}

a{
  text-decoration: none;
}
</style>
