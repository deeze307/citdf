<template>
    <v-container>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h1 class="display-2 font-weight-black" style="color:#263238">Listado de Matriculados Habilitados</h1>
      </v-flex>
      <v-layout row>
        <v-flex xs12 sm12 md3 lg2 xl2 offset-md1 offset-lg1 offset-xl1>
          <v-text-field
            v-model="buscarMatriculado"
            label="Buscar Matriculado"
            append-icon="search"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md2 lg2 xl2 class="ml-5 mr-2">
          <v-select
            :items="['Ushuaia','Tolhuin','Rio Grande']"
            label="Ciudad"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12 md2 lg2 xl2>
          <v-select
            :items="['Ushuaia','Tolhuin','Rio Grande']"
            label="Titulo Profesional"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md3 lg3 xl3 offset-md1 offset-lg1 offset-xl1>
          <download-excel
              :data   = "matriculados.payload"
              :fields = "exportHeaders"
              worksheet = "Lista de Matriculados"
              name    = "Lista de Matriculados.xls">
          <v-btn color="default" small> <v-icon left>cloud_download</v-icon> Descargar Lista</v-btn>
          </download-excel>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-space-around row fill-height>
        <!-- Datatable -->
        <v-flex xs12 sm12 md10 lg10 xl10>
            <v-data-table
            :headers="headers"
            :items="matriculados.payload"
            :loading="loading"
            :search="buscarMatriculado"
            class="elevation-1"
            >
            <template v-slot:top>
              <v-dialog v-model="dialogMatriculado" max-width="400">
                <v-card>
                  <v-card-title>
                    <span class="headline"><v-icon left>person_pin</v-icon> Datos de Matriculado</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-col>
                        <div><span><strong>Matricula:</strong></span> {{ editedItem.custom_fields.matricula }}</div>
                        <div><span><strong> Número Documento:</strong></span> {{ editedItem.custom_fields.documento_nro }}</div>
                        <div><span><strong> Título Profesional:</strong></span> {{ editedItem.custom_fields.titulo_profesional }}</div>
                        <div><span><strong> Ciudad:</strong></span> {{ editedItem.custom_fields.ciudad }}</div>
                        <div><span><strong> Email:</strong></span> {{ editedItem.user_email }}</div>
                        <div><span><strong> Dirección:</strong></span> {{ editedItem.custom_fields.direccion }}</div>
                        <div><span><strong> Teléfono:</strong></span> {{ editedItem.custom_fields.telefono }}</div>
                        <div><span><strong> Perfíl de Facebook:</strong></span> {{ editedItem.custom_fields.facebook_profile }}</div>
                        <div><span><strong> Perfíl de LinkedIn:</strong></span> {{ editedItem.custom_fields.linkedin_profile }}</div>
                        <div><span><strong> Sitio Web:</strong></span> {{ editedItem.user_url }}</div>
                        <div><span><strong> Aptitudes:</strong></span> {{ editedItem.custom_fields.apt }}</div>
                        <div><span><strong> Acerca de:</strong></span> {{ editedItem.custom_fields.description }}</div>
                      </v-col>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
              
              <template v-slot:item.detalle="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="showMatriculado(item)"
                >
                  visibility
                </v-icon>
              </template>
            </v-data-table>
        </v-flex>
        <!-- ./Datatable -->
        
      </v-layout>
      <!-- Pagination -->
      <!-- <p class="text-xs-center">
          <v-pagination
              v-model="page"
              :length="response.last_page"
              :total-visible="7"
          />
      </p> -->
      <!-- ./Pagination -->
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data:() => ({
      exportHeaders:{
        'Matricula': 'custom_fields.matricula',
        'Nombre Completo': 'display_name',
        'Documento Nro': 'custom_fields.documento_nro',
        'Título Profesional': 'custom_fields.titulo_profesional',
        'Ciudad':'custom_fields.ciudad',
        'Res':'custom_fields.res'
        
      },
      headers: [
        { text: 'Matricula', value: 'custom_fields.matricula' , sortable: true, align: 'center' , width:'5%'},
        { text: 'Nombre Completo', value: 'display_name' , sortable: true, align: 'center' , width:'35%'},
        { text: 'Documento Nro', value: 'custom_fields.documento_nro' , sortable: true, align: 'center' , width:'15%'},
        { text: 'Título', value: 'custom_fields.titulo_profesional' , sortable: true, align: 'center', width:'30%' },
        { text: 'Ciudad', value: 'custom_fields.ciudad' , sortable: true, align: 'center', width:'5%' },
        { text: 'Res', value: 'custom_fields.res' , sortable: true, align: 'center', width:'5%' },
        { text: 'Ver Detalle', value: 'detalle' , sortable: false, align: 'center', width:'5%' }
      ],
      buscarMatriculado:'',
      count:0,
      pages:0,
      pageNumber:0,
      pageSize:20,
      dialogMatriculado:false,
      editedIndex: -1,
      editedItem:{
        display_name:'',
        custom_fields:{
          matricula:'',
          documento_nro:'',
          titulo_profesional:'',
          ciudad:'',
          res:''
        }
      },
      defaultItem: {
        display_name:'',
        custom_fields:{
          matricula:'',
          documento_nro:'',
          titulo_profesional:'',
          ciudad:'',
          res:''
        }
      },
      dialog_ops:{
        dialog: false,
        buttonName:"",
        dialogTitle:"Información de Empleo",
        dialogContent:[],
        icon:"visibility"
      },

      // apigw: process.env.TEU_API,
      loading: false,
      saving:false,
      error: false,
      error_message: '',
      details_loading: false
      
    }),
    created:function(){
      let params = {
        pageNumber:this.pageNumber,
        pageSize:this.pageSize
      }
      store.dispatch('MATRICULADOS_retrieveAll',params);
    },
    computed:{
      matriculados(){
        console.log("Matriculados: ",store.state.matriculados.items);
        return store.state.matriculados.items;
      }
    },
    watch:{
      matriculados(){},
      dialog (val) {
        console.log("Cambiando Dialog ",val);
        val || this.close()
      }
    },
    methods:{
        showMatriculado(matriculado){
          let vm = this;
          vm.editedIndex = this.$store.state.matriculados.items.payload.indexOf(matriculado)
          vm.editedItem = Object.assign({}, matriculado)
          vm.dialogMatriculado = true
          console.log("abriendo Dialog: ",vm.editedItem);
        },
        close() {
          this.dialogMatriculado = false
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
