import Vue from 'vue'
import Router from 'vue-router'

// Paginas
import home from '@/pages/home'
import gestion from '@/pages/gestion'
import contacto from '@/pages/contacto'
import links from '@/pages/links'
import honorarios from '@/pages/honorarios'
import descargas from '@/pages/descargas'
// Grupo de rutas
import user from './user'
import bolsa_trabajo from './bolsa-trabajo'
import beneficios from './beneficios'
import novedades from './novedades'
import colegio from './colegio'
import comisiones from './comisiones'
import matricula from './matricula'
import tramites from './tramites'
import marco_legal from './marco_legal'

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
  {
    path: '/honorarios',
    component: honorarios
  },
  {
    path: '/descargas',
    component: descargas
  },
]
let routes = baseRoutes.concat(user,novedades,bolsa_trabajo,colegio,comisiones,beneficios,matricula,tramites,marco_legal);
export default new Router({
  routes
})
