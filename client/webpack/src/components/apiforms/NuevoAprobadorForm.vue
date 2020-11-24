<template>
  <v-card text-center>
    <v-card-title>
      <span v-if="data.editarAprobador" class="title" text-center>Editar Aprobador de Trámite</span>
      <span v-else class="title" text-center>Agregar Aprobador de Trámite</span>
    </v-card-title>
    <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <v-autocomplete
            v-model="data.form.matriculado"
            :items="matriculadosResult"
            :label="data.editarAprobador ? 'Matriculado' : 'Matriculado o Nro de Matrícula'"
            :loading="loading"
            :readonly="data.editarAprobador"
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
        <v-divider />
        <v-flex xs12 sm12 md12 lg12 xl12 d-flex class="px-3">
          <v-textarea
          v-model="data.form.observaciones"
          label="Observaciones"
          counter="100"
          ></v-textarea>
        </v-flex>
        <v-flex>
          <v-switch
            v-model="data.form.active"
            label="Habilitado"
          ></v-switch>
        </v-flex>
      </v-row>
    </v-container>
    </v-card-text>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="red darken-1" text @click="closeDialogNuevoAprobador" :disabled="working">Cancelar</v-btn>
      
      <v-btn v-if="data.editarAprobador" color="blue darken-1" text @click="updateApprover(data.form)" :disabled="working" :loading="working">Actualizar</v-btn>
      <v-btn v-else color="blue darken-1" text @click="createApprover(data.form)" :disabled="working" :loading="working">Crear</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'NuevoAprobadorForm',
  data () {
    return {
      editedIndex: -1,
      working:false,
      saving:false,
      loading:false,
      matriculadoSelected:[],
      matriculadosResult:[],
      matriculadosOrigen:[],
      defaultItem: {},
      form: {}
    }
  },
  created () {
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    matriculados: {
      get () {
        console.log('obteniedo matriculados.....')
        const mat = store.state.matriculados.items
        let withNoAdmin = mat.payload.filter((matriculado)=>{
          // Quito los perfiles que no son de matriculados.
          if(matriculado && matriculado.matricula) return matriculado
        })
        this.matriculadosResult = withNoAdmin
        this.matriculadosOrigen = withNoAdmin
        this.loading = false
        if (this.data.editarAprobador) {
          this.data.form.matriculado = this.matriculadosResult.filter(mat => mat.ID === this.data.form.matriculadoId)

          if (this.data.form.matriculado.length > 0) {
            this.data.form.matriculado = this.data.form.matriculado[0]
          }
          console.log('matriculadoo', this.data.form.matriculado, this.data.form.matriculadoId)
        }
        return mat
      },
      set () {

      }
    }
  },
  watch: {
    matriculados (mat) {
      if (mat.payload) {
        this.loading = false
      }
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    closeDialogNuevoAprobador(create) {
      // this.data.dialog.open = false;
      this.data.editarAprobador = false
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
    createApprover(item){
      let vm = this;
      vm.working = true;
      console.log('item', item)
      store.dispatch("APROBADORES_create",item).then(function(response){
        vm.working = false;
        console.log('response create approver', response)
        if(response){
          vm.dialogNuevoAprobador = false
          vm.nuevoAprobadorItem = Object.assign({}, vm.defaultItem);
        }
      });
    },
    updateApprover(item){
      let vm = this
      vm.working = true;
      console.log('por actualizar aprobador', item)
      store.dispatch("APROBADORES_update",item).then( response => {
        vm.working = false;
        console.log('response update approver', response)
        if(response){
          vm.dialogNuevoAprobador = false
          vm.nuevoAprobadorItem = Object.assign({}, vm.defaultItem);
        }
      });
    }
  }
}
</script>

<style>

</style>
