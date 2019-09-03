<template>
    <v-container class="ml-0 mr-0" fluid>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md12 lg12 xl12 text-center class="pt-2 pb-4">
          <h2 class="display-1 font-weight-black" style="color:#263238">Autoridades</h2>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl6>
          <h3 class=".subheading font-weight-bold">CONSEJO SUPERIOR</h3>
          <br>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left" style="width:25%;">Cargo</th>
                <th class="text-left" style="width:65%;">Nombre</th>
                <th class="text-left" style="width:10%;">Matrícula</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in consejo_superior" :key="item.nombre">
                <td>{{ item.cargo }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.matricula }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <br><br>
          <h3 class=".subheading font-weight-bold">COMISIÓN REVISORA DE CUENTAS</h3>
          <br>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left" style="width:25%;">Cargo</th>
                <th class="text-left" style="width:65%;">Nombre</th>
                <th class="text-left" style="width:10%;">Matrícula</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in comision_revisora" :key="item.nombre">
                <td>{{ item.cargo }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.matricula }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <br><br>
          <h3 class=".subheading font-weight-bold">TRIBUNAL DE ÉTICA Y DISCIPLINA</h3>
          <br>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left" style="width:25%;">Cargo</th>
                <th class="text-left" style="width:65%;">Nombre</th>
                <th class="text-left" style="width:10%;">Matrícula</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tribunal" :key="item.nombre">
                <td>{{ item.cargo }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.matricula }}</td>
              </tr>
            </tbody>
          </v-simple-table>
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
        consejo_superior: [
          {
            cargo: "Presidente",
            nombre: "Marcelo Fabián Domato",
            matricula: "37"
          },
          {
            cargo: "Vicepresidente",
            nombre: "Mónica María Frías",
            matricula: "109"
          },
          {
            cargo:"Secretario",
            nombre: "Vicente Antonio Fank",
            matricula:"44"
          },
          {
            cargo:"Prosecretario",
            nombre:"Sergio Leonardo Digón",
            matricula:"157"
          },
          {
            cargo:"Tesorera",
            nombre:"Inés Alejandra Caliva",
            matricula:"11"
          },
          {
            cargo: "Protesorero",
            nombre:"Rafael Jorge Fank",
            matricula:"50"
          },
          {
            cargo:"Vocal 1°",
            nombre:"Vicente Antonio Fank (Asume como Secretario en reemplazo del Secretario Electo por renuncia del mismo)",
            matricula:"44"
          },
          {
            cargo:"Vocal 2°",
            nombre:"Marcelo Daniel Jacob",
            matricula:"184"
          },
          {
            cargo:"Vocal 3°",
            nombre:"Mónica Ester Obreque",
            matricula:"38"
          },
          {
            cargo:"Vocal 4°",
            nombre:"Fabio Adrian Zárate",
            matricula:"1"
          },
          {
            cargo:"Vocal 5°",
            nombre: "Guillermo Federico Haehnel",
            matricula:"40"
          },
          {
            cargo:"Vocal 6°",
            nombre:"Horacio Guillermo Salvañá",
            matricula:54
          },
          {
            cargo:"Vocal Suplente 1°",
            nombre:"Sergio Ariel Fernandez",
            matricula:187
          },
          {
            cargo:"Vocal Suplente 2°",
            nombre:"Marcelo Adrian Bertoni",
            matricula: 87
          },
          {
            cargo:"Vocal Suplente 3°",
            nombre:"Gustavo Daniel Coccaro",
            matricula: 36
          }
        ],
        comision_revisora:[
          {
            cargo:"Presidente", 
            nombre:"Pablo Villena",
            matricula: 245
          },
          {
            cargo:"Vocal Titular", 
            nombre:"Christian Oscar Hervias",
            matricula: 141
          },
          {
            cargo: "Vocal Titular", 
            nombre:"Javier Nicolas Lepori",
            matricula: 114
          },
          {
            cargo:"Vocal Suplente", 
            nombre:"Viviana Marta Pamich",
            matricula: 148
          }
        ],
        tribunal:[
          {
            cargo:"Presidente", 
            nombre:"Jorge Gabriel Chocrón",
            matricula: 8
          },
          {
            cargo:"Vocal Titular", 
            nombre:"Alberto Eduardo Goitia",
            matricula: 45
          },
          {
            cargo:"Vocal Titular", 
            nombre:"Hector Miguel Czelada",
            matricula: 47
          },
          {
            cargo:"Vocal Suplente", 
            nombre:"Gustavo Roberto Fried",
            matricula: 9
          },
          {
            cargo:"Vocal Suplente", 
            nombre:"Roberto José Mangiamelli",
            matricula: 232
          }
        ]
      }
    },
    created:function(){
      store.dispatch('COLEGIO_retrieveAutoridades');
    },
    computed:{
      autoridades(){
        return store.state.colegio.autoridades;
      }
    },
    watch:{
      autoridades(){
        this.parseAutoridades();
      }
    },
    methods:{
      parseAutoridades(){
        console.log("Parseando Autoridades",store.state.colegio.autoridades.content.rendered);
      }
    }
}
</script>

<style>

</style>
