<template>
    <v-container>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h1 class="display-2 font-weight-black" style="color:#263238">Gestión</h1>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <!-- <h2 class="display-1 font-weight-light" style="color:#263238">Trámites de Matriculados</h2> -->
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
              :fields = "headers"
              worksheet = "Trámites de Matriculados"
              name    = "Trámites de Matriculados.xls">
          <v-btn color="default" small> <v-icon left>cloud_download</v-icon> Descargar Lista</v-btn>
          </download-excel>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-space-around row fill-height>
        <!-- Datatable -->
        <v-flex xs12 sm12 md10 lg10 xl10>
            <v-data-table
            :headers="headers"
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
                    <v-card text-center>
                      <v-card-title>
                        <span class="title" text-center>Registrar Nuevo Trámite</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                              <v-select
                                :items="tiposTramites"
                                label="Seleccione el Tipo de Trámite"
                                v-model="nuevoTramiteItem.tramite"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                              <v-text-field 
                                type="number"
                                min="0"
                                max="999999999" 
                                v-model="nuevoTramiteItem.documentoNro" 
                                label="DNI del Matriculado"
                                hint="DNI sin puntuaciones"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                              <v-text-field 
                                type="number"
                                min="0"
                                max="999999999" 
                                v-model="nuevoTramiteItem.valor" 
                                label="Costo del Trámite"
                                hint="Expresado en Pesos Argentinos"></v-text-field>
                            </v-col>
                            
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="red darken-1" text @click="closeDialogNuevoTramite">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="createTramite(nuevoTramiteItem)">Aceptar</v-btn>
                      </v-card-actions>
                    </v-card>
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
      <!-- Pagination -->
      
      <!-- ./Pagination -->
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
          { text: 'N° Trámite', value: 'id' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Nro Documento', value: 'documentoNro' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Tramite', value: 'tramite' , sortable: true, align: 'center' , width:'30%'},
          { text: 'Valor', value: 'valor' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Estado', value: 'status' , sortable: true, align: 'center' , width:'20%'},
          { text: 'Fecha de Solicitud', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
          { text: 'Gestionar', value: 'action' , sortable: false, align: 'center' , width:'10%'},
        ],
        buscarTramite:'',
        tramitesItems:{
          payload:{status:""}
        },
        tiposTramites:[
          "Certificación de Firma",
          "Encomienda de Tareas"
        ],
        count:0,
        pages:0,
        dialog:false,
        dialogTramite:false,
        dialogNuevoTramite:false,
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
        saving:false,
        loadingCategorias:false,
        error: false,
        error_message: '',
        details_loading: false
      }
    },
    created: function(){
      store.dispatch("TRAMITES_retrieveAll")
    },
    computed:{
      tramites(){
        this.tramitesItems = store.state.tramites.items;
        return store.state.tramites.items;
      }
    },
    watch:{
      tramites(val){
        // this.tramiteStatusChanged(val.payload);
        this.tramitesLoading=false;
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
          store.dispatch("TRAMITES_create",item);
          this.nuevoTramiteItem = Object.assign({}, this.defaultItem);
        }
    }
}
</script>

<style>

</style>
