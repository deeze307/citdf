import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      apiUrl: 'http://api-deeze.tk:3031',
      items:{
        payload:[]
      },
      legajo_minimo:{
        content:{
          rendered:""
        }
      },
      certificacion_firma:{
        content:{
          rendered:""
        }
      },
      encomienda_tareas:{
        content:{
          rendered:""
        }
      }
    },
    getters: {
      
    },
    mutations: {
      asignarTramites(state,payload){
        console.log("asignarTramites: ",payload);
        state.items = payload;
      },
      asignarLegajoMinimo(state,payload){
        state.legajo_minimo = payload;
      },
      asignarCertificacionFirma(state,payload){
        state.certificacion_firma = payload;
      },
      asignarEncomiendaTareas(state,payload){
        state.encomienda_tareas = payload;
      }
    },
    actions: {
      TRAMITES_retrieveAll:function({commit,dispatch,state},userId=null){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        let params = "";
        if(userId){
          params = {userId:userId};
        }

        curl.get('/tramites',{params:params}).then(function(response){
          let tramites = response.data;
          tramites.payload = response.data.payload.map(t =>{
            switch(+t.status){
              case 0: {
                t.status = "Pendiente";
                return t
              };
              case 1: {
                t.status = "En Proceso";
                return t
              };
              case 2: {
                t.status = "Completado";
                return t
              };
              case 3: {
                t.status = "Cancelado";
                return t
              };
            }
          });
          commit("asignarTramites",tramites);

        }).catch(error => {
          console.log("Error: ",error);
        });
      },
      TRAMITES_update:function({commit,dispatch,state},tramite){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        curl.put(`/tramites/${tramite.id}`,tramite)
        .then(function(response){
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Trámite actualizado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            dispatch("TRAMITES_retrieveAll");
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo actualizar el trámite.",
              icon: "error",
              button: "Aceptar",
            });  
          }
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo actualizar el trámite: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
        })
        
      },
      TRAMITES_create:function({},tramite){
        swal({
          title: "Exito!",
          text: "Trámite Creado Exitosamente!",
          icon: "success",
          button: "Aceptar",
        });
      },

      TRAMITES_retrieveLegajoMinimo:function({commit,dispatch,state}){
        const curl = axios.create({
          baseURL: state.apiUrl
        });
        curl.get('/tramites/legajo-minimo')
            .then(function(legajo_minimo) {
              // handle success
              if(legajo_minimo.data.info){
                commit('asignarLegajoMinimo',legajo_minimo.data.info)
              }else{
              }
            })
            .catch(function (error) {
              console.log('AsignarLegajoMinimo Error: ', error);
            });
      },
      TRAMITES_retrieveCertificacionFirma:function({commit,dispatch,state}){
        const curl = axios.create({
          baseURL: state.apiUrl
        });
        curl.get('/tramites/certificacion-de-firma')
            .then(function(certificacion_firma) {
              // handle success
              if(certificacion_firma.data.info){
                commit('asignarCertificacionFirma',certificacion_firma.data.info)
              }else{
              }
            })
            .catch(function (error) {
              console.log('AsignarCertificacionFirma Error: ', error);
            });
      },
      TRAMITES_retrieveEncomiendaTareas:function({commit,dispatch,state}){
        const curl = axios.create({
          baseURL: state.apiUrl
        });
        curl.get('/tramites/encomienda-de-tareas')
            .then(function(encomienda_tareas) {
              // handle success
              if(encomienda_tareas.data.info){
                commit('asignarEncomiendaTareas',encomienda_tareas.data.info)
              }else{
              }
            })
            .catch(function (error) {
              console.log('AsignarEncomiendaTareas Error: ', error);
            });
      }
    }
  };
  
  export default module