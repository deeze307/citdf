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
            :items="['Todos','Ushuaia','Tolhuin','Rio Grande']"
            label="Ciudad"
            v-model="ciudadMatriculado"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12 md2 lg2 xl2 class="ml-5 mr-2">
          <v-row justify="center">
            <v-dialog v-model="dialogNuevoMatriculado" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on">Agregar Matriculado</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Nombres" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Apellidos" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Email*" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Password*" type="password" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="['0-17', '18-29', '30-54', '54+']"
                          label="Age*"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                          label="Interests"
                          multiple
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="dialogNuevoMatriculado = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="dialogNuevoMatriculado = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-flex>
        <!-- <v-flex xs12 sm12 md2 lg2 xl2>
          <v-select
            :items="['Ushuaia','Tolhuin','Rio Grande']"
            label="Titulo Profesional"
          ></v-select>
        </v-flex> -->
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
            :items="matriculadosResult.payload"
            :loading="loading"
            loading-text="Cargando... espere por favor"
            :search="buscarMatriculado"
            class="elevation-1"
            :footer-props="{
              showFirstLastPage: true,
              firstIcon: 'first_page',
              lastIcon: 'last_page',
              prevIcon: 'chevron_left',
              nextIcon: 'chevron_right'
            }"
            >
            <template v-slot:item.custom_fields.habilitado="{item}">
                <v-icon v-if="item.custom_fields.habilitado" small right>done</v-icon>
                <v-icon v-if="!item.custom_fields.habilitado" small right>block</v-icon>
            </template>
            <template v-slot:top>
              <v-dialog v-model="dialogMatriculado" max-width="400">
                <v-card>
                  <v-card-title>
                    <span class="headline"><v-icon left>person_pin</v-icon> Datos de Matriculado</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-col>
                        <div><span><strong>Matricula:</strong></span> {{ editedItem.matricula }}</div>
                        <div><span><strong> Número Documento:</strong></span> {{ editedItem.documento_nro }}</div>
                        <div><span><strong> Título Profesional:</strong></span> {{ editedItem.titulo_profesional }}</div>
                        <div><span><strong> Ciudad:</strong></span> {{ editedItem.ciudad }}</div>
                        <div><span><strong> Email:</strong></span> {{ editedItem.user_email }}</div>
                        <div><span><strong> Dirección:</strong></span> {{ editedItem.direccion }}</div>
                        <div><span><strong> Teléfono:</strong></span> {{ editedItem.telefono }}</div>
                        <div><span><strong> Perfíl de Facebook:</strong></span> {{ editedItem.facebook_profile }}</div>
                        <div><span><strong> Perfíl de LinkedIn:</strong></span> {{ editedItem.linkedin_profile }}</div>
                        <div><span><strong> Sitio Web:</strong></span> {{ editedItem.user_url }}</div>
                        <div><span><strong> Aptitudes:</strong></span> {{ editedItem.apt }}</div>
                        <div><span><strong> Acerca de:</strong></span> {{ editedItem.description }}</div>
                        <div v-if="loggedAsAdmin">
                          <v-switch
                            v-model="editedItem.newsletter"
                            label="Habilitado"
                          ></v-switch>
                        </div>
                      </v-col>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn v-if="loggedAsAdmin" color="orange darken-1" text>Actualizar</v-btn>
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
        'Matricula': 'matricula',
        'Nombre Completo': 'display_name',
        'Documento Nro': 'documento_nro',
        'Título Profesional': 'titulo_profesional',
        'Ciudad':'ciudad',
        'Estado':'ciudad',
        'Res':'res'
        
      },
      headers: [
        { text: 'Matricula', value: 'matricula' , sortable: true, align: 'center' , width:'5%'},
        { text: 'Nombre Completo', value: 'display_name' , sortable: true, align: 'center' , width:'35%'},
        { text: 'Documento Nro', value: 'documento_nro' , sortable: true, align: 'center' , width:'10%'},
        { text: 'Título', value: 'titulo_profesional' , sortable: true, align: 'center', width:'30%' },
        { text: 'Ciudad', value: 'ciudad' , sortable: true, align: 'center', width:'5%' },
        { text: 'Res', value: 'res' , sortable: true, align: 'center', width:'5%' },
        { text: 'Estado', value: 'habilitado' , sortable: true, align: 'center', width:'5%' },
        { text: 'Ver Detalle', value: 'detalle' , sortable: false, align: 'center', width:'5%' }
      ],
      loggedAsAdmin:false,
      matriculadosResult:[],
      matriculadosOrigen:[],
      buscarMatriculado:'',
      ciudadMatriculado:'',
      count:0,
      pages:0,
      pageNumber:0,
      pageSize:20,
      dialogMatriculado:false,
      dialogNuevoMatriculado:false,
      editedIndex: -1,
      editedItem:{
        display_name:'',
        matricula:'',
        documento_nro:'',
        titulo_profesional:'',
        ciudad:'',
        res:''
      },
      defaultItem: {
        display_name:'',
        matricula:'',
        documento_nro:'',
        titulo_profesional:'',
        ciudad:'',
        res:''
      },
      dialog_ops:{
        dialog: false,
        buttonName:"",
        dialogTitle:"Información de Empleo",
        dialogContent:[],
        icon:"visibility"
      },

      // apigw: process.env.TEU_API,
      loading: true,
      saving:false,
      error: false,
      error_message: '',
      details_loading: false
      
    }),
    created:function(){
      let params={};
      this.matriculadosResult=[];
      // this.isAdmin();
      // let params = {
      //   pageNumber:this.pageNumber,
      //   pageSize:this.pageSize
      // }
      store.dispatch('MATRICULADOS_retrieveAll',params);
      store.dispatch('LOGIN_API_fetchUser');
    
    },
    computed:{
      matriculados(){
        this.matriculadosResult = store.state.matriculados.items;
        return store.state.matriculados.items;
      },
      user() {
        let usuario = store.state.login_api.user;
        if(usuario.user_nicename){
          this.isAdmin(usuario.user_nicename);
        }else if(usuario.slug){
          this.isAdmin(usuario.slug);
        }
        return usuario;
      }
    },
    watch:{
      matriculados(val){
        if(val.payload && !this.matriculadosOrigen.payload){
          this.matriculadosOrigen = val;
        }
        if(val.payload.length > 0){
          this.loading = false
        }
      },
      dialog (val) {
        val || this.close()
      },
      ciudadMatriculado(){
        this.filterMatriculados();
      },
      user(val){
        if(val.user){
          this.isAdmin(val.user.slug);
        }else if(val.user_nicename){
          this.isAdmin(val.user.user_nicename);
        }
      }
    },
    methods:{
        showMatriculado(matriculado){
          let vm = this;
          vm.editedIndex = this.$store.state.matriculados.items.payload.indexOf(matriculado)
          vm.editedItem = Object.assign({}, matriculado)
          vm.dialogMatriculado = true
        },
        close() {
          this.dialogMatriculado = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },
        filterMatriculados(){
          this.loading = true;

          if(this.ciudadMatriculado === "Todos"){
            // this.matriculadosResult.payload = this.matriculadosOrigen.payload;
            this.loading = false;
          }else if(this.ciudadMatriculado !== ""){
            let filtered = [];
            this.matriculadosResult.payload.map(mPayload =>{
              // console.log("este es el payload",mPayload);
              if(mPayload.ciudad === this.ciudadMatriculado){
                filtered.push(mPayload);
              }
            })
            this.matriculadosResult.payload = filtered;
            this.loading = false;
          }
          console.log("Seleccionado: "+this.ciudadMatriculado + "|"+this.matriculadosOrigen.payload.length);
        },
        isAdmin(matriculado){
          let vm = this;
          if(matriculado === 'citdf' || matriculado === 'secretaria'){
            vm.loggedAsAdmin = true;
          }else{
            vm.loggedAsAdmin = false;
          }
        }
    }
}
</script>

<style>

</style>
