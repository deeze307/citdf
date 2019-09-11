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
            res: "160",
            fecha: "13/08/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/09/Resolución-Nº160.pdf" target="_blank">Modificar Art. N°1 de Resolución N° 108/2017.</a>'
          },
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
          {
            res: "149",
            fecha: "06/05/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/05/Resolución-Nº149.pdf" target="_blank">Otorga M.P.N° 354.</a>'
          },
          {
            res: "148",
            fecha: "03/05/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/05/Resolución-Nº148.pdf" target="_blank">Anular convenio con DPOSS.</a>'
          },
          {
            res: "147",
            fecha: "03/05/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2019/05/Resolución-Nº147.pdf" target="_blank">Aceptar renuncia del Secretario.</a>'
          },
          {
            res: "146",
            fecha: "11/04/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/Resolución-Nº146.pdf" target="_blank">Otorga M.P.N° 351; 352 y 353.</a>'
          },
          {
            res: "145",
            fecha: "25/03/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/Resolución-Nº145.pdf" target="_blank">Otorga M.P.N° 350</a>'
          },
          {
            res: "144",
            fecha: "15/03/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/Resolución-Nº144.pdf" target="_blank">Otorga M.P.N° 349</a>'
          },
          {
            res: "143",
            fecha: "07/03/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/Resolución-Nº143.pdf" target="_blank">Otorga M.P.N° 348</a>'
          },
          {
            res: "142",
            fecha: "25/02/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/Resolución-Nº142.pdf" target="_blank">Otorga M.P.N° 347</a>'
          },
          {
            res: "141",
            fecha: "19/02/2019",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/Resolución-Nº141.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 319</a>'
          },
          {
            res: "140",
            fecha: "26/12/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N140.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 158 y 147</a>'
          },
          {
            res: "139",
            fecha: "18/12/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N139.pdf" rel="noopener" target="_blank">Otorga M.P. N° 346</a>'
          },
          {
            res: "138",
            fecha: "18/12/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N138.pdf" rel="noopener" target="_blank">Resolver descuento del 30% en el pago de la matricula a M.P. 208 y 118</a>'
          },
          {
            res: "137",
            fecha: "18/12/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N137.pdf" rel="noopener" target="_blank">Establece valores de módulo y matricula para el año 2019</a>'
          },
          {
            res: "136",
            fecha: "18/12/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N136.pdf" rel="noopener" target="_blank">Incorporar integrantes del Consejo Superior y Certificadores de firmas</a>'
          },
          {
            res: "135",
            fecha: "10/12/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N135.pdf" rel="noopener" target="_blank">Otorga M.P. N° 345</a>'
          },
          {
            res: "134",
            fecha: "31/10/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N134.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 84</a>'
          },
          {
            res: "133",
            fecha: "25/10/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N133.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 57</a>'
          },
          {
            res: "132",
            fecha: "22/10/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_N132.pdf" rel="noopener" target="_blank">Otorga M.P. N° 343 y 344</a>'
          },
          {
            res: "131",
            fecha: "18/07/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_131.pdf" rel="noopener" target="_blank">Otorga M.P. N° 339 340 341 y 342</a>'
          },
          {
            res: "130",
            fecha: "18/07/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/Resolución-Nº130.pdf" rel="noopener" target="_blank">Otorga M.P. N° 337 y 338</a>'
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
