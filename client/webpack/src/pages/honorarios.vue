<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238">Cálculo de Honorarios: Tareas de Arquitectura e Ingeniería</h2>
          <p>La calculadora de honorarios es una herramienta útil al momento del cálculo y negociación de los honorarios.</p>
        </v-flex>
        <v-flex xs12 sm12 md10 lg10 xl10>
          <v-flex xs12 sm12 md3 lg3 xl3>
            <v-form>
              <v-container>
                <v-col md="6">
                  <v-text-field
                    v-model="valorUVA"
                    label="Valor UVA"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-select
                    v-model="form.cbx_tarea"
                    :items="cbx_tarea"
                    label="Tareas"
                    @change="onChangeTarea()"
                  ></v-select>
                </v-col>

                <v-col md="12">
                </v-col>
              </v-container>
            </v-form>
          </v-flex>
          <v-flex xs12 sm12 md9 lg9 xl9>

          </v-flex>

        </v-flex>
      </v-layout>
      
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    components:{
    },
    data () {
      return {
        consultas:false,
        form:{},
        cbx_tarea: [
          "Consultas",
          "Informes, estudios técnicos, estudios economico-financieros y estudios técnico-legales",
          "Estudios carreteros, de ferrocarriles y canales",
          "Medición de edificios",
          "Proyectos completos de obras de arquitectura e ingeniería",
          "Representación técnica en obras públicas o privadas"
        ],
        
      }
    },
    created:function(){
      store.dispatch('HONORARIOS_valorUVA');
    },
    computed:{
      valorUVA(){
        console.log(store.state.honorarios.valor_uva)
        return store.state.honorarios.valor_uva;
      }
    },
    watch:{
      valorUVA(){
      }
    },
    methods:{
      onChangeTarea:function(){
        if(this.form.cbx_tarea ==="Consultas"){

        }
      }
    }
}
</script>

<style>

</style>
