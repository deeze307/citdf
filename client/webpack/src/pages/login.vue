<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
              <v-layout column align-center>
                <img src="@/assets/escudo_color.jpg" alt="SIEP-ADMIN" class="mb-5">

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
    created: function(){
      store.commit('updateTitle',"SIEP | LogIn");
      this.logout();
    },
    data(){
      return{
        color: '#5C6BC0',
        apigw: process.env.SIEP_API_GW_INGRESS,
      }
    },
    name: "login",
    computed:{
      user(){
        return store.state.user
      },
      administracion(){
        if(store.state.administracion.administracion.en_mantenimiento === 1){
          router.push('/mantenimiento');
        }
        return store.state.administracion.administracion;
      }
      
    },
    watch: {
      administracion(){}
    },
    methods:{
      goTo : function(social){
        window.location = this.apigw+'/auth/social/'+social;
      },
      logout : function(){
        if(this.user.loggedIn){
          store.dispatch('logout');
        }
      }
    }
  }
</script>

