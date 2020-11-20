// Modelo Menu
const menu = {
 items: [
    {
      icon: 'home',
      title: 'Inicio',
      name: 'home',
      show:''

    },
    {
      icon:'school',
      title:'Instituciones',
      name:'instituciones',
      show:''

    },
    {
      icon: 'account_circle',
      title: 'Secciones',
      name: 'matriculas_cuantitativa_por_seccion',
      show:'logged'
    },

   {
     icon: 'account_circle',
     title: 'Inscripciones Nominales',
     name: 'rrhh_alumnos_nominal',
     show:'logged'
   }
 ]
};

const module = {
  state:menu
};

export default module
