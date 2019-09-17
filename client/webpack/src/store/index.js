import Vue from 'vue'
import Vuex from 'vuex'

import menu from './model/menu'
import menu_toolbar from './model/menu_toolbar'
import bolsa_trabajo from './model/bolsa_trabajo'
import novedades from './model/novedades'
import colegio from './model/colegio'
import contacto from './model/contacto'
import tramites from './model/tramites'
import pagos from './model/pagos'
import beneficios from './model/beneficios'
import matriculados from './model/matriculados'
import marco_legal from './model/marco_legal'
import honorarios from './model/honorarios'
import descargas from './model/descargas'

//import user from './model/user'
import profile from './model/profile'
import login_api from './model/login_api'
import alert from './model/alert'
import dialog from './model/dialog'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    menu: menu,
    menu_toolbar: menu_toolbar,
    bolsa_trabajo: bolsa_trabajo,
    novedades: novedades,
    colegio: colegio,
    contacto: contacto,
    tramites: tramites,
    pagos: pagos,
    beneficios: beneficios,
    matriculados: matriculados,
    marco_legal: marco_legal,
    honorarios: honorarios,
    descargas: descargas,

//    user: user,
    profile:profile,
    login_api: login_api,
    alert:alert,
    dialog:dialog,
  }
});

export default store
window.store = store
