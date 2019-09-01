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
      asignarTramites(state,payload){
        state.items = payload;
      }
    },
    actions: {

      TRAMITES_retrieveAll:function({commit,dispatch,state},userId=null){
        const curl = axios.create({
          baseURL: 'http://localhost:3031',
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
          baseURL: 'http://localhost:3031',
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
      }
    }
  };
  
  export default module