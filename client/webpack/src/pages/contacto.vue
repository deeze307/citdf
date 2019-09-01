<template>
  <v-container class="ml-0 mr-0">
    <v-layout align-center justify-space-around row>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h2 class="display-1 font-weight-black" style="color:#263238">Contáctenos</h2>
      </v-flex>
      <v-flex xs12 sm12 md6 lg4 xl4>
        <h3 class=".subheading font-weight-light">
          <div v-html="contacto.content.rendered"></div>
        </h3>
      </v-flex>
      <v-flex xs12 sm12 md6 lg4 xl4>
        <h3 class=".subheading font-weight-light" text-center>
          Enví­enos su consulta o comentario completando el siguiente formulario de contacto y le responderemos a la brevedad. Muchas gracias por contactarnos.
        </h3>
        <form>
          <v-text-field
            v-model="form.name"
            :counter="30"
            label="Nombre"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.telefono"
            label="N° Teléfono"
            required
            hint="Código de País y Código de Area Incluido"
          ></v-text-field>
          <v-textarea
          v-model="form.message"
          label="Redacte su Consulta"
          hint="Responderemos su consulta lo antes posible a su casilla de correo"
          counter="100"
          ></v-textarea>

          <v-btn class="mr-4" @click="submit()" color="success">Enviar</v-btn>
          <v-btn @click="clear()" color="warning">Limpiar campos</v-btn>
        </form>
      </v-flex>
      <v-flex xs12 sm12 md12 lg6 xl6 class="pt-5">
        <figure>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2397963.7668721257!2d-68.16550348101457!3d-54.06023794494459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4c22cfd9432921%3A0x80ee54358cf0d88d!2sTierra+del+Fuego!5e0!3m2!1ses!2sar!4v1411141852556" width="500" height="300">
          </iframe>
        </figure>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '../router'
import axios from 'axios'

export default {
  components:{
  },
  data () {
    return {
      form:{}
    }
  },
  created: function(){
    store.dispatch('CONTACTO_retrieveContactInfo');
  },
  computed:{
    contacto(){
      let items = store.state.contacto.form;
      return items;
    }
  },
  watch:{
    contacto(){}
  },
  methods:{
    irBolsaTrabajo(bolsa) {
      store.dispatch('BOLSA_TRABAJO_goWithSelected',bolsa);
      router.push('bolsa-de-trabajo/detalle');
    },
    submit(){

    },
    clear(){

    }
  }
}
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}

  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: relative;
  }

  #create .v-btn--floating {
    position: relative;

  }
</style>
