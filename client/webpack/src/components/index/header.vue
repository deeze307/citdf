<template>
  <header>
    <header-web 
      v-if="!isMobile" 
      :menu_toolbar="menu_toolbar" 
      :logged="logged"
      :user="user"
      :loginUserFirstName="loginUserFirstName" />
    <header-mobile 
      v-if="isMobile" 
      :menu_toolbar="menu_toolbar" 
      :logged="logged"
      :user="user"
      :loginUserFirstName="loginUserFirstName" />
  </header>
  
</template>
<script>

import MenuSidebar from '../menu_sidebar'
import UserSidebar from '../user_sidebar'
import headerWeb from './partial/header-web'
import headerMobile from './partial/header-mobile'

export default {
  components:{MenuSidebar, UserSidebar, headerWeb, headerMobile},
  data(){
    return{
      isMobile:true,
      loginWorking:false,
      loginUserFirstName:''
    }
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
    }
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
  mounted: function() {
    this.onResize();
  },
  methods:{
    onResize(){
      if(window.innerWidth <= 480){
        this.isMobile = true;
      }else{
        this.isMobile = false;
      }
    },
    verifyUserData(){
      if(_.has(this.user.user,'firstName') && this.user.user.firstName != ''){
        let Names = this.user.user.firstName.split(' ');
        this.loginUserFirstName = Names[0];
        return true;
      }else{
        this.loginUserFirstName = '';
        return false;
      };
    },
  }
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