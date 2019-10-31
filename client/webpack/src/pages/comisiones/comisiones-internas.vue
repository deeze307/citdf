<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h1 class="display-2 font-weight-black" style="color:#263238">Comisiones Internas</h1>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl6>
          <p class="text-center">Las mismas se encuentran formadas por los profesionales del actual Consejo Superior y matriculados.</p>
          <hr class="mb-3">

          <h3 class=".subheading font-weight-bold mb-2">COMISIÓN I: De ejercicio profesional</h3>
          <p>Ing. Zárate, Fabio<br>
          Ing. Fried, Gustavo Roberto<br>
          Ing. Domato, Marcelo<br>
          Ing. Bianciotto, Ricardo</p>

          <h3 class=".subheading font-weight-bold mb-2">COMISIÓN II: De habilitación profesional</h3>
          <p>Zárate, Fabio Adrian<br>
          Domato, Marcelo Fabián<br>
          Fried, Gustavo Roberto</p>

          <h3 class=".subheading font-weight-bold mb-2">COMISIÓN III: De relaciones Institucionales</h3>
          <p>Obreque, Mónica Ester<br>
          Cellamare, Antonio<br>
          Haehnel, Guillermo Federico</p>

          <h3 class=".subheading font-weight-bold mb-2">COMISIÓN IV: De defensa y promoción profesional</h3>
          <p>Obreque, Mónica Ester<br>
          Bianciotto, Ricardo Aníbal<br>
          Fank, Vicente Antonio</p>

          <h3 class=".subheading font-weight-bold mb-2">COMISIÓN V: De aranceles y honorarios</h3>
          <p>Domato, Marcelo Fabián<br>
          Fried, Gustavo Roberto<br>
          Assenti, Carlos Leopoldo</p>

          <h3 class=".subheading font-weight-bold mb-2">COMISIÓN VI: De programación de cursos y conferencias</h3>
          <p>Fassi, Guillermo Raúl<br>
          Caliva, Inés Alejandra<br>
          Fornari, Sergio Alberto<br>
          Fernández, Sergio Ariel</p>
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
