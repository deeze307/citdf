<template>
  <v-container>
    <!-- MENU DE NAVEGACION MOBILE!-->
      <v-app-bar app :color="menu_toolbar.header_color_web" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-app-bar-nav-icon>
        <a href="/"><img src="@/assets/citdf-logo-dark.png" alt="citdf"></a>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- Login / Logout -->
          <div v-if="!logged">
            <v-btn @click=" loginDialog = true" outlined color="white" small rounded :loading="loginWorking">
              Ingresar
            </v-btn>
            <v-dialog v-model="loginDialog" max-width="400">
              <login_api />
            </v-dialog>
          </div>
          <!-- <v-container v-if="logged"> -->
          <v-menu
            v-if="logged"
            transition="slide-y-transition"
            offset-y
            bottom
            left
            light
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" :color="menu_toolbar.header_color_web" small rounded>
                Hola {{(_.has(user.user,'firstName')) ? user.user.firstName : ''}}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in userItems"
                :key="i"
                @click="callToAction(item.path)"
                v-if="checkAdmin(item)"
              >
                <v-list-item-title v-if="item.title">{{ item.title }}</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="logout()">
                <v-list-item-title ><v-icon left >power_settings_new</v-icon>Cerrar Sesion</v-list-item-title>
              </v-list-item>

            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :color="menu_toolbar.header_color_mobile"
        left
        absolute
        dark
        temporary
      >
        <v-menu
          transition="slide-y-transition"
          offset-y
          bottom
          dark
          v-for="item in menu_toolbar.items"
          :key="item.order"
        >
          <template v-slot:activator="{ on }"  >
            <!-- Si los elementos del menu no tienen hijos -->
            <v-list>
              <v-list-item
                class="my-0 tile"
                v-if="!item.children"
                :to="formatRoute(item.object_slug)"
              >
              {{item.title.toUpperCase()}}
              </v-list-item>

              <!-- Si los elementos del menu tienen hijos -->
              <v-list-item
                v-if="item.children"
                v-on="on"
                text
                class="my-0 tile"
              >
              {{item.title.toUpperCase()}}
              </v-list-item>
            </v-list>
          </template>
          <v-list v-if="item.children">
            <v-list-item
              class="tile"
              v-for="(child) in item.children"
              :key="child.order"
              :to="subMenu(child)"
            >
              <v-list-item-title v-if="!child.children" >{{ child.title }}</v-list-item-title>

              <v-menu
                transition="slide-y-transition"
                offset-x
                right
                open-on-hover
                dark
                v-for="subChild in child.children"
                :key="subChild.order"
              >
                <template v-slot:activator="{ on2 }" >
                  <!-- Si los elementos del menu tienen hijos -->
                  <v-btn
                    v-on="on2"
                    x-small
                    text
                  >
                  <!-- {{subChild.title}} -->
                  </v-btn>
                </template>
                <v-list v-if="subChild.children">
                  <v-list-item
                    class="tile"
                    v-for="(subSubChild) in subChild.children"
                    :key="subSubChild.order"
                    :to="subSubChild.object_slug"
                  >
                    <v-list-item-title v-if="!subSubChild.children" >{{ subSubChild.title }}</v-list-item-title>
                  </v-list-item>

                </v-list>
              </v-menu>
            </v-list-item>

          </v-list>
        </v-menu>
      </v-navigation-drawer>
      
      <!-- FIN MENU DE NAVEGACION !-->
      <!-- FIN Menu toolbar Mobile -->
  </v-container>

  
</template>
<script>
import login_api from '../../login_api'
import router from '../../../router'
export default {
  components:{login_api},
  props:["menu_toolbar","logged","user","loginUserFirstName"],
  data(){
    return{
      loginWorking:false,
      drawer: false,
      userItems: [
        { title: 'Mi Perfil', path:'/profile', admin:false},
        { title: 'Mis Trámites',path:'/tramites',admin:false},
        { title: 'Gestionar',path:'/gestion',admin:true},
      ]
    }
  },
  computed:{
    loginDialog: {
      get:function (){
        return store.getters.showDialog;
      },
      set:function(newValue){
        store.state.login_api.showDialog = newValue;
      }
    }
  },
  methods:{
    logout() {
      // this.spinner = true;
      store.dispatch('LOGIN_API_logout');
    },
    login() {
      this.loginWorking = true;
    },
    callToAction(path) {
      router.push(path);
    },
    
    checkAdmin(item){
      let isAdmin = true;
      if(item.admin){
        isAdmin = false;
        // if(this.user.user.user_roles){
          // this.user.user.user_roles.map( rol => {
          //   if(rol === 'administrator'){
          //     console.log('es admin');
          //     isAdmin = true;
          //   }
          // })
          console.log(this.user.user)
          if(_.has(this.user.user,'slug') && (this.user.user.slug === 'citdf' || _.startsWith(this.user.user.slug, 'secretaria') )){
            isAdmin = true;
          }
        // }
      }
      return isAdmin;
    },
    subMenu(submenu) {
      if(!submenu.children){
        return "/"+submenu.object_slug
      }else{
        return ''
      }
    },
    formatRoute(route){
      return "/"+route;
    }
  }
}
</script>