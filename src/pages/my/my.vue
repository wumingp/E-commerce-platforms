<script setup lang="ts">
import { useMemberStore } from '@/stores'
import '@/utils/https'
import { http } from '@/utils/https'
const memberStore = useMemberStore()
const getData = async () => {
  const res = await http({
    method: 'GET',
    url: '/home/banner',
    header: {},
  })
  console.log('请求成功', res)
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '12345',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData" role="button" size="mini">测试请求</button>
  </view>
</template>

<style lang="scss">
//
</style>
