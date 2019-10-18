import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      apiUrl: 'http://api-deeze.tk:3031',
      // apiUrl: 'http://localhost:3031',
      items:{
        payload:[]
      },
      inProcess:false,
      pagosForm:{
        docType:"DNI"
      }
    },
    getters: {
      
    },
    mutations: {
      asignarPagos(state,payload){
        state.items = payload;
      },
      inProcess(state,payload){
        state.inProcess = payload;
      }
    },
    actions: {

      PAGOS_retrieveAll:function({commit,dispatch,state}){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        // let params = "";
        // if(userId){
        //   params = {userId:userId};
        // }

        curl.get('/pagos').then(function(response){
          
          commit("asignarPagos",response.data);

        }).catch(error => {
          console.log("Error: ",error);
        });
      },

      PAGOS_create:function({commit,dispatch,state},token){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        commit("inProcess",true);

        let form ={
          token:token,
          description:state.pagosForm.description,
          transaction_amount:state.pagosForm.transaction_amount,
          payment_method_id:state.pagosForm.payment_method_id,
          installments:1,
          payer:{
              email:state.pagosForm.email,
              identification:{
                  type:state.pagosForm.docType,
                  number:state.pagosForm.docNumber
              }
          }

        }

        console.log("Pagos Form: ",state.pagosForm)

        curl.post(`/pagos/create`,form)
        .then(function(response){
          if(response.data.ok){
            console.log(response.data)
            swal({
              title: "Exito!",
              text: "Pago realizado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
          }else{
            console.log("Error: ",response.data)
            swal({
              title: "Oops!",
              text: "No pudimos procesar tu pago!",
              icon: "error",
              button: "Aceptar",
            });  
          }
          commit("inProcess",false);
          return "done";
        })
        .catch(function (error){
          console.log(error);
        })
      },

      PAGOS_register:function({commit,dispatch,state},form){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        commit("inProcess",true);

        curl.post(`/pagos/register`,form)
        .then(function(response){
          if(response.data.ok){
            console.log(response.data)
            swal({
              title: "Exito!",
              text: "Pago Registrado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
          }else{
            console.log("Error: ",response.data)
            swal({
              title: "Oops!",
              text: "No pudimos registrar el Pago!",
              icon: "error",
              button: "Aceptar",
            });  
          }
          commit("inProcess",false);
          return "done";
        })
        .catch(function (error){
          console.log(error);
        })
      }
    }
  };
  
  export default module