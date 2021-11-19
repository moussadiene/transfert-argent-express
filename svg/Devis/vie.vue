    <template>
<div class="">
    <b-card title="" header-tag="header" footer-tag="footer">
        <h5 slot="header" class="mb-0"><i class="fa fa-car" /> CREER DEVIS VIE <span style="color: #ffa409"> {{ type_devis_vie }} </span>  <span><img src="/src/assets/img/pictoassvoyage.png" alt=""></span></h5>
        <div class="col m-2 pb-3">

            <div v-if="hidesearchClient">
                <div><span>RECHERCHER CLIENT</span></div>
                <b-card header-bg-variant="transparent" class="pl-3">
                    <div class="row">
                        <div>
                            <b-form-radio v-model="clientsearch" name="téléphone" value="téléphone">Numéro téléphone</b-form-radio>
                        </div>
                        <div class="ml-5">
                            <b-form-radio v-model="clientsearch" name="email" value="email">Email</b-form-radio>
                        </div>
                    </div>

                    <br>

                    <div class="row" style="" v-if="clientsearch ==='téléphone' && seen">
                        <div>
                            <b-form-input v-model="telephoneclient" placeholder="770000000"></b-form-input>
                        </div>
                        <div class="btni">
                            <b-button @click="rechercherClient"><i class="fa fa-search" style="color: #ffa409"></i></b-button>
                        </div>
                    </div>

                    <div class="row" v-if="clientsearch ==='email' && seen">
                        <div>
                            <b-form-input v-model="emailclient" placeholder="client@xxxx.com"></b-form-input>
                        </div>
                        <div class="btni">
                            <b-button @click="rechercheClientByMail"><i class="fa fa-search" style="color: #ffa409"></i></b-button>
                        </div>
                    </div>
                </b-card>

                <div>
                    <b-alert variant="success" v-if="clientOk" show>
                        <div v-if="shownameclient">Client : {{usersearch.nom+' '+usersearch.prenom}}
                            <b-btn variant="outline-warning" size="sm" class=" ml-2 font-weight-bold" @click="showidclient">Créer le devis pour ce client ?</b-btn>
                        </div>

                        <div v-if="showconfirmclient">
                            <span>Vous aller créer un devis pour le client {{usersearch.nom+' '+usersearch.prenom}} </span>
                            <b-btn variant="outline-warning" class=" ml-2 font-weight-bold" @click="hidesearch">OK</b-btn>
                        </div>
                        <b-input v-show="showId" v-model="usersearch._id" id="" class=" mb-sm-0 "></b-input>
                    </b-alert>

                    <div v-if="clientnonOk">
                        <b-alert show variant="primary">Ce client n'existe pas
                            <b-btn @click="AddUser=true" variant="outline-warning" size="sm" class=" ml-2 font-weight-bold">cliquez pour ajouterle nouveau client</b-btn>
                        </b-alert>

                        <div>
                            <!--popup added by cheikh-->
                            <b-modal v-model="AddUser" size="xl" title="Creer client" header-text-variant="orange" style="height: 50%">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <!-- <b-card color="light" class="mb-1"> -->

                                    <b-card class="mb-1">
                                        <div class="row">

                                            <div class="col-sm-3">
                                                <label for="">Nom</label>
                                                <b-form-input type="text" v-model="nom" label="Nom (*)" required></b-form-input>
                                            </div>

                                            <div class="col-sm-3">
                                                <label for="">Prenom</label>
                                                <b-form-input type="text" v-model="prenom" label="Prenom (*)" required>
                                                </b-form-input>
                                            </div>

                                            <div class="col-sm-3">
                                                <label for="">Telephone</label>
                                                <b-form-input type="text" v-model="telephoneclient" label="Telephone (*)" required></b-form-input>
                                            </div>

                                            <div class="col-sm-3">
                                                <label for="">Email</label>
                                                <b-form-input type="email" v-model="email" label="Email" required></b-form-input>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <span for="">Date naissance </span>
                                                <date-picker v-model="datenaissance" :config="optionsdateUser" placeholder="JJ/MM/AAAA" required></date-picker>
                                            </div>

                                            <div class="col-sm-3">
                                                <span for="">Profession </span>
                                                <b-form-input type="text" v-model="profession" span="Profession" required></b-form-input>
                                            </div>

                                            <div class="col-sm-3">
                                                <span for=""> Adresse </span>
                                                <b-form-input type="text" v-model="adresse" span="Telephone bureau" required></b-form-input>
                                            </div>

                                            <div class="col-sm-3">
                                                <span for="">Sexe </span>
                                                <b-form-select v-model="genre">
                                                    <option value="homme">Homme</option>
                                                    <option value="femme">Femme</option>
                                                </b-form-select>
                                            </div>
                                        </div>
                                    </b-card>

                                    <b-card class="mb-1">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <span for="">Type piece identite </span>
                                                <b-form-select v-model="piece_identite">
                                                    <option value="carte_cni">Carte CNI</option>
                                                    <option value="passeport">Passeport</option>
                                                </b-form-select>
                                            </div>

                                            <div class="col-sm-3">
                                                <span for="">Numero de piece </span>
                                                <b-form-input type="number" v-model="numero_piece" span="Adresse " required></b-form-input>
                                            </div>
                                        </div>
                                    </b-card>
                                </v-form>

                                <div slot="modal-footer" class="w-100">
                                    <b-button variant="warning" size="lg" class="float-right" @click="AddUser=false">Annuler</b-button>
                                    <b-button variant="primary" size="lg" class="float-right mr-2" @click="createuser">Valider</b-button>
                                </div>
                            </b-modal>
                        </div>
                    </div>
                </div>
            </div>

            <br />
  
            <div class="row justify-center" v-if="e1>0" >
               
                <div class="col-sm-1 pt-2 pb-2">
                    <div v-if="e1==0" class="lightgrey p-3"> 1 </div>
                    <div v-else class="p-2 lightblue p-3">
                        <i class="fas fa-check-double"></i>
                    </div>
                </div>
                <span class="trait"></span>

                <div class="col-sm-1 pt-2 pb-2">
                    <div v-if="e1==0 || e1<2" class="lightgrey p-3"> 2 </div>
                    <div v-else class="p-2 lightblue p-3">
                        <i class="fas fa-check-double"></i>
                    </div>
                </div>
                <span class="trait"></span>

                <div class="col-sm-1 pt-2 pb-2">
                    <div v-if="e1==0 || e1<3" class="lightgrey p-3"> 3 </div>
                    <div v-else class="p-2 lightblue p-3">
                        <i class="fas fa-check-double"></i>
                    </div>
                </div>
                <span class="trait"></span>

                <div class="col-sm-1 pt-2 pb-2">
                    <div v-if="e1==0 || e1<4" class="lightgrey p-3"> 4 </div>
                    <div v-else class="p-2 lightblue p-3">
                        <i class="fas fa-check-double"></i>
                    </div>
                </div>
                <span class="trait"></span>

                <div class="col-sm-1 pt-2 pb-2">
                    <div v-if="e1==0 || e1<5" class="lightgrey p-3"> 5 </div>
                    <div v-else class="p-2 lightblue p-3">
                        <i class="fas fa-check-double"></i>
                    </div>
                </div>
            </div>

            <div v-if="e1==1" class="mt-2">
                 <v-layout align-end class="content-justify bg-white text-center" justify-content-center pa-3 row
                  style="margin-bottom:10%" wrap>
            <v-flex class="justify-content-center row" pb-3 xs12>
                <!--================ CARD Suruassur ===================-->
                <v-card class="card mb-3">
                    <v-card-text class="Assurance-AutoMoto mb-3 policeLato">Assur'Euleuk</v-card-text>
                    <!-- <img class="border-radius" height="155" src="../assets/img/img-sante/educPlus-min.png"
                         width="230"> -->
                    <!-- <v-card-text class="texte mt-2 policeLato" justify-content-center row>
                        Préparez l'avenir de vos enfants en toute sérénité en <br>
                        garantissant <br> leur éducation et leurs études <br> quoiqu'il arrive.
                    </v-card-text> -->
                    <v-card-actions class="justify-center">
                        <v-btn flat @click="devisEuleuk()">
                            <img class="details pt-1" src="./../../assets/img/assurance/devis-button.png" alt="euleuk"/>
                        </v-btn>
                    </v-card-actions>
                </v-card>

                <!--================ CARD TRANSVIE ===================-->
                <v-card class="card mb-3 ml-3">
                    <v-card-text class="Assurance-AutoMoto mb-3 policeLato">Hospitalisation</v-card-text>
                    <!-- <img class="border-radius" height="155" src="../assets/img/img-sante/hospitalisation.jpg"
                         width="230">
                    <v-card-text class="texte mt-2 policeLato" justify-content-center row>
                        Bénéficiez d'une indemnité périodique vous permettant <br>
                        de soulager vos dépenses et couvrir certains frais d'hospitalisation.

                    </v-card-text> -->
                    <v-card-actions class="justify-center">
                        <v-btn flat to="#" disabled><img class="details pt-1"
                                                         src="./../../assets/img/assurance/bientot-button.png"
                                                         alt="bientot"/></v-btn>
                    </v-card-actions>
                </v-card>


                <!--================ CARD NEST ===================-->
                <v-card class="card mb-3 ml-3">
                    <v-card-text class="Assurance-AutoMoto mb-3 policeLato">Invalidité</v-card-text>
                    <!-- <img class="border-radius" height="155" src="../assets/img/img-sante/Invalidite.jpg" width="230">
                    <v-card-text class="texte mt-2 policeLato" justify-content-center row>
                        Bénéficiez d'une aide financière en cas de perte de revenus dû à une
                        invalidité ou incapacité à poursuivre votre activité rémunératrice.
                    </v-card-text> -->
                    <v-card-actions class="justify-center">
                        <v-btn flat to="#" disabled><img class="details pt-1"
                                                         src="./../../assets/img/assurance/bientot-button.png"
                                                         alt="bientot"/></v-btn>
                    </v-card-actions>
                </v-card>

                <!--================ CARD KERMEL ===================-->
                <v-card class="card mb-3 ml-3">
                    <v-card-text class="Assurance-AutoMoto mb-3 policeLato">Décès/Funérailles</v-card-text>
                    <!-- <img class="border-radius" height="155" src="../assets/img/img-sante/deces.jpg" width="230">
                    <v-card-text class="texte mt-2 policeLato" justify-content-center row>
                        Bénéficiez d'une aide financière permettant à vos proches ou vous-même de
                        couvrir certains frais liés à la perte d'un membre proche de la famille.
                    </v-card-text> -->
                    <v-card-actions class="justify-center">
                        <v-btn flat to="#" disabled><img class="details pt-1"
                                                         src="./../../assets/img/assurance/bientot-button.png"
                                                         alt="bientot"/></v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
              
            </div>

            <div class="m-2" v-if="e1==2">
                <v-layout class=" bg-white text-center" justify-content-center row style="margin-bottom:10%" wrap >
            <v-layout class="mt-5 justify-content-center column" height="200px" elevation="24">
               
               
                <v-flex xs11 sm10 md11 lg6 pb-4 justify-content-center row style="margin-top: 3%">
                        <!--================ CARD TO NSIAETUDES ===================-->
                        <v-card min-width="300px" class="card mb-3" style="box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);">
                            <v-card-text class="Assurance-AutoMoto mb-4 policeLato">Versement bourse annuelle <br> sur 3, 4 ou 5 ans</v-card-text>
                            <!-- <img src="./../../assets/img/b_annuelle.jpeg" width="240" height="160" class="border-radius ml-1"> -->
                            <v-card-actions class="justify-center">
                                <a href="/devis/nsiaetudes"><img class="details pt-1"
                                                                 src="./../../assets/img/assurance/devis-button.png"/></a>
                            </v-card-actions>
                        </v-card>

                        <!--================ CARD TO SUNUASSUR ===================-->
                        <v-card min-width="300px" class="card mb-3 ml-5" style="box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);">
                            <v-card-text class="Assurance-AutoMoto mb-4 policeLato">Versement Capital <br> en 1 fois</v-card-text>
                            <!-- <img src="./../../assets/img/v_capital.jpeg" width="240" class="border-radius ml-1"> -->
                            <v-card-actions class="justify-center">
                                <a href="/devis/sunuassur"><img class="details pt-1" src="./../../assets/img/assurance/devis-button.png"/></a>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                   
            </v-layout>
        </v-layout>
                <div class="col-sm-12 mt-3">
                    <b-btn variant="warning" class="col-sm-3 rounded mt-1 ml-1" @click="e1=1">
                        <i class="fas fa-chevron-circle-left"></i>
                        Retour
                    </b-btn>
                </div>
              
            </div>

            <!-- marque et model-->
            <div class="row mt-2" v-if="e1==3">
                <!-- ============ si c'est different de 2roues ============== -->
                <b-container v-if="categorie!='2_roues'">
                    <div class="row">
                        <div class="col-sm-6">
                            <span for="" class="ml-2">MARQUES (*) </span>
                            <b-form-select v-model="marque" style="width:100%!important;height:45px;" class="ml-2 input-number rounded">
                                <option v-for="(items,index) in listMarque" :key="index" :value="items.Marque">{{items.Marque}}</option>
                            </b-form-select>
                        </div>

                        <div class="col-sm-6" @change="Stepper3Validator()">
                            <span class="ml-2">MODELE (*)</span>
                            <b-form-select v-model="model" style="width: 100%!important;height:45px;" class="ml-2 rounded">
                                <option v-for="(items,index) in listeModeles" :key="index" :value="items.Type">{{items.Type}}</option>
                            </b-form-select>
                        </div>
                    </div>

                    <div class="col-sm-12 mt-2">
                        <b-btn variant="outline-warning" class="rounded ml-2 mt-1 col-sm-2" @click="e1=2">
                            <i class="fas fa-chevron-circle-left"></i>
                            Retour
                        </b-btn>

                        <b-btn variant="outline-warning" class="col-sm-2 ml-2 rounded mt-1" @click="Stepper3Validator()">
                            <i class="fas fa-chevron-circle-right"></i>
                            Suivant
                        </b-btn>
                    </div>

                    <b-modal v-model="popupAutre" hide-footer title="Saisir la marque et le modèle">
                        <span for="">Marque du véhicule</span>
                        <b-form-input v-model="marque" type="text" placeholder="Marque de votre véhicule"></b-form-input>

                        <span for="">Modèle du véhicule</span>
                        <b-form-input v-model="model" type="text" placeholder="Modeèle de votre véhicule"></b-form-input>
                        <slot></slot>

                        <b-button class="mt-2" @click="validMarqueModel">Valider</b-button>
                    </b-modal>
                </b-container>

                <!-- ============ si c'est 2roues ============== -->
                <b-container v-if="categorie=='2_roues'">
                    <div class="row">
                        <div class="col-sm-6">
                            <span for="">MARQUES des 2 roues (*) </span>
                            <b-form-select v-model="marque" style="width:100%!important;height:45px;" class="input-number rounded">
                                <option v-for="(items,index) in listeMarque2roues" :key="index" :value="items.Marque">{{items.Marque}}</option>
                            </b-form-select>
                        </div>

                        <div class="col-sm-6" @change="ste()">
                            <span class="ml-2">MODELE (*)</span>
                            <b-form-select v-model="model" style="width: 100%!important;height:45px;" class="ml-2 rounded">
                                <option v-for="(items,index) in listeModeles2roues" :key="index" :value="items.Type" @change="onChangeSelectedModele2roues(val)">{{items.Type}}</option>
                            </b-form-select>
                        </div>
                    </div>

                    <div class="col-sm-12 mt-2">
                        <b-btn variant="outline-warning" class="rounded col-sm-2" @click="e1=2">
                            <i class="fas fa-chevron-circle-left"></i>
                            Retour
                        </b-btn>

                        <b-btn variant="outline-warning" class="col-sm-2 ml-5 rounded" @click="Stepper3Validator()">
                            <i class="fas fa-chevron-circle-right"></i>
                            Suivant
                        </b-btn>
                    </div>

                    <b-modal v-model="popupAutre" hide-footer title="Saisir la marque et le modèle">
                        <span for="">Marque du véhicule</span>
                        <b-form-input v-model="marque" type="text" placeholder="Marque de votre véhicule"></b-form-input>

                        <span for="">Modèle du véhicule</span>
                        <b-form-input v-model="model" type="text" placeholder="Modeèle de votre véhicule"></b-form-input>
                        <slot></slot>
                        <b-button class="mt-2" @click="validMarqueModel">Valider</b-button>
                    </b-modal>
                </b-container>
            </div>

        </div>
    </b-card>
</div>
</template>

<script>
import dayjs from 'dayjs'
import store from '../../store/index'
import Api from '../../services/Api'
import MarqueVehicule from '../../common/marqueauto'
import Marque2roues from '../../common/2roues'
import configAuto from '../../common/configAuto'
import _ from 'underscore'

export default {
    name: "vie",
    data() {
        return {
            // vie 
type_devis_vie : '',
        Zone_text: true,
 Card_zone: false,
                hidden: true,

                // fin
            VNeuf :  false,
            neant: 'N.A',
            optionsdate: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
                minDate: new Date(),
            },
            optionsdateMEC: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
                maxDate: new Date(),
            },
            optionsdateUser: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
                defaultDate: (dayjs(new Date()).add(-19, 'year')).toDate(),
                maxDate: (dayjs(new Date()).add(-18, 'year')).toDate()
            },
            e1: 0,
            dateCircule: null,
            money: {
                thousands: ' ',
                precision: false,
                masked: false
            },
            telephoneclient: null,
            emailclient: null,
            emailC: this.emailclient,
            telephoneC: this.telephoneclient,
            clientnonOk: false,
            clientOk: false,
            clientsearch: null,
            showId: false,
            showconfirmclient: false,
            recupIdClient: '',
            shownameclient: true,
            hidesearchClient: true,
            nom: null,
            prenom: null,
            email: null,
            datenaissance: null,
            profession: null,
            AddUser: false,
            adresse: null,
            piece_identite: null,
            numero_piece: null,
            seen: true,
            hideDive_vehicule: null,
            flotte_mono: null,
            nombreVehicules: null,
            categorie: null,
            volumetrie2_roues: '',
            genre: null,
            tonnage_carosserie: '',
            password1: null,
            optvehicule: '',
            nbredepiece: null,
            optionUtilitaire: '',
            carburant: null,
            marque: null,
            model: null,
            force: null,
            age: null,
            annee_mois: null,
            valeur: null,
            valeur_venale: null,
            valeurduvehicule: null,
            immatriculation: null,
            nbplace: null,
            garanties: ['RESPONSABILITE CIVILE'],
            assureurs: [],
            capital_AvRec: null,
            optionPersoTrans: null,
            option_Individuel_Accident: null,
            listeModeles : null,
            popupAutre: false,
            listeAssureurs: [],
            ListAuto: [],
            suivant: false,
            categorieFInale: null,
            nbAutoAdded: null,
            listMarque: [],
            listeMarque2roues: [],
            listeModeles2roues : null,
            listMarqueprime: [],
            selectedMarque: null,
            duree: null,
            dateEffet: null,
            dateEcheance: null,
            tonnage: null,
            carosserie: null,
            voidField: false,
            selectedcaté: 'tourisme',
            options: [{
                    text: 'Tourisme',
                    value: 'tourisme'
                },
                {
                    text: '2 roues',
                    value: '2roues'
                },
                {
                    text: 'Utilitaires',
                    value: 'utilitaire'
                }
            ],
            Deb: null,
            selectedcarbu: '',
            options2: [{
                    text: 'Essence',
                    value: 'essence'
                },
                {
                    text: 'Diesel',
                    value: 'diesel'
                },
                {
                    text: 'Hybride',
                    value: 'hybride'
                },
                {
                    text: 'Electrique',
                    value: 'elecetrique'
                }

            ],
            types: [
                'text',
                'text',
                'number',
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
            stepper: 0,
            fields: [{
                    key: 'marque',
                    span: 'Marque'
                },
                {
                    key: 'model',
                    span: 'Modèle',
                    sortable: true,
                    sortDirection: 'desc'
                },
                {
                    key: 'immatriculation',
                    span: 'immatriculation'
                },
                {
                    key: 'categorie',
                    span: 'Catégorie'
                },
                {
                    key: 'dateCircule',
                    span: 'dateCircule'
                },
                {
                    key: 'force',
                    span: 'Puissance Fiscale'
                },
                {
                    key: 'nbplace',
                    span: 'Nombre de Place'
                },
                {
                    key: 'valeur',
                    span: 'Valeur Neuf'
                },
                {
                    key: 'valeur_venale',
                    span: 'Valeur venale'
                },
                {
                    key: 'garanties',
                    span: 'garanties'
                }
            ],
            steps: [{
                    span: 'Etape 1',
                    completed: false,
                },
                {
                    span: 'Etape 2',
                    completed: false,
                },
                {
                    span: 'Etape 3',
                    completed: false,
                },
            ],

            show: true
        }

    },

    watch: {
        marque (val) {
            this.onChangeSelectedMarque(val)
            this.onChangeSelectedMarque2roues(val)
        },
    },
    methods: {
        // debut vie 
        devisEuleuk(){
            this.type_devis_vie = "Assur'Euleuk"
            this.e1 = 2
        },
    showCard(){
                this.Zone_text = false
                this.Card_zone = true
                this.hidden = false
                this.e1 = 2
            },
        // fin vie
        /*============= fonction pour controler les garanties tierce a ne cocher plus d'un ===========*/
        tierceControl() {
            let cpt = 0;
            for (let index = 0; index < this.garanties.length; index++) {
                if (this.garanties[index].trim() == 'TIERCE COLLISION' || this.garanties[index].trim() == 'TIERCE PLAFONNEE') {
                    cpt = cpt + 1
                } else if (this.garanties[index].trim() == 'TIERCE COLLISION' || this.garanties[index].trim() == 'TIERCE COMPLETE') {
                    cpt = cpt + 1
                } else if (this.garanties[index].trim() == 'TIERCE COMPLETE' || this.garanties[index].trim() == 'TIERCE PLAFONNEE') {
                    cpt = cpt + 1
                } else if (this.garanties[index].trim() == 'TIERCE COLLISION' || this.garanties[index].trim() == 'TIERCE PLAFONNEE' || this.garanties[index].trim() == 'TIERCE COMPLETE') {
                    cpt = cpt + 2
                }
            }
            if (cpt == 2) {
                this.$toasted.show("Impossible de prendre 2 garanties tierces en même temps", this.ToastTabError);
                this.suivant = true
            } else if (cpt == 3) {
                this.$toasted.show("Impossible de prendre 3 garanties tierces en même temps", this.ToastTabError);
                this.suivant = true
            } else {
                this.ValeurNeufModalFunction()
                this.suivant = false
            }
        },

        ValeurNeufModalFunction() {
            let trouver = 0;
            for (let index = 0; index < this.garanties.length; index++) {
                if (this.garanties[index] == 'TIERCE COMPLETE') {
                    trouver = 1
                } else if (this.garanties[index] == 'TIERCE COLLISION') {
                    trouver = 2
                }
            }
            if (trouver == 1 || trouver == 2) {
                this.VNeuf = true
            } else {
                this.valeur = this.neant
            }
        },

        CheckValeurNeuf: function () {
            let trouver = 0;
            for (let index = 0; index < this.garanties.length; index++) {
                if (this.garanties[index] == 'TIERCE COMPLETE' || this.garanties[index] == 'TIERCE COLLISION') {
                    trouver = 1
                }
            }

            if (trouver == 1 && !this.valeur || this.valeur == 0) {
                this.$toasted.show("Veuiller saisir la valeur à neuf du véhicule ! ", this.ToastTabError)
            } else if (trouver == 1 && this.valeur && this.valeur != 0) {

                if (Number(this.valeur_venale.replace(/[^0-9.-]+/g, "")) <= Number(this.valeur.replace(/[^0-9.-]+/g, ""))) {
                    this.VNeuf = false
                } else {
                    this.$toasted.show('La valeur à neuf et la actuelle du véhicule ne sont pas cohérentes !', this.ToastTabError)
                }
            }
        },

        rechercherClient() {
            Api().get('/user/phone/' + this.telephoneclient)
                .then(resultat => {
                    if (resultat.data.telephone_port === this.telephoneclient) {
                        this.clientOk = true
                        this.clientnonOk = false
                        this.usersearch = resultat.data;
                        this.$store.dispatch('setClient', resultat.data)
                    }

                })
                .catch(e => {
                    this.clientnonOk = true
                    this.clientOk = false
                    this.telephoneC = this.telephoneclient;
                })

        },

        rechercheClientByMail(){
            Api().get('/user/email/' +this.emailclient)
            .then(resultat =>{
                if (resultat.data.email === this.emailclient) {
                        this.clientOk = true
                        this.clientnonOk = false
                        this.usersearch = resultat.data;
                        this.$store.dispatch('setClient', resultat.data)
                    }
            }).catch(e => {
                    this.clientnonOk = true
                    this.clientOk = false
                    this.emailC = this.emailclient;
                })
          
                
        },  

        yearsDiff() {
            const date1 = dayjs(this.dateCircule);
            const date2 = dayjs(new Date().toISOString().substr(0, 10));
            let daydiff = date2.diff(date1, 'days');
            this.age = daydiff
           
           if (this.age <= 29) {
                this.an = this.annee_mois = 'jour(s)'
            } else if (this.age >= 30, this.age <= 360) {
                let year = Math.floor(this.age / 30)
                this.age = year;
                this.an = this.annee_mois = 'mois'
            } else if (this.age >= 360) {
                let year = Math.floor(this.age / 360)
                this.age = year;
                this.an = this.annee_mois = 'an(s)'
            }

        },

        showidclient() {
            this.showId = false
            this.showconfirmclient = true
            this.shownameclient = false

        },

        hidesearch() {
            this.hidesearchClient = false
            this.e1 = 1
        },

        rechercherbyphone() {
            if (this.usersearch.telephone_port === this.telephoneclient) {
                this.clientOk = true
                this.clientnonOk = false

            }
            if (this.usersearch.telephone_port !== this.telephoneclient) {
                this.clientnonOk = true
                this.clientOk = false
                this.telephoneC = this.telephoneclient;

            }
        },

        validMarqueModel() {
            if (this.categorie == '2_roues') {
                if (this.marque && this.model) {
                    this.popupAutre = false
                    this.e1 = 5
                } else {
                    this.$toasted.show('Champs obligatoires ! ', this.ToastTabError)
                }
            } else {
                if (this.marque && this.model) {
                    this.popupAutre = false
                    this.e1 = 4
                } else {
                    this.$toasted.show('Champs obligatoires ! ', this.ToastTabError)
                }
            }
        },

        flotteselect: function () {
            this.hideDive_vehicule = false
        },

        onReset(evt) {
            evt.preventDefault();
            this.user.email = '';
            this.user.name = '';
            this.user.food = null;
            this.user.checked = [];
            this.show = false;
            this.$nextTick(() => {
                this.show = true
            });
        },

        onChangeSelectedMarque: function (mark) {
            if (typeof mark == 'string') {
                if (mark == 'AUTRE') {
                    this.popupAutre = true;
                    this.marque = ''
                } else {
                    let selMarque = _.where(MarqueVehicule, {
                        'Marque': mark
                    })
                    this.listeModeles = _.uniq(selMarque, _.property('Type'))
                    this.selectedMarque = mark
                }
            } 

        },

         onChangeSelectedMarque2roues: function (mark) {
            if (typeof mark == 'string') {
                if (mark == "AUTRE") {
                    this.popupAutre = true;
                    this.marque = ''
                } else {
                    let selMarque = _.where(Marque2roues, {
                        'Marque': mark
                    })
                    this.listeModeles2roues = _.uniq(selMarque, _.property('Type'))
                    this.listeModeles2roues [0] = "AUTRE"
                    this.selectedMarque = mark
                   
                }
            } else if (typeof mark == 'object') {
                if (mark.Marque == 'AUTRE') {
                    this.popupAutre = true;
                    this.marque = ''
                } else {
                    let selMarque = _.where(Marque2roues, {
                        'Marque': mark
                    })
                    this.listeModeles2roues = _.uniq(selMarque, _.property('Type'))
                    this.listeModeles2roues[0] = "AUTRE";
                    this.selectedMarque = mark.Marque
                    this.marque = this.selectedMarque
                    this.selectedMarque = mark
                }
            }

        },

        //liste de touts les partenaires
        getListePartenaire: function () {

            if (this.$store.state.user.role == 'courtier') {
                Api().get('/partenaire/courtier/' + this.$store.state.user.societe._id)
                    .then(response => {
                        this.listeAssureurs = response.data.partenaire[0].assureurs_partenaires
                    }).catch(err => {})
            } else if (this.$store.state.user.role == 'agent général') {
                Api().get('/partenaire/' + this.$store.state.user.societe._id)
                    .then(response => {
                        this.listeAssureurs = response.data.partenaire
                    })
            } else if (this.$store.state.user.role == 'Admin') {
                Api().get('/partenaire/assureur')
                    .then(response => {
                        this.listeAssureurs = response.data.partenaires //.assureurs_partenaires
                    })
            } else if (this.$store.state.user.role == 'assureur') {
                Api().get('/partenaire/' + this.$store.state.user.societe._id)
                    .then(response => {
                        this.listeAssureurs = response.data.partenaire
                    })
            }

        },
        
        HubspotSend(param) 
        {
            let data = {
                "email": param.email,
                "firstname": param.prenom,
                "lastname": param.nom,
                "phone": param.telephone_port,
                "inscrit": "Compte"
            };
            Api().post('/testimonial/hubspot', data)
                .then(resp => {
                    (resp.data)
                })
                .catch(e => {
                    (e)
                })
        },

        MailChimpInscriptionCompte(param) 
        {
            let data = {
                "email": param.email,
                "FNAME": param.prenom,
                "LNAME": param.nom,
                "PHONE": param.telephone_port,
            };
            Api().post('/testimonial/mailchimp', data)
                .then(resp => {
                    (resp.data)
                })
                .catch(e => {
                    (e)
                })
        },
        // Creation d'un user avant de faire son devis
        createuser: function () {

            this.generatePassword()
            if (this.nom && this.prenom && this.datenaissance && this.profession && this.email && this.piece_identite && this.numero_piece) {
                if (this.adresse && this.genre && this.telephoneclient) {
                    const user = {
                        nom: this.nom,
                        prenom: this.prenom,
                        datenaissance: this.datenaissance,
                        profession: this.profession,
                        adresse: this.adresse,
                        sexe: this.genre,
                        telephone_port: this.telephoneclient,
                        email: this.email,
                        password: this.password1,
                        confirmPass: this.password1,
                        role: 'User',
                        photo: this.file,
                        piece_identite: this.piece_identite,
                        numero_piece: this.numero_piece,
                        created: dayjs(new Date()).format('YYYY-MM-DD')
                    }
                    Api().post('user/register', user)
                        .then(resultat => {
                            this.HubspotSend(user)
                            this.MailChimpInscriptionCompte(user)
                            if (resultat.status == 200) {
                                this.$store.dispatch('setClient', resultat.data)
                                this.usersearch = resultat.data
                                this.AddUser = false
                                this.clientnonOk = false
                                this.e1 = 1
                            } else {
                                this.$toasted.show('Ajout utilisateur échoué !', this.ToastTabError)
                            }

                        })
                        .catch(err => {
                            this.$toasted.show('Ajout utilisateur échoué !', this.ToastTabError)
                        })

                } else {
                    this.$toasted.show('Tous les champs sont  obligatoire !', this.ToastTabError)
                }
            } else {
                this.$toasted.show('Tous les champs sont  obligatoire !', this.ToastTabError)
            }

        },

        generatePassword: function () {
            let now = new Date()
            let password = this.nom + this.prenom
            this.password1 = password

        },

        //calclu date echéance
        dateDiff: function () {
            if (this.dateEffet && this.duree) {
                let inter = dayjs(this.dateEffet).add(this.duree, 'month').format('YYYY-MM-DD');
                this.dateEcheance = dayjs(inter).add(-1, 'day').format('YYYY-MM-DD')
            } else {
                this.duree = 1
                this.dateEffet = dayjs(new Date()).format('YYYY-MM-DD');
                let inter = dayjs(this.dateEffet).add(this.duree, 'month').format('YYYY-MM-DD');
                this.dateEcheance = dayjs(inter).add(-1, 'day').format('YYYY-MM-DD')
            }
        },

        Deduction_tonnage_carosserie() {
            if (this.categorie == 'tourisme') {
                this.categorieFInale = 'categorie 1'
            } else if (this.categorie == 'utilitaire' && this.optionUtilitaire == 'materiel_perso') {
                this.categorieFInale = 'categorie 2'
                if (this.tonnage_carosserie == 'Autre carosserie jusqu\'à 3,5 tonnes') {
                    this.tonnage = '3,5 Tonnes'
                    this.carosserie = 'autres carosseries'
                } else if (this.tonnage_carosserie == 'Autre carosserie plus de 3,5 tonnes') {
                    this.tonnage = 'Plus de 3,5 Tonnes'
                    this.carosserie = 'autres carosseries'
                } else if (this.tonnage_carosserie == 'carosserie tourisme') {
                    this.tonnage = '3,5 Tonnes'
                    this.carosserie = 'carosserie tourisme'
                }
            } else if (this.categorie == 'utilitaire' && this.optionUtilitaire == 'materiel_tiers') {
                this.categorieFInale = 'categorie 3'
                if (this.tonnage_carosserie == 'Autre carosserie jusqu\'à 3,5 tonnes') {
                    this.tonnage = '3,5 Tonnes'
                    this.carosserie = 'autres carosseries'
                } else if (this.tonnage_carosserie == 'Autre carosserie plus de 3,5 tonnes') {
                    this.tonnage = 'Plus de 3,5 Tonnes'
                    this.carosserie = 'autres carosseries'
                }
            } else if (this.categorie == '2_roues') {
                this.categorieFInale = 'categorie 5'
            }
        },

        ClearForm: function () {
            this.marque = ''
            this.model = ''
            this.marque = ''
            this.categorie = ''
            this.force = ''
            this.age = ''
            this.nbplace = ''
            this.valeur = ''
            this.valeur_venale = null
            this.immatriculation = ''
            this.proprietaire = ''
            this.carburant = ''
            this.option_Individuel_Accident = null
            this.optionPersoTrans = null
            this.capital_AvRec = null
            this.garanties = ['RESPONSABILITE CIVILE']
        },

        AutreCarburation(carburantChecked) {
            if (carburantChecked == 'Hybride' || carburantChecked == 'Electrique') {
                return 'Essence'
            } else {
                return carburantChecked
            }

        },
        /*================================================================================================================================*/
        /*================================================================================================================================*/
        /*==========CETTE PARTIE EST SPECIALEMENT POUR UNE SERIE DE FONCTION PERMETTANT DE VALIDER LES MODELS POUR CHAQUE STEPPER=========*/
        //Validation des elements du Stepper 1
        Stepper1Validator() {
            if (this.flotte_mono) {
                if (this.flotte_mono === 'flotte') {
                    if (this.nombreVehicules) {
                        this.e1 = 2
                        this.HideNbVehicule = false
                    } else {
                        this.$toasted.show('Nombre de véhicules !', this.ToastTabError)
                    }
                } else {
                    this.e1 = 2
                    this.HideNbVehicule = false
                }
            } else {
                this.$toasted.show('Véhicule individuel ou Flotte automobile obligatoire ', this.ToastTabError)
            }
        },

        //Validation des ellements du Stepper 2
        Stepper2Validator() {
            if (this.categorie) {
                switch (this.categorie) {

                    case '2_roues':
                        if (this.volumetrie2_roues) {
                            //if (this.carburant){
                            this.e1 = 3
                            //}else{
                            //this.$toasted.show('La carburation du véhicule est obligatoire', this.ToastTabError)
                            //}
                        } else {
                            this.$toasted.show('la volumetrie 2 roues est obligatoire ', this.ToastTabError)
                        }
                        break;

                    case 'utilitaire':
                        if (this.optionUtilitaire) {
                            if (this.tonnage_carosserie) {
                                if (this.carburant) {
                                    this.e1 = 3
                                } else {
                                    this.$toasted.show('La carburation du véhicule est obligatoire', this.ToastTabError)
                                }
                            } else {
                                this.$toasted.show('Tonnage et carosserie du véhicule', this.ToastTabError)
                            }
                        } else {
                            this.$toasted.show('Veuillez renseigner le type du véhicule', this.ToastTabError)
                        }
                        break;

                    case 'tourisme':
                        if (this.carburant) {
                            this.e1 = 3
                        } else {
                            this.$toasted.show('La carburation du véhicule est obligatoire', this.ToastTabError)
                        }
                        break;
                }
            } else {
                this.$toasted.show('La categorie du véhicule est obligatoire ', this.ToastTabError)
            }
        },

        //Validation des elements du Stepper 3
        Stepper3Validator() {
            if (this.categorie !== '2_roues') {
                if (this.marque) {
                    if (this.model) {
                        this.e1 = 4
                    } else {
                        this.$toasted.show('Veuillez choisir le model du véhicule! ', this.ToastTabError)
                    }
                } else {
                    this.$toasted.show('Veuillez choisir la marque du véhicule! ', this.ToastTabError)
                }
            } else {
                if (this.marque) {
                    if (this.model) {
                        this.e1 = 5
                    } else {
                        this.$toasted.show('Veuillez choisir le model du véhicule! ', this.ToastTabError)
                    }
                } else {
                    this.$toasted.show('Veuillez choisir la marque du véhicule! ', this.ToastTabError)
                }
            }

        },

        //Validation des elements du Stepper 4
        Stepper4Validator() {
            //this.Deduction_tonnage_carosserie()
            if (this.categorie !== '2_roues') {
                if (this.force) {
                    if (this.age) {
                        if (this.nbplace) {
                            this.e1 = 5
                        } else {
                            this.$toasted.show('Veuiller saisir le nombre de place du véhicule! ', this.ToastTabError)
                        }
                    } else {
                        this.$toasted.show("Veuiller saisir l'age du véhicule!", this.ToastTabError)
                    }
                } else {
                    this.$toasted.show('Veuiller saisir la puissance du véhicule! ', this.ToastTabError)
                }
            } else {
                if (this.age) {
                    if (this.nbplace) {
                        this.e1 = 5
                    } else {
                        this.$toasted.show('Le nombre de place du véhicule est obligatoire! ', this.ToastTabError)
                    }
                } else {
                    this.$toasted.show("L'age du véhicule est obligatoire!", this.ToastTabError)
                }
            }
            
        },

        //Validation des elements du Stepper 5
        Stepper5Validator() {
            if (!this.$store.state.isUserLoggedIn) {
                this.switch1 = false
            }
            if (this.categorie == '2_roues') {
                if (this.immatriculation) {
                    this.e1 = 6
                } else {
                    this.$toasted.show('Veuiller saisir l\'immatriculation du véhicule!', this.ToastTabError)
                }
            } else {
                if (this.valeur_venale && Number(this.valeur_venale.replace(/[^0-9.-]+/g, "")) >= configAuto.valeurNeufMinimal_Autre_categorie) {
                    if (this.immatriculation) {
                        this.e1 = 6
                    } else {
                        this.$toasted.show("Veuiller saisir l'immatriculation du véhicule!", this.ToastTabError)
                    }
                } else {

                    this.$toasted.show('Veuiller saisir la valeur actuelle du véhicule!', this.ToastTabError)
                }
             }
        },

        /*================================================================================================================================*/
        /*================================================================================================================================*/
        /*================================================================================================================================*/
        /*=================Creation d'une liste de vehicules pour affichage Recap===============*/
        ListAutoCreate: function () 
        {
            this.Deduction_tonnage_carosserie()
        
            const Oneauto = {
                tonnage: this.tonnage,
                categorie: this.categorieFInale,
                volumetrie2_roues: this.volumetrie2_roues,
                marque: this.marque,
                carosserie: this.carosserie,
                model: this.model,
                force: this.force,
                dateCircule: this.dateCircule, 
                nbplace: this.nbplace,
                garanties: this.garanties,
                flotte_mono: this.flotte_mono,
                immatriculation: this.immatriculation
            }


            if (this.capital_AvRec != null) {
                Oneauto.capitalAvRec = Number(this.capital_AvRec.replace(/[^0-9.-]+/g, ""))
            }

            if (this.categorie !== '2_roues') 
            {
                try {
                        
                    Oneauto.categorie   = this.categorieFInale,
                    Oneauto.tonnage     = this.tonnage,
                    Oneauto.optionUtilitaire  = this.optionUtilitaire,
                    Oneauto.volumetrie2_roues = this.volumetrie2_roues,
                    Oneauto.optionPersoTrans  = this.optionPersoTrans,
                    Oneauto.carburation     = this.AutreCarburation(this.carburant),
                    Oneauto.marque          = this.marque,
                    Oneauto.carosserie      = this.carosserie,
                    Oneauto.model           = this.model,
                    Oneauto.force           = this.force,
                    Oneauto.dateCircule     = this.dateCircule,
                    Oneauto.age             = this.age,
                    Oneauto.annee_mois      = this.annee_mois,
                    Oneauto.nbplace         = Number(this.nbplace),
                    Oneauto.valeur          = this.testVar(this.valeur),
                    Oneauto.valeur_venale   = Number(this.valeur_venale.replace(/[^0-9.-]+/g, "")),
                    Oneauto.immatriculation = this.immatriculation,
                    Oneauto.flotte_mono     = this.flotte_mono,
                    Oneauto.option_Individuel_Accident = this.option_Individuel_Accident,
                    Oneauto.garanties                  = this.garanties
                } catch (error) {
                    console.log(error)
                }
            }else{
                Oneauto.nbplace = 2
                Oneauto.valeur = 0
                Oneauto.valeur_venale = 0
            }

            this.ListAuto.push(Oneauto)

            this.nbAutoAdded = this.nbAutoAdded + 1

            this.ClearForm()
            if (this.nombreVehicules > 1) {
                if (this.nbAutoAdded < this.nombreVehicules) {
                    this.e1 = 2
                }
                if (this.nbAutoAdded == this.nombreVehicules) {
                    this.e1 = 7
                }
            } else {
                this.voidField = true
                this.e1 = 7
            }
        },
        
        testVar:function(val){
             if (val!=null)
            {
                return Number(val.replace(/[^0-9.-]+/g, ""));
            } else {
                return "0";
            }
        },

        SendData: function () {
            if (this.dateEffet) {
                if (this.assureurs.length >= 1) {
                    const OneautoToSave = {
                        userid: this.usersearch._id,
                        proprietaire: {
                            prenom: this.usersearch.prenom,
                            nom: this.usersearch.nom
                        },
                        dateEffet: dayjs(this.dateEffet).format('YYYY-MM-DD'),
                        dateEcheance: this.dateEcheance,
                        createur: this.$store.state.user._id,
                        branche: "Automobile",
                        duree: this.duree,
                        dateSouscription: dayjs(new Date()).format('YYYY-MM-DD'),
                        vehicule: this.ListAuto,
                        assureurs: this.assureurs,
                    }

                    if (this.$store.state.user.role == 'courtier') {
                        OneautoToSave.courtierid = this.$store.state.user.societe
                    }
                   
                    Api().post('devis/add', OneautoToSave)
                        .then(result => {
                            if (result.data.message) {
                                this.$store.dispatch('setDevis', result.data)
                                this.$router.go(this.$router.push({
                                    name: 'Listepaiement'
                                }))
                            }
                        })

                } else {
                    this.$toasted.show("Choisissez au minimum un assureur !", this.ToastTabError)
                }
            } else {
                this.$toasted.show("La date d'effet est obligatoire !", this.ToastTabError)
            }
        }
    },
    mounted() {

        if (store.state.isUserLoggedIn && store.state.user.role !== 'User') {
            this.getListePartenaire();
            this.listMarque = _.uniq(MarqueVehicule, _.property('Marque'))
            this.listeModeles = _.uniq(MarqueVehicule, _.property('Type'))
            this.listeMarque2roues = _.uniq(Marque2roues, _.property(('Marque')))
            this.listeModeles2roues = _.uniq(Marque2roues, _.property('Type'))

            this.duree = 1
        } else {
            this.$router.go(this.$router.push('/login'))
        }

    }
}
</script>

<style scoped>
.btnvalider {
    background-color: #4dbd74;
    color: white;
}

.btnvalider:hover {
    background-color: #ffa409;
}

.input-number {
    width: 30% !important;
}

.lightgrey {
    background: lightgray;
    color: white;
    border-radius: 50% !important;
    text-align: center !important;
}

.lightblue {
    background: dodgerblue;
    color: white;
    border-radius: 40% !important;
    text-align: center !important;
}

.trait {
    height: 2px !important;
    padding: 2px !important;
    background: dodgerblue;
    width: 6% !important;
    margin-top: 3%;
}
</style>
