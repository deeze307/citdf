import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      apiUrl: 'http://api-deeze.tk:3031',
      items:{
        payload:[]
      },
      como_matricularse:{
        info:{
          content:{
            rendered:""
          }
        }
      },
    },
    getters: {
      
    },
    mutations: {
      asignarMatriculados(state,payload){
        state.items = payload;
      },
      asignarComoMatricularse(state,payload){
        state.como_matricularse = payload;
      }
    },
    actions: {

      MATRICULADOS_retrieveAll:function({commit,dispatch,state},params){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        curl.get('/users/matriculados',{params:params}).then(function(response){
          let matriculados = response.data;
          if(!params.documento_nro){
            commit("asignarMatriculados",matriculados);
          }else{
            return response.data;
          }

        }).catch(error => {
          console.log("Error: ",error);
        });
      },
      MATRICULADOS_updateFromTable:function({commit,dispatch,state},payload){
        const curl = axios.create({
          baseURL: state.apiUrl,
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials' : true
          }
        });

        curl.put(`/users/matriculados/${payload.matriculado.ID}`,payload.matriculado)
        .then(function(response){
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Matriculado actualizado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });

            
            dispatch("MATRICULADOS_retrieveAll",payload.params);
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo actualizar el matriculado.",
              icon: "error",
              button: "Aceptar",
            });  
          }
          return "done";
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo actualizar el matriculado: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
          return "done";
        })
        
      },
      MATRICULADOS_update:function({commit,dispatch,state},tramite){
        const curl = axios.create({
          baseURL: state.apiUrl,
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
      MATRICULADOS_create:function({},){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });
        swal({
          title: "Exito!",
          text: "Matriculado Creado Exitosamente!",
          icon: "success",
          button: "Aceptar",
        });
      },
      MATRICULADOS_retrieveComoMatricularse:function({commit,dispatch,state}){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        // let params = {
        //   pageNumber:pageNumber,
        //   pageSize:pageSize
        // };
        // console.log("Params: ",params);

        curl.get('/users/matriculados/como-matricularse').then(function(response){
          let como_matricularse = response.data;
          console.log(como_matricularse);
          
          commit("asignarComoMatricularse",como_matricularse);

        }).catch(error => {
          console.log("Error: ",error);
        });
      }
    }
  };
  
  export default module