<template>
<div>

    <b-card title="" header-tag="header" footer-tag="footer">
        <h5 slot="header" class="mb-0"><i class="fa fa-home" /> CREER DEVIS HABITATION <span><img src="" alt=""></span>
        </h5>

        <div class="m-2">
            <div v-if="hidesearchClient">

                <b-card header-bg-variant="transparent">
                    <div><strong>RECHERCHER CLIENT</strong></div>

                    <div class="col-sm-4 mt-3">

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
                                <b-button @click="rechercherbyphone"><i class="fa fa-search" style="color: #ffa409"></i></b-button>
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

                    </div>

                </b-card>

                <div>

                    <b-alert variant="success" v-if="clientOk" show>
                        <div v-if="shownameclient">
                            Client : {{usersearch.nom+' '+usersearch.prenom}}
                            <b-btn variant="outline-warning" size="sm" class=" ml-2 font-weight-bold" @click="showidclient">Créer le devis pour ce client ?</b-btn>

                        </div>
                        <hr>
                        <div v-if="showconfirmclient">
                            <b-text>Vous aller créer un devis pour le client {{usersearch.nom+' '+usersearch.prenom}} </b-text>
                            <b-btn variant="outline-warning" class=" ml-2 font-weight-bold" @click="hidesearch">OK</b-btn>

                        </div>

                        <b-input v-show="showId" v-model="usersearch._id" id="" class=" mb-sm-0 "></b-input>

                    </b-alert>

                    <b-alert v-if="clientnonOk" show variant="primary">Ce client n'existe pas
                        <b-btn @click="AddUser=true" variant="outline-warning" size="sm" class=" ml-2 font-weight-bold">cliquez pour ajouterle nouveau client </b-btn>
                    </b-alert>
                </div>

                <!--popup added by cheikh-->
                <b-modal v-model="AddUser" size="xl" title="Creer client" header-text-variant="orange" style="height: 50%">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <b-card color="light" class="mb-1">
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
                        </b-card>
                        <b-card class="mb-1">
                            <div class="row">

                                <div class="col-sm-3">
                                    <label for="">Date naissance </label>
                                    <date-picker v-model="datenaissance" :config="optionsdateUser" required placeholder="JJ/MM/AAAA"></date-picker>
                                </div>

                                <div class="col-sm-3">
                                    <label for="">Profession </label>
                                    <b-form-input type="text" v-model="profession" label="Profession" required></b-form-input>
                                </div>

                                <div class="col-sm-3">
                                    <label for=""> Adresse </label>
                                    <b-form-input type="text" v-model="adresse" label="Telephone bureau" required></b-form-input>
                                </div>

                                <div class="col-sm-3">
                                    <label for="">Sexe </label>
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
                                    <label for="">Type piece identite </label>
                                    <b-form-select v-model="piece_identite">
                                        <option value="carte_cni">Carte CNI</option>
                                        <option value="passeport">Passeport</option>
                                    </b-form-select>
                                </div>

                                <div class="col-sm-3">
                                    <label for="">Numero de piece </label>
                                    <b-form-input type="number" v-model="numero_piece" label="Adresse " required></b-form-input>
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

        <div class="row justify-center" v-if="e1>0 && isMobile()==false">

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

        <div v-if="e1==1" class="row border ml-2 mr-2 mt-3 pt-2 pb-2 rounded">

            <div class="col-sm-3">
                <b-form-group label="Le bien à assurer (*)">
                    <b-form-radio v-model="naturelogement" name="some-radios" value="appartement">Appartement</b-form-radio>
                    <b-form-radio v-model="naturelogement" name="some-radios" value="maison">Maison</b-form-radio>
                </b-form-group>
            </div>

            <div class="col-sm-4">
                <label for="">Nombre de pieces (*)</label>
                <b-form-input id="" type="number" placeholder="Nombre de pieces" v-model="nombrepiece"></b-form-input>
            </div>

            <div class="col-sm-2" v-if="naturelogement === 'appartement' && seen">
                <label for="">Superficie (en m2)</label>
                <b-form-input id="" type="number" placeholder="surface developpée" v-model="nombreetage"></b-form-input>
            </div>

            <div class="col-sm-2" v-if="naturelogement === 'maison' && seen">
                <label for="">Superficie (en m2)</label>
                <b-form-input id="" type="number" placeholder="surface developpée" v-model="nombreetage"></b-form-input>
            </div>

            <div class="col-sm-12 mt-3">
                <b-btn variant="outline-warning" class="col-sm-3 ml-1 rounded" @click="Stepper1Validator()">
                    <i class="fas fa-chevron-circle-right"></i>
                    Suivant
                </b-btn>
            </div>

        </div>

        <div v-if="e1==2" class="row border ml-2 mr-2 mt-3 pt-2 pb-2 rounded">
            <div class="col-sm-4">
                <label for="">Selectionner un type de toiture (*)</label>
                <b-form-select v-model="naturecouverture" :options="optionstoiture"></b-form-select>
            </div>

            <div class="col-sm-4">
                <label for="">Environnement immmédiat (*)</label>
                <b-form-select v-model="environnement_immediat" :options="optionsenvi"></b-form-select>
            </div>

            <div class="col-sm-4">
                <label for="">Adresse du logement (*)</label>
                <b-form-input type="text" placeholder="" v-model="adresselogement"></b-form-input>
            </div>

            <div>
            </div>

            <div class="col-sm-12 mt-3">
                <b-btn variant="outline-warning" class="col-sm-3 ml-1 mt-1 rounded" @click="e1=1">
                    <i class="fas fa-chevron-circle-left"></i>
                    Retour
                </b-btn>
                <b-btn variant="outline-warning" class="col-sm-3 ml-1 mt-1 rounded" @click="Stepper2Validator()">
                    <i class="fas fa-chevron-circle-right"></i>
                    Suivant
                </b-btn>
            </div>

        </div>

        <div v-if="e1==3" class="row border ml-2 mr-2 mt-3 pt-2 pb-2 rounded">

            <div class="col-sm-4 mt-3">
                <b-form-group>
                    <b-form-radio v-model="qualiteassure" name="locataire" value="locataire">Locataire</b-form-radio>
                    <b-form-radio v-model="qualiteassure" name="proprietaire" value="Proprietaire_et_occupant">Propriétaire occupant</b-form-radio>
                    <b-form-radio v-model="qualiteassure" name="proprietairenon" value="Proprietaire_non_occupant" disabled="true">Propriétaire non-occupant (Nous consulter)</b-form-radio>
                </b-form-group>
            </div>

            <div class="col-sm-4 mt-3" v-if="qualiteassure === 'locataire'">
                <label for="">Montant du loyer (*)</label>
                <b-form-input v-money="money" v-model="montantLoyer"></b-form-input>
            </div>

            <div class="col-sm-12 mt-2">
                <b-btn variant="outline-warning" class="rounded col-sm-2 mt-1 ml-1" @click="e1=2">
                    <i class="fas fa-chevron-circle-left"></i>
                    Retour
                </b-btn>

                <b-btn variant="outline-warning" class="col-sm-2 mt-1 ml-1 rounded" @click="Stepper3Validator()">
                    <i class="fas fa-chevron-circle-right"></i>
                    Suivant
                </b-btn>
            </div>

        </div>

        <div v-if="e1==4" class="row border ml-2 mr-2 mt-3 pt-2 pb-2 rounded">
            <div class="col-sm-4">
                <label for="">Valeur du contenu à garantir (*)</label>
                <b-form-input v-money="money" v-model="valeurcontenu"></b-form-input>
            </div>

            <div class="col-sm-4">
                <label for="">Valeur du batiment (*)</label>
                <b-form-input  v-model="valeurbatiment" v-if="valeurbatiment"></b-form-input>
                <b-form-input v-money="money" v-model="valeurbatiment" v-else></b-form-input>
            </div>

            <!-- <div>

            </div> -->

            <div class="col-sm-12 mt-2">
                <b-btn variant="outline-warning" class="rounded col-sm-2 mt-1 ml-1" @click="e1=3">
                    <i class="fas fa-chevron-circle-left"></i>
                    Retour
                </b-btn>

                <b-btn variant="outline-warning" class="col-sm-2 mt-1 ml-1 rounded" @click="Stepper4Validator()">
                    <i class="fas fa-chevron-circle-right"></i>
                    Suivant
                </b-btn>
            </div>

        </div>

        <div v-if="e1==5" class="row border ml-2 mr-2 mt-3 pt-2 pb-2 rounded">

            <div class="col-sm-10 ml-3">
                <strong> Garanties principales </strong>
                <b-form-checkbox-group id="" v-model="garanties" name="">
                    <b-form-checkbox v-model="garanties" value="BRIS DE GLACES">Bris de glace</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="RESPONSABILITE CIVILE">Responsabilité civile</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="INCENDIE">Incendie</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="ASSISTANCE DOMICILE">Assistance à domicile</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="DOMMAGES ELECTRIQUES">Dommages électriques</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="DEGAT DES EAUX">Dégat des eaux</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="VOL">Vol</b-form-checkbox>
                </b-form-checkbox-group>
            </div>

            <div class="col-sm-10 ml-3 mt-3">
                <strong> Autre garanties </strong>
                <b-form-checkbox-group id="" v-model="garanties">
                    <b-form-checkbox v-model="garanties" value="REMPLACEMENT SERRURES">Remplacement serrures</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="RESPONSABILITE CIVILE VOYAGE">RC voyage</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="RESPONSABILITE CIVILE ANIMAUX">RC animaux</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="RESPONSABILITE CIVILE SPORT">RC sport</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="RESPONSABILITE CIVILE CHASSE">RC chasse</b-form-checkbox>
                    <b-form-checkbox v-model="garanties" value="ASSURANCE SCOLARITE">Assurance scolarité</b-form-checkbox>
                </b-form-checkbox-group>
            </div>

            <div class="col-sm-12 col-md-12 border">
                
                <div class="row mt-4 ml-1 mr-1 border">
                    <div class="col-sm-12 ml-2"> <strong>ASSUREURS</strong> </div>
                    <b-form-checkbox class="col-sm-1 ml-4 mt-2 pr-4" v-for="assur in listeAssureurs" :key="assur.societe" v-model="assureurs" :value="assur.societe">
                        {{assur.societe}} <img width="40" height="40" :src="assur.logo">
                    </b-form-checkbox>
                </div>

                <div class="row mt-1 p-2 border ma-2">

                    <div class="col-sm-12 col-md-4">
                        <label for="">Durée de garanties(en mois)</label>
                        <b-form-input id="" type="number" v-model="duree" readonly></b-form-input>
                    </div>

                    <div class="col-sm-12 col-md-4">
                        <label for="">Date effet</label>
                        <date-picker v-model="dateEffet" @dp-change="dateDiff()" :config="optionsdate" placeholder="JJ/MM/AAAA"></date-picker>
                    </div>

                    <div class="col-sm-12 col-md-4">
                        <label for="">Date échéance</label>
                        <b-form-input v-model="dateEcheance"></b-form-input>
                    </div>

                </div>
            </div>
        </div>

        <em slot="footer">
            <b-button class="btnvalider" @click="ListHabitationCreate">Valider</b-button>
        </em>

    </b-card>
</div>
</template>

<script>
import store from '../../store/index'
import Api from '../../services/Api'
import pays from '../../common/countries'
import dayjs from 'dayjs'
import {
    error
} from 'util';

export default {
    name: "createdevishabitation",
    data() {
        return {
            optionsdate: {
                minDate: new Date(),
                format: 'YYYY/MM/DD',
                useCurrent: false,
            },
            optionsdateUser: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
                defaultDate: (dayjs(new Date()).add(-19, 'year')).toDate(),
                maxDate: (dayjs(new Date()).add(-18, 'year')).toDate()
            },
            money: {
                thousands: ' ',
                precision: false,
                masked: false
            },
            clientnonOk: false,
            clientOk: false,
            clientsearch: null,
            telephoneC: null,
            showId: false,
            duree: null,
            e1: 0,
            showconfirmclient: false,
            recupIdClient: '',
            shownameclient: true,
            hidesearchClient: true,
            seen: true,
            naturelogement: '',
            nombrepiece: '',
            nombreetage: '',
            naturecouverture: '',
            username: null,
            telephoneclient: null,

            nom: null,
            prenom: null,
            email: null,
            datenaissance: null,
            profession: null,
            AddUser: false,
            adresse: null,
            piece_identite: null,
            numero_piece: null,
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
            adresselogement: '',
            assureurs: [],
            Assureur_si_courtier: null,
            valeurcontenu: '',
            usersearch: null,
            valeurbatiment: '',
            qualiteassure: '',
            proprietaire: 'ASSURAF',
            dateEcheance: null,
            dateEffet: '',
            emailclient: null,
            emailC: this.emailclient,
            notifMessage: '',
            montantLoyer: null,
            listeAssureurs: [],
            liste_type_secu: [],
            garanties: [],
            vol: null,
            items_toiture: ['Tuile (ardoise)', 'Tôle metal', 'paille', ],
            autredommage: [],
            quartierresi: '',
            items_environ_immediat: ['Chantiers a proximité', 'Proche Usine/Marche/Station Essence'],
            environnement_immediat: null,
            selecttoiture: null,
            optionstoiture: [{
                    value: 'Béton',
                    text: 'Béton '
                },
                {
                    value: 'Tuile (ardoise)',
                    text: 'Tuile (ardoise)'
                },
                {
                    value: 'Tôle metal',
                    text: 'Tôle metal'
                },
                {
                    value: 'Tôle metal',
                    text: 'paille'
                },
            ],
            optionsenvi: [{
                value: 'Quartier résidentiel',
                    text: 'Quartier résidentiel '
                },
                {
                    value: 'Chantiers a proximité',
                    text: 'Chantiers a proximité'
                },
                {
                    value: 'Proche Usine/Marche/Station Essence',
                    text: 'Proche Usine/Marche/Station Essence'
                },
            ]

        }

    },
    methods: {
         isMobile: function () {
            if (screen.width <= 760) {
                return true
            }else {
                return false
            }
        },
        
        //calcul de la valeur du batiment a partir du montant du loyer si c'est locataire
        calculeValeurBatiment() {
            if(this.qualiteassure === 'locataire'){
                let VB = this.montantLoyer && Number(this.montantLoyer.replace(/[^0-9.-]+/g, ""))
                let fac = 180
                let Total = VB * fac
                this.valeurbatiment = Total.toLocaleString()
            }
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

        RoundToMillion(num) {
          var parts = num.split(" ");
          var fac = Math.pow(1000, parts.length - 1)
          return (Math.ceil(parseInt(parts.join("")) / fac) * fac)
        },

        showidclient() {
            this.showId = false
            this.showconfirmclient = true
            this.shownameclient = false
            this.e1 = 1
        },
        hidesearch() {
            this.hidesearchClient = false
        },
        coto: function () {
            this.$router.go(this.$router.push({
                name: 'paiement'
            }))
        },
        ClearForm: function () {
            this.naturelogement = '',
                this.nombrepiece = '',
                this.nombreetage = '',
                this.naturecouverture = '',
                this.adresselogement = '',
                this.valeurcontenu = '',
                this.valeurbatiment = '',
                this.qualiteassure = '',
                this.dateEcheance = '',
                this.dateEffet = '',
                this.montantLoyer = '',
                this.listeAssureurs = [],
                this.liste_type_secu = '',
                this.garanties = []
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
            if (this.dateEffet === '' & this.duree === '') this.dateEcheance = ''
            let inter = dayjs(this.dateEffet).add(this.duree, 'month').format('YYYY-MM-DD')
            this.dateEcheance = dayjs(inter).add(-1, 'day').format('YYYY-MM-DD')
        },

        /*=============================================================================*/
        /*========Stepper 1 fields validator===========*/
        Stepper1Validator() {
            if (this.naturelogement) {
                if (this.nombrepiece) {
                    if (this.nombreetage) {
                        this.e1 = 2
                    } else {
                        this.$toasted.show("Veuiller saisir le nombre d'étage ou niveau", this.ToastTabError)
                    }
                } else {
                    this.$toasted.show('Veuiller saisir le nombre de pièce', this.ToastTabError)
                }
            } else {
                this.$toasted.show('Nature du logement obligatoire', this.ToastTabError)
            }
        },

        /*========Stepper 2 fields validator===========*/
        Stepper2Validator() {
            if (this.naturecouverture) {
                if (this.environnement_immediat) {
                    if (this.adresselogement) {
                        this.e1 = 3
                    } else {
                        this.$toasted.show("Veuiller saisir l'adresse du logement!", this.ToastTabError)
                    }
                } else {
                    this.$toasted.show('Environnement immédiat obligatoire !', this.ToastTabError)
                }
            } else {
                this.$toasted.show('Type de toiture du logement obligatoire', this.ToastTabError)
            }
        },

        /*========Stepper 3 fields validator===========*/
        Stepper3Validator() {
            if (this.qualiteassure) {
                if (this.qualiteassure == 'locataire') {
                    if (this.montantLoyer && Number(this.montantLoyer.replace(/[^0-9.-]+/g, "")) >= 50000) {
                        this.e1 = 4
                        this.calculeValeurBatiment()
                    } else {
                        this.$toasted.show('Veuiller saisir le montant du loyer!', this.ToastTabError)
                    }
                } else {

                    this.e1 = 4
                }

            } else {
                this.$toasted.show("Qualité de l'assuré obligatoire !", this.ToastTabError)
            }

        },

        /*========Stepper 4 fields validator===========*/
        Stepper4Validator() {

            if (this.valeurcontenu && Number(this.valeurcontenu.replace(/[^0-9.-]+/g, "")) >= 10000) {
                if (this.valeurbatiment && Number(this.valeurbatiment.replace(/[^0-9.-]+/g, "")) >= 10000) {
                    this.e1 = 5
                } else {
                    this.$toasted.show('Valeur du bâtiment obligatoire !', this.ToastTabError)
                }
            } else {
                this.$toasted.show('Valeur du contenu à garantir obligatoire !', this.ToastTabError)
            }
        },

        /*=============================================================================*/

        ListHabitationCreate: function () {
            if (this.assureurs.length > 0) {
                if (this.dateEffet) {
                    const Habitation = {
                        userid: this.usersearch._id,
                        proprietaire: {
                            prenom: this.usersearch.prenom,
                            nom: this.usersearch.nom
                        },
                        typeBien: this.naturelogement,
                        nombrepiece: this.nombrepiece,
                        nombreetage: this.nombreetage,
                        naturecouverture: this.naturecouverture,
                        adresselogement: this.adresselogement,
                        valeurcontenu: this.RoundToMillion(this.valeurcontenu),
                        valeurbatiment: (Number(this.valeurbatiment.replace(/[^0-9.-]+/g, ""))),
                        superficie: this.nombreetage,
                        qualiteassure: this.qualiteassure,
                        environnement_immediat: this.environnement_immediat,
                        dateSouscription: dayjs(new Date()).format('YYYY-MM-DD'),
                        assureurs: this.assureurs,
                        garanties: this.garanties,
                        createur: this.$store.state.user._id,
                        branche: 'Habitation',
                        dateEffet: this.dateEffet,
                        dateEcheance: this.dateEcheance
                    }

                    if (this.$store.state.user.role == 'courtier') {
                        Habitation.courtierid = this.$store.state.user.societe
                    }

                    if (this.montantLoyer) {
                        Habitation.montaLoyer = Number(this.montantLoyer.replace(/[^0-9.-]+/g, ""))
                    }

                    Api().post('devis/add', Habitation)
                        .then(reslutat => {
                            this.$store.dispatch("setDevis", reslutat.data)
                            this.$router.go(this.$router.push({
                                name: 'Listepaiement'
                            }))
                        })

                } else {
                    this.$toasted.show("La date d'effet est obligatoire !", this.ToastTabError)
                }

            } else {
                this.$toasted.show('Choisissez au moins un assureur !', this.ToastTabError)
            }

        },
        rechercherClient() {
            Api().get('/user/phone/' + this.telephoneclient)
                .then(resultat => {
                    if (resultat.data) {
                        if (resultat.data.telephone_port === this.telephoneclient) {
                            this.clientOk = true
                            this.clientnonOk = false
                            this.usersearch = resultat.data;
                            this.$store.dispatch('setClient', resultat.data)
                        }
                    }
                })
                .catch(error => {
                    this.clientnonOk = true
                })
        },

        rechercherbyphone() {

            this.rechercherClient()
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
    },
    mounted() {
        this.duree = 12
        if (store.state.isUserLoggedIn && store.state.user.role !== 'User') {
            this.getListePartenaire()
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

.lightgrey {
    background: lightgray;
    color: white;
    border-radius: 50% !important;
    text-align: center !important;
}

.lightblue {
    background: dodgerblue;
    color: white;
    border-radius: 50% !important;
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
