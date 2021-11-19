<template>
<div class="s">
    <div class="">
        <b-row>
            <b-col md="6" class="my-1 offset-6">
                <b-form-group horizontal class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Recherche..." />
                        <b-input-group-append class="apend-btn ml-2">
                            <b-btn :disabled="!filter" @click="filter = ''" class="submit-btn pl-3 pr-3"> Annuler</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="11" class="my-1  offset-1">
                <b-form-group horizontal label="Recherche par periode de création" class="mb-0">
                    <b-input-group>
                        <date-picker v-model="du" :config="optionsdate" placeholder="JJ/MM/AAAA" required></date-picker>
                        <date-picker class="ml-2" v-model="au" :config="optionsdate" placeholder="JJ/MM/AAAA" required></date-picker>
                        <b-input-group-append class="apend-btn ml-2">
                            <b-btn class="submit-btn" @click="FiltreDate">Recherche</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>

        <b-btn variant="outline-warning" @click="exportToExcel()" class="rounded mb-2 mt-4">
            Export Excel
        </b-btn>

        <!--Debut Tableau de devis pour les User de type "Admin" "courtier" -->
        <b-table  
           v-if="$store.state.user.role=='Admin' ||  $store.state.user.role=='courtier'" 
           bordered 
           striped 
           small 
           show-empty 
           :current-page="currentPage" 
           :items="listdevis" 
           :fields="fields"
           class="mt-1" 
           :filter="filter" 
           empty-filtered-text="Information introuvable " 
           :per-page="perPage">
            
            <template #cell(partenaireid)="partner">
                <span v-if="partner.item.partenaireid.societe.length <=10 ">
                    {{partner.item.partenaireid.societe}}
                </span>
                <span v-else>
                    {{partner.item.partenaireid.societe.substring(0,10) + '...'}}
                </span>
            </template>

            <template #cell(client)="DevisOwner">
                {{DevisOwner.item.userid.prenom }}-{{DevisOwner.item.userid.nom }}
            </template>

            <template #cell(dateSouscription)="date">
                {{ DateFormater(date.item.dateSouscription) }}
            </template>

            <template #cell(dateEcheance)="dateEch">
                {{ DateFormater(dateEch.item.dateEcheance) }}
            </template>

            <template #cell(dateEffet)="dateEff">
                {{ DateFormater(dateEff.item.dateEffet) }}
            </template>

            <template #cell(creator)="Deviscreator">
                <span  v-if="CheckIfTypeDefined(Deviscreator.item.createur)!='undefined' && Deviscreator.item.createur!=null"> 
                    {{Deviscreator.item.createur.prenom }} -  {{Deviscreator.item.createur.nom }}
                </span>
            </template>

            <template #cell(action)="row">
                <button class="btni" @click.stop="detaildevis(row.item)" v-b-tooltip.hover title="Voir details devis"><i class="fa fa-eye"></i></button>
                <button class="btni" @click.stop="Edit_devis(row.item)" v-b-tooltip.hover title="Modifer ce devis"><i class="fa fa-edit"></i></button>
                <button class="btni" @click="devisDeleteConfirmation(row.item)" v-show="row.item.isAnnule==false" v-b-tooltip.hover title="Archiver devis">
                    <i class="fa fa-file-archive-o"></i>
                </button>
                <button v-if="$store.state.user.role=='Admin'" style="font-size: 16px;padding:2px;color:red" @click.stop="devisDeleteConfirmation(row.item)" v-b-tooltip.hover title="Supprimer devis">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btni" @click="Downloa_devis(row.item)"><i class="fa fa-download" v-b-tooltip.hover title="Télécharger devis"></i></button>
            </template>
        </b-table>
        
        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0"></b-pagination>
            </b-col>
        </b-row>
        <!-- Fin Tableau de devis pour les User de type "Admin" "courtier" -->

        <b-modal id="modal-xl" size="xl" title="Details Devis" v-model="showdevis" v-if="showdevis==true">
            
            <b-btn class="mt-2" variant="outline-danger" @click="showdevis=false;specialUpdatedevis=true">
                Modification spéciale
            </b-btn>

            <b-btn class="mt-2 ml-1" variant="outline-danger" @click="JsonFormaterView()">
               Détails en JSON
            </b-btn>
            
            <b-card-group class="mt-1">
                <b-card border-variant="dark" header="DÉTAILS DEVIS ">
                    <b-card-text>Date de création : {{DateFormater(detailsDevis.dateSouscription)}}</b-card-text>
                    <b-card-text>Numero devis : {{detailsDevis.numeroDevis}}</b-card-text>
                    <b-card-text>Date Effet : {{DateFormater(detailsDevis.dateEffet)}}</b-card-text>
                    <b-card-text>Date Echéance : {{DateFormater(detailsDevis.dateEcheance)}}</b-card-text>
                    <b-card-text v-if="detailsDevis.partner_creator!==null">
                        Partenaire : {{detailsDevis.partner_creator}}
                    </b-card-text>
                </b-card>

                <b-card border-variant="dark" header="TARIFS">
                    <b-card-text>Prime nette : {{detailsDevis.prime_nette.toLocaleString()}} Fcfa</b-card-text>
                    <b-card-text>Prime ttc : {{detailsDevis.prime_ttc.toLocaleString()}} Fcfa</b-card-text>
                    <b-card-text>Taxe : {{detailsDevis.taxe.toLocaleString()}} Fcfa</b-card-text>
                    <b-card-text>Accessoires : {{detailsDevis.accessoires.toLocaleString()}} Fcfa</b-card-text>

                </b-card>
            </b-card-group>

            <b-card-group class="mt-1" v-if="JsonView" style="width:100%;">
                <pre style="background:black;color:white;width:100%;">
                    {{detailsDevis}}
                </pre>
            </b-card-group>
           
        </b-modal>
      

        <b-modal id="modal-xl" hide-footer size="xl" title="Modification spéciale du devis" v-model="specialUpdatedevis" v-if="specialUpdatedevis==true">

            <div class="row m-2">

                 <div class="col-sm-11 mt-1 border ml-3">
                   <span for="" style="color:red">Unité de calcul de la duree *</span>
                   <div class="row">
                        <div class="col-sm-2 ml-3">
                          <b-form-radio class="p-1" v-model="CalculDuree" name="month" value="month">Mois (Auto/MRH)</b-form-radio>
                        </div>
                        <div class="col-sm-2 ml-4">
                            <b-form-radio class="p-1" v-model="CalculDuree" name="téléphone" value="day">Jour(Voyage)</b-form-radio>
                        </div>
                   </div>
                </div>

                <div class="col-sm-3 mt-2">
                    <span for="">Durée *</span>
                    <b-form-input class="dureeInput" type="number" v-model="duree"></b-form-input>
                </div>

                <div class="col-sm-3 mt-2">
                    <span for="">Date effet *</span>
                    <date-picker v-model="dateEffet" :config="optionsdateModif" @dp-change="dateDiff" placeholder="JJ/MM/AAAA"></date-picker>
                </div>

                <div class="col-sm-3 mt-2">
                    <span for="">Date échéance *</span>
                    <date-picker v-model="dateEcheance" :config="optionsdateModif" placeholder="JJ/MM/AAAA"></date-picker>
                </div>

                <div class="col-sm-3 mt-2">
                    <span for="">Numero du devis *</span>
                    <b-form-input id="" type="text" v-model="numeroDevis"></b-form-input>
                </div>


            </div>

            <div class="row m-2 mt-3">
                <b-btn variant="outline-info" class="ml-3" @click="SpecialUpdate()">
                    Modifier
                </b-btn>
            </div>

        </b-modal>
    </div>

    <b-modal v-model="modalgeneration" hide-footer title="GENERATION DU FICHIER">
        <div class="d-block text-center">
            <h3>
                <b-spinner variant="warning" label="Loading..."></b-spinner>
            </h3>
        </div>
    </b-modal>

    <b-modal hide-footer title="VOUS CONFIRMEZ L'ARCHIVAGE DE CE DEVIS ?" v-if="modalDelete==true" v-model="modalDelete">
         <p class="font-weight-bold headline">
            NUM : <span class="font-weight-bold headline h2 text-danger"> {{detailsDevis.numeroDevis}} </span>
        </p>

        <div class="row">
           <div class="col">
                <label for="reason">Raison de l'archivage</label>
                 <b-form-textarea id="reason" v-model="Delete_reason" placeholder="pourquoi supprimer ?" rows="3" max-rows="6">
                 </b-form-textarea>
           </div>
        </div>
       
        <div class="row mt-1">
            <div class="col-sm text-center">
                <b-button variant="outline-danger" @click="DeletingDevis(detailsDevis)">
                    Archive
                </b-button>
                <b-button class="ml-2" @click="modalDelete=false" variant="outline-primary">Annuler</b-button>
            </div>
        </div>

    </b-modal>

</div>
</template>

<script>
import store from '../../store/index'
import Api from '../../services/Api'
import dayjs from 'dayjs'

export default {
    data() {
        return {
            /*=============*/
            items: [],
            currentPage: 1,
            perPage: 100,
            totalItems: null,
            isBusy: false,
            /*=============*/
            optionsdate: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
            },
             optionsdateModif: {
                useCurrent: false,
                 format: 'YYYY/MM/DD',
            },
            dateEffet: null,
            dateEcheance: null,
            duree: null,
            CalculDuree:null,
            username: null,
            data: {},
            JsonView:false,
            ldevis: [],
            du: null,
            au: null,
            listdevis: null,//[],
            // perpage: 5,
            modalgeneration: false,
            detailsDevis: [],
            showdevis: false,
            specialUpdatedevis: false,
            deleteConfirmation: false,
            modalDelete: false,
            filter: null,
            totalRows: null,
            pageOptions: [5, 10, 15],
            fields: [{
                    key: 'dateSouscription',
                    label: 'Date creation'
                },
                {
                    key: 'brancheid.branche',
                    label: 'Branche'
                },
                {
                    key: 'numeroDevis',
                    label: 'Num devis'
                },
                {
                    key: 'partenaireid',
                    label: 'Assureur'
                },
                {
                    key: 'courtier.parternaireid ',
                    label: 'Courtier'
                },
                {
                    key: 'dateEffet',
                    label: 'Effet'
                },
                {
                    key: 'dateEcheance',
                    label: 'Echeance'
                },
                {
                    key: 'prime_ttc',
                    label: ' Prime TTC'
                },
                {
                    key: 'client',
                    label: 'Client'
                },
                {
                    key: 'creator',
                    label: 'Createur'
                },
                {
                    key: 'action',
                    label: 'Action'
                },

            ],
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
        };
    },
    created() {
        this.getDevis();
    },
    
    watch: 
    {
        isBusy(newVal, oldVal) {
        if (newVal !== oldVal) {
            const tableScrollBody = this.$refs["my-table"].$el;
            if (newVal === true) {
            tableScrollBody.classList.add("overflow-hidden");
            } else {
            tableScrollBody.classList.remove("overflow-hidden");
            }
        }
        },
    },

  
    methods: {

        detaildevis(item) {
            this.detailsDevis = item
            this.showdevis = true
        },

        JsonFormaterView()
        {
            if(this.JsonView==false)
            {
                this.JsonView = true
            }else{
                this.JsonView = false
            }
        },

        CheckIfTypeDefined(item){
          return typeof item
        },
        
        exportToExcel(){
              Api().get('/export/devis')
                .then(resultat => {
                    this.modalgeneration = true
                    let url = resultat.data.lien
                    setTimeout(() => (
                        this.modalgeneration = false,
                        window.open(url)), 7000
                    );
                });
        },

        // Fonction de download du devis en fichier pdf
        Downloa_devis: function (devis) {
            Api().get('devis/download/' + devis._id)
                .then(response => {
                    this.modalgeneration = true
                    let url = response.data.lien
                    setTimeout(() => (
                        this.modalgeneration = false,
                        window.open(url)), 7000);
                })
        },

        Edit_devis: function (devis) {

            switch (devis.brancheid.branche) {
                case 'Automobile':
                    Api().get('devis/' + devis._id)
                        .then(response => {
                            this.$store.dispatch('setDevisReopen', response.data.devis)
                            this.$router.go(this.$router.push({
                                name: 'update_devis_auto'
                            }))
                        })

                    break;

                case 'Habitation':
                    Api().get('devis/' + devis._id)
                        .then(response => {
                            this.$store.dispatch('setDevisReopen', response.data.devis)
                            this.$router.go(this.$router.push({
                                name: 'update_devis_habitation'
                            }))
                        })

                    break;

                case 'Voyage':
                    Api().get('devis/' + devis._id)
                        .then(response => {
                            this.$store.dispatch('setDevisReopen', response.data.devis)
                            this.$router.go(this.$router.push({
                                name: 'update_devis_voyage'
                            }))
                        })

                    break;

            }
        },

        DateFormater: function (TheDate) {
            if (TheDate) {
                return dayjs(TheDate).format('DD-MM-YYYY')
            }
        },

        dateDiff: function () {
            if (this.dateEffet && this.duree && this.CalculDuree) 
            {
                let inter = dayjs(this.dateEffet).add(this.duree, this.CalculDuree).format('YYYY-MM-DD');
                this.dateEcheance = dayjs(inter).add(-1, 'day').format('YYYY-MM-DD')
            }
        },

        /*================*/
        SpecialUpdate() {
            if (this.duree && this.dateEffet && this.dateEcheance && this.numeroDevis) {

                let data = {
                    devisid: this.detailsDevis._id,
                    duree: this.duree,
                    dateEffet: dayjs(this.dateEffet).format('YYYY-MM-DD'),
                    dateEcheance: dayjs(this.dateEcheance).format('YYYY-MM-DD'),
                    numeroDevis: this.numeroDevis
                }

                Api().post('/devis/update/special', data)
                    .then((result) => {
                        if (result.data.msg = "Devis modifié !") {
                            this.specialUpdatedevis = false
                        }
                    }).catch((err) => {
                        console.log('Nooooo !')
                    });

            } else {
                this.$toasted.show('Tous les champs sont obligatoires ! ', this.ToastTabError)
            }

        },

        getDevis() {

            if (this.$store.state.user.role == 'agent général') {
                Api().get('/devis/assureur/' + this.$store.state.user.societe._id)
                    .then(resultat => {
                        this.listdevis = resultat.data.devis
                        this.totalRows = this.listdevis.length
                        this.totalItems = resultat.data.devis.length;
                    });
            } else if (this.$store.state.user.role == 'courtier') {
                Api().get('/devis/courtier/' + this.$store.state.user.societe._id)
                    .then(resultat => {
                        this.listdevis = resultat.data.devis
                        this.totalRows = resultat.data.devis.length
                        this.totalItems = resultat.data.devis.length; 
                    });

            } else if (this.$store.state.user.role == 'assureur') {
                Api().get('/devis/assureur/' + this.$store.state.user.societe._id)
                    .then(resultat => {
                        this.listdevis = resultat.data.devis
                        this.totalRows = resultat.data.devis.length
                        this.totalItems = resultat.data.devis.length; 
                    });
            } else if (this.$store.state.user.role == 'Admin') {
                Api().get('/devis/')
                    .then(resultat => {
                        this.listdevis = resultat.data.devis
                        this.totalRows = resultat.data.devis.length
                        this.totalItems = resultat.data.devis.length;
                    });
            }

        },

        devisDeleteConfirmation(item) {
            this.modalDelete = true
            this.detailsDevis = item
        },

        ArchivateDevis(devis) {
            let id = devis._id
            Api().post('devis/archivate/' + id)
                .then(resp => {
                    this.getDevis()
                })
        },

        DeletingDevis(devis) 
        {
            if(this.Delete_reason)
            {
                 const Adevis = {
                    userid: store.state.user._id,
                    brancheid: devis.brancheid._id,
                    devisid: devis._id,
                    archive_reason: this.Delete_reason
                }
                Api().post('devis/delete', Adevis)
                    .then(resultat => {
                        if (resultat.data.rep == 1) 
                        {
                            this.Delete_reason = ""
                            this.modalDelete = false
                            this.getDevis()
                        }
                    })

            }else{
                 this.$toasted.show('Tous les champs sont obligatoires ! ', this.ToastTabError)
            }
           
        },

        FiltreDate() {
            if (this.du && this.au) {
                switch (store.state.user.role) {
                    case 'Admin':
                        console.log(dayjs(this.du).format('YYYY-MM-DD')+' === '+dayjs(this.au).format('YYYY-MM-DD'))
                        Api().post('devis/filtre/periode', {
                                du: dayjs(this.du).format('YYYY-MM-DD'),
                                au: dayjs(this.au).format('YYYY-MM-DD')
                            })
                            .then(resultat => {
                                this.listdevis = resultat.data.devis
                            });
                        break;

                    case 'courtier':
                        Api().post('devis/filtre/courtier/periode/' + store.state.user.employeur, {
                                du: this.du,
                                au: this.au
                            })
                            .then(resultat => {
                                this.listdevis = resultat.data.devis
                            });
                        break;

                    case 'assureur':
                        Api().post('devis/filtre/assureur/periode/' + store.state.user.societe, {
                                du: this.du,
                                au: this.au
                            })
                            .then(resultat => {
                                this.listdevis = resultat.data.devis
                            });
                        break;
                    case 'agent général':
                        Api().post('devis/filtre/assureur/periode/' + store.state.user.assureur, {
                                du: this.du,
                                au: this.au
                            })
                            .then(resultat => {
                                this.listdevis = resultat.data.devis
                            });
                        break;

                    default:
                        break;
                }
            }

        }

    },
    
    beforeDestroy() {
    },

    mounted() {
        if (store.state.isUserLoggedIn && store.state.user.role !== 'User') 
        {
            this.getDevis()
        } else {
            this.$router.go(this.$router.push('/login'))
        }

    },

    computed: {
        sortOptions() {
            return this.listdevis
                .filter(f => f.sortable)
                .map(f => {
                    return {
                        text: f.label,
                        value: f.key
                    }
                })
        }
    },

};
</script>

<style scoped>
.devisview {
    display: none;
}
.hightest{
    overflow:auto;
    height:600px;
    max-height:400px;
}
.devisarchive {
    display: none;
}

.apend-btn {
    border-radius: 2%;
    background-color: #ffa409;
}

.btni {
    color: #ffa409;
    /* White text */
    font-size: 16px;
    /* Set a font size */
    cursor: pointer;
    /* Mouse pointer on hover */
    border-width: 0 0px 0px 0px;
    border-radius: 2px;
    background-color: transparent;
    padding: 2px;

}

.btni:hover~.devisview {
    display: block;
}

.btna:hover~.devisarchive {
    display: block;

}

.dureeInput {
    width: 90%;
}
</style>
