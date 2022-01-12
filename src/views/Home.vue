<template>
  <v-container>
    <v-container v-if="!regionData">
      <v-row>
        <v-col>
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <h2>Hallo Leerstand!</h2>
            <p>Daten aus den einzelenen Regionen</p>
            <l-map
              :minZoom="2"
              :zoom="6"
              :center="[51, 9]"
              style="min-height: 700px"
            >
              <l-tile-layer
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              ></l-tile-layer>
              <l-circle-marker
                v-for="(place, index) in this.regions"
                :key="'marker-' + index"
                :lat-lng="[place.lonlat[1], place.lonlat[0]]"
                :id="index"
                :options="{ title: 'marker-' + index, id: index }"
              >
                <!--l-tooltip
                    :content="place.title"
                    :options="{ permanent: 'true', direction: 'top' }"
                  /-->
                <l-popup
                  :content="popup_content(place)"
                  :options="{ permanent: 'true', direction: 'top' }"
                />
              </l-circle-marker>

              <Vue2LeafletHeatmap
                :lat-lng="RegionLatLngs"
                :radius="30"
                :min-opacity="0.75"
                :max-zoom="10"
                :blur="60"
                ref="heatmap"
              ></Vue2LeafletHeatmap>
            </l-map>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-2" v-if="regionData">
      <v-row>
        <v-col>
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <h2>{{ regionData.title }}</h2>

                <v-list
                  ><v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-map-marker</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle
                      >{{ locations.length }}
                      {{
                        $t("locations.location_plural")
                      }}</v-list-item-subtitle
                    >
                  </v-list-item>
                  <v-list-item v-if="regionData.lonlat">
                    <v-list-item-icon>
                      <v-icon>mdi-map-marker</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle
                      >{{ regionData.lonlat[1] }} x
                      {{ regionData.lonlat[0] }}</v-list-item-subtitle
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-map-marker</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle
                      >{{ regionData.zoom }}
                      {{ $t("regions.zoom") }}</v-list-item-subtitle
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-map-marker</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle>
                      <v-switch v-model="mapOptions.show_markers"></v-switch>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" sm="6" md="4" v-if="regionData.lonlat">
                <l-map
                  :zoom="regionData.zoom"
                  :minZoom="2"
                  :center="[regionData.lonlat[1], regionData.lonlat[0]]"
                  style="min-height: 500px"
                >
                  <l-tile-layer
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  ></l-tile-layer>
                  <div v-if="mapOptions.show_markers">
                    <l-circle-marker
                      v-for="(place, index) in this.locations"
                      :key="'marker-' + index"
                      :lat-lng="[place.lonlat[1], place.lonlat[0]]"
                      :id="index"
                      :options="{ title: 'marker-' + index, id: index }"
                    >
                      <!--l-tooltip
                    :content="place.title"
                    :options="{ permanent: 'true', direction: 'top' }"
                  /-->
                      <l-popup
                        :content="place.title"
                        :options="{ permanent: 'true', direction: 'top' }"
                      />
                    </l-circle-marker>
                  </div>
                  <Vue2LeafletHeatmap
                    :lat-lng="latlngs"
                    :radius="30"
                    :min-opacity="0.75"
                    :max-zoom="10"
                    :blur="60"
                    ref="heatmap"
                  ></Vue2LeafletHeatmap>
                </l-map>
              </v-col>
              <v-col cols="12" sm="6" md="4"> </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Vue2LeafletHeatmap from "../components/Vue2LeafletHeatmap.vue";

export default {
  name: "home",
  computed: {
    ...mapState("region", ["regionId", "regionData"]),
    ...mapState("regions", ["regions", "active"]),
    ...mapState("locations", ["locations"]),

    latlngs: function () {
      console.log("recalculate locations", this.locations);
      if (this.locations.length > 0) {
        return this.locations.map(function (p) {
          return [p.lonlat[1], p.lonlat[0], 0.1];
        });
      } else {
        return [];
      }
    },
    RegionLatLngs: function () {
      console.log("recalculate regions", this.regions);
      if (this.regions.length > 0) {
        return this.regions.map(function (p) {
          return [p.lonlat[1], p.lonlat[0], p.locations];
        });
      } else {
        return [];
      }
    },
  },
  components: {
    Vue2LeafletHeatmap,
  },
  data() {
    return {
      circle: {
        radius: 14,
        color: "transparent",
        fillcolor: "rgba(242, 71, 38, 1)",
        fillopacity: 0.85,
      },
      mapOptions: {
        zoom: 10,
        min_zoom: 2,
        show_markers: false,
      },
    };
  },
  created() {
    console.log("start locations", this.locations);
    //if (this.isLoggedIn())
    this.init();
  },
  methods: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    isLoading() {
      return this.$store.getters["loader/loading"];
    },
    async init() {},
    popup_content(place) {
      return place.title + " (" + place.locations + ")";
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-slider--horizontal.theme--light .v-slider__track-container {
  height: 8px;
}
.v-slider--horizontal.theme--light .v-slider__thumb {
  width: 16px;
  height: 16px;
}

.v-slider--horizontal.theme--light .v-slider__thumb::before {
  width: 40px;
  height: 40px;
}
</style>
