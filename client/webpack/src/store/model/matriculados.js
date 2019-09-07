import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      items:{
        payload:[]
      }
    },
    getters: {
      
    },
    mutations: {
      asignarMatriculados(state,payload){
        console.log("asignarMatriculados: ",payload);
        state.items = payload;
      }
    },
    actions: {

      MATRICULADOS_retrieveAll:function({commit,dispatch,state},pageNumber,pageSize){
        console.log("Obteniendo Matriculados");
        const curl = axios.create({
          baseURL: 'http://api-deeze.tk:3031',
        });

        let params = {
          pageNumber:pageNumber,
          pageSize:pageSize
        };

        curl.get('/users/matriculados',{params:params}).then(function(response){
          let matriculados = response.data;
          
          commit("asignarMatriculados",matriculados);

        }).catch(error => {
          console.log("Error: ",error);
        });
      },
      MATRICULADOS_update:function({commit,dispatch,state},matriculado){
        const curl = axios.create({
          baseURL: 'http://api-deeze.tk:3031',
        });

        curl.put(`/users/matriculados/${tramite.id}`,tramite)
        .then(function(response){
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Matriculado actualizado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            dispatch("MATRICULADOS_retrieveAll");
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo actualizar el matriculado.",
              icon: "error",
              button: "Aceptar",
            });  
          }
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo actualizar el matriculado: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
        })
        
      },
      MATRICULADOS_create:function({},tramite){
        swal({
          title: "Exito!",
          text: "Matriculado Creado Exitosamente!",
          icon: "success",
          button: "Aceptar",
        });
      }
    }
  };
  
  export default module