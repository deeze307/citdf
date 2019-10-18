// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueSwal from 'vue-swal'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faGoogle, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faFileExcel, faFacebookF, faGoogle, faLinkedinIn, faTwitter)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import JsonExcel from 'vue-json-excel'
 
Vue.component('downloadExcel', JsonExcel)

// MomentJS
import moment from 'moment'
 
Vue.use(VueSwal)

// Google Maps
import * as VueGoogleMaps from "vue2-google-maps";

// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import _ from 'lodash';

// Source
import router from './router'
import store from './store'

// ScrollTo
import VueScrollTo from 'vue-scrollto';

// Social Sharing
import SocialSharing from 'vue-social-sharing';

Vue.use(SocialSharing);

Vue.use(VueScrollTo, {
     container: "body",
     duration: 500,
     easing: "ease",
     offset: 0,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })


Vue.filter('fechaSinHora', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});

Vue.filter('fechaConHora', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
});

Vue.filter('fechaSegundos', function(value) {
  if (value) {
    let date = new Date(value._seconds * 1000);
    return moment(String(date)).format('DD/MM/YYYY hh:mm:ss')
  }
});

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBFPUFES_l4Gn4QKty9nwXTdeM-Ew-Hxb8",
    libraries: "places" // necessary for places input
  }
});

Vue.set(Vue.prototype, '_', _);

Vue.config.productionTip = false;

Vue.use(Vuetify)
export default new Vuetify({ })

/* eslint-disable no-new */
// new Vue({
//   Vuetify,
//   store,
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// });
new Vue({
    store,
    router,
    el: '#app',
    vuetify : new Vuetify(),
    components: { App },
    template: '<App/>'
  });
