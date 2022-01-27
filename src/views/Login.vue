<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-form>
            <v-card-text>
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-email"
                type="text"
                v-model="email"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <router-link to="forgot-password">Reset password</router-link>
              <div class="flex-grow-1"></div>
              <v-btn type="submit" @click.stop.prevent="login('local')" color
                >Login</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function (type) {
      console.log("submit - login2");
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("auth/login", { email, password, type })
        .then((response) => {
          console.log("response login", response);
          //this.$toast.success("You have been successfully logged in");
          window.location = "/";
        })
        .catch((err) => {
          console.log("login error", err);
          var error = err.response.data.error.message;
          //this.$toast.error(error);
        });
    },
  },
};
</script>
