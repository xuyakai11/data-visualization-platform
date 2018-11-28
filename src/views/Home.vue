<template>
  <div class="home">
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/BigScreenSchool">BigScreenSchool</router-link> |
        <router-link to="/APIList">APIList</router-link>
    </div>
    <ProvinceList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProvinceList from '@/components/ProvinceList.vue' // @ is an alias to /src

@Component({
  components: {
  ProvinceList,
  },
  })
export default class Home extends Vue {}
</script>
