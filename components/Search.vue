<template>
  <div class="row m-3">
    <div class="col-md-6 col-12">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="cups"
          placeholder="Enter CUPS"
        />
        <button class="btn btn-primary" type="button" @click="search">
          Search
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useClientStore } from "@/store/client";

const cups = ref("");
const clientStore = useClientStore();

const search = () => {
  if (cups.value) {
    clientStore.fetchClientData(cups.value);
  }
};
</script>
