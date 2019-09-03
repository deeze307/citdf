<template>
  <v-list>
    <v-list-tile
      value="true"
      v-for="(item, i) in menu.items"
      :key="i"
      :to="{name:item.name}"
    >
      <v-list-tile-action v-if="showMenuItem(item)">
        <v-icon v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content v-if="showMenuItem(item)">
        <v-list-tile-title v-text="item.title"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    data() {
      return {
        show:true,
      }
    },
    computed: {
      menu() {
        return store.state.menu;
      },
      logged() {
        return store.state.login_api.loggedIn;
      }

    },
    methods:{
      showMenuItem(item) {
        if(item.show === ""){
          return true;
        }else{
          if(item.show === 'logged'){
            if(this.logged){
              return true;
            }else{
              return false;
            }
          }
        }
      }
    }
  }
</script>
