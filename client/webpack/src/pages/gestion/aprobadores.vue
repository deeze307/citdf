<template>
  <section>
    <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
      <h2 class="display-1 font-weight-light" style="color:#263238">Aprobadores de Trámites</h2>
    </v-flex>
    <v-layout row>
      <v-flex xs12 sm12 md3 lg3 xl3 offset-md1 offset-lg1 offset-xl1>
      <v-text-field
        v-model="buscarAprobador"
        label="Buscar Aprobador"
        append-icon="search"
      ></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout align-center justify-space-around row fill-height>
      <!-- Datatable -->
      <v-flex xs12 sm12 md10 lg10 xl10>
          <v-data-table
          :headers="headersAprobadores"
          :items="aprobadores.payload"
          :loading="aprobadoresLoading"
          loading-text="Cargando... espere por favor"
          :search="buscarAprobador"
          no-data-text="No hay Aprobadores Registrados"
          class="elevation-1"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'first_page',
            lastIcon: 'last_page',
            prevIcon: 'chevron_left',
            nextIcon: 'chevron_right'
          }"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Aprobadores de Trámites</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <div class="flex-grow-1"></div>
                <!-- COMPONENTE AGREGAR NUEVO TRAMITE -->
                <Dialog :dialog="dialogFormAprobadores" />
                <!-- / COMPONENTE AGREGAR NUEVO TRAMITE -->
              </v-toolbar>
            </template>
            <template v-slot:[`item.active`]="{item}">
              <v-icon small color="success" v-if="item.active === 1">done</v-icon>
              <v-icon small v-else color="error">block</v-icon>
            </template>  
            <template v-slot:[`item.action`]="{item}">
              <v-icon small @click="editApprover(item)">edit</v-icon>
              <v-icon small @click="deleteApprover(item)">delete</v-icon>
            </template>          
          </v-data-table>
      </v-flex>
      <!-- ./Datatable -->
      
    </v-layout>

    <!-- Pagination -->
    <!-- ./Pagination -->
  </section>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Dialog from '@/components/Dialog'

export default {
  components: { Dialog},
  data () {
    return {
      headersAprobadores: [
        { text: '#ID', value: 'id' , sortable: true, align: 'center' , width:'10%'},
        { text: 'Aprobador', value: 'matriculado.display_name' , sortable: true, align: 'center' , width:'60%'},
        { text: 'Activo', value: 'active' , sortable: true, align: 'center' , width:'10%'},
        { text: 'Gestionar', value: 'action' , sortable: false, align: 'center' , width:'20%'},
      ],
      matriculadoSelected:[],
      matriculadosResult:[],
      matriculadosOrigen:[],
      buscarAprobador:'',
      aprobadoresItems:[],
      valid:true,
      lazy: false,
      count:0,
      pages:0,
      dialog:false,
      dialogTramite:false,
      dialogNuevoAprobador:false,
      dialogTicket:false,
      editarAprobador:false,
      editedItem:{
        id:'',
        userId:'',
        tramite:'',
        nota:'',
        valor:0,
        status:'',
        createdAt:''
      },
      aprobador: {
        id:'',
        userId:'',
        tramite:'',
        nota:'',
        valor:0,
        status:'',
        createdAt:''
      },
      page: 1,
      aprobadoresLoading:false,
      saving:false,
      loadingMatriculados:false,
      working:false,
      error: false,
      error_message: '',
      details_loading: false,
      bonificacion:'',
      // Importador
      file: [],
      dialogFormAprobadores: {
        open: false,
        maxWidth: '500px',
        buttonText: 'Agregar Aprobador',
        component: 'NuevoAprobadorForm',
        data: {
          editarAprobador: false,
          form: {}
        }
      },
    }
  },
  mounted:function(){
    window.scrollTo(0, 0);
  },
  created: function(){
    store.dispatch("APROBADORES_retrieveAll")
    let params = {ciudad:"Todos", titulo_profesional:"Todos", admin:false};
    store.dispatch('MATRICULADOS_retrieveAll',params)
    this.loadingMatriculados = true
  },
  computed:{
    aprobadores () {
      return store.state.aprobadores.items
    },
    user(){
      return store.state.login_api.user
    },
  },
  watch:{
    matriculados(val){
      if(val.payload){
        let withNoAdmin = val.payload.filter((matriculado)=>{
          // Quito los perfiles que no son de matriculados.
          if(matriculado && matriculado.matricula) return matriculado
        })
        this.matriculadosResult = withNoAdmin;
        this.loadingMatriculados = false
      }
    },
    tramites(val){
      // this.tramiteStatusChanged(val.payload);
      if(val.payload){
        this.tramitesExport = val.payload;
        this.tramitesLoading = false;
      }
    },

    user(val){
    },
    "nuevoTramiteItem.tramite"(val){
      if(val!== ""){
        this.calculateCost()
      }
    }
  },
  methods:{
      matriculadosFilter(item, queryText, itemText) {
        const textOne = item.matricula.toLowerCase()
        const textTwo = item.display_name.toLowerCase()
        
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
      },
      statusColor(status){
        switch(status){
          case "Cancelado": return "red";
          case "Completado": return "green";
          case "Pagado": return "green";
          case "En Proceso": return "yellow darken-3";
          case "Pendiente" : return "grey";
        }
      },
      showTramite (item) {
        this.editedIndex = this.tramitesItems.payload.indexOf(item)
        this.editedItem = Object.assign({}, item)

        this.dialogTramite = true
      },
      closeDialogTramite(update) {
        this.dialogTramite = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
        if(update){
          this.changeState(this.editedItem,"Cancelar");
        }
      },
      closeDialogNuevoTramite(create) {
        this.dialogNuevoTramite = false;
        this.editarTramite = false
        setTimeout(() => {
          this.nuevoTramiteItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    closeDialogTicket () {
      this.dialogTicket = false;
    },
    closeDialogObservaciones () {
      this.observacionItem = Object.assign({}, this.defaultItem);
      this.dialogObservaciones = false;
    },
    showTicket(item){
      this.ticketItem = item;
      this.dialogTicket = true
    },
    showObservation(item){
      this.observacionItem = item;
      this.dialogObservaciones = true
    },
    editApprover(item){
      
      this.nuevoTramiteItem = item
      this.nuevoTramiteItem.matriculado = this.matriculadosResult.filter(matriculado => matriculado.documento_nro == item.documentoNro)
      this.nuevoTramiteItem.matriculado = this.nuevoTramiteItem.matriculado[0]
      this.editarTramite = true;
      this.dialogNuevoTramite = true
      this.dialogFormAprobadores= {
        ...this.dialogFormAprobadores,
        open: true,
        data: {
          editarAprobador: true,
          form: item
        }
      }
      console.log('dialogFormAprobadores', this.dialogFormAprobadores)
    },
    deleteApprover(item){
      // todavia falta desarrollar esto
    }
  }
}
</script>

<style>

</style>
