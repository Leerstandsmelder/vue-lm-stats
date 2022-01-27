<template>
  <div class="map">
    <l-map
      :zoom="regionData.zoom"
      :minZoom="2"
      :center="[regionData.lonlat[1], regionData.lonlat[0]]"
      style="min-height: calc(100vh - 64px)"
    >
      <l-tile-layer
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-circle-marker
        v-for="(place, index) in this.datedLocations"
        :key="'marker-' + index"
        :lat-lng="[place.lonlat[1], place.lonlat[0]]"
        :id="index"
        :options="{ title: 'marker-' + index, id: index }"
        :radius="circle.radius"
        :color="circle.color"
        :fillColor="circle.fillColor"
        :fillOpacity="circle.fillOpacity"
        @click="setClick(place)"
        ref="'marker-' + place.uuid"
      >
        <!--l-tooltip
                    :content="place.title"
                    :options="{ permanent: 'true', direction: 'top' }"
                  /-->
        <!--l-popup
          :content="place.title"
          :options="{ permanent: 'true', direction: 'top' }"
        /-->
      </l-circle-marker>
      <l-control position="topright">
        <v-expand-transition>
          <div v-show="showPlace && place">
            <v-card max-width="474" class="pl-10 pr-10 pb-10 pt-5 elevation-5">
              <v-btn
                fab
                absolute
                top
                right
                @click.stop.prevent="showPlace = !showPlace"
                v-show="showPlace"
                ><v-icon dark> mdi-close</v-icon></v-btn
              >

              <v-card-title>{{ place.title }}</v-card-title>

              <v-card-text>
                <div class="my-3 text-subtitle-2">
                  {{ place.postcode }} {{ place.region_title }}
                </div>

                <div class="my-4 text-subtitle-1">
                  {{ place.created | formatDate }}
                </div>
                {{ place.description }}
              </v-card-text>
            </v-card>
          </div></v-expand-transition
        >
      </l-control>
      <l-control position="bottomleft">
        <v-btn @click.stop.prevent="show = !show" v-show="!show"
          >Time selection</v-btn
        >
        <v-expand-transition>
          <div v-show="show">
            <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
              <v-btn
                fab
                absolute
                top
                right
                @click.stop.prevent="show = !show"
                v-show="show"
                ><v-icon dark> mdi-close</v-icon></v-btn
              >
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
                <v-col cols="12" sm="6" md="4">
                  <v-list>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title> Datumsfeld </v-list-item-title>
                        <v-list-item-subtitle>
                          <v-radio-group v-model="dateField">
                            <v-radio
                              v-for="n in availableDateFields"
                              :key="n"
                              :label="`Field: ${n}`"
                              :value="n"
                            ></v-radio>
                          </v-radio-group>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Meldung aktiv? </v-list-item-title>
                        <v-list-item-subtitle>
                          <v-switch v-model="hiddenFieldSet"
                            >Versteckte Leerstände anzeigen</v-switch
                          >
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-range-slider
                    :hint="rangeHint"
                    :max="maxDate"
                    :min="minDate"
                    v-model="rangeDate"
                    @change="setRange()"
                  ></v-range-slider>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-expand-transition>
      </l-control>
    </l-map>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
import grouper from "../utils/grouper.js";
import { LMap, LTileLayer, LControl } from "vue2-leaflet";

// helper function to get the month name from an item
const monthCreated = (item) =>
  moment(item.created, "YYYY-MM-DD").format("YYYY");
const monthUpdated = (item) =>
  moment(item.updated, "YYYY-MM-DD").format("YYYY");
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

export default {
  name: "chart",
  computed: {
    ...mapState("region", ["regionId", "regionData"]),
    ...mapState("regions", ["regions", "active"]),
    ...mapState("locations", ["locations"]),
    filteredLocations: function () {
      if (this.hiddenFieldSet == true) {
        return this.locations.filter((item) => {
          return item.hidden == false;
        });
      } else {
        return this.locations;
      }
    },
    datedLocations: function () {
      return grouper.groupInBetween(
        this.filteredLocations,
        this.startDate,
        this.endDate,
        this.dateField
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

    fieldCount: function (field_name, field_value) {
      return countOccurrences(this.datedLocations, field_name, field_value);
    },

    countDemolished: function () {
      var locs = this.filteredLocations;
      console.log("citems", locs);
      return locs.filter((item) => {
        return item.demolished == true;
      }).length;
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
      if (this.datedLocations.length > 0) {
        var mappedL = this.datedLocations.map(function (p) {
          return [p.lonlat[1], p.lonlat[0], 0.1];
        });
        //console.log("recalculated-->", mappedL);
        return mappedL;
      } else {
        return [];
      }
    },
  },
  components: { LMap, LTileLayer, LControl },
  data() {
    return {
      show: false,
      showPlace: false,
      place: {},
      menuStartDate: false,
      menuEndDate: false,
      defaultStartDate: "2010-01",
      startDate: "2010-01",
      defaultEndDate:
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      endDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      availableDateFields: ["created", "updated"],
      dateField: "created",
      hiddenFieldSet: false,
      circle: {
        radius: 4,
        color: "transparent",
        fillColor: "rgba(242, 71, 38, 1)",
        fillOpacity: 0.61,
      },
      mapOptions: {
        zoom: 10,
        min_zoom: 2,
        show_markers: false,
      },
    };
  },
  created() {
    console.log("start chart", this.locations);
    //if (this.isLoggedIn())
    this.init();
  },
  methods: {
    setClick(place) {
      console.log("set", place);
      this.showPlace = true;
      this.place = place;
      this.place.region_title = place.region.title;
    },
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    isLoading() {
      return this.$store.getters["loader/loading"];
    },
    async init() {},
  },
};
</script>
