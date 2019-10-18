<template>
  <v-app>
      <!-- MENU DE NAVEGACION MOBILE!-->
      <v-app-bar
        app
        v-if="isMobile"
        :color="menu_toolbar.header_color_web"
        dark
      >
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
      
      <!-- Menu toolbar WEB !-->
      <v-app-bar v-if="!isMobile" app :color="menu_toolbar.header_color_web" dark >
        <a href="/"><img src="@/assets/citdf-logo-dark.png" alt="citdf"></a>
        <!-- <v-toolbar-title v-text="menu_toolbar.title" ></v-toolbar-title> -->
        <v-spacer></v-spacer>
        
          <v-toolbar-items>

            <v-menu
              transition="slide-y-transition"
              offset-y
              bottom
              open-on-hover
              dark
              v-for="item in menu_toolbar.items"
              :key="item.order"
            >
              <template v-slot:activator="{ on }"  >
                <!-- Si los elementos del menu no tienen hijos -->
                <v-btn
                  v-if="!item.children"
                  x-small
                  text
                  class="mx-1 px-1"
                  :to="formatRoute(item.object_slug)"
                >
                {{item.title}}
                </v-btn>

                <!-- Si los elementos del menu tienen hijos -->
                <v-btn
                  v-if="item.children"
                  v-on="on"
                  x-small
                  text
                  class="mx-1 px-1"
                >
                {{item.title}}
                </v-btn>
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
            
          </v-toolbar-items>
        <v-spacer></v-spacer>

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
              <v-btn v-on="on" outlined color="white" small rounded>
                Hola {{(_.has(user.user,'firstName')) ? loginUserFirstName : ''}}
                <v-icon>person</v-icon>
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
        <!-- </v-container> -->
        
      </v-app-bar>
      <v-dialog v-model="spinner" persistent content content-class="centered-dialog">
        <v-container fill-height>
          <v-layout column justify-center align-center>
            <v-progress-circular
              :size="70"
              :width="7"
              color="orange"
              indeterminate
              v-if="spinner"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>

      <!-- CONTENIDO DE NAVEGACION !-->
      <v-slide-y-transition mode="out-in">
        <v-content>
          <router-view/>
        </v-content>
      </v-slide-y-transition>
      <!-- FIN CONTENIDO DE NAVEGACION !-->
    <footer-component></footer-component>
  </v-app>
  
</template>

<script>
  import router from './router'
  import MenuSidebar from './components/menu_sidebar'
  import UserSidebar from './components/user_sidebar'
  import login_api from './components/login_api'
  import footerComponent from './components/index/footer'


  export default {
    components :{ MenuSidebar, UserSidebar, login_api, footerComponent},
    data () {
      return {
        isMobile:true,
        drawer: false,
        group:null,
        toolbar_disabled:true,
        maintenanceMode: false,
        loginWorking:false,
        spinner:false,
        loginUserFirstName:'',
        userItems: [
        { title: 'Mi Perfil', path:'/profile', admin:false},
        { title: 'Mis Trámites',path:'/tramites',admin:false},
        { title: 'Gestionar',path:'/gestion',admin:true},
      ]
      }
    },
    mounted: function() {
      this.onResize();
    },
    computed: {
      menu_toolbar() {
        return store.state.menu_toolbar;
      },
      user() {
        return store.state.login_api.user
      },
      logged() {
        this.verifyUserData();
        return store.state.login_api.loggedIn;
      },
      loginDialog: {
        get:function (){
          return store.getters.showDialog;
        },
        set:function(newValue){
          store.state.login_api.showDialog = newValue;
        }
      },
    },
    watch:{
      group() {
        this.drawer = false
      },
      loginDialog(){},
      user(){},
      logged(state){
        // this.verifyUserData();
      },
      menu_toolbar(state){
      }
    },
    created(){
      store.dispatch('LOGIN_API_fetchUserRemember');
      store.dispatch('MENU_TOOLBAR_retrieveMenuItems');
    },
    methods: {
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
      verifyUserData(){
        if(_.has(this.user.user,'firstName')){
          let Names = this.user.user.firstName.split(' ');
          this.loginUserFirstName = Names[0];
          return true;
        }else{
          this.loginUserFirstName = '';
          return false;
        };
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
            if(_.has(this.user.user,'slug') && (this.user.user.slug === 'citdf' || this.user.user.slug === 'dmaidana' || this.user.user.slug === 'secretaria')){
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
      },
      onResize(){
        if(window.innerWidth <= 480){
          this.isMobile = true;
        }else{
          this.isMobile = false;
        }
      },
    },
    name: 'App'
  }
</script>
<style scoped>
  .tile {
    margin: 5px;
    border-radius: 4px;
  }
  .tile:hover {
    background: #1976D2;
  }
  .tile:active {
    background: #FF9800;
  }
</style>
