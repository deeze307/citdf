<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h1 class="display-2 font-weight-black" style="color:#263238">Departamentos por Especialidad</h1>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl6>
          <p class="text-center">Los mismos se encuentran formados por profesionales matriculados del Colegio de Ingenieros de Tierra del Fuego.</p>
          <hr class="mb-3">

          <h3 class=".subheading font-weight-bold mb-2 pt-4">Departamento Ingeniería Civil y Construcciones</h3>
          <p>
            Representante Titular Interino: Ing. Ricardo Bianciotto<br>
            Representante Suplente: A designar<br>
            <br>
            Área Construcciones<br>
            Área Vías de Comunicación<br>
            Área Hidráulica<br><br>
            <a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_070.pdf" target="_blank">Resolución Nº 070. 16 de Julio de 2016</a>
          </p>

          <h3 class=".subheading font-weight-bold mb-2 pt-4">Departamento Electromecánica</h3>
          <p>Representante Titular: Ing. Horacio Salvañá<br>
          Representante Suplente: A designar<br>
          Representante Área Eléctrica: Ing. Javier Sánchez<br>
          Representante Área Mecánica: A designar<br>
          Representante Área Electrónica: A designar<br>
          Representante Área Industrial: A designar<br><br>
          <a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_072.pdf" target="_blank">Resolución Nº 072. 16 de Julio de 2016</a>
          </p>

          <h3 class=".subheading font-weight-bold mb-2 pt-4">Departamento de Ciencias Naturales</h3>
          <p>
            Representante Titular: A designar<br>
            Representante Suplente: A designar<br><br>
            <a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_071.pdf" target="_blank">Resolución Nº 071. 11 de Julio de 2016</a>
          </p>

          <h3 class=".subheading font-weight-bold mb-2 pt-4">Departamento de Sistemas</h3>
          <p>
            Representante Titular: Ing. Daniel Villanueva Quelín<br>
            Representante Suplente: A designar<br><br>
            <a href="http://wordpress.citdf.org.ar/wp-content/uploads/2014/09/CITDF_resolucion_073.pdf" target="_blank">Resolución Nº 073. 16 de Julio de 2016</a>
          </p>

          <h3 class=".subheading font-weight-bold mb-2 pt-4">Departamento de Seguridad e Higiene</h3>
          <p>
            Representante: Ing. Mónica Frías<br>
            Representante Suplente: A designar<br><br>
            <a href="http://wordpress.citdf.org.ar/wp-content/uploads/2017/08/CITDF_Resolucion_116.pdf" target="_blank">Resolución Nº 116. 21 de Diciembre de 2017</a>
          </p>
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
        headers: [
          { text: 'Matricula', value: 'matricula' , sortable: false, align: 'center' },
          { text: 'Apellidos', value: 'apellidos' , sortable: false, align: 'center' },
          { text: 'Nombres', value: 'nombres' , sortable: false, align: 'center' },
          { text: 'Documento Nro', value: 'documento_nro' , sortable: false, align: 'center' },
          { text: 'Título', value: 'titulo_profesional' , sortable: false, align: 'center' },
          { text: 'Ciudad', value: 'ciudad' , sortable: false, align: 'center' },
          { text: 'Res', value: 'res' , sortable: false, align: 'center' }
        ],
        response: [{
          'matricula':'001',
          'apellidos':'Zárate',
          'nombres':'Fabio Adrián',
          'documento_nro':'16.206.023',
          'titulo_profesional':'Ingeniero Civil',
          'ciudad':'RG',
          'res':'002',
        },
        {
          'matricula':'334',
          'apellidos':'Zossi',
          'nombres':'Augusto',
          'documento_nro':'33.540.288',
          'titulo_profesional':'Ingeniero Civil',
          'ciudad':'USH',
          'res':'126',
        },
        {
          'matricula':'005',
          'apellidos':'Wallner',
          'nombres':'Daniel Antonio',
          'documento_nro':'12.879.900',
          'titulo_profesional':'Ingeniero en Construcciones',
          'ciudad':'RG',
          'res':'002',
        },
        {
          'matricula':'255',
          'apellidos':'Vélez',
          'nombres':'Claudio Marcelo',
          'documento_nro':'24.682.707',
          'titulo_profesional':'Ingeniero en Seguridad e Higiene',
          'ciudad':'RG',
          'res':'069',
        },
        {
          'matricula':'315',
          'apellidos':'Vukasovic',
          'nombres':'Ricardo Fabián',
          'documento_nro':'16.295.907',
          'titulo_profesional':'Ingeniero Forestál',
          'ciudad':'RG',
          'res':'118',
        }],
        empleos_categorias:[],
        count:0,
        pages:0,
        dialog:false,
        editedIndex: -1,
        editedItem:{
          titulo:'',
          descripcion:'',
          movil:'',
          email:'',
          empleos_categoria:{},
        },
        defaultItem: {
          titulo:'',
          descripcion:'',
          movil:'',
          email:'',
          empleos_categoria:{}
        },
        dialog_ops:{
          dialog: false,
          buttonName:"",
          dialogTitle:"Información de Empleo",
          dialogContent:[],
          icon:"visibility"
        },

        // apigw: process.env.TEU_API,
        page: 1,
        loading: false,
        saving:false,
        loadingCategorias:false,
        error: false,
        error_message: '',
        details_loading: false
      }
    },
    methods:{
        showMatriculado(matriculado){
            console.log("clickeado");
        }
    }
}
</script>

<style>

</style>
