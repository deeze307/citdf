
<template>
    <v-container fluid>
        <v-flex xs12 sm12 md6 lg6 xl6>
            <v-card>
                <v-card-title>
                    <span class="headline">Nuevo Pago</span>
                    <span class="subheader"></span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                                <v-select
                                    v-model="pagosForm.tipo_pago"
                                    :items="tipoPago"
                                    label="¿Qué desea Pagar?"
                                    item-text="nombre"
                                    return-object
                                    required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                                <v-select
                                    v-model="pagosForm.paymentMethod"
                                    :items="tipoTarjeta"
                                    label="Tipo de Tarjeta"
                                    item-text="nombre"
                                    return-object
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12" v-if="showCosto">
                                <v-subheader class="font-weight-medium">Costo por Módulo:  ${{pagosForm.tipo_pago.costo_modulo}}</v-subheader>
                                <v-subheader class="font-weight-medium">Cantidad de Módulos:  {{pagosForm.tipo_pago.modulos}}</v-subheader>
                                <v-subheader class="font-weight-medium" v-if="pagosForm.tipo_pago.nombre === 'Inscripción'">Monto Total (Inscripción + Matrícula): <span class="ml-2 title font-weight-black"> ${{pagosForm.tipo_pago.costo}}</span></v-subheader>
                                <v-subheader class="font-weight-medium" v-else>Monto Total:  <span class="ml-2 title font-weight-black"> ${{pagosForm.tipo_pago.costo}}</span></v-subheader>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="5" md="5" lg="5" xl="5">
                                <v-text-field label="N° Tarjeta (débito o crédito)" type="text" id="cardNumber" v-mask="mascaraTarjeta" v-model="pagosForm.cardNumber" placeholder="4509 9535 6623 3704" required/>
                            </v-col>
                            <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                                <v-text-field type="text" label="Mes de Expiración" id="cardExpirationMonth" v-model="pagosForm.cardExpirationMonth" placeholder="12"/>
                            </v-col>
                            <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                                <v-text-field type="text" label="Año de Expiración" id="cardExpirationYear" v-model="pagosForm.cardExpirationYear" placeholder="2015"/>
                            </v-col>
                            <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                                <v-text-field type="text" label="Código de Seguridad" id="securityCode" v-model="pagosForm.securityCode" placeholder="123"/>
                            </v-col>
                            <v-col cols="12" sm="8" md="8" lg="8" xl="8">
                                <v-text-field type="text" label="Titular de Tarjeta (tal y como figura en la tarjeta)" v-model="pagosForm.cardholderName" placeholder="TITULAR DE TARJETA"/>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                                <v-text-field id="email" name="email" label="Email donde recibirá el comprobante" type="email" v-model="pagosForm.email" placeholder="Ingrese su Email" required/>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" lg="4" xl="4">
                                <v-text-field id="matriculaNro" name="matriculaNro" label="Matrícula N°" type="text" v-model="pagosForm.matriculaNro" readonly placeholder="Ingrese su N° de matrícula" required/>
                            </v-col>
                            <!-- <input type="submit" value="Pay!" /> -->
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                                <v-select
                                    v-model="pagosForm.docType"
                                    :items="docs_types"
                                    label="Tipo de Documento"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                                <v-text-field label="N° Documento de Matriculado" v-model="pagosForm.docNumber" id="docNumber" readonly placeholder="12345678" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="px-3">
                                <v-textarea
                                v-model="pagosForm.observaciones"
                                label="Observaciones"
                                counter="200"
                                maxlength="200"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <hr class="mt-5">
                        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-5">
                            <p align="center">Los pagos a través de esta plataforma están siendo realizados por MercadoPago. Todas las promociones y/o intereses aplicados sobre los pagos son gestionados por MercadoPago.</p>
                            <v-row align="center" justify="center">
                                <v-img :src="require('@/assets/mercadopago_logo.png')" max-width="100" ></v-img>
                            </v-row>

                        </v-flex>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <input type="hidden" name="paymentMethodId" />
                    <v-btn color="green" large :loading="inProcess" @click="startPay">Pagar</v-btn>
                    <!-- <btn-mercado-pago></btn-mercado-pago> -->
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-container>  
    
</template>

<script>
import BtnMercadoPago from '../../components/MercadoPagoSmartCheckOut'
import moment from 'moment'
import { mask } from 'vue-the-mask'

export default {
    directives: {
      mask,
    },
    components:{ BtnMercadoPago },
    name:'pagos',
    data:() => ({
        showCosto:false,
        docsTypesLoading:true,
        docs_types:["DNI","CI","LC","LE"],
        form:{
            docType:"DNI"
        },
        tipoTarjeta:[
            {"nombre":"Visa","valor":"visa"},
            {"nombre":"Master","valor":"master"},
            {"nombre":"Amex","valor":"amex"},
            {"nombre":"Cabal","valor":"cabal"}
        ],
        mascaraTarjeta:'#### #### #### ####',
        tipoPago:[
            {"nombre":"Certificación de Firma","modulos":1,"costo":1},
            {"nombre":"Encomienda de Trámites","modulos":1,"costo":1},
            {"nombre":"Inscripción","modulos":5,"costo":1000},
            {"nombre":"Derecho Anual de Matriculación","modulos":5,"costo":1000}
            // {"nombre":"Pago de Prueba","modulos":1,"costo":1},
            
        ]
    }),
    mounted() {
        window.scrollTo(0, 0)
        Mercadopago.setPublishableKey("APP_USR-72d46014-8c4f-4233-9bbb-89aebe474478");
        this.docsTypes();

    },
    computed:{
        user(){
            console.log(store.state.login_api.user)
            return store.state.login_api.user
        },
        pagosForm(){
            return store.state.pagos.pagosForm
        },
        inProcess(){
            return store.state.pagos.inProcess
        }
    },
    watch:{
        'pagosForm.tipo_pago'(value){
            if(value && value !== ''){
                this.calculateCost();
            }
        },
        user(val){
            if(val.user.acf){
                this.$store.state.pagos.pagosForm.docNumber = val.user.acf.documento_nro
                this.$store.state.pagos.pagosForm.matriculaNro = val.user.acf.matricula
                this.$store.state.pagos.pagosForm.email = val.user.acf.email
                
                this.$forceUpdate()
            }
        },
        pagosForm(){},
        inProcess(){}
    },
    methods:{
        docsTypes(){
            Mercadopago.getIdentificationTypes();
        },
        startPay(){
            this.$store.state.pagos.pagosForm.pagoTitulo = this.$store.state.pagos.pagosForm.description
            this.$store.state.pagos.pagosForm.description = this.$store.state.pagos.pagosForm.tipo_pago.nombre +' | '+this.$store.state.login_api.user.user.firstName + this.$store.state.login_api.user.user.lastName + '-' + this.$store.state.pagos.pagosForm.matriculaNro + '-' + moment().year()
            this.$store.state.pagos.pagosForm.transaction_amount = this.$store.state.pagos.pagosForm.tipo_pago.costo

            this.$store.state.pagos.pagosForm.paymentMethodId = this.$store.state.pagos.pagosForm.paymentMethod.value
            this.$store.state.pagos.pagosForm.cardholderName = this.$store.state.pagos.pagosForm.cardholderName.toUpperCase() 
            let callback = this.$store.state.pagos.pagosForm
            console.log("Formulario de Pagos:",this.$store.state.pagos.pagosForm)
            Mercadopago.createToken(this.$store.state.pagos.pagosForm,sdkResponseHandler.bind(callback))
            
        },
        calculateCost(){
            let valor_modulo = 0;
            let costo = 0;
            let curDate = moment().format('YYYY-MM-DD');
            let user = this.$store.state.login_api.user.user;

            if(moment(curDate).isBetween('2019-01-01','2019-03-21')){
                valor_modulo = 1000;
            }else if(moment(curDate).isBetween('2019-04-01','2019-06-30')){
                valor_modulo = 1050;
            }else if(moment(curDate).isBetween('2019-07-01','2019-09-30')){
                valor_modulo = 1100;
            }else if(moment(curDate).isBetween('2019-10-01','2019-12-31')){
                valor_modulo = 1150;
            }
            
                costo = valor_modulo * this.$store.state.pagos.pagosForm.tipo_pago.modulos;            

            // Si se está abonando una nueva inscripción
            if(this.$store.state.pagos.pagosForm.tipo_pago.nombre === "Inscripción"){
                // el costo se duplica porque abona Inscripción + Matricula 
                costo = costo * 2;
                // Si el matriculado tiene menos de un año desde su promoción, se le cobra el 50% de matricula
                let fechaPromocion = moment(user.acf.promocion+'-01-01');
                if(moment(curDate).diff(fechaPromocion,'months') < 12){
                    costo = costo * 0.5;
                }else{
                    if(moment(curDate).isBetween('2019-07-01','2019-09-30')){// Tercer Trimeste
                    costo = costo - ((costo / 2) * 0.5);
                    }else if(moment(curDate).isBetween('2019-10-01','2019-12-31')){// Cuarto Trimeste
                        costo = costo - ((costo / 2) * 0.75);
                    }
                }
            }
            
            this.$store.state.pagos.pagosForm.tipo_pago.costo_modulo = valor_modulo;
             if(this.$store.state.pagos.pagosForm.tipo_pago.nombre === "Pago de Prueba"){
                 this.$store.state.pagos.pagosForm.tipo_pago.costo = 1;
             }else{
                 this.$store.state.pagos.pagosForm.tipo_pago.costo = costo;
             }
            this.showCosto = true;
        }
    }
}

function sdkResponseHandler(status, response) {
    console.log("sdkResponseHandler",response);
    
    if (status != 200 && status != 201) {
        swal({
            title: "Atención!",
            text: "Por favor, verifique todos los campos nuevamente.",
            icon: "warning",
            button: "Aceptar",
        });  
    }else{
        store.dispatch('PAGOS_create',response.id);
    }
};

</script>