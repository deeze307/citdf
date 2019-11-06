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

      PAGOS_retrieveAll:function({commit,dispatch,state},documentoNro=null){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        let params = "";
        if(documentoNro){
          params = {documento_nro:documentoNro};
        }

        curl.get('/pagos',{params:params}).then(function(response){
          
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
      },
      PAGOS_update:function({commit,dispatch,state},pago){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        curl.put(`/pagos/${pago.id}`,pago)
        .then(function(response){
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Pago actualizado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            dispatch("PAGOS_retrieveAll");
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo actualizar el pago.",
              icon: "error",
              button: "Aceptar",
            });  
          }
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo actualizar el pago: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
        })
        
      },
      PAGOS_delete:function({commit,dispatch,state},pago){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        curl.delete(`/pagos/${pago.id}`)
        .then(function(response){
          if(response.data.ok){
            swal({
              title: "Exito!",
              text: "Pago Eliminado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            dispatch("PAGOS_retrieveAll");
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo Eliminar el pago.",
              icon: "error",
              button: "Aceptar",
            });  
          }
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo Eliminar el pago: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
        })
        
      }
    }
  };
  
  export default module