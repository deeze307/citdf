import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      
    },
    getters: {
      
    },
    mutations: {
      
    },
    actions: {

      PROFILE_update: function({commit,dispatch,state},profileData=null){
        const curl = axios.create({
          baseURL: 'http://localhost:3031',
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials' : true
          }
        });
        // Header con token
        dispatch('LOGIN_API_retrieveToken').then(function(token){
          curl.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          curl.put("users/"+profileData.id,profileData)
          .then(function(response){
            if(response.data.ok){
              swal({
                title: "Exito!",
                text: "Has Actualizado tu Perfil Exitosamente!",
                icon: "success",
                button: "Aceptar",
              });
            }else{
              swal({
                title: "Oops!!",
                text: "No se pudo actualizar el perfil!",
                icon: "error",
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
          }); 
        })
      }
    }
  };
  
  export default module