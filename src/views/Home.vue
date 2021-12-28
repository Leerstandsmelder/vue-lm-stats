<template>
  <v-container>
    <v-container v-if="!regionData">
      <v-row>
        <v-col>
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <h2>Hallo Leerstand!</h2>
            <p>Daten aus den einzelenen Regionen</p>
            <v-list nav dense subheader one-line>
              <v-list-item
                :key="`item-${i}`"
                :value="item"
                active-class="teal--text text--darken-4"
                v-for="(item, i) in regions"
              >
                <template>
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.title }}
                      <v-chip>{{ item.locations }}</v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action> </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
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
                      >{{ datedLocations.length }}
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
                      v-for="(place, index) in this.datedLocations"
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

      <v-row>
        <v-col>
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <h2>Date range</h2>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="menuStartDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDate"
                      label="Start date"
                      prepend-icon="mdi-calendar-account"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @input="menuStartDate = false"
                    type="month"
                    year-icon="mdi-calendar-blank"
                    prev-icon="mdi-skip-previous"
                    next-icon="mdi-skip-next"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="menuEndDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endDate"
                      label="End date"
                      prepend-icon="mdi-calendar-account"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    @input="menuEndDate = false"
                    type="month"
                    year-icon="mdi-calendar-blank"
                    prev-icon="mdi-skip-previous"
                    next-icon="mdi-skip-next"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4"> </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-range-slider
                  :hint="rangeHint"
                  :max="maxDate"
                  :min="minDate"
                  v-model="rangeDate"
                ></v-range-slider>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <v-card color="white" class="pt-5 elevation-10">
              <chartist
                class
                ratio="ct-major-second"
                type="Bar"
                :data="groupedCreated"
                :options="chartTypeOptions"
              ></chartist>
            </v-card>
            <v-card-text>
              <h4>Locations created by month</h4>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                icon
                small
                :to="{ name: 'form', params: { id: 'stats_type' } }"
              >
                <v-icon small>mdi-download</v-icon>
              </v-btn>
              <v-btn
                icon
                small
                :to="{ name: 'form', params: { id: 'stats_type' } }"
              >
                <v-icon small>mdi-information</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <v-card color="white" class="pt-5 elevation-10">
              <chartist
                class
                ratio="ct-major-second"
                type="Bar"
                :data="groupedUpdated"
                :options="chartTypeOptions"
              ></chartist>
            </v-card>
            <v-card-text>
              <h4>Locations updated by month</h4>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <v-card color="white" class="pt-5 elevation-10">
              <chartist
                class
                ratio="ct-major-second"
                type="Pie"
                :data="groupedUser"
                :options="chartStatusOptions"
              ></chartist>
            </v-card>
            <v-card-text>
              <h4>Locations by user</h4>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                icon
                small
                :to="{ name: 'form', params: { id: 'stats_type' } }"
              >
                <v-icon small>mdi-download</v-icon>
              </v-btn>
              <v-btn
                icon
                small
                :to="{ name: 'form', params: { id: 'stats_type' } }"
              >
                <v-icon small>mdi-information</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <v-card color="white" class="pt-5 elevation-10">
              <chartist
                class
                ratio="ct-major-second"
                type="Pie"
                :data="groupedPostcode"
                :options="chartStatusOptions"
              ></chartist>
            </v-card>
            <v-card-text>
              <h4>Locations by postcode</h4>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <v-card color="white" class="pt-5 elevation-10">
              <chartist
                class
                ratio="ct-major-second"
                type="Bar"
                :data="groupedType"
                :options="chartTypeOptions"
              ></chartist>
            </v-card>
            <v-card-text>
              <h4>LM by type</h4>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                icon
                small
                :to="{ name: 'form', params: { id: 'stats_type' } }"
              >
                <v-icon small>mdi-download</v-icon>
              </v-btn>
              <v-btn
                icon
                small
                :to="{ name: 'form', params: { id: 'stats_type' } }"
              >
                <v-icon small>mdi-information</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
            <v-card color="white" class="pt-5 elevation-10">
              <chartist
                class
                :data="groupedOwner"
                :options="chartUserOptions"
                ratio="ct-major-second"
                type="Bar"
              ></chartist>
            </v-card>
            <v-card-text>
              <h4>Locations by owner</h4>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                icon
                small
                :to="{ name: 'form', params: { id: 'stats_type' } }"
              >
                <v-icon small>mdi-download</v-icon>
              </v-btn>
              <v-btn
                icon
                small
                :to="{ name: 'form', params: { id: 'stats_type' } }"
              >
                <v-icon small>mdi-information</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import grouper from "../utils/grouper.js";
import Vue2LeafletHeatmap from "../components/Vue2LeafletHeatmap.vue";

// helper function to get the month name from an item
const monthCreated = (item) =>
  moment(item.created, "YYYY-MM-DD").format("YYYY");
const monthUpdated = (item) =>
  moment(item.updated, "YYYY-MM-DD").format("YYYY");

export default {
  name: "chart",
  computed: {
    ...mapState("region", ["regionId", "regionData"]),
    ...mapState("regions", ["regions", "active"]),
    ...mapState("locations", ["locations"]),
    datedLocations: function () {
      return grouper.groupInBetween(
        this.locations,
        this.startDate,
        this.endDate
      );
    },
    maxDate: function () {
      return moment(this.defaultEndDate).unix();
    },
    minDate: function () {
      return moment(this.defaultStartDate).unix();
    },
    rangeHint: function () {
      return "Locations in Range: " + this.datedLocations.length;
    },
    rangeDate: {
      get() {
        var range = [
          moment(this.startDate).unix(),
          moment(this.endDate).unix(),
        ];
        return range;
      },
      set(newDate) {
        this.startDate = moment.unix(newDate[0]).format("YYYY-MM");
        this.endDate = moment.unix(newDate[1]).format("YYYY-MM");
        //return newDate;
      },
    },

    groupedType: function () {
      return grouper.groupByField("buildingType", this.datedLocations, 5);
    },
    groupedCreated: function () {
      return grouper.groupByField(monthCreated, this.datedLocations, 0);
    },
    groupedUpdated: function () {
      return grouper.groupByField(monthUpdated, this.datedLocations, 0);
    },
    groupedUser: function () {
      return grouper.groupByField("user.nickname", this.datedLocations, 5);
    },
    groupedOwner: function () {
      return grouper.groupByField("owner", this.datedLocations, 5);
    },
    groupedPostcode: function () {
      return grouper.groupByField("postcode", this.datedLocations, 5);
    },
    latlngs: function () {
      console.log("recalculate locations", this.datedLocations);
      if (this.datedLocations.length > 0) {
        return this.datedLocations.map(function (p) {
          return [p.lonlat[1], p.lonlat[0], 0.1];
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
      chartData: {
        series: [],
      },
      chartOptions: {
        lineSmooth: false,
      },
      chartTypeOptions: {},
      chartStatusOptions: {},
      chartUserOptions: {},
      menuStartDate: false,
      menuEndDate: false,
      defaultStartDate: "2010-01",
      startDate: "2010-01",
      defaultEndDate:
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      endDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      circle: {
        radius: 14,
        color: "transparent",
        fillcolor: "rgba(242, 71, 38, 1)",
        fillopacity: 0.85,
      },
      mapOptions: {
        zoom: 10,
        min_zoom: 2,
        show_markers: true,
      },
    };
  },
  created() {
    console.log("stat movies .chartData", this.chartData);
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
    async init() {
      this.chartTypeOptions = {
        distributeSeries: true,
        axisY: {
          type: this.$chartist.AutoScaleAxis,
          onlyInteger: true,
          low: 0,
        },
      };

      this.chartOptions = {
        axisX: {
          type: this.$chartist.FixedScaleAxis,
          divisor: 10,
          labelInterpolationFnc(value) {
            console.log("interpol", value);
            return moment(value).format("MMM D");
          },
        },
        axisY: {
          type: this.$chartist.AutoScaleAxis,
          onlyInteger: true,
          low: 0,
        },
        fullWidth: true,
        lineSmooth: this.$chartist.Interpolation.none({
          fillHoles: true,
        }),
      };

      this.chartUserOptions = {
        distributeSeries: true,
        horizontalBars: true,
        axisX: {
          labelInterpolationFnc: this.$chartist.noop,
        },
        axisY: {
          offset: 140,
        },
      };
    },
    handleMapClick(e) {
      // toggleModal
      console.log("onclick");
      console.log(e.target.options.id);
      console.log(e.target.options.title);

      if (e.target.options.title) {
        // set all state to false
        for (let i = 0; i < this.data.layer.places.length; i++) {
          this.$set(this.data.layer.places[i], "state", false);
        }
        console.log(
          "Clicked place: " + this.data.layer.places[e.target.options.id].title
        );
        console.log(
          "Clicked place ID: " + this.data.layer.places[e.target.options.id].id
        );
        this.data.layer.places[e.target.options.id].state =
          !this.data.layer.places[e.target.options.id].state;
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table.table {
  margin: 0 auto;
  width: 98%;
  max-width: 98%;
}
.datatable-cell-wrapper {
  width: inherit;
  position: relative;
  z-index: 4;
  padding: 10px 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.datatable__expand-content .card__text {
  z-index: 3;
  position: relative;
}
.datatable-container {
  position: absolute;
  background-color: white;
  top: -50px;
  left: -14px;
  right: -14px;
  bottom: 0;
  z-index: 2;
  border: 1px solid #ccc;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.15), 0 1px 10px 0 rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}
</style>
