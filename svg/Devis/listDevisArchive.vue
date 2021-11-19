<template>
<div class="s">
    <div class="">
        <b-row>
            <b-col md="6" class="my-1 offset-6">
                <b-form-group horizontal class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Recherche..." />
                        <b-input-group-append class="apend-btn ml-2">
                            <b-btn :disabled="!filter" @click="filter = ''" class="submit-btn pl-3 pr-3"> Annuler </b-btn>
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
                            <b-btn class="submit-btn">Recherche</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>

        <!--========= Debut tableau de devis Archives pour user "Admin" et "courtier"  ============ -->
        <b-table v-if="$store.state.user.role=='Admin'  || $store.state.user.role=='courtier'" bordered striped small show-empty :current-page="currentPage" :per-page="perPage" :items="listdevis" :fields="fields" class="mt-1" :filter="filter" empty-filtered-text="Information introuvable ">

            <template slot="client" slot-scope="DevisOwner">
                {{DevisOwner.item.userid.prenom }} - {{DevisOwner.item.userid.nom }}
            </template>
            <template #cell(dateSouscription)="date">
                {{ DateFormater(date.item.dateSouscription) }}
            </template>
            <template #cell(dateEcheance)="dateEch">
                {{ DateFormater(dateEch.item.dateEcheance) }}
            </template>
            <template #cell(prime_ttc)="ttc">
                {{ ttc.item.prime_ttc.toLocaleString() }}
            </template>
            <template #cell(dateEffet)="dateEff">
                {{ DateFormater(dateEff.item.dateEffet) }}
            </template>
            <template #cell(createur)="Deviscreator">
                <span v-if="Deviscreator.item.createur">
                      {{Deviscreator.item.createur.prenom}} - {{Deviscreator.item.createur.nom}}
                </span>
            </template>

            <template #cell(action)="row">
                <button class="btni" @click.stop="detaildevis(row.item)"><i class="fa fa-eye"></i></button>
                <button class="btni" @click="DesarchivateDevis(row.item)" v-show="row.item.isAnnule==true">
                    <i class="fa fa-undo"></i>
                </button>
            </template>

        </b-table>
        <!--========= Fin tableau de devis Archives pour user "Admin" et "courtier"  ============ -->

        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0"></b-pagination>
            </b-col>
        </b-row>

        <b-modal id="modal-xl" size="xl" title="Details Devis" v-model="showdevis" v-if="showdevis==true">

             <div class="row m-1">
                    <div class="col-sm-6 border">
                       <ul class="noStyle">
                            <li> Date de création : {{DateFormater(detailsDevis.dateSouscription)}} </li>
                            <li> Numero devis : {{detailsDevis.numeroDevis}} </li>
                            <li> Date Effet : {{DateFormater(detailsDevis.dateEffet)}}</li>
                            <li> Date Echéance : {{DateFormater(detailsDevis.dateEcheance)}}</li>
                            <li> Prime nette : {{detailsDevis.prime_nette.toLocaleString()}} Fcfa</li>
                            <li> Prime ttc : {{detailsDevis.prime_ttc.toLocaleString()}} Fcfa</li>
                            <li> Taxe : {{detailsDevis.taxe.toLocaleString()}} Fcfa</li>
                            <li> Accessoires : {{detailsDevis.accessoires.toLocaleString()}} Fcfa</li>
                       </ul>
                    </div>
                    <div class="col-sm-6 border">
                        <ul class="noStyle nopadding">
                            <li> Date d'archivage : {{DateFormater(ArchivateDetails.archive_date)}} </li>
                            <li> Archivé par : {{ArchivateDetails.userid.prenom.toUpperCase()+'-'+ArchivateDetails.userid.nom.toUpperCase()}} </li>
                            <li> Date Effet : {{DateFormater(detailsDevis.dateEffet)}}</li>
                       </ul>
                       Raison de l'archivage : 
                       <b-form-textarea readonly v-model="ArchivateDetails.archive_reason" rows="3" size="20" max-rows="6"></b-form-textarea>
                    </div>
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

    <b-modal hide-footer title="VOUS CONFIRMEZ LA SUPPRESSION DE CE DEVIS ?" v-if="modalDelete==true" v-model="modalDelete">
        <p class="font-weight-bold headline h2 text-center">
            NUM : <span class="font-weight-bold headline h2 text-danger"> {{detailsDevis.numeroDevis}} </span>
        </p>

        <div class="row">
            <div class="col-sm text-center">
                <b-button variant="outline-danger" @click="DeletingDevis(detailsDevis._id)">
                    Oui
                </b-button>
                <b-button class="ml-2" @click="modalDelete=false" variant="outline-primary">Non</b-button>
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
            optionsdate: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
            },
            ArchivateDetails:null,
            username: null,
            data: {},
            du: null,
            au: null,
            ldevis: [],
            listdevis: [],
            modalgeneration: false,
            detailsDevis: [],
            showdevis: false,
            deleteConfirmation: false,
            modalDelete: false,
            filter: null,
            totalRows: null,
            currentPage: 1,
            perPage: 10,
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
                    key: 'partenaireid.societe',
                    label: 'Assureur'
                },
                {
                    key: 'courtier.societe',
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
                    key: 'createur',
                    label: 'Createur'
                },
                {
                    key: 'action',
                    label: 'Action'
                },

            ]
        };
    },
    methods: {
        detaildevis(item) {
            this.getDevisArchivateDetails(item._id)
            this.detailsDevis = item
            this.showdevis = true
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

        getDevis() {

            if (this.$store.state.user.role == 'agent général') {
                Api().get('/devis/assureur/archive/' + this.$store.state.user.societe._id)
                    .then(resultat => {
                        this.listdevis = resultat.data.devis
                        this.totalRows = resultat.data.devis.length
                    });

            } else if (this.$store.state.user.role == 'courtier') {
                Api().get('/devis/courtier/archive/' + this.$store.state.user.societe._id)
                    .then(resultat => {
                        this.listdevis = resultat.data.devis
                        this.totalRows = resultat.data.devis.length
                    });
            } else if (this.$store.state.user.role == 'assureur') {
                Api().get('/devis/assureur/archive/' + this.$store.state.user.societe._id)
                    .then(resultat => {
                        this.listdevis = resultat.data.devis
                    });
            } else if (this.$store.state.user.role == 'Admin') {
                Api().get('/devis/archives/')
                    .then(resultat => {
                        this.listdevis = resultat.data.devis
                        this.totalRows = resultat.data.devis.length
                    });
            }

        },

        devisDeleteConfirmation(item) {
            this.modalDelete = true
            this.detailsDevis = item
        },

        DesarchivateDevis(devis) {
            let id = devis._id
            Api().post('devis/desarchivate/' + id)
                .then(resp => {
                    this.getDevis()
                })
        },

        getDevisArchivateDetails(id)
        {
            //ArchivateDetails
             Api().get('devis/archivate/detail/'+id)
                .then(resultat => {
                    this.ArchivateDetails = resultat.data.detail
                })
                .catch(err => {})

        },

        DeletingDevis(id) {
            Api().delete('devis/delete/' + id)
                .then(resultat => {
                    if (resultat.data.rep.n == 1) {
                        this.modalDelete = false
                        this.getDevis()
                    }
                })
                .catch(err => {})
        },

        DateFormater: function (TheDate) {
            if (TheDate) {
                return dayjs(TheDate).format('DD-MM-YYYY')
            }
        },

    },
    created() {

    },

    mounted() {

        if (store.state.isUserLoggedIn && store.state.user.role !== 'User') {
            this.getDevis()
        } else {
            this.$router.go(this.$router.push('/login'))
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
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
.noStyle li{
    list-style: none;
    border-bottom: 1px solid black;
    margin-left: -22px;
}
.nopadding li{
    margin-left: -22px;
}
</style>
