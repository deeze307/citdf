import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      apiUrl: 'http://localhost:3031',
      valor_uva:""
    },
    getters: {
      
    },
    mutations: {
      asignarValorUva(state,payload){
        state.valor_uva = payload.value;
      }
    },
    actions: {
      HONORARIOS_valorUVA:function({commit,dispatch,state},userId=null){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        let params = {key:"valor_uva"};

        curl.get('/general',{params:params}).then(function(response){
          if(response.data.ok){  
            let valorUVA = response.data.payload[0];
            commit("asignarValorUva",valorUVA);
          }

        }).catch(error => {
          console.log("Error: ",error);
        });
      },
    }
  };
  
  export default module