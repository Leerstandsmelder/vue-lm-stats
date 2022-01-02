<!-- src/views/Profile.vue -->

<template>
  <div v-if="this.user">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Profile</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-form>
              <v-card-text>
                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="text"
                  v-model="this.user.email"
                  :readonly="true"
                ></v-text-field>
              </v-card-text>
              <v-card-text>
                <v-text-field
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="this.user.nickname"
                  :readonly="true"
                ></v-text-field>
              </v-card-text>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { RepositoryFactory } from "../utils/repositories/repositoryFactory";
const UserRepository = RepositoryFactory.get("users");
export default {
  data() {
    return {
      user: false,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      await UserRepository.get().then((user) => {
        this.isLoading = false;
        console.log("user", user);
        this.user = user;
      });
    },
  },
};
</script>