<template>
    <v-container class="bg-white" fluid grid-list-sm>
        
        <div>
            <section v-if="bottomPushNotif" class="sectionPush">
                <div class="notification">
                    <div class="justify-content-center row">
                        <div class="mb-2">
                            <p style="font-weight: bold">Durée</p>
                            <h5 id="valeur">{{duree}}</h5>
                        </div>

                        <div class="ml-5 mb-2" v-show="Mensualite">
                            <p style="font-weight: bold">Durée de service</p>
                            <h5 id="valeur">{{Duree_bourse}}</h5>
                        </div>

                        <div class="ml-5 mb-2" v-show="Mensualite">
                            <p style="font-weight: bold">Prime</p>
                            <h5 v-if="Calculated_response!=null" id="valeur">{{choixCapital.Mensuel}}</h5>
                        </div>

                        <div class="ml-5 mb-2" v-show="Capital">
                            <p style="font-weight: bold">Bourse Souhaitée</p>
                            <h5 id="valeur">{{choixCapital.Capital}}</h5>
                        </div>

                        <div class="ml-5 mb-2" v-show="Capital">
                            <p style="font-weight: bold">Prime</p>
                            <h5 id="valeur">{{monthly_payment}}</h5>
                        </div>

                        <div class="ml-5 mb-2" v-show="Mensualite">
                            <p style="font-weight: bold">Bourse annuelle</p>
                            <h5 v-if="Calculated_response!=null" id="valeur">{{Calculated_response.toLocaleString()}}</h5>
                        </div>

                        <div class="ml-5 mb-2" v-show="Capital">
                            <p style="font-weight: bold">Bourse annuelle</p>
                            <h5 id="valeur">{{choixCapital.Capital}}</h5>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- ===================    DEBUT DE LA PARTIE UNIQUEMENT POUR LE DESKTOP      =============== -->
        <!-- =                      SACHANT QUE LE CODE EST ASSEZ LONG, IL CONVIENT                  = -->
        <!-- =                      DE BIEN INDENTER LE CODE POUR UNE BONNE LISIBILITE               = -->
        <!-- ========================================================================================= -->
        <v-layout align-end class="content-justify bg-white text-center" justify-content-center row style="margin-bottom:10%" wrap >
            <v-flex class="justify-content-center row" pb-3 xs12>
                <v-stepper v-model="e1" class="elevation-0 pa-0">
                    <v-stepper-header class="row elevation-0" style="width: 850px!important;display: inline-flex">
                        <v-stepper-step color="#ffa409" :complete="e1 > 1" step="1">Simulation</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step color="#ffa409" :complete="e1 > 2" step="2">Contractant</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step color="#ffa409" :complete="e1 > 3" step="3">Assuré</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step color="#ffa409" :complete="e1 > 4" step="4">Bénéficiaire</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step color="#ffa409" :complete="e1 > 5" step="5">Médical</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step color="#ffa409" :complete="e1 > 6" step="6">Récapitulatif</v-stepper-step>
                    </v-stepper-header>
                 
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-layout class="mb-5 column" height="200px" elevation="24">
                                <v-flex class="justify-content-center ml-2 mb-3">
                                    <div class="row">
                                        <div class="col-lg-12 col-xs-12" style="text-align: center;">
                                            <button @click="switchCapital" type="button" class="swith-click switchbutton active" id="btnOne">Bourse annuelle</button>
                                            <button @click="switchMensuel" type="button" class="swith-click ml-3 switchbutton" id="btnTwo">Prime mensuelle</button>
                                        </div>
                                    </div>
                                </v-flex>

                                <v-flex class="justify-content-center row mb-3 ml-1 mr-1">
                                    <div class="justify-content-center column" style="background:#EFEFEF;width:1200px!important;height:auto;border-radius: 30px;box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);" v-show="Capital">
                                        <div class="justify-content-center row" style="margin: 10px">
                                            <div class="mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>1</p>
                                                            </span>
                                                <h5 id="titre">DATE NAISSANCE ASSURÉ</h5>
                                                <date-picker @change="yearsDiff()" id="input-number" wrapper-class="test" class="mt-4" style="border:none;padding-top:4px;padding-right:10px;width:100%!important;color:#C9224D!important" v-model="dateNaiss" placeholder="Date de naissance" valueType="format" format="YYYY-MM-DD" lang="fr-fr"></date-picker>
                                            </div>
                                            <div class="ml-2 mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>2</p>
                                                            </span>
                                                <h5 id="titre">DATE NAISSANCE BÉNÉFICIAIRE</h5>
                                                <date-picker @change="yearsDiffBenef()" id="input-number" class=" mt-4" style="border:none;padding-top:4px;padding-right:10px;width:100%!important;color:#C9224D" v-model="BenefiFields.dateNaissance" placeholder="Date de naissance" valueType="format" format="YYYY-MM-DD" lang="fr-fr"></date-picker>
                                            </div>
                                            <div class="ml-2 mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>3</p>
                                                            </span>
                                                <h5 id="titre">BOURSE SOUHAITÉE</h5>
                                                <input v-money="money" @keyup="CalculCapitalRente()" style="margin-top:42px" class="input-number" v-model="choixCapital.Capital" type="text" placeholder="Saisir le capital">
                                            </div>
                                            <div class="ml-2 mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>4</p>
                                                            </span>
                                                <h4 id="titre">DURÉE COTISATION <span style="font-size:12px">(années)</span></h4>
                                                <input @change="CheckFieldChange()" style="margin-top:22px" class="input-number" v-model="duree" type="number" placeholder="Saisir la durée">
                                            </div>
                                            <div class="ml-2 mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>5</p>
                                                            </span>
                                                <h4 id="titre">DURÉE DE BOURSE</h4>
                                                <div class="select" id="input-number" style="margin-top:42px">
                                                    <select @change="CheckFieldChange()" name="slct" id="slct" v-model="Duree_bourse" label="Nombre d'année">
                                                        <option value="null" selected disabled>Nombre d'année</option>
                                                        <option value="3">3 ans</option>
                                                        <option value="4">4 ans</option>
                                                        <option value="5">5 ans</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="justify-content-center row" v-if="monthly_payment!=null">
                                            <div class="mt-5 mb-3 justify-content-center row" style="background: #fff;border-radius: 20px;width: 250px">
                                                <h4>
                                                    <p> Prime mensuelle </p>
                                                </h4>
                                                <h3 style="font-weight: bold;color:#ffa409">
                                                    {{monthly_payment.toLocaleString()}} FCFA
                                                </h3>
                                                <!--<v-text-field v-money="money" v-model="Capi" style="display: none!important" disabled></v-text-field>-->
                                            </div>
                                        </div>
                                        <div>
                                            <p class="font-weight-bold" style="color: #5a5a5a">Une bourse annuelle de <span style="color: #DC143C">{{ choixCapital.Capital }} CFA</span> sera versée en cas sinistre (décès/invalidité) jusqu’à <span style="color: #DC143C">1 an</span> avant terme du contrat.
                                                <br>
                                                <!--En plus du capital de <span style="color: #DC143C">{{ choixCapital.Capital }} CFA </span>qui est garanti au terme du contrat.-->
                                                En plus d'une bourse annuelle garantie de <span style="color: #DC143C">{{ choixCapital.Capital }} CFA </span> pendant <span style="color: #DC143C">{{ Duree_bourse }} ans </span> au terme du contrat.
                                            </p>
                                        </div>
                                        <button v-if="Simule" class="mb-3 button ml-3" @click="fieldsControl">Simuler</button>
                                        <button v-if="SkipSimule" class="mb-3 button ml-3" @click="DevisNextStep()">Continuer</button>
                                    </div>

                                    <div class="justify-content-center column" style="background:#EFEFEF;width:1200px!important;height:auto;border-radius: 30px;box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);" v-show="Mensualite">
                                        <div class="justify-content-center row" style="margin: 10px">
                                            <div class="mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>1</p>
                                                            </span>
                                                <h4 id="titre">DATE NAISSANCE ASSURÉ</h4>
                                                <date-picker @change="yearsDiff()" id="input-number" class=" mt-4" style="border:none;padding-top:4px;padding-right:10px;width:100%!important;" v-model="dateNaiss" placeholder="Date de naissance" valueType="format" format="YYYY-MM-DD" lang="fr-fr"></date-picker>
                                            </div>
                                            <div class="ml-2 mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>2</p>
                                                            </span>
                                                <h5 id="titre">DATE NAISSANCE BÉNÉFICIAIRE</h5>
                                                <date-picker @change="yearsDiffBenef()" id="input-number" class=" mt-4" style="border:none;padding-top:4px;padding-right:10px;width:100%!important;color:#C9224D" v-model="BenefiFields.dateNaissance" placeholder="Date de naissance" valueType="format" format="YYYY-MM-DD" lang="fr-fr"></date-picker>
                                            </div>
                                            <div class="ml-2 mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>3</p>
                                                            </span>
                                                <h4 id="titre">PRIMES SOUHAITÉES</h4>
                                                <input v-money="money" @keyup="CheckFieldChange()" class="input-number" v-model="choixCapital.Mensuel" style="margin-top:45px" type="text" placeholder="Saisir la mensualité">
                                            </div>
                                            <div class="ml-2 mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>4</p>
                                                            </span>
                                                <h4 id="titre">DURÉE COTISATION <span style="font-size:12px">(années)</span></h4>
                                                <input @change="CheckFieldChange()" class="input-number" style="margin-top: 24px" v-model="duree" type="number" placeholder="Saisir la durée">
                                            </div>
                                            <div class="ml-2 mb-2" style="width: 200px">
                                                            <span id="circle_number">
                                                                <p>5</p>
                                                            </span>
                                                <h4 id="titre">DURÉE DE BOURSE</h4>
                                                <div class="select" id="input-number" style="margin-top:42px">
                                                    <select @change="CheckFieldChange()" name="slct" id="slct" v-model="Duree_bourse">
                                                        <option value="null" selected disabled>Nombre d'année</option>
                                                        <option value="3">3 ans</option>
                                                        <option value="4">4 ans</option>
                                                        <option value="5">5 ans</option>
                                                    </select>
                                                </div>
                                                <!--<input @change="CheckFieldChange()" style="margin-top:42px" class="input-number" v-model="duree" type="number" placeholder="Saisir la durée">-->
                                            </div>
                                        </div>
                                        <div class="justify-content-center row"  v-if="Calculated_response!=null">
                                            <div class="mt-5 mb-3 justify-content-center row" style="background: #fff;border-radius: 20px;width: 250px">
                                                <h4>Bourse annuelle</h4>
                                                <h3 style="font-weight: bold;color:#ffa409">
                                                    {{ Calculated_response.toLocaleString() }} FCFA
                                                </h3>
                                            </div>
                                            <!--<v-text-field v-money="money" v-model="Mensu" style="display: none!important" disabled></v-text-field>
                                           <v-text-field v-money="money" v-model="Calculated_response" style="display: none!important" disabled></v-text-field>-->
                                        </div>
                                        <div>
                                            <p class="font-weight-bold" style="color: #5a5a5a">
                                                Une bourse annuelle de
                                                <span style="color: #DC143C" v-if="Calculated_response!=null">
                                                            {{ Calculated_response.toLocaleString() }} CFA
                                                            </span> sera versée en cas sinistre (décès/invalidité) jusqu’à <span style="color: #DC143C">1 an</span> avant terme du contrat.
                                                <br>
                                                En plus d'une bourse annuelle garantie de
                                                <span style="color: #DC143C"  v-if="Calculated_response!=null">
                                                              {{ Calculated_response.toLocaleString() }} CFA
                                                            </span>
                                                pendant <span style="color: #DC143C">{{ Duree_bourse }} ans </span> au terme du contrat.
                                            </p>
                                        </div>
                                        <button v-if="Simule" class="mb-3 button ml-3" @click="fieldsControl">Simuler</button>
                                        <button v-if="SkipSimule" class="mb-3 button ml-3" @click="DevisNextStep()">Continuer</button>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <div class="container">
                                <article class="justify-content-center row">
                                    <!-- =================== PARTIE CONTRACTANT =================
                                         =================== PARTIE CONTRACTANT =================
                                         =================== PARTIE CONTRACTANT ================= -->
                                    <section :class="animation" style="background: #efefef" v-if="isContractant">
                                        <h2>{{ formSteps[activeStep].title }}</h2>
                                        <div class="input-fields" >
                                            <div class="justify-content-center column">
                                                <div class="justify-content-center row">
                                                    <p>
                                                        <input v-model="ContractantFields.Genre" value="homme" type="radio" id="test1" name="radio-group34">
                                                        <label for="test1">Monsieur</label>
                                                    </p>
                                                    <p class="ml-2">
                                                        <input v-model="ContractantFields.Genre" value="femme" type="radio" id="test2" name="radio-group34">
                                                        <label for="test2">Madame</label>
                                                    </p>
                                                </div>

                                                <div class="justify-content-center row">
                                                    <p>
                                                        <input v-model="ContractantFields.Situation" value="marié" type="radio" id="test6" name="radio-group2" checked>
                                                        <label for="test6">Marié(e)</label>
                                                    </p>
                                                    <p class="ml-2">
                                                        <input v-model="ContractantFields.Situation" value="célibataire" type="radio" id="test7" name="radio-group2">
                                                        <label for="test7">Célibataire</label>
                                                    </p>

                                                    <p class="ml-2">
                                                        <input v-model="ContractantFields.Situation" value="veuf" type="radio" id="test8" name="radio-group2">
                                                        <label for="test8">Veuf(ve)</label>
                                                    </p>

                                                    <p class="ml-2">
                                                        <input v-model="ContractantFields.Situation" value="divorce" type="radio" id="test9" name="radio-group2">
                                                        <label for="test9">Divorcé(e)</label>
                                                    </p>
                                                </div>
                                                <v-divider></v-divider>

                                                <div class="justify-content-center row">
                                                    <p class="mr-3">Tranche Revenu annuel :</p>
                                                    <p>
                                                        <input v-model="ContractantFields.revenu_annuel" value="moins de 10" type="radio" id="test10" name="radio-group3">
                                                        <label for="test10">moins de <span class="font-weight-bold" style="color:#ffa409">10</span> millions</label>
                                                    </p>
                                                    <p class="ml-2">
                                                        <input v-model="ContractantFields.revenu_annuel" value="entre 10 et 30" type="radio" id="test11" name="radio-group3">
                                                        <label for="test11">entre <span class="font-weight-bold" style="color:#ffa409">10</span> et <span class="font-weight-bold" style="color:#ffa409">30</span> millions</label>
                                                    </p>

                                                    <p class="ml-2">
                                                        <input v-model="ContractantFields.revenu_annuel" value="plus de 30" type="radio" id="test12" name="radio-group3">
                                                        <label for="test12">plus de <span class="font-weight-bold" style="color:#ffa409">30</span> millions</label>
                                                    </p>
                                                </div>

                                                <div class="justify-content-center row ml-1">
                                                    <p class="mr-3">Tranche de Patrimoine :</p>
                                                    <p>
                                                        <input v-model="ContractantFields.patrimoine" value="moins de 50" type="radio" id="test13" name="radio-group4" checked>
                                                        <label for="test13">moins de <span class="font-weight-bold" style="color:#ffa409">50</span> millions</label>
                                                    </p>
                                                    <p class="ml-2">
                                                        <input v-model="ContractantFields.patrimoine" value="entre 50 et 150" type="radio" id="test14" name="radio-group4">
                                                        <label for="test14">entre <span class="font-weight-bold" style="color:#ffa409">50</span> et <span class="font-weight-bold" style="color:#ffa409">150</span> millions</label>
                                                    </p>

                                                    <p class="ml-2">
                                                        <input v-model="ContractantFields.patrimoine" value="plus de 150" type="radio" id="test15" name="radio-group4">
                                                        <label for="test15">plus de <span class="font-weight-bold" style="color:#ffa409">150</span> millions</label>
                                                    </p>
                                                </div>

                                                <v-divider></v-divider>
                                            </div>

                                            <div class="justify-content-center row" style="width: 1000px;height: 500px">
                                                <div class="justify-content-center row" style="margin-top: -2%">
                                                    <div class="input-group">
                                                        <input v-model="ContractantFields.Nom" type="text" required="required">
                                                        <label>Nom :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="ContractantFields.Prenom" value=""  type="text" required="required">
                                                        <label>Prenom :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                </div>

                                                <div class="justify-content-center row" style="margin-top: -12%">
                                                    <div class="input-group">
                                                        <label>Date de naissance :</label>
                                                        <date-picker class="mt-2" style="float:right;display:flex;right: 33px;position: relative;z-index: 2" @change="yearsDiffContractant()" v-model="ContractantFields.dateNaissance" placeholder="Cliquer ici" valueType="format" format="YYYY-MM-DD" lang="fr-fr"></date-picker>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="ContractantFields.LieuNaissance" value=""  type="text" required="required">
                                                        <label>Lieu de naissance :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>

                                                <div class="justify-content-center row" style="margin-top: -13%">
                                                    <div class="input-group">
                                                        <input v-model="ContractantFields.Profession" value=""  type="text" required="required">
                                                        <label>Profession :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="ContractantFields.Adresse" value=""  type="text" required="required">
                                                        <label>Adresse :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>

                                                <div class="justify-content-center row" style="margin-top: -14%">
                                                    <div class="input-group">
                                                        <input @keypress="onlyNumber" v-model="ContractantFields.Telephone" type="number" required="required">
                                                        <label>Téléphone :</label>
                                                        <div class="req-mark">!</div>
                                                        <div id="error">{{ errors.phone }}</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="ContractantFields.Email" value=""  type="email" required="required">
                                                        <label>Email :</label>
                                                        <div class="req-mark">!</div>
                                                        <div id="error">{{ errors.email }}</div>
                                                    </div>

                                                    <div class="ml-3" style="margin-top: -6%;width: 100%">
                                                        <div class="input-group ml-5" style="float: left">
                                                            <input @keypress="onlyNumber" v-model="ContractantFields.Cni" value=""  type="number" required="required">
                                                            <label>CNI :</label>
                                                            <div class="req-mark">!</div>
                                                        </div>

                                                        <div class="input-group ml-3" style="float: left">
                                                            <input v-model="ContractantFields.Nationalite" value=""  type="text" required="required">
                                                            <label>Nationalité :</label>
                                                            <div class="req-mark">!</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3" style="margin-top: -5%">
                                            <button class="button-blue" @click="e1=1">Retour</button>
                                            <button v-if="activeStep + 1 < formSteps.length -1" class="button ml-3" @click="ContractControl()">Continuer</button>
                                        </div>
                                    </section>
                                </article>
                            </div>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <div class="container">
                                <article class="justify-content-center row">
                                    <!-- =================== PARTIE ASSURE =================
                                         =================== PARTIE ASSURE =================
                                         =================== PARTIE ASSURE ================= -->
                                    <section :class="animation" style="background: #efefef" v-if="isAssure">
                                        <h2>{{ formSteps[activeStep].title }}</h2>
                                        <div class="input-fields" >
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title">Le contractant est l’assuré</h4>
                                                </div>
                                                <div class="panel-body">
                                                    <label class="switch"> NON
                                                        <input v-model="checkbox" type="checkbox" value="false" @change="toggleCheckbox">
                                                        <div class="slider round"></div>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="justify-content-center row" style="width: 1000px;height: 500px">
                                                <div class="justify-content-center row">
                                                    <div class="input-group">
                                                        <input v-model="AssureFields.Nom" value=""  type="text" required="required">
                                                        <label>Nom :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="AssureFields.Prenom" value=""  type="text" required="required">
                                                        <label>Prenom :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>

                                                <div class="justify-content-center row" style="margin-top: -11%">
                                                    <div class="input-group">
                                                        <input :disabled="disableDateAssure" v-model="AssureFields.dateNaissance" value="" type="text" required="required" @change="yearsDiffAssure()">
                                                        <label>Date de naissance :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="AssureFields.LieuNaissance" value=""  type="text" required="required">
                                                        <label>Lieu de naissance :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>

                                                <div class="justify-content-center row" style="margin-top: -12%">
                                                    <div class="input-group">
                                                        <input v-model="AssureFields.Profession" value=""  type="text" required="required">
                                                        <label>Profession :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="AssureFields.Adresse" value=""  type="text" required="required">
                                                        <label>Adresse :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>

                                                <div class="justify-content-center row" style="margin-top: -13%">
                                                    <div class="input-group">
                                                        <input @keypress="onlyNumber" v-model="AssureFields.Telephone" value=""  type="number" required="required">
                                                        <label>Téléphone :</label>
                                                        <div class="req-mark">!</div>
                                                        <div id="error">{{ errors.phone }}</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="AssureFields.Email" value=""  type="text" required="required">
                                                        <label>Email :</label>
                                                        <div class="req-mark">!</div>
                                                        <div id="error">{{ errors.email }}</div>
                                                    </div>
                                                </div>

                                                <div style="margin-top: -14%;float: left!important;width: 100%">
                                                    <div class="input-group ml-5" style="float: left">
                                                        <input v-model="AssureFields.LieuExe" value=""  type="text" required="required">
                                                        <label>Lieu d'exercice profession :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3" style="float: left">
                                                        <input v-model="AssureFields.Nationalite" value=""  type="text" required="required">
                                                        <label>Nationalité :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3" style="margin-top: -12%">
                                            <button class="button-blue" @click="BackToStep1">Retour</button>
                                            <button v-if="activeStep + 1 < formSteps.length -1" class="button ml-3" @click="AssureControl()">Continuer</button>
                                        </div>
                                    </section>
                                </article>
                            </div>
                        </v-stepper-content>

                        <v-stepper-content step="4">
                            <div class="container">
                                <article class="justify-content-center row">
                                <!-- =================== PARTIE BENEFICIAIRE =================
                                =================== PARTIE BENEFICIAIRE =================
                                =================== PARTIE BENEFICIAIRE ================= -->
                                    <section :class="animation" style="background: #efefef" v-if="isBenef">
                                        <h2>{{ formSteps[activeStep].title }}</h2>
                                        <div class="input-fields" >
                                            <div class="justify-content-center row mt-2 mb-2" style="width: 1000px;height: 500px">
                                                <div class="justify-content-center row">
                                                    <div class="input-group">
                                                        <input v-model="BenefiFields.Nom" value=""  type="text" required="required">
                                                        <label>Nom :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="BenefiFields.Prenom" value="" type="text" required="required">
                                                        <label>Prenom :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>

                                                <div class="justify-content-center row" style="margin-top: -15%">
                                                    <div class="input-group">
                                                        <input disabled v-model="BenefiFields.dateNaissance" value="" type="text" required="required" @change="yearsDiffAssure()">
                                                        <label>Date de naissance :</label>

<!--
                                                        <date-picker disabled class="mt-2" style="float:right;display:flex;right: 33px;position: relative;z-index: 2" v-model="BenefiFields.dateNaissance" @change="yearsDiffBenef()" placeholder="Cliquer ici"  valueType="format" format="YYYY-MM-DD" lang="fr-fr"></date-picker>
-->
                                                        <div class="req-mark">!</div>
                                                    </div>

                                                    <div class="input-group ml-3">
                                                        <input v-model="BenefiFields.LieuNaissance" value="" type="text" required="required">
                                                        <label>Lieu de naissance :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>
                                                <div style="margin-top: -20%;float: left!important;width: 100%">
                                                    <div class="input-group ml-5" style="float: left">
                                                        <select v-model="BenefiFields.Filiation" class="mr-5 mt-2 select-css">
                                                            <option></option>
                                                            <option value="fils_fille">Fils/Fille</option>
                                                            <option value="frere_soeur">Frère/Soeur</option>
                                                            <option value="neveu_niece">Neveu/Niece</option>
                                                            <option value="cousin_e">Cousin(e)</option>
                                                            <option value="autres">Autres (adoptive,...)</option>
                                                        </select>
                                                        <label>Filiation :</label>
                                                        <div class="req-mark">!</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="margin-top: -25%"><button class="button-blue" @click="BackToStep2">Retour</button>
                                            <button v-if="activeStep + 1 < formSteps.length -1" class="button ml-3" @click="BenefControl()">Continuer</button>
                                        </div>
                                    </section>
                                </article>
                            </div>
                        </v-stepper-content>

                        <v-stepper-content step="5">

                        <div class="container">
                            <article class="justify-content-center row">
                                <!-- =================== PARTIE QUESTIONNAIRE-SUITE =================
                                     =================== PARTIE QUESTIONNAIRE-SUITE =================
                                     =================== PARTIE QUESTIONNAIRE-SUITE ================= -->
                                <section :class="animation" style="background: #efefef" v-if="QuestionnaireSuite">
                                    <h2>{{ formSteps[activeStep].title }}</h2>
                                    <div class="input-fields">
                                        <div class="justify-content-center row" style="width: 1000px;height: auto">
                                            <div id="container-question">
                                                
                                                <!-- 0e page -->
                                                <div v-if="QuestionNext.Q">
                                                    <!--Question-->
                                                    <div class="labels">
                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                            {{question_0.num +' - '+question_0.principal_question}}
                                                        </label>
                                                    </div>

                                                    <div class="justify-content-center row">
                                                        <div class="input-group ml-3">
                                                            <input v-model="question_0.resp_taille" value="" type="number" required="required">
                                                            <label>Votre taille en cm</label>
                                                            <div class="req-mark">!</div>
                                                        </div>
                                                        <div class="input-group ml-3">
                                                            <input v-model="question_0.resp_poid" value=""  type="number" required="required">
                                                            <label>Votre poid en kg</label>
                                                            <div class="req-mark">!</div>
                                                        </div>
                                                    </div>

                                                    <div class="mt-5">
                                                        <button class="button-blue" @click="BackToBenefForm()">Retour</button>
                                                        <button class="button ml-3" @click="QuestionControlSuiteStep1()">Suivant</button>
                                                    </div>

                                                </div>
                                                
                                                <!-- 1e page -->
                                                <div class="container" v-if="first_page">
                                                    <div class="justify-content-center row mb-3" style="margin-top: -15px!important">
                                                        <h4 class="font-weight-bold"><span style="color: #ffa409">1</span>/5</h4>
                                                    </div>
                                                    <div class="row p-2 rounded" v-if="QuestionNext.Q1">
                                                        <div class="justify-content-center column">
                                                            <!--Question-->
                                                            <div class="labels">
                                                                <label id="history" style="font-size: 15px;font-weight: bold">
                                                                    {{question_1.num +' - '+question_1.principal_question}}
                                                                </label>
                                                            </div>

                                                            <!-- Choix -->
                                                            <div class="inputs">
                                                                <v-radio-group row v-model="question_1.principal_response" @click="QuestionControlSuiteStep2">
                                                                    <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                    <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                </v-radio-group>
                                                            </div>

                                                            <!-- Response -->
                                                            <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_1.principal_response =='oui'">
                                                                <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                    <v-textarea @keyup="QuestionControlSuiteStep2" class="input-group-textarea" label="Précisez son importance :" v-model="question_1.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 20px!important"></v-textarea>
                                                                </div>
                                                            </div>
                                                            <v-divider></v-divider>
                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q2">
                                                        <!--Question-->
                                                        <div class="labels pl-4 pr-4 ml-2 mr-2">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_2.num +' - '+question_2.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_2.principal_response" @click="QuestionControlSuiteStep3">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_2.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep3" class="input-group-textarea" label="Précisez : " v-model="question_2.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q3">
                                                        <!--Question-->
                                                        <div class="labels pl-3 pr-3 ">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_3.num +' - '+question_3.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_3.principal_response" @click="QuestionControlSuiteStep4">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_3.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-3 mr-3 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep4" class="input-group-textarea" label="Quantités journalières : " v-model="question_3.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>

                                                    </div>

                                                    <div v-if="QuestionNext.Q4">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels pl-3 pr-3">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_4.num +' - '+question_4.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_4.principal_response" @click="QuestionControlSuiteStep5">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column mr-5 pr-5 ml-4"  v-if="question_4.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-3 mr-3 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep5" class="input-group-textarea" label="Quantités journalières :" v-model="question_4.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q5">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_5.num +' - '+question_5.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_5.principal_response" @click="QuestionControlSuiteStep6">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column mr-5 pr-5 ml-5 pl-5"  v-if="question_5.principal_response =='oui'">
                                                            <div class="justify-content-center row mr-5 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep6" class="input-group-textarea" label="Localisations (indiquer s’il y a eu perte de connaissance), séquelles : " v-model="question_5.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div v-if="QuestionNext.Q6">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_6.num +' - '+question_6.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_6.principal_response" @click="QuestionControlSuiteStep7">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column mr-5 pr-5 ml-5 pl-5" v-if="question_6.principal_response =='oui'">
                                                                        <div class="justify-content-center row mr-5 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep7" class="input-group-textarea" label="Depuis quand - motif - date de reprise prévisible : " v-model="question_6.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="QuestionNext.Q7">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_7.num +' - '+question_7.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_7.principal_response" @click="QuestionControlSuiteStep8">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column mr-5 pr-5 ml-4 pl-4"  v-if="question_7.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-3 mr-3 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep8" class="input-group-textarea" label="Quand - durée de chaque arrêt - motif : " v-model="question_7.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="mt-2" v-if="buttons">
                                                        <button class="button-blue" @click="QuestionControlSuiteBack()">Retour</button>
                                                        <button class="button ml-3" @click="nextPage()">Suivant</button>
                                                    </div>
                                                </div>

                                                <!-- 2e page -->
                                                <div class="container" v-if="second_page">
                                                    <div class="justify-content-center row mb-3" style="margin-top: -15px!important">
                                                        <h4 class="font-weight-bold"><span style="color: #ffa409">2</span>/5</h4>
                                                    </div>
                                                    <div class="row p-2 rounded" v-if="QuestionNext.Q8">
                                                        <div class="justify-content-center column">
                                                            <!--Question-->
                                                            <div class="labels">
                                                                <label id="history" style="font-size: 15px;font-weight: bold">
                                                                    {{question_8.num +' - '+question_8.principal_question}}
                                                                </label>
                                                            </div>

                                                            <!-- Choix -->
                                                            <div class="inputs">
                                                                <v-radio-group row v-model="question_8.principal_response" @click="QuestionControlSuiteStep9">
                                                                    <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                    <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                </v-radio-group>
                                                            </div>

                                                            <!-- Response ml-4 mr-5 pr-5-->
                                                            <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_8.principal_response =='oui'">
                                                                <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                    <v-textarea @keyup="QuestionControlSuiteStep9" class="input-group-textarea" label="Depuis quand - motif – taux d’invalidité (préciser à titre civil ou militaire) : " v-model="question_8.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                </div>
                                                            </div>
                                                            <v-divider></v-divider>
                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q9">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_9.num +' - '+question_9.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_9.principal_response" @click="QuestionControlSuiteStep10">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_9.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep10" class="input-group-textarea" label="Depuis quand - motif – taux d’invalidité (préciser à titre civil ou militaire) : " v-model="question_9.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q10">
                                                        <!--Question-->
                                                        <div class="labels pl-4 pr-4">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_10.num +' - '+question_10.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_10.principal_response" @click="QuestionControlSuiteStep11">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_10.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep11" class="input-group-textarea" label="Lesquels - Depuis quand et pourquoi ? " v-model="question_10.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>

                                                    </div>

                                                    <div v-if="QuestionNext.Q11">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_11.num +' - '+question_11.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_11.principal_response" @click="QuestionControlSuiteStep12">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_11.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep12" class="input-group-textarea" label="Lesquels - Depuis quand et pourquoi ?" v-model="question_11.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q12">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_12.num +' - '+question_12.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_12.principal_response" @click="QuestionControlSuiteStep13">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_12.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep13" class="input-group-textarea" label="Dates – durées - motifs, résultats : " v-model="question_12.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div v-if="QuestionNext.Q13">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_13.num +' - '+question_13.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_13.principal_response" @click="QuestionControlSuiteStep14">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5" v-if="question_13.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep14" class="input-group-textarea" label="Dates – durées - motifs, résultats : " v-model="question_13.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="QuestionNext.Q14">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels pl-3 pr-3">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_14.num +' - '+question_14.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_14.principal_response" @click="QuestionControlSuiteStep15">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_14.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep15" class="input-group-textarea" label="Dates – durées - motifs, résultats : " v-model="question_14.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="mt-2" v-if="buttons_2">
                                                        <button class="button-blue" @click="QuestionControlSuiteBack()">Retour</button>
                                                        <button class="button ml-3" @click="nextPageToThirst()">Suivant</button>
                                                    </div>
                                                </div>
                                                
                                                <!-- 3e page --> 
                                                <div class="container" v-if="thirst_page">
                                                    <div class="justify-content-center row mb-3" style="margin-top: -15px!important">
                                                        <h4 class="font-weight-bold"><span style="color: #ffa409">3</span>/5</h4>
                                                    </div>
                                                    <div class="row p-2 rounded" v-if="QuestionNext.Q15">
                                                        <div class="justify-content-center column">
                                                            <!--Question-->
                                                            <div class="labels pl-4 pr-4">
                                                                <label id="history" style="font-size: 13px;font-weight: bold">
                                                                    {{question_15.num +' - '+question_15.principal_question}}
                                                                </label>
                                                            </div>

                                                            <!-- Choix -->
                                                            <div class="inputs">
                                                                <v-radio-group row v-model="question_15.principal_response" @click="QuestionControlSuiteStep16">
                                                                    <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                    <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                </v-radio-group>
                                                            </div>

                                                            <!-- Response -->
                                                            <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_15.principal_response =='oui'">
                                                                <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                    <v-textarea @keyup="QuestionControlSuiteStep16" class="input-group-textarea" label="Dates – durées - motifs, résultats : " v-model="question_15.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                </div>
                                                            </div>
                                                            <v-divider></v-divider>
                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q16">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_16.num +' - '+question_16.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_16.principal_response" @click="QuestionControlSuiteStep17">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column  ml-4 mr-5 pr-5"  v-if="question_16.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep17" class="input-group-textarea" label="Quand - pour quel(s) motif(s) : " v-model="question_16.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q17">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_17.num +' - '+question_17.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_17.principal_response" @click="QuestionControlSuiteStep18">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_17.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep18" class="input-group-textarea" label="Quand - pour quel(s) motif(s) : " v-model="question_17.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>

                                                    </div>

                                                    <div v-if="QuestionNext.Q18">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_17.num +' - '+question_18.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_18.principal_response" @click="QuestionControlSuiteStep19">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_18.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep19" class="input-group-textarea" label="Veuillez préciser : " v-model="question_18.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q19">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_19.num +' - '+question_19.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_19.principal_response" @click="QuestionControlSuiteStep20">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_19.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep20" class="input-group-textarea" label="Veuillez préciser : " v-model="question_19.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div v-if="QuestionNext.Q20">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_20.num +' - '+question_20.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_20.principal_response" @click="QuestionControlSuiteStep21">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5" v-if="question_20.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep21" class="input-group-textarea" label="Veuillez préciser : " v-model="question_20.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="QuestionNext.Q21">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_21.num +' - '+question_21.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_21.principal_response" @click="QuestionControlSuiteStep22">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_21.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep22" class="input-group-textarea" label="Veuillez préciser : " v-model="question_21.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                    <div class="mt-2" v-if="buttons_3">
                                                        <button class="button-blue" @click="QuestionControlSuiteBack1()">Retour</button>
                                                        <button class="button ml-3" @click="nextPageToFourt()">Suivant</button>
                                                    </div>
                                                </div>

                                                <!-- 4e page -->
                                                <div class="container" v-if="fourt_page">
                                                    <div class="justify-content-center row mb-3" style="margin-top: -15px!important">
                                                        <h4 class="font-weight-bold"><span style="color: #ffa409">4</span>/5</h4>
                                                    </div>
                                                    <div class="row p-2 rounded" v-if="QuestionNext.Q22">
                                                        <div class="justify-content-center column">
                                                            <!--Question-->
                                                            <div class="labels">
                                                                <label id="history" style="font-size: 15px;font-weight: bold">
                                                                    {{question_22.num +' - '+question_22.principal_question}}
                                                                </label>
                                                            </div>

                                                            <!-- Choix -->
                                                            <div class="inputs">
                                                                <v-radio-group row v-model="question_22.principal_response" @click="QuestionControlSuiteStep23">
                                                                    <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                    <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                </v-radio-group>
                                                            </div>

                                                            <!-- Response -->
                                                            <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_22.principal_response =='oui'">
                                                                <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                    <v-textarea @keyup="QuestionControlSuiteStep23" class="input-group-textarea" label="Veuillez préciser : " v-model="question_22.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                </div>
                                                            </div>
                                                            <v-divider></v-divider>
                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q23">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_23.num +' - '+question_23.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_23.principal_response" @click="QuestionControlSuiteStep24">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_23.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep24" class="input-group-textarea" label="Veuillez préciser : " v-model="question_23.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q24">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_24.num +' - '+question_24.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_24.principal_response" @click="QuestionControlSuiteStep25">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_24.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep25" class="input-group-textarea" label="Veuillez préciser : " v-model="question_24.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>

                                                    </div>

                                                    <div v-if="QuestionNext.Q25">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_25.num +' - '+question_25.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_25.principal_response" @click="QuestionControlSuiteStep26">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_25.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep26" class="input-group-textarea" label="Veuillez préciser : " v-model="question_25.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q26">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_26.num +' - '+question_26.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_26.principal_response" @click="QuestionControlSuiteStep27">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_26.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep27" class="input-group-textarea" label="Veuillez préciser : " v-model="question_26.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div v-if="QuestionNext.Q27">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_27.num +' - '+question_27.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_27.principal_response" @click="QuestionControlSuiteStep28">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5" v-if="question_27.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep28" class="input-group-textarea" label="Veuillez préciser : " v-model="question_27.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="QuestionNext.Q28">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_28.num +' - '+question_28.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_28.principal_response" @click="QuestionControlSuiteStep29">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_28.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep29" class="input-group-textarea" label="Veuillez préciser : " v-model="question_28.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                 
                                                    <div class="mt-2" v-if="buttons_4">
                                                        <button class="button-blue" @click="QuestionControlSuiteBack2()">Retour</button>
                                                        <button class="button ml-3" @click="nextPageToFive()">Suivant</button>
                                                    </div>
                                                </div>
                                                
                                                <!-- 5e page -->
                                                <div class="container" v-if="five_page">
                                                    <div class="justify-content-center row mb-3" style="margin-top: -15px!important">
                                                        <h4 class="font-weight-bold"><span style="color: #ffa409">5/5</span></h4>
                                                    </div>
                                                    <div class="row p-2 rounded" v-if="QuestionNext.Q29">
                                                        <div class="justify-content-center column">
                                                            <!--Question-->
                                                            <div class="labels">
                                                                <label id="history" style="font-size: 15px;font-weight: bold">
                                                                    {{question_29.num +' - '+question_29.principal_question}}
                                                                </label>
                                                            </div>

                                                            <!-- Choix -->
                                                            <div class="inputs">
                                                                <v-radio-group row v-model="question_29.principal_response" @click="QuestionControlSuiteStep30">
                                                                    <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                    <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                </v-radio-group>
                                                            </div>

                                                            <!-- Response -->
                                                            <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_29.principal_response =='oui'">
                                                                <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                    <v-textarea @keyup="QuestionControlSuiteStep30" class="input-group-textarea" label="Veuillez préciser : " v-model="question_29.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                </div>
                                                            </div>
                                                            <v-divider></v-divider>
                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q30">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_30.num +' - '+question_30.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_30.principal_response" @click="QuestionControlSuiteStep31">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_30.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep31" class="input-group-textarea" label="Veuillez préciser : " v-model="question_30.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q31">
                                                        <!--Question-->
                                                        <div class="labels">
                                                            <label id="history" style="font-size: 15px;font-weight: bold">
                                                                {{question_31.num +' - '+question_31.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_31.principal_response" @click="QuestionControlSuiteStep32">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_31.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep32" class="input-group-textarea" label="Veuillez préciser : " v-model="question_31.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>

                                                    </div>

                                                    <div v-if="QuestionNext.Q32">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_32.num +' - '+question_32.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_32.principal_response" @click="QuestionControlSuiteStep33">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_32.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep33" class="input-group-textarea" label="Effet - Compagnie – Montant par garantie - Motif(s) - bénéficiaire : " v-model="question_32.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="mt-3" v-if="QuestionNext.Q33">
                                                        <!--Question-->
                                                        <div class="labels pl-3 pr-3">
                                                            <label id="history" style="font-size: 14px;font-weight: bold">
                                                                {{question_33.num +' - '+question_33.principal_question}}
                                                            </label>
                                                        </div>
                                                        <!--Choix-->
                                                        <div class="inputs">
                                                            <v-radio-group row v-model="question_33.principal_response" @click="QuestionControlSuiteStep34">
                                                                <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                            </v-radio-group>
                                                        </div>

                                                        <!--Response-->
                                                        <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_33.principal_response =='oui'">
                                                            <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                <v-textarea @keyup="QuestionControlSuiteStep34" class="input-group-textarea" label="Effet - Compagnie – Montant par garantie - Motif(s) - bénéficiaire : " v-model="question_33.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                            </div>
                                                        </div>
                                                        <v-divider></v-divider>
                                                    </div>

                                                    <div v-if="QuestionNext.Q34">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_34.num +' - '+question_34.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_34.principal_response" @click="QuestionControlSuiteStep35">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5" v-if="question_34.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep35" class="input-group-textarea" label="Précisez : fréquence, durée moyenne et but des séjours, par an et par pays concerné) " v-model="question_34.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                    <v-divider></v-divider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="QuestionNext.Q35">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_35.num +' - '+question_35.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_35.principal_response" @click="QuestionControlSuiteStep36">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_35.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep36" class="input-group-textarea" label="Motif : " v-model="question_35.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="QuestionNext.Q36">
                                                        <div class="container">
                                                            <div class="row p-2 rounded">
                                                                <div class="justify-content-center column">
                                                                    <!--Question-->
                                                                    <div class="labels">
                                                                        <label id="history" style="font-size: 15px;font-weight: bold">
                                                                            {{question_36.num +' - '+question_36.principal_question}}
                                                                        </label>
                                                                    </div>

                                                                    <!--Choix-->
                                                                    <div class="inputs">
                                                                        <v-radio-group row v-model="question_36.principal_response" @click="QuestionControlSuiteStep37">
                                                                            <v-radio label="Oui" value="oui" color="#ffa409"></v-radio>
                                                                            <v-radio label="Non" value="non" color="#ffa409"></v-radio>
                                                                        </v-radio-group>
                                                                    </div>

                                                                    <!--Response-->
                                                                    <div  class="justify-content-center column ml-4 mr-5 pr-5"  v-if="question_36.principal_response =='oui'">
                                                                        <div class="justify-content-center row ml-4 mr-4 pl-4 pr-4">
                                                                            <v-textarea @keyup="QuestionControlSuiteStep37" class="input-group-textarea" label="Précisez : Type d’engin: Cylindrée: Kilometrage annuel moyen: " v-model="question_36.resp_justification" style="width: 100%!important; height: auto!important;border-radius: 30px!important"></v-textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                    <div class="mt-2" v-if="buttons_5">
                                                        <button class="button-blue" @click="QuestionControlSuiteBack3()">Retour</button>
                                                        <button class="button ml-3" @click="validField()">Suivant</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </article>
                        </div>
                    </v-stepper-content>

                        <v-stepper-content step="6">
                            <v-layout align-end class="content-justify bg-white text-center" justify-content-center v-if="isPayment">
                                <!-- ===================    DEBUT DE LA PARTIE UNIQUEMENT POUR LE DESKTOP      =============== -->
                                <!-- =                      SACHANT QUE LE CODE EST ASSEZ LONG, IL CONVIENT                  = -->
                                <!-- =                      DE BIEN INDENTER LE CODE POUR UNE BONNE LISIBILITE               = -->
                                <!-- ========================================================================================= -->
                                <v-layout row wrap justify-content-center pb-3 v-if="isDesktop()" style="margin-bottom:10%">

                                    <!--========= Details Assurance cas Automobile DESKTOP ================-->
                                    <!--========= Details Assurance cas Automobile DESKTOP ================-->
                                    <!--========= Details Assurance cas Automobile DESKTOP ================-->
                                    <!--========= Details Assurance cas Automobile DESKTOP ================-->
                                    <v-flex justify-content-center row>
                                        <v-flex justify-content-center xs11 sm10 md11 lg11 class="row block-content elevation-0 row-container mt-3 bg-transparent grey lighten-3 border-radius">
                                            <v-flex xs11 sm10 md11 lg11 pt-3 class="justify-content-center row">
                                                <p class="font-weight-black headline policeLato">Détails de l'assurance</p>
                                            </v-flex>


                                            <v-flex justify-content-center xs11 sm10 md11 lg11 class="row block-content elevation-0 row-container bg-transparent">
                                                <v-flex xs12 sm12 md12 lg12 class="table-responsive">
                                                    <table class="table table-sm table-bordered text-center grey lighten-5 table-donnees">
                                                        <thead class="bg-light policeLato">
                                                        <tr>
                                                            <th class="head">Contractant</th>
                                                            <th class="head">Assuré</th>
                                                            <th class="head">Bénéficiaire</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody>
                                                        <tr>
                                                            <!--============================================Details Assurance cas Automobile WEB===================================================-->
                                                            <td>
                                                                <ul class="to-left mb-3 policeLato">
                                                                    <li class="font-weight-regular subheading">Genre :
                                                                        <span class="to-right">{{ContractantFields.Genre}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Situation :
                                                                        <span class="to-right">{{ContractantFields.Situation}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Nom :
                                                                        <span class="to-right">{{ContractantFields.Nom}}</span>
                                                                    </li>


                                                                    <li class="font-weight-regular subheading">Prénom :
                                                                        <span class="to-right">{{ContractantFields.Prenom}}</span>
                                                                    </li>

                                                                    <li  class="font-weight-regular subheading">Date de naissance :
                                                                        <span class="to-right">{{ContractantFields.dateNaissance}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Lieu de naissance :
                                                                        <span class="to-right">{{ContractantFields.LieuNaissance}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Profession :
                                                                        <span class="to-right">{{ContractantFields.Profession}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Adresse :
                                                                        <span class="to-right">{{ContractantFields.Adresse}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Téléphone :
                                                                        <span class="to-right">{{ContractantFields.Telephone}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Email :
                                                                        <span class="to-right">{{ContractantFields.Email}}</span>
                                                                    </li>
                                                                    <li class="font-weight-regular subheading">Cni :
                                                                        <span class="to-right">{{ContractantFields.Cni}}</span>
                                                                    </li>
                                                                    <li class="font-weight-regular subheading">Nationalité :
                                                                        <span class="to-right">{{ContractantFields.Nationalite}}</span>
                                                                    </li>
                                                                    <v-divider></v-divider>
                                                                </ul>
                                                            </td>

                                                            <!--============================================Liste Garanties si c'est devis Auto===================================================-->
                                                            <td>
                                                                <ul class="to-left mb-3 policeLato">
                                                                    <li class="font-weight-regular subheading">Nom :
                                                                        <span class="to-right">{{AssureFields.Nom}}</span>
                                                                    </li>


                                                                    <li class="font-weight-regular subheading">Prénom :
                                                                        <span class="to-right">{{AssureFields.Prenom}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Date de naissance :
                                                                        <span class="to-right">{{AssureFields.dateNaissance}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Lieu de naissance :
                                                                        <span class="to-right">{{AssureFields.LieuNaissance}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Profession :
                                                                        <span class="to-right">{{AssureFields.Profession}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Adresse :
                                                                        <span class="to-right">{{AssureFields.Adresse}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Téléphone :
                                                                        <span class="to-right">{{AssureFields.Telephone}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Email :
                                                                        <span class="to-right">{{AssureFields.Email}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Nationalité :
                                                                        <span class="to-right">{{AssureFields.Nationalite}}</span>
                                                                    </li>
                                                                    <v-divider></v-divider>
                                                                </ul>
                                                            </td>

                                                            <!--============================================Autres informations===================================================-->
                                                            <td>
                                                                <ul class="to-left mb-3 policeLato">
                                                                    <li class="font-weight-regular subheading">Nom :
                                                                        <span class="to-right">{{BenefiFields.Nom}}</span>
                                                                    </li>


                                                                    <li class="font-weight-regular subheading">Prénom :
                                                                        <span class="to-right">{{BenefiFields.Prenom}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Date de naissance :
                                                                        <span class="to-right">{{BenefiFields.dateNaissance}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Lieu de naissance :
                                                                        <span class="to-right">{{BenefiFields.LieuNaissance}}</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Filiation :
                                                                        <span class="to-right">{{BenefiFields.Filiation}}</span>
                                                                    </li>
                                                                    <v-divider></v-divider>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </v-flex>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex justify-content-center xs11 sm10 md11 lg11 class="row block-content elevation-0 row-container mt-3 bg-transparent grey lighten-3 border-radius">
                                            <v-flex xs11 sm10 md11 lg11 pt-3 class="justify-content-center row">
                                                <p class="font-weight-black headline policeLato">Détails des cotisations</p>
                                            </v-flex>


                                            <v-flex justify-content-center xs11 sm10 md11 lg11 class="row block-content elevation-0 row-container bg-transparent">
                                                <v-flex xs12 sm12 md12 lg12 class="table-responsive">
                                                    <table class="table table-sm table-bordered text-center grey lighten-5 table-donnees">
                                                        <thead class="bg-light policeLato">
                                                        <tr>
                                                            <th class="head">Garanties</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody>
                                                        <tr>
                                                            <!--============================================Details Assurance cas Automobile WEB===================================================-->
                                                            <td>
                                                                <ul class="to-left mb-3 policeLato">

                                                                    <li class="font-weight-regular subheading">Durée des cotisations :
                                                                        <span class="to-right">{{duree}} ans</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Durée de sevice :
                                                                        <span class="to-right">{{Duree_bourse}} ans</span>
                                                                    </li>

                                                                    <li v-show="Mensualite" class="font-weight-regular subheading">Bourse annuelle :
                                                                        <span v-if="Calculated_response!=null" class="to-right">{{Calculated_response.toLocaleString()}} cfa</span>
                                                                    </li>
                                                                    <li v-show="Mensualite" class="font-weight-regular subheading">Prime mensuelle :
                                                                        <span v-if="Calculated_response!=null" class="to-right">{{choixCapital.Mensuel}} cfa</span>
                                                                    </li>
                                                                    <li v-show="Capital" class="font-weight-regular subheading">Bourse annuelle :
                                                                        <span class="to-right">{{choixCapital.Capital}} cfa</span>
                                                                    </li>
                                                                    <li v-show="Capital" class="font-weight-regular subheading">Prime mensuelle :
                                                                        <span class="to-right">{{monthly_payment}} cfa</span>
                                                                    </li>

                                                                    <li class="font-weight-regular subheading">Branche :
                                                                        <span class="to-right">{{branche}}</span>
                                                                    </li>

                                                                    <li  class="font-weight-regular subheading">Assureur :
                                                                        <span class="to-right">{{Assureur}}</span>
                                                                    </li>
                                                                    <v-divider></v-divider>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </v-flex>
                                            </v-flex>
                                        </v-flex>

                                         <v-flex>
                                            <v-layout row wrap align-center justify-space-around mt-2>
                                                <v-flex xs12 sm12>
                                                <span class="headline georgia to-grey" style="font-size:20px!important">
                                                    Période de couverture
                                                </span>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-flex>
                                   

                                    <v-flex justify-content-center xs11 sm10 md11 lg11 class="row block-content elevation-0 row-container bg-transparent grey lighten-3 border-radius">
                                        <v-layout class="bg-light pa-2 border-radius">
                                            <v-flex>
                                                <v-layout row wrap>
                                                    <v-flex xs12 sm12 md6 lg6 pr-5>
                                                        <v-menu :close-on-content-click="false" v-model="menu" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                                            <v-text-field readonly slot="activator" placeholder="Date de prise d'effet" v-model="dateEffet" prepend-inner-icon="event" @change="dateDiff()"></v-text-field>
                                                            <v-date-picker @change="dateDiff()" color="#ffa409" v-model="dateEffet" @input="menu = false" :min="new Date().toISOString().substr(0, 10)" locale="fr-fr"></v-date-picker>
                                                        </v-menu>
                                                    </v-flex>

                                                    <v-flex xs12 sm12 md6 lg6>
                                                        <v-text-field slot="activator" v-model="dateEcheance" disabled placeholder="Date d'échéance" prepend-inner-icon="event"></v-text-field>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>

                                    <v-flex xs11 sm10 md11 lg11 class="mt-2 justify-content-center row">
                                        <button class="mb-3 button" @click="CreateDevis()" style="width: auto!important;padding-left: 15px;padding-right: 15px;">
                                            valider
                                        </button>
                                    </v-flex>
                                    <!--======================================= End Detail block if Automobile DESKTOP ========================================================-->
                                </v-layout>
                            </v-layout>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-flex>
        </v-layout>


        <v-dialog v-model="PaymentFuturMode" persistent max-width="700">    
            <v-card elevation="24" class="border-radius grey lighten-3">
                <v-toolbar color="#ffa409">
                    <v-toolbar-title class="policeLato text-white">Modalite des prochains paiements</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-container class="grey lighten-3">
                    <v-layout class="justify-content-center column">
                        <h4 class="justify-content-center mt-2 row font-weight-bold policeLato">Choix paiement</h4>
                        <div class="input-fields" >
                            <div class="justify-content-center column">
                                <div class="justify-content-center row mt-3">
                                    <p>
                                        <input v-model="PaymentFutur" value="cash" type="radio" id="test1" name="radio-group">
                                        <label for="test1">Cash</label>
                                    </p>
                                    <p class="ml-3">
                                        <input v-model="PaymentFutur" value="cheque" type="radio" id="test2" name="radio-group">
                                        <label for="test2">Cheque</label>
                                    </p>
                                    <p class="ml-3">
                                        <input v-model="PaymentFutur" value="prelevement" type="radio" id="test3" name="radio-group">
                                        <label for="test3">Prelevement bancaire</label>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </v-layout>
                    <v-layout class="justify-content-center row mb-2">
                        <v-btn round class="font-weight-bold text-white georgia" style="background:#ffa409" flat @click="ValidPaymentFutur()">Valider
                        </v-btn>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>

        <!-- INCLUSION DU POPUP DE LOGIN AU CAS OU LE USER VOULANT FAIRE UNE VALIDATION N'EST PAS CONNECTE -->
        <login-form :visible="showLoginForm" @close="showLoginForm=false"></login-form>
    </v-container>
</template>
<script>

    import store from "../../store/index";
    import ville from "../../common/ville";
    import dayjs from "dayjs";
    import Api from "../../services/Api";
    import QMNsia from '../../common/QMedicalNsia'


    const validateEmail = email => {
        if (!email.length) {
            return {valide: false, error: "L'adresse mail est obligatoire!"};
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return { valide: false, error: "Veuillez entrer un email valide!" };
        } else {
            return { valide: true, error: null };
        }
    };

    const validatePhone = phone => {

        if(!phone.length){
            return { valide: false, error: 'Le numéro de téléphone est obligatoire.' };
        }else if (phone.length < 9) {
            return { valide: false, error: 'Le numéro de téléphone doit contenir 9 chiffres au minimum.' };
        }else{
            return { valide: true, error: null };
        }

    };


    export default {
        name: 'Devis_nsia',
        components: {
            LoginForm
        },
        data() {
            return {
                buttons: false,
                buttons_2: false,
                buttons_3: false,
                buttons_4: false,
                buttons_5: false,
                first_page : false,
                second_page : false,
                thirst_page : false,
                fourt_page : false,
                five_page : false,
                questionTest:'',
                QuestionnaireTab:[],
                question_0:{
                    num:1,
                    principal_question:'Indiquer votre taille et votre poids ?',
                    resp_taille : '',
                    resp_poid : '',
                },
                question_1:{
                    num:2,
                    principal_question:'Avez-vous présenté une diminution de poids involontaire au cours des 2 dernières années ?',
                    principal_response:'',
                    resp_justification:''
                },
                question_2:{
                    num:3,
                    principal_question:'Y a-t-il dans votre famille un antécédent de maladie cardiaque, vasculaire, neurologique, psychiatrique, de cancer ou de diabète ?',
                    principal_response:'',
                    resp_justification:''
                },
                question_3:{
                    num:4,
                    principal_question:'Consommez-vous des boissons alcoolisées quotidiennement (bière, vin, apéritif) ?',
                    principal_response:'',
                    resp_justification:''
                },
                question_4:{
                    num:5,
                    principal_question:'Etes-vous fumeur ?',
                    principal_response:'',
                    resp_justification:''
                },
                question_5:{
                    num:6,
                    principal_question:'Avez-vous été victime d’accident (d’automobile ou autre ) ? ',
                    principal_response:'',
                    resp_justification:''
                },
                question_6:{
                    num:7,
                    principal_question:'Etes-vous actuellement en arrêt de travail ?',
                    principal_response:'',
                    resp_justification:''
                },
                question_7:{
                    num:8,
                    principal_question:'Durant les 5 dernières années avez-vous dû interrompre votre travail pendant plus de 3 semaines consécutives ?',
                    principal_response:'',
                    resp_justification:''
                },
                question_8:{
                  num:9,
                  principal_question:'Etes-vous titulaire d’une pension d’invalidité ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_9:{
                  num:10,
                  principal_question:'Une procédure de mise en invalidité est-elle ou va-t-elle être engagée ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_10:{
                  num:11,
                  principal_question:'Utilisez-vous habituellement des médicaments contre les maux de tête, les douleurs, la fatigue, des somnifères, des antibiotiques, des tranquillisants ou du magnésium ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_11:{
                  num:12,
                  principal_question:'Avez-vous suivi ou suivez-vous actuellement un traitement, pour une durée supérieure à 3 semaines ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_12:{
                  num:13,
                  principal_question:'Avez-vous fait des séjours en milieu hospitalier ou assimilé pour intervention examen, traitement ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_13:{
                  num:14,
                  principal_question:'Avez-vous suivi un traitement spécialisé tel que rayons, chimiothérapie, immunothérapie ou cobaltothérapie ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_14:{
                  num:15,
                  principal_question:'Avez-vous subi des examens médicaux (en dehors de la médecine du travail) tels qu’une analyse de sang, d’urine, un électrocardiogramme, une radiographie ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_15:{
                  num:16,
                  principal_question:'Avez-vous ou non subi un test de dépistage des sérologies, en particulier pour les virus des hépatites B et C ou pour celui de l’immunodéficience humaine (VIH), dont le résultat a été positif ? A quelle date ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_16:{
                  num:17,
                  principal_question:'Devez-vous être hospitalisé prochainement ou subir des examens médicaux ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_17:{
                  num:18,
                  principal_question:'Devez-vous subir une intervention chirurgicale ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_18:{
                  num:19,
                  principal_question:'Maladies de l’appareil respiratoire (toux de longue durée, crachement de sang, essoufflements, asthme,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_19:{
                  num:20,
                  principal_question:'Maladies de l’appareil cardio-vasculaire (infarctus, hypertension artérielle, artérite,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_20:{
                  num:21,
                  principal_question:'Maladies de l’appareil digestif (ulcère, jaunisse, hépatite, diarrhée chronique,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_21:{
                  num:22,
                  principal_question:'Maladies de l’appareil urinaire et génital (albuminurie et sang dans les urines, maladies sexuellement transmissibles,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_22:{
                  num:23,
                  principal_question:'Maladies du système nerveux (paralysies, méningite, épilepsie,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_23:{
                  num:24,
                  principal_question:'Maladies neuropsychiques (dépression nerveuse, tentative de suicide,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_24:{
                  num:25,
                  principal_question:'Maladies du sang, des ganglions et de la rate (anémie, présence de ganglions anormaux, hémophilie,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_25:{
                  num:26,
                  principal_question:'Maladies endocriniennes ou métaboliques (diabète, affection de la thyroïde, hémochromatose, goutte,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_26:{
                  num:27,
                  principal_question:'Maladies des os et articulations (arthrose, rhumatismes divers,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_27:{
                  num:28,
                  principal_question:'Maladies de la peau (exérèse de grains de beauté, psoriasis, autres lésions,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_28:{
                  num:29,
                  principal_question:'Maladies infectieuses sévères ou compliquées (tuberculose, hépatite virale, infections à répétition,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_29:{
                  num:30,
                  principal_question:'Maladies parasitaires ou mycoses (paludisme, bilharziose, candidose,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_30:{
                  num:31,
                  principal_question:'Maladies des organes des sens troubles oculaires et auditifs (myopie, surdité,...) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_31:{
                  num:32,
                  principal_question:'Autres maladies non citées ci-dessus ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_32:{
                  num:33,
                  principal_question:'Etes-vous actuellement titulaire d’assurances de personnes ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_33:{
                  num:34,
                  principal_question:'Avez-vous fait l’objet d’un refus, d’un ajournement d’une restriction ou d’une surprime pour un précédent contrat d’assurances de personnes ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_34:{
                  num:35,
                  principal_question:'Effectuez-vous des séjours hors de l’Union européenne, des Etats-Unis, du Canada ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_35:{
                  num:36,
                  principal_question:'Utilisez-vous en tant que pilote ou passager des engins aériens (hors lignes commerciales régulières) ?',
                  principal_response:'',
                  resp_justification:''
                },
                question_36:{
                  num:37,
                  principal_question:'Utilisez-vous un cycle à moteur ? Si oui, est-ce en tant que moyen de transport uniquement ?',
                  principal_response:'',
                  resp_justification:''
                },
                QuestionMedical: null,
                PaymentFutur : null,
                PaymentFuturMode : false,
                Duree_bourse :null,
                oldDate : null,
                bottomPushNotif : false,
                disableDateAssure: true,
                Modalite : null,
                Assureur :'',
                Simule : true,
                SkipSimule : false,
                money:{
                    thousands: ' ',
                    precision: false,
                    masked: false,
                },
                choixOffre:null,
                choixOffreFinale: null,
                dateNaiss : null,
                duree : null,
                Capital:true,
                Mensualite: false,
                Capi_souhaite: null,
                rente_an: null,
                pourcent: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                choixCapital:{
                    Capital: null,
                    Mensuel : null,
                },
                dateEffet: null,
                dateEcheance: null,
                e1: 1,
                elevation: 2,
                activeStep: 0,
                checkbox: false,
                errors: {},
                aStorMap: false,
                disable: false,
                valide: null,
                age: null,
                QuestionSwitch:{
                    Q1 : null,
                    Q2 : null,
                    Q3 : null,
                    Q4 : null,
                    Q5 : null,
                    Q6 : null,
                    Q7 : null,
                },
                QuestionNext: {
                    Q : true,
                    Q1 : false,
                    Q2 : false,
                    Q3 : false,
                    Q4 : false,
                    Q5 : false,
                    Q6 : false,
                    Q7 : false,
                    Q8 : false,
                    Q9 : false,
                    Q10: false,
                    Q11: false,
                    Q12: false,
                    Q13: false,
                    Q14: false,

                    Q15 : false,
                    Q16: false,
                    Q17: false,
                    Q18: false,
                    Q19: false,
                    Q20: false,
                    Q21: false,


                    Q22: false,
                    Q23: false,
                    Q24: false,
                    Q25: false,
                    Q26: false,
                    Q27: false,
                    Q28: false,


                    Q29: false,
                    Q30: false,
                    Q31: false,
                    Q32: false,
                    Q33: false,
                    Q34: false,
                    Q35: false,
                },

                // numTelephone : '' ,
                amenities: [1, 4],
                genre: null,

                fraisLiv: 0,
                fraisPaiement: 0,
                Testons: false,
                itemsGenre: ["Homme", "Femme"],
                adresselivraison: "",
                autoHeight: true,
                x: null,
                dialogAlert: false,
                Devis_pour_souscription: [],
                mode_livraison: null,
                listVille: ville,

                menuDelivrance: false,
                Calculated_response:null,
                monthly_payment:null,
                mode_payement: null,
                notifDeviParMail: null,
                countries: null,
                ville: null,
                quartier: "",
                listegaranties: [],
                marque: null,
                tableau_info_passager: [],
                nbPassager: null,
                frais_livraison: null,
                branche: null,
                continue_btn: false,
                dialogInfoPassager: false,
                dialog: false,
                city: null,
                datePickerDateNais: false,
                IsPaid: false,
                adresse: false,
                livePaper: false,
                checked : false,
                showLoginForm: false,
                animation: 'animate-in',
                NomAssure: null,
                isContractant: true,
                isAssure: false,
                isBenef: false,
                Questionnaire: false,
                QuestionnaireSuite : false,
                isPayment : false,
                menu: false,
                Capi : 0,
                Mensu: 0,
                ToastTabSucess: {
                    theme: 'toasted-primary',
                    position: 'top-center',
                    duration: 4000,
                    fitToScreen: true,
                    type: 'success',
                    className: 'custom-success-class'
                }, // Customized options for success toast
                ToastTabError: {
                    theme: 'toasted-primary',
                    position: 'top-center',
                    duration: 4000,
                    fitToScreen: true,
                    type: 'error'
                }, // Customized options for error toast
                // Contractant fields
                ContractantFields: {
                    Cni: null,
                    Genre: null,
                    Situation: null,
                    Nom: null,
                    Prenom: null,
                    dateNaissance: null,
                    LieuNaissance: null,
                    Profession:  null,
                    Adresse: null,
                    Telephone: null,
                    Email: null,
                    Nationalite: null,
                    patrimoine: null,
                    revenu_annuel: null,
                },
                // Assure fields
                AssureFields: {
                    Nom: null,
                    Prenom: null,
                    dateNaissance: null,
                    LieuNaissance: null,
                    Profession:  null,
                    Adresse: null,
                    Telephone: null,
                    Email: null,
                    LieuExe: null,
                    Nationalite : null
                },
                // Beneficiaire fields
                BenefiFields:{
                    Nom: null,
                    Prenom: null,
                    dateNaissance: null,
                    LieuNaissance: null,
                    Filiation: '',
                },
                // Questionnaire fields
                QuestionsFieldsSuite:{
                    taille: null,
                    poids: null,
                    ArretTravailW: null,
                    ArretTravailM: null,
                    InterompTravailDate: null,
                    InterompTravailMotif: null,
                    InterompTravailDuree: null,
                    SejourDate: null,
                    SejourMotif: null,
                    SejourDuree: null,
                    interventionDate: null,
                    interventionMotif: null,
                    infirm: null,
                    infirmDate: null,
                    infirmTaux: null,
                    infirmServie: null,
                    infectionNbre: null,
                    infectionDate : null,
                    infectRespiratoire: null
                },

                formSteps: [
                    {
                        title: "CONTRACTANT",
                        fields: [
                            { valid: true },
                        ]
                    },
                    {
                        title: "ASSURE",
                        fields: [
                            { valid: true },
                        ]
                    },
                    {
                        title: "BENEFICIAIRE",
                        fields: [
                            { valid: true },
                        ]
                    },
                    {
                        title: "QUESTIONNAIRE MEDICAL",
                        fields: [
                            { valid: true }
                        ]
                    },
                    {
                        title: "QUESTIONNAIRE MEDICAL SUITE",
                    }
                ],
                CreatedDevis:null,
            }
        },
        methods: {
            nextPage(){
                this.second_page = true
                this.first_page = false
                this.QuestionNext.Q8 = true
            },
            nextPageToThirst(){
                this.second_page = false
                this.first_page = false
                this.thirst_page = true
                this.QuestionNext.Q15 = true
            },
            nextPageToFourt(){
              this.second_page = false
              this.first_page = false
              this.thirst_page = false
              this.fourt_page = true
              this.QuestionNext.Q22 = true
            },
            nextPageToFive(){
              this.second_page = false
              this.first_page = false
              this.thirst_page = false
              this.fourt_page = false
              this.five_page = true
              this.QuestionNext.Q29 = true
            },


            ValidPaymentFutur(){
                if(this.PaymentFutur){
                    this.PaymentFuturMode = false
                }else{
                    this.$toasted.show(
                        "Choix obligatoire !",
                        this.ToastTabError
                    );
                }
            },
            DynamicSimule(){
                if(this.Capital){
                    if(this.dateNaiss && this.choixCapital.Capital && this.duree && this.Duree_bourse){
                        this.fieldsControl()

                    } else {
                        this.bottomPushNotif = false;
                    }
                }else if(this.Mensualite){
                    if(this.dateNaiss && this.choixCapital.Mensuel && this.duree && this.Duree_bourse){
                        this.fieldsControl()
                    }else {
                        this.bottomPushNotif = false;
                    }
                }
                //this.Capi.replace
            },
            SwitchButtonColor(){
                $(".swith-click").click(function() {
                    $(".swith-click").removeClass('active');
                    $(this).addClass("active");
                });
            },

            CalculCapitalRente(){
                let capi = 0.1
                if(Number(this.choixCapital.Capital.replace(/[^0-9.-]+/g, "")) >= 500000){
                    this.Capi = capi * Number(this.choixCapital.Capital.replace(/[^0-9.-]+/g, ""))
                }else{
                    this.Capi = 0
                }
                this.CheckFieldChange()

            },
            CalculMensuRente(){
                let capi = 0.1
                this.Mensu =  parseInt(capi * this.Calculated_response)
            },
            /*========== Fonction pour faire choix entre capital ou mensualites ========*/
            Choix() {
                if (this.choixOffre = this.Capital) {
                    this.choixOffreFinale = 'Capital';
                    this.choixCapital.Mensuel = null;
                } else if(this.choixOffre = this.Mensualite) {
                    this.choixCapital.Capital = null;
                    this.choixOffreFinale = 'Mensualite';
                    this.SwitchButtonColor()


                }
            },
            /*===Send of data to API allowing create proposition for the customer===*/
            CreateDevis: function(){
                if (!store.state.isUserLoggedIn) {
                    this.showLoginForm = true
                } else {
                    if(this.dateEffet){
                        if(this.PaymentFutur  == null){
                            this.PaymentFuturMode = true
                        }else {
                            this.PaymentFuturMode = false
                            if(this.Capital){
                                const Sunu = {
                                    Contractant: this.ContractantFields,
                                    Assure: this.AssureFields,
                                    Beneficiaire : this.BenefiFields,
                                    Questionnaire : this.QuestionnaireTab, //QuestionsFieldsSuite,
                                    Modalite :this.Modalite,
                                    duree:this.duree,
                                    branche:'Vie',
                                    assureurs:'NSIA-VIE',
                                    userid: store.state.user._id,
                                    clientid: store.state.user._id,
                                    createur: store.state.user._id,
                                    dateEffet: this.dateEffet,
                                    dateEcheance: this.dateEcheance,
                                    dateSouscription:  new Date(),
                                    prime_mensuelle : this.monthly_payment,
                                    capital : Number(this.choixCapital.Capital.replace(/[^0-9.-]+/g, "")),
                                    duree_bourse:this.Duree_bourse,
                                    Rente : Number(this.Capi),
                                    FuturPaiement : this.PaymentFutur
                                };

                                Api().post('/vie/create/devis', Sunu)
                                    .then((result) => {
                                        Api().get('devis/' + result.data.devis._id)
                                            .then(response => {
                                                this.$store.dispatch('setDevisPayement', response.data);
                                                this.$router.go(this.$router.push('/payement'))
                                            })
                                    }).catch((err) => {
                                    console.log('error')
                                });

                            }
                            else if(this.Mensualite){
                                const Sunu = {
                                    Contractant: this.ContractantFields,
                                    Assure: this.AssureFields,
                                    Beneficiaire : this.BenefiFields,
                                    Questionnaire : this.QuestionnaireTab, // this.QuestionsFieldsSuite,
                                    Modalite :this.Modalite,
                                    duree:this.duree,
                                    branche:'Vie',
                                    assureurs:'NSIA-VIE',
                                    userid: store.state.user._id,
                                    clientid: store.state.user._id,
                                    createur: store.state.user._id,
                                    dateEffet: this.dateEffet,
                                    dateEcheance: this.dateEcheance,
                                    dateSouscription:  new Date(),
                                    prime_mensuelle : Number(this.choixCapital.Mensuel.replace(/[^0-9.-]+/g, "")),
                                    capital : this.Calculated_response,
                                    duree_bourse:this.Duree_bourse,
                                    Rente :  Number(this.Mensu),
                                    FuturPaiement : this.PaymentFutur
                                };
                                Api().post('/vie/create/devis', Sunu)
                                    .then((result) => {
                                        Api().get('devis/' + result.data.devis._id)
                                            .then(response => {
                                                this.$store.dispatch('setDevisPayement', response.data);
                                                this.$router.go(this.$router.push('/payement'))
                                            })
                                    }).catch((err) => {
                                    console.log('error')
                                });

                            }
                        }


                    }else {
                        this.$toasted.show( "Date d'effet obligatoire!", this.ToastTabError)
                    }
                }
            },

            /*=================Verification de la session de l'utilisateur et envoie des donnees==============*/
            SendData: function () {
                this.bottomPushNotif = true
                const SimulateSunuData = {
                    age: this.dateNaiss,
                    duree: this.duree,
                    Duree_bourse:this.Duree_bourse,
                    capital: Number(this.choixCapital.Mensuel.replace(/[^0-9.-]+/g, ""))
                };

                Api().post('/vie/nsia/vie/etudes/mensualite', SimulateSunuData)    
                    .then((res) => {
                        this.Calculated_response = res.data.capital
                        this.CalculMensuRente()
                    }).catch((err) => {
                    console.log(err)
                });
            },

            SendDataDeduction: function () {
                this.bottomPushNotif = true
                const SimulateSunuData = {
                    age: this.dateNaiss,
                    Duree_bourse:this.Duree_bourse,
                    duree: this.duree,
                    capital:Number(this.choixCapital.Capital.replace(/[^0-9.-]+/g, ""))
                };
                Api().post('/vie/nsia/vie/etudes/capital' , SimulateSunuData)
                    .then((res) => {
                        console.log('To PAY <===>'+res.data.monthly_payment)
                        this.monthly_payment = res.data.monthly_payment
                        this.CalculCapitalRente()
                    }).catch((err) => {
                    console.log(err)
                });
            },


            //Control des champs pour validation
            fieldsControl() {

                const date1 = dayjs(this.dateNaiss);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                let year = Math.floor(daydiff/360)

                this.Choix()
                let toDay = year
                if (this.dateNaiss) {
                    if(toDay > 65){
                        this.$toasted.show( "L'année de naissance doit être inferieur ou égale à 65 ans!", this.ToastTabError)
                    } else {
                        if (this.choixCapital.Capital || this.choixCapital.Mensuel)
                        {
                            if (this.choixOffreFinale == 'Capital')
                            {
                                if(Number(this.choixCapital.Capital.replace(/[^0-9.-]+/g, "")) < 500000)
                                {
                                    this.$toasted.show( "Le capital souhaite doit être au minimum 500 000 FCFA!", this.ToastTabError)
                                } else
                                {
                                    if (this.duree)
                                    {

                                        if(this.duree >= 10) {
                                            if(this.duree > 20){
                                                this.$toasted.show('Durée doit être inferieur à 20 ans! ', this.ToastTabError)
                                            }else {
                                                if(this.Duree_bourse){
                                                    let dureeTotal = Number(this.duree);
                                                    if(dureeTotal + toDay <= 65){
                                                        this.SendDataDeduction()
                                                        this.SkipSimule = true
                                                        this.Simule = false
                                                        this.Modalite = 'CAPITAL SOUHAITÉ'
                                                        this.branche = 'vie'
                                                        this.Assureur = 'NSIA-VIE'
                                                    }else {
                                                        this.$toasted.show("Revoir la durée de cotisation. L’âge du contractant ne doit pas dépasser 65ans au terme du contrat", this.ToastTabError)
                                                    }
                                                }else {
                                                    this.$toasted.show('Durée bourse obligatoire! ', this.ToastTabError)
                                                }

                                            }
                                        }else
                                        {
                                            this.$toasted.show('Durée doit être supérieur ou égale à 10 ans! ', this.ToastTabError)
                                        }
                                    } else {
                                        this.$toasted.show('Durée Obligtoire! ', this.ToastTabError)
                                    }
                                }
                            } else if(this.choixOffreFinale == 'Mensualite') {
                                if(Number(this.choixCapital.Mensuel.replace(/[^0-9.-]+/g, "")) < 6000)
                                {
                                    this.$toasted.show( "La mensualite souhaite doit être supérieur à 6 000 FCFA!", this.ToastTabError)
                                } else
                                {
                                    if (this.duree)
                                    {
                                        if(this.duree >= 10) {
                                            if(this.duree > 20){
                                                this.$toasted.show('Durée doit être inferieur à 20 ans! ', this.ToastTabError)
                                            }else {
                                                if(this.Duree_bourse){
                                                    let dureeTotal = Number(this.duree);
                                                    if(dureeTotal + toDay <= 65){
                                                        this.SendData()
                                                        this.Modalite = 'MENSUALITÉS SOUHAITÉES'
                                                        this.SkipSimule = true
                                                        this.Simule = false
                                                        this.branche = 'vie'
                                                        this.Assureur = 'SUNU Assurance vie'
                                                    }else {
                                                        this.$toasted.show("Revoir la durée de cotisation. L’âge du contractant ne doit pas dépasser 65ans au terme du contrat", this.ToastTabError)
                                                    }
                                                }else{
                                                    this.$toasted.show('Durée bourse obligatoire! ', this.ToastTabError)
                                                }

                                            }
                                        }else {
                                            this.$toasted.show('Durée doit être supérieur ou égale à 10 ans! ', this.ToastTabError)
                                        }

                                    } else {
                                        this.$toasted.show('Durée Obligtoire! ', this.ToastTabError)
                                    }
                                }
                            }


                        } else {
                            this.$toasted.show("Capital obligatoire!", this.ToastTabError)
                        }
                    }

                } else {
                    this.$toasted.show('Année de naissance obligatoire! ', this.ToastTabError)
                }
            },

            CheckFieldChange(){
                /* if(this.dateNaiss = !this.dateNaiss){*/
                this.Simule = true
                this.SkipSimule = false
                /*}*/
                this.DynamicSimule()
            },
            DevisNextStep(){
                const date1 = dayjs(this.BenefiFields.dateNaissance);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                let year = Math.floor(daydiff/360)
                this.oldDate = this.dateNaiss

                /*let toDay = year
                let dureeTotal = Number(this.duree)
*/
                if(this.BenefiFields.dateNaissance){
                            if(this.choixOffreFinale == 'Capital'){
                                if(this.monthly_payment < 10000){
                                    this.$toasted.show("La prime mensuelle doit étre suppérieure a 10 000 CFA !", this.ToastTabError)
                                }else {
                                    if (!store.state.isUserLoggedIn) {
                                        this.showLoginForm = true
                                    } else if(store.state.isUserLoggedIn){
                                        this.ContractantFields.Nom = this.$store.state.user.nom
                                        this.ContractantFields.Prenom = this.$store.state.user.prenom
                                        this.ContractantFields.Telephone = this.$store.state.user.telephone_port
                                        this.ContractantFields.Email = this.$store.state.user.email
                                        this.ContractantFields.dateNaissance = this.$store.state.user.datenaissance
                                        this.ContractantFields.Genre = this.$store.state.user.sexe
                                        this.ContractantFields.Situation = this.$store.state.user.statut_marital
                                        this.ContractantFields.Profession = this.$store.state.user.profession
                                        this.ContractantFields.Adresse = this.$store.state.user.adresse
                                        this.ContractantFields.Cni = this.$store.state.user.numero_piece
                                        this.e1 = 2
                                        this.ContractantFields.dateNaissance = this.dateNaiss
                                        this.AssureFields.dateNaissance = this.dateNaiss
                                    }
                                }
                            }else if(this.choixOffreFinale == 'Mensualite'){
                                if(this.Calculated_response < 500000){
                                    this.$toasted.show("La bourse annuelle doit étre suppérieure ou égale à 500 000 CFA !", this.ToastTabError)
                                }else {
                                    if (!store.state.isUserLoggedIn) {
                                        this.showLoginForm = true
                                    } else if(store.state.isUserLoggedIn){
                                        this.ContractantFields.Nom = this.$store.state.user.nom
                                        this.ContractantFields.Prenom = this.$store.state.user.prenom
                                        this.ContractantFields.Telephone = this.$store.state.user.telephone_port
                                        this.ContractantFields.Email = this.$store.state.user.email
                                        this.ContractantFields.dateNaissance = this.$store.state.user.datenaissance
                                        this.ContractantFields.Genre = this.$store.state.user.sexe
                                        this.ContractantFields.Situation = this.$store.state.user.statut_marital
                                        this.ContractantFields.Profession = this.$store.state.user.profession
                                        this.ContractantFields.Adresse = this.$store.state.user.adresse
                                        this.ContractantFields.Cni = this.$store.state.user.numero_piece
                                        this.e1 = 2
                                        this.ContractantFields.dateNaissance = this.dateNaiss
                                        this.AssureFields.dateNaissance = this.dateNaiss
                                    }
                                }

                            }


                }
                else {
                    this.$toasted.show("Date bénéficiaire obligatoire !", this.ToastTabError)
                }



            },

            switchCapital(){
                this.Choix()
                this.Capital = true;
                this.Mensualite = false;
                this.Mensu= 0
                this.CheckFieldChange()
            },
            switchMensuel(){
                this.Choix()
                this.Mensualite = true;
                this.Capital = false;
                this.Capi= 0
                this.CheckFieldChange()
            },
            /*nextStep() {
                this.animation = 'animate-out';
                setTimeout(() => {
                    this.animation = 'animate-in';
                    this.activeStep += 1;
                }, 600);
            },*/
            toggleCheckbox() {
                if(this.checkbox == true){
                    this.AssureFields.Nom = this.ContractantFields.Nom
                    this.AssureFields.Prenom = this.ContractantFields.Prenom
                    this.AssureFields.dateNaissance = this.ContractantFields.dateNaissance
                    this.dateNaiss = this.ContractantFields.dateNaissance

                    //this.dateNaiss = this.ContractantFields.dateNaissance
                    this.AssureFields.LieuNaissance = this.ContractantFields.LieuNaissance
                    this.AssureFields.Profession = this.ContractantFields.Profession
                    this.AssureFields.Adresse = this.ContractantFields.Adresse
                    this.AssureFields.Telephone = this.ContractantFields.Telephone
                    this.AssureFields.Email = this.ContractantFields.Email
                    this.AssureFields.Nationalite = this.ContractantFields.Nationalite
                    this.disableDateAssure = true
                    this.AssureControl()
                    this.DynamicSimule()
                }else if(this.checkbox == false){
                    //this.disableDateAssure = false
                    //this.dateNaiss = null
                    this.AssureFields.dateNaissance = this.oldDate
                    this.dateNaiss = this.oldDate
                    this.DynamicSimule()
                    //this.AssureFields.dateNaissance = this.dateNaiss
                    this.ClearForm()
                }
            },
            ClearForm: function () {
                this.AssureFields.Nom = null
                this.AssureFields.Prenom = null
                //this.AssureFields.dateNaissance = null
                this.AssureFields.LieuNaissance = null
                this.AssureFields.Profession = null
                this.AssureFields.Adresse = null
                this.AssureFields.Telephone = null
                this.AssureFields.Email = null
                this.AssureFields.LieuExe = null
                this.AssureFields.Nationalite =  null
            },
            yearsDiff(){
                const date1 = dayjs(this.dateNaiss).year();
                const date2 = new Date().getFullYear();
                let daydiff = date2 - date1
                this.age = daydiff;

                if (this.age <0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.dateNaiss = null
                } else if (this.age) {
                    if(this.age < 18 || this.age <= 0){
                        this.$toasted.show("Erreur, l'age doit pas être Supérieur à 18 ans! ", this.ToastTabError)
                        this.dateNaiss = null
                    }else if(this.age > 55){
                        this.$toasted.show( "L'année de naissance doit être inferieur ou égale à 55 ans!", this.ToastTabError)
                        this.dateNaiss = null
                    }
                }
                else if (this.age<=0) {
                    if(this.age < 18 || this.age <= 0){
                        this.$toasted.show("Erreur, l'age doit pas etre Supérieur à 18 ans! ", this.ToastTabError)
                        this.dateNaiss = null
                    }
                }
                this.CheckFieldChange()
            },

            yearsDiffContractant() {
                const date1 = dayjs(this.ContractantFields.dateNaissance);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age <0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.ContractantFields.dateNaissance = null

                } else if (this.age) {
                    let year = Math.floor(this.age / 360);
                    this.age = year;
                    if(this.age < 18 || this.age <= 0){
                        this.$toasted.show("Erreur, l'age doit pas etre supperieur à 18 ans! ", this.ToastTabError)
                        this.ContractantFields.dateNaissance = null
                    }
                }
                else if (this.age<=0) {
                    let year = Math.floor(this.age / 360);
                    this.age = year;
                    if(this.age < 18 || this.age <= 0){
                        this.$toasted.show("Erreur, l'age doit pas etre supperieur à 18 ans! ", this.ToastTabError)
                        this.ContractantFields.dateNaissance = null
                    }
                }
            },

            yearsDiffAssure() {
                const date1 = dayjs(this.AssureFields.dateNaissance);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.AssureFields.dateNaissance = null


                } else if (this.age) {
                    let year = Math.floor(this.age / 360);
                    this.age = year;
                    if(this.age < 18){
                        this.$toasted.show("Erreur, l'age doit pas etre Supérieur à 18 ans! ", this.ToastTabError)
                        this.AssureFields.dateNaissance = null
                    }
                }  else if (this.age<=0) {
                    let year = Math.floor(this.age / 360);
                    this.age = year;
                    if(this.age < 18){
                        this.$toasted.show("Erreur, l'age doit pas etre Supérieur à 18 ans! ", this.ToastTabError)
                        this.AssureFields.dateNaissance = null
                    }
                }

            },

            yearsDiffBenef() {
                const date1 = dayjs(this.BenefiFields.dateNaissance);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.BenefiFields.dateNaissance = null

                } else if (this.age >= 360) {
                    let year = Math.floor(this.age / 360);
                    this.age = year;
                    if(this.age > 11){
                        this.$toasted.show("Erreur, l'age doit pas etre Supérieur à 11 ans! ", this.ToastTabError)
                        this.BenefiFields.dateNaissance = null
                    }
                }
            },

            yearsDiffQuestionSuite() {
                const date1 = dayjs(this.QuestionsFieldsSuite.ArretTravailW);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.QuestionsFieldsSuite.ArretTravailW = null

                }
            },

            yearsDiffQuestionSuite2() {
                const date1 = dayjs(this.QuestionsFieldsSuite.InterompTravailDate);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.QuestionsFieldsSuite.InterompTravailDate = null

                }
            },

            yearsDiffQuestionSuite3() {
                const date1 = dayjs(this.QuestionsFieldsSuite.SejourDate);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.QuestionsFieldsSuite.SejourDate = null

                }
            },

            yearsDiffQuestionSuite4() {
                const date1 = dayjs(this.QuestionsFieldsSuite.interventionDate);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.QuestionsFieldsSuite.interventionDate = null

                }
            },

            yearsDiffQuestionSuite5() {
                const date1 = dayjs(this.QuestionsFieldsSuite.infirmDate);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.QuestionsFieldsSuite.infirmDate = null

                }
            },

            yearsDiffQuestionSuite6() {
                const date1 = dayjs(this.QuestionsFieldsSuite.infectionDate);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.QuestionsFieldsSuite.infectionDate = null

                }
            },

            yearsDiffQuestionSuite7() {
                const date1 = dayjs(this.QuestionsFieldsSuite.infectRespiratoire);
                const date2 = dayjs(new Date().toISOString().substr(0, 10));
                let daydiff = date2.diff(date1, 'days');
                this.age = daydiff;

                if (this.age < 0) {
                    this.age = null;
                    this.$toasted.show('Erreur, date antérieure à la date actuelle! ', this.ToastTabError)
                    this.QuestionsFieldsSuite.infectRespiratoire = null

                }
            },

            BackToStep1(){
                this.animation = 'animate-out-back';
                setTimeout(() => {
                    this.animation = 'animate-in-back';
                    this.e1 = 2;
                    this.activeStep -= 1;
                    this.isContractant = true,
                        this.isAssure = false
                }, 500);
            },

            BackToStep2(){
                this.animation = 'animate-out-back';
                setTimeout(() => {
                    this.animation = 'animate-in-back';
                    this.activeStep -= 1;
                    this.e1 = 3;
                    this.isContractant = false,
                        this.isAssure = true
                    this.isBenef = false
                }, 500);
            },

            BackToStep3(){
                this.animation = 'animate-out-back';
                setTimeout(() => {
                    this.animation = 'animate-in-back';
                    this.activeStep -= 1;
                    this.e1 = 4;
                    this.isContractant = false,
                        this.isAssure = false
                    this.isBenef = true
                    this.Questionnaire = false
                }, 600);
            },
            BackToStep4(){
                this.animation = 'animate-out-back';
                setTimeout(() => {
                    this.animation = 'animate-in-back';
                    this.activeStep -= 1;
                    this.e1 = 5;
                    this.isContractant = false,
                        this.isAssure = false
                    this.isBenef = false
                    this.Questionnaire = true
                    this.QuestionnaireSuite = false
                }, 600);
            },

            /*=============Filtre sans le + ni lettre sur les champs de type number ===========*/
            onlyNumber($event) {
                let NumOnly = ($event.NumOnly ? $event.NumOnly : $event.which);
                if ((NumOnly < 48 || NumOnly > 57) && NumOnly !== 46) {
                    $event.preventDefault();
                }
            },

            dateDiff: function () {
                if (this.dateEffet === '' && this.duree === '') this.dateEcheance = '';
                let inter = dayjs(this.dateEffet).add(this.duree, 'year').format('YYYY-MM-DD');
                this.dateEcheance = dayjs(inter).add(-1, 'day').format('YYYY-MM-DD')
            },

            isMobile: function () {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },

            isDesktop: function () {
                if (screen.width > 768) {
                    return true;
                } else {
                    return false;
                }
            },

            nextStep() {
                this.animation = 'animate-out';
                setTimeout(() => {
                    this.animation = 'animate-in';
                    this.activeStep += 1;
                    this.isContractant = false,
                        this.isAssure = true
                }, 600);
            },

            nextStep2() {
                this.animation = 'animate-out';
                setTimeout(() => {
                    this.animation = 'animate-in';
                    this.activeStep += 1;
                    this.isContractant = false,
                        this.isAssure = false,
                        this.isBenef =true
                }, 600);
            },

            nextStep3() {
                this.animation = 'animate-out';
                setTimeout(() => {
                    this.animation = 'animate-in';
                    this.activeStep += 1;
                    this.isContractant = false,
                        this.isAssure = false,
                        this.isBenef =false,
                        this.QuestionnaireSuite = true
                }, 600);
            },

            nextStep4() {
                this.animation = 'animate-out';
                setTimeout(() => {
                    this.animation = 'animate-in';
                    this.activeStep += 1;
                    this.isContractant = false,
                        this.isAssure = false,
                        this.isBenef =false,
                        this.QuestionnaireSuite = false
                    this.isPayment = true
                }, 600);
            },


            ContractControl() {
                this.errors = {}
                if(this.ContractantFields.Genre && this.ContractantFields.Situation){
                    if(this.ContractantFields.patrimoine && this.ContractantFields.revenu_annuel){
                        if (this.ContractantFields.Nom && this.ContractantFields.Prenom) {
                            if(this.ContractantFields.dateNaissance && this.ContractantFields.LieuNaissance){
                                if(this.ContractantFields.Profession && this.ContractantFields.Adresse){
                                    if(this.ContractantFields.Telephone && this.ContractantFields.Email){
                                        const validPhone = validatePhone(this.ContractantFields.Telephone);
                                        this.errors.phone = validPhone.error;

                                        const validEmail = validateEmail(this.ContractantFields.Email);
                                        this.errors.email = validEmail.error;
                                        if(validEmail.valide == true && validPhone.valide == true){
                                            if(this.ContractantFields.Cni){
                                                if(this.ContractantFields.Nationalite){
                                                    this.e1 = 3
                                                    this.nextStep();
                                                }else {
                                                    this.$toasted.show('Nationalité obligatoire! ', this.ToastTabError)
                                                    this.animation = 'animate-wrong';
                                                    setTimeout(() => {
                                                        this.animation = '';
                                                    }, 400);
                                                }
                                            }else {
                                                this.$toasted.show('Cni obligatoire! ', this.ToastTabError)
                                            }
                                        }
                                    }else {
                                        this.$toasted.show('Téléphone et Email obligatoires! ', this.ToastTabError)
                                    }
                                }else {
                                    this.$toasted.show('Profession et Adresse obligatoires! ', this.ToastTabError)
                                }
                            }else {
                                this.$toasted.show('Date et Lieu de naissance obligatoires! ', this.ToastTabError)
                            }
                        } else {
                            this.$toasted.show('Nom et Prénom obligatoires! ', this.ToastTabError)
                        }
                    }else {
                        this.$toasted.show('Revenu annuel et Patrimoine obligatoires! ', this.ToastTabError)
                    }
                }else {
                    this.$toasted.show('Genre et Situation obligatoires! ', this.ToastTabError)
                }

            },

            AssureControl() {
                this.errors = {}
                if (this.AssureFields.Nom && this.AssureFields.Prenom) {
                    if(this.AssureFields.dateNaissance && this.AssureFields.LieuNaissance){
                        if(this.AssureFields.Profession && this.AssureFields.Adresse){
                            if(this.AssureFields.Telephone && this.AssureFields.Email){
                                const validPhone = validatePhone(this.AssureFields.Telephone);
                                this.errors.phone = validPhone.error;

                                const validEmail = validateEmail(this.AssureFields.Email);
                                this.errors.email = validEmail.error;
                                if(validEmail.valide == true && validPhone.valide == true){
                                    if(this.AssureFields.LieuExe){
                                        if(this.AssureFields.Nationalite){
                                            this.e1 = 4
                                            this.nextStep2();
                                        }else {
                                            this.$toasted.show("Nationalité obligatoire! ", this.ToastTabError)
                                        }
                                    }else {
                                        this.$toasted.show("Lieu d'exercice obligatoire! ", this.ToastTabError)
                                    }
                                }
                            }else {
                                this.$toasted.show('Téléphone et Email obligatoires! ', this.ToastTabError)
                                this.animation = 'animate-wrong';
                                setTimeout(() => {
                                    this.animation = '';
                                }, 400);
                            }
                        }else {
                            this.$toasted.show('Profession et Adresse obligatoires! ', this.ToastTabError)
                        }
                    }else {
                        this.$toasted.show('Date et Lieu de naissance obligatoires! ', this.ToastTabError)
                    }
                } else {
                    this.$toasted.show('Nom et Prénom obligatoires! ', this.ToastTabError)
                }
            },

            BenefControl() {
                if (this.BenefiFields.Nom && this.BenefiFields.Prenom) {
                    if(this.BenefiFields.dateNaissance && this.BenefiFields.LieuNaissance){
                        if(this.BenefiFields.Filiation){
                            this.e1 = 5
                            this.nextStep3()
                        }else{
                            this.$toasted.show('Filiation obligatoire! ', this.ToastTabError)
                        }

                    }else {
                        this.$toasted.show('Date et Lieu de naissance obligatoires! ', this.ToastTabError)
                    }
                } else {
                    this.$toasted.show('Nom et Prénom obligatoires! ', this.ToastTabError)
                }
            },

            /*On check le numero de la question dans le tableau avant de pusher*/
            CheckValue(numero)
            {
              let checker = 0
              for(let v of  this.QuestionnaireTab)
              {
                 if(v.num===numero){
                   checker = 1
                 }
              }
              return checker
            },

            QuestionControlSuiteStep1() {
                if(this.question_0.resp_taille && this.question_0.resp_poid){
                    this.QuestionNext.Q = false
                    this.QuestionNext.Q1 = true
                    this.first_page = true
                }else {
                    this.$toasted.show("champs obligatoires! ", this.ToastTabError)
                }
                this.QuestionnaireTab.push(this.question_0)
            },

            QuestionControlSuiteStep2() {
                if(this.question_1.principal_response === 'oui'){
                  if(this.question_1.resp_justification !== ''){
                    this.QuestionNext.Q2 = true
                    if(this.CheckValue(this.question_1.num)==0)
                    {
                      this.QuestionnaireTab.push(this.question_1)
                    }
                  }else{
                    this.QuestionNext.Q2 = false
                  }
                }else if(this.question_1.principal_response === 'non') {
                    this.QuestionNext.Q2 = true
                    this.question_1.resp_justification = ''
                    this.QuestionnaireTab.push(this.question_1)
                }
              
            },

            QuestionControlSuiteStep3() {
                if(this.question_2.principal_response == 'oui'){
                  if(this.question_2.resp_justification !== ''){
                    this.QuestionNext.Q3 = true
                    if(this.CheckValue(this.question_2.num)==0)
                    {
                      this.QuestionnaireTab.push(this.question_2)
                    }
                   
                  }else{
                    this.QuestionNext.Q3 = false
                  }
                }else if(this.question_2.principal_response == 'non') {
                    this.QuestionNext.Q3 = true
                    this.question_2.resp_justification = ''
                    this.QuestionnaireTab.push(this.question_2)
                }

            },

            QuestionControlSuiteStep4() {
                if(this.question_3.principal_response == 'oui'){
                  if(this.question_3.resp_justification !== ''){
                    this.QuestionNext.Q4 = true
                    if(this.CheckValue(this.question_3.num)==0)
                    {
                      this.QuestionnaireTab.push(this.question_3)
                    }
                  }else{
                    this.QuestionNext.Q4 = false
                  }
                }else if(this.question_3.principal_response == 'non') {
                    this.QuestionNext.Q4 = true
                    this.question_3.resp_justification = ''
                    this.QuestionnaireTab.push(this.question_3)

                }

            },

            QuestionControlSuiteStep5() {
                if(this.question_4.principal_response === 'oui'){
                  if(this.question_4.resp_justification !== ''){
                    this.QuestionNext.Q5 = true
                    if(this.CheckValue(this.question_4.num)==0)
                    {
                      this.QuestionnaireTab.push(this.question_4)
                    }
                  }else{
                    this.QuestionNext.Q5 = false
                  }
                }else if(this.question_4.principal_response === 'non') {
                    this.QuestionNext.Q5 = true
                    this.question_4.resp_justification = ''
                    this.QuestionnaireTab.push(this.question_4)
                }


            },

            QuestionControlSuiteStep6() {
                if(this.question_5.principal_response === 'oui'){
                  if(this.question_5.resp_justification !== ''){
                    this.QuestionNext.Q6 = true
                    if(this.CheckValue(this.question_5.num)==0)
                    {
                      this.QuestionnaireTab.push(this.question_5)
                    }
                  }else{
                    this.QuestionNext.Q6 = false
                  }
                }else if(this.question_5.principal_response === 'non') {
                    this.QuestionNext.Q6 = true
                    this.question_5.resp_justification = ''
                    this.QuestionnaireTab.push(this.question_5)
                }


            },

            QuestionControlSuiteStep7() {
                if(this.question_6.principal_response === 'oui'){
                    if(this.question_6.resp_justification !== ''){
                      this.QuestionNext.Q7 = true
                      if(this.CheckValue(this.question_6.num)==0)
                      {
                        this.QuestionnaireTab.push(this.question_6)
                      }
                    }else{
                      this.QuestionNext.Q7 = false
                    }
                }else if(this.question_6.principal_response === 'non') {
                    this.QuestionNext.Q7 = true
                    this.question_5.resp_justification = ''
                    this.QuestionnaireTab.push(this.question_6)

                }

            },

            QuestionControlSuiteStep8() {
                if(this.question_7.principal_response === 'oui'){
                  if(this.question_7.resp_justification !== ''){
                    this.buttons = true
                      if(this.CheckValue(this.question_7.num)==0)
                      {
                        this.QuestionnaireTab.push(this.question_7)
                      }
                  }else{
                    this.buttons = false
                  }
                }else if(this.question_7.principal_response === 'non') {
                    this.question_7.resp_justification = ''
                    this.buttons = true
                    this.QuestionnaireTab.push(this.question_7)

                }

            },

            QuestionControlSuiteStep9() {
              if(this.question_8.principal_response === 'oui'){
                if(this.question_8.resp_justification !== ''){
                  this.QuestionNext.Q9 = true
                   if(this.CheckValue(this.question_8.num)==0)
                    {
                      this.QuestionnaireTab.push(this.question_8)
                    }
                }else{
                  this.QuestionNext.Q9 = false
                }
              }else if(this.question_8.principal_response === 'non') {
                this.QuestionNext.Q9 = true
                this.question_8.resp_justification = ''
                this.QuestionnaireTab.push(this.question_8)
              }
            },

            QuestionControlSuiteStep10() {
              if(this.question_9.principal_response == 'oui'){
                if(this.question_9.resp_justification !== ''){
                  this.QuestionNext.Q10 = true
                  if(this.CheckValue(this.question_9.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_9)
                  }
                }else{
                  this.QuestionNext.Q10 = false
            
                }
              }else if(this.question_9.principal_response == 'non') {
                this.QuestionNext.Q10 = true
                this.question_9.resp_justification = ''
                this.QuestionnaireTab.push(this.question_9)

              }
            },

            QuestionControlSuiteStep11() {
              if(this.question_10.principal_response == 'oui'){
                if(this.question_10.resp_justification !== ''){
                  this.QuestionNext.Q11 = true
                  if(this.CheckValue(this.question_10.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_10)
                  }
                }else{
                  this.QuestionNext.Q11 = false
                }
              }else if(this.question_10.principal_response == 'non') {
                this.QuestionNext.Q11 = true
                this.question_10.resp_justification = ''
                this.QuestionnaireTab.push(this.question_10)

              }

            },

            QuestionControlSuiteStep12() {
              if(this.question_11.principal_response === 'oui'){
                if(this.question_11.resp_justification !== ''){
                  this.QuestionNext.Q12 = true
                  if(this.CheckValue(this.question_11.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_11)
                  }
                }else{
                  this.QuestionNext.Q12 = false
                }
              }else if(this.question_11.principal_response === 'non') {
                this.QuestionNext.Q12 = true
                this.question_11.resp_justification = ''
                this.QuestionnaireTab.push(this.question_11)

              }


            },

            QuestionControlSuiteStep13() {
              if(this.question_12.principal_response === 'oui'){
                if(this.question_12.resp_justification !== ''){
                  this.QuestionNext.Q13 = true
                  if(this.CheckValue(this.question_12.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_12)
                  }
                }else{
                  this.QuestionNext.Q13 = false
                }
              }else if(this.question_12.principal_response === 'non') {
                this.QuestionNext.Q13 = true
                this.question_12.resp_justification = ''
                this.QuestionnaireTab.push(this.question_12)

              }


            },

            QuestionControlSuiteStep14() {
              if(this.question_13.principal_response === 'oui'){
                if(this.question_13.resp_justification !== ''){
                  this.QuestionNext.Q14 = true
                  if(this.CheckValue(this.question_13.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_13)
                  }
                }else{
                  this.QuestionNext.Q14 = false
                }
              }else if(this.question_13.principal_response === 'non') {
                this.QuestionNext.Q14 = true
                this.question_13.resp_justification = ''
                this.QuestionnaireTab.push(this.question_13)

              }

            },

            QuestionControlSuiteStep15() {
              if(this.question_14.principal_response === 'oui'){
                if(this.question_14.resp_justification !== ''){
                  this.buttons_2 = true
                  if(this.CheckValue(this.question_14.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_14)
                  }
                }else{
                  this.buttons_2 = false
                }
              }else if(this.question_14.principal_response === 'non') {
                this.question_14.resp_justification = ''
                this.buttons_2 = true
                this.QuestionnaireTab.push(this.question_14)

              }

            },

            QuestionControlSuiteStep16() {
              if(this.question_15.principal_response === 'oui'){
                if(this.question_15.resp_justification !== ''){
                  this.QuestionNext.Q16 = true
                  if(this.CheckValue(this.question_15.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_15)
                  }
                }else{
                  this.QuestionNext.Q16 = false
                }
              }else if(this.question_15.principal_response === 'non') {
                this.QuestionNext.Q16 = true
                this.question_15.resp_justification = ''
                this.QuestionnaireTab.push(this.question_15)
              }
            },

            QuestionControlSuiteStep17() {
              if(this.question_16.principal_response == 'oui'){
                if(this.question_16.resp_justification !== ''){
                  this.QuestionNext.Q17 = true
                  if(this.CheckValue(this.question_16.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_16)
                  }
                }else{
                  this.QuestionNext.Q17 = false
                }
              }else if(this.question_16.principal_response == 'non') {
                this.QuestionNext.Q17 = true
                this.question_16.resp_justification = ''
                this.QuestionnaireTab.push(this.question_16)

              }
            },

            QuestionControlSuiteStep18() {
              if(this.question_17.principal_response == 'oui'){
                if(this.question_17.resp_justification !== ''){
                  this.QuestionNext.Q18 = true
                  if(this.CheckValue(this.question_17.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_17)
                  }
                }else{
                  this.QuestionNext.Q18 = false
                }
              }else if(this.question_17.principal_response == 'non') {
                this.QuestionNext.Q18 = true
                this.question_17.resp_justification = ''
                this.QuestionnaireTab.push(this.question_17)

              }

            },

            QuestionControlSuiteStep19() {
              if(this.question_18.principal_response === 'oui'){
                if(this.question_18.resp_justification !== ''){
                  this.QuestionNext.Q19 = true
                  if(this.CheckValue(this.question_18.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_18)
                  }
                }else{
                  this.QuestionNext.Q19 = false
                }
              }else if(this.question_18.principal_response === 'non') {
                this.QuestionNext.Q19 = true
                this.question_18.resp_justification = ''
                this.QuestionnaireTab.push(this.question_18)

              }


            },

            QuestionControlSuiteStep20() {
              if(this.question_19.principal_response === 'oui'){
                if(this.question_19.resp_justification !== ''){
                  this.QuestionNext.Q20 = true
                  if(this.CheckValue(this.question_19.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_19)
                  }
                }else{
                  this.QuestionNext.Q20 = false
                }
              }else if(this.question_19.principal_response === 'non') {
                this.QuestionNext.Q20 = true
                this.question_19.resp_justification = ''
                this.QuestionnaireTab.push(this.question_19)

              }


            },

            QuestionControlSuiteStep21() {
              if(this.question_20.principal_response === 'oui'){
                if(this.question_20.resp_justification !== ''){
                  this.QuestionNext.Q21 = true
                  if(this.CheckValue(this.question_20.num)==0)
                  {
                    this.QuestionnaireTab.push(this.question_20)
                  }
                }else{
                  this.QuestionNext.Q21 = false
                }
              }else if(this.question_20.principal_response === 'non') {
                this.QuestionNext.Q21 = true
                this.question_20.resp_justification = ''
                this.QuestionnaireTab.push(this.question_20)

              }

            },
/*=================================================================*/
            QuestionControlSuiteStep22() {
              if(this.question_21.principal_response === 'oui'){
                if(this.question_21.resp_justification !== ''){
                    this.buttons_3 = true
                    if(this.CheckValue(this.question_21.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_21)
                    }
                }else{
                  this.buttons_3 = false
                }
              }else if(this.question_21.principal_response === 'non') {
                this.question_21.resp_justification = ''
                this.buttons_3 = true
                this.QuestionnaireTab.push(this.question_21)

              }

            },

            QuestionControlSuiteStep23() {
              if(this.question_22.principal_response === 'oui'){
                if(this.question_22.resp_justification !== ''){
                  this.QuestionNext.Q23 = true
                    if(this.CheckValue(this.question_22.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_22)
                    }
                }else{
                  this.QuestionNext.Q23 = false
                }
              }else if(this.question_22.principal_response === 'non') {
                this.QuestionNext.Q23 = true
                this.question_22.resp_justification = ''
                this.QuestionnaireTab.push(this.question_22)
              }
            },

            QuestionControlSuiteStep24() {
              if(this.question_23.principal_response == 'oui'){
                if(this.question_23.resp_justification !== ''){
                  this.QuestionNext.Q24 = true
                      if(this.CheckValue(this.question_23.num)==0)
                        {
                            this.QuestionnaireTab.push(this.question_23)
                        }
                }else{
                  this.QuestionNext.Q24 = false
                }
              }else if(this.question_23.principal_response == 'non') {
                this.QuestionNext.Q24 = true
                this.question_23.resp_justification = ''
                this.QuestionnaireTab.push(this.question_23)

              }
            },

            QuestionControlSuiteStep25() {
              if(this.question_24.principal_response == 'oui'){
                if(this.question_24.resp_justification !== ''){
                  this.QuestionNext.Q25 = true
                    if(this.CheckValue(this.question_24.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_24)
                    }
                }else{
                  this.QuestionNext.Q25 = false
                }
              }else if(this.question_24.principal_response == 'non') {
                this.QuestionNext.Q25 = true
                this.question_24.resp_justification = ''
                this.QuestionnaireTab.push(this.question_24)

              }

            },

            QuestionControlSuiteStep26() {
              if(this.question_25.principal_response === 'oui'){
                if(this.question_25.resp_justification !== ''){
                  this.QuestionNext.Q26 = true
                    if(this.CheckValue(this.question_25.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_25)
                    }
                }else{
                  this.QuestionNext.Q26 = false
                }
              }else if(this.question_25.principal_response === 'non') {
                this.QuestionNext.Q26 = true
                this.question_25.resp_justification = ''
                this.QuestionnaireTab.push(this.question_25)

              }


            },

            QuestionControlSuiteStep27() {
              if(this.question_26.principal_response === 'oui'){
                if(this.question_26.resp_justification !== ''){
                  this.QuestionNext.Q27 = true
                    if(this.CheckValue(this.question_26.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_26)
                    }
                }else{
                  this.QuestionNext.Q27 = false
                }
              }else if(this.question_26.principal_response === 'non') {
                this.QuestionNext.Q27 = true
                this.question_26.resp_justification = ''
                this.QuestionnaireTab.push(this.question_26)

              }


            },

            QuestionControlSuiteStep28() {
              if(this.question_27.principal_response === 'oui'){
                if(this.question_27.resp_justification !== ''){
                  this.QuestionNext.Q28 = true
                    if(this.CheckValue(this.question_27.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_27)
                    }
                }else{
                  this.QuestionNext.Q28 = false
                }
              }else if(this.question_27.principal_response === 'non') {
                this.QuestionNext.Q28 = true
                this.question_20.resp_justification = ''
                this.QuestionnaireTab.push(this.question_27)

              }

            },

            QuestionControlSuiteStep29() {
              if(this.question_28.principal_response === 'oui'){
                if(this.question_28.resp_justification !== ''){
                  this.buttons_4 = true
                    if(this.CheckValue(this.question_28.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_28)
                    }
                }else{
                  this.buttons_4 = false
                }
              }else if(this.question_28.principal_response === 'non') {
                this.question_28.resp_justification = ''
                this.buttons_4 = true
                this.QuestionnaireTab.push(this.question_28)

              }

            },

            QuestionControlSuiteStep30() {
              if(this.question_29.principal_response === 'oui'){
                if(this.question_29.resp_justification !== ''){
                  this.QuestionNext.Q30 = true
                    if(this.CheckValue(this.question_29.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_29)
                    }
                }else{
                  this.QuestionNext.Q30 = false
                }
              }else if(this.question_29.principal_response === 'non') {
                this.QuestionNext.Q30 = true
                this.question_29.resp_justification = ''
                this.QuestionnaireTab.push(this.question_29)
              }
            },

            QuestionControlSuiteStep31() {
              if(this.question_30.principal_response == 'oui'){
                if(this.question_30.resp_justification !== ''){
                  this.QuestionNext.Q31 = true
                    if(this.CheckValue(this.question_30.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_30)
                    }
                }else{
                  this.QuestionNext.Q24 = false
                }
              }else if(this.question_30.principal_response == 'non') {
                this.QuestionNext.Q31 = true
                this.question_30.resp_justification = ''
                this.QuestionnaireTab.push(this.question_30)

              }
            },

            QuestionControlSuiteStep32() {
              if(this.question_31.principal_response == 'oui'){
                if(this.question_31.resp_justification !== ''){
                  this.QuestionNext.Q32 = true
                    if(this.CheckValue(this.question_31.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_31)
                    }
                }else{
                  this.QuestionNext.Q25 = false
                }
              }else if(this.question_31.principal_response == 'non') {
                this.QuestionNext.Q32 = true
                this.question_31.resp_justification = ''
                this.QuestionnaireTab.push(this.question_31)

              }

            },

            QuestionControlSuiteStep33() {
              if(this.question_32.principal_response === 'oui'){
                if(this.question_32.resp_justification !== ''){
                  this.QuestionNext.Q33 = true
                    if(this.CheckValue(this.question_32.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_32)
                    }
                }else{
                  this.QuestionNext.Q33 = false
                }
              }else if(this.question_32.principal_response === 'non') {
                this.QuestionNext.Q33 = true
                this.question_32.resp_justification = ''
                this.QuestionnaireTab.push(this.question_32)

              }


            },

            QuestionControlSuiteStep34() {
              if(this.question_33.principal_response === 'oui'){
                if(this.question_33.resp_justification !== ''){
                  this.QuestionNext.Q34 = true
                    if(this.CheckValue(this.question_33.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_33)
                    }
                }else{
                  this.QuestionNext.Q34 = false
                }
              }else if(this.question_33.principal_response === 'non') {
                this.QuestionNext.Q34 = true
                this.question_33.resp_justification = ''
                this.QuestionnaireTab.push(this.question_33)

              }


            },

            QuestionControlSuiteStep35() {
              if(this.question_34.principal_response === 'oui'){
                if(this.question_34.resp_justification !== ''){
                  this.QuestionNext.Q35 = true
                    if(this.CheckValue(this.question_34.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_34)
                    }
                }else{
                  this.QuestionNext.Q35 = false
                }
              }else if(this.question_34.principal_response === 'non') {
                this.QuestionNext.Q35 = true
                this.question_34.resp_justification = ''
                this.QuestionnaireTab.push(this.question_34)

              }

            },

            QuestionControlSuiteStep36() {
              if(this.question_35.principal_response === 'oui'){
                if(this.question_35.resp_justification !== ''){
                  this.QuestionNext.Q36 = true
                    if(this.CheckValue(this.question_35.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_35)
                    }
                }else{
                  this.QuestionNext.Q36 = false
                }
              }else if(this.question_35.principal_response === 'non') {
                this.QuestionNext.Q36 = true
                this.question_35.resp_justification = ''
                this.QuestionnaireTab.push(this.question_35)

              }

            },

            QuestionControlSuiteStep37() {
              if(this.question_36.principal_response === 'oui'){
                if(this.question_36.resp_justification !== ''){
                  this.buttons_5 = true
                    if(this.CheckValue(this.question_36.num)==0)
                    {
                        this.QuestionnaireTab.push(this.question_36)
                    }
                }else{
                  this.buttons_5 = false
                }
              }else if(this.question_36.principal_response === 'non') {
                this.question_36.resp_justification = ''
                this.buttons_5 = true
                this.QuestionnaireTab.push(this.question_36)

              }

            },

            BackToBenefForm(){
                this.animation = 'animate-out-back';
                setTimeout(() => {
                    this.animation = 'animate-in-back';
                    this.activeStep -= 1;
                    this.e1 = 4;
                    this.isContractant = false,
                        this.isAssure = false,
                        this.isBenef = true
                }, 500);
            },

            QuestionControlSuiteBack(){
                this.QuestionNext.Q = true
                this.first_page = false
                this.second_page = false
                this.thirst_page = false
                this.fourt_page = false
                this.five_page = false
            },

            QuestionControlSuiteBack1(){
                this.first_page = false
                this.second_page = true
                this.thirst_page = false
                this.fourt_page = false
                this.five_page = false
            },

            QuestionControlSuiteBack2(){
                this.first_page = false
                this.second_page = false
                this.thirst_page = true
                this.fourt_page = false
                this.five_page = false
            },

            QuestionControlSuiteBack3(){
                this.first_page = false
                this.second_page = false
                this.thirst_page = false
                this.fourt_page = true
                this.five_page = false
            },

            QuestionControlSuiteBack4(){
                this.QuestionNext.Q4 = true
                this.QuestionNext.Q5 = false
            },

            QuestionControlSuiteBack5(){
                this.QuestionNext.Q5 = true
                this.QuestionNext.Q6 = false
            },

            QuestionControlSuiteBack6(){
                this.QuestionNext.Q6 = true
                this.QuestionNext.Q7 = false
            },

            validField() {
              this.e1 = 6
              this.nextStep4()
              this.bottomPushNotif =false

               
            }
        },
        mounted() {
            $( document ).ready(function() {
                $(".swith-click").click(function() {
                    $(".swith-click").removeClass('active');
                    $(this).addClass("active");
                });
            });
        },
        created() {
            this.QuestionMedical = QMNsia.MediaclQuestion
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/button.css";
    article {
        margin: 10px;
        width: calc(100% - 20px);
        min-height: 480px;
    }

    article .progress-step {
        justify-content: center;
        align-items: center;
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-bottom: 20px;
        color: #fff;
        background-color: #df5c2e;
        font-weight: bold;
    }
    article .progress-step.active {
        background-color: #df5c2e;
    }
    article .progress-step.active ~ .progress-step {
        color: #555;
        background-color: #ccc;
    }
    article .progress-step.active ~ .progress-step::before {
        background-color: #ccc;
    }
    article .progress-step:before {
        content: '';
        position: absolute;
        top: -20px;
        width: 2px;
        height: 20px;
        background: #df5c2e;
        z-index: 10;
    }
    article .progress-step:first-child::before {
        display: none;
    }
    article section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: auto;
        background-color: #fff;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
        border-radius: 30px!important;
    }
    article section h2 {
        font-size: 1.6rem;
        color: #ffa409;
        margin: 0;
        padding: 20px;
    }
    article section .input-fields {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
    article section .input-fields-mobile {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
    article section .input-container {
        position: relative;
        padding: 30px 20px 20px 20px;
        width: 100%;
        align-content: center;

    }

    article section .actions {
        margin: 30px 0 0 0;
    }
    article section .actions button {
        font-family: 'Noto Sans', sans-serif;
        outline: none;
        border: none;
        color: #fff;
        background-color: #ffa409;
        font-size: 1.15rem;
        padding: 5px 20px;
        margin: 0 10px;
        text-transform: uppercase;
        border-radius: 30px;
        cursor: pointer;
    }
    .animate-out {
        transform-origin: right;
        animation: out 0.6s ease-in-out;
    }
    .animate-in {
        transform-origin: right;
        animation: in 0.6s ease-in-out;
    }
    .animate-out-back{
        transform-origin: bottom;
        animation: out 0.6s ease-in-out;
    }
    .animate-in-back {
        transform-origin: left;
        animation: in 0.6s ease-in-out;
    }
    .animate-wrong {
        animation: wrong 0.4s ease-in-out;
    }
    @keyframes out {
        0% {
            transform: translateY(0px) rotate(0deg);
        }
        /*60% {
            transform: rotate(10deg);
        }*/
        100% {
            transform: translateY(400px);
        }
    }
    @keyframes in {
        0% {
            opacity: 0;
            transform: rotateY(90deg);
        }
        100% {
            opacity: 1;
            transform: rotateY(0deg);
        }
    }
    @keyframes wrong {
        0% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(40px);
        }
        40% {
            transform: translateX(20px);
        }
        60% {
            transform: translateX(40px);
        }
        80% {
            transform: translateX(20px);
        }
        100% {
            transform: translateX(0);
        }
    }



    [type="radio"]:checked,
    [type="radio"]:not(:checked) {
        position: absolute;
        left: -9999px;
    }
    [type="radio"]:checked + label,
    [type="radio"]:not(:checked) + label
    {
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        line-height: 20px;
        display: inline-block;
        color: #666;
    }
    [type="radio"]:checked + label:before,
    [type="radio"]:not(:checked) + label:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        border: 1px solid #ddd;
        border-radius: 100%;
        background: #fff;
    }
    [type="radio"]:checked + label:after,
    [type="radio"]:not(:checked) + label:after {
        content: '';
        width: 12px;
        height: 12px;
        background: #ffa409;
        position: absolute;
        top: 4px;
        left: 4px;
        border-radius: 100%;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }
    [type="radio"]:not(:checked) + label:after {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    [type="radio"]:checked + label:after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }



    *:focus {
        outline: none;
    }

    body {
        background-color: #efefef;
        padding: 70px;
        font-family: "Open Sans", "Arial", snas-serif;
    }

    .input-group {
        display: block;
        width: 441px;
        max-width: 100%;
        height: 50px;
        margin-top: 30px;
        border: 0;
        background-color: #ffffff;
        border-bottom-left-radius: 41px;
        border-bottom-right-radius: 41px;
        border-top-left-radius: 41px;
        border-top-right-radius: 0;
        box-shadow: 0 17px 40px 0 rgba(75, 128, 182, 0.07);
        margin-bottom: 22px;
        position: relative;
        font-size: 17px;
        color: #a7b4c1;
        transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out,
        box-shadow 0.1s ease-in-out;
    }
    .input-group-mobile {
        display: block;
        width: 100%!important;
        //max-width: 100%;
        height: 50px;
        //margin-top: 30px;
        border: 0;
        background-color: #ffffff;
        border-bottom-left-radius: 41px;
        border-bottom-right-radius: 41px;
        border-top-left-radius: 41px;
        border-top-right-radius: 41px;
        box-shadow: 0 17px 40px 0 rgba(75, 128, 182, 0.07);
        margin-bottom: 22px;
        position: relative;
        font-size: 17px;
        color: #a7b4c1;
        transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out,
        box-shadow 0.1s ease-in-out;
    }

    .input-group:hover {
        box-shadow: 0 14px 44px 0 rgba(255,164,9, 0.077);
    }
    .input-group-mobile:hover {
        box-shadow: 0 14px 44px 0 rgba(255,164,9, 0.077);
    }

    .input-group input {
        position: absolute;
        border: 0;
        box-shadow: none;
        background-color: rgba(255, 255, 255, 0);
        top: 0;
        margin-top: -20px;
        height: 65px;
        width: 100%;
        padding: 0 53px;
        box-sizing: border-box;
        z-index: 3;
        display: block;
        color: #1a6fc4;
        font-size: 17px;
        font-family: "Oxygen", sans-serif;
        transition: top 0.1s ease-in-out;
    }
    .input-group-mobile input {
        position: absolute;
        border: 0;
        box-shadow: none;
        background-color: rgba(255, 255, 255, 0);
        top: 0;
        margin-top: -20px;
        height: 65px;
        width: 100%;
        padding: 0 53px;
        box-sizing: border-box;
        z-index: 3;
        display: block;
        color: #1a6fc4;
        font-size: 17px;
        font-family: "Oxygen", sans-serif;
        transition: top 0.1s ease-in-out;
    }

    .input-group input::placeholder {
        color: rgba(0, 0, 0, 0);
    }
    .input-group-mobil input::placeholder {
        color: rgba(0, 0, 0, 0);
    }

    .input-group input:focus,
    .input-group input:not(:placeholder-shown) {
        top: 17px;
    }
    .input-group-mobile input:focus,
    .input-group-mobile input:not(:placeholder-shown) {
        top: 17px;
    }

    .input-group label {
        position: absolute;
        border: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        padding: 0 53px;
        box-sizing: border-box;
        transition: all 0.1s ease-in-out;
        cursor: text;
    }
    .input-group-mobile label {
        position: absolute;
        border: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        padding: 0 53px;
        box-sizing: border-box;
        transition: all 0.1s ease-in-out;
        cursor: text;
    }

    .input-group input:focus + label,
    .input-group input:not(:placeholder-shown) + label {
        bottom: 20px;
        font-size: 13px;
        opacity: 0.7;
    }

    .input-group-mobile input:focus + label,
    .input-group-mobile input:not(:placeholder-shown) + label {
        bottom: 20px;
        font-size: 13px;
        opacity: 0.7;
    }

    .req-mark {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 33px;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 22px;
        color: #e0e0e0;
        font-family: "Ubuntu", sans-serif;
    }



    .row-container {
        background: white;
    }

    .to-top {
        margin-top: -5%;
    }

    .to-left {
        text-align: left;
    }

    .to-right {
        float: right;
    }

    .to-right-mobile {
        float: right;
        margin-right: 2%;
    }

    .to-right-tablet {
        float: right;
        font-size: 12px;
    }

    .to-left span {
        color: black;
        font-weight: bold;
    }

    .table-donnees {
        border-collapse: collapse;
    }

    .table-donnees tr td {
        border: 1px solid lightgrey !important;
    }

    .List-cout li {
        list-style: none;
    }

    .list-boutons li {
        list-style: none;
    }

    .logo-assureur {
        border: 1px solid lightgrey;
    }

    .right--texting {
        text-align: right;
    }

    .right--texting ul li .col-lg-6:hover {
        background: #ffa409;
        color: white;
        text-decoration: none;
    }

    .answer {
        position: relative;
        margin-right: 0;
        float: left;
        display: block;
        margin-right: 2.12766%;
        width: 100%;
    }

    .highlight {
        padding: 6px 12px;
        display: -ms-flexbox;
        display: flex;
        position: relative;
        font-size: 0.0625rem;
        cursor: pointer;
        color: #6d6d6d;
        border: solid 1px transparent;
        border-bottom: solid 1px #e9e9e9;
        border-radius: 3px;
        transition: background 0.4s;
    }

    .highlight:hover {
        background-color: rgba(255, 164, 9, 0.3);
        padding-left: 10px;
        transition-duration: 0.5s;
    }

    ul li {
        list-style: none;
        padding-top: 7px;
    }

    .container {
        //padding: 0px !important;
    }

    .uppercase {
        font-weight: bold;
        color: #ffa409;
        text-transform: uppercase;
        font-size: 16px;
    }

    .head {
        background-color: rgb(91, 148, 188);
        color: white;
        font-size: 18px;
    }

    .selectatMobile {
        background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right;
        -webkit-appearance: none;
        background-position-x: 95%;
        border-bottom: 1px solid gray;
    }

    .selectatDesktop {
        background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right;
        -webkit-appearance: none;
        background-position-x: 90%;
        border-bottom: 1px solid gray;
    }

    .georgia {
        font-family: Georgia !important;
    }

    .border-radius {
        border-radius: 20px !important;
    }

    .card-desktop {
        height: 150px !important;
        width: 150px !important;
    }

    .form .plan input,
    .form .payment-plan input,
    .form .payment-type input {
        display: none;
    }

    .form label {
        /* margin-top: 15px; */
        width: 120px;
        position: relative;
        color: #333;
        font-family: Georgia !important;
        border-radius: 20px !important;
        background-color: #fff;
        font-size: 15px;
        text-align: center;
        height: 120px;
        display: block;
        cursor: pointer;
        border: 3px solid transparent;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .form .plan input:checked+label,
    .form .payment-plan input:checked+label,
    .form .payment-type input:checked+label {
        border-radius: 20px !important;
        background-color: #ffa409;
        color: #fff;
    }

    .form .plan input:checked+label:after,
    form .payment-plan input:checked+label:after,
    .form .payment-type input:checked+label:after {
        content: "\2713";
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 100%;
        border: 2px solid #ffa409;
        background-color: #fff;
        color: #ffa409;
        z-index: 999;
        position: absolute;
        top: -10px;
        right: -10px;
    }

    /*================== CSS SELECT GLOBAL AUTO===================*/
    /* Reset Select */
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        outline: 0;
        box-shadow: none;

        background: #fff;
    }

    /* Remove IE arrow */
    select::-ms-expand {
        display: none;
    }

    select {
        flex: 1;
        padding: 0 0.5em;
        color: grey;
        cursor: pointer;
    }

    /*================== CSS SELECT DESKTOP AUTO===================*/
    /* Custom Select */
    .select {
        position: relative;
        display: flex;
        width: 100%;
        height: 3em;
        line-height: 3;
        background: #fff;
        overflow: hidden;
        border: 2px solid #d3d3d3 !important;
        border-radius: 35px;
    }

    /* Arrow */
    .select::after {
        content: "\2228";
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 1em;
        background: #fff;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: 0.25s all ease;
        -o-transition: 0.25s all ease;
        transition: 0.25s all ease;
    }

    /* Transition */
    .select:hover::after {
        color: #f39c12;
    }

    /*css popup Free*/

    .containerP {
        margin-top: 15px;
        font-family: PT Sans, sans-serif;
        font-size: 18px;
        max-width: 500px;
        height: 500px;
        background: white;
        border-radius: 9px;
        overflow: hidden;
    }

    .icing,
    .dough {
        float: left;
        padding: 20px;
        box-sizing: border-box;
        height: 100%;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        text-align: center;
    }

    .icing {
        width: 33%;
        position: relative;
        padding-right: 24px;
        background: -webkit-gradient(linear,
        left top,
        right top,
        from(#ffa409),
        color-stop(100%, #6c757d));
        background: linear-gradient(to right, #ffa409 100%, #6c757d 80%);
        color: white;
    }

    .icing:before {
        content: "";
        width: 36px;
        height: 36px;
        display: block;
        position: absolute;
        top: -18px;
        right: -7.2px;
        z-index: 1;
    }

    .dough {
        width: 67%;
        padding-left: 36px;
        color: black;
    }

    .order {
        -webkit-box-flex: 1;
        flex-grow: 1;
        /* padding: 20px 0;
            margin: 20px 0; */
        border: 1px solid white;
        border-color: white transparent;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }

    .order li {
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        text-align: center;
    }

    h2 {
        font-size: 1.2em;
    }

    .total {
        font-size: 22px;
        text-align: center;
        font-weight: bold;
    }

    .inputs {
        -webkit-box-flex: 1;
        flex-grow: 1;
    }

    .rowFree {
        width: 100%;
        display: -webkit-box;
        display: flex;
        -webkit-box-align: end;
        align-items: flex-end;
        margin-bottom: 6px;
    }

    .rowFreeMobile {
        /* width: 100%; */
        display: -webkit-box;
        display: flex;
        -webkit-box-align: end;
        align-items: flex-end;
        margin-bottom: 6px;
    }

    .column {
        width: 100%;
    }

    .column:not(:last-child) {
        margin-right: 10px;
    }

    .label,
    .text-input {
        float: left;
        display: block;
        clear: both;
    }

    .label {
        font-size: 0.8em;
        margin-bottom: 0.2em;
    }

    .text-input {
        box-sizing: border-box;
        width: 90%;
        padding: 10px;
        font-size: 1em;
        font-family: inherit;
        background: white;
        border: 1px solid #ffa409;
        border-radius: 5px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1) inset;
    }

    .name-group {
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-basis: 200px;
    }

    .order-button {
        padding: 10px 20px;
        width: 100%;
        box-sizing: border-box;
        font-size: 13px;
        font-family: inherit;
        color: inherit;
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(144, 81, 14, 0.3);
        box-shadow: 0 2px 2px rgba(144, 81, 14, 0.1);
        border-radius: 5px;
        -webkit-transition: background 0.1s, color 0.1s, border-color 0.1s;
        transition: background 0.1s, color 0.1s, border-color 0.1s;
    }

    .buttonFRMobile {
        padding: 10px 20px;
        width: 100%;
        box-sizing: border-box;
        font-size: 13px;
        font-family: inherit;
        color: inherit;
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(144, 81, 14, 0.3);
        box-shadow: 0 2px 2px rgba(144, 81, 14, 0.1);
        border-radius: 5px;
        -webkit-transition: background 0.1s, color 0.1s, border-color 0.1s;
        transition: background 0.1s, color 0.1s, border-color 0.1s;
    }

    .order-button:hover {
        background: #ffa409;
        color: white;
        border-color: transparent;
    }

    .policeLato {
        font-family: Lato, "Helvetica Neue", Arial, sans-serif
    }
    #error{
        color: red;
        font-weight: bold;
        font-size: 13px;
        position: absolute;
        font-family: Lato, "Helvetica Neue", Arial, sans-serif;
        float: left;
        margin-top: 50px;
        margin-left: 12px;
        z-index: 10000!important;


    }




    #container-question {
        /*width: 1000px!important;
        margin: 3% auto;
        margin-top: 0;
        max-width: 700px;
        min-width: 320px;
        padding: 3%;
        border-radius: 5px;*/

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .label {
        display: inline-block;
        vertical-align: top;
        text-align: right;
        width: 20%;
    }

    .labels {
        display: block;
        vertical-align: top;
        text-align: center;
        width: auto;
    }
    .labels-mobile {
        display: inline-flex;
        vertical-align: top;
        text-align: center;
        width: 100%!important;
        align-items: center;
        justify-content: center;
    }

    .inputs {
        display: inline-block;
        vertical-align: bottom;
        text-align: left;
        width: auto;
        margin-bottom:10px ;
    }




    .inputBox{
        width: 80%
    }

    .painBox, .box{
        width: 100%;
        background: lightgrey;
        border-radius: 30px!important;
    }
    .box::placeholder {
        padding-left: 10px;
    }

    radio {
        text-align: left;
    }








    .input-group-textarea {
        display: block;
        height: 50px;
        margin-top: 30px;
        border: 0;
        background-color: #ffffff;
        border-bottom-left-radius: 41px;
        border-bottom-right-radius: 41px;
        border-top-left-radius: 41px;
        border-top-right-radius: 0;
        box-shadow: 0 17px 40px 0 rgba(75, 128, 182, 0.07);
        //margin-bottom: 22px;
        position: relative;
        font-size: 15px;
        padding-left: 20px;
        padding-right: 20px;
        color: #a7b4c1;
        transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out,
        box-shadow 0.1s ease-in-out;
    }
    .input-group-textarea-mobile {
        display: block;
        width: 100%!important;
        max-width: 100%;
        font-size: 10px;
        margin-top: -15px;
        border: 0;
        background-color: #ffffff;
        border-bottom-left-radius: 41px;
        border-bottom-right-radius: 41px;
        border-top-left-radius: 41px;
        border-top-right-radius: 41px;
        box-shadow: 0 17px 40px 0 rgba(75, 128, 182, 0.07);
        //margin-bottom: 22px;
        position: relative;
        font-size: 17px;
        color: #a7b4c1;
        color: #a7b4c1;
        transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out,
        box-shadow 0.1s ease-in-out;
    }

    .input-group-textareaplacehold::placeholder {
        display: flex;
        color: #a7b4c1;
        font-size: 14px;
        font-family: "Ubuntu", sans-serif;
        opacity: 0.7;
        margin-bottom: 10px;
    }
    .input-group-textarea-mobileplacehold::placeholder {
        display: flex;
        color: #a7b4c1;
        font-size: 14px;
        font-family: "Ubuntu", sans-serif;
        opacity: 0.7;
        margin-bottom: 10px;
    }
    .input-group-textarea:hover {
        box-shadow: 0 14px 44px 0 rgba(255,164,9, 0.077);
    }

    .input-group-textarea textarea {
        position: absolute;
        border: 0;
        box-shadow: none;
        background-color: white;
        top: 0;
        //margin-top: -20px;
        height: 50px;
        width: 100%;
        padding: 0 53px;
        box-sizing: border-box;
        border-bottom-left-radius: 41px;
        border-bottom-right-radius: 41px;
        border-top-left-radius: 41px;
        border-top-right-radius: 0;
        display: block;
        color: #1a6fc4;
        font-size: 17px;
        font-family: "Oxygen", sans-serif;
        transition: top 0.1s ease-in-out;
    }

    .input-group input::placeholder {
        color: rgba(0, 0, 0, 0);
    }


    .input-group-textarea label {
        position: absolute;
        border: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        padding: 0 53px;
        box-sizing: border-box;
        transition: all 0.1s ease-in-out;
        cursor: text;
        color: #ffa409;
    }

    .input-group-textarea textarea:focus + label,
    .input-group-textarea textarea:not(:placeholder-shown) + label {
        bottom: 20px;
        padding-right: 20px;
        font-size: 13px;
        opacity: 0.7;
    }












    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 25px;
    }

    .switch input {
        display: none;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #ffa409;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #101010;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }





    /* Reset Select */
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        outline: 0;
        box-shadow: none;
        border: 0 !important;
        width: 200px;
        background: #fff;
        background-image: none;
    }
    /* Remove IE arrow */
    select::-ms-expand {
        display: none;
    }
    /* Custom Select */
    .select {
        position: relative;
        display: flex;
        width: 200px;
        height: 3em;
        line-height: 3;
        background: #2c3e50;
        overflow: hidden;
        border-radius: 30px;
    }
    select {
        flex: 1;
        padding: 0 .5em;
        color: grey;
        font-weight: bold;
        cursor: pointer;
    }
    /* Arrow */
    .select::after {
        content: '\25BC';
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 1em;
        background: #34495e;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: .25s all ease;
        -o-transition: .25s all ease;
        transition: .25s all ease;
    }
    /* Transition */
    .select:hover::after {
        color: #f39c12;
    }

    #titre{
        font-size: 17px;
        font-weight: bold;
        color: #5a5a5a;
        margin-bottom: -15px;
    }

    .input-number[type=text]{
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        /*border: 2px solid darkseagreen;*/
        color: #C9224D;
        width: 200px;
        height: 42px;
        font-weight: bold;
        background: #fff;
        padding-left: 10px;
    }

    .input-number[type=text]:focus {
        outline: none;
        border: 1px solid #fff;
        /* color: #2d9fd9;*/
    }


    .input-number[type=number]{
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        /*border: 2px solid darkseagreen;*/
        color: #C9224D;
        width: 200px;
        height: 42px;
        font-weight: bold;
        background: #fff;
        padding-left: 10px;
    }

    .input-number[type=number]:focus {
        outline: none;
        border: 1px solid #fff;
        /* color: #2d9fd9;*/
    }

    #input-number{
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        /*border: 2px solid darkseagreen;*/
        color: #C9224D;
        width: 200px;
        height: 42px;
        font-weight: bold;
        background: #fff;
        padding-left: 10px;
    }

    #input-number:focus {
        outline: none;
        border: 1px solid #fff;
        /* color: #2d9fd9;*/
    }

    #circle_number p {
        margin-top: 5px;
        font-weight: bold;
    }

    #circle_number {
        margin-bottom: 3px;
        background-color: #ffffff;
        display: inline-block;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        text-align: center;
        margin-top: 10px;
    }

    .select-css {
        display: block;
        font-size: 15px;
        font-family: Lato, "Helvetica Neue", Arial, sans-serif;
        font-weight: 500;
        float: right;
        color: #444;
        line-height: 1.3;
        padding: .6em 1.4em .5em .8em;
        box-sizing: border-box;
        margin: 0;
        border: 1px solid #aaa;
        box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
        border-radius: .5em;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff;
        z-index: 3;
        position: relative;

        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
        linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
    }
    .select-css::-ms-expand {
        display: none;
    }
    .select-css:hover {
        border-color: #888;
    }
    .select-css:focus {
        border-color: #aaa;
        box-shadow: 0 0 1px 1px rgba(59, 153, 252, .7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #222;
        outline: none;
    }
    .select-css option {
        font-weight:normal;
    }








    .switchbutton.active {
        background-color: #ffa408;
        color: white;
    }

    .switchbutton {
        width: 250px;
        height: 35px;
        color: #8c8c8c;
        border-radius:30px;
        font-weight: 700;
        background-color: #f4efeb;
        border: none;
        letter-spacing: 2px;
        outline: none;
    }

    .notification{
        z-index: 4;
        width: 50%;
        height: 60px;
        border-radius: 50px 0px 5px 50px;
        margin: 0 auto;
        box-shadow: #95a5a6 0px 0px 8px 4px;
        color: white;
        line-height: 40px;
        overflow: hidden;
        animation: reveal 1 2s;
        position: fixed;
        bottom: 0;
        right: 0;
        float:right!important;
        background: #5B94BC!important;
    }
    .notification-mobile{
        z-index: 4;
        width: 100%;
        height: 60px;
        border-radius: 0px 0px 0px 0px;
        margin: 0 auto;
        box-shadow: #95a5a6 0px 0px 8px 4px;
        color: white;
        line-height: 40px;
        overflow: hidden;
        animation: reveal 1 2s;
        position: fixed;
        bottom: 0;
        right: 0;
        float:right!important;
        background: #5B94BC!important;
    }

    .notification .close:hover{
        cursor: pointer;
    }
    .notification-mobile .close:hover{
        cursor: pointer;
    }

    @keyframes reveal{
        0%{
            transform: translate(0px, -50px);
        }
        50%{
            transform: translate(0px, -50px);
        }
        100%{
            transform: translate(0px, 0px);
        }
    }



    ul#menu li {
        display: inline!important;

    }

    #valeur{
        font-size: 25px;
        font-weight: bold;
        color: #DC143C;
        margin-top: -27px;
    }


    .card-mobile {
        width: auto;
        object-fit: contain;
        border-radius: 15px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.19);
        background-color: #ffffff;
        margin-right: auto;
        margin-left: auto;
    }










    /* Reset Select */
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        outline: 0;
        box-shadow: none;
        border: 0 !important;
        //background: #2c3e50;
        background-image: none;
    }
    /* Remove IE arrow */
    select::-ms-expand {
        display: none;
    }
    /* Custom Select */
    .select {
        position: relative;
        display: flex;
        width: 20em;
        height: 3em;
        color: #4e555b;
        line-height: 3;
        //background: #2c3e50;
        overflow: hidden;
        border-radius: .25em;
    }
    select {
        flex: 1;
        padding: 0 .5em;
        color: #757575;
        cursor: pointer;
    }
    /* Arrow */
    .select::after {
        content: '\25BC';
        position: absolute;
        top: 0;
        right: 0;
        color: #757575;
        padding: 0 1em;
        background: #fff;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: .25s all ease;
        -o-transition: .25s all ease;
        transition: .25s all ease;
    }
    /* Transition */
    .select:hover::after {
        color: #f39c12;
    }

    /*input[type="text"]:disabled {
        background: #ffa408;
    }*/
    .button_mobile{
        width: 100px!important;
    }
</style>
