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
    beneficios: state => {
      state.items,
      state.selected
    }
  },
  setters:{
    beneficios: state => {
      state.selected
    } 
  },
  mutations: {
    asignarBeneficios(state,payload) {
      state.items = payload;
    },
    asignarSelected(state,payload) {
      console.log("Beneficio selected: ",payload);
      state.selected = payload;
    }
  },
  actions: {
    BENEFICIOS_retrievePosts: function({commit,dispatch,state},perPage=null){
      const curl = axios.create({
        baseURL: 'http://18.222.190.185:3031'
      });
      let params = [];
      if(perPage != null && perPage != ''){
        params = {perPage: perPage};
      }
      curl.get('/beneficios',{params: params})
          .then(function(beneficios) {
            // handle success
            if(beneficios.data.info){
              commit('asignarBeneficios',beneficios.data.info)
            }else{
            }
          })
          .catch(function (error) {
            console.log('AsignarBeneficios Error: ', error);
          });
    },
    BENEFICIOS_goWithSelected: function({commit,dispatch,state},selected){
      console.log("BENEFICIOS_goWithSelected: ",selected);
      commit('asignarSelected',selected);
    }
  }
};

export default module