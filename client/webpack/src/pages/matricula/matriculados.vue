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
        <v-flex xs12 sm12 md1 lg2 xl2 class="ml-5 mr-1">
          <v-select
            :items="['Todos','Ushuaia','Tolhuin','Rio Grande']"
            label="Ciudad"
            v-model="ciudadMatriculado"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12 md2 lg2 xl2 class="mr-1">
          <v-select
            :items="titulos"
            label="Titulo Profesional"
            v-model="tituloMatriculado"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex v-if="loggedAsAdmin" xs12 sm12 md1 lg1 xl1>
          <!-- <template v-slot:activator="{ on }"> -->
            <v-btn color="light-blue" class="mr-2"  dark small rounded @click="toggleAdminMatriculado(true)"><v-icon class="ml-1" left>person_add</v-icon></v-btn>
              <!-- </template> -->
            <v-dialog v-model="dialogAdminMatriculado" persistent max-width="700px">
              <v-card>
                <v-card-title>
                  <span v-if="newItem" class="headline">Nuevo Matriculado</span>
                  <span v-else class="headline">Editando Matriculado "{{editedItem.display_name}}"</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="3" md="3" lg="3">
                        <v-text-field v-model="editedItem.nickname" label="Usuario" readonly></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="5" v-if="newItem">
                        <v-text-field
                          v-model="editedItem.password"
                          :append-icon="password_hidden ? 'visibility' : 'visibility_off'"
                          @click:append="() => (password_hidden = !password_hidden)"
                          :type="password_hidden ? 'password' : 'text'" 
                          label="Contraseña" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.first_name" label="Nombres" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.last_name" label="Apellidos" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-select
                          v-model="editedItem.ciudad"
                          :items="['Ushuaia','Tolhuin','Rio Grande']"
                          label="Ciudad"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.user_email" label="Email" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="editedItem.titulo_profesional"
                          :items="titulosForms"
                          label="Titulo Profesional"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.universidad" label="Universidad" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.promocion" type="number" min="1900" max="2030" label="Año de Promoción" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field type="number" min="0" max="99999999" v-model="editedItem.documento_nro" label="N° de Documento" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="editedItem.titulo_profesional_2"
                          :items="titulosForms"
                          label="Titulo Profesional 2"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.universidad_2" label="Universidad 2" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.promocion_2" label="Año de Promoción 2" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm=6 md=4 lg=4>
                        <v-text-field v-model="editedItem.matricula" label="Matrícula N°" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm=6 md=4 lg=4>
                        <v-text-field v-model="editedItem.res" label="Resolución N°" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm=6 md=4 lg=4>
                        <v-text-field v-model="editedItem.telefono" label="Teléfono" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm=6 md=4 lg=4>
                        <v-text-field v-model="editedItem.direccion" label="Dirección" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm=6 md=4 lg=4>
                        <v-text-field v-model="editedItem.user_url" label="URL de Sitio Web" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm=6 md=4 lg=4>
                        <v-text-field v-model="editedItem.perfil_de_facebook" label="Perfíl Facebook" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm=6 md=4 lg=4>
                        <v-text-field v-model="editedItem.perfil_de_linkedin" label="Perfíl LinkedIn" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm=12 md=12 lg=12>
                        <v-textarea 
                          v-model="editedItem.apt" 
                          label="Aptitudes"
                          counter="300"
                          maxlength="300"
                          required></v-textarea>
                      </v-col>
                      <v-col cols="12" sm=12 md=12 lg=12>
                        <v-textarea 
                          v-model="editedItem.observaciones" 
                          label="Observaciónes."
                          counter="200"
                          maxlength="200"
                          required></v-textarea>
                      </v-col>
                      <v-col cols="12" sm=6 md=4 lg=4>
                        <v-switch
                          v-model="editedItem.habilitado"
                          label="Habilitado"
                        ></v-switch>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="red darken-1" text @click="dialogAdminMatriculado = false">Cancelar</v-btn>
                  <v-btn v-if="newItem" color="green darken-1" :loading="saving" text @click="createMatriculado">Crear</v-btn>
                  <v-btn v-else color="green darken-1" :loading="saving" text @click="updateMatriculado">Actualizar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-flex>
        <v-flex class="ml-1" xs12 sm12 md3 lg2 xl2>
          <download-excel
              :data   = "matriculados.payload"
              :fields = "exportHeaders"
              worksheet = "Lista de Matriculados"
              name    = "Lista de Matriculados.xls">
          <v-btn color="success" small rounded> <v-icon left>cloud_download</v-icon>Descargar</v-btn>
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
            <template v-slot:item.habilitado="{item}">
                <v-icon v-if="item.habilitado" small right>done</v-icon>
                <v-icon v-if="!item.habilitado" small right>block</v-icon>
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
                        <div><span><strong>N° de Matricula:</strong></span> {{ editedItem.matricula }}</div>
                        <div><span><strong> N° de Documento:</strong></span> {{ editedItem.documento_nro }}</div>
                        <div><span><strong> Título Profesional:</strong></span> {{ editedItem.titulo_profesional }}</div>
                        <div><span><strong> Año de Promoción:</strong></span> {{ editedItem.promocion }}</div>
                        <div><span><strong> Universidad:</strong></span> {{ editedItem.universidad }}</div>
                        <div><span><strong> Título Profesional 2:</strong></span> {{ editedItem.titulo_profesional_2 }}</div>
                        <div><span><strong> Año de Promoción 2:</strong></span> {{ editedItem.promocion_2 }}</div>
                        <div><span><strong> Universidad 2:</strong></span> {{ editedItem.universidad_2 }}</div>
                        <div><span><strong> Ciudad:</strong></span> {{ editedItem.ciudad }}</div>
                        <div><span><strong> Email:</strong></span> {{ editedItem.user_email }}</div>
                        <div><span><strong> Dirección:</strong></span> {{ editedItem.direccion }}</div>
                        <div><span><strong> Teléfono:</strong></span> {{ editedItem.telefono }}</div>
                        <div><span><strong> Perfíl de Facebook:</strong></span> {{ editedItem.perfil_de_facebook }}</div>
                        <div><span><strong> Perfíl de LinkedIn:</strong></span> {{ editedItem.perfil_de_linkedin }}</div>
                        <div><span><strong> URL de Sitio Web:</strong></span> {{ editedItem.user_url }}</div>
                        <div><span><strong> Aptitudes:</strong></span> {{ editedItem.apt }}</div>
                        <div><span><strong> Acerca de:</strong></span> {{ editedItem.description }}</div>
                        <div v-if="loggedAsAdmin">
                          <v-switch
                            v-model="editedItem.habilitado"
                            label="Habilitado"
                          ></v-switch>
                        </div>
                      </v-col>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn v-if="loggedAsAdmin" color="orange darken-1" :loading="saving" text @click="update(editedItem)">Actualizar</v-btn>
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
      headers:[{ text: 'N° de Matrícula', value: 'matricula' , sortable: true, align: 'center' , width:'5%'},
        { text: 'Nombre Completo', value: 'display_name' , sortable: true, align: 'center' , width:'35%'},
        { text: 'N° de Documento', value: 'documento_nro' , sortable: true, align: 'center' , width:'10%'},
        { text: 'Título', value: 'titulo_profesional' , sortable: true, align: 'center', width:'30%' },
        { text: 'Ciudad', value: 'ciudad' , sortable: true, align: 'center', width:'5%' },
        { text: 'Res', value: 'res' , sortable: true, align: 'center', width:'5%' },
        this.loggedAsAdmin?{ text: 'Estado', value: 'habilitado' , sortable: true, align: 'center', width:'5%' }:'',
        { text: 'Detalle', value: 'detalle' , sortable: false, align: 'center', width:'5%' }],
      titulos:[
        "Todos",
        "Arquitecto",
        "Bioingeniero",
        "Especialista en Seguridad, Higiene y Protección Ambiental",
        "Ingeniero Aeronáutico",
        "Ingeniero Agrónomo",
        "Ingeniero Ambiental",
        "Ingeniero Biomédico",
        "Ingeniero Bioquímico",
        "Ingeniero Civíl",
        "Ingeniero Electricista",
        "Ingeniero Eléctrico",
        "Ingeniero Eléctrico Electrónico",
        "Ingeniero Electromecánico",
        "Ingeniero Electromecánico - Orientación Electricista",
        "Ingeniero Electrónico",
        "Ingeniero en Alimentos",
        "Ingeniero en Computación",
        "Ingeniero en Construcciones",
        "Ingeniero en Electrónica",
        "Ingeniero en Electrónica y Telecomunicaciones",
        "Ingeniero en Gestión de Siniestros y Seguridad Ambiental",
        "Ingeniero en Informática",
        "Ingeniero en la Industria de la Madera",
        "Ingeniero en Recursos Hídricos",
        "Ingeniero en Recursos Naturales Renovables",
        "Ingeniero en Recursos Naturales y Medio Ambiente",
        "Ingeniero en Seguridad Ambiental",
        "Ingeniero en Seguridad e Higiene en el Trabajo",
        "Ingeniero en Sistemas",
        "Ingeniero en Sistemas de Computación",
        "Ingeniero en Sistemas de Información",
        "Ingeniero en Sistemas Informáticos",
        "Ingeniero en Telecomunicaciones",
        "Ingeniero en Vías de Comunicación",
        "Ingeniero Forestal",
        "Ingeniero Industrial",
        "Ingeniero Mecánico",
        "Ingeniero Mecánico Aeronáutico",
        "Ingeniero Mecánico Electricista",
        "Ingeniero Metalúrgico",
        "Ingeniero Pesquero",
        "Ingeniero Químico",
        "Ingeniero en Industrias de la Alimentación",
        "Ingeniero de Sonido"
      ],
      titulosForms:[
        "Todos",
        "Arquitecto",
        "Bioingeniero",
        "Especialista en Seguridad, Higiene y Protección Ambiental",
        "Ingeniero Aeronáutico",
        "Ingeniero Agrónomo",
        "Ingeniero Ambiental",
        "Ingeniero Biomédico",
        "Ingeniero Bioquímico",
        "Ingeniero Civíl",
        "Ingeniero Electricista",
        "Ingeniero Eléctrico",
        "Ingeniero Eléctrico Electrónico",
        "Ingeniero Electromecánico",
        "Ingeniero Electromecánico - Orientación Electricista",
        "Ingeniero Electrónico",
        "Ingeniero en Alimentos",
        "Ingeniero en Computación",
        "Ingeniero en Construcciones",
        "Ingeniero en Electrónica",
        "Ingeniero en Electrónica y Telecomunicaciones",
        "Ingeniero en Gestión de Siniestros y Seguridad Ambiental",
        "Ingeniero en Informática",
        "Ingeniero en la Industria de la Madera",
        "Ingeniero en Recursos Hídricos",
        "Ingeniero en Recursos Naturales Renovables",
        "Ingeniero en Recursos Naturales y Medio Ambiente",
        "Ingeniero en Seguridad Ambiental",
        "Ingeniero en Seguridad e Higiene en el Trabajo",
        "Ingeniero en Sistemas",
        "Ingeniero en Sistemas de Computación",
        "Ingeniero en Sistemas de Información",
        "Ingeniero en Sistemas Informáticos",
        "Ingeniero en Telecomunicaciones",
        "Ingeniero en Vías de Comunicación",
        "Ingeniero Forestal",
        "Ingeniero Industrial",
        "Ingeniero Mecánico",
        "Ingeniero Mecánico Aeronáutico",
        "Ingeniero Mecánico Electricista",
        "Ingeniero Metalúrgico",
        "Ingeniero Pesquero",
        "Ingeniero Químico",
        "Ingeniero en Industrias de la Alimentación",
        "Ingeniero de Sonido"
      ],
      form:{},
      password_hidden: true,
      loggedAsAdmin:false,
      matriculadosResult:[],
      matriculadosOrigen:[],
      buscarMatriculado:'',
      tituloMatriculado:'Todos',
      ciudadMatriculado:'Todos',
      count:0,
      pages:0,
      pageNumber:0,
      pageSize:20,
      dialogMatriculado:false,
      dialogAdminMatriculado:false,
      editedIndex: -1,
      newItem:false,
      editedItem:{
        habilitado:true
      },
      defaultItem: {
        display_name:'',
        matricula:'',
        documento_nro:'',
        titulo_profesional:'',
        ciudad:'',
        res:''
      },

      // LOADERS
      loading: true,
      saving:false,
      error: false,
      error_message: '',
      details_loading: false
      
    }),
    created:function(){
      store.dispatch('LOGIN_API_fetchUserRemember');
      console.log("Es admin: "+this.loggedAsAdmin)
      let params={ciudad:this.ciudadMatriculado,titulo_profesional:this.tituloMatriculado, admin:this.loggedAsAdmin};
      this.matriculadosOrigen=[];
      // this.isAdmin();
      // let params = {
      //   pageNumber:this.pageNumber,
      //   pageSize:this.pageSize
      // }
      

      store.dispatch('MATRICULADOS_retrieveAll',params);

    
    },
    computed:{
      matriculados(){
        this.matriculadosOrigen = store.state.matriculados.items;
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
      },
      logged() {
        this.verifyUserData();
        return store.state.login_api.loggedIn;
      }
    },
    watch:{
      matriculados(val){
        if(val.payload){
          this.matriculadosResult = val;
          this.loading = false
        }
      },
      matriculadosOrigen(){
      },
      dialog (val) {
        val || this.close()
      },
      ciudadMatriculado(){
        this.loading = true;
        let params = {ciudad:this.ciudadMatriculado, titulo_profesional:this.tituloMatriculado, admin:this.loggedAsAdmin};
        store.dispatch('MATRICULADOS_retrieveAll',params);
      },
      tituloMatriculado(){
        this.loading = true;
        let params = {ciudad:this.ciudadMatriculado, titulo_profesional:this.tituloMatriculado, admin:this.loggedAsAdmin};
        store.dispatch('MATRICULADOS_retrieveAll',params);
      },
      user(val){
        this.loading = true;
        if(val.user){
          this.isAdmin(val.user.slug);
        }else if(val.user_nicename){
          this.isAdmin(val.user.user_nicename);
        }
        this.headers=[
          { text: 'N° de Matrícula', value: 'matricula' , sortable: true, align: 'center' , width:'5%'},
          { text: 'Nombre Completo', value: 'display_name' , sortable: true, align: 'center' , width:'35%'},
          { text: 'N° de Documento', value: 'documento_nro' , sortable: true, align: 'center' , width:'10%'},
          { text: 'Título', value: 'titulo_profesional' , sortable: true, align: 'center', width:'30%' },
          { text: 'Ciudad', value: 'ciudad' , sortable: true, align: 'center', width:'5%' },
          { text: 'Res', value: 'res' , sortable: true, align: 'center', width:'5%' },
          this.loggedAsAdmin?{ text: 'Estado', value: 'habilitado' , sortable: true, align: 'center', width:'5%' }:'',
          { text: 'Detalle', value: 'detalle' , sortable: false, align: 'center', width:'5%' }
        ]
        let params = {ciudad:this.ciudadMatriculado, titulo_profesional:this.tituloMatriculado, admin:this.loggedAsAdmin};
        store.dispatch('MATRICULADOS_retrieveAll',params);

      }
    },
    methods:{
      verifyUserData(){
         return (_.has(this.user.user,'firstName') && this.user.user.firstName.length > 1) ? true : false;
      },
      showMatriculado(matriculado){
        let vm = this;
        vm.editedIndex = this.$store.state.matriculados.items.payload.indexOf(matriculado)
        vm.editedItem = Object.assign({}, matriculado)
        console.log(matriculado)
        // Si es admin muestra el formulario de edición
        if(vm.loggedAsAdmin){
          vm.dialogAdminMatriculado = true
        }else{ // de lo contrario muestra el modal con los datos fijos
          vm.dialogMatriculado = true
        }
      },
      close() {
        this.dialogMatriculado = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      createMatriculado(){
        this.saving = true;
        store.dispatch('MATRICULADOS_create')
        .then((response) => {
          console.log(response)
          this.saving = false;
        });
      },
      toggleAdminMatriculado(newItem){
        if(newItem){
          this.editedItem={}
          this.newItem = true
        }else{
          this.newItem = false
        }
        this.dialogAdminMatriculado = true
      },
      updateMatriculado(){
        let vm = this;
        vm.saving = true

        let matriculado = vm.editedItem
        let params = {ciudad:this.ciudadMatriculado, titulo_profesional:this.tituloMatriculado, admin:this.loggedAsAdmin};
        let payload = {matriculado,params}
        store.dispatch('MATRICULADOS_updateFromTable',payload).then(function(response){
          vm.saving = false;
        })
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
