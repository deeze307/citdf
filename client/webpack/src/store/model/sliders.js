// Modelo MenuToolBar

import axios from 'axios'
import router from '../../router'

const module = {
  state: {
    apiUrl: 'http://api-deeze.tk:3031',
    items:{
      payload:[]
    },
    homeItems:{
      payload:[]
    },
    inProcess:false,
  },
  mutations: {
    updateTitle(state,payload) {
      state.title = payload
    },
    updateSliderHomeItems(state,payload) {
      state.homeItems = payload
    }
  },
  actions: {
    SLIDERS_retrieveSliderHomeItems: function({commit,dispatch,state}){
      const curl = axios.create({
        baseURL: state.apiUrl,
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Credentials' : true
        }
      });
      curl.get('/slider_img')
        .then(function(response) {
          // handle success
          console.log("Obtenido de AWS:",response.data)
          if(response.data){
            commit('updateSliderHomeItems',response.data)
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