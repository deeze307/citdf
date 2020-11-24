<template>
    <section>
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
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md6 lg6 xl6 offset-md2 offset-lg2 offset-xl2>
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <download-excel
                :data   = "pagos.payload"
                :fields = "headersPagosExport"
                worksheet = "Pagos de Matriculados"
                name    = "Pagos de Matriculados.xls">
              <v-btn color="default" small> <v-icon left>cloud_download</v-icon> Descargar Pagos</v-btn>
              </download-excel>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
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
                            item-value="valor"
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

                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field 
                            v-model="nuevoPagoItem.pago_id" 
                            label="Ticket de Referencia"
                            hint="Referencia de Transacción"
                            required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                          <v-text-field 
                            v-model="nuevoPagoItem.matriculaNro" 
                            label="Nro de Matrícula"
                            hint="Incluya el '0' a la izquierda de ser necesario"
                            required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                          <v-text-field 
                            v-model="nuevoPagoItem.transaction_amount" 
                            label="Monto Abonado"
                            hint="Importe de transacción"
                            required></v-text-field>
                        </v-col>
                        <v-flex xs12 sm12 md12 lg12 xl12 d-flex class="px-3">
                          <v-textarea
                          v-model="nuevoPagoItem.observaciones"
                          label="Observaciones"
                          counter="100"
                          ></v-textarea>
                        </v-flex>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="red darken-1" text @click="closeDialogNuevoPago">Cancelar</v-btn>
                    <v-btn color="blue darken-1" v-if="!editarPago" text :loading="inProcess" @click="registerPay()">Registrar</v-btn>
                    <v-btn color="blue darken-1" v-else text :loading="inProcess" @click="updatePay()">Actualizar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          
          
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
              firstIcon: 'first_page',
              lastIcon: 'last_page',
              prevIcon: 'chevron_left',
              nextIcon: 'chevron_right'
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
              <v-dialog v-model="dialogObservaciones" max-width="400px">
                <v-card text-center>
                  <v-card-title>
                    <span class="title" text-center>Observaciones</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      "{{observacionItem.observaciones}}"
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="closeDialogObservaciones">Aceptar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template> 
            <template v-slot:[`item.status`]="{item}">
              <v-chip :color="statusColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
            <template v-slot:[`item.transaction_amount`]="{item}">
              ${{ item.transaction_amount }}
            </template>
            <template v-slot:[`item.comprobante_url`]="{item}">
              <v-btn small fab text color="light-blue" @click="showTicket(item)"><v-icon>receipt</v-icon>{{item.comp}}</v-btn>
            </template>
            <template  v-slot:[`item.observaciones`]="{item}">
                <v-btn v-if="item.observaciones && item.observaciones !== ''" small fab text color="blue" @click="showObservation(item)"><v-icon>visibility</v-icon></v-btn>
              </template>
            <template v-slot:[`item.createdAt`]="{item}">
              {{ item.createdAt | fechaConHora }}
            </template>
            <template v-slot:[`item.action`]="{item}">
              <v-icon small class="mr-2" @click="editPay(item)">edit</v-icon>
              <v-icon small @click="deletePay(item)">delete</v-icon>
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

export default {
    components:{
    },
    data () {
      return {
        headersPagos: [
          { text: '#ID', value: 'id' , sortable: true, align: 'center' , width:'5%'},
          { text: '#Ticket N°', value: 'pago_id' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Nro Documento', value: 'documento_nro' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Nro Matrícula', value: 'matriculaNro' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Concepto', value: 'description' , sortable: true, align: 'center' , width:'20%'},
          { text: 'Monto', value: 'transaction_amount' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Comprobante', value: 'comprobante_url' , sortable: false, align: 'center' , width:'5%'},
          { text: 'Factura', value: 'factura_afip' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Obs.', value: 'observaciones' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Fecha de Pago', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
          { text: 'Acciones', value: 'action' , sortable: true, align: 'center' , width:'10%'},
        ],
        headersPagosExport:{
          "#ID" : "id",
          "#Ticket N°" : "pago_id",
          "Nro Documento" : "documento_nro",
          "Nro Matrícula" : "matriculaNro",
          "Concepto" : "description",
          "Monto" : "transaction_amount",
          "Fecha de Pago" : "createdAt"
        },
        buscarPago:'',
        pagosItems:[],
        pagosExport:[],
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
        dialogObservaciones:false,
        dialogRegistrarPago:false,
        dialogTicket:false,
        editarPago:false,
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
        observacionItem: {
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
        ticketItem:{
          id:'',
          pago_id:'',
          descripcion:'',
          transaction_amount:'',
          documento_nro:'',
          factura_afip:'',
          medio_pago:'',
          createdAt:''
        },
        page: 1,
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
      this.pagosLoading
      store.dispatch("PAGOS_retrieveAll")
    },
    computed:{
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
      pagos(val){
        if(val.payload){
          this.pagosLoading = false;
        }
      },
      user(val){
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
        registerPay(){
          this.dialogRegistrarPago = false;
          this.nuevoPagoItem.description = this.nuevoPagoItem.description.nombre;
          this.nuevoPagoItem.medio_pago = this.nuevoPagoItem.medio_pago.valor;
          store.dispatch("PAGOS_register",this.nuevoPagoItem);
          this.nuevoPagoItem = Object.assign({}, this.defaultItem);
        },
        editPay(pago){
          this.nuevoPagoItem = pago
          this.nuevoPagoItem.description = {
            "nombre": pago.description,
            "costo": 1200
          }
          this.nuevoPagoItem.medio_pago = {
            "nombre":"",
            "valor" : pago.medio_pago
          }
          this.editarPago = true
          this.dialogRegistrarPago = true
        },
        updatePay(){
          this.dialogRegistrarPago = false
          this.editarPago = false
          this.nuevoPagoItem.description = this.nuevoPagoItem.description.nombre;
          this.nuevoPagoItem.medio_pago = this.nuevoPagoItem.medio_pago.valor;
          store.dispatch("PAGOS_update",this.nuevoPagoItem)
          this.nuevoPagoItem
        },
        deletePay(pago){
          store.dispatch("PAGOS_delete",pago)
        },
        calculateCost(){
          
            let costo = 0;
            let curDate = moment().format('YYYY-MM-DD');

            if(moment(curDate).isBetween('2020-01-01','2020-03-21',null,'[]')){
                this.nuevoTramiteItem.valor = 1200;
            }else if(moment(curDate).isBetween('2020-04-01','2020-06-30',null,'[]')){
                this.nuevoTramiteItem.valor = 1300;
            }else if(moment(curDate).isBetween('2020-07-01','2020-09-30',null,'[]')){
                this.nuevoTramiteItem.valor = 1400;
            }else if(moment(curDate).isBetween('2020-10-01','2020-12-31',null,'[]')){
                this.nuevoTramiteItem.valor = 1500;
            }
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
      }
    }
}
</script>

<style>

</style>
