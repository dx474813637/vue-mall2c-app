<template>
  <div>
    <van-nav-bar title="购物车" right-text="清空" @click-right="onClickRight" />
    <van-checkbox-group v-model="result" @change="handleChange">
      <div class="view" v-for="item in cartlist" :key="item.id">
        <div class="view-item icon">
          <van-checkbox :name="item.id"></van-checkbox>
        </div>
        <div class="view-item card">
          <good-card :nofly="true" :list="item" />
        </div>
      </div>
    </van-checkbox-group>
    <van-submit-bar :price="totalMoney" :button-text="btntext" @submit="onSubmit">
      <van-checkbox v-model="checkAll" @click="handleClickAll">全选</van-checkbox>
      <template #button>
        <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" size="small">{{btntext}}</van-button>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodCard from "@/components/GoodCard/GoodCard";
export default {
  data() {
    return {
      result: [],
      cartlist: [],
      checkAll: false,
    };
  },
  watch: {
  },
  computed: {
    ...mapState(["cart"]),
    totalMoney() {
      return this.cartlist.filter(ele => this.result.includes(ele.id)).reduce((pre, next) => {
        return pre + Math.round(this.cart[next.id] * (next.price_off || next.price)*100)
      }, 0)
      
    },
    btntext() {
      let num = this.cartlist.filter(ele => this.result.includes(ele.id)).reduce((pre, next) => {
        return pre + this.cart[next.id]
      }, 0)
      if(num > 0) {
        return `提交订单(${num})`
      }
      return `提交订单`
      
    }
  },
  created() {
    this.getGoodData();
  },
  components: {
    GoodCard,
  },
  methods: {
    onClickRight() {
      this.$store.commit('emptyCart')
      this.cartlist = []
    },
    onSubmit() {},
    handleChange(v) {
      // console.log(res)
      if(v.length == this.cartlist.length) {
        this.checkAll = true
      }else {
        this.checkAll = false
      }
    },
    handleClickAll() {
      if(this.checkAll) {
        this.result = this.cartlist.map(ele => ele.id)
      }else {
        this.result = []
      }
    },
    async getGoodData() {
      const arr = [];
      for (let k in this.cart) {
        const { list } = await this.$api.getGoodsByIds(k);
        arr.push(list[0]);
      }
      // console.log(arr)
      this.cartlist = arr;
    },
  },
};
</script>

<style scoped lang="less">
.van-submit-bar {
  bottom: 50px;
  border-top: 1px solid #f8f8f8;
}
.view {
  display: flex;
  align-items: center;
  .view-item {
    &.icon {
      flex-shrink: 0;
      width: 40px;
      display: flex;
      justify-content: center;
    }
    &.card {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
