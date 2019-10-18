<template>
    <v-container>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h1 class="display-2 font-weight-black" style="color:#263238">Gestión</h1>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h2 class="display-1 font-weight-light" style="color:#263238">Trámites de Matriculados</h2>
      </v-flex>
      <v-layout row>
        <v-flex xs12 sm12 md3 lg3 xl3 offset-md1 offset-lg1 offset-xl1>
        <v-text-field
          v-model="buscarTramite"
          label="Buscar Tramite"
          append-icon="search"
        ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md3 lg3 xl3 offset-md1 offset-lg1 offset-xl1>
          <download-excel
              :data   = "tramitesItems.payload"
              :fields = "headersTramitesExport"
              worksheet = "Trámites de Matriculados"
              name    = "Trámites de Matriculados.xls">
          <v-btn color="default" small> <v-icon left>cloud_download</v-icon> Descargar Trámites</v-btn>
          </download-excel>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-space-around row fill-height>
        <!-- Datatable -->
        <v-flex xs12 sm12 md10 lg10 xl10>
            <v-data-table
            :headers="headersTramites"
            :items="tramitesItems.payload"
            :loading="tramitesLoading"
            loading-text="Cargando... espere por favor"
            :search="buscarTramite"
            no-data-text="No hay datos"
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
                <v-toolbar flat color="white">
                  <v-toolbar-title>Trámites de Matriculados</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <div class="flex-grow-1"></div>
                  <v-dialog v-model="dialogNuevoTramite" max-width="400px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="blue darken-1" small dark v-on="on"> <v-icon left>post_add</v-icon> Registrar Trámite</v-btn>
                    </template>
                    <v-form
                      ref="form"
                      v-model="valid"
                      :lazy-validation="lazy"
                    >
                      <v-card text-center>
                        <v-card-title>
                          <span class="title" text-center>Registrar Nuevo Trámite</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <span class="font-weight-thin body-2">
                                Registre los trámites solicitados por los matriculados
                              </span>
                              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-select
                                  :items="tiposTramites"
                                  label="Seleccione el Tipo de Trámite"
                                  :rules="[v => !!v || 'Tipo de Trámite es requerido']"
                                  v-model="nuevoTramiteItem.tramite"
                                  required
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="mr-0">
                                <v-text-field 
                                  type="number"
                                  min="0"
                                  max="999999999"
                                  :rules="[v => (v && v.length <= 8) || 'El Nro de Documento debe tener más de 8 dígitos!']"
                                  v-model="nuevoTramiteItem.documentoNro" 
                                  label="DNI del Matriculado"
                                  hint="DNI sin puntuaciones"
                                  required></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="8" md="8" lg="8" xl="8" class="ml-0">
                                <div class="mt-6">
                                  Costo del Trámite: <span class="ml-2 title font-weight-black"> ${{ nuevoTramiteItem.valor }}</span>
                                  <span v-if="bonificacion !== ''">{{ bonificacion }}</span>
                                </div>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="red darken-1" text @click="closeDialogNuevoTramite">Cancelar</v-btn>
                          <v-btn color="blue darken-1" text @click="createTramite(nuevoTramiteItem)" :disabled="!valid">Aceptar</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-form>
                  </v-dialog>
                </v-toolbar>
                <v-dialog v-model="dialogTramite" max-width="400px">
                  <v-card text-center>
                    <v-card-title>
                      <span class="title" text-center>Motivo de Cancelación</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-textarea
                          v-model="editedItem.nota"
                          label="Ingrese Motivo de Cancelación de Trámite"
                          hint="Hint text"
                          counter=220
                        ></v-textarea>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="red darken-1" text @click="closeDialogTramite(false)">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="closeDialogTramite(true)">Aceptar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-if="!tramitesLoading" v-slot:item.status="{item}">
                <v-chip v-if="item.status != 1 && item.status != 2 && item.status != 3" :color="statusColor(item.status)" dark>
                  {{ item.status }}
                  <v-icon v-if="item.status === 'En Proceso'" small right>autorenew</v-icon>
                  <v-icon v-if="item.status === 'Cancelado'" small right>block</v-icon>
                  <v-icon v-if="item.status === 'Completado'" small right>done</v-icon>
                  <v-icon v-if="item.status === 'Pendiente'" small right>alarm</v-icon>
                </v-chip>
              </template>
              <template v-slot:item.valor="{item}">
                $ {{ item.valor }}
              </template>
              <template v-slot:item.createdAt="{item}">
                {{ item.createdAt | fechaSinHora }}
              </template>
              <template v-slot:item.action="{item}">
                <v-menu
                  transition="slide-y-transition"
                  offset-y
                  bottom
                  left
                  light
                >
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small text fab color="primary"><v-icon>settings_applications</v-icon></v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="changeState(item,'Completar')">
                      <v-list-item-title>Completar</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="changeState(item,'En Proceso')">
                      <v-list-item-title>En Proceso</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="showTramite(item)">
                      <v-list-item-title>Cancelar</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>          
            </v-data-table>
        </v-flex>
        <!-- ./Datatable -->
        
      </v-layout>


      <!-- Pagos de Matriculados -->
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-5 pb-4">
        <h2 class="display-1 font-weight-light" style="color:#263238">Pagos de Matriculados</h2>
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
          <download-excel
              :data   = "pagos.payload"
              :fields = "headersPagosExport"
              worksheet = "Pagos de Matriculados"
              name    = "Pagos de Matriculados.xls">
          <v-btn color="default" small> <v-icon left>cloud_download</v-icon> Descargar Pagos</v-btn>
          </download-excel>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-space-around row fill-height>
        <!-- Datatable -->
        <v-flex xs12 sm12 md10 lg10 xl10>
            <v-data-table
            :headers="headersPagos"
            :items="pagos.payload"
            :loading="pagosLoading"
            :search="buscarPago"
            no-data-text="No hay datos"
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
              <v-toolbar flat color="white">
                <v-toolbar-title>Pagos de Matriculados</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialogRegistrarPago" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="green darken-1" small dark v-on="on"> <v-icon left>attach_money</v-icon> Registrar Págo</v-btn>
                  </template>
                  <v-card text-center>
                    <v-card-title>
                      <span class="title" text-center>Registrar Pago</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <span class="font-weight-thin body-2">
                          Registre los pagos que no se hayan realizado a través de esta plataforma
                        </span>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                            <v-select
                              :items="conceptoPago"
                              label="Seleccione el Concepto de Pago"
                              v-model="nuevoPagoItem.description"
                              item-text="nombre"
                              return-object
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                            <v-select
                              :items="medioPago"
                              label="Seleccione el Medio de Pago"
                              v-model="nuevoPagoItem.medio_pago"
                              item-text="nombre"
                              return-object
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="5" md="5" lg="5" xl="5">
                            <v-text-field 
                              type="number"
                              min="0"
                              max="999999999" 
                              v-model="nuevoPagoItem.documento_nro" 
                              label="Nro de Documento"
                              hint="Documento sin puntuaciones"
                              required></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="7" md="7" lg="7" xl="7">
                            <v-text-field 
                              v-model="nuevoPagoItem.pago_id" 
                              label="Ticket de Referencia"
                              hint="Referencia de Transacción"
                              required></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                            <v-text-field 
                              v-model="nuevoPagoItem.transaction_amount" 
                              label="Monto Abonado"
                              hint="Importe de transacción"
                              required></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="red darken-1" text @click="closeDialogNuevoPago">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text :loading="inProcess" @click="registerPay()">Registrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
                <template v-slot:item.status="{item}">
                  <v-chip :color="statusColor(item.status)" dark>{{ item.status }}</v-chip>
                </template>
                <template v-slot:item.transaction_amount="{item}">
                  $ {{ item.transaction_amount }}
                </template>
                <template v-slot:item.comprobante_url="{item}">
                  <v-btn small fab text color="light-blue"><v-icon>receipt</v-icon>{{item.comp}}</v-btn>
                </template>
                <template v-slot:item.createdAt="{item}">
                  {{ item.createdAt | fechaConHora }}
                </template>
            </v-data-table>
        </v-flex>
        <!-- ./Datatable -->
        
      </v-layout>
      <!-- /Pagos de Matriculados -->
      <!-- Pagination -->
      
      <!-- ./Pagination -->
    </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    components:{
    },
    data () {
      return {
        headersTramites: [
          { text: '#ID', value: 'id' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Nro Documento', value: 'documentoNro' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Tramite', value: 'tramite' , sortable: true, align: 'center' , width:'30%'},
          { text: 'Monto', value: 'valor' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Estado', value: 'status' , sortable: true, align: 'center' , width:'20%'},
          { text: 'Fecha de Solicitud', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
          { text: 'Gestionar', value: 'action' , sortable: false, align: 'center' , width:'10%'},
        ],
        headersPagos: [
          { text: '#ID', value: 'id' , sortable: true, align: 'center' , width:'5%'},
          { text: '#Ticket N°', value: 'pago_id' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Nro Documento', value: 'documento_nro' , sortable: true, align: 'center' , width:'20%'},
          { text: 'Concepto', value: 'description' , sortable: true, align: 'center' , width:'30%'},
          { text: 'Monto', value: 'transaction_amount' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Comprobante', value: 'comprobante_url' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Factura', value: 'factura_afip' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Fecha de Pago', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
        ],
        headersTramitesExport:{
          "#ID" : "id",
          "Nro Documento" : "documentoNro",
          "Tramite" : "tramite",
          "Monto" : "valor",
          "Estado" : "status",
          "Fecha de Solicitud" : "createdAt"
        },
        headersPagosExport:{
          "#ID" : "id",
          "#Ticket" : "pago_id",
          "Nro Documento" : "documento_nro",
          "Concepto" : "description",
          "Monto" : "transaction_amount",
          "Fecha de Pago" : "createdAt"
        },
        buscarPago:'',
        buscarTramite:'',
        tramitesItems:[],
        pagosItems:[],
        pagosExport:[],
        tramitesExport:[],
        tiposTramites:[
          "Certificación de Firma",
          "Encomienda de Tareas"
        ],
        conceptoPago:[
            {"nombre":"Certificación de Firma","costo":1000},
            {"nombre":"Encomienda de Trámites","costo":1000},
            {"nombre":"Inscripción","costo":1000},
            {"nombre":"Matrícula","costo":1000},
        ],
        medioPago:[
            {"nombre":"Efectivo (presencial)","valor":"efectivo"},
            {"nombre":"Efectivo (transferencia bancaria)","valor":"trans_efectivo"},
            {"nombre":"Tarjeta (presencial)","valor":"tarjeta"}
        ],
        valid:true,
        lazy: false,
        count:0,
        pages:0,
        dialog:false,
        dialogTramite:false,
        dialogNuevoTramite:false,
        dialogRegistrarPago:false,
        editedIndex: -1,
        editedItem:{
          id:'',
          userId:'',
          tramite:'',
          nota:'',
          valor:0,
          status:'',
          createdAt:''
        },
        nuevoTramiteItem: {
          id:'',
          userId:'',
          tramite:'',
          nota:'',
          valor:0,
          status:'',
          createdAt:''
        },
        nuevoPagoItem: {
          id:'',
          pago_id:'',
          description:'',
          transaction_amount:0,
          valor:0,
          status:'',
          createdAt:''
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
        tramitesLoading:false,
        pagosLoading:true,
        saving:false,
        loadingCategorias:false,
        error: false,
        error_message: '',
        details_loading: false,
        bonificacion:''
      }
    },
    mounted:function(){
      window.scrollTo(0, 0);
    },
    created: function(){
      store.dispatch("TRAMITES_retrieveAll")
      this.pagosLoading
      store.dispatch("PAGOS_retrieveAll")
    },
    computed:{
      tramites(){
        this.tramitesItems = store.state.tramites.items;
        if(this.tramitesItems.payload){
          this.tramitesExport = this.tramitesItems.payload;
        }
        return store.state.tramites.items;
      },
      pagos(){
        return store.state.pagos.items;
      },
      inProcess(){
        return store.state.pagos.inProcess
      },
      user(){
        return store.state.login_api.user
      },
    },
    watch:{
      tramites(val){
        // this.tramiteStatusChanged(val.payload);
        if(val.payload){
          this.tramitesExport = val.payload;
        }
        this.tramitesLoading = false;
      },
      pagos(val){
        if(val.payload){
          this.pagosLoading = false;
        }
      },
      user(val){
        console.log(val)
      },
      "nuevoTramiteItem.tramite"(val){
        if(val!== ""){
          this.calculateCost()
        }
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
          setTimeout(() => {
            this.nuevoTramiteItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },
        closeDialogNuevoPago(create) {
          this.dialogRegistrarPago = false;
          setTimeout(() => {
            this.nuevoPagoItem = Object.assign({}, this.defaultPagoItem)
            this.editedPagoIndex = -1
          }, 300)
        },
        changeState(item,state){
          if(state === "En Proceso"){
            item.status = 1;
          }else if(state === "Completar"){
            item.status = 2;
          }else if (state === "Cancelar"){
            item.status = 3;
          }
          store.dispatch("TRAMITES_update",item);
        },
        createTramite(item){
          this.dialogNuevoTramite = false;
          item.userId = 0;
          item.nota = '';
          item.status = 1;
          store.dispatch("TRAMITES_create",item);
          this.nuevoTramiteItem = Object.assign({}, this.defaultItem);
        },
        registerPay(){
          this.dialogRegistrarPago = false;
          this.nuevoPagoItem.description = this.nuevoPagoItem.description.nombre;
          this.nuevoPagoItem.medio_pago = this.nuevoPagoItem.medio_pago.valor;
          store.dispatch("PAGOS_register",this.nuevoPagoItem);
          this.nuevoPagoItem = Object.assign({}, this.defaultItem);
        },
        calculateCost(){
          
            let costo = 0;
            let curDate = moment().format('YYYY-MM-DD');

            if(moment(curDate).isBetween('2019-01-01','2019-03-21')){
                this.nuevoTramiteItem.valor = 1000;
            }else if(moment(curDate).isBetween('2019-04-01','2019-06-30')){
                this.nuevoTramiteItem.valor = 1050;
            }else if(moment(curDate).isBetween('2019-07-01','2019-09-30')){
                this.nuevoTramiteItem.valor = 1100;
            }else if(moment(curDate).isBetween('2019-10-01','2019-12-31')){
                this.nuevoTramiteItem.valor = 1150;
            }
        },
        validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
    }
}
</script>

<style>

</style>
