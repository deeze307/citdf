<template>
  <div>
    <v-toolbar flat class="transparent" v-if="logged">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="@/assets/nophoto.png" >
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{user.username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <!--<v-toolbar flat class="transparent" v-if="!logged">-->
      <!--<v-btn  to="/login" dark color="green darken-5" large block class="title">Iniciar sesion</v-btn>-->
    <!--</v-toolbar>-->
  </div>

</template>

<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
      user() {
        return store.state.login_api.user
      },
      logged() {
        return store.state.login_api.loggedIn;
      }
    }
  }
</script>
