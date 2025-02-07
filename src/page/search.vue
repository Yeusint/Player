<template>
  <div class="row">
    <el-radio-group v-model="sm" style="flex-wrap: nowrap;" class="hidden-xs-only">
      <el-radio-button label="M" valve="M" />
      <el-radio-button label="B" valve="B" />
      <el-radio-button label="W" valve="W" />
    </el-radio-group>
    <el-autocomplete style="padding-left: 10px;" v-model="SearchKey" :fetch-suggestions="querySearch" clearable 
    @input="" />
  </div>
  <el-table :data="tData" style="margin-top: 20px;user-select: none;" :height="theight" @row-dblclick="ggg">
    <el-table-column prop="pic" width="50px">
      <template #default="scope">
        <el-image :src="scope.row.pic" fit="contain" :lazy="true" />
      </template>
    </el-table-column>
    <el-table-column label="Title" prop="title" />
    <el-table-column label="Singer" prop="singer" />
    <el-table-column label="Duration" prop="duration" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount} from 'vue'
import 'element-plus/theme-chalk/display.css'
import { KeySuggest } from "../assets/m";
interface SongData {
  pic: string;
  title: string;
  singer: string;
  duration: number;
  play_url: {
    320: string;
    128: string;
    48: string;
    32: string;
  }
  album: {
    id: number;
    name: string;
    pic: string;
    picUrl: string;
    pic_str: string;
  }
}
interface SuggestData {
  album: Object,
  singer: Object,
  song: Object,
  mv: Object
}
const sm = ref('B')
const theight = ref(0)
const SearchKey = ref('')
const tData = ref<SongData[]>([{title: '1',singer: '1',duration: 1}])
const calculateHeight = () => {
  const windowHeight = window.innerHeight
  theight.value = windowHeight - 200 // 40为安全余量
}
const ggg=(row, col)=>{
  console.log(row.name);
  console.log(col.label);
  ElMessage({
    type: 'success',
    message: '双击!',
    plain: true
  })
}
const querySearch = (queryString: string, cb: any) => {
  let st: SuggestData
  queryString ? KeySuggest(queryString, (res) => {
    st = res.data
    let r=[]
    for (let i of st.song.itemlist) {
      r.push({'value':i.name})
    }
    for (let i of st.singer.itemlist) {
      r.push({"value":i.name})
    }
    console.log(r);
    cb(r)
  }):0
}

onMounted(() => {
  calculateHeight()
  window.addEventListener('resize', calculateHeight)
  tData.value[0].pic = "https://i.biliimg.com/bfs/article/f2f2dfe12e062f1d71327e82ef2e3bc510830290.png@1000w_1000h_1c.webp"
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateHeight)
})
</script>