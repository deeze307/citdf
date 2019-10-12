
<template>
    <div>
        <form action="/tramites/pay" method="POST">
            <script
            type="application/javascript"
            src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
            data-preference-id="1">
            </script>
        </form>
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