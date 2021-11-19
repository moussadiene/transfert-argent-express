<template>
    <div class="container border">
        <div class="row ">     
            <div class="col-sm-4">
                <label for=""> Numéro du devis</label>
                <b-form-input type="text" v-model="numero_devis" style="height:40px">
                </b-form-input>
            </div>
            <div class="col-sm-4">
                <label for="">   Adresse email du destinataire</label>
                <b-form-input type="text" v-model="email_destinataire" style="height:40px">
                </b-form-input>
            </div>
        </div>
        <div class="row mt-3" style="margin-left:1px;height:40px">
            <b-button variant="warning" @click="forwardDevis()">
                Transférer le devis
            </b-button>
        </div>
    </div>
</template>

<script>

import dayjs from 'dayjs'
import store from '../../store/index'
import Api from '../../services/Api'

export default {
    data() {
        return {
            numero_devis:null,
            email_destinataire:null,
            ToastTabSucess: {
                theme: 'toasted-primary',
                position: 'top-center',
                duration: 10000,
                fitToScreen: true,
                type: 'success',
                className: 'custom-success-class'
            }, // Customized options for success toast
            ToastTabError: {
                theme: 'toasted-primary',
                position: 'top-center',
                duration: 10000,
                fitToScreen: true,
                type: 'error'
            }, // Customized options for error toast
        }
    },
    methods: 
    {
        forwardDevis()
        {
            if(this.numero_devis && this.email_destinataire)
            {
                Api().post('/devis/forward', {devis:this.numero_devis, destinataire: this.email_destinataire})
                .then((result) => {
                    if (result.data.devis.nModified==1)
                    {
                        this.$toasted.show("Opération réussie !", this.ToastTabSucess)
                        this.numero_devis       = null
                        this.email_destinataire = null
                    } else {
                        this.$toasted.show("Echec de l'opération !", this.ToastTabError)
                    }
                }).catch((err) => {
                  console.log(err)  
                })
            }else{
                this.$toasted.show("Tous les champs sont obligatoires !", this.ToastTabError)
            }
        }
    },
    
    created() 
    {
        if (!store.state.isUserLoggedIn || store.state.user.role == 'User') 
        {
           this.$router.go(this.$router.push('/login'))
        } 
    },
    
    mounted() 
    {
        if (!store.state.isUserLoggedIn || store.state.user.role == 'User') 
        {
           this.$router.go(this.$router.push('/login'))
        } 
    },
}
</script>