// Paginas
import codigo_etica from '@/pages/marco_legal/codigo_etica'
import reglamento_electoral from '@/pages/marco_legal/reglamento_electoral'
import reglamento_interno from '@/pages/marco_legal/reglamento_interno'
import ley_creacion from '@/pages/marco_legal/ley_creacion'
export default [
  {
    path: '/codigo-de-etica',
    component: codigo_etica
  },
  {
    path: '/reglamento-electoral',
    component: reglamento_electoral
  },
  {
    path: '/reglamento-interno',
    component: reglamento_interno
  },
  {
    path: '/ley-de-creacion',
    component: ley_creacion
  }
]
