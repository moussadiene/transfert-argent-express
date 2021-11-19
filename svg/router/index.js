import Vue from "vue";
import Router from "vue-router";


import Devis_SunuAssur from '../views/Devis/Devis_SunuAssur';
import Devis_nsia from '../views/Devis/Devis_nsia';

import Login from "../views/Login";
import Logout from "../views/Logout";
import Layout from "../views/Layout";
import Home from "../views/Home";
import assureurcreate from "../views/assureurs/assureurcreate";
import createcourtier from "../views/courtier/createcourtier";
import createpartenaire from "../views/partenaires/createpartenaire";
import auto from "../views/Devis/auto";
import habitation from "../views/Devis/habitation";
import voyage from "../views/Devis/voyage";
import sante from "../views/Devis/sante";
import vie from "../views/Devis/vie";
import listassureur from "../views/assureurs/listassureur";
import courtierlist from "../views/courtier/courtierlist";
import createuser from "../views/users/createuser";
import listpartenaire from "../views/partenaires/listpartenaire";
import clientlist from "../views/clients/clientlist";
import listuser from "../views/users/listuser";
import listdevis from "../views/Devis/listdevis";
import listDevisArchive from "../views/Devis/listDevisArchive";
import listcontrat from "../views/contrat/listcontrat";
import paiement from "../views/paiement/paiement";
import listeDevisPaiement from "../views/paiement/listeDevisPaiement";
import paiement_souscription from '../views/paiement/paiement_souscription'
import Payment_Link_Listing from '../views/paiement/Payment_Link_Listing'
import main from '../views/statistiques/main'
import statContrats from '../views/statistiques/statContrats'
import statDevis from '../views/statistiques/statDevis'
import statDevisContrats from '../views/statistiques/statDevisContrats'
import statSite from '../views/statistiques/statSite'
import prospectsClient from '../views/clients/prospects'
import client from '../views/clients/client'
import contratechus from '../views/contrat/echus'
import encours from '../views/contrat/encours'
import frontofficeuser from '../views/users/frontofficeUser'
import Createpack from '../views/packsante/Createpack'
import listingpackSante from '../views/packsante/listingpackSante'
import UpdateDevisauto from '../views/updatedevis/UpdateDevisauto'
import UpdateDevishabitation from '../views/updatedevis/UpdateDevishabitation'
import UpdateDevisvoyage from '../views/updatedevis/UpdateDevisvoyage'
import AllDevis from '../views/Devis/AllDevis'
import sinistre from '../views/sinistres'
import assistances from '../views/assistances'
import createFrais from '../views/Fraisdossier/createFrais'
import listingFrais from '../views/Fraisdossier/listingFrais'
import createBranche from '../views/branche/createBranche'
import listeBranche from '../views/branche/listeBranche'
import CumuleContratAlert from '../views/CumuleContratAlert'
import searchContrat from '../views/searchContrat'
import Contrat from '../views/paiement/contrat'
import testimonial from '../views/CMS/testimonial'
import CreateRS from '../views/CMS/CreateRS'
import RechercheDevis from '../views/ContratExpresse/RechercheDevis'
import RechercheTraceOM from '../views/ContratExpresse/RechercheTraceOM'
import listingContratExpress from '../views/ContratExpresse/listingContratExpress'
import Popupmarketing from '../views/CMS/Popupmarketing'
import paiementCash from '../views/ContratExpresse/paiementCash'
import Home_gestions from '../views/gestions/Home_gestions'
import addstamp from '../views/partenaires/addstamp'
import listing from '../views/tarifications/auto/listing_config_auto'
import CreateEmailAdresse from '../views/emailadresse/CreateEmailAdresse'
import alldelivery from '../views/delivery/alldelivery'
import canceled_contrat from '../views/contrat/canceled_contrat'
import renouvellement from '../views/contrat/renouvellement'
import testvue from '../views/test/testvue'
import ForwardVUe from '../views/Devis/forward'
import Searchdevis from '../views/Devis/search_devis_by_user'

Vue.use(Router);

const router = new Router({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [{
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                isPublic: true
            }
        },
        {
            path: "/logout",
            name: "logout",
            component: Logout,
            meta: {
                isPublic: true
            }
        },
        {
            path: "/",
            component: Layout,
            children: [{
                    path: "/",
                    redirect: "/login"
                },
                {
                    path: "/home",
                    name: "home",
                    component: Home
                },
                {
                    path: "/assureurs/assureurcreate",
                    name: "assureurcreate",
                    component: assureurcreate
                },
                {
                    path: "/courtier/createcourtier",
                    name: "createcourtier",
                    component: createcourtier
                },
                {
                    path: "/partenaires/createpartenaire",
                    name: "createpartenaire",
                    component: createpartenaire
                },
                {
                    path: "/Devis/auto",
                    name: "devisauto",
                    component: auto
                },
                {
                    path: "/Devis/habitation",
                    name: "devishabitation",
                    component: habitation
                },
                {
                    path: "/Devis/voyage",
                    name: "devisvoyage",
                    component: voyage
                },
                {
                    path: "/Devis/sante",
                    name: "devissante",
                    component: sante
                },
                {
                    path: "/Devis/vie",
                    name: "devisvie",
                    component: vie
                },
                {
                    path: "/assureurs/listassureur",
                    name: "assureurlist",
                    component: listassureur
                },

                {
                    path: "courtier/courtierlist",
                    name: "courtierlist",
                    component: courtierlist
                },
                {
                    path: "users/createuser",
                    name: "createuser",
                    component: createuser
                },
                {
                    path: "partenaires/listpartenaire",
                    name: "listpartenaire",
                    component: listpartenaire
                },
                {
                    path: "clients/clientlist",
                    name: "clientlist",
                    component: clientlist
                },
                {
                    path: "users/listuser",
                    name: "listuser",
                    component: listuser
                },
                {
                    path: "users/frontoffice",
                    name: "listuserFrontoffice",
                    component: frontofficeuser
                },
                {
                    path: "Devis/listdevis",
                    name: "listdevis",
                    component: listdevis
                },
                {
                    path: "Devis/all",
                    name: "allDevis",
                    component: AllDevis
                }, ,
                {
                    path: "Devis/archives",
                    name: "listdevisarchives",
                    component: listDevisArchive
                },
                {
                    path: "contrat/listcontrat",
                    name: "listcontrat",
                    component: listcontrat
                },

                {
                    path: "contrat/canceled",
                    name: "canceledcontrat",
                    component: canceled_contrat
                },

                {
                    path: "paiement/paiement",
                    name: "paiement",
                    component: paiement
                },
                {
                    path: "paiement/liste",
                    name: "Listepaiement",
                    component: listeDevisPaiement
                },
                {
                    path: "paiement/souscription/*",
                    name: "paiement_souscription",
                    component: paiement_souscription
                },
                {
                    path: "payment/listing",
                    name: "payment_link_listing",
                    component: Payment_Link_Listing
                },
                /*=====Paiement Devis par cash=============*/
                {
                    path: "/contrat/paiement/cash/",
                    name: "paiementCash",
                    component: paiementCash
                },
                /*==========================================*/

                {
                    path: "statistiques/main",
                    name: "statistiques",
                    component: main
                },
                /* ============= Stats routes ============= */
                {
                    path: "statistiques/devis",
                    name: "statDevis",
                    component: statDevis
                },
                {
                    path: "statistiques/contrat",
                    name: "statContrats",
                    component: statContrats
                },
                {
                    path: "statistiques/rapport",
                    name: "stateDevisContrats",
                    component: statDevisContrats
                },
                {
                    path: "statistiques/site",
                    name: "statSite",
                    component: statSite
                },
                {
                    path: "clients/prospects",
                    name: "prospects",
                    component: prospectsClient
                },
                {
                    path: "clients/client",
                    name: "client",
                    component: client
                },
                {
                    path: "contrat/echus",
                    name: "contratechus",
                    component: contratechus
                },
                {
                    path: "contrat/encours",
                    name: "contratencours",
                    component: encours
                },
                /*==========================*/
                {
                    path: "devis/update/auto",
                    name: "update_devis_auto",
                    component: UpdateDevisauto
                },
                {
                    path: "devis/update/habitation",
                    name: "update_devis_habitation",
                    component: UpdateDevishabitation
                },
                {
                    path: "devis/update/voyage",
                    name: "update_devis_voyage",
                    component: UpdateDevisvoyage
                },
                {
                    path: "sinistre/liste",
                    name: "liste_sinistre",
                    component: sinistre
                },
                {
                    path: "assistances/liste",
                    name: "assistance",
                    component: assistances
                },

                {
                    path: "packsante/create",
                    name: "packsante_create",
                    component: Createpack
                },

                {
                    path: "packsante/listing",
                    name: "packsante_listing",
                    component: listingpackSante
                },

                {
                    path: "fraisdossier/listing",
                    name: "fraisdossier_list",
                    component: listingFrais
                },

                {
                    path: "fraisdossier/create",
                    name: "fraisdossier_create",
                    component: createFrais
                },

                //========
                {
                    path: "branche/liste",
                    name: "branche_liste",
                    component: listeBranche
                },

                {
                    path: "branche/create",
                    name: "branche_create",
                    component: createBranche
                },

                {
                    path: "contrat/cumule",
                    name: "cumule_contrat_alert",
                    component: CumuleContratAlert
                },

                {
                    path: "contrat/search",
                    name: "search_contrat",
                    component: searchContrat
                },

                {
                    path: "contrat/ok",
                    name: "contrat_ok",
                    component: Contrat
                },

                {
                    path: "/contrat/express/search",
                    name: "search_devis_for_contrat_express",
                    component: RechercheDevis
                },

                {
                    path: "/contrat/express/searchom",
                    name: "search_devis_for_contrat_express_OM",
                    component: RechercheTraceOM
                },

                {
                    path: "/contrat/express/listing",
                    name: "contrat_express_listing",
                    component: listingContratExpress
                },

                {
                    path: "testimonial",
                    name: "testimonial",
                    component: testimonial
                },

                {
                    path: "RS",
                    name: "RS",
                    component: CreateRS
                },
                {
                    path: "marketing/popup",
                    name: "marketing_popup",
                    component: Popupmarketing
                },
                {
                    path: '/partner/stamp/add',
                    name: 'addstamp',
                    component: addstamp
                },
                {
                    path: '/config/tarification/auto',
                    name: 'listing_tarification_auto',
                    component: listing
                },
                {
                    path: '/config/notitication/email_adresse',
                    name: 'notitifaction_email_route',
                    component: CreateEmailAdresse
                },
                /*================*/
                {
                    path: '/gestions',
                    name: 'module_gestion',
                    component: Home_gestions
                },
                {
                    path: '/delivery/all',
                    name: 'all_delivery',
                    component: alldelivery
                },
                {
                    path: '/contrat/renouvellement',
                    name: 'contrat_renouvellement',
                    component: renouvellement
                },
                {
                    path: '/devis/forward',
                    name: 'devis_formard',
                    component: ForwardVUe
                },
                {
                    path: '/devis/user/search',
                    name: 'user_devis_search',
                    component: Searchdevis
                },
                {
                    path: '/test/vue',
                    name: 'test_vue',
                    component: testvue
                },
                //
                {
                    path: '/devis/sunuassur',
                    name: 'Devis_sunuAssur',
                    component: Devis_SunuAssur,
                    // beforeEnter(to, from, next) {
                    //     let isSunuLogged = false;
                    //     const passwd_sunu = 'sunu@20'
                    //     while (!isSunuLogged) {
                    //         let passwd = prompt('Veuillez saisir le mot de passe:')
                    //         if (passwd === passwd_sunu) {
                    //             isSunuLogged = true
                    //             localStorage.setItem('isSunuLoogged', true)
                    //             next()
                    //         }
                    //     }
                    // },
                },

                {
                    path: '/devis/nsiaetudes',
                    name: 'Devis_nsia',
                    component: Devis_nsia,
                    // beforeEnter(to, from, next) {
                    //     let isNsiaLogged = false;
                    //     const passws_nsia = 'nsiatest@21'
                    //     while (!isNsiaLogged) {
                    //         let passwd = prompt('Veuillez saisir le mot de passe:')
                    //         if (passwd === passws_nsia) {
                    //             isNsiaLogged = true
                    //             localStorage.setItem('isNsiaLogged', true)
                    //             next()
                    //         }
                    //     }
                    // },
                },

            ]
        }
    ]
});


export default router;