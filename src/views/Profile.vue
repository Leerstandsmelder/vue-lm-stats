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
              <v-card-actions>
                <!--v-btn @click.stop.prevent="clearLocations()" color="primary"
                  >Clear location cache</v-btn
                -->
                <v-btn @click.stop.prevent="clearRegion()" color="primary"
                  >Clear region cache</v-btn
                >
                <div class="flex-grow-1"></div>
                <v-btn @click.stop.prevent="logout()" color>Logout</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { RepositoryFactory } from "../utils/repositories/repositoryFactory";
const UserRepository = RepositoryFactory.get("users");
export default {
  computed: {
    ...mapState("region", ["regionId", "regionData"]),
    ...mapState("regions", ["regions", "active"]),
    ...mapState("locations", ["locations"]),
  },
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
    clearLocations() {
      this.$store.dispatch("locations/clear").then((response) => {
        console.log("locations-cleared", response);
        //this.$router.push("/");
      });
    },
    clearRegion() {
      this.$store.dispatch("region/clear").then((response) => {
        console.log("region-cleared", response);
        this.$root.activeRegion = {};
        this.$router.push("/");
      });
    },
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>