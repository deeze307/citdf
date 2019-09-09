// Paginas
import legajo_minimo from '@/pages/tramites/legajo_minimo'
import certificacion_firma from '@/pages/tramites/certificacion_firma'
import encomienda_tareas from '@/pages/tramites/encomienda_tareas'
export default [
  {
    path: '/legajo-minimo',
    component: legajo_minimo
  },
  {
    path: '/certificacion-de-firma',
    component: certificacion_firma
  },
  {
    path: '/encomienda-de-tareas',
    component: encomienda_tareas
  }
]
