<template>
    <v-container>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h1 class="display-2 font-weight-black" style="color:#263238">Aprobaciones</h1>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h2 class="display-1 font-weight-light" style="color:#263238">Estado de Aprobaciones</h2>
      </v-flex>
      <v-layout row>
        <v-flex xs12 sm12 md3 lg3 xl3 offset-md1 offset-lg1 offset-xl1>
        <v-text-field
          v-model="buscarTramite"
          label="Buscar Trámite"
          append-icon="search"
        ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md3 lg3 xl3 offset-md1 offset-lg1 offset-xl1>
          <Dialog :dialog="dialogFormTramite" />
        </v-flex>
      </v-layout>
      <v-layout align-center justify-space-around row fill-height>
        <!-- Datatable -->
        <v-flex xs12 sm12 md10 lg10 xl10>
            <v-data-table
            :headers="headersTramites"
            :items="tramites.payload"
            :loading="tramitesLoading"
            loading-text="Cargando... espere por favor"
            :search="buscarTramite"
            no-data-text="No hay Trámites Registrados"
            class="elevation-1"
            :footer-props="{
              showFirstLastPage: true,
              firstIcon: 'mdi-arrow-collapse-left',
              lastIcon: 'mdi-arrow-collapse-right',
              prevIcon: 'mdi-minus',
              nextIcon: 'mdi-plus'
            }"
            >
                <template v-slot:top>
                  <v-dialog v-model="dialogTramite" max-width="400px">
                    <v-card text-center>
                      <v-card-title>
                        <span class="title" text-center>Motivo de Cancelación</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          "{{editedItem.nota}}"
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" text @click="closeDialogTramite">Aceptar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template> 
                <template v-slot:[`item.status`]="{item}">
                  <v-chip :color="statusColor(item.status)" class="pl-1 pr-2" dark>
                    {{ item.status }}
                    <v-icon v-if="item.status === 'En Proceso' || _.endsWith(item.status,'Pendiente')" small right>autorenew</v-icon>
                    <v-icon v-if="item.status === 'Cancelado'" small right>block</v-icon>
                    <v-icon v-if="item.status === 'Completado'" small right>done</v-icon>
                    <v-icon v-if="item.status === 'Pendiente'" small right>alarm</v-icon>
                  </v-chip>
                </template>
                <template v-slot:[`item.docFileUrl`]="{item}">
                  <v-btn v-if="item.docFileUrl" x-small :href="item.docFileUrl" target="_blank" fab color="primary"><v-icon>attach_file</v-icon></v-btn>
                </template>
                <template  v-slot:[`item.observaciones`]="{item}">
                  <v-btn v-if="item.observaciones && item.observaciones !== ''" small fab text color="blue" @click="showObservation(item)"><v-icon>visibility</v-icon></v-btn>
                </template>
                <template v-slot:[`item.action`]="{item}">
                  <v-btn small class="mr-2" fab text color="info" @click="editTramite(item)">
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">edit</v-icon>
                      </template>
                      <span>Editar Trámite</span>
                    </v-tooltip>
                  </v-btn>
                </template>
                <template v-slot:[`item.createdAt`]="{item}">
                  {{ item.createdAt | fechaSinHora }}
                </template>
                <template v-slot:[`item.nota`]="{item}">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" v-if="item.status === 'Cancelado'" small text fab color="indigo" @click="showNota(item)"><v-icon>sms_failed</v-icon></v-btn>
                    </template>
                    <span>Ver Nota</span>
                  </v-tooltip>
                </template>
            </v-data-table>
        </v-flex>
        <!-- ./Datatable -->
        
      </v-layout>
    </v-container>
</template>

<script>
import router from '../../router'
import axios from 'axios'
import Dialog from '@/components/Dialog'

export default {
    components:{
      Dialog
    },
    data () {
      return {
        headersTramites: [
          { text: 'Trámite #', value: 'id' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Matricula', value: 'matriculaNro' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Trámite', value: 'tramite' , sortable: true, align: 'center' , width:'30%'},
          { text: 'Observaciones', value: 'observaciones' , sortable: false, align: 'center' , width:'8%'},
          { text: 'Estado', value: 'status' , sortable: true, align: 'center' , width:'25%'},
          { text: 'Adjunto', value: 'docFileUrl' , sortable: false, align: 'center' , width:'5%'},
          { text: 'Editar Trámite', value: 'action', sortable: false, align: 'center', width: '5%'  },
          { text: 'Fecha de Solicitud', value: 'createdAt' , sortable: true, align: 'center' , width:'17%'},
        ],
        headersPagos: [
          { text: '#ID', value: 'id' , sortable: true, align: 'center' , width:'10%'},
          { text: '#Ticket N°', value: 'pago_id' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Descripción', value: 'description' , sortable: true, align: 'center' , width:'30%'},
          { text: 'Valor', value: 'transaction_amount' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Comprobante', value: 'comprobante_url' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Factura', value: 'factura_afip' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Observaciones', value: 'observaciones' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Fecha de Pago', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
        ],
        buscarTramite:'',
        buscarPago:'',
        count:0,
        pages:0,
        dialog:false,
        dialogTicket:false,
        dialogObservaciones: false,
        editedIndex: -1,
        editedItem:{
          id:'',
          userId:'',
          tramite:'',
          nota:'',
          status:'',
          createdAt:'',
        },
        ticketItem:{
          id:'',
          pago_id:'',
          descripcion:'',
          transaction_amount:'',
          documento_nro:'',
          matriculaNro:'',
          factura_afip:'',
          medio_pago:'',
          observaciones:'',
          createdAt:''
        },
        defaultItem: {
          id:'',
          userId:'',
          tramite:'',
          nota:'',
          status:'',
          createdAt:'',
        },
        dialogTramite: false,
        dialogFormTramite: {
          open: false,
          maxWidth: '500px',
          buttonText: 'Nuevo Trámite',
          showButton: false,
          component: 'NuevoTramiteForm',
          data: {
            editarTramite: false,
            form: {}
          }
        },
        // apigw: process.env.TEU_API,
        page: 1,
        tramitesLoading:true,
        pagosLoading:true,
        loading: false,
        error: false,
        error_message: '',
      }
    },
    mounted:function(){
      window.scrollTo(0, 0)
    },
    created: function(){
          
    },
    computed:{
      matriculados(){
        this.matriculadosOrigen = store.state.matriculados.items;
        this.matriculadosResult = store.state.matriculados.items;
        return store.state.matriculados.items;
      },
      tramites(){
        return store.state.tramites.items
      },
      pagos(){
        return store.state.pagos.items
      },
      user() {
        let usuario = store.state.login_api.user;
        console.log("Usuario: ",usuario)
        if(usuario.user){
          store.dispatch("TRAMITES_retrieveAll",{documentoNro:null,status:4})
        };
        return usuario
      }
    },
    watch:{
      tramites(){
        this.tramitesLoading=false;
      },
      user(perfil){
        // store.dispatch("TRAMITES_retrieveAll",perfil.user.custom_fields.documento_nro)
      },
      pagos(){
        this.pagosLoading=false;
      }
    },
    methods:{
        statusColor(status){
          switch(status){
            case "Cancelado": return "red";
            case "Completado": return "green";
            case "Pagado": return "green";
            case "En Proceso": return "yellow darken-3";
            case "Pendiente" : return "grey";
            case "Aprobación Pendiente" : return "indigo darken-3"
          }
        },
        showNota (item) {
          this.editedIndex = this.$store.state.tramites.items.payload.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogTramite = true
        },
        closeDialogTramite () {
          this.dialogTramite = false;
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },
        closeDialogTicket () {
          this.dialogTicket = false;
          // setTimeout(() => {
          //   this.ticketItem = Object.assign({}, this.defaultItem)
          //   this.editedIndex = -1
          // }, 300)
        },
        showObservation(item){
          this.observacionItem = item;
          this.dialogObservaciones = true
        },
        goToPay(){
          router.push('/tramites/pagos')
        },
        showTicket(item){
          this.ticketItem = item;
          this.dialogTicket = true
        },
        createTramite(item){
          let vm = this;
          vm.working = true;
          item.nota = '';
          item.status = 1; // Estado "EN PROCESO"

          store.dispatch("TRAMITES_create",item).then(function(response){
            vm.working = false;
            if(response){
              vm.dialogNuevoTramite = false
              vm.nuevoTramiteItem = Object.assign({}, vm.defaultItem);
            }
          });
        },
        editTramite (item) {
          console.log('editTramite aprobaciones', item)
          this.dialogFormTramite = {
            ...this.dialogFormTramite,
            open: true,
            data: {
              origin: 'approver',
              editarTramite: true,
              form: item
            }
          }
        },
        updateTramite(item){
          let vm = this
          vm.dialogNuevoTramite = false;
          if(item.status === "En Proceso"){
            item.status = 1;
          }else if(item.status === "Completar"){
            item.status = 2;
          }else if (item.status === "Cancelar"){
            item.status = 3;
          }
          store.dispatch("TRAMITES_update",item).then( response => {
            vm.nuevoTramiteItem = Object.assign({}, vm.defaultItem);
          });
        },
    }
}
</script>

<style>

</style>
