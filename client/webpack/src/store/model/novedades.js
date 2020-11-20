// Modelo Novedades

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
    novedades: state => {
      state.items,
      state.selected
    }
  },
  setters:{
    novedades: state => {
      state.selected
    } 
  },
  mutations: {
    asignarNovedades(state,payload) {
      state.items = payload;
    },
    asignarSelected(state,payload) {
      console.log("Novedades selected: ",payload);
      state.selected = payload;
    }
  },
  actions: {
    NOVEDADES_retrievePosts: function({commit,dispatch,state},perPage=null){
      const curl = axios.create({
        baseURL: 'http://api-deeze.tk:3031'
      });
      let params = [];
      if(perPage != null && perPage != ''){
        params = {perPage: perPage};
      }
      curl.get('/novedades',{params: params})
          .then(function(novedades) {
            // handle success
            if(novedades.data.info){
              commit('asignarNovedades',novedades.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarNovedades Error: ', error);
          });
    },
    NOVEDADES_goWithSelected: function({commit,dispatch,state},selected){
      console.log("NOVEDADES_goWithSelected: ",selected);
      commit('asignarSelected',selected);
    }
  }
};

export default module