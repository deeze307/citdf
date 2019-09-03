<template>
  <v-combobox
    dense
    box
    clearable

    v-model="select"
    @input="hasSelected"

    @click:clear="onClear"
    :label="label"
    :items="items"
    :loading="loading"
    :error="error"
    :error-messages="error_message"
  ></v-combobox>
  </template>

<script>
  import axios from 'axios'

  export default {
    props: ['label','form','text','custom','selected'],
    data () {
      return {
        apigw: process.env.SIEP_API_GW_INGRESS,
        select: '',
        items: [],

        loading: true,
        error: false,
        error_message: '',
      }
    },
    created: function () {
      this.select = this.selected;
      this.formOption();
    },
    methods: {
      onClear: function() {
        this.select = {
          text: null,
          value: null
        }
      },
      hasSelected: function (opt) {
        if(opt) {
          if(opt.value) {
            this.$emit('input',opt.value);
          }
        } else {
          this.$emit('input',null);
        }
      },
      formOption: function () {
        var vm = this;
        vm.loading = true;
        vm.error = false;

        axios.get(vm.apigw+'/api/public/siep_admin/v1/forms/'+vm.form)
        .then(function (response) {
          let render = response.data.map(function(x) {
            let getValue = 'nombre';

            if (vm.custom) {
              getValue = vm.custom;
            } else {
              if (vm.text) {
                getValue = vm.text;
              }
            }
            return {
              text: x[vm.text || 'nombre'],
              value: x[getValue]
            };
          });

          vm.items = render;
          vm.loading = false;
        })
        .catch(function (error) {
          vm.error = true;
          vm.error_message = error.message;
          vm.loading = false;
        });
      },
    }
  }
</script>
