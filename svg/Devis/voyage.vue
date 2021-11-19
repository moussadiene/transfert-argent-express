<template>
<div>
    <b-card title="" header-tag="header" footer-tag="footer">
        <h5 slot="header" class="mb-0"><i class="fa fa-plane" /> CREER DEVIS VOYAGE <span><img src="/src/assets/img/pictoassvoyage.png" alt=""></span></h5>
        <div class="col">
            <div v-if="hidesearchClient">
                <div><strong>RECHERCHER CLIENT</strong></div>

                <b-card header-bg-variant="transparent">
                    <div class="col">

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
                        <div class="mt-2" v-if="shownameclient" style="height:30px!important">
                            Client : {{usersearch.nom+' '+usersearch.prenom}}
                            <b-btn variant="outline-warning" size="sm" class=" ml-2 font-weight-bold" @click="showidclient">
                                Créer le devis pour ce client ?
                            </b-btn>
                        </div>
                        
                        <div v-if="showconfirmclient" style="height:30px!important">
                            <b-text>Vous aller créer un devis pour le client {{usersearch.nom+' '+usersearch.prenom}} </b-text>
                            <b-btn variant="outline-warning" class=" ml-2 font-weight-bold" @click="hidesearch">OK</b-btn>
                        </div>

                        <b-input v-show="showId" v-model="usersearch._id" class=" mb-sm-0 "></b-input>

                    </b-alert>

                    <div v-if="clientnonOk">
                        <b-alert show variant="primary">Ce client n'existe pas
                            <b-btn @click="AddUser=true" variant="outline-warning" size="sm" class=" ml-2 font-weight-bold">
                                cliquez pour ajouterle nouveau client
                            </b-btn>
                        </b-alert>

                        <div>
                            <!--popup added by cheikh-->
                            <b-modal v-model="AddUser" size="xl" title="Creer client" header-text-variant="orange" style="height: 50%">
                                <v-form ref="form"  lazy-validation>
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
                                                <date-picker v-model="datenaissance" :config="optionsdateUser" required></date-picker>
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

                </div>
            </div>

            <div v-if="hideForm">
                <div><strong>DESTINATION</strong></div>
                <div class="row m-2">
                    <div class="col-sm-12 col-md-6">
                        <label for="">Pays d'origine</label>
                        <b-form-input v-model="pays_domicile" readonly placeholder="Pays d'origine"></b-form-input>
                    </div>
                   
                    <div class="col-sm-12 col-md-6">
                        <label for="">Pays de déstination</label>
                        <b-form-select v-model="destination">
                            <option v-for="items in listpays" :value="items" :key="items.PAYS">{{items.PAYS}}</option>
                        </b-form-select>
                    </div>
                </div>
            </div>
            <div v-if="hideForm">
                <hr>

                <div> 
                    <div><strong>DUREE</strong></div>
                    <div class="row m-2">

                       <div class="col-sm-12 col-md-4">
                            <label for="">Date de départ</label>
                            <date-picker v-model="dateDepart" :config="optionsdateDepart" placeholder="JJ/MM/AAAA"></date-picker>
                        </div>

                        <div class="col-sm-12 col-md-4">
                            <label for="">Date de retour</label>
                            <date-picker v-model="dateArrivee" :config="optionsdateArrivee" placeholder="JJ/MM/AAAA" @dp-change="DurationCalculation()"></date-picker>

                        </div>
                      
                        <div class="col-sm-12 col-md-4">
                            <label for="">Nombre de passagers</label>
                            <b-form-input @change="remplissage_passager" type="number" min="1" v-model="nbpassager"></b-form-input>
                        </div>

                    </div>

                    <div class="row m-2 mt-3">

                        <div class="col-sm-12 col-md-4">
                            <label for="">Date Effet</label>
                            <date-picker v-model="dateEffet" disabled @dp-change="dateDiff" :config="optionsdateDepart" placeholder="JJ/MM/AAAA"></date-picker>
                        </div>

                        <div class="col-sm-12 col-md-4">
                            <label for="">Date Echeance</label>
                            <date-picker v-model="dateEcheance" disabled :config="optionsdateArrivee" placeholder="JJ/MM/AAAA"></date-picker>

                        </div>
                        <div class="col-sm-12 col-md-4">
                            <label for="">Duree du voyage (en jours)</label>
                            <b-form-input v-model="duree" disabled  placeholder="Nombre de jours"></b-form-input>

                        </div>

                    </div> 


                    <div class="row ml-2 p-4 mt-3 border">
                        <div>
                        <b-form-radio v-model="remboursable" name="Non_remboursable" value="Non_remboursable">Non Remboursable</b-form-radio>
                        </div>
                        <div class="ml-5">
                            <b-form-radio v-model="remboursable" name="Remboursable" value="remboursable">Remboursable</b-form-radio>
                        </div>
                    </div>
                    
                
                    

                </div>
                <hr>
                <div ><strong>INFO PASSAGERS</strong></div>

                <hr>

                <div >
                    <div><strong>VALIDATION</strong></div>
                    <div class="m-2">
                        <label for="">Assureurs</label>
                        <div class="row ml-3">
                            <b-form-checkbox class="col-sm-1 ml-4 pr-4" v-for="assur in listeAssureurs" :key="assur.societe" v-model="assureurs" :value="assur.societe">
                                {{assur.societe}} <img width="50" height="40" :src="assur.logo">
                            </b-form-checkbox>
                        </div>
                    </div>
                </div>

                <hr>
                <br>

                <em slot="footer" class="mt-3">
                    <b-button variant="outline-warning" class="btnvalider" size="lg" @click="createdevisvoyage">Valider</b-button>
                </em>
            </div>
        </div>

        <b-modal id="modal-xl" size="lg" title="Liste des passager" v-model="popupListePassager">
            <v-card class="mb-5 p-4">

                <v-form ref="Adresse" lazy-validation>

                    <div class="w-20 ml-2">
                        <label for="">Date de naissance du passager</label>
                        <date-picker v-model="datenaissancePassager" :config="PassengerBirthOptionsdate" placeholder="JJ/MM/AAAA"></date-picker>
                    </div>

                    <b-button variant="outline-warning" class="mt-2 ml-2" @click="CreateListPassager">
                        <i class="fa fa-add_circle"></i> Ajouter
                    </b-button>
                </v-form>

                <div class="row mt-3">
                    <div class="col">
                        <b-table bordered striped small show-empty stacked="md" :items="listPassager" :fields="enteteTabPassager"></b-table>
                    </div>
                </div>

            </v-card>

            <div slot="modal-footer" class="w-100" v-show="nexted">
                <b-button variant="outline-warning" size="sm" class="float-right" @click="popupListePassager=false">Continuer</b-button>
            </div>

        </b-modal>

    </b-card>

</div>
</template>

<script>
import store from '../../store/index'
import Api from '../../services/Api'
import pays from '../../common/countries'
import dayjs from 'dayjs'

export default {
    name: "createdevisvoyage",

    data() {
        return {
            remboursable:null,
            optionsdateDepart: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
                minDate: new Date(),
            },

            optionsdateArrivee: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
                minDate: new Date(),
            },
            PassengerBirthOptionsdate: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
            },
            optionsdateUser: {
                format: 'YYYY/MM/DD',
                useCurrent: false,
                defaultDate: (dayjs(new Date()).add(-19, 'year')).toDate(),
                maxDate: (dayjs(new Date()).add(-18, 'year')).toDate()
            },
            countriesSn: 'Sénégal',
            telephoneC: null,
            showId: false,
            nom: null,
            prenom: null,
            email: null,
            duree: null,
            profession:null,
            genre:null,
            datenaissance: null,
            AddUser: false,
            adresse: null,
            piece_identite: null,
            numero_piece: null,
            emailclient: null,
            emailC: this.emailclient,
            showconfirmclient: false,
            recupIdClient: '',
            shownameclient: true,
            hidesearchClient: true,
            hideForm: false,
            popupListePassager: false,
            steps: [{
                    label: 'Etape 1',
                    completed: false,
                },
                {
                    label: 'Etape 2',
                    completed: false,
                },
                {
                    label: 'Etape 3',
                    completed: false,
                },
            ],
            clientnonOk: false,
            clientOk: false,
            clientsearch: null,
            adulte_enfant: null,
            seen: true,
            selected: [],
            nexted: false,
            selectpays: '',
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
            listpays: pays,
            dateDepart: null,
            dateEffet: null,
            dateEcheance: null,
            pays_domicile: null,
            dateArrivee: null,
            nbpassager: null,
            garantie: [],
            age: null,
            assureurs: [],
            listpaysprime: [],
            usersearch: [],
            telephoneclient: '',
            destination: null,
            listeAssureurs: [],
            listvoyage: [],
            listPassager: [],
            datenaissancePassager: null,
            listgarantie: [{
                    text: 'RC',
                    value: 'RC'
                },
                {
                    text: 'incendie',
                    value: 'incendie'
                },
                {
                    text: 'avance recours',
                    value: 'avance recours'
                },
                {
                    text: 'defense recours',
                    value: 'defense recours'
                },
                {
                    text: 'Bris Glaces',
                    value: 'Bris Glaces'
                },
                {
                    text: 'Tierce complete',
                    value: 'Tierce complete'
                },
                {
                    text: 'Tierce collision',
                    value: 'Tierce collision'
                },
                {
                    text: 'vol',
                    value: 'vol'
                },
                {
                    text: 'personnes transportees',
                    value: 'personnes transportees'
                },
            ],
            enteteTabPassager: [{
                    key: 'adulte_enfant',
                    label: 'Adulte / Enfant'
                },
                {
                    key: 'age_passager',
                    label: 'Age passager'
                },
            ],

            items: [{
                    text: 'homme'
                },
                {
                    text: 'femme'
                },
            ]
        }

    },
    methods: {
        /*Passenger Age calculation based on passenger birthday*/
        PassengerAgeCalculation() {
            let TodayDate = new Date()
            this.age = dayjs(TodayDate).diff(this.datenaissancePassager, 'year')

            let PassengerObject = {
                birthday: this.PassengerBirthday,
                age: this.age
            }
            localStorage.setItem('passenger-birthady-age', JSON.stringify(PassengerObject))
            return PassengerObject.age
        },

        DurationCalculation() {
            this.dateEffet = this.dateDepart
            let date_tmp =  dayjs(this.dateArrivee).diff(this.dateDepart, 'day')
            this.duree = date_tmp + 1  //dayjs(this.dateArrivee).diff(this.dateDepart, 'day')
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

        createuser: function () 
        {
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
                        .then(resultat => 
                        {
                            this.HubspotSend(user)
                            this.MailChimpInscriptionCompte(user)
                            if (resultat.status == 200) {
                                this.$store.dispatch('setClient', resultat.data)
                                this.usersearch = resultat.data
                                this.AddUser = false
                                this.clientnonOk = false
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
            this.dateEcheance = dayjs(this.dateEffet).add(this.duree, 'day').format('YYYY-MM-DD')
        },
        
        rechercherClient() {
            Api().get('/user/phone/' + this.telephoneclient)
                .then(resultat => {
                    if (resultat.data) {
                        if (resultat.data.telephone_port === this.telephoneclient) {
                            this.usersearch = resultat.data;
                            this.$store.dispatch('setClient', resultat.data)
                            this.clientOk = true
                            this.clientnonOk = false
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

        showidclient() {
            this.showId = false
            this.showconfirmclient = true
            this.shownameclient = false
        },

        hidesearch() {
            this.hidesearchClient = false
            this.hideForm = true
        },

        createdevisvoyage: function () {
            if(this.remboursable && this.dateDepart && this.dateArrivee && this.assureurs.length>0)
            {

                 const voyage = {
                    user: this.usersearch._id,
                    assureurs: this.assureurs,
                    createur: this.$store.state.user._id,
                    nbpassager: this.nbpassager,
                    dateDepart: this.dateDepart,
                    dateArrivee: this.dateArrivee,
                    dateEffet: dayjs(this.dateEffet).format('YYYY-MM-DD'),
                    dateEcheance: dayjs(this.dateArrivee).format('YYYY-MM-DD'),
                    duree: this.duree,
                    destination: this.destination,
                    dateSouscription: dayjs(new Date()).format('YYYY-MM-DD'),
                    pays_domicile: this.pays_domicile,
                    listPassager: this.listPassager,
                    branche: 'Voyage',
                    mode_remboursement: this.remboursable,
               }
    
                if (this.$store.state.user.role == 'courtier') {
                    voyage.courtierid = this.$store.state.user.societe
                }
            this.listvoyage.push(voyage);

            Api().post('devis/add', voyage)
                .then(reslutat => {
                    this.$store.dispatch("setDevis", reslutat.data)
                    this.$router.go(this.$router.push({
                        name: 'Listepaiement'
                    }))
                })
            }else{
                 this.$toasted.show('Remplissez tous les champs vide !', this.ToastTabError)
            }

        },

        getListePays: function () {
            Api().get('/pays')
                .then(response => {
                    this.listpays = response.data
                })
                .catch(err => {
                    err
                })
        },

        CreateListPassager: function () {

            if (this.datenaissancePassager) {
                let ageP = this.PassengerAgeCalculation()
                if (ageP <= 18) {
                    this.adulte_enfant = "enfant"
                } else if (ageP > 18) {
                    this.adulte_enfant = "adulte"
                }

                if (this.listPassager.length < this.nbpassager) {
                    
                    let Unpassager = {
                        'adulte_enfant': this.adulte_enfant,
                        'age_passager': ageP,
                        'dateNaissance': this.datenaissancePassager
                    }

                    this.listPassager.push(Unpassager)
                    this.age = null
                    this.adulte_enfant = null,
                    this.datenaissancePassager = null

                    if (this.listPassager.length <= this.nbpassager) {
                        this.nexted = true
                    }

                } else {
                    this.$toasted.show('Tous les passagers ont été ajouté !', this.ToastTabError)
                }

            } else {
                this.$toasted.show('Remplissez tous les champs vide !', this.ToastTabError)
            }
        },
        remplissage_passager() {
            this.popupListePassager = true
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
                        this.listeAssureurs = response.data.partenaires
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
        
        this.pays_domicile = this.countriesSn;
        if (store.state.isUserLoggedIn && store.state.user.role !== 'User') {
            this.getListePays()
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

.btni {
    font-size: 16px;
    /* Set a font size */
    cursor: pointer;
    /* Mouse pointer on hover */
    border-width: 0 0px 0px 0px;
    border-radius: 2px;

}
</style>
