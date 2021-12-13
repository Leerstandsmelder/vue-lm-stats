<template>
  <v-container class="pa-2">
    <v-row>
      <v-col>
        <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <h2>{{ regionData.title }}</h2>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle>{{
                  locations.length
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="6" md="4"> </v-col>
            <v-col cols="12" sm="6" md="4"> </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
          <h2>Statistics</h2>
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
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-btn color="success" @click="fetch()" left large>
                <v-icon>mdi-reload</v-icon>Reload
              </v-btn>
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
              ratio="ct-major-second"
              type="Bar"
              :data="groupedDate"
              :options="chartTypeOptions"
            ></chartist>
          </v-card>
          <v-card-text>
            <h4>Locations created on date</h4>
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
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import grouper from "../utils/grouper.js";

// helper function to get the month name from an item
const monthName = (item) => moment(item.created, "YYYY-MM-DD").format("YYYY");

export default {
  name: "chart",
  computed: {
    ...mapState("region", ["regionId", "regionData"]),
    ...mapState("regions", ["regions", "active"]),
    ...mapState("locations", ["locations", "activeLocations"]),
    groupedType: function () {
      return grouper.groupByField("buildingType", this.locations);
    },
    groupedDate: function () {
      return grouper.groupByField(monthName, this.locations);
    },
    groupedUser: function () {
      return grouper.groupByField("user.nickname", this.locations);
    },
    groupedOwner: function () {
      return grouper.groupByField("owner", this.locations);
    },
  },
  components: {},
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
      startDate: "",
      endDate: "",
    };
  },
  created() {
    console.log("stat movies .chartData", this.chartData);
    //if (this.isLoggedIn())
    this.fetch();
  },
  methods: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    isLoading() {
      return this.$store.getters["loader/loading"];
    },
    async fetch() {
      var date_query = [];
      if (this.startDate) {
        date_query.push('"startDate" : "' + this.startDate + '"');
      }
      if (this.endDate) {
        date_query.push('"endDate" : "' + this.endDate + '"');
      }
      var date_str = date_query.join(",");
      if (date_str != "") {
        date_str = "," + date_str;
      }

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
