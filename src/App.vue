<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="./assets/logo_cropped_alt.png"
            width="100"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <Loader :visible="loading" />
      <v-menu overflow-y-scroll left top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">
            <span v-if="regionData">{{ regionData.title }}</span>
            <span v-if="!regionData">Region wählen</span>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list
          nav
          dense
          subheader
          one-line
          style="overflow-y: auto; max-height: 100vh"
        >
          <v-subheader>Regionen</v-subheader>
          <v-list-item-group v-model="activeRegion" color="primary">
            <template v-for="(item, i) in regions">
              <v-list-item
                :key="`item-${i}`"
                :value="item"
                active-class="teal--text text--darken-4"
                @click="setActive(item)"
              >
                <template>
                  <v-list-item-avatar>
                    <v-icon class="grey lighten-1" dark>
                      mdi-map-marker
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.title }} <v-chip>{{ item.locations }}</v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action> </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn href="https://www.leerstandsmelder.de" target="_blank" text>
        <span class="mr-2">LM plattform</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn to="Login" text v-if="!isLoggedIn">
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/loader";
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      appName: process.env.VUE_APP_TITLE,
      activeRegion: null,
    };
  },
  components: {
    Loader,
  },
  watch: {
    // eslint-disable-next-line
    activeRegion: function (newState, oldState) {
      if (newState != oldState) {
        console.log("watch activeRegion", newState, oldState);
        if (newState.uuid != this.regionId) {
          this.$store.dispatch("region/set", newState).then(() => {
            console.log("resolve region/set", this.regionId);
          });
        }
      }
    },
  },
  computed: {
    ...mapState("loader", ["loading"]),
    ...mapState("region", ["regionId", "regionData"]),
    ...mapState("regions", ["regions", "active"]),
    ...mapState("auth", ["isLoggedIn"]),
  },
  mounted() {
    this.init();
  },
  created: function () {
    //this.fetchRegions();
  },
  methods: {
    init: function () {
      this.$store.dispatch("auth/init");
      this.$store.dispatch("regions/load");
      this.$store.dispatch("region/load").then(() => {
        this.activeRegion = this.$store.state.regionData;
      });
    },
    setActive: function (region) {
      console.log("setActiveregion from Menu click", region);
      this.$store.dispatch("region/set", region);
    },
  },
};
</script>
<style scoped>
.v-sheet.theme--dark.v-toolbar.v-app-bar.v-app-bar--fixed.primary {
  z-index: 10000;
}
</style>