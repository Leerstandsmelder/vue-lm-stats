<template>
  <v-progress-linear
    :active="visible"
    :indeterminate="visible"
    absolute
    bottom
    color="black accent-8"
  ></v-progress-linear>
</template>

<script>
export default {
  name: "loader",
  props: ["visible"]
};
</script>
