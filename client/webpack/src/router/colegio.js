// Paginas
import mision_vision from '@/pages/colegio/mision_vision'
import autoridades from '@/pages/colegio/autoridades'
import deberes_atribuciones from '@/pages/colegio/deberes_atribuciones'
import actas from '@/pages/colegio/actas'
import resoluciones from '@/pages/colegio/resoluciones'
import elecciones from '@/pages/colegio/elecciones'
import tesoreria from '@/pages/colegio/tesoreria'
export default [
  {
    path: '/mision-y-vision',
    component: mision_vision
  },
  {
    path: '/autoridades',
    component: autoridades
  },
  {
    path: '/deberes-y-atribuciones',
    component: deberes_atribuciones
  },
  {
    path: '/actas',
    component: actas
  },
  {
    path: '/resoluciones',
    component: resoluciones
  },
  {
    path: '/elecciones',
    component: elecciones
  },
  {
    path: '/tesoreria',
    component: tesoreria
  }
]
