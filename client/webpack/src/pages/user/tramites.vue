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
          <!--<v-btn color="green darken-1" small dark> <v-icon left>post_add</v-icon> Nuevo Trámite</v-btn> -->
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
                <template v-slot:item.status="{item}">
                  <v-chip :color="statusColor(item.status)" dark>
                    {{ item.status }}
                    <v-icon v-if="item.status === 'En Proceso'" small right>autorenew</v-icon>
                    <v-icon v-if="item.status === 'Cancelado'" small right>block</v-icon>
                    <v-icon v-if="item.status === 'Completado'" small right>done</v-icon>
                    <v-icon v-if="item.status === 'Pendiente'" small right>alarm</v-icon>
                  </v-chip>
                </template>
                <template v-slot:item.createdAt="{item}">
                  {{ item.createdAt | fechaSinHora }}
                </template>
                <template v-slot:item.nota="{item}">
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
            :loading="loading"
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
                  <v-dialog v-model="dialogTicket" max-width="400px">
                    <v-card text-center>
                      <v-card-title>
                        <span class="title" text-center>Comprobante de Pago  #{{ticketItem.id}} <v-icon>receipt</v-icon></span>
                      </v-card-title>
                      <v-card-text>
                        <div><span><strong>Ticket de Transacción:</strong></span> {{ ticketItem.pago_id }}</div>
                        <div><span><strong>Concepto:</strong></span> {{ ticketItem.description }}</div>
                        <div><span><strong>Monto:</strong></span>$ {{ ticketItem.transaction_amount }}</div>
                        <div><span><strong>Nro Documento:</strong></span> {{ ticketItem.documento_nro }}</div>
                        <div><span><strong>Medio de Pago:</strong></span> {{ ticketItem.medio_pago }}</div>
                        <div><span><strong>Url factura Afip:</strong></span> {{ ticketItem.factura_afip }}</div>
                        <div><span><strong>Fecha de Pago:</strong></span> {{ ticketItem.createdAt | fechaConHora }}</div>
                      </v-card-text>
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" text @click="closeDialogTicket">Aceptar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template> 
                <template v-slot:item.status="{item}">
                  <v-chip :color="statusColor(item.status)" dark>{{ item.status }}</v-chip>
                </template>
                <template v-slot:item.comprobante_url="{item}">
                  <v-btn small fab text color="light-blue" @click="showTicket(item)"><v-icon>receipt</v-icon>{{item.comp}}</v-btn>
                </template>
                <template v-slot:item.factura_afip="{item}">
                  <v-btn small fab text color="light-blue"><v-icon>eye</v-icon>{{item.factura_afip}}</v-btn>
                </template>
                <template v-slot:item.createdAt="{item}">
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

export default {
    components:{
    },
    data () {
      return {
        headersTramites: [
          { text: 'N° Trámite', value: 'id' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Trámite', value: 'tramite' , sortable: true, align: 'center' , width:'50%'},
          { text: 'Nota', value: 'nota' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Estado', value: 'status' , sortable: true, align: 'center' , width:'15%'},
          { text: 'Fecha de Solicitud', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
        ],
        headersPagos: [
          { text: '#ID', value: 'id' , sortable: true, align: 'center' , width:'10%'},
          { text: '#Ticket N°', value: 'pago_id' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Descripción', value: 'description' , sortable: true, align: 'center' , width:'30%'},
          { text: 'Valor', value: 'transaction_amount' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Comprobante', value: 'comprobante_url' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Factura', value: 'factura_afip' , sortable: true, align: 'center' , width:'10%'},
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
          factura_afip:'',
          medio_pago:'',
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
        dialogTramite:false,
        // apigw: process.env.TEU_API,
        page: 1,
        tramitesLoading:true,
        loading: false,
        error: false,
        error_message: '',
      }
    },
    mounted:function(){
      window.scrollTo(0, 0)
    },
    created: function(){
          store.dispatch("PAGOS_retrieveAll")
    },
    computed:{
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
          store.dispatch("TRAMITES_retrieveAll",usuario.user.id)
        };
        return usuario
      }
    },
    watch:{
      tramites(){
        this.tramitesLoading=false;
      },
      user(perfil){
        store.dispatch("TRAMITES_retrieveAll",perfil.user.id)
      },
      pagos(){}
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
        goToPay(){
          router.push('/tramites/pagos')
        },
        showTicket(item){
          this.ticketItem = item;
          this.dialogTicket = true
        }
    }
}
</script>

<style>

</style>
