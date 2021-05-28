<template>
  <div class="w">
    <div class="search-w">
      <div class="search-item search-return" @click="$router.back()">
        <van-icon name="arrow-left" size="40" />
      </div>
      <div class="search-item search-box">
        <van-search
          v-model="kw"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @input="onInput"
          @focus="onFocus"
          @cancel="onCancel"
        >
          <template #action v-if="!showRes">
            <div @click="onSearch(kw)">搜索</div>
          </template>
          <template #action v-else>
            <div class="carticon" id="carIcon">
              <van-icon name="shopping-cart-o" :badge="num" size="40" />
            </div>
          </template>
        </van-search>
      </div>
    </div>
    <div class="like-list content" v-show="!showRes">
      <van-cell v-for="(item, index) in likeList" :key="index" @click="handleCellSearch(item)">
        <template #title>
          <div v-html="vhtml(item, kw)"></div>
        </template>
      </van-cell>
    </div>

    <div class="main-list content" v-show="showRes">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <good-card v-for="item in searchRes" :key="item.id" :list="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
import GoodCard from "@/components/GoodCard/GoodCard";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      kw: "",
      timer: null,
      likeList: [],
      searchRes: [],
      showRes: false
    };
  },
  components: {
    GoodCard
  },
  computed: {
    ...mapState(["cart"]),
    num() {
      return Object.values(this.cart).reduce((pre, next) => pre + next, 0);
    }
  },
  methods: {
    vhtml(v, kw) {
      const reg = new RegExp(kw, "ig");
      const k = kw.fontcolor("red");
      return v.replace(reg, k);
    },
    async onSearch(value) {
      this.searchRes = [];
      let flag = await this.searchGoods();
      this.loading = false;
      this.finished = !flag;
    },
    async onInput(value) {
      if (!value) {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(async () => {
        const { result } = await this.$api.likeSearch(value);
        this.likeList = result || [];
        clearTimeout(this.timer);
      }, 300);
    },
    async handleCellSearch(value) {
      this.kw = value;
      this.searchRes = [];
      let flag = await this.searchGoods();
      this.loading = false;
      this.finished = !flag;
    },
    async searchGoods() {
      this.showRes = true;
      const { list, total } = await this.$api.search(this.kw, this.page, 10);
      this.searchRes = [...this.searchRes, ...list];

      return this.searchRes.length < total ? true : false;
    },
    onFocus() {
      this.showRes = false;
    },
    async onLoad() {
      console.log("loading");
      if (this.finished) return;
      this.loading = true;
      this.page += 1;
      let flag = await this.searchGoods();
      this.loading = false;
      this.finished = !flag;
    },
    onCancel() {
      console.log(this.kw);
    }
  }
};
</script>

<style scoped lang="less">
.w {
  &::-webkit-scrollbar {
    display: none;
  }
}
.search-w {
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 55px;
  background-color: #fff;
  z-index: 300;
  .search-item {
    &.search-box {
      flex: 1;
      //   margin-left: 10px;
    }
  }
}
.like-list {
  padding-left: 25px;
}
.content {
  padding-top: 50px;
}
.carticon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>