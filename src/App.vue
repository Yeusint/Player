<template>
  <el-container>
    <el-header height="10px" style="text-align: right;">
      <el-switch v-model="darkmode" class="light" @change="darkchange" style="padding-right: 10px;" :active-action-icon="Moon" :inactive-action-icon="Sunny" />
      <el-button link :icon="Minus" />
      <el-button link :icon="FullScreen" />
      <el-button link :icon="Close" />
    </el-header>
  <el-main>
  <el-tabs v-model="activeTab" stretch="true">
    <el-tab-pane label="Search" name="search"><Search></Search></el-tab-pane>
    <el-tab-pane label="Songlist" name="songlist"><SongList></SongList></el-tab-pane>
  </el-tabs>
  </el-main>
  <el-footer style="text-align: center;" height="30px">
    <span>© 2023 101011110</span>
  </el-footer>
</el-container>
</template>
<script lang="ts" setup>
  import {ref} from 'vue'
  import { Close,Minus,FullScreen,Moon,Sunny } from "@element-plus/icons-vue";
  import Search from './page/search.vue'
  import SongList from './page/sl.vue'
  const activeTab = ref('search')
  const darkmode = ref(true)
  const darkchange = () => {
    document.documentElement.setAttribute('class', darkmode.value ? 'dark' : 'light')
  }
</script>