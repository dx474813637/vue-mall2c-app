<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
      <van-tabbar-item id="carIcon" icon="shopping-cart-o" :badge="cartCount" to="/home/shopping">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/home/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            active: 1
        }
    },
    computed: {
      ...mapState(['cart']),
      cartCount() {
        return Object.values(this.cart).reduce((pre, next) => pre + next, 0)
      }
    }
};
</script>

<style>
</style>