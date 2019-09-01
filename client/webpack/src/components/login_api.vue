<template>
      <v-flex xs12 sm12 >
        <v-toolbar class="blue darken-4">
          <v-toolbar-title class="white--text"><h4>Iniciar como Matriculado <v-icon right dark>school</v-icon></h4></v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form v-model="form.valid" ref="form">
                <v-text-field
                        prepend-icon="person"
                        label="Ingrese su nombre de usuario"
                        v-model="form.data.username"
                        :rules="rule.username"
                        @keyup.enter="submit"
                        required
                ></v-text-field>
                <v-text-field
                        prepend-icon="lock"
                        min="3"
                        label="Ingrese su clave"
                        v-model="form.data.password"
                        :rules="rule.password"
                        :append-icon="form.password_hidden ? 'visibility' : 'visibility_off'"
                        @click:append="() => (form.password_hidden = !form.password_hidden)"
                        :type="form.password_hidden ? 'password' : 'text'"
                        v-on:keyup.enter="submit"
                        counter
                        required
                ></v-text-field>
                <v-layout justify-center>
                  <v-btn @click="submit" :class=" { 'success darken-4 white--text' : form.valid, disabled: !form.valid }" :loading="loginIsRunning">Aceptar</v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
</template>
<script>
  import router from '../router/index'

  export default {
    name: "login_api",
    data(){
      return{
        // apigw: process.env.SIEP_API_GW_INGRESS,
        form: {
          data: {
            username: '',
            password: ''
          },
          valid: false,
          password_hidden: true,
          logueado:false,
        },
        rule: {
          username: [
            (v) => !!v || 'El usuario es requerido'
          ],
          password: [
            (v) => !!v || 'La clave es requerida'
          ]
        },
      }
    },
    beforeCreate:function(){

    },
    created: function(){
      // store.commit('updateTitle',"SIEP | Iniciar sesión");
      // this.chkLogged();
    },
    computed:{
      user(){
        return store.state.login_api.user
      },
      logged() {
        return store.state.login_api.loggedIn;
      },
      loginIsRunning(){
        return store.state.login_api.loginIsRunning
      }
    },
    watch:{
      logged() {
        if(!this.logged){
          this.form.data.password ="";
          this.form.data.username ="";
        }
      }
    },
    methods:{
      submit () {
        if (this.$refs.form.validate()) {
          store.dispatch('LOGIN_API_login',this.form.data);
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      logout() {
        this.form.data.username="";
        this.form.data.password="";
        store.dispatch('LOGIN_API_logout');
      }
    }
  }
</script>
