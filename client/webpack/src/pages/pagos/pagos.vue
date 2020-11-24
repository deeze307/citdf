
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
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                <v-select
                                    v-model="pagosForm.tipo_pago"
                                    :items="_tipoPago"
                                    label="¿Qué desea Pagar?"
                                    item-text="nombre"
                                    return-object
                                    required
                                ></v-select>
                            </v-col>
                            <!-- <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                                <v-select
                                    v-model="pagosForm.paymentMethod"
                                    :items="tipoTarjeta"
                                    label="Tipo de Tarjeta"
                                    item-text="nombre"
                                    return-object
                                    required
                                ></v-select>
                            </v-col> -->
                            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                                <v-text-field label="N° Tarjeta (débito o crédito)" type="text" id="cardNumber" v-mask="mascaraTarjeta" v-model="pagosForm.cardNumber" placeholder="4509 9535 6623 3704" required/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6" v-if="showCosto">
                                <v-subheader class="font-weight-medium">Costo por Módulo:  ${{pagosForm.tipo_pago.costo_modulo}}</v-subheader>
                                <v-subheader class="font-weight-medium">Cantidad de Módulos:  {{pagosForm.tipo_pago.modulos}}</v-subheader>
                                <v-subheader class="font-weight-medium" v-if="pagosForm.tipo_pago.nombre === 'Inscripción'">Monto Total (Inscripción + Matrícula): <span class="ml-2 title font-weight-black"> ${{pagosForm.tipo_pago.costo}}</span></v-subheader>
                                <v-subheader class="font-weight-medium" v-else>Monto Total:  <span class="ml-2 title font-weight-black"> ${{pagosForm.tipo_pago.costo}}</span></v-subheader>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6" v-if="showCosto">
                                <v-row>
                                    <!-- Metodo de Pago -->
                                    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                                        <v-img
                                        contain
                                        v-if="paymentMethodResponse.id"
                                        :src="paymentMethodResponse.thumbnail"
                                        height=17
                                        ></v-img>
                                    </v-col>
                                    <!-- Fin Metodo de Pago -->
                                    <!-- Banco Emisor de Tarjeta -->
                                    <v-col cols="12" sm="6" md="9" lg="9" xl="9">
                                        <v-img
                                        contain
                                        v-if="cuotas.issuer.thumbnail"
                                        :src="cuotas.issuer.thumbnail"
                                        height=17
                                        ></v-img>
                                    </v-col>
                                    <!-- Fin Banco Emisor de Tarjeta -->
                                </v-row>
                                <v-row>
                                    <v-select
                                    v-model="pagosForm.selectedInstallment"
                                    :items="cuotas.payer_costs"
                                    label="Seleccione Cantidad de Cuotas"
                                    item-text="recommended_message"
                                    return-object
                                    required
                                ></v-select>
                                </v-row>
                                
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                                <v-text-field type="text" label="Mes y Año de Expiración" id="cardExpirationMonth" v-mask="mascaraMesAnio" v-model="pagosForm.mesAnio"  placeholder="12/21"/>
                            </v-col>
                            <!-- <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                                <v-text-field type="text" label="Año de Expiración" id="cardExpirationYear" v-model="pagosForm.cardExpirationYear" placeholder="2015"/>
                            </v-col> -->
                            <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                                <v-text-field type="text" label="Código de Seguridad" hint="Se encuentra al reverso de la tarjeta para Visa y MasterCard y al Frente en Amex" id="securityCode" v-model="pagosForm.securityCode" placeholder="123"/>
                            </v-col>
                            <v-col cols="12" sm="8" md="6" lg="6" xl="6">
                                <v-text-field type="text" label="Titular de Tarjeta (tal y como figura en la tarjeta)" v-model="pagosForm.cardholderName" placeholder="TITULAR DE TARJETA"/>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                                <v-text-field id="email" name="email" label="E-mail donde recibirá el comprobante" persistent-hint hint="El E-mail deberá estar registrado en MercadoPago" type="email" v-model="pagosForm.email" placeholder="Ingrese su Email" required/>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" lg="3" xl="3">
                                <v-text-field id="matriculaNro" name="matriculaNro" label="Matrícula N°" type="text" v-model="pagosForm.matriculaNro" placeholder="Ingrese su N° de matrícula" required/>
                            </v-col>
                            <!-- <input type="submit" value="Pay!" /> -->
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                                <v-row>
                                    <v-col cols="12" sm="12" md="8" lg="8" xl="8">
                                        <v-select
                                            v-model="pagosForm.docType"
                                            :items="docs_types"
                                            label="Tipo de Documento"
                                            required
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="12" md="11" lg="11" xl="11">
                                        <v-text-field label="N° Documento de Matriculado" v-model="pagosForm.docNumber" id="docNumber" placeholder="12345678" />
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="6" md="8" lg="8" xl="8" class="px-3">
                                <v-textarea
                                v-model="pagosForm.observaciones"
                                label="Observaciones"
                                counter="200"
                                maxlength="200"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
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
        showCardType:false,
        showCosto:false,
        docsTypesLoading:true,
        docs_types:["DNI","CI","LC","LE"],
        form:{
            docType:"DNI"
        },
        cardNumber:"",
        paymentMethodResponse:[],
        tipoTarjeta:[
            {"nombre":"Visa","valor":"visa"},
            {"nombre":"Master","valor":"master"},
            {"nombre":"Amex","valor":"amex"},
            {"nombre":"Cabal","valor":"cabal"}
        ],
        cuotas:{
            "issuer":""
        },
        mascaraTarjeta:'#### #### #### ####',
        mascaraMesAnio:'##/##',
        tipoPago:[
            // {"nombre":"Pago de Prueba","modulos":1,"costo":1},
            {"nombre":"Certificación de Firma","modulos":1,"costo":1200},
            {"nombre":"Encomienda de Trámites","modulos":1,"costo":1200},
            {"nombre":"Inscripción","modulos":5,"costo":1200},
            {"nombre":"Derecho Anual de Colegiación","modulos":5,"costo":6000}
            
        ],
        selectedTipoPago:{"nombre":""}
    }),
    mounted() {
        window.scrollTo(0, 0)
        Mercadopago.setPublishableKey("APP_USR-72d46014-8c4f-4233-9bbb-89aebe474478");
        this.docsTypes();
    },
    computed:{
        user(){
            // console.log(store.state.login_api.user)
            return store.state.login_api.user
        },
        pagosForm(){
            return store.state.pagos.pagosForm
        },
        pagoItem(){
            console.log('Pagos: pagoItem', store.state.pagos.pagoItem)
            return store.state.pagos.pagoItem
        },
        inProcess(){
            return store.state.pagos.inProcess
        },
        _tipoPago() {
            if (process.env.NODE_ENV === 'development'){
                this.tipoPago.push({"nombre":"Item de Prueba", "modulos":1, "costo":1})
            }
            return this.tipoPago
        }
    },
    watch:{
        'pagosForm.tipo_pago'(value){
            if(value.nombre !== this.selectedTipoPago.nombre){
                this.selectedTipoPago = value
                this.calculateCost();
            }
        },
        user(val){
            if(val.user.acf){
                // console.log("asignando")
                this.$store.state.pagos.pagosForm.docNumber = val.user.acf.documento_nro
                this.$store.state.pagos.pagosForm.matriculaNro = val.user.acf.matricula
                this.$store.state.pagos.pagosForm.email = val.user.acf.email
                this.$store.state.pagos.pagosForm.pagoTitulo = ''
                this.$store.state.pagos.pagosForm.observaciones = ''
                
                this.$forceUpdate()
            }
        },
        pagosForm(){
        },
        'pagosForm.cardNumber'(value){
            this.processCardNumber(value)
        },
        inProcess(){}
    },
    methods:{
        processCardNumber(number){
            let cardNumber = _.replace(number,' ','');
            if(cardNumber.length === 6){
                this.showCosto = true;
                Mercadopago.getPaymentMethod({"bin": cardNumber}, this.paymentMethodHandler);
                Mercadopago.getInstallments({"bin": cardNumber,"amount": this.$store.state.pagos.pagosForm.tipo_pago.costo}, this.installmentHandler);
            }

            if(cardNumber.length === 0){
                this.paymentMethodResponse = [];
                this.showCosto = false;
            }
        },
        docsTypes(){
            Mercadopago.getIdentificationTypes();
        },
        paymentMethodHandler(status,response){
            this.paymentMethodResponse = response[0];
            if(this.paymentMethodResponse.id){
                this.$store.state.pagos.pagosForm.paymentMethodId = this.paymentMethodResponse.id;
                this.$store.state.pagos.pagosForm.paymentTypeId = this.paymentMethodResponse.payment_type_id;
            }
        },
        startPay(){
            console.log('startPay Pago Item', this.pagoItem)
            this.$store.state.pagos.pagosForm.pagoTitulo = this.$store.state.pagos.pagosForm.tipo_pago.nombre
            this.$store.state.pagos.pagosForm.description = this.$store.state.pagos.pagosForm.tipo_pago.nombre +' | '+this.$store.state.login_api.user.user.firstName + this.$store.state.login_api.user.user.lastName + '-' + this.$store.state.pagos.pagosForm.matriculaNro + '-' + moment().year()
            this.$store.state.pagos.pagosForm.transaction_amount = this.$store.state.pagos.pagosForm.tipo_pago.costo
            this.$store.state.pagos.pagosForm.installments = this.$store.state.pagos.pagosForm.selectedInstallment.installments

            // this.$store.state.pagos.pagosForm.paymentMethodId = this.$store.state.pagos.pagosForm.paymentMethod.value
            this.$store.state.pagos.pagosForm.cardholderName = this.$store.state.pagos.pagosForm.cardholderName.toUpperCase() 
            let callback = this.$store.state.pagos.pagosForm
            this.separateMonthYear()
            // Redondear
            // this.$store.state.pagos.pagosForm.transaction_amount = this.$store.state.pagos.pagosForm.transaction_amount.toFixed(2)
            Mercadopago.createToken(this.$store.state.pagos.pagosForm,sdkResponseHandler.bind(callback))
            // console.log(this.$store.state.pagos.pagosForm);
            
        },
        separateMonthYear(){
            let splitted = _.split(this.$store.state.pagos.pagosForm.mesAnio,'/',2)
            this.$store.state.pagos.pagosForm.cardExpirationMonth = splitted[0]
            this.$store.state.pagos.pagosForm.cardExpirationYear = '20'+splitted[1]

        },
        calculateCost(){
            let valor_modulo = 0;
            let costo = 0;
            let curDate = moment().format('YYYY-MM-DD');
            let user = this.$store.state.login_api.user.user;

            // Por emergencia sanitaria debido a COVID-19 se pospone el vencimiento del primer trimestre
            // un mes más SOLO PARA DERECHO ANUAL DE COLEGIACIÓN 
            if(this.$store.state.pagos.pagosForm.tipo_pago.nombre === 'Derecho Anual de Colegiación'){
                if(moment(curDate).isBetween('2020-01-01','2020-04-30',null,'[]')){
                    valor_modulo = 1200;
                }else if(moment(curDate).isBetween('2020-05-01','2020-06-30',null,'[]')){
                    valor_modulo = 1300;
                }
            }else{
                if(moment(curDate).isBetween('2020-01-01','2020-03-31',null,'[]')){
                    valor_modulo = 1200;
                }else if(moment(curDate).isBetween('2020-04-01','2020-06-30',null,'[]')){
                    valor_modulo = 1300;
                }
            }

            //Fuera del aplazo, se sigue con la fechas normales
            if(moment(curDate).isBetween('2020-07-01','2020-09-30',null,'[]')){
                valor_modulo = 1400;
            }else if(moment(curDate).isBetween('2020-10-01','2020-12-31',null,'[]')){
                valor_modulo = 1500;
            }
                // console.log("valor modulo: "+valor_modulo)
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
                    if(moment(curDate).isBetween('2020-07-01','2020-09-30')){// Tercer Trimeste
                    costo = costo - ((costo / 2) * 0.5);
                    }else if(moment(curDate).isBetween('2020-10-01','2020-12-31')){// Cuarto Trimeste
                        costo = costo - ((costo / 2) * 0.75);
                    }
                }
            }
            
            this.$store.state.pagos.pagosForm.tipo_pago.costo_modulo = valor_modulo;
             if(this.$store.state.pagos.pagosForm.tipo_pago.nombre === "Pago de Prueba" || this.$store.state.pagos.pagosForm.tipo_pago.nombre === "Item de Prueba"){
                 this.$store.state.pagos.pagosForm.tipo_pago.costo = 1;
             }else{
                 this.$store.state.pagos.pagosForm.tipo_pago.costo = costo;
             }

             if(this.$store.state.pagos.pagosForm.cardNumber && this.$store.state.pagos.pagosForm.cardNumber.length >= 6){
                 this.$store.state.pagos.pagosForm.installments = ""
                 this.processCardNumber(this.$store.state.pagos.pagosForm.cardNumber)
                //  this.showCosto = false
             }
            //  console.log("Costo: "+this.$store.state.pagos.pagosForm.tipo_pago.costo)
            // this.showCosto = true;
        },
        installmentHandler(status,response){
            if(response[0].payer_costs){
                this.cuotas = response[0]
            }
        }
    }
}

function sdkResponseHandler(status, response) {
    
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
}

</script>