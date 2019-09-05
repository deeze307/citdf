// Modelo MenuToolBar

import axios from 'axios'
import router from '../../router'

const module = {
  state: {
    title: "CITDF",
    header_color: 'primary',
    items:[]
  },
  mutations: {
    updateTitle(state,payload) {
      state.title = payload
    },
    updateMenuItems(state,payload) {
      state.items = payload
    }
  },
  actions: {
    MENU_TOOLBAR_retrieveMenuItems: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: 'http://18.222.190.185:3031'
      });
      curl.get('/menu')
          .then(function(response) {
            // handle success
            if(response.data.info){
              commit('updateMenuItems',response.data.info.items)
            }else{
            }
          })
          .catch(function (error) {
            console.log('retrieveMenuItems Error: ', error);
          });
    }
  }
};

export default module