<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/logo_cropped_alt.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list nav dense subheader three-line>
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
                    <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.title }} {{ item.locations }}
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
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      appName: process.env.VUE_APP_TITLE,
      activeRegion: null,
    };
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
    ...mapState("region", ["regionId", "regionData"]),
    ...mapState("regions", ["regions", "active"]),
  },
  mounted() {
    this.init();
  },
  created: function () {
    //this.fetchRegions();
  },
  methods: {
    init: function () {
      this.$store.dispatch("regions/load");
      this.$store.dispatch("region/load");
      this.activeRegion = this.$store.state.regionData;
    },
    setActive: function (region) {
      console.log("setActive", region);
      this.$store.dispatch("regions/setActive", region);
    },
  },
};
</script>
