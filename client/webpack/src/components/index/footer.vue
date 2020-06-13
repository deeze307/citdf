<template>
  <v-footer
    height="auto"
    color="primary"
  >
    <v-layout
    justify-center
    row
    wrap
    >
      <v-btn
        v-for="link in footerLinks"
        :key="link.title"
        color="white"
        small
        text
        rounded
        :to="link.url"
      >
        {{ link.title }}
      </v-btn>
      <v-flex
        primary
        py-1
        text-center
        white--text
        xs12
      >
        &copy;2019 - 2020 — <strong>Colegio de Ingenieros de Tierra del Fuego Antártida e Islas del Atlántico Sur</strong> info@citdf.org.ar
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
    data(){
      return{
        footerLinks:[
          {
            title:"Home",
            url: "/"
          },
          {
            title:"Contacto",
            url:"contacto"
          },
          {
            title:"Lista de Matriculados",
            url:"lista-de-matriculados"
          },
          {
            title:"Links",
            url:"links"
          }
        ]
      }
    }
}
</script>