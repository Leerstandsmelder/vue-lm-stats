<template>
  <v-container class="pa-2">
    <v-row>
      <v-col>
        <v-card class="pl-10 pr-10 pb-10 pt-5 elevation-5">
          <h2>Regions</h2>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              {{ active }}
              {{ regionData }}
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
              :data="groupedLocations"
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
              :data="groupedLocationsByDate"
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
              :data="chartStatusData"
              :options="chartStatusOptions"
            ></chartist>
          </v-card>
          <v-card-text>
            <h4>Movies by Status</h4>
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
              :data="chartUserData"
              :options="chartUserOptions"
              ratio="ct-major-second"
              type="Bar"
            ></chartist>
          </v-card>
          <v-card-text>
            <h4>Movies by Users</h4>
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
//import Vue from "vue";
//import moment from "moment";
//import { RepositoryFactory } from "../utils/repositories/repositoryFactory";
//const MovieRepository = RepositoryFactory.get("movies");
import { mapState } from "vuex";
export default {
  name: "chart",
  computed: {
    ...mapState("region", ["regionId", "regionData"]),
    ...mapState("regions", ["regions", "active"]),
    ...mapState("locations", [
      "locations",
      "activeLocations",
      "groupedLocations",
      "groupedLocationsByDate",
    ]),
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
      chartTypeData: { series: [], labels: [] },
      chartTypeOptions: {},
      chartStatusData: { series: [], labels: [] },
      chartStatusOptions: {},
      chartUserData: { series: [], labels: [] },
      chartUserOptions: {},
      showStatusText: false,
      dialog: false,
      menuStartDate: false,
      menuEndDate: false,
      movies_published: [],
      expanded: [],
      startDate: "",
      endDate: "",
      singleExpand: true,
      headers: [
        { text: "", value: "table-dialog" },
        { text: "ID", value: "id" },
        {
          text: "Name",
          align: "left",
          value: "name",
        },
        { text: "Company", value: "company" },
        { text: "Type", value: "type" },
        { text: "Created", value: "created" },
        { text: "Updated", value: "updated" },
        { text: "User", value: "userId" },
        { text: "Previews", value: "preview_count" },
        { text: "Status", value: "renderStatus" },
        { text: "", value: "actions", sortable: false },
      ],
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
      //Promise.all(
      /*
        await MovieRepository.get('{ "order": "created DESC" }').then(
          movies => {
            console.log("my movies", movies);
            movies.forEach(movie => {
              movie.show = false;
              movie.show_video = false;
              this.movies.push(movie);
            });
            
          }
        ),
*/
      /*
      await MovieRepository.getStatistic(
        '{ "groupBy": "created", "date" : "dayOfYear" ' + date_str + "}"
      ).then(
        function (stats) {
          console.log("stat movies", stats);
          console.log("stat movies .chartData", this.chartData);
          let data = [];
          stats.forEach((entry) => {
            data.push({ x: new Date(entry.date), y: entry.count });
          });

          this.chartData.series = [
            {
              name: "created",
              data: data,
            },
          ];

          //this.chartData.labels = {};

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

          console.log("stat movies .chartData", this.chartData);
        }.bind(this)
      );

      await MovieRepository.getStatistic(
        '{ "groupBy": "type"' + date_str + "}"
      ).then(
        function (stats) {
          console.log("stat movies type", stats);

          stats.forEach(
            function (entry) {
              this.chartTypeData.series.push(entry.count);
              this.chartTypeData.labels.push(entry.type);
            }.bind(this)
          );

          this.chartTypeOptions = {
            distributeSeries: true,
            axisY: {
              type: this.$chartist.AutoScaleAxis,
              onlyInteger: true,
              low: 0,
            },
          };

          console.log("stat movies type .chartData", this.chartTypeData);
        }.bind(this)
      );

      await MovieRepository.getStatistic(
        '{ "groupBy": "renderStatus"' + date_str + "}"
      ).then(
        function (stats) {
          console.log("stat movies status", stats);

          stats.forEach(
            function (entry) {
              this.chartStatusData.series.push(entry.count);
              this.chartStatusData.labels.push(entry.renderStatus);
            }.bind(this)
          );

          this.chartStatusOptions = {};

          console.log("stat movies type .chartData", this.chartStatusData);
        }.bind(this)
      );

      await MovieRepository.getStatistic(
        '{"groupBy": "userId","lookup":"client"' + date_str + "}"
      ).then(
        function (users) {
          console.log("stat movies userId", users);

          users.forEach(
            function (user) {
              this.chartUserData.series.push(user.count);
              this.chartUserData.labels.push(user.user[0].email);
            }.bind(this)
          );

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

          console.log("stat movies userId .chartData", this.chartUserData);
        }.bind(this)
      );
      //);
      */

      /*
      publishedMovies.forEach(movie => {
        movie.show = false;
        this.movies_published.push(movie);
      });
      */
    },
    updateFromStream(msg) {
      var data = JSON.parse(msg.data);
      this.movies_published.forEach((movie) => {
        if (data.target === movie.id) {
          movie.renderStatus = data.data.renderStatus;
          if (movie.renderStatus == "done") {
            movie.url = data.data.url;
            this.$toast.success(
              "Your movie '" + movie.name + "' has been rendered"
            );
          }
        }
      });
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
