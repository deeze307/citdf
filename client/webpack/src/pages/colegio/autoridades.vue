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
            nombre: "Ricardo Anibal Bianciotto",
            matricula: "006"
          },
          {
            cargo: "Vicepresidente",
            nombre: "Arnaldo Agustin Ojeda",
            matricula: "290"
          },
          {
            cargo:"Secretario",
            nombre: "Esteban Martin Mangiameli",
            matricula:"056"
          },
          {
            cargo:"Prosecretario",
            nombre:"Roxana Estela Taler",
            matricula:"149"
          },
          {
            cargo:"Tesorero",
            nombre:"Alberto Eduardo Goitia",
            matricula:"045"
          },
          {
            cargo: "Protesorero",
            nombre:"Abel Omar Cortez",
            matricula:"193"
          },
          {
            cargo:"Vocal 1°",
            nombre:"Gustavo Daniel Cóccaro",
            matricula:"036"
          },
          {
            cargo:"Vocal 2°",
            nombre:"Luciana Graciela Ferro",
            matricula:"031"
          },
          {
            cargo:"Vocal 3°",
            nombre:"Ariel Gustavo Prokopiw",
            matricula:"130"
          },
          {
            cargo:"Vocal 4°",
            nombre:"Marcela Virginia Arguello",
            matricula:"077"
          },
          {
            cargo:"Vocal 5°",
            nombre: "Carolina Erica Reynoso",
            matricula:"150"
          },
          {
            cargo:"Vocal 6°",
            nombre:"Gustavo Omar Cortes",
            matricula:"185"
          },
          {
            cargo:"Vocal Suplente 1°",
            nombre:"Martin Ivan Gessaga",
            matricula:"062"
          },
          {
            cargo:"Vocal Suplente 2°",
            nombre:"Juan Manuel Casco",
            matricula: "146"
          },
          {
            cargo:"Vocal Suplente 3°",
            nombre:"Nicolás Dimitroff Hodi",
            matricula: "329"
          }
        ],
        comision_revisora:[
          {
            cargo:"Titular", 
            nombre:"Mariano Adolfo Medina",
            matricula: "065"
          },
          {
            cargo:"Titular", 
            nombre:"Anibal Antonio Viscido Castro",
            matricula: "203"
          },
          {
            cargo:"Suplente", 
            nombre:"Jonatan Wilder",
            matricula: "205"
          },
          {
            cargo:"Suplente", 
            nombre:"Jorge Demián Burdisso",
            matricula: "074"
          }
        ],
        tribunal:[
          {
            cargo:"Presidente", 
            nombre:"Fabio Adrián Zárate",
            matricula: "001"
          },
          {
            cargo:"Vocal Titular", 
            nombre:"Roberto José Mangiameli",
            matricula: "232"
          },
          {
            cargo: "Vocal Titular", 
            nombre:"Gustavo Roberto Fried",
            matricula: "009"
          },
          {
            cargo:"Vocal Suplente", 
            nombre:"Alejandro Jorge Galvarini",
            matricula: "182"
          },
          {
            cargo:"Vocal Suplente", 
            nombre:"Gustavo Amancio Nuñez",
            matricula: "094"
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
