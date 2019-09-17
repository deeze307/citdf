// Modelo Colegio

import axios from 'axios'

const module = {
  state: {
    items:[
      {content:{rendered:""}},
      {content:{rendered:""}},
      {content:{rendered:""}},
      {content:{rendered:""}}
    ]
  },
  getters:{
    descargas: state => {
      state.items
    }
  },
  setters:{
    descargas: state => {
      state.items
    } 
  },
  mutations: {
    asignarDescargas(state,payload) {
      state.items = payload;
    },
  },
  actions: {
    DESCARGAS_retrieveDescargas: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      curl.get('/descargas')
        .then(function(descargas) {
          // handle success
          if(descargas.data.info){
            commit('asignarDescargas',descargas.data.info)
          }else{
          }
        })
        .catch(function (error) {
          console.log('asignarDescargas Error: ', error);
        });
    },
  }
};

export default module