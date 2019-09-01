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
      asignarPagos(state,payload){
        state.items = payload;
      }
    },
    actions: {

      PAGOS_retrieveAll:function({commit,dispatch,state},userId=null){
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
            console.log("Atroden");
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
                t.status = "Pagado";
                return t
              };
              case 3: {
                t.status = "Rechazado";
                return t
              };
            }
          });
          console.log("Tramites recuperados: ",tramites);
          commit("asignarTramites",tramites);

        }).catch(error => {
          console.log("Error: ",error);
        });
      }
    }
  };
  
  export default module