// Modelo Alert
const module = {
  state:{
    alert:{
      show: false,
      class: "success",
      message: "sadsdsdddd"
    }
  },
  getters: {
    alert: state => state.alert
  },
  mutations: {
    showAlertMessage(state,payload) {
      state.alert = payload;
    }
  },
  actions: {
    toggleAlertMessage:function(context,data){
      context.commit('showAlertMessage', data);
    }
  }
};


export default module