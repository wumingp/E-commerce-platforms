<script setup lang="ts">
import CustomNavbar from './CustomNavbar.vue'
import CategoryPane from './CategoryPane.vue'
import PageSkeleton from './PageSkeleton.vue'
import HotPanel from './HotPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { ref } from 'vue'
import type { XtxGuessInstance } from '@/components/components'
const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])
const isLoading = ref(false)
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
  console.log(hotList.value)
}

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})

const guessRef = ref<XtxGuessInstance>()
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  isTriggered.value = false
}
</script>

<template>
  <CustomNavbar></CustomNavbar>

  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isLoading"></PageSkeleton>
    <template v-else>
      <XtxSwiper :list="bannerList"></XtxSwiper>
      <CategoryPane :list="categoryList"></CategoryPane>
      <HotPanel :list="hotList"></HotPanel>
      <XtxGuess ref="guessRef"></XtxGuess>
    </template>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-view {
  flex: 1;
}
</style>
