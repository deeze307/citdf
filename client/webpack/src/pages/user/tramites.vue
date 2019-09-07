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
          <v-btn color="blue darken-1" small dark disabled> <v-icon left>post_add</v-icon> Nuevo Págo</v-btn>
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
                <template v-slot:item.status="{item}">
                  <v-chip :color="statusColor(item.status)" dark>{{ item.status }}</v-chip>
                </template>
                <template v-slot:item.comprobante_url="{item}">
                  <v-btn small fab text color="light-blue"><v-icon>receipt</v-icon>{{item.comp}}</v-btn>
                </template>
            </v-data-table>
        </v-flex>
        <!-- ./Datatable -->
        
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
        headersTramites: [
          { text: 'N° Trámite', value: 'id' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Trámite', value: 'tramite' , sortable: true, align: 'center' , width:'50%'},
          { text: 'Nota', value: 'nota' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Estado', value: 'status' , sortable: true, align: 'center' , width:'15%'},
          { text: 'Fecha de Solicitud', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
        ],
        headersPagos: [
          { text: 'Periodo', value: 'periodo' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Estado', value: 'status' , sortable: true, align: 'center' , width:'30%'},
          { text: 'comprobante', value: 'comprobante_url' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Fecha de Pago', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
        ],
        buscarTramite:'',
        buscarPago:'',
        count:0,
        pages:0,
        dialog:false,
        editedIndex: -1,
        editedItem:{
          id:'',
          userId:'',
          tramite:'',
          nota:'',
          status:'',
          createdAt:'',
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
        dialogPago:false,
        // apigw: process.env.TEU_API,
        page: 1,
        tramitesLoading:true,
        loading: false,
        error: false,
        error_message: '',
      }
    },
    created: function(){
      
    },
    computed:{
      tramites(){
        return store.state.tramites.items
      },
      pagos(){
        return store.state.pagos.items
      },
      user() {
        console.log("Usuario: ",store.state.login_api.user);
        return store.state.login_api.user
      }
    },
    watch:{
      tramites(){
        this.tramitesLoading=false;
      },
      user(perfil){
        console.log(perfil);
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
        closeDialogPago(){
          this.dialogPago = false;
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        }
    }
}
</script>

<style>

</style>
