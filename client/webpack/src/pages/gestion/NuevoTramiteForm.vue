<template>
  <v-card text-center>
    <v-card-title>
      <span v-if="data.editarTramite" class="title" text-center>Editar Trámite N°{{data.form.id   }}</span>
      <span v-else class="title" text-center>Registrar Nuevo Trámite</span>
    </v-card-title>
    <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
          <span v-if="data.editarTramite" class="font-weight-thin body-2">
            Edite el trámite solicitado
          </span>
          <span v-else class="font-weight-thin body-2">
            <span v-if="data.origin !== 'user'">Registre los trámites solicitados por los matriculados</span>
          </span>
        </v-col>
        <v-col cols="12" xs="12" sm="7" md="7" lg="7" xl="7" class="mx-0">
          <v-select
          :items="_tiposTramites"
          label="Tipo de Trámite"
          :rules="[v => !!v || 'Tipo de Trámite es requerido']"
          v-model="data.form.tramite"
          required
          ></v-select>
        </v-col>
        <v-col cols="12" xs="12" sm="5" md="5" lg="5" xl="5" class="mx-0">
          <!-- <v-text-field
          v-model="data.form.nroRegistro" 
          label="Nro. Registro"
          required></v-text-field> -->
          <v-select
          :items="ciudades"
          label="Ciudad de Trámite"
          :rules="[v => !!v || 'La Ciudad del trámite es Requerida']"
          v-model="data.form.ciudadTramite"
          required
          ></v-select>
        </v-col>
        <v-col v-if="data.origin === 'user'" cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
          <v-text-field
          v-model="fullName"
          readonly
          label="Matriculado"
          ></v-text-field>
        </v-col>
        <v-col v-else cols="12" sm="12" md="12" lg="12" xl="12">
          <v-autocomplete
            v-model="data.form.matriculado"
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
            <v-btn v-if="data.form.docFileUrl && data.form.docFileUrl != ''" rounded small color="info"
              :href="data.form.docFileUrl" target="_blank">
              <v-icon left>attach_file</v-icon> Visualizar Documento Adjunto
            </v-btn>
            <span v-else class="font-weight-thin body-2">
              <span v-if="data.editarTramite"><v-icon left>attach_file</v-icon> No posee documento adjunto</span>
            </span>
          </v-flex>
          <v-flex class="text-center py-2">
            <span v-if="data.form.docFileUrl && data.form.docFileUrl != ''" class="font-weight-thin body-2">
              Si lo requiere puede adjuntar un documento nuevo a este trámite.<br>
              (se reemplazará el documento anterior y se notificará al matriculado)
            </span>
          </v-flex>
          <v-flex xs12>
            <v-file-input
            v-model="data.form.file"
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
          <v-flex xs12 offset-xs7>
          <v-btn x-small color="error" @click="data.form.file=null" :disabled="!data.form.file">Quitar Adjunto</v-btn>
          </v-flex>
        </v-col >
        <!-- /IMPORTADOR -->
        <v-divider />
          <v-flex xs12 sm12 md12 lg12 xl12 d-flex class="px-3">
            <v-textarea
            v-model="data.form.observaciones"
            label="Observaciones"
            counter="100"
            ></v-textarea>
          </v-flex>
        </v-row>
        <v-row>
        <v-col cols="12" sm="8" md="8" lg="8" xl="8" class="ml-0">
          <div class="mt-6">
            Costo del Trámite: <span class="ml-2 title font-weight-black"> ${{ data.form.valor }}</span>
            <span v-if="bonificacion !== ''">{{ bonificacion }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    </v-card-text>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="red darken-1" text @click="closeDialogNuevoTramite" :disabled="working">Cancelar</v-btn>
      
      <v-btn v-if="!data.editarTramite" color="blue darken-1" text @click="createTramite(data.form)" :disabled="working" :loading="working">Aceptar</v-btn>
      <v-btn v-else color="blue darken-1" text @click="updateTramite(data.form)" :disabled="working" :loading="working">
        <span v-if="data.origin === 'approver'">Aprobar</span>
        <span v-else>Actualizar</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'NuevoTramiteForm',
  data () {
    return {
      editedIndex: -1,
      tiposTramites:[
        "Certificación de Firma",
        "Encomienda de Tareas"
      ],
      ciudades: [
        "Ushuaia",
        "Tolhuin",
        "Rio Grande"
      ],
      working:false,
      saving:false,
      bonificacion:'',
      loadingMatriculados:false,
      matriculadoSelected:[],
      matriculadosResult:[],
      matriculadosOrigen:[]
    }
  },
  created () {
    if (this.user.user && this.user.user.custom_fields) {
      this.data.form.ciudadTramite = this.user.user.custom_fields.ciudad
    }
  },
  computed: {
    user(){
      return store.state.login_api.user
    },
    fullName () {
      let firstName = store.state.login_api.user.user.firstName
      let lastName = store.state.login_api.user.user.lastName
      return firstName + ' ' + lastName 
    },
    _tiposTramites () {
      console.log('tiposTramites', process.env.CITDF_API)
      if (process.env.CITDF_API === 'http://localhost'){
        this.tiposTramites.push("Item dePrueba")
      }
      return this.tiposTramites
    }
  },
  watch: {
    "data.form.tramite"(val){
      if(val!== ""){
        this.calculateCost()
      }
    }
  },
  props: {
    data: {
      type: Object,
      default:  {
        editarTramite: false,
        form: {}
      }
    }
  },
  methods: {
    // IMPORTADOR
    onUploadFile() {
      store.dispatch("TRAMITES_upload",this.data.form.file[0]);
    },
    //
    closeDialogNuevoTramite(create) {
      // this.data.dialog.open = false;
      this.data.editarTramite = false
      // setTimeout(() => {
      //   this.data.nuevoTramiteItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // }, 300)
      this.$emit('closeDialog')
    },
    matriculadosFilter(item, queryText, itemText) {
      const textOne = item.matricula.toLowerCase()
      const textTwo = item.display_name.toLowerCase()
      
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
      textTwo.indexOf(searchText) > -1
    },
    calculateCost(){
      let costo = 0;
      let curDate = moment().format('YYYY-MM-DD');

      if(this.data.form.tramite === 'Item de Prueba') {
        this.data.form.valor = 1;
      } else {
        if(moment(curDate).isBetween('2020-01-01','2020-03-21',null,'[]')){
          this.data.form.valor = 1200;
        }else if(moment(curDate).isBetween('2020-04-01','2020-06-30',null,'[]')){
          this.data.form.valor = 1300;
        }else if(moment(curDate).isBetween('2020-07-01','2020-09-30',null,'[]')){
          this.data.form.valor = 1400;
        }else if(moment(curDate).isBetween('2020-10-01','2020-12-31',null,'[]')){
          this.data.form.valor = 1500;
        }
      }
    },
    createTramite(item){
      let vm = this;
      vm.working = true;
      item.nota = '';
      item.status = 0; // Estado "EN PROCESO"

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
      switch(item.status) {
        case "En Proceso":
          item.status = 1
          break
        case "Completar":
          item.status = 2
          break
        case "Cancelar":
          item.status = 3
          break
        case "Pagar":
          item.status = 0
          break
      }
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
