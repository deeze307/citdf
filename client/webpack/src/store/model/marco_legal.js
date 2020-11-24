// Modelo Colegio

import axios from 'axios'

const module = {
  state: {
    codigo_etica:{
      content:{rendered:""}
    },
    ley_creacion:{
      content:{rendered:""}
    },
    reglamento_electoral:{
      content:{rendered:""}
    },
    reglamento_interno:{
      content:{rendered:""}
    },
  },
  getters:{
    marco_legal: state => {
      state.codigo_etica,
      state.ley_creacion,
      state.reglamento_electoral,
      state.reglamento_interno
    }
  },
  setters:{
    marco_legal: state => {
      state.codigo_etica,
      state.ley_creacion,
      state.reglamento_electoral,
      state.reglamento_interno
    } 
  },
  mutations: {
    asignarCodigoEtica(state,payload) {
      state.codigo_etica = payload;
    },
    asignarLeyCreacion(state,payload) {
      state.ley_creacion = payload;
    },
    asignarReglamentoElectoral(state,payload) {
      state.reglamento_electoral = payload;
    },
    asignarReglamentoInterno(state,payload) {
      state.reglamento_interno = payload;
    }
  },
  actions: {
    MARCOLEGAL_retrieveCodigoEtica: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/marco_legal/codigo-de-etica')
          .then(function(codigo_etica) {
            // handle success
            if(codigo_etica.data.info){
              commit('asignarCodigoEtica',codigo_etica.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarCodigoEtica Error: ', error);
          });
    },
    MARCOLEGAL_retrieveLeyCreacion: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/marco_legal/ley-de-creacion')
          .then(function(ley_creacion) {
            // handle success
            if(ley_creacion.data.info){
              commit('asignarLeyCreacion',ley_creacion.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarLeyCreacion Error: ', error);
          });
    },
    MARCOLEGAL_retrieveReglamentoElectoral: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/marco_legal/reglamento-electoral')
          .then(function(reglamento_electoral) {
            // handle success
            if(reglamento_electoral.data.info){
              commit('asignarReglamentoElectoral',reglamento_electoral.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarReglamentoElectoral Error: ', error);
          });
    },
    MARCOLEGAL_retrieveReglamentoInterno: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/marco_legal/reglamento-interno')
          .then(function(reglamento_interno) {
            // handle success
            if(reglamento_interno.data.info){
              commit('asignarReglamentoInterno',reglamento_interno.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarReglamentoInterno Error: ', error);
          });
    },
  }
};

export default module