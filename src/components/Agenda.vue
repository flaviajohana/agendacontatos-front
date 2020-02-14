<template>
  <v-container>
    <h1>Agenda de Contatos</h1>
    <v-data-table
      :hide-default-footer="true"
      :headers="headers"
      :items="contatos"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Cadastrar Contato</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.nome"
                        :rules="nomeRules"
                        label="Nome"
                        :counter="50"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.celular"
                        v-mask="'(##)#####-####'"
                        :rules="celularRules"
                        label="Celular"
                        :maxlength="14"
                        :counter="14"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.email" :rules="emailRules" label="Email"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">Atualizar</v-icon>
        <v-icon small @click="deleteItem(item)">Excluir</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Recarregar</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
const API_URL_LISTAR = process.env.VUE_APP_URL + "/listar";
const API_URL_DELETAR = process.env.VUE_APP_URL + "/deletar";
const API_URL_CADASTRAR = process.env.VUE_APP_URL + "/cadastrar";
const API_URL_ALTERAR = process.env.VUE_APP_URL + "/alterar";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  data: () => ({
    dialog: false,
    headers: [
      { text: "id", value: "id" },
      { text: "Nome", value: "nome" },
      { text: "Número Celular", value: "celular" },
      { text: "Email", value: "email" },
      { text: "Ações", value: "action" }
    ],
    contatos: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      nome: "",
      celular: "",
      email: ""
    },
    defaultItem: {
      id: "",
      nome: "",
      celular: "",
      email: ""
    },

    nomeRules: [
      v => !!v || "Nome Obrigatório",
      v => v.length <= 50 || "Nome deve conter apenas 50 caracteres"
    ],
    celularRules: [
      v => !!v || "Celular Obrigatório",
      v => v.length <= 14 || "Celular deve conter apenas 14 números"
    ],
    emailRules: [
      v => !!v || "E-mail Obrigatório",
      v => /.+@.+/.test(v) || "E-mail inválido"
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Contato" : "Atualizar Contato";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.axios.get(API_URL_LISTAR, {}).then(lista => {
        this.contatos = lista.data.contatos;
      });
    },

    editItem(item) {
      this.editedIndex = this.contatos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm("Deseja excluir contato?") == false) {
        return;
      }
      this.axios.delete(API_URL_DELETAR + "/" + item.id, {}).then(resposta => {
        if (resposta.data.success) {
          const index = this.contatos.indexOf(item);
          this.contatos.splice(index, 1);
        }
      });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      let item = this.editedItem;
      let index = this.editedIndex;

      if (this.editedIndex > -1) {
        this.axios
          .put(API_URL_ALTERAR + "/" + item.id, {
            nome: item.nome,
            email: item.email,
            celular: item.celular
          })
          .then(resposta => {
            if (resposta.data.success) {
              Object.assign(this.contatos[index], item);
            }
          });
      } else {
        this.axios
          .post(API_URL_CADASTRAR, {
            nome: item.nome,
            email: item.email,
            celular: item.celular
          })
          .then(resposta => {
            if (resposta.data.success) {
              item.id = resposta.data.id;
              this.contatos.push(item);
            }
          });
      }
      this.close();
    }
  }
};
</script>
