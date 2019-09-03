import Vue from 'vue'
import Router from 'vue-router'

// Paginas
import home from '@/pages/home'
import gestion from '@/pages/gestion'
import matriculados from '@/pages/matriculados'
import contacto from '@/pages/contacto'
// Grupo de rutas
import user from './user'
import bolsa_trabajo from './bolsa-trabajo'
import beneficios from './beneficios'
import novedades from './novedades'
import colegio from './colegio'

Vue.use(Router);

const baseRoutes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/gestion',
    component: gestion
  },
  {
    path: '/lista-de-matriculados',
    component: matriculados
  },
  {
    path: '/contacto',
    component: contacto
  }
]
let routes = baseRoutes.concat(user,novedades,bolsa_trabajo,colegio,beneficios);
export default new Router({
  routes
})
