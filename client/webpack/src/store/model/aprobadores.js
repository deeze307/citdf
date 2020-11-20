import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      apiUrl: process.env.CITDF_API,
      apiUrlDev: 'http://localhost:3031',
      items:{
        payload:[]
      }
    },
    getters: {
      
    },
    mutations: {
      asignarAprobadores(state,payload){
        state.items = payload;
      },
      inicializaAprobadores(state){
        state.items = {}
      }
    },
    actions: {
      APROBADORES_retrieveAll ({ commit,dispatch,state }) {
        commit('inicializaAprobadores')
        const curl = axios.create({
          baseURL: state.apiUrl,
        });
        // commit('asignarAprobadores', [])
        curl.get('/aprobadores').then(function(response){
          let aprobadores = response.data;
          commit("asignarAprobadores", aprobadores);

        }).catch(error => {
          console.log("Error: ",error);
        });
      },
      async APROBADORES_create ({dispatch,state},aprobador){
        const curl = axios.create({
          baseURL: state.apiUrl
        });

        let created = await curl.post(`/aprobadores`,aprobador)
        .then(response => {
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Aprobador agregado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            dispatch("APROBADORES_retrieveAll");
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo agregar el aprobador.",
              icon: "error",
              button: "Aceptar",
            }); 
          }
          return response.data.ok
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo agregar el aprobador: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
          return false
        })
        return created
      },
      async APROBADORES_update ({ dispatch, state }, aprobador) {
        const curl = axios.create({
          baseURL: state.apiUrl
        });

        let created = await curl.put(`/aprobadores/${aprobador.id}`,aprobador)
        .then(response => {
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Aprobador actualizado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            dispatch("APROBADORES_retrieveAll");
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo actualizar el aprobador.",
              icon: "error",
              button: "Aceptar",
            }); 
          }
          return response.data.ok
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo actualizar el aprobador: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
          return false
        })
        return created
        
      },
      APROBADORES_delete ({}) {}
    }
  };
  
  export default module