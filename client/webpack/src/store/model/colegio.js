// Modelo Colegio

import axios from 'axios'

const module = {
  state: {
    mision_vision:{
      content:{rendered:""}
    },
    autoridades:{
      content:{rendered:""}
    },
    deberes_atribuciones:{
      content:{rendered:""}
    },
    actas:[
      {
        content:{rendered:""}
      },
      {
        content:{rendered:""}
      }
    ],
    elecciones:{
      content:{rendered:""}
    },
    tesoreria:{
      content:{rendered:""}
    },
  },
  getters:{
    colegio: state => {
      state.mision_vision,
      state.autoridades,
      state.deberes_atribuciones,
      state.actas,
      state.elecciones,
      state.tesoreria
    }
  },
  setters:{
    colegio: state => {
      state.mision_vision,
      state.autoridades,
      state.deberes_atribuciones,
      state.actas,
      state.elecciones,
      state.tesoreria
    } 
  },
  mutations: {
    asignarMisionVision(state,payload) {
      state.mision_vision = payload;
    },
    asignarAutoridades(state,payload) {
      state.autoridades = payload;
    },
    asignarDeberesAtribuciones(state,payload) {
      state.deberes_atribuciones = payload;
    },
    asignarActas(state,payload) {
      state.actas = payload;
    },
    asignarElecciones(state,payload) {
      state.elecciones = payload;
    },
    asignarTesoreria(state,payload) {
      state.tesoreria = payload;
    }
  },
  actions: {
    COLEGIO_retrieveMisionVision: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/colegio/mision-y-vision')
          .then(function(mision_vision) {
            // handle success
            if(mision_vision.data.info){
              commit('asignarMisionVision',mision_vision.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarMisionVision Error: ', error);
          });
    },
    COLEGIO_retrieveAutoridades: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/colegio/autoridades')
          .then(function(autoridades) {
            // handle success
            if(autoridades.data.info){
              commit('asignarAutoridades',autoridades.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('asignarAutoridades Error: ', error);
          });
    },
    COLEGIO_retrieveDeberesAtribuciones: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/colegio/deberes-y-atribuciones')
          .then(function(deberes) {
            // handle success
            if(deberes.data.info){
              commit('asignarDeberesAtribuciones',deberes.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('asignarDeberesAtribuciones Error: ', error);
          });
    },
    COLEGIO_retrieveActas: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/colegio/actas')
          .then(function(actas) {
            // handle success
            if(actas.data.info){
              commit('asignarActas',actas.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('asignarActas Error: ', error);
          });
    },
    COLEGIO_retrieveElecciones: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/colegio/elecciones')
          .then(function(elecciones) {
            // handle success
            if(elecciones.data.info){
              commit('asignarElecciones',elecciones.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('asignarElecciones Error: ', error);
          });
    },
    COLEGIO_retrieveTesoreria: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/colegio/tesoreria')
          .then(function(tesoreria) {
            // handle success
            if(tesoreria.data.info){
              commit('asignarTesoreria',tesoreria.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('asignarTesoreria Error: ', error);
          });
    }
  }
};

export default module