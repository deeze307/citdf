// Modelo User
import axios from 'axios'
import router from '../../router'

const module = {
  
  state: {
    // Flags
    api_url:'http://localhost:3031',
    loginIsRunning: false,
    loggedIn: false,
    token: '',
    showDialog:false,
    fetchUserIsRunning: false,
    user:{
      firstName:'',
      lastName:'',
      acf:{}
    }
  },
  getters: {
    showDialog: state => state.showDialog,
  },
  setters:{
    showDialog: state => state.showDialog,
  },
  mutations: {
    LOGIN_API_checkLocalStorage: function(state){
      state.token = localStorage.getItem('CITDF_LOGIN_API_TOKEN');
      // if(state.token != '')
      // { state.loggedIn = true; }
    },
    LOGIN_API_updateToken: function(state, token){
      state.token = token;
      localStorage.setItem('CITDF_LOGIN_API_TOKEN',token);
    },
    LOGIN_API_running: function(state, running){
      state.loginIsRunning = running;
    },
    LOGIN_API_updateUser: function(state, userData){
      
      state.user = userData;
      state.loggedIn = true;
    },
    LOGIN_API_fetchUserIsrunning: function(state, running){
      state.fetchUserIsRunning = running;
    },
    LOGIN_API_clear: function(state){
      state.loggedIn = false;
      state.user = {};
      state.token = '';
      localStorage.removeItem('CITDF_LOGIN_API_TOKEN');
    },
    LOGIN_API_toggle_dialog:function (state,dialog){
        state.showDialog = dialog;
    }
  },
  actions: {
    LOGIN_API_fetchUserRemember: function ({commit, dispatch, state}) {
      if (!state.fetchUserIsRunning) {
        commit('LOGIN_API_fetchUserIsrunning',true);

        // Verifica si el existe un token de logueo en localStorage
        commit('LOGIN_API_checkLocalStorage');

        // Si no existe token... detiene el consumo del api
        if(state.token==null) {
         return;
        }

        const curl = axios.create({
          baseURL: state.api_url,
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials' : true
          }
        });

        // Header con token
        curl.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

        curl.get('/users/me')
            .then(function (response) {
              // handle success
              if(response.data.user){
                let splitName = _.split(response.data.user.name,' ');
                response.data.user.firstName = splitName[0];
                response.data.user.lastName = splitName[1];
              }else{
                response.data.user = {
                  firstName:"",
                  lastName:""
                }
              }
              commit('LOGIN_API_updateUser',response.data);
              commit('LOGIN_API_fetchUserIsrunning',false);
            })
            .catch(function (error) {
              // handle error
              console.log('LOGIN_API_fetchUser ERROR', error);

              // commit('LOGIN_API_clear');
              commit('LOGIN_API_fetchUserIsrunning',false);
            });
      }
    },
    // Consume API con TOKEN
    LOGIN_API_login: function ({commit, dispatch, state}, payload) {
      if (!this.loginIsRunning) {
        commit('LOGIN_API_running', true);
        commit('LOGIN_API_toggle_dialog',false);

        // Clear all
        commit('LOGIN_API_clear');
        const curl = axios.create({
          baseURL: state.api_url,
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials' : true
          }
        });

        curl.post('/users/login', payload)
        .then(function (response) {
          console.log('Login: ',response.data);
          if(response.data.user.token){
            // handle success
            if(response.data.user){
              let splitName = _.split(response.data.user.name,' ');
              response.data.user.firstName = splitName[0];
              response.data.user.lastName = splitName[1];
            }else{
              response.data.user = {
                firstName:"",
                lastName:""
              }
            }
            commit('LOGIN_API_updateUser', response.data);
            commit('LOGIN_API_updateToken',response.data.user.token);
            commit('LOGIN_API_running', false);


            dispatch('LOGIN_API_fetchUser');
            swal({
              title: "Exito!",
              text: "Has iniciado sesion exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
          }else{
            console.log(response.error);
            swal({
              title: "Oops!",
              text: "Ocurrió un error: "+response.error,
              icon: "danger",
              button: "Aceptar",
            });
          }
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          swal({
            title: "Oops!",
            text: "Ocurrió un error",
            icon: "error",
            button: "Aceptar",
          });

          commit('LOGIN_API_clear');
          commit('LOGIN_API_running', false);
        });
      }

    },
    LOGIN_API_logout:function({commit}){
      commit('LOGIN_API_clear');
      commit('LOGIN_API_running', false);
      router.push('/');
      // location.reload();
    },
    // Obtiene informacion de usuario con con el TOKEN
    LOGIN_API_fetchUser: function ({commit, dispatch, state}) {
      if (!this.fetchUserIsRunning) {
        commit('LOGIN_API_fetchUserIsrunning',true);

        const curl = axios.create({
          baseURL: state.api_url
        });

        // Header con token
        curl.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

        curl.get('/users/me')
          .then(function (response) {
            // handle success
            if(response.data.user){
              let splitName = _.split(response.data.user.name,' ');
              response.data.user.firstName = splitName[0];
              response.data.user.lastName = splitName[1];
            }else{
              response.data.user = {
                firstName:"",
                lastName:""
              }
            }
            commit('LOGIN_API_updateUser',response.data);
            commit('LOGIN_API_fetchUserIsrunning',false);
          })
          .catch(function (error) {
            // handle error
            console.log('LOGIN_API_fetchUser ERROR', error);

            commit('LOGIN_API_clear');
            commit('LOGIN_API_fetchUserIsrunning',false);
          });
      }
    },
    LOGIN_API_retrieveToken: function(){
      return localStorage.getItem('CITDF_LOGIN_API_TOKEN');
    }
  }
};

export default module
