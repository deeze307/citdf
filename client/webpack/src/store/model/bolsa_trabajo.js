// Modelo MenuToolBar

import axios from 'axios'
import router from '../../router'

const module = {
  state: {
    items:{},
    selected:{
      title:{rendered:""},
      content:{rendered:""}
    }
  },
  getters:{
    bolsa_trabajo: state => {
      state.items,
      state.selected
    }
  },
  setters:{
    bolsa_trabajo: state => {
      state.selected
    } 
  },
  mutations: {
    asignarBolsaTrabajo(state,payload) {
      state.items = payload;
    },
    asignarSelected(state,payload) {
      console.log("Bolsa selected: ",payload);
      state.selected = payload;
    }
  },
  actions: {
    BOLSA_TRABAJO_retrievePosts: function({commit,dispatch,state},perPage=null){
      const curl = axios.create({
        baseURL: 'http://localhost:3031'
      });
      let params = [];
      if(perPage != null && perPage != ''){
        params = {perPage: perPage};
      }
      curl.get('/bolsa_trabajo',{params: params})
          .then(function(bolsa) {
            // handle success
            if(bolsa.data.info){
              commit('asignarBolsaTrabajo',bolsa.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarBolsaTrabajo Error: ', error);
          });
    },
    BOLSA_TRABAJO_goWithSelected: function({commit,dispatch,state},selected){
      console.log("BOLSA_TRABAJO_goWithSelected: ",selected);
      commit('asignarSelected',selected);
    }
  }
};

export default module