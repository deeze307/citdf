
<template>
    <div>
        <a mp-mode="dftl" href="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=322514048-09ac6f8b-c37f-461b-bb51-64f51aac52b4" name="MP-payButton" class='blue-ar-m-ov-none'>Pagar</a>
        <script type="application/javascript">
        (function(){function $MPC_load(){window.$MPC_loaded !== true && (function(){var s = document.createElement("script");s.type = "text/javascript";s.async = true;s.src = document.location.protocol+"//secure.mlstatic.com/mptools/render.js";var x = document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);window.$MPC_loaded = true;})();}window.$MPC_loaded !== true ? (window.attachEvent ?window.attachEvent('onload', $MPC_load) : window.addEventListener('load', $MPC_load, false)) : null;})();
        </script>
    </div>
</template>

<script>

export default {
    name:'btn-mercadopago',
    props:[],
    data:() => ({
        inProcess:false,
    }),
    mounted() {
    },
    watch:{
        'user.tipo_pago'(value){
            if(value && value !== ''){
                this.pay()
            }
        }
    },
    methods:{
        pay(){
            console.log("boton mercado pago presionado")
        }
    }
}
</script>