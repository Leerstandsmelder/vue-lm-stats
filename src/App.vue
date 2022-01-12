<template>
  <v-app>
    <v-navigation-drawer
      temporary
      absolute
      right
      disable-resize-watcher
      v-model="sideNav"
      width="300"
    >
      <v-toolbar flat dark>
        <v-list>
          <v-list-item>
            <v-toolbar-title class="headline text-uppercase">
              <span>MF</span>
              <span class="font-weight-light">{{ appName }}</span>
            </v-toolbar-title>
          </v-list-item>
        </v-list>
      </v-toolbar>
      <v-list>
        <div v-for="item in menuItems" :key="item.title">
          <v-list-item :to="item.path" v-if="item.component">
            <v-list-item-action>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-badge color="red" v-if="item.badge">
              <span slot="badge">{{ item.badge }}</span>
              <span>{{ item.title }}</span>
            </v-badge>
            <v-list-item-content v-else>{{ item.title }}</v-list-item-content>
          </v-list-item>
          <v-list-item :href="item.path" v-if="item.href">
            <v-list-item-action>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-badge color="red" v-if="item.badge">
              <span slot="badge">{{ item.badge }}</span>
              <span>{{ item.title }}</span>
            </v-badge>
            <v-list-item-content v-else>{{ item.title }}</v-list-item-content>
          </v-list-item>
          <v-divider v-if="!item.component && !item.href"></v-divider>
          <v-subheader v-if="!item.component && !item.href">{{
            item.title
          }}</v-subheader>
        </div>
        <v-divider v-if="isLoggedIn"></v-divider>
        <v-list-item v-if="isLoggedIn" @click.prevent="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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

      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class
      ></v-app-bar-nav-icon>
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
    isLoggedIn: function () {
      return this.$store.getters["auth/isLoggedIn"];
    },
    menuItems: function () {
      var routes = [];

      for (var i in this.$router.options.routes) {
        // var router_routes = this.$router.options.routes;
        // console.log("menuitems", i, router_routes);
        // if (!Object.prototype.hasOwnProperty.call(router_routes, i)) {
        //   continue;
        // }

        var route = this.$router.options.routes[i];

        var hasProp = Object.prototype.hasOwnProperty.call(route, "title");
        if (Object.prototype.hasOwnProperty.call(route, "title")) {
          if (
            Object.prototype.hasOwnProperty.call(route, "meta") &&
            Object.prototype.hasOwnProperty.call(route.meta, "requiresAuth") &&
            ((route.meta.requiresAuth === false && !this.isLoggedIn) ||
              (route.meta.requiresAuth === true && this.isLoggedIn))
          ) {
            if (
              Object.prototype.hasOwnProperty.call(route.meta, "requiresRole")
            ) {
              if (
                this.$store.getters["auth/getRole"].length > 0 &&
                this.$store.getters["auth/getRole"].includes(
                  route.meta.requiresRole
                )
              ) {
                routes.push(route);
              }
            } else {
              routes.push(route);
            }
          }
        }
      }
      return routes;
    },
  },
  mounted() {
    this.init();
  },
  created: function () {},
  methods: {
    init: function () {
      this.$store.dispatch("auth/init").then((reason) => {
        this.$store.dispatch("regions/load");
        this.$store.dispatch("region/load").then(() => {
          this.activeRegion = this.$store.state.regionData;
        });
      });
    },
    setActive: function (region) {
      //console.log("setActiveregion from Menu click", region);
      this.$store.dispatch("region/set", region);
    },
    logout: function () {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
<style scoped>
.v-sheet.theme--dark.v-toolbar.v-app-bar.v-app-bar--fixed.primary {
  z-index: 10000;
}
.v-overlay.v-overlay--absolute.v-overlay--active.theme--dark {
  z-index: 7777 !important;
}
.v-navigation-drawer.v-navigation-drawer--absolute.v-navigation-drawer--open {
  z-index: 8888;
}
</style>