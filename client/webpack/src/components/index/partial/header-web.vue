<template>
<header>
  <!-- Menu toolbar WEB !-->
  <v-app-bar app :color="menu_toolbar.header_color_web" dark >
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
            v-for="(item, i) in userMenuItems"
            :key="i"
            @click="callToAction(item.path)"
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
</header>
  
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
      userItems: [
        { title: 'Mi Perfil', path:'/profile', admin:false, approver:false},
        { title: 'Mis Trámites',path:'/tramites',admin:false, approver:false},
        { title: 'Aprobaciones Pendientes',path:'/aprobaciones',admin:false, approver:true},
        { title: 'Gestionar',path:'/gestion',admin:true, approver:false},
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
    },
    userMenuItems () {
      return this.userItems.filter((item) =>{
        let canSee = true
        if(item.admin) {
          canSee = false
          if(_.has(this.user.user,'slug') && (this.user.user.slug === 'citdf' || _.startsWith(this.user.user.slug, 'secretaria') )){
            canSee = true;
          }
        }
        if (item.approver) {
          canSee = false;
          if(this.user.user.approver && this.user.user.approver.active === 1) {
            canSee = true
          }
        }
        if (canSee) { return item }
      })
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
    
    checkAdminOrApprover(item){
      let isAdminOrApprover = true;
      if(item.admin){
        isAdminOrApprover = false;
        // if(this.user.user.user_roles){
          // this.user.user.user_roles.map( rol => {
          //   if(rol === 'administrator'){
          //     console.log('es admin');
          //     isAdminOrApprover = true;
          //   }
          // })
          console.log(this.user.user)
          if(_.has(this.user.user,'slug') && (this.user.user.slug === 'citdf' || _.startsWith(this.user.user.slug, 'secretaria') )){
            isAdminOrApprover = true;
          }
        // }
      }
      if(item.approver) {
        isAdminOrApprover = false;
        if(_.has(this.user.user.approver,'active')) {
          isAdminOrApprover = true
        }
      }
      return isAdminOrApprover;
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