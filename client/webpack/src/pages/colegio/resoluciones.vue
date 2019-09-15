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
          {
            res: "129",
            fecha: "26/06/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/Resolución-Nº129.pdf" rel="noopener" target="_blank">Otorga M.P. N° 336</a>'
          },
          {
            res: "128",
            fecha: "15/06/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_128.pdf" rel="noopener" target="_blank">Cambio de firmas Bco. TDF</a>'
          },
          {
            res: "127",
            fecha: "08/06/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_127.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 192</a>'
          },
          {
            res: "126",
            fecha: "04/06/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_126.pdf" rel="noopener" target="_blank">Otorga M.P. N° 334 y 335</a>'
          },
          {
            res: "125",
            fecha: "21/05/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_125.pdf" rel="noopener" target="_blank">Otorga M.P. N° 329 a 333</a>'
          },
          {
            res: "124",
            fecha: "23/04/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_124.pdf" rel="noopener" target="_blank">Otorga M.P. N° 327 y 328</a>'
          },
          {
            res: "123",
            fecha: "03/04/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_123.pdf" rel="noopener" target="_blank">Otorga M.P. N° 323 a 326</a>'
          },
          {
            res: "122",
            fecha: "03/04/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_122.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 175</a>'
          },
          {
            res: "121",
            fecha: "09/03/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_121.pdf" rel="noopener" target="_blank">Otorga M.P. N° 319 a 322</a>'
          },
          {
            res: "120",
            fecha: "21/02/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/04/Resolución-Nº120.pdf" rel="noopener" target="_blank">Aceptar solicitud de baja M.P. N° 301</a>'
          },
          {
            res: "119",
            fecha: "07/02/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/04/Resolución-Nº119.pdf" rel="noopener" target="_blank">Otorga M.P. N° 317 y 318</a>'
          },
          {
            res: "118",
            fecha: "09/01/2018",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/04/Resolución-Nº118.pdf" rel="noopener" target="_blank">Otorga M.P. N° 315 y 316</a>'
          },
          {
            res: "117",
            fecha: "22/12/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_117.pdf" rel="noopener" target="_blank">Designa a la Ing. Inés Caliva como certificadora temporal de firmas en la localidad de Rio Grande</a>'
          },
          {
            res: "116",
            fecha: "21/12/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_116.pdf" rel="noopener" target="_blank">Crear El Departamento de Higiene y Seguridad de Trabajo (D. I. H. y S. T.)</a>'
          },
          {
            res: "115",
            fecha: "21/12/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_115.pdf" rel="noopener" target="_blank">Establece valores de módulo y matricula para el año 2018</a>'
          },
          {
            res: "114",
            fecha: "21/12/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_114.pdf" rel="noopener" target="_blank">Otorga M.P. N° 314</a>'
          },
          {
            res: "113",
            fecha: "01/12/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_113.pdf" rel="noopener" target="_blank">Otorga M.P. N° 312 y 313</a>'
          },
          {
            res: "112",
            fecha: "16/11/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_112.pdf" rel="noopener" target="_blank">Otorga M.P. N° 311</a>'
          },
          {
            res: "111",
            fecha: "03/11/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_111.pdf" rel="noopener" target="_blank">Otorga M.P. N° 309 y 310</a>'
          },
          {
            res: "110",
            fecha: "20/10/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_110.pdf" rel="noopener" target="_blank">Otorga M.P. N° 305 a 308. Agrega a M.P. N° 039 la Especialidad Adicional en Higiene en Seguridad y Trabajo</a>'
          },
          {
            res: "109",
            fecha: "27/09/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_109.pdf" rel="noopener" target="_blank">Otorga M.P. N° 304</a>'
          },
          {
            res: "108",
            fecha: "07/09/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_108.pdf" rel="noopener" target="_blank">Otorga M.P. N° 300 a 303</a>'
          },
          {
            res: "107",
            fecha: "26/08/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_107.pdf" rel="noopener" target="_blank">Agrega a M.P. N° 027 la Especialidad Adicional en Higiene en Seguridad y Trabajo</a>'
          },
          {
            res: "106",
            fecha: "26/08/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_106.pdf" rel="noopener" target="_blank">Otorga licencia por tiempo indeterminado al Presidente Ing. Horacio Salvañá</a>'
          },
          {
            res: "105",
            fecha: "11/08/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_105.pdf" rel="noopener" target="_blank">Otorga M.P. N° 299</a>'
          },
          {
            res: "104",
            fecha: "10/08/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_104.pdf" rel="noopener" target="_blank">Otorga M.P. N° 298</a>'
          },
          {
            res: "103",
            fecha: "08/08/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_103.pdf" rel="noopener" target="_blank">Otorga M.P. N° 296 y 297</a>'
          },
          {
            res: "102",
            fecha: "08/08/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_102.pdf" rel="noopener" target="_blank">Otorga M.P. N° 295 por resolución judicial</a>'
          },
          {
            res: "101",
            fecha: "02/08/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_101.pdf" rel="noopener" target="_blank">Determina la reducción de la matrícula anual al 50% en el segundo trimestre de cada año</a>'
          },
          {
            res: "100",
            fecha: "19/07/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_100.pdf" rel="noopener" target="_blank">Otorga M.P. N° 294</a>'
          },
          {
            res: "099",
            fecha: "10/07/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_099.pdf" rel="noopener" target="_blank">Acepta la solicitud de baja M.P. N° 171</a>'
          },
          {
            res: "098",
            fecha: "06/07/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_098.pdf" rel="noopener" target="_blank">Otorga M.P. N° 291 a 293</a>'
          },
          {
            res: "097",
            fecha: "16/06/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_097.pdf" rel="noopener" target="_blank">Otorga M.P. N° 290</a>'
          },
          {
            res: "096",
            fecha: "18/05/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_096.pdf" rel="noopener" target="_blank">Otorga M.P. N° 288 Y 289</a>'
          },
          {
            res: "095",
            fecha: "02/05/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_RESOLUCION_095.pdf" rel="noopener" target="_blank">Acepta la solicitud de baja M.P. N° 243</a>'
          },
          {
            res: "094",
            fecha: "08/05/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_RESOLUCION_094.pdf" rel="noopener" target="_blank">Otorga M.P. N° 286 Y 287</a>'
          },
          {
            res: "093",
            fecha: "18/04/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_Resolucion_093.pdf" rel="noopener" target="_blank">Otorga M.P. N° 284 Y 285</a>'
          },
          {
            res: "092",
            fecha: "07/04/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_Resolucion_092.pdf" rel="noopener" target="_blank">Otorga M.P. N° 281 a 283</a>'
          },
          {
            res: "091",
            fecha: "28/03/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_Resolucion_091.pdf" rel="noopener" target="_blank">Otorga M.P. N° 279 Y 280</a>'
          },
          {
            res: "090",
            fecha: "13/03/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2018/06/CITDF_Resolucion_090.pdf" rel="noopener" target="_blank">Otorga M.P. N° 277 Y 278</a>'
          },
          {
            res: "089",
            fecha: "06/03/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_Resolucion_089.pdf" rel="noopener" target="_blank">Acepta la solicitud de baja M.P. N° 137</a>'
          },
          {
            res: "088",
            fecha: "03/03/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/RESOLUCION-N°088.pdf" rel="noopener" target="_blank">Acepta la solicitud de baja M.P. N° 014/051/079/142/164</a>'
          },
          {
            res: "087",
            fecha: "22/02/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/RESOLUCION-N°087.pdf" rel="noopener" target="_blank">Otorga M.P. N° 275 y 276</a>'
          },
          {
            res: "086",
            fecha: "08/02/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolusion_086.pdf" rel="noopener" target="_blank">Otorga M.P. N° 274</a>'
          },
          {
            res: "085",
            fecha: "27/01/2017",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolusion_085.pdf" rel="noopener" target="_blank">Otorga M.P. N° 273</a>'
          },
          {
            res: "084",
            fecha: "21/12/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_084.pdf" rel="noopener" target="_blank">Otorga M.P. N° 271 y 272</a>'
          },
          {
            res: "083",
            fecha: "24/11/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_083.pdf" rel="noopener" target="_blank">Otorga M.P. N° 269 y 270</a>'
          },
          {
            res: "082",
            fecha: "14/11/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_082.pdf" rel="noopener" target="_blank">Otorga M.P. N° 265 a 268</a>'
          },
          {
            res: "081",
            fecha: "10/11/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_081.pdf" rel="noopener" target="_blank">Otorga M.P. N° 263 y 264</a>'
          },
          {
            res: "080",
            fecha: "07/11/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_080.pdf" rel="noopener" target="_blank">Deniega el pedido de excepción de cumplir recaudos legales para lamatriculación al Ing. Sergio Amador López</a>'
          },
          {
            res: "079",
            fecha: "22/10/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_079.pdf" rel="noopener" target="_blank">Determina reducción de matrícula para el 3° y 4° trimestre del año 2017</a>'
          },
          {
            res: "078",
            fecha: "04/10/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_078.pdf" rel="noopener" target="_blank">Otorga M.P. N° 261 y 262</a>'
          },
          {
            res: "077",
            fecha: "27/09/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_077.pdf" rel="noopener" target="_blank">Otorga M.P. N° 260 Modifica resolución 076/16</a>'
          },
          {
            res: "076",
            fecha: "09/09/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_076.pdf" rel="noopener" target="_blank">Otorga M.P. N° 260</a>'
          },
          {
            res: "075",
            fecha: "09/09/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_075.pdf" rel="noopener" target="_blank">Otorga M.P. N° 259</a>'
          },
          {
            res: "074",
            fecha: "27/07/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_074.pdf" rel="noopener" target="_blank">Otorga M.P. N° 257 y 258</a>'
          },
          {
            res: "073",
            fecha: "16/07/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_073.pdf" rel="noopener" target="_blank">Crea Depto. De Sistemas</a>'
          },
          {
            res: "072",
            fecha: "16/07/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_072.pdf" rel="noopener" target="_blank">Crea Depto. De Electromecánica</a>'
          },
          {
            res: "071",
            fecha: "11/07/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_071.pdf" rel="noopener" target="_blank">Crea Depto. De Ciencias Naturales</a>'
          },
          {
            res: "070",
            fecha: "16/07/2016",
            concepto: '<a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_070.pdf" rel="noopener" target="_blank">Crea Depto. De Ingeniería Civíl y Construcciones</a>'
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
