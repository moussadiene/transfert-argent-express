<template>
<nav :class="{sidebar: true}" v-if="isDesktop()">
    <header class="logo">
        <router-link class="pb-3 border" to="/home"> <img :src="require('../assets/img/assuraflogo.png').default" class="logo"> </router-link>
        <p v-if="$store.state.user.societe">
            <img :src="$store.state.user.societe.logo" height="70" class="logo border" v-if="$store.state.user.societe.logo">
        </p>
    </header>
    <ul class="nav">

        <!--Assureurs-->
        <li v-show="$store.state.user.role=='Admin'">
            <div v-b-toggle.collapseA class="btn btn-default nav-link item-header">
                <i class="icon-list" style="color: #fff;"></i> Assureurs
            </div>
            <b-collapse id="collapseA" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/partenaires/createpartenaire"><i class="fa fa-user-plus" /> Ajouter </router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/assureurs/listassureur"><i class="fa fa-list" /> Liste </router-link>
                        </b-nav-item>
                    </div>
                </b-nav>
            </b-collapse>
        </li>

        <!--courtiers-->
        <li v-show="$store.state.user.role=='Admin' ">
            <div v-b-toggle.collapseb class="btn btn-default nav-link  item-header">
                <i class="icon-list" style="color: #fff;"></i> Courtiers
            </div>
            <b-collapse id="collapseb" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/courtier/createcourtier"><i class="fa fa-user-plus" />Créer </router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/courtier/courtierlist"><i class="fa fa-list" />Liste</router-link>
                        </b-nav-item>
                    </div>
                </b-nav>
            </b-collapse>
        </li>

        <!--partenaire-->
        <li v-show="$store.state.user.role=='Admin'">
            <div v-b-toggle.collapseG class="btn btn-default nav-link  item-header">
                <i class="icon-badge" style="color: #fff;"></i> Partenaires
            </div>
            <b-collapse id="collapseG" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/partenaires/createpartenaire"><i class="fa fa-user-plus" />Créer</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/partenaires/listpartenaire"><i class="fa fa-list" />Liste</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/partner/stamp/add"><i class="fa fa-list" />Ajout cachet</router-link>
                        </b-nav-item>

                    </div>
                </b-nav>
            </b-collapse>
        </li>

        <!-- Cients -->
        <li>
            <div v-b-toggle.collapseH class="btn btn-default nav-link  item-header" v-show="$store.state.user.role=='Admin' || $store.state.user.role=='courtier'">
                <i class="icon-user" style="color: #fff;"></i> Clients
            </div>
            <b-collapse id="collapseH" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/clients/client"><i class="fa fa-list" />Clients</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/clients/prospects"><i class="fa fa-list" />Prospects</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/clients/clientlist"><i class="fa fa-list" />Tous</router-link>
                        </b-nav-item>

                    </div>
                </b-nav>
            </b-collapse>
        </li>
        
        <!-- Contrats -->
        <li>

            <div v-b-toggle.collapseD class="btn btn-default nav-link  item-header">
                <i class="icon-list" style="color: #fff;"></i> Liste des Contrats
            </div>

            <b-collapse id="collapseD" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/contrat/renouvellement"><i class="fa fa-list" />Renouvellements</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/contrat/encours"><i class="fa fa-list" />En cours</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/contrat/echus"><i class="fa fa-list" />Echus</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/contrat/canceled"><i class="fa fa-list" /> Archivés </router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/contrat/listcontrat"><i class="fa fa-list" />Tous</router-link>
                        </b-nav-item>

                    </div>
                </b-nav>
            </b-collapse>
        </li>

        <!-- Contrat Express -->
        <li  v-show="$store.state.user.role=='Admin'">

            <div v-b-toggle.collapseCE class="btn btn-default nav-link  item-header">
                <i class="icon-list" style="color: #fff;"></i> Contrats Express
            </div>

            <b-collapse id="collapseCE" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/contrat/paiement/cash/"><i class="fa fa-list" />Paiement Cash</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/contrat/express/search">
                                <i class="fa fa-list" />Traces Paiement
                            </router-link>
                        </b-nav-item>

                        <b-nav-item class="li-item">
                            <router-link to="/contrat/express/listing"><i class="fa fa-list" />Liste</router-link>
                        </b-nav-item>
                    </div>
                </b-nav>
            </b-collapse>
        </li>

        <!-- Lien de paiement -->
        <li>

            <div v-b-toggle.collapsePL class="btn btn-default nav-link  item-header">
                <i class="icon-link" style="color: #fff;"></i> Lien de Paiement
            </div>

            <b-collapse id="collapsePL" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/payment/listing"><i class="fa fa-list" />Liste</router-link>
                        </b-nav-item>
                    </div>
                </b-nav>
            </b-collapse>
        </li>

        <!--Devis-->
        <li>

            <div v-b-toggle.collapseLD v-show="$store.state.user.role=='Admin' || $store.state.user.role=='courtier'" class="btn btn-default nav-link item-header">
                <i class="icon-book-open" style="color: #fff;"></i> Liste des Devis
            </div>

            <b-collapse id="collapseLD" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/Devis/listdevis"><i class="fa fa-list" /> Devis non archivés </router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/Devis/archives"><i class="fa fa-list" /> Devis archivés </router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/Devis/all"><i class="fa fa-list" /> Tous les Devis </router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/devis/forward"><i class="fa fa-list" /> Forwarder un devis </router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/devis/user/search"><i class="fa fa-list" /> Rechercher par email </router-link>
                        </b-nav-item>
                    </div>
                </b-nav>
            </b-collapse>

        </li>

        <!-- Creation de devis -->
        <li>

            <div v-b-toggle.collapseE class="btn btn-default nav-link item-header">
                <i class="icon-badge" style="color: #fff;"></i> Creation de Devis
            </div>

            <b-collapse id="collapseE" class="collapse-item">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/Devis/auto"><i class="fa fa-car" /> Auto/Moto</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/Devis/habitation"><i class="fa fa-home" /> Habitation</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/Devis/voyage"><i class="fa fa-plane" /> Voyage</router-link>
                        </b-nav-item>
                        <b-nav-item class="li-item">
                            <router-link to="/Devis/vie"><i class="fa fa-plane" /> Vie</router-link>
                        </b-nav-item>                        
                    </div>
                </b-nav>
            </b-collapse>

        </li>

        <!--Branches-->
        <li v-show="$store.state.user.role=='Admin' ">
            <div v-b-toggle.collapseBranche class="btn btn-default nav-link  item-header">
                <i class="icon-settings" style="color: #fff;"></i> Branches
            </div>
            <b-collapse id="collapseBranche" class="collapse-item">
                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="/branche/liste"><i class="fa fa-list"></i>Liste les branches</router-link>
                    </b-nav-item>
                </b-nav>
            </b-collapse>
        </li>

        <!-- Demande de livraison  -->
        <li v-show="$store.state.user.role=='Admin'">

            <div v-b-toggle.collapseDelivery class="btn btn-default nav-link item-header">
                <i class="fa fa-list" style="color: #fff;"></i> Livraison
                <span class="font-weight-black" style="color: red;"> ({{DeliveryCounter}}) </span>
            </div>

            <b-collapse id="collapseDelivery" class="collapse-item" v-show="$store.state.user.role=='Admin'">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/delivery/all"> > Liste</router-link>
                        </b-nav-item>
                    </div>
                </b-nav>
            </b-collapse>

        </li>

        <!-- Sinistres -->
        <li v-show="$store.state.user.role=='Admin'">

            <div v-b-toggle.collapseSin class="btn btn-default nav-link item-header">
                <i class="fa fa-list" style="color: #fff;"></i> Sinistres
                <span class="font-weight-black" style="color: red;"> ({{SinistrenonvueCount}}) </span>
            </div>

            <b-collapse id="collapseSin" class="collapse-item" v-show="$store.state.user.role=='Admin'">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/sinistre/liste"> > Liste</router-link>
                        </b-nav-item>
                    </div>
                </b-nav>
            </b-collapse>

        </li>

        <!-- Assistance -->
        <li v-show="$store.state.user.role=='Admin'">

            <div v-b-toggle.collapseAss class="btn btn-default nav-link item-header">
                <i class="fa fa-list" style="color: #fff;"></i> Assistances
                <span class="font-weight-black" style="color: red;">({{nonvueCount}})</span>
            </div>

            <b-collapse id="collapseAss" class="collapse-item" v-show="$store.state.user.role=='Admin'">
                <b-nav class="list-link">
                    <div>
                        <b-nav-item class="li-item">
                            <router-link to="/assistances/liste"> > Liste</router-link>
                        </b-nav-item>
                    </div>
                </b-nav>
            </b-collapse>

        </li>

        <li v-show="$store.state.user.role=='Admin' ">
            <b-nav-item class="li-item item-header">
                <router-link to="/packsante/listing" style="color: #fff;">
                    <i style="color: #fff;" class="fa fa-list"></i> Liste Pack Santé
                </router-link>
            </b-nav-item>
        </li>

        <!-- Frais de dossier -->
        <li v-show="$store.state.user.role=='Admin' ">
            <b-nav-item class="li-item">
                <router-link to="/fraisdossier/listing" style="color: #fff;">
                    <i class="fa fa-list"></i>
                    Frais de dossier
                </router-link>
            </b-nav-item>
        </li>

        <!-- Configuration tarifs -->
        <li v-show="$store.state.user.role=='Admin'">

            <div v-b-toggle.collapseCT class="btn btn-default nav-link  item-header">
                <i class="icon-settings" style="color: #fff;"></i> Config Tarification
            </div>

            <b-collapse id="collapseCT" class="collapse-item">

                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="/config/tarification/auto"><i class="fa fa-list"></i>Automobile</router-link>
                    </b-nav-item>
                </b-nav>

                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="#"><i class="fa fa-list"></i>Voyage</router-link>
                    </b-nav-item>
                </b-nav>

                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="#"><i class="fa fa-list"></i>Habitation</router-link>
                    </b-nav-item>
                </b-nav>

            </b-collapse>

        </li>

        <!--Configuration-->
        <li v-show="$store.state.user.role=='Admin'">

            <div v-b-toggle.collapseF class="btn btn-default nav-link  item-header">
                <i class="icon-settings" style="color: #fff;"></i> Configuration
            </div>

            <b-collapse id="collapseF" class="collapse-item">

                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="/testimonial"><i class="fa fa-list"></i>Testimonial</router-link>
                    </b-nav-item>
                </b-nav>

                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="/RS"><i class="fa fa-list"></i>RS Monitor</router-link>
                    </b-nav-item>
                </b-nav>

                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="/marketing/popup"><i class="fa fa-list"></i>Popup Marketing</router-link>
                    </b-nav-item>
                </b-nav>

                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="/config/notitication/email_adresse">
                            <i class="fa fa-list"></i>
                            Email Partenaire
                        </router-link>
                    </b-nav-item>
                </b-nav>

            </b-collapse>

        </li>

        <!-- Debut du menu Statistiques -->
        <li v-show="$store.state.user.role=='Admin'">
            <div v-b-toggle.collapseStat class="btn btn-default nav-link item-header">
                <i class="icon-chart" style="color: #fff;"></i> Statistiques
            </div>
            <b-collapse id="collapseStat" class="collapse-item">
                <b-nav class="list-link">
                    <b-nav-item class="li-item">
                        <router-link to="#"><i class="icon-chart" />Taux fréquentation du site</router-link>
                    </b-nav-item>
                    <b-nav-item class="li-item">
                        <router-link to="#"><i class="icon-chart"></i>Nouveaux comptes crées</router-link>
                    </b-nav-item>
                    <b-nav-item class="li-item">
                        <router-link to="#"><i class="icon-chart"></i>Abonnements aux newsletter</router-link>
                    </b-nav-item>
                    <b-nav-item class="li-item">
                        <router-link to="#"><i class="icon-chart"></i>Statistiques des devis</router-link>
                    </b-nav-item>
                    <b-nav-item class="li-item">
                        <router-link to="#"><i class="icon-chart"></i>Statistiques des contrats</router-link>
                    </b-nav-item>
                    <b-nav-item class="li-item">
                        <router-link to="#"><i class="icon-chart"></i>Statistiques devis et contrats</router-link>
                    </b-nav-item>

                </b-nav>

            </b-collapse>
        </li>

        <!-- Fin du menu Statistiques -->
    </ul>
</nav>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex';
import Api from '../services/Api'

export default {
    name: 'Sidebar',
    components: {},
    data() {
        return {
            DeliveryCounter:0,
            assureur: true,
            courtier: true,
            partenaire: true,
            user: false,
            config: true,
            nonvueCount: null,
            SinistrenonvueCount: null,
            Mano: false,
            alerts: [{
                    id: 0,
                    title: 'Sales Report',
                    value: 15,
                    footer: 'Calculating x-axis bias... 65%',
                    color: 'info',
                },
                {
                    id: 1,
                    title: 'Personal Responsibility',
                    value: 20,
                    footer: 'Provide required notes',
                    color: 'danger',
                },
            ],
        };
    },

    created: function () {
        this.fetchEventsList();
        this.timer = setInterval(this.fetchEventsList, 2000)
    },

    methods: {

        getNotViewDelivery()
        {
            if (this.$store.state.user.role == 'Admin') {
                Api().get('delivery/new')
                .then(resultat => {this.DeliveryCounter = resultat.data.count })
            }
           
        },

        isMobile: function () {
            if (screen.width <= 760) {
                return true
            } else {
                return false
            }
        },

        isTablette() {
            if (screen.width > 425 && screen.width <= 768) {
                return true
            } else {
                return false
            }
        },

        isDesktop: function () {
            if (screen.width > 768) {
                return true
            } else {
                return false
            }
        },

        ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),

        fetchEventsList: function () {
            this.Mano = this.Mano + 1
            this.CountNonVue()
            this.CountSinistreNonVue()
            this.getNotViewDelivery()
        },

        goStatistiques() {
            this.$router.go(this.$router.push({
                name: 'statistiques'
            }))
        },

        CountNonVue() {
            Api().get('/assistances/count/nonvue')
                .then(resultat => {
                    this.nonvueCount = resultat.data.count
                })
        },

        CountSinistreNonVue() {
            Api().get('/sinistre/count/nonvue')
                .then(resultat => {
                    this.SinistrenonvueCount = resultat.data.count
                })
        },

    },
    mounted() {
        this.CountNonVue()
        this.CountSinistreNonVue()
    },

    computed: {
        ...mapState('layout', {

        }),
    },
};
</script>

<!-- Sidebar styles should be scoped -->

<style lang="scss" scoped>
@import '../styles/app';

.sidebar {
    width: 12%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: $sidebar-bg-color;
    color: $sidebar-color;
    overflow-y: auto;
    overflow-x: auto;
    margin-top: -40px;

    @include scroll-bar($sidebar-scrollbar-bg);
}

.logo {
    margin: 10px 0;
    font-size: 18px;
    margin-top: 15px;
    width: 80%;
    font-weight: $font-weight-thin;
    text-align: center;
    transition: width $sidebar-transition-time ease-in-out;

    a {
        color: $gray-800;
        padding: 0 5px;
        text-decoration: none;
        white-space: nowrap;
    }
}

.nav-link a {
    color: rgba(51, 51, 51, 0.603);
    text-decoration: none
}

.nav-link {
    color: #fff;

}

.sidebarClose .logo {
    width: 50px;
}

.sidebarStatic .logo {
    width: 100%;
    transition: none;
}

.nav {
    width: 100%;
    //padding: 30px 0 10px;
    overflow-y: auto;
    overflow-x: hidden;
    color: #fff;

    :hover {
        color: rgba(87, 87, 87, 0.897);

    }

}

.navTitle {
    margin: 35px 0 5px 11px;
    font-size: $font-size-larger;
    transition: opacity $sidebar-transition-time ease-in-out;

    @media (min-width: breakpoint-min(lg)) {
        opacity: 1;
    }
}

#li {
    color: grey
}

.sidebarClose .navTitle {
    opacity: 0;
}

.sidebarStatic .navTitle {
    opacity: 1;
    transition: none;
}

.action {
    color: #aaa;
    float: right;
    margin-right: 15px;
    margin-top: -1px;

    .la {
        font-size: $font-size-sm;
        margin-top: 4px;
    }
}

.labelName {
    opacity: 1;
    transition: opacity $sidebar-transition-time ease-in-out;
}

.sidebarClose .labelName {
    opacity: 0;
}

.sidebarStatic .labelName {
    transition: none;
    opacity: 1;
}

.glyphiconSm {
    font-size: 9px;
}

.sidebarLabels {
    list-style-type: none;
    padding: 11px;
    padding-right: 15px;

    >li+li {
        margin-top: 10px;
    }

    li>a {
        font-size: $font-size-mini;
        color: $sidebar-color;
        text-decoration: none;

        >i {
            font-size: 11px;
            vertical-align: 1px;
            transition: margin-left $sidebar-transition-time ease-in-out;
        }
    }
}

.sidebarClose {
    .sidebarLabels>li>a>i {
        margin-left: 8px;
        transition: margin-left $sidebar-transition-time ease-in-out;
    }
}

.sidebarStatic {
    .sidebarLabels>li>a>i {
        transition: none;
        margin-left: 0;
    }
}

.sidebarAlerts {
    margin-bottom: $spacer * 2;
    transition: opacity $sidebar-transition-time ease-in-out;
    opacity: 1;
}

.sidebarClose .sidebarAlerts {
    opacity: 0;
}

.sidebarStatic .sidebarAlerts {
    opacity: 1;
    transition: none;
}

.sidebarAlert {
    background: transparent;
    margin-bottom: 0;
    padding: 0.5rem 11px;
    padding-right: 15px;
}

.sidebarProgress {
    background: lighten($sidebar-bg-color, 10%);
}

.groupTitle {
    margin-bottom: 15px;
}
</style>
