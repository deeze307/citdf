// Modelo Dialog
const module = {
  state:{
    dialog:{
      dialog: true,
      head: "success",
      body: "sadsdsdddd",
      actions:{
        aceptar:{},
        cancelar:{}
      }
    }
  },
  getters: {
    dialog: state => state.dialog
  },
  mutations: {
    showDialog(state,payload) {
      state.dialog = payload;
    }
  },
  actions: {
    toggleDialog:function(context,data){
      context.commit('showDialog', data);
    }
  }
};


export default module