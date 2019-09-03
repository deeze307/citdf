<template>
  <div>

    <v-chip
      class="ml-0"
      label
      small
    >
      Inscripciones: {{ response.total || 'Sin resultados' }}
    </v-chip>

    <!-- Descargar excel -->
    <v-menu
            :disabled="excel.download"
        open-on-hover offset-y max-height="200">
        <v-btn
          slot="activator"
          color="green"
          small
          dark
          :loading="excel.download"
        >
        <v-icon left dark>cloud_download</v-icon>
        Descargar excel
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="parte in excel.partes"
          :key="parte"
          @click.native="startDownload(parte)"
        >
          <v-list-tile-title>Parte: {{ parte }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-snackbar
      v-model="excel.snackbar"
      color="red darken-4"
    >
      Error: {{ excel.error_message }}
      <v-btn
        dark
        flat
        @click="excel.snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
    <!-- ./Descargar excel -->

    <!-- Datatable -->
    <v-data-table
      :headers="headers"
      :items="response.data"
      :loading="loading"
      no-data-text="No hay datos"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">
          <v-btn
            color="primary"
            dark
            @click="showPersonInfo(props.item)"
            fab
            small
          >
            <v-icon>visibility</v-icon>
          </v-btn>
        </td>
        <td>{{ props.item.centro }}</td>
        <td class="text-xs-right">{{ props.item.nivel_servicio }}</td>
        <td class="text-xs-right">{{ props.item.nombre_completo }}</td>
        <td class="text-xs-right">{{ props.item.dni }}</td>
        <td class="text-xs-right">{{ props.item.año }}</td>
        <td class="text-xs-right">{{ props.item.division }}</td>
        <td class="text-xs-right">{{ props.item.turno }}</td>
        <td class="text-xs-right">{{ props.item.fecha_alta }}</td>
        <td class="text-xs-right">{{ props.item.fecha_baja }}</td>
        <td class="text-xs-right">{{ props.item.fecha_egreso }}</td>
      </template>
    </v-data-table>
    <!-- ./Datatable -->
    <br>

    <v-dialog
            v-model="dialog_ops.dialog"
            max-width="490"
    >
      <v-card>
        <v-card-title class="headline">{{dialog_ops.dialogTitle}}</v-card-title>
        <v-card-text>
          <div>
            <strong>Nombre Completo:</strong> {{dialog_ops.dialogContent.nombres}} {{dialog_ops.dialogContent.apellidos}}
          </div>
          <div>
            <strong>Documento Tipo:</strong> {{dialog_ops.dialogContent.documento_tipo}}
          </div>
          <div>
            <strong>DNI:</strong> {{dialog_ops.dialogContent.dni}}
          </div>
          <div>
            <strong>Edad:</strong> {{dialog_ops.dialogContent.edad}}
          </div>
          <div>
            <strong>Sexo:</strong> {{dialog_ops.dialogContent.sexo}}
          </div>
          <div>
            <strong>Domicilio:</strong> {{dialog_ops.dialogContent.calle_nombre}} {{dialog_ops.calle_nro}}
          </div>
          <div>
            <strong>Teléfono:</strong> {{dialog_ops.dialogContent.telefono_nro}}
          </div>
          <div>
            <strong>Email:</strong> {{dialog_ops.dialogContent.email}}
          </div>
          <div>
            <strong>Lugar de Nacimiento:</strong> {{dialog_ops.dialogContent.pcia_nac}}
          </div>
          <div>
            <strong>Fecha de Nacimiento:</strong> {{dialog_ops.dialogContent.fecha_nac}}
          </div>
          <div>
            <strong>Observaciones</strong> {{dialog_ops.dialogContent.observaciones}}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="green darken-1"
                  flat="flat"
                  @click="dialog_ops.dialog = false"
          >Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Pagination -->
    <p class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="response.last_page"
        :total-visible="7"
      />
    </p>
    <!-- ./Pagination -->

  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    components:{
    },
    props: ['query'],
    data () {
      return {
        headers: [
          { text: 'Más Detalles', value: 'detalles' , sortable: false },
          { text: 'Centro', value: 'centro', sortable: false  },
          { text: 'Nivel de servicio', value: 'nivel_servicio' , sortable: false },
          { text: 'Nombre', value: 'nombre_completo' , sortable: false },
          { text: 'DNI', value: 'dni' , sortable: false },
          { text: 'Año', value: 'año' , sortable: false },
          { text: 'Division', value: 'division' , sortable: false },
          { text: 'Turno', value: 'turno' , sortable: false },
          { text: 'Fecha Alta', value: 'fecha_alta' , sortable: false },
          { text: 'Fecha Baja', value: 'fecha_baja' , sortable: false },
          { text: 'Fecha Egreso', value: 'fecha_egreso' , sortable: false },
        ],
        response: [],

        excel: {
          download: false,
          error: false,
          error_message: false,
          snackbar: false,
          limite: 3000,
          partes: 0
        },

        dialog_ops:{
          dialog: false,
          buttonName:"",
          dialogTitle:"Información de Alumno",
          dialogContent:[],
          icon:"visibility"
        },

        apigw: process.env.SIEP_API_GW_INGRESS,
        page: 1,
        loading: true,
        error: false,
        error_message: '',
        details_loading: false
      }
    },
    created: function () {
      this.getData();
    },
    watch: {
      page: function() {
        this.query.page = this.page;
        this.getData();
      },
      query: {
        handler() {
          // Cada vez que cambia la query, retorno a la primer pagina
          this.page = 1;
          this.getData();
        },
        deep: true
      }
    },
    methods: {
      getData() {
        let vm = this;
        vm.loading = true;
        vm.error = false;

        vm.scrollToTop();

        axios.get(vm.apigw+'/api/public/siep_admin/v1/dependencia/rrhh/nominal_alumnos_inscriptos',{
          params: vm.query
        })
        .then(function (response) {
          vm.response = response.data;
          vm.loading = false;

          if(vm.response.total) {
            vm.excel.partes = Math.ceil(vm.response.total / vm.excel.limite);
          }
        })
        .catch(function (error) {
          vm.error = true;
          vm.error_message = error.message;
          vm.loading = false;
        });
      },
      startDownload(parte) {
        let vm = this;
        vm.excel.download = true;
        vm.excel.error= false;

        let download= JSON.parse(JSON.stringify(vm.query));
        download.export = 1;
        download.page = parte;
        download.por_pagina = vm.excel.limite;

        axios.get(vm.apigw+'/api/public/siep_admin/v1/dependencia/rrhh/nominal_alumnos_inscriptos',{
          params: download,
          responseType: 'blob'
        })
        .then(function (response) {
          vm.excel.download= false;
          vm.excel.error= false;

          // Descarga EXCEL con AJAX (permite crear loading)
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'RRHH_AlumnosNominal_'+download.page+'.xlsx');
          document.body.appendChild(link);
          link.click();
        })
        .catch(function (error) {
          vm.excel.download= false;
          vm.excel.error= true;
          vm.excel.error_message= error.message;
          vm.excel.snackbar = true;
        });
      },
      showPersonInfo(alumno){
        let vm = this;
        vm.dialog_ops.dialogContent = alumno;
        vm.dialog_ops.dialog = true;
        console.log(alumno);
      },
      scrollToTop() {
        window.scrollTo(0,0);
      }
    }
  }
</script>
