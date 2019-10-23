<template>
<div class="text-center">
    <v-dialog
      v-model="dialogChangePassword"
      width="350"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="indigo lighten-2"
          dark
          class="mb-3"
          v-on="on"
        >
          Cambiar Contraseña
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Cambiar Contraseña
        </v-card-title>

        <v-card-text class="pt-4">
            <div>
              <v-form v-model="form.valid" ref="form">
                <v-text-field
                    ref="password"
                    label="Ingrese su nueva contraseña"
                    v-model="form.password"
                    type="password"
                    required
                ></v-text-field>
                <v-text-field
                    ref="rePassword"
                    label="Ingrese su clave"
                    v-model="form.rePassword"
                    :rules="[comparePasswords]"
                    type="password"
                    v-on:keyup.enter="submit"
                    required
                ></v-text-field>
                <v-layout justify-center>
                  <v-btn @click="submit" :class=" { 'success darken-4 white--text' : form.valid, disabled: !form.valid }" :loading="changing">Aceptar</v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    props:['user_id'],
    name:'password-change',
    data:() => ({
        dialogChangePassword:false,
        changing:false,
        form: {
            password:'',
            valid: false,
        }
    }),
    computed:{
        changingPassword(){
            return store.state.login_api.fetchUserIsRunning
        },
        showDialog(){
            return store.state.login_api.dialogChangePassword
        },
        user() {
            return store.state.login_api.user
        }
    },
    watch:{
        user(){},
        showDialog(val){
            if(!val){
                this.dialogChangePassword = false;
            }
        },
        changingPassword(val){
            if(val){
                this.changing = true
            }else{
                this.changing = false
            }
        }
    },
    methods:{
        submit () {
            if (this.$refs.form.validate()) {
                console.log("formulario valido")
                let data = {
                    password: this.form.password,
                    id: this.$store.state.login_api.user.user.id
                }
                store.dispatch('LOGIN_API_changePassword',data)
            }else{
                console.log("formulario no valido")
            }
        },
        comparePasswords(){
            if(this.form.password !== this.form.rePassword){
                return "Las claves deben Coincidir"
            }else{
                return true
            }
        }   
    }
}
</script>