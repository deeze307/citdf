<template>
    <v-container>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h1 class="display-2 font-weight-black" style="color:#263238">Trámites</h1>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h2 class="display-1 font-weight-light" style="color:#263238">Estado de Trámites</h2>
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
                  <v-chip v-if="isNaN(item.status)" v-bind:class="{ 'pl-1 pr-2': _.endsWith(item.status, 'Pendiente') }" :color="statusColor(item.status)" dark>
                    {{ item.status }}
                    <v-icon v-if="item.status === 'En Proceso' || _.endsWith(item.status,'Pendiente')" small right>autorenew</v-icon>
                    <v-icon v-if="item.status === 'Cancelado' || item.status === 'Rechazado'" small right>block</v-icon>
                    <v-icon v-if="item.status === 'Completado'" small right>done</v-icon>
                    <v-icon v-if="item.status === 'Pendiente'" small right>alarm</v-icon>
                  </v-chip>
                </template>
                <template v-slot:[`item.docFileUrl`]="{item}">
                  <v-btn v-if="item.docFileUrl" x-small :href="item.docFileUrl" target="_blank" fab color="primary"><v-icon>attach_file</v-icon></v-btn>
                </template>
                <template  v-slot:[`item.nota`]="{item}">
                  <v-btn v-if="item.nota && item.nota !== '' && (item.status === 'Rechazado' || item.status === 'Cancelado')" small fab text color="yellow darken-3" @click="showObservation(item)">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">sms_failed</v-icon>
                      </template>
                      <span>{{ item.nota }}</span>
                    </v-tooltip>
                  </v-btn>
                </template>
                <template  v-slot:[`item.observaciones`]="{item}">
                  <v-btn v-if="item.observaciones && item.observaciones !== ''" small fab text color="blue" @click="showObservation(item)">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">visibility</v-icon>
                      </template>
                      <span>{{ item.observaciones }}</span>
                    </v-tooltip>
                  </v-btn>
                </template>
                <template v-slot:[`item.action`]="{item}">
                  <v-btn v-if="item.status ==='Pago Pendiente'" small class="mr-2" fab text color="green" @click="goToPay(item.id)">
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">attach_money</v-icon>
                      </template>
                      <span>Pagar</span>
                    </v-tooltip>
                  </v-btn>
                  <v-btn v-if="item.status ==='Rechazado'" small class="mr-2" fab text color="red" @click="editTramite(item)">
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
                <!-- <template v-slot:[`item.nota`]="{item}">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" v-if="item.status === 'Cancelado'" small text fab color="indigo" @click="showNota(item)"><v-icon>sms_failed</v-icon></v-btn>
                    </template>
                    <span>Ver Nota</span>
                  </v-tooltip>
                </template> -->
            </v-data-table>
        </v-flex>
        <!-- ./Datatable -->
        
      </v-layout>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="mt-5 pt-5 pb-4">
        <h2 class="display-1 font-weight-light" style="color:#263238">Mis Págos</h2>
      </v-flex>
      <v-layout row>
        <v-flex xs12 sm12 md3 lg3 xl3 offset-md1 offset-lg1 offset-xl1>
        <v-text-field
          v-model="buscarPago"
          label="Buscar Pago"
          append-icon="search"
        ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md3 lg3 xl3 offset-md1 offset-lg1 offset-xl1>
          <v-btn color="blue darken-1" small dark @click="goToPay" > <v-icon left>attach_money</v-icon> Nuevo Págo</v-btn>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-space-around row fill-height>
        <!-- Datatable -->
        <v-flex xs12 sm12 md10 lg10 xl10>
            <v-data-table
            :headers="headersPagos"
            :items="pagos.payload"
            :loading="pagosLoading"
            loading-text="Cargando... espere por favor"
            :search="buscarPago"
            no-data-text="No hay Pagos Registrados"
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
                  <v-dialog v-model="dialogTicket" max-width="400px">
                    <v-card text-center>
                      <v-card-title>
                        <span class="title" text-center>Comprobante de Pago  #{{ticketItem.id}} <v-icon>receipt</v-icon></span>
                      </v-card-title>
                      <v-card-text>
                        <div><span><strong>Ticket de Transacción:</strong></span> {{ ticketItem.pago_id }}</div>
                        <div><span><strong>Concepto:</strong></span> {{ ticketItem.description }}</div>
                        <div><span><strong>Monto:</strong></span>${{ ticketItem.transaction_amount }}</div>
                        <div><span><strong>Nro Documento:</strong></span> {{ ticketItem.documento_nro }}</div>
                        <div><span><strong>Nro Matrícula:</strong></span> {{ ticketItem.matriculaNro }}</div>
                        <div><span><strong>Medio de Pago:</strong></span> {{ ticketItem.medio_pago }}</div>
                        <div><span><strong>Url factura Afip:</strong></span> {{ ticketItem.factura_afip }}</div>
                        <div><span><strong>Observaciones:</strong></span> {{ ticketItem.observaciones }}</div>
                        <div><span><strong>Fecha de Pago:</strong></span> {{ ticketItem.createdAt | fechaConHora }}</div>
                      </v-card-text>
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" text @click="closeDialogTicket">Aceptar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template> 
                <template v-slot:[`item.status`]="{item}">
                  <v-chip :color="statusColor(item.status)" dark>{{ item.status }}</v-chip>
                </template>
                <template v-slot:[`item.comprobante_url`]="{item}">
                  <v-btn small fab text color="light-blue" @click="showTicket(item)"><v-icon>receipt</v-icon>{{item.comp}}</v-btn>
                </template>
                <template v-slot:[`item.factura_afip`]="{item}">
                  <v-btn small fab text color="light-blue"><v-icon>eye</v-icon>{{item.factura_afip}}</v-btn>
                </template>
                <template v-slot:[`item.createdAt`]="{item}">
                  {{ item.createdAt | fechaConHora }}
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
          { text: 'N° Trámite', value: 'id' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Trámite', value: 'tramite' , sortable: true, align: 'center' , width:'30%'},
          { text: 'Notas', value: 'nota' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Observaciones', value: 'observaciones' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Estado', value: 'status' , sortable: true, align: 'center' , width:'20%'},
          { text: '', value: 'action' , sortable: false, align: 'center' , width:'5%'},
          { text: 'Adjunto', value: 'docFileUrl' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Fecha de Solicitud', value: 'createdAt' , sortable: true, align: 'center' , width:'20%'},
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
          showButton: true,
          component: 'NuevoTramiteForm',
          data: {
            origin: 'user',
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
      pagoItem:{
        get() {
          return store.state.pagos.pagoItem
        },
        set(val) {
          store.state.pagos.pagoItem = val
        }
      },
      _dialog () {
        return store.state.dialog.dialog
      },
      user() {
        let usuario = store.state.login_api.user;
        console.log("Usuario: ",usuario)
        if(usuario.user){
          store.dispatch("TRAMITES_retrieveAll",{documentoNro:usuario.user.custom_fields.documento_nro})
          store.dispatch("PAGOS_retrieveAll",usuario.user.custom_fields.documento_nro)
        };
        return usuario
      }
    },
    watch:{
      tramites(){
        this.tramitesLoading=false;
      },
      user(perfil){
        store.dispatch("TRAMITES_retrieveAll",{documentoNro:perfil.user.custom_fields.documento_nro})
        store.dispatch("PAGOS_retrieveAll",perfil.user.custom_fields.documento_nro)
      },
      pagos(){
        this.pagosLoading=false;
      },
      _dialog: {
        handler (d) {
          if (!d.open) {}
        },
        deep: true
      }
    },
    methods:{
      showObservation(item){},
      statusColor(status){
        switch(status){
          case "Cancelado": return "red";
          case "Rechazado": return "red";
          case "Completado": return "green";
          case "Pagado": return "green";
          case "En Proceso": return "yellow darken-3";
          case "Aprobación Pendiente" : return "indigo darken-3";
          case "Revisión Pendiente" : return "yellow darken-3";
          case "Pago Pendiente" : return "grey";
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
      goToPay(desdeTramite=null){
        if(desdeTramite) {
          this.pagoItem = {
            tramite: desdeTramite,
            matriculadoId: this.user.user.id} 
        } else {
          this.pagoItem = {
            tramite: null,
            matriculadoId: null
          }
        }
        console.log('pagar', this.pagoItem)
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
        this.dialogFormTramite = {
          ...this.dialogFormTramite,
          open: true,
          data: {
            origin: 'user',
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
      }
    }
}
</script>

<style>

</style>
