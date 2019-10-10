import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      apiUrl: 'http://api-deeze.tk:3031',
      // apiUrl: 'http://localhost:3031',
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
      baja_suspension:{
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
      },
      asignarBajaSuspension(state,payload){
        state.baja_suspension = payload;
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
            return response;
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

        curl.put(`/users/matriculados/from_table/${payload.matriculado.ID}`,payload.matriculado)
        .then(function(response){
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Matriculado actualizado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            
            dispatch("MATRICULADOS_retrieveAll",payload.params);
            return "ok"
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo actualizar el matriculado.",
              icon: "error",
              button: "Aceptar",
            });  
            return "error";
          }
          
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
      MATRICULADOS_create:function({commit,dispatch,state},form){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });
        console.log("Formulario: ",form);
        curl.post('/users/register',form)
        .then(function(response){
          console.log(response.data);
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Matriculado Creado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            dispatch("MATRICULADOS_retrieveAll");
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo crear el matriculado.",
              icon: "error",
              button: "Aceptar",
            });  
          }
        })
        .catch(function (error){
          console.log("Error:",error)
          swal({
            title: "Oops!!",
            text: `No se pudo crear el matriculado: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
        })
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
      },
      MATRICULADOS_retrieveBajaSuspension:function({commit,dispatch,state}){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        // let params = {
        //   pageNumber:pageNumber,
        //   pageSize:pageSize
        // };
        // console.log("Params: ",params);

        curl.get('/users/matriculados/baja-suspension').then(function(response){
          let baja_suspension = response.data;
          console.log(baja_suspension);
          
          commit("asignarBajaSuspension",baja_suspension);

        }).catch(error => {
          console.log("Error: ",error);
        });
      }
    }
  };
  
  export default module