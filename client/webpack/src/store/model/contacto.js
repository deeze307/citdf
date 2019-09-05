// Modelo Novedades

import axios from 'axios'
import router from '../../router'

const module = {
  state: {
    form:{
      content:{rendered:""}
    }
  },
  getters:{
    contacto: state => {
      state.form
    }
  },
  setters:{
    contacto: state => {
      state.form
    } 
  },
  mutations: {
    asignarContactoInfo(state,payload) {
      state.form = payload;
    }
  },
  actions: {
    CONTACTO_retrieveContactInfo: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://18.222.190.185:3031'
      });
      curl.get('/contacto')
          .then(function(contacto) {
            // handle success
            if(contacto.data.info){
              commit('asignarContactoInfo',contacto.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarContacto Error: ', error);
          });
    }
  }
};

export default module