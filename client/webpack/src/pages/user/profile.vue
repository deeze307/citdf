<template>
   <v-container fluid>
      <v-flex xs12 sm12 md12 lg12 xl12 class="mt-5">
        <v-layout row px-10>
        <v-flex xs12 sm3 md3 lg3 xl3 class="mx-3">
          <v-card elevation=5 class="mt-5">
            <v-layout column align-center>
              <v-flex style="position:relative; top:-50px;">
                  <v-avatar size="96">
                      <img :src="form.avatar_urls['96']" alt="Avatar">
                  </v-avatar>
                  <!-- <v-btn @click="openAvatarPicker">Change Avatar</v-btn> -->
              </v-flex>
            </v-layout>
            <v-card-text>
              <v-layout column align-center>
                <p class="title font-weight-thin">Información Básica</p>
              </v-layout>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-text-field
                  readonly
                  v-model="form.name"
                  label="Nombre"></v-text-field>
                </v-flex>
                <!-- <v-text-field
                readonly
                v-model="form.lastName"
                label="Apellidos"></v-text-field> -->
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-text-field
                  readonly
                  v-model="form.custom_fields.titulo_profesional"
                  label="Título Profesional"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-text-field
                  readonly
                  v-model="form.custom_fields.titulo_profesional_2"
                  label="Título Profesional 2"></v-text-field>
                </v-flex>
                <v-row>
                  <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field
                    readonly
                    v-model="form.custom_fields.matricula"
                    label="Matricula N°"></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field
                    readonly
                    v-model="form.custom_fields.res"
                    label="Resolución N°"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field 
                    readonly
                    v-model="form.custom_fields.documento_nro"
                    label="Documento Nro."></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field
                    readonly
                    v-model="form.custom_fields.ciudad"
                    label="Localidad"></v-text-field>
                  </v-col>
                </v-row>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md8 lg8 xl8 class="mx-5">
          <v-card elevation=5 class="mt-5">
            <v-card-title align-center>
              <v-layout column align-center>
                <p class="text-center title font-weight-thin">Información Adicional</p>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-layout row>
              <v-flex xs12 sm5 md5 lg5 xl5 d-flex class="ml-5 mr-5">
                <v-layout column xs12 sm3 md3 lg3 xl3 d-flex>
                  <v-flex xs12 sm3 md3 lg3 xl3 d-flex>
                    <v-text-field
                      v-model="form.custom_fields.direccion"
                      label="Dirección"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg6 xl6 d-flex>
                    <v-text-field
                      v-model="form.custom_fields.telefono"
                      label="Teléfono"></v-text-field>
                  </v-flex >
                  <v-text-field
                      v-model="form.custom_fields.user_email"
                      label="E-Mail"></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm5 md5 lg5 xl5 d-flex>
                <v-layout column>
                    <v-flex xs12 sm6 md6 lg6 xl6 d-flex>
                      <v-text-field
                        v-model="form.url"
                        label="Sítio Web"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6 xl6 d-flex>
                      <v-text-field
                        v-model="form.custom_fields.perfil_de_facebook"
                        label="Perfíl de Facebook"></v-text-field>
                    </v-flex >
                    <v-flex xs12 sm6 md6 lg6 xl6 d-flex>
                      <v-text-field
                        v-model="form.custom_fields.perfil_de_linkedin"
                        label="Perfíl de LinkedIn"></v-text-field>
                    </v-flex>
                    
                  </v-layout>
                  
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12 d-flex class="px-5">
                  <!-- <v-select
                    v-model="form.custom_fields.apt"
                    :items="aptitudes"
                    label="Aptitudes"
                    multiple
                    chips
                    persistent-hint
                  ></v-select> -->
                  <v-textarea
                  v-model="form.custom_fields.apt"
                  label="Aptitudes"
                  hint="Aptitudes que considere relevantes"
                  counter="200"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12 d-flex class="px-5">
                  <v-textarea
                  v-model="form.description"
                  label="Acerca de mi"
                  hint="Redacte lo que desea que las demás personas conozcan de ustéd"
                  counter="100"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12 d-flex class="px-5">
                  <v-switch
                    v-model="form.custom_fields.newsletter"
                    label="Suscripto a Newsletter"
                  ></v-switch>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-flex>
                <v-btn color="primary" :loading="loading" @click="updateProfile()">
                  <v-icon left dark>check</v-icon>
                  Actualizar
                </v-btn>
              </v-flex>
                
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
     </v-flex>
    </v-container>
</template>
<script>
import router from '../../router'

  export default {
    
    data(){
      return{
        loading: false,
        form: {
          avatar_urls:['96'],
          custom_fields:{newsletter:false}
        },
        ciudades:[
          'Ushuaia',
          'Tolhuin',
          'Rio Grande'
        ],
        profesiones:[
          'Ingeniero en Sistemas',
          'Ingeniero Químico',
          'Ingeniero Electrónico',
          'Arquitecto',
        ],
        apt:['Mantenimiento de PC','Microsoft Office','Electricidad'],
        aptitudes:[
          'Mantenimiento de PC','Microsoft Office','Libre Office','AutoCad','Windows','Linux','MacOs','Programación',
          'C#','Carpintería','Electricidad','Herrería','Liderazgo'
        ]
      }
    },
    name: "profile",
    created: function(){
    },
    computed:{
      dialog(){
        return store.state.dialog.dialog;
      },
      user() {
        console.log("Usuario: ",store.state.login_api.user);
        if(store.state.login_api.user.name !== ""){
          this.assignProfile();
        }
        return store.state.login_api.user
      }
    },
    mounted(){
    },
    watch:{
      dialog(){},
      user(val){
        if(val.user.name !== ""){
          this.assignProfile();
        }
      }
    },
    methods:{
      updateProfile(){
        store.dispatch('PROFILE_update',this.form);
      },
      assignProfile(){
        let vm = this;
        vm.form = vm.$store.state.login_api.user.user;
      }
    }
  }
</script>

<style>
</style>