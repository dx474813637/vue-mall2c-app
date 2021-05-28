<template>
  <div class="w">
    <div class="search-w">
      <div class="search-bg" @click="gotoSearch">
        <van-icon name="search" />
        <span>搜索</span>
      </div>
    </div>
    <one-tab />
    <side-menu />
    <div class="main">
      <div class="main-bar van-hairline--bottom">
        <div
          class="bar-item"
          v-for="item in typeList"
          :key="item.active"
          :class="{
            'active': sortActive == item.active,
            'price': item.active == 2,
            'price-up': sort == 'price-up',
            'price-down': sort == 'price-down'
          }"
          @click="handleChangeActive(item.active)"
        >{{item.name}}</div>
      </div>
      <div class="main-list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" head-height="100">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <good-card v-for="item in goodsList" :key="item.id" :list="item" />
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import OneTab from "@/components/OneTab/OneTab";
import SideMenu from "@/components/SideMenu/SideMenu";
import GoodCard from "@/components/GoodCard/GoodCard";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    OneTab,
    SideMenu,
    GoodCard
  },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      sort: "all",
      typeList: [
        {
          type: "all",
          active: 0,
          name: "综合"
        },
        {
          type: "sale",
          active: 1,
          name: "销量"
        },
        {
          type: "price",
          active: 2,
          name: "价格"
        }
      ]
    };
  },
  computed: {
    ...mapState(["goodsList", "size", "sortActive"])
  },
  watch: {
    sortActive(v) {
      if(v == 0) {
        this.sort = "all"
      }
    }
  },
  methods: {
    ...mapActions(["getGoodsData"]),
    ...mapMutations(["removeGoodsList", "setSortActive"]),
    handleChangeActive(i) {
      if (i == 2) {
        if (this.sortActive != i) {
          this.sort = "price-up";
          this.onRefresh();
        } else {
          this.sort = this.sort == "price-up" ? "price-down" : "price-up";
          this.onRefresh(); 
        }
      } else if (this.sortActive == i) {
        return;
      } else {
        
        this.sort = this.typeList[i].type;
        this.onRefresh();
      }
      this.setSortActive(i);
    },
    async onRefresh() {
      console.log("refresh");
      this.page = 1;
      this.removeGoodsList();
      let flag = await this.getGoodsData({ page: this.page, sort: this.sort });
      this.refreshing = false;
      this.finished = !flag;
    },
    async onLoad() {
      console.log("loading");
      if (this.finished) return;
      this.loading = true;
      this.page += 1;
      let flag = await this.getGoodsData({ page: this.page, sort: this.sort });
      this.loading = false;
      this.finished = !flag;
    },
    gotoSearch() {
      this.$router.push('/search')
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  left: 80px;
  bottom: 50px;
  width: calc(100% - 80px);
  height: calc(100% - 192px);
  overflow: hidden;
  .main-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 30px;
    color: #999;
    .bar-item {
      padding: 0 10px;
      &.active {
        color: @themeColor;
      }
      &.price {
        position: relative;
        padding-right: 20px;
        &.price-down:after {
          border-top-color: @themeColor;
        }
        &.price-up:before {
          border-bottom-color: @themeColor;
        }
        &:before,
        &:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          right: 10px;
        }
        &:before {
          border-top: 0;
          border-bottom: 4px solid #ccc;
          top: 3px;
        }
        &:after {
          border-bottom: 0;
          border-top: 4px solid #ccc;
          bottom: 3px;
        }
      }
    }
  }
  .main-list {
    height: calc(100% - 30px);
    overflow-y: auto;
    position: relative;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.search-w {
  padding: 10px 15px;
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