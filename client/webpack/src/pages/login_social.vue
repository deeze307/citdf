<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>

                <v-subheader>
                    Ingrese con las Redes Sociales
                </v-subheader>
                <v-divider></v-divider>

                <div class="text-xs-center">
                    <v-btn round color="indigo darken-3" dark @click="goTo('facebook')">Ingresar con facebook</v-btn>
                    <v-btn round color="red darken-1" dark @click="goTo('google')">Ingresar con Google</v-btn>
                </div>

            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>
<script>
  import router from '../router'

  export default {
    name: "login_social",
    data(){
      return{
        apigw: process.env.SIEP_API_GW_INGRESS
      }
    },
    created: function(){
      store.commit('updateTitle',"SIEP | Iniciar sesión");
    },
    computed:{
      user(){
        return store.state.user
      }
    },
    methods:{
      goTo : function(social){
        window.location = this.apigw+'/auth/social/'+social+'?app=siep-admin';
      }
    }
  }
</script>