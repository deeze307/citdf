<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238">Aranceles</h2>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl6>
          <p>El arancelamiento se encuentra relacionado con la aplicación en los mismos del valor del MÓDULO</p>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left" style="width:40%;">RUBRO</th>
                <th class="text-left" style="width:10%;">UNIDAD</th>
                <th class="text-left" style="width:50%;">CANTIDAD</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in aranceles" :key="item.rubro">
                <td>{{ item.rubro }}</td>
                <td>{{ item.unidad }}</td>
                <td>{{ item.cantidad }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <br>
          <p>*Los profesionales que se inscriban en el tercer trimestre de cada año, desde el mes de Julio hasta Septiembre, abonarán el 50% del monto establecido para el concepto de Derecho Anual de Colegiación. En tanto que los profesionales que se inscriban en el cuarto trimestre de cada año, desde Octubre hasta Diciembre, abonarán el 25% del Derecho Anual de Colegiación.</p>
          <p><a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_101.pdf" rel="noopener" target="_blank">Resolución 101 (2/8/2017)</a></p>
          <p><a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_079.pdf" rel="noopener" target="_blank">Resolución 79 (22/10/2016)</a></p>
          <br>
          <br>
          <h3 class=".subheading font-weight-bold">VALOR DEL DERECHO ANUAL DE COLEGIACIÓN 2020</h3>
          <br>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left" style="width:20%;">TRIMESTRE</th>
                <th class="text-left" style="width:40%;">FECHA</th>
                <th class="text-center" style="width:40%;">DERECHO ANUAL DE COLEGIACIÓN 2020</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in valor_colegiacion" :key="item.trimestre">
                <td>{{ item.trimestre }}</td>
                <td>{{ item.fecha }}</td>
                <td class="text-center">{{ item.valor }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <br>
          <br>
          <h3 class=".subheading font-weight-bold">VALOR DEL MÓDULO 2020</h3>
          <br>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left" style="width:20%;">TRIMESTRE</th>
                <th class="text-left" style="width:40%;">FECHA</th>
                <th class="text-center" style="width:40%;">VALOR DEL MÓDULO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in valor_modulo" :key="item.trimestre">
                <td>{{ item.trimestre }}</td>
                <td>{{ item.fecha }}</td>
                <td class="text-center">{{ item.valor }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <br>
          <span style="color: #0b4c83;">DESCUENTOS: </span> Se realizará una bonificación del 20% en el pago del Derecho Anual de Colegiación 2021 para aquellos matriculados que participen activamente y efectivamente en las actividades propuestas por el Colegio. Dicha participación será evaluada en la última reunión del año 2020 del CONSEJO SUPERIOR para hacer efectivo el dicho descuento.
          <br>
          <br>
          <span style="color: #0b4c83;">INFORMACIÓN IMPORTANTE: </span>se comunica a los Matriculados que el pago de cualquier trámite a presentar ante el colegio deberá poseer como máximo fecha de un mes anterior a la presentación del mismo (Certificaciones, Encomiendas de tareas, etc.), por lo tanto no se recibirán transferencias o depósitos realizados con anterioridad al plazo establecido.
          <br>
          <br>
          <span style="color: #0b4c83;">Para el retiro de la Credencial correspondiente, el profesional deberá entregar copia del talón de deposito o transferencia bancaria realizada.</span>
          <br>
          <br>
          <h3 class=".subheading font-weight-bold">FORMAS DE PAGO</h3>
          <br>
          A través de una transferencia electrónica a la cuenta del Colegio en el Banco Tierra del Fuego (ver cuenta en esta misma página).
          <br>
          <strong>Una vez efectuada la transferencia, el comprobante deberá remitirse al correo electrónico de la tesorería del Colegio <a href="mailto:tesoreria@citdf.org.ar">tesoreria@citdf.org.ar</a> con el formato nombreyapellido-numero de matricula-año (ejemplo: juanperez-035-2020).
          No se considerará pagada la matrícula si no se recibe el comprobante pago.</strong>
          <br>
          Si hubiese habido modificación de los datos de contacto (domicilio, teléfono, etc.), se solicita modificarlos en su perfíl de matriculado ingresando con sus credeciales correspondientes.
          <br>
          <br>
          <h3 class=".subheading font-weight-bold">CUENTA PARA DEPOSITO</h3>
              <strong>Banco de Tierra del Fuego<br>
              Razón Social: Colegio de Ingenieros de la Provincia Tierra del Fuego, AEIAS<br>
              CUIT: 30712472584<br>
              Cuenta: S 3 1 1 00000178653-00<br>
              CBU: 2680001301000001786531</strong>
          <br>
          <br>
          <br>
          <h3 class=".subheading font-weight-bold">A TRAVÉS DE LA PLATAFORMA DE PAGOS DE CITDF</h3>
          <strong>Se pueden realizar pagos ingresando con su usuario y contraseña provistos por el Colegio en la sección "Mis Trámites" y en el apartado "Mis pagos" puede generar un nuevo pago con tarjeta de débito o crédito.</strong>
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
            rubro:"Derecho Anual de Colegiación",
            unidad: "Módulo",
            cantidad:"5"
          },
          {
            rubro:"Menos de 1 año de recibido",
            unidad:"",
            cantidad:"bonificación del 50% en inscripción y derecho anual de colegiación (fecha de entrega del diploma)"
          }
        ],
        valor_colegiacion:[
          {
            trimestre:"1er trimestre", 
            fecha:"Hasta el 31 de Marzo",
            valor: "$ 6000"
          },
          {
            trimestre:"2do trimestre", 
            fecha:"Hasta el 30 de Junio",
            valor: "$ 6500"
          },
          {
            trimestre: "3er trimestre", 
            fecha:"Hasta el 30 de Septiembre",
            valor: "$ 7000"
          },
          {
            trimestre:"4to trimestre", 
            fecha:"Hasta el 31 de Diciembre",
            valor: "$ 7500"
          }
        ],
        valor_modulo:[
          {
            trimestre:"1er trimestre", 
            fecha:"Hasta el 31 de Marzo",
            valor: "$ 1200"
          },
          {
            trimestre:"2do trimestre", 
            fecha:"Hasta el 30 de Junio",
            valor: "$ 1300"
          },
          {
            trimestre: "3er trimestre", 
            fecha:"Hasta el 30 de Septiembre",
            valor: "$ 1400"
          },
          {
            trimestre:"4to trimestre", 
            fecha:"Hasta el 31 de Diciembre",
            valor: "$ 1500"
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
