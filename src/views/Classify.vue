<template>
  <div>
      <div class="search-w">
          <div class="search-bg">
              <van-icon name="search" />
              <span>搜索</span>
          </div>
      </div>
      <one-tab />
  </div>
</template>

<script>
import OneTab from '@/components/OneTab/OneTab'
export default {
    components: {
        OneTab
    }
}
</script>

<style lang="less" scoped>
    .search-w {
        padding: 12px 15px;
        // border-bottom: 1px solid #f8f8f8;
        .search-bg {
            background-color: #f5f5f5;
            border-radius: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            color: #999;
            span {
                margin-left: 6px;
            }
        }
    }
</style>