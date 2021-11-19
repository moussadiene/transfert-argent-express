<template>
  <div style="margin-top: 10%">
    <b-card title="" header-tag="header" footer-tag="footer">
      <h5 slot="header" class="mb-0"> <i class="fa fa-plane" /> CREER DEVIS VOYAGE <span><img src="/src/assets/img/pictoassvoyage.png" alt=""></span></h5>
      <div class="col">
        <div>
          <div><strong>INFO CLIENT</strong></div>
          <div class="row m-2">
            <div class="">
              <div class="w-27">
                <label for="">Numero téléphone</label>
                <div class="row ml-2">
                  <div> <b-form-input v-model="telephoneclient"  placeholder="770000000" ></b-form-input></div>
                  <div class="btni"><b-button @click="rechercherClient" ><i class="fa fa-search" style="color: #ffa409"></i> </b-button>
                  </div>
                </div>

              </div>
            </div>
            <div class="ml-5 w-27">
              <label for="">Email :</label>
              <div >
                <p>{{usersearch}}</p>

              </div>
            </div>
          </div>
        </div>
        <div>
          <div><strong>DESTINATION</strong></div>
          <div class="row m-2">
            <div class="">
              <div class="w-27">
                <label for="">Pays d'origine</label>
                <b-form-select v-model="paysorigine" :options="selectpays"></b-form-select>

              </div>
            </div>
            <div class="ml-5 w-27">
              <label for="">Pays de déstination</label>
              <b-form-select v-model="destination" :options="selectpays"></b-form-select>
            </div>
          </div>
        </div>

        <hr>
        <div>
          <div><strong>DUREE</strong> </div>
          <div class="row m-2">
            <div class="w-20">
              <label for="">Date de départ</label>
              <b-form-input id="" type="date" v-model="depart"></b-form-input>
            </div>
            <div class="w-20 ml-4">
              <label for="" >Date d'arrivée</label>
              <b-form-input id="" type="date" v-model="arrivee"></b-form-input>
            </div>
            <div class="w-20 ml-4">
              <label for="">Nombre de passagers</label>
              <b-form-input id="" type="number" v-model="nbrepassager"></b-form-input>
            </div>
          </div>
        </div>
        <hr>
        <div><strong>INFO PASSAGERS</strong></div>
        <div></div>
        <div class="">
          <div><strong>GARANTIES</strong></div>
          <div>
            <label for="">Liste des garanties (*)</label>
            <b-form-checkbox-group id="" v-model="garantie" name="">
              <b-form-checkbox value="RC" v-model="garantie">RC</b-form-checkbox>
              <b-form-checkbox value="brisglace" v-model="garantie"> Bris glaces</b-form-checkbox>
              <b-form-checkbox value="incendie" v-model="garantie">incendie</b-form-checkbox>
              <b-form-checkbox value="avancerecour" v-model="garantie">Avance Recours</b-form-checkbox>
              <b-form-checkbox value="defenserecours" v-model="garantie">Défense Recours</b-form-checkbox>
              <b-form-checkbox value="tiercecpmlete" v-model="garantie">Tierce complete</b-form-checkbox>
              <b-form-checkbox value="tiercecollision" v-model="garantie">Tierce collision</b-form-checkbox>
              <b-form-checkbox value="vol" v-model="garantie">Vol</b-form-checkbox>
              <b-form-checkbox value="personnetransporte" v-model="garantie">Personne transportees</b-form-checkbox>
            </b-form-checkbox-group>
          </div>
        </div>
        <hr>
        <div>
          <div><strong>VALIDATION</strong></div>
          <div>
            <b-form-group label="liste des assureurs">
              <label for="">Assureurs</label>
              <b-form-checkbox-group id="" v-model="listeAssureurs" name="">
                <b-form-checkbox v-model="listeAssureurs" value="AXA">AXA</b-form-checkbox>
                <b-form-checkbox v-model="listeAssureurs" value="CNART">CNART</b-form-checkbox>
                <b-form-checkbox v-model="listeAssureurs" value="PA">PA</b-form-checkbox>
                <b-form-checkbox v-model="listeAssureurs" value="NSIA">NSIA</b-form-checkbox>
                <b-form-checkbox v-model="listeAssureurs" value="SAHAM">SAHAM</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </div>
        </div>

      </div>
      <br>






      <em slot="footer"><b-button @click="createdevisvoyage" class="btnvalider">Valider</b-button>

      </em>
      <em slot="footer"><b-button class="">Annuler</b-button></em>

    </b-card>

  </div>
</template>

<script>
  import store from '../../store/index'
  import Api from '../../services/Api'
  export default {
    name: "createdevisvoyage",
    data() {
      return {
        selected: [],
        selectpays : '',
        depart : '',
        paysorigine :'',
        arrivee : '',
        nbrepassager:'',
        garantie : [],
        used:false,
        assureurs :[],
        usersearch:[],
        telephoneclient : '',
        listeAssureurs :[],
        listvoyage : [],
        listPassager : [ 'mbaye'],
        listgarantie: [
          { text: 'RC', value: 'RC' },
          { text: 'incendie', value: 'incendie' },
          { text: 'avance recours', value: 'avance recours' },
          { text: 'defense recours', value: 'defense recours' },
          { text: 'Bris Glaces', value: 'Bris Glaces' },
          { text: 'Tierce complete', value: 'Tierce complete' },
          { text: 'Tierce collision', value: 'Tierce collision' },
          { text: 'vol', value: 'vol' },
          { text: 'personnes transportees', value: 'personnes transportees'},
        ],
        listassureur : [
          { text: 'AXA', value: 'axa' },
          { text: 'CNART', value: 'CNART' },
          { text: 'AMSA', value: 'AMSA' },
          { text: 'NSIA', value: 'NSIA' },
          { text: 'SAHAM', value: 'SAHAM' },
        ],
        selectpays: [
          { text: 'senegal ' },
          { text: 'cameroon' },
          { text: 'Nigeria' },
        ]
      }

    },
    methods : {
      createdevisvoyage : function () {
        const voyage = {
          userid: store.state.user._id,
          assureurs:this.listeAssureurs,
          garanties:this.garantie,
          nbpassager : this.nbpassager,
          paysdomicile : this.paysorigine,
          destination : this.destination,
          listPassager: this.listPassager,
          branche : 'Voyage'

        }
        this.listvoyage.push(voyage);
        Api().post('devis/add', voyage)
          .then(reslutat => {
            this.$store.dispatch("setDevis", reslutat.data)
            this.$router.go(this.$router.push('/listdevis'))
          })
          .catch(err=>{
            console.log(err)
          });
      },

      rechercherClient () {
        Api().get('/user/phone/'+this.telephoneclient)
          .then( resultat => {
            this.usersearch= resultat.data.user;
          });
      },

    },
    mounted() {
      if (store.state.isUserLoggedIn && store.state.user.role!=='User'){
          this.used = true
        }else{
          this.$router.go(this.$router.push('/login'))
        }
    }

  }
</script>


<style scoped>

</style>
