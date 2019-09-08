import Vue from 'vue'
import Router from 'vue-router'

// Paginas
import home from '@/pages/home'
import gestion from '@/pages/gestion'
import contacto from '@/pages/contacto'
import links from '@/pages/links'
// Grupo de rutas
import user from './user'
import bolsa_trabajo from './bolsa-trabajo'
import beneficios from './beneficios'
import novedades from './novedades'
import colegio from './colegio'
import matricula from './matricula'

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
    path: '/contacto',
    component: contacto
  },
  {
    path: '/links',
    component: links
  },
]
let routes = baseRoutes.concat(user,novedades,bolsa_trabajo,colegio,beneficios,matricula);
export default new Router({
  routes
})
