
<template>
    <v-dialog v-model="dialogPay" max-width="700px">
        <v-card>
        <v-card-title>
            <span class="headline">Realizar Nuevo Pago</span>
        </v-card-title>
        <v-card-text>
            <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-text-field v-model="user.first_name" label="Nombres" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-text-field v-model="user.last_name" label="Apellidos" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="8" xl="8">
                    <v-select
                        v-model="user.tipo_pago"
                        :items="['Ushuaia','Tolhuin','Rio Grande']"
                        label="¿Qué desea Pagar?"
                        required
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-text-field v-model="user.user_email" label="Email" required></v-text-field>
                </v-col>
                <v-col cols="12" sm=6 md=4 lg=4 xl="4">
                    <v-text-field v-model="user.matricula" label="Matrícula N°" required></v-text-field>
                </v-col>
            </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="red darken-1" text @click="dialogPay = false">Cancelar</v-btn>
            <!-- <div id="paypal-button-container"></div> -->
            <v-btn color="green darken-1" :loading="inProcess" text @click="pay">Proceder a Pago</v-btn>
            <btn-mercado-pago></btn-mercado-pago>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import BtnMercadoPago from '../../../components/MercadoPagoSmartCheckOut'

export default {
    components:{ BtnMercadoPago },
    name:'dialog-pay',
    props:['dialogPay','user'],
    data:() => ({
        inProcess:false,
    }),
    mounted() {
        console.log(this.payFormUrl)
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
            console.log("pagando...")
            store.dispatch("TRAMITES_pagarMatricula")
        }
    }
}
</script>