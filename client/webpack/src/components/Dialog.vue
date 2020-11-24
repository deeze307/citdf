<template>
  <v-dialog v-model="dialog.open" :max-width="dialog.maxWidth">
    <template v-if="dialog.buttonText && dialog.showButton" v-slot:activator="{ on }">
        <v-btn color="blue darken-1" small dark v-on="on"> <v-icon left>post_add</v-icon> {{dialog.buttonText}}</v-btn>
    </template>
    <component :is="dialog.component" v-on:closeDialog="closeDialog" :data="dialog.data" />
  </v-dialog>
</template>
<script>
import NuevoTramiteForm from '@/components/apiforms/NuevoTramiteForm'
import NuevoAprobadorForm from '@/components/apiforms/NuevoAprobadorForm'
export default {
  name: "Dialog",
  components: {
    NuevoTramiteForm,
    NuevoAprobadorForm
  },
  props: {
    dialog: {
      type: Object
    }
  },
  computed: {
    _dialog () {
      return store.state.dialog.dialog
    }
  },
  watch: {
    _dialog: {
      handler (val) {
        if (!val.open) {
          this.dialog.open = false
        }
      },
      deep: true
    }
  },
  methods: {
    closeDialog () {
      this.dialog.open = false
    }
  },
}
</script>

<style>

</style>