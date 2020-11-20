<template>
    <v-container>
      <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
        <h1 class="display-2 font-weight-black" style="color:#263238">Gestión</h1>
      </v-flex>
      <tramites-component />
      <pagos-component />
      <aprobadores-component />
    </v-container>
</template>

<script>
import tramitesComponent from './tramites'
import pagosComponent from './pagos'
import aprobadoresComponent from './aprobadores'

export default {
  components:{ tramitesComponent, pagosComponent, aprobadoresComponent },
  data () {
    return {
    }
  },
  mounted:function(){
  },
  created: function(){
  },
  computed:{
  },
  watch:{
  },
  methods:{
  }
}
</script>

<style>
</style>
