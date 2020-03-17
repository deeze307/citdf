<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-dialog v-model="spinner" persistent content content-class="centered-dialog">
        <v-container fill-height>
          <v-layout column justify-center align-center>
            <v-progress-circular
              :size="50"
              :width="7"
              color="primary"
              indeterminate
              v-if="spinner"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
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
            res: "189",
            fecha: "04/03/2020",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/03/Resolución-Nº189.pdf" target="_blank">Aceptar solicitud de alta M.P.N° 359.</a>'
          },
          {
            res: "188",
            fecha: "27/02/2020",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/03/Resolución-Nº188.pdf" target="_blank">Aceptar solicitud de suspesión M.P.N° 229.</a>'
          },
          {
            res: "187",
            fecha: "12/02/2020",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/03/Resolución-Nº187.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 276.</a>'
          },
          {
            res: "186",
            fecha: "06/02/2020",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/03/Resolución-Nº186.pdf" target="_blank">Aceptar solicitud de suspesión M.P.N° 266.</a>'
          },
          {
            res: "185",
            fecha: "03/02/2020",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/03/Resolución-Nº185.pdf" target="_blank">Otorga M.P.N° 378, 379 y 380.</a>'
          },
          {
            res: "184",
            fecha: "08/01/2020",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº184.pdf" target="_blank">Otorga M.P.N° 377.</a>'
          },
          {
            res: "183",
            fecha: "02/01/2020",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº183.pdf" target="_blank">Aceptar solicitud de suspesión M.P.N° 344 y 359.</a>'
          },
          {
            res: "182",
            fecha: "26/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº182.pdf" target="_blank">Aceptar solicitud de suspesión M.P.N° 342.</a>'
          },
          {
            res: "181",
            fecha: "26/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº181.pdf" target="_blank">Aceptar solicitud de suspesión M.P.N° 268.</a>'
          },
          {
            res: "180",
            fecha: "18/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº180.pdf" target="_blank">Establece valores de módulo y matricula para el año 2020.</a>'
          },
          {
            res: "179",
            fecha: "18/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº179.pdf" target="_blank">Otorga M.P.N° 374, 375 y 376.</a>'
          },
          {
            res: "178",
            fecha: "16/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº178.pdf" target="_blank">Suspender M.P. N°244.</a>'
          },
          {
            res: "177",
            fecha: "13/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº177.pdf" target="_blank">Establecer plan de cuotas MN°123.</a>'
          },
          {
            res: "176",
            fecha: "11/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº176.pdf" target="_blank">Suspender M.P. N°154.</a>'
          },
          {
            res: "175",
            fecha: "11/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº175.pdf" target="_blank">Suspender M.P. N°106.</a>'
          },
          {
            res: "174",
            fecha: "11/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº174.pdf" target="_blank">Suspender M.P. N°337.</a>'
          },
          {
            res: "173",
            fecha: "11/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº173.pdf" target="_blank">Suspender M.P. N°313.</a>'
          },
          {
            res: "172",
            fecha: "11/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº172.pdf" target="_blank">Suspender M.P.N° 251.</a>'
          },
          {
            res: "171",
            fecha: "11/12/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/02/Resolución-Nº171.pdf" target="_blank">Aceptar solicitud de suspesión M.P.N° 271.</a>'
          },
          {
            res: "170",
            fecha: "29/11/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/01/Resolución-Nº170.pdf" target="_blank">Aceptar solicitud de omisión del pago de los periodo 2016 y 2017 por no ejercer la profesión en la provincia.</a>'
          },
          {
            res: "169",
            fecha: "20/11/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/01/Resolución-Nº169.pdf" target="_blank">Aceptar solicitud para plan de cuotas MN°279.</a>'
          },
          {
            res: "168",
            fecha: "08/11/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2020/01/Resolución-Nº168.pdf" target="_blank">Otorga M.P.N° 368 al 373.</a>'
          },
          {
            res: "167",
            fecha: "30/10/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/11/Resolución-Nº167.pdf" target="_blank">Aceptar solicitud para plan de cuotas MN°217.</a>'
          },
          {
            res: "166",
            fecha: "28/10/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/11/Resolución-Nº166.pdf" target="_blank">Otorga M.P.N° 367.</a>'
          },
          {
            res: "165",
            fecha: "07/10/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/10/Resolución-Nº165.pdf" target="_blank">Otorga M.P.N° 366  y otorga M.P. en Especialidad Adicional a M.P. 346.</a>'
          },
          {
            res: "164",
            fecha: "24/09/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/10/Resolución-Nº164.pdf" target="_blank">Aceptar solicitud para plan de cuotas MN°82.</a>'
          },
          {
            res: "163",
            fecha: "20/09/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/10/Resolución-Nº163.pdf" target="_blank">Aceptar solicitud para plan de cuotas MN°268.</a>'
          },
          {
            res: "162",
            fecha: "12/09/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/10/Resolución-Nº162.pdf" target="_blank">Otorga M.P.N° 364 y 365.</a>'
          },
          {
            res: "161",
            fecha: "22/08/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/10/Resolución-Nº161.pdf" target="_blank">Otorga M.P.N° 361, 362 y 363.</a>'
          },
          {
            res: "160",
            fecha: "13/08/2019",
            concepto: '<a href="http://api-deeze.tk/citdf/wordpress/wp-content/uploads/2019/09/Resolución-Nº160.pdf" target="_blank">Modificar Art. N°1 de Resolución N° 108/2017.</a>'
          },
          {
            res: "159",
            fecha: "06/08/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/08/Resolución-Nº159.pdf" target="_blank">Aceptar solicitud de baja M.P.N°317 y 140.</a>'
          },
          {
            res: "158",
            fecha: "22/07/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/08/Resolución-Nº158.pdf" target="_blank">Otorga M.P.N° 359 y 360.</a>'
          },
          {
            res: "157",
            fecha: "10/07/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/08/Resolución-Nº157.pdf" target="_blank">Otorga M.P.N° 357 y 358.</a>'
          },
          {
            res: "156",
            fecha: "24/06/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/08/Resolución-Nº156.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 39.</a>'
          },
          {
            res: "155",
            fecha: "24/06/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/07/Resolución-Nº155.pdf" target="_blank">Otorga M.P.N° 355 y 356.</a>'
          },
          {
            res: "154",
            fecha: "24/05/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/06/Resolución-Nº154.pdf" target="_blank">Apertura de cuenta bancaria en el Banco de la Nación Argentina</a>'
          },
          {
            res: "153",
            fecha: "14/05/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/06/Resolución-Nº153.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 180.</a>'
          },
          {
            res: "152",
            fecha: "13/05/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/06/Resolución-Nº152.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 220.</a>'
          },
          {
            res: "151",
            fecha: "13/05/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/06/Resolución-Nº151.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 221.</a>'
          },
          {
            res: "150",
            fecha: "06/05/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/05/Resolución-Nº150.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 274.</a>'
          },
          {
            res: "149",
            fecha: "06/05/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/05/Resolución-Nº149.pdf" target="_blank">Otorga M.P.N° 354.</a>'
          },
          {
            res: "148",
            fecha: "03/05/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/05/Resolución-Nº148.pdf" target="_blank">Anular convenio con DPOSS.</a>'
          },
          {
            res: "147",
            fecha: "03/05/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2019/05/Resolución-Nº147.pdf" target="_blank">Aceptar renuncia del Secretario.</a>'
          },
          {
            res: "146",
            fecha: "11/04/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/Resolución-Nº146.pdf" target="_blank">Otorga M.P.N° 351; 352 y 353.</a>'
          },
          {
            res: "145",
            fecha: "25/03/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/Resolución-Nº145.pdf" target="_blank">Otorga M.P.N° 350</a>'
          },
          {
            res: "144",
            fecha: "15/03/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/Resolución-Nº144.pdf" target="_blank">Otorga M.P.N° 349</a>'
          },
          {
            res: "143",
            fecha: "07/03/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/Resolución-Nº143.pdf" target="_blank">Otorga M.P.N° 348</a>'
          },
          {
            res: "142",
            fecha: "25/02/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/Resolución-Nº142.pdf" target="_blank">Otorga M.P.N° 347</a>'
          },
          {
            res: "141",
            fecha: "19/02/2019",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/Resolución-Nº141.pdf" target="_blank">Aceptar solicitud de baja M.P.N° 319</a>'
          },
          {
            res: "140",
            fecha: "26/12/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N140.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 158 y 147</a>'
          },
          {
            res: "139",
            fecha: "18/12/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N139.pdf" rel="noopener" target="_blank">Otorga M.P. N° 346</a>'
          },
          {
            res: "138",
            fecha: "18/12/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N138.pdf" rel="noopener" target="_blank">Resolver descuento del 30% en el pago de la matricula a M.P. 208 y 118</a>'
          },
          {
            res: "137",
            fecha: "18/12/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N137.pdf" rel="noopener" target="_blank">Establece valores de módulo y matricula para el año 2019</a>'
          },
          {
            res: "136",
            fecha: "18/12/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N136.pdf" rel="noopener" target="_blank">Incorporar integrantes del Consejo Superior y Certificadores de firmas</a>'
          },
          {
            res: "135",
            fecha: "10/12/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N135.pdf" rel="noopener" target="_blank">Otorga M.P. N° 345</a>'
          },
          {
            res: "134",
            fecha: "31/10/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N134.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 84</a>'
          },
          {
            res: "133",
            fecha: "25/10/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N133.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 57</a>'
          },
          {
            res: "132",
            fecha: "22/10/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_N132.pdf" rel="noopener" target="_blank">Otorga M.P. N° 343 y 344</a>'
          },
          {
            res: "131",
            fecha: "18/07/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_131.pdf" rel="noopener" target="_blank">Otorga M.P. N° 339 340 341 y 342</a>'
          },
          {
            res: "130",
            fecha: "18/07/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/Resolución-Nº130.pdf" rel="noopener" target="_blank">Otorga M.P. N° 337 y 338</a>'
          },
          {
            res: "129",
            fecha: "26/06/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/Resolución-Nº129.pdf" rel="noopener" target="_blank">Otorga M.P. N° 336</a>'
          },
          {
            res: "128",
            fecha: "15/06/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_128.pdf" rel="noopener" target="_blank">Cambio de firmas Bco. TDF</a>'
          },
          {
            res: "127",
            fecha: "08/06/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_127.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 192</a>'
          },
          {
            res: "126",
            fecha: "04/06/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_126.pdf" rel="noopener" target="_blank">Otorga M.P. N° 334 y 335</a>'
          },
          {
            res: "125",
            fecha: "21/05/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_125.pdf" rel="noopener" target="_blank">Otorga M.P. N° 329 a 333</a>'
          },
          {
            res: "124",
            fecha: "23/04/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_124.pdf" rel="noopener" target="_blank">Otorga M.P. N° 327 y 328</a>'
          },
          {
            res: "123",
            fecha: "03/04/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_123.pdf" rel="noopener" target="_blank">Otorga M.P. N° 323 a 326</a>'
          },
          {
            res: "122",
            fecha: "03/04/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_122.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 175</a>'
          },
          {
            res: "121",
            fecha: "09/03/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_121.pdf" rel="noopener" target="_blank">Otorga M.P. N° 319 a 322</a>'
          },
          {
            res: "120",
            fecha: "21/02/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/04/Resolución-Nº120.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 301</a>'
          },
          {
            res: "119",
            fecha: "07/02/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/04/Resolución-Nº119.pdf" rel="noopener" target="_blank">Otorga M.P. N° 317 y 318</a>'
          },
          {
            res: "118",
            fecha: "09/01/2018",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/04/Resolución-Nº118.pdf" rel="noopener" target="_blank">Otorga M.P. N° 315 y 316</a>'
          },
          {
            res: "117",
            fecha: "22/12/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_117.pdf" rel="noopener" target="_blank">Designa a la Ing. Inés Caliva como certificadora temporal de firmas en la localidad de Rio Grande</a>'
          },
          {
            res: "116",
            fecha: "21/12/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_116.pdf" rel="noopener" target="_blank">Crear El Departamento de Higiene y Seguridad de Trabajo (D. I. H. y S. T.)</a>'
          },
          {
            res: "115",
            fecha: "21/12/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_115.pdf" rel="noopener" target="_blank">Establece valores de módulo y matricula para el año 2018</a>'
          },
          {
            res: "114",
            fecha: "21/12/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_114.pdf" rel="noopener" target="_blank">Otorga M.P. N° 314</a>'
          },
          {
            res: "113",
            fecha: "01/12/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_113.pdf" rel="noopener" target="_blank">Otorga M.P. N° 312 y 313</a>'
          },
          {
            res: "112",
            fecha: "16/11/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_112.pdf" rel="noopener" target="_blank">Otorga M.P. N° 311</a>'
          },
          {
            res: "111",
            fecha: "03/11/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_111.pdf" rel="noopener" target="_blank">Otorga M.P. N° 309 y 310</a>'
          },
          {
            res: "110",
            fecha: "20/10/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_110.pdf" rel="noopener" target="_blank">Otorga M.P. N° 305 a 308. Agrega a M.P. N° 039 la Especialidad Adicional en Higiene en Seguridad y Trabajo</a>'
          },
          {
            res: "109",
            fecha: "27/09/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_109.pdf" rel="noopener" target="_blank">Otorga M.P. N° 304</a>'
          },
          {
            res: "108",
            fecha: "07/09/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_108.pdf" rel="noopener" target="_blank">Otorga M.P. N° 300 a 303</a>'
          },
          {
            res: "107",
            fecha: "26/08/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_107.pdf" rel="noopener" target="_blank">Agrega a M.P. N° 027 la Especialidad Adicional en Higiene en Seguridad y Trabajo</a>'
          },
          {
            res: "106",
            fecha: "26/08/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_106.pdf" rel="noopener" target="_blank">Otorga licencia por tiempo indeterminado al Presidente Ing. Horacio Salvañá</a>'
          },
          {
            res: "105",
            fecha: "11/08/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_105.pdf" rel="noopener" target="_blank">Otorga M.P. N° 299</a>'
          },
          {
            res: "104",
            fecha: "10/08/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_104.pdf" rel="noopener" target="_blank">Otorga M.P. N° 298</a>'
          },
          {
            res: "103",
            fecha: "08/08/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_103.pdf" rel="noopener" target="_blank">Otorga M.P. N° 296 y 297</a>'
          },
          {
            res: "102",
            fecha: "08/08/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_102.pdf" rel="noopener" target="_blank">Otorga M.P. N° 295 por resolución judicial</a>'
          },
          {
            res: "101",
            fecha: "02/08/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_101.pdf" rel="noopener" target="_blank">Determina la reducción de la matrícula anual al 50% en el segundo trimestre de cada año</a>'
          },
          {
            res: "100",
            fecha: "19/07/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_100.pdf" rel="noopener" target="_blank">Otorga M.P. N° 294</a>'
          },
          {
            res: "099",
            fecha: "10/07/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_099.pdf" rel="noopener" target="_blank">Acepta la solicitud de baja M.P. N° 171</a>'
          },
          {
            res: "098",
            fecha: "06/07/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_098.pdf" rel="noopener" target="_blank">Otorga M.P. N° 291 a 293</a>'
          },
          {
            res: "097",
            fecha: "16/06/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_097.pdf" rel="noopener" target="_blank">Otorga M.P. N° 290</a>'
          },
          {
            res: "096",
            fecha: "18/05/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2017/08/CITDF_Resolucion_096.pdf" rel="noopener" target="_blank">Otorga M.P. N° 288 Y 289</a>'
          },
          {
            res: "095",
            fecha: "02/05/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_RESOLUCION_095.pdf" rel="noopener" target="_blank">Acepta la solicitud de baja M.P. N° 243</a>'
          },
          {
            res: "094",
            fecha: "08/05/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_RESOLUCION_094.pdf" rel="noopener" target="_blank">Otorga M.P. N° 286 Y 287</a>'
          },
          {
            res: "093",
            fecha: "18/04/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_093.pdf" rel="noopener" target="_blank">Otorga M.P. N° 284 Y 285</a>'
          },
          {
            res: "092",
            fecha: "07/04/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_092.pdf" rel="noopener" target="_blank">Otorga M.P. N° 281 a 283</a>'
          },
          {
            res: "091",
            fecha: "28/03/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_091.pdf" rel="noopener" target="_blank">Otorga M.P. N° 279 Y 280</a>'
          },
          {
            res: "090",
            fecha: "13/03/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_090.pdf" rel="noopener" target="_blank">Otorga M.P. N° 277 Y 278</a>'
          },
          {
            res: "089",
            fecha: "06/03/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_089.pdf" rel="noopener" target="_blank">Acepta la solicitud de baja M.P. N° 137</a>'
          },
          {
            res: "088",
            fecha: "03/03/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/RESOLUCION-N°088.pdf" rel="noopener" target="_blank">Acepta la solicitud de baja M.P. N° 014/051/079/142/164</a>'
          },
          {
            res: "087",
            fecha: "22/02/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/RESOLUCION-N°087.pdf" rel="noopener" target="_blank">Otorga M.P. N° 275 y 276</a>'
          },
          {
            res: "086",
            fecha: "08/02/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolusion_086.pdf" rel="noopener" target="_blank">Otorga M.P. N° 274</a>'
          },
          {
            res: "085",
            fecha: "27/01/2017",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolusion_085.pdf" rel="noopener" target="_blank">Otorga M.P. N° 273</a>'
          },
          {
            res: "084",
            fecha: "21/12/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_084.pdf" rel="noopener" target="_blank">Otorga M.P. N° 271 y 272</a>'
          },
          {
            res: "083",
            fecha: "24/11/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_083.pdf" rel="noopener" target="_blank">Otorga M.P. N° 269 y 270</a>'
          },
          {
            res: "082",
            fecha: "14/11/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_082.pdf" rel="noopener" target="_blank">Otorga M.P. N° 265 a 268</a>'
          },
          {
            res: "081",
            fecha: "10/11/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_081.pdf" rel="noopener" target="_blank">Otorga M.P. N° 263 y 264</a>'
          },
          {
            res: "080",
            fecha: "07/11/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_080.pdf" rel="noopener" target="_blank">Deniega el pedido de excepción de cumplir recaudos legales para lamatriculación al Ing. Sergio Amador López</a>'
          },
          {
            res: "079",
            fecha: "22/10/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_079.pdf" rel="noopener" target="_blank">Determina reducción de matrícula para el 3° y 4° trimestre del año 2017</a>'
          },
          {
            res: "078",
            fecha: "04/10/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_078.pdf" rel="noopener" target="_blank">Otorga M.P. N° 261 y 262</a>'
          },
          {
            res: "077",
            fecha: "27/09/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_077.pdf" rel="noopener" target="_blank">Otorga M.P. N° 260 Modifica resolución 076/16</a>'
          },
          {
            res: "076",
            fecha: "09/09/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_076.pdf" rel="noopener" target="_blank">Otorga M.P. N° 260</a>'
          },
          {
            res: "075",
            fecha: "09/09/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_075.pdf" rel="noopener" target="_blank">Otorga M.P. N° 259</a>'
          },
          {
            res: "074",
            fecha: "27/07/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_074.pdf" rel="noopener" target="_blank">Otorga M.P. N° 257 y 258</a>'
          },
          {
            res: "073",
            fecha: "16/07/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_073.pdf" rel="noopener" target="_blank">Crea Depto. De Sistemas</a>'
          },
          {
            res: "072",
            fecha: "16/07/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_072.pdf" rel="noopener" target="_blank">Crea Depto. De Electromecánica</a>'
          },
          {
            res: "071",
            fecha: "11/07/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_071.pdf" rel="noopener" target="_blank">Crea Depto. De Ciencias Naturales</a>'
          },
          {
            res: "070",
            fecha: "16/07/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_resolucion_070.pdf" rel="noopener" target="_blank">Crea Depto. De Ingeniería Civíl y Construcciones</a>'
          },
          {
            res: "069",
            fecha: "15/07/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_069.pdf" rel="noopener" target="_blank">Otorga M.P. N° 254 a 256</a>'
          },
          {
            res: "068",
            fecha: "04/07/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_068.pdf" rel="noopener" target="_blank">Crea Caja Chica para ambas Sedes</a>'
          },
          {
            res: "067",
            fecha: "15/06/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_067.pdf" rel="noopener" target="_blank">Otorga M.P. N° 253</a>'
          },
          {
            res: "066",
            fecha: "30/05/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_066.pdf" rel="noopener" target="_blank">Otorga M.P. N° 248 a 252</a>'
          },
          {
            res: "065",
            fecha: "13/05/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_065.pdf" rel="noopener" target="_blank">Publica llamado a convocatoria Asamblea Anual Ordinaria año 2016</a>'
          },
          {
            res: "064",
            fecha: "05/05/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_064.pdf" rel="noopener" target="_blank">Otorga M.P. N° 245 a 247</a>'
          },
          {
            res: "063",
            fecha: "02/05/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_063.pdf" rel="noopener" target="_blank">Acepta solicitud de baja M.P. N° 053/029/035/102/002</a>'
          },
          {
            res: "062",
            fecha: "15/04/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_062-1.pdf" rel="noopener" target="_blank">Establece prórroga para el pago de matrícula año 2016. Modifica resolución N° 058</a>'
          },
          {
            res: "061",
            fecha: "11/04/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_061.pdf" rel="noopener" target="_blank">Otorga M.P. N° 244</a>'
          },
          {
            res: "060",
            fecha: "23/03/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_060.pdf" rel="noopener" target="_blank">Convoca a elecciones y designa miembros de la junta electoral</a>'
          },
          {
            res: "059",
            fecha: "23/03/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_059.pdf" rel="noopener" target="_blank">Otorga M.P. N° 241 a 243</a>'
          },
          {
            res: "058",
            fecha: "21/03/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_058.pdf" rel="noopener" target="_blank">Aprueba aranceles varios año 2016</a>'
          },
          {
            res: "057",
            fecha: "11/03/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_057.pdf" rel="noopener" target="_blank">Otorga M.P. N° 239 y 240</a>'
          },
          {
            res: "056",
            fecha: "08/02/2016",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_056.pdf" rel="noopener" target="_blank">Otorga M.P. N° 235 a 238</a>'
          },
          {
            res: "055",
            fecha: "17/12/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_055.pdf" rel="noopener" target="_blank">Otorga M.P. N° 234</a>'
          },
          {
            res: "054",
            fecha: "30/11/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_054.pdf" rel="noopener" target="_blank">Otorga M.P. N° 232 y 233</a>'
          },
          {
            res: "053",
            fecha: "09/10/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_053.pdf" rel="noopener" target="_blank">Otorga M.P. N° 229 a 231</a>'
          },
          {
            res: "052",
            fecha: "25/09/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_0521.pdf" rel="noopener" target="_blank">Determina reducción de Matrícula 4° trimestre</a>'
          },
          {
            res: "051",
            fecha: "25/09/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_0511.pdf" rel="noopener" target="_blank">Autoriza apertura Cuenta Corriente Banco Patagonia</a>'
          },
          {
            res: "050",
            fecha: "11/09/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_0501.pdf" rel="noopener" target="_blank">Otorga M.P. N° 227 y 228</a>'
          },
          {
            res: "049",
            fecha: "28/08/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_049.pdf" rel="noopener" target="_blank">Otorga M.P. N° 223 a 226</a>'
          },
          {
            res: "048",
            fecha: "14/08/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_048.pdf" rel="noopener" target="_blank">Otorga M.P. N° 218 a 222</a>'
          },
          {
            res: "047",
            fecha: "16/07/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_047.pdf" rel="noopener" target="_blank">Otorga M.P. N° 214 a 217</a>'
          },
          {
            res: "046",
            fecha: "10/07/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_046.pdf" rel="noopener" target="_blank">Otorga M.P. N° 211 a 213 (Art. 1) y otorga M.P. en Especialidad Adicional a M.P. 135 (Art.2)</a>'
          },
          {
            res: "045",
            fecha: "26/06/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_045.pdf" rel="noopener" target="_blank">Otorga M.P. N° 210</a>'
          },
          {
            res: "044",
            fecha: "10/06/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_044.pdf" rel="noopener" target="_blank">Otorga M.P. N° 206 a 209</a>'
          },
          {
            res: "043",
            fecha: "03/06/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/09/CITDF_Resolucion_043.pdf" rel="noopener" target="_blank">Otorga M.P. N° 203 a 205</a>'
          },
          {
            res: "042",
            fecha: "04/05/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2015/05/CITDF_Resolucion_042.pdf" rel="noopener" target="_blank">Otorga M.P. N° 201 y 202</a>'
          },
          {
            res: "041",
            fecha: "14/04/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2015/05/CITDF_Resolucion_041.pdf" rel="noopener" target="_blank">Otorga M.P. N° 199 y 200</a>'
          },
          {
            res: "040",
            fecha: "13/04/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2015/05/CITDF_Resolucion_040.pdf" rel="noopener" target="_blank">Otorga M.P. N° 186 y 194 a 198</a>'
          },
          {
            res: "039",
            fecha: "30/03/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2015/05/CITDF_Resolucion_039.pdf" rel="noopener" target="_blank">Otorga M.P. N° 187 a 193</a>'
          },
          {
            res: "038",
            fecha: "12/01/2015",
            concepto: '<a href="http://documentos.citdf.org.ar/2015/01/CITDF_Resolucion_038.pdf.pdf" rel="noopener" target="_blank">Otorga M.P. N° 184 y 185</a>'
          },
          {
            res: "037",
            fecha: "27/11/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2015/01/CITDF_Resolucion_037.pdf.pdf" rel="noopener" target="_blank">Otorga M.P. N° 181 a 183</a>'
          },
          {
            res: "036",
            fecha: "19/11/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_036.pdf" rel="noopener" target="_blank">Ratifica acción de inconstitucionalidad y medida cautelar</a>'
          },
          {
            res: "035",
            fecha: "18/11/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_035.pdf" rel="noopener" target="_blank">Otorga M.P. N° 176 a 180</a>'
          },
          {
            res: "034",
            fecha: "17/11/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2015/01/CITDF_Resolucion_034.pdf.pdf" rel="noopener" target="_blank">Establece arancel del trámite de Registro de Encomienda de Tareas Profesionales</a>'
          },
          {
            res: "033",
            fecha: "17/11/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2015/01/CITDF_Resolucion_033.pdf.pdf" rel="noopener" target="_blank">Otorga M.P. N° 172 a 175</a>'
          },
          {
            res: "032",
            fecha: "01/11/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_032.pdf" rel="noopener" target="_blank">Baja firmas autorizadas Cuenta Corriente BTF</a>'
          },
          {
            res: "031",
            fecha: "16/09/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_031.pdf" rel="noopener" target="_blank">Otorga M.P. N° 171</a>'
          },
          {
            res: "030",
            fecha: "09/09/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2018/06/CITDF_Resolucion_030.pdf" rel="noopener" target="_blank">Otorga M.P. N° 167 a 170</a>'
          },
          {
            res: "029",
            fecha: "17/09/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_029.pdf" rel="noopener" target="_blank">Otorga M.P. N° 165 y 166</a>'
          },
          {
            res: "028",
            fecha: "15/09/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_028.pdf" rel="noopener" target="_blank">Otorga M.P. N° 162 a 164</a>'
          },
          {
            res: "027",
            fecha: "04/09/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_027.pdf" rel="noopener" target="_blank">Crea el Registro de Encomienda de Tareas Profesionales/ Firmas</a>'
          },
          {
            res: "026",
            fecha: "04/09/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_026.pdf" rel="noopener" target="_blank">Otorga M.P. N° 159 a 161</a>'
          },
          {
            res: "025",
            fecha: "19/08/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_025.pdf" rel="noopener" target="_blank">Oficializa la única lista (N°1)</a>'
          },
          {
            res: "024",
            fecha: "31/07/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_024.pdf" rel="noopener" target="_blank">Otorga M.P. N° 156 a 158</a>'
          },
          {
            res: "023",
            fecha: "30/07/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_023.pdf" rel="noopener" target="_blank">Otorga M.P. N° 148 a 155</a>'
          },
          {
            res: "022",
            fecha: "04/07/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_022.pdf" rel="noopener" target="_blank">Acepta propuesta de Asesoramiento Profesional del Dr. Fernando Horacio Domínguez Pose</a>'
          },
          {
            res: "021",
            fecha: "03/07/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_021.pdf" rel="noopener" target="_blank">Otorga M.P. N° 144 a 147</a>'
          },
          {
            res: "020",
            fecha: "09/06/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_020.pdf" rel="noopener" target="_blank">Otorga M.P. N° 138 a 143</a>'
          },
          {
            res: "019",
            fecha: "04/06/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_019.pdf" rel="noopener" target="_blank">Establece arancel del trámite de Certificación de Firmas</a>'
          },
          {
            res: "018",
            fecha: "26/05/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_018.pdf" rel="noopener" target="_blank">Establece valor punitorio por atraso en el pago de la matrícula</a>'
          },
          {
            res: "017",
            fecha: "26/05/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_017.pdf" rel="noopener" target="_blank">Crea el Registro de Certificaciones. Designa integrantes del Consejo Superior y Certificadores de firmas</a>'
          },
          {
            res: "016",
            fecha: "26/05/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_016.pdf" rel="noopener" target="_blank">Otorga M.P. N° 131 a 137</a>'
          },
          {
            res: "015",
            fecha: "17/04/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_015.pdf" rel="noopener" target="_blank">Otorga M.P. N° 127 a 130</a>'
          },
          {
            res: "014",
            fecha: "08/04/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_014.pdf" rel="noopener" target="_blank">Otorga M.P. N° 115 a 126</a>'
          },
          {
            res: "013",
            fecha: "01/03/2014",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_013.pdf" rel="noopener" target="_blank">Otorga M.P. N° 096 a 114</a>'
          },
          {
            res: "012",
            fecha: "02/11/2013",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_012.pdf" rel="noopener" target="_blank">Otorga M.P. N° 063 a 095</a>'
          },
          {
            res: "011",
            fecha: "03/08/2013",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_011.pdf" rel="noopener" target="_blank">Otorga M.P. N° 057 a 062</a>'
          },
          {
            res: "010",
            fecha: "29/06/2013",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_010.pdf" rel="noopener" target="_blank">Otorga M.P. N° 052 a 056</a>'
          },
          {
            res: "009",
            fecha: "18/05/2013",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_009.pdf" rel="noopener" target="_blank">Otorga M.P. N° 049 a 051</a>'
          },
          {
            res: "008",
            fecha: "16/05/2013",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_008.pdf" rel="noopener" target="_blank">Otorga M.P. N° 037 a 048</a>'
          },
          {
            res: "007",
            fecha: "20/04/2013",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_007.pdf" rel="noopener" target="_blank">Otorga M.P. N° 034 a 036</a>'
          },
          {
            res: "006",
            fecha: "23/03/2013",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_006.pdf" rel="noopener" target="_blank">Otorga M.P. N° 030 a 033</a>'
          },
          {
            res: "005",
            fecha: "13/02/2013",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_005.pdf" rel="noopener" target="_blank">Otorga M.P. N° 024 a 029</a>'
          },
          {
            res: "004",
            fecha: "22/11/2012",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_004.pdf" rel="noopener" target="_blank">Otorga M.P. N° 020 a 023</a>'
          },
          {
            res: "003",
            fecha: "08/11/2012",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_003.pdf" rel="noopener" target="_blank">Otorga M.P. N° 015 a 019</a>'
          },
          {
            res: "002",
            fecha: "04/10/2012",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_002.pdf" rel="noopener" target="_blank">Otorga M.P. N° 001 a 014</a>'
          },
          {
            res: "001",
            fecha: "04/10/2012",
            concepto: '<a href="http://documentos.citdf.org.ar/2014/10/CITDF_Resolucion_001.pdf" rel="noopener" target="_blank">Autoriza apertura Cuenta Corriente Banco Galicia. Autoriza firmantes esquema doble firma</a>'
          },
        ],
        spinner:false
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
