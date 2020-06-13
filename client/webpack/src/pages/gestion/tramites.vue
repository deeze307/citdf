<template>
  <section>
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
              <v-toolbar flat color="white">
                <v-toolbar-title>Trámites de Matriculados</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialogNuevoTramite" max-width="450px">
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
                        <span v-if="editarTramite" class="title" text-center>Editar Trámite N°{{nuevoTramiteItem.id   }}</span>
                        <span v-else class="title" text-center>Registrar Nuevo Trámite</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                              <span v-if="editarTramite" class="font-weight-thin body-2">
                                Edite el trámite solicitado
                              </span>
                              <span v-else class="font-weight-thin body-2">
                                Registre los trámites solicitados por los matriculados
                              </span>
                            </v-col>
                            <v-col cols="12" xs="12" sm="7" md="7" lg="7" xl="7" class="mx-0">
                              <v-select
                                :items="tiposTramites"
                                label="Tipo de Trámite"
                                :rules="[v => !!v || 'Tipo de Trámite es requerido']"
                                v-model="nuevoTramiteItem.tramite"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" xs="12" sm="5" md="5" lg="5" xl="5" class="mx-0">
                              <v-text-field
                                v-model="nuevoTramiteItem.nroRegistro" 
                                label="Nro. Registro"
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-autocomplete
                                  v-model="nuevoTramiteItem.matriculado"
                                  :items="matriculadosResult"
                                  label="Matriculado o Nro de Matrícula"
                                  :loading="loadingMatriculados"
                                  :filter="matriculadosFilter"
                                  return-object
                                >
                                  <template slot="item" slot-scope="data">
                                    {{ data.item.matricula }}, {{ data.item.display_name }}
                                  </template>
                                  <template slot="selection" slot-scope="data">
                                    {{ data.item.matricula }}, {{ data.item.display_name }}
                                  </template>
                                </v-autocomplete>
                            </v-col>
                            <!-- IMPORTADOR -->
                            <v-divider />
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="ml-0">
                              <v-flex class="text-center">
                                <v-btn v-if="nuevoTramiteItem.docFileUrl && nuevoTramiteItem.docFileUrl != ''" rounded small color="info"
                                  :href="nuevoTramiteItem.docFileUrl" target="_blank">
                                  <v-icon left>attach_file</v-icon> Visualizar Documento Adjunto
                                </v-btn>
                                <span v-else class="font-weight-thin body-2">
                                  <span v-if="editarTramite"><v-icon left>attach_file</v-icon> No posee documento adjunto</span>
                                </span>
                              </v-flex>
                              <v-flex class="text-center py-2">
                                <span v-if="nuevoTramiteItem.docFileUrl && nuevoTramiteItem.docFileUrl != ''" class="font-weight-thin body-2">
                                  Si lo requiere puede adjuntar un documento nuevo a este trámite.<br>
                                  (se reemplazará el documento anterior y se notificará al matriculado)
                                </span>
                              </v-flex>
                              <v-flex xs12>
                                <v-file-input
                                v-model="nuevoTramiteItem.file"
                                placeholder="Seleccione documento a subir"
                                label="Adjuntar trámite"
                                multiple
                                :clearable="true"
                                show-size
                                prepend-icon="attach_file"
                                >
                                  <template v-slot:selection="{ text }">
                                    <v-chip
                                      small
                                      label
                                      color="primary"
                                    >
                                      {{ text }}
                                    </v-chip>
                                  </template>
                                </v-file-input>
                              </v-flex>
                              <v-flex v-if="!editarTramite" xs12 offset-xs7>
                                <v-btn x-small color="error" @click="nuevoTramiteItem.file=null" :disabled="!nuevoTramiteItem.file">Quitar Adjunto</v-btn>
                              </v-flex>
                            </v-col >
                            <!-- /IMPORTADOR -->
                            <v-divider />
                            <v-flex xs12 sm12 md12 lg12 xl12 d-flex class="px-3">
                              <v-textarea
                              v-model="nuevoTramiteItem.observaciones"
                              label="Observaciones"
                              counter="100"
                              ></v-textarea>
                            </v-flex>
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
                        <v-btn color="red darken-1" text @click="closeDialogNuevoTramite" :disabled="working">Cancelar</v-btn>
                        
                        <v-btn v-if="!editarTramite" color="blue darken-1" text @click="createTramite(nuevoTramiteItem)" :disabled="working" :loading="working">Aceptar</v-btn>
                        <v-btn v-else color="blue darken-1" text @click="updateTramite(nuevoTramiteItem)" :disabled="working" :loading="working">Actualizar</v-btn>
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
            <template  v-slot:item.observaciones="{item}">
              <v-btn v-if="item.observaciones && item.observaciones !== ''" small fab text color="blue" @click="showObservation(item)"><v-icon>visibility</v-icon></v-btn>
            </template>
            <template v-slot:item.valor="{item}">
              ${{ item.valor }}
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
                  <v-divider></v-divider>
                  <v-list-item @click="editTramite(item)">
                    <v-list-item-title>Editar</v-list-item-title><v-icon>edit</v-icon>
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
  </section>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    data () {
      return {
        headersTramites: [
          { text: '#ID', value: 'id' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Nro Registro', value: 'nroRegistro' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Nro Documento', value: 'documentoNro' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Nro Matrícula', value: 'matriculaNro' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Tramite', value: 'tramite' , sortable: true, align: 'center' , width:'20%'},
          { text: 'Monto', value: 'valor' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Estado', value: 'status' , sortable: true, align: 'center' , width:'20%'},
          { text: 'Obs.', value: 'observaciones' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Fecha de Solicitud', value: 'createdAt' , sortable: true, align: 'center' , width:'15%'},
          { text: 'Gestionar', value: 'action' , sortable: false, align: 'center' , width:'10%'},
        ],
        headersTramitesExport:{
          "#ID" : "id",
          "Nro Registro" : "nroRegistro",
          "Nro Documento" : "documentoNro",
          "Nro Matrícula" : "matriculaNro",
          "Tramite" : "tramite",
          "Monto" : "valor",
          "Estado" : "status",
          "Fecha de Solicitud" : "createdAt"
        },
        matriculadosItems: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
        ],
        matriculadoSelected:[],
        matriculadosResult:[],
        matriculadosOrigen:[],
        buscarTramite:'',
        tramitesItems:[],
        tramitesExport:[],
        tiposTramites:[
          "Certificación de Firma",
          "Encomienda de Tareas"
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
        dialogObservaciones:false,
        dialogNuevoTramite:false,
        dialogTicket:false,
        editarTramite:false,
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
        page: 1,
        tramitesLoading:true,
        saving:false,
        loadingCategorias:false,
        loadingMatriculados:false,
        working:false,
        error: false,
        error_message: '',
        details_loading: false,
        bonificacion:'',
        // Importador
        file: []
      }
    },
    mounted:function(){
      window.scrollTo(0, 0);

    },
    created: function(){
      store.dispatch("TRAMITES_retrieveAll")
      let params = {ciudad:"Todos", titulo_profesional:"Todos", admin:false};
      store.dispatch('MATRICULADOS_retrieveAll',params)
      this.loadingMatriculados = true
    },
    computed:{
      matriculados(){
        this.matriculadosOrigen = store.state.matriculados.items;
        this.matriculadosResult = store.state.matriculados.items;
        return store.state.matriculados.items;
      },
      tramites(){
        this.tramitesItems = store.state.tramites.items;
        if(this.tramitesItems.payload){
          this.tramitesExport = this.tramitesItems.payload;
        }
        return store.state.tramites.items;
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
      },
      editTramite(item){
        this.nuevoTramiteItem = item
        this.nuevoTramiteItem.matriculado = this.matriculadosResult.filter(matriculado => matriculado.documento_nro == item.documentoNro)
        this.nuevoTramiteItem.matriculado = this.nuevoTramiteItem.matriculado[0]
        this.editarTramite = true;
        this.dialogNuevoTramite = true

      },
      // IMPORTADOR
      onUploadFile() {
        store.dispatch("TRAMITES_upload",this.nuevoTramiteItem.file[0]);
      },
      
      //
    }
}
</script>

<style>

</style>
