import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      apiUrl: process.env.CITDF_API,
      // apiUrl: 'http://localhost:3031',
      items:{
        payload:[]
      },
      inProcess:false,
      pagosForm:{
        docType:"DNI",
        installments:{
          issuer:{}
        }
      },
      pagoItem: {
        tramite: null,
        matriculadoId: null
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

        let data = {
          form: {
            token:token,
            description:state.pagosForm.description,
            transaction_amount:state.pagosForm.transaction_amount,
            payment_method_id:state.pagosForm.paymentMethodId,
            // payment_type_id:state.pagosForm.paymentTypeId,
            installments:state.pagosForm.installments,
            payer:{
                email:state.pagosForm.email,
                identification:{
                    type:state.pagosForm.docType,
                    number:state.pagosForm.docNumber
                }
            }

          },
          additional:{
            pagoTitulo: state.pagosForm.pagoTitulo,
            observaciones: state.pagoItem.tramite ? `Trámite pagado: ${state.pagoItem.tramite} - ${state.pagosForm.observaciones}` : state.pagosForm.observaciones,
            matriculaNro: state.pagosForm.matriculaNro
          },
          pagoItem: state.pagoItem
        }

        // console.log("Pagos Form: ",data)
        curl.post(`/pagos/create`,data)
        .then(function(response){
          if(response.data.ok){
            console.log(response.data)
            if(response.data.response.response.status ==="rejected"){
              swal({
                title: "Oops! No pudimos procesar su pago",
                text: "Verifique que la tarjeta sea correcta y que posea Fondos Suficientes.",
                icon: "error",
                button: "Aceptar",
              });
            }else{
              swal({
                title: "Exito!",
                text: "Pago realizado Exitosamente!",
                icon: "success",
                button: "Aceptar",
              }).then(() => {
                router.push('/tramites')
              })
            }
            
          }else{
            console.log("Error eee: ",response.data)
            if(response.data.response.name == "MercadoPagoError"){
              if(response.data.response.message == "Invalid operators users involved"){
                swal({
                  title: "Oops!",
                  text: "No pudimos encontrar el email ingresado vinculado a ninguna cuenta en MercadoPago.",
                  icon: "error",
                  buttons: {
                    cancel: "Cancelar",
                    mercadopago: "Ir a MercadoPago",
                  },
                }).then((value) => {
                  switch (value) {
                    case "cancel":
                      break;
                    case "mercadopago":
                      window.open = "https://www.mercadopago.com.ar/";
                      break;
                  }
                });
              }
            }else{
              swal({
                title: "Oops! No pudimos procesar su pago",
                text: "Verifique sus datos o intente nuevamente más tarde.",
                icon: "error",
                button: "Aceptar",
              });
            }  
          }
          commit("inProcess",false);
          return "done";
        })
        .catch(function (error){
          swal({
            title: "Oops! No pudimos procesar su pago",
            text: "Verifique sus datos o intente nuevamente más tarde.",
            icon: "error",
            button: "Aceptar",
          });  
          commit("inProcess",false);
          console.log("Error catch",error);
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
            // console.log(response.data)
            swal({
              title: "Exito!",
              text: "Pago Registrado Exitosamente!",
              icon: "success",
              button: "Aceptar",
            });
            dispatch("PAGOS_retrieveAll",form.documento_nro);
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