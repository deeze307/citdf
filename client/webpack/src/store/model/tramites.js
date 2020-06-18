import axios from 'axios'
import router from '../../router'

const module = {
    state: {
      apiUrl: 'http://api-deeze.tk:3031',
      apiUrlDev: 'http://localhost:3031',
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
        state.items = payload;
      },
      inicializaTramites(state){
        state.items = {}
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
      TRAMITES_retrieveAll:function({commit,dispatch,state},documentoNro=null){
        commit('inicializaTramites')
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        let params = "";
        if(documentoNro){
          params = {documentoNro:documentoNro};
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
      TRAMITES_update: async function({commit,dispatch,state},tramite){
        const curl = axios.create({
          baseURL: state.apiUrl,
        });

        let updated = await curl.put(`/tramites/${tramite.id}`,tramite)
        .then(response =>{
          if(response.data.ok){
            if(tramite.file){
              response.data.tramite.id = tramite.id
              response.data.tramite.type = "actualizado"
              let tramiteUpload = dispatch('TRAMITES_prepareToUpload',{tramite: tramite, response: response})
                .then(res =>{
                    return res
                })
              return tramiteUpload
            }else{
              swal({
                title: "Exito!",
                text: "Trámite actualizado Exitosamente!",
                icon: "success",
                button: "Aceptar",
              });
              dispatch("TRAMITES_retrieveAll");
              return true
            }
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo actualizar el trámite.",
              icon: "error",
              button: "Aceptar",
            });  
            return false
          }
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo actualizar el trámite: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
          return false
        })
        return updated
      },
      TRAMITES_create: async function({commit,dispatch,state},tramite){
        const curl = axios.create({
          baseURL: state.apiUrl
        });

        let created = await curl.post(`/tramites`,tramite)
        .then(response => {
          if(response.data.ok){
            // AGREGO SUBIDA DE ARCHIVO SI EXISTE
            if(tramite.file){
              response.data.tramite.type = "creado"
              let tramiteUpload = dispatch('TRAMITES_prepareToUpload',{tramite: tramite, response: response})
                .then(res =>{
                  return res
                })
              return tramiteUpload
            }else{ // SI NO HAY ARCHIVO, CREO EL TRÁMITE DIRECTAMENTE
              swal({
                title: "Exito!",
                text: "Trámite creado Exitosamente!",
                icon: "success",
                button: "Aceptar",
              });
              dispatch("TRAMITES_retrieveAll");
              return true
            }
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo crear el trámite.",
              icon: "error",
              button: "Aceptar",
            }); 
            return false
          }
        })
        .catch(function (error){
          swal({
            title: "Oops!!",
            text: `No se pudo crear el trámite: ${error}`,
            icon: "error",
            button: "Aceptar",
          });
          return false
        })
        return created
      },

      TRAMITES_prepareToUpload: async function({dispatch,state}, data){
        const curl = axios.create({
          baseURL: state.apiUrl
        });
        let tramite = data.tramite
        let response = data.response
        console.log("prepareToUpload:",response)
        return dispatch("TRAMITES_upload",tramite.file[0]).then(async uploaded => {
          if(uploaded != ""){
            let updated = await curl.put(`/tramites/documento/${response.data.tramite.id}`,uploaded).then(resDocUpdated => {
              if(resDocUpdated.data.ok){
                /* ACÁ SE VA A ENVIAR EL QR POR CORREO AL MATRICULADO
                  ENVÍA DESDE CORREO SECRETARIA.CITDF@GMAIL.COM
                  REQUIERE: NOMBRE, CORREO, ID DE TRAMITE, TIPO DE TRAMITE Y URL AL ARCHIVO
                */ 
               // AGREGO CORREO PARA DEBUG
                // tramite.matriculado.user_email = 'dmaidana01@gmail.com'
               
                let mailerData = {
                  name: tramite.matriculado.first_name,
                  to: tramite.matriculado.user_email,
                  tid: response.data.tramite.id,
                  type: tramite.tramite,
                  fileUrl: uploaded.url,
                  status: tramite.status
                }
                curl.post('/mailer/tramites',mailerData);
                swal({
                  title: "Exito!",
                  text: `Trámite ${response.data.tramite.type} Exitosamente!`,
                  icon: "success",
                  button: "Aceptar",
                });
                dispatch("TRAMITES_retrieveAll");
                return true
              }else{
                swal({
                  title: "Oops!!",
                  text: "No se pudo adjuntar el registro del archivo.",
                  icon: "error",
                  button: "Aceptar",
                });
                return false
              }
              
            }).catch(function (error){
              console.error(error)
              return false
            })
            return updated
          }else{
            swal({
              title: "Oops!!",
              text: "No se pudo adjuntar el archivo.",
              icon: "error",
              button: "Aceptar",
            });
            console.log("No se pudo adjuntar el archivo")
            return false
          }
        })
      },

      TRAMITES_upload:async function({commit,dispatch,state},file){
        const curl = axios.create({
          baseURL: state.apiUrl
        });

        var uploaded = {
          ok:true,
          url:""
        }

        const formData = new FormData();

        formData.append("file", file);
        var uploadedPost = await curl.post(`/upload/tramites`,formData)
        .then(response => {
          if(response.data.ok){
            uploaded.url = response.data.file.url
            return uploaded
          }else{
            console.error("ocurrió un error al importar el archivo")
            uploaded.ok = false
            return uploaded
          }
        })
        .catch(error => {
          console.log("err",error)
          uploaded.ok = false
          return uploaded
        })
        return uploadedPost
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