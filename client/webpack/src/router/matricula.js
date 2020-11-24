// Paginas
import matriculados from '@/pages/matricula/matriculados'
import como_matricularse from '@/pages/matricula/como_matricularse'
import aranceles from '@/pages/matricula/aranceles'
import baja_suspension from '@/pages/matricula/baja_suspension'

export default [
  {
    path: '/lista-de-matriculados',
    component: matriculados
  },
  {
    path: '/como-matricularse',
    component: como_matricularse
  },
  {
    path: '/aranceles',
    component: aranceles
  },
  {
    path: '/baja-suspension',
    component: baja_suspension
  },
]
