// Paginas
import profile from '@/pages/user/profile'
import tramites from '@/pages/user/tramites'
import pagos from '@/pages/pagos/pagos'
export default [
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/tramites',
    component: tramites
  },
  {
    path: '/tramites/pagos',
    component: pagos
  }
]
