<template>
  <div class="side-wrapper van-hairline--right" ref="sideWrap">
    <div
      class="side-item"
      v-for="(item, index) in menuList"
      :class="{active: active == index}"
      @touchend="changeActive(index, $event)"
      @touchstart="move = true"
      @touchmove="move = false"
    >{{index == 0 ? '全部' :item}}</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import utils from "@/utils/index.js";
export default {
  data() {
    return {
      active: 0,
      move: false,
      page: 1
    };
  },
  watch: {
    menuList() {
      this.active = 0;
      this.setGoodsType(this.menuList[0]);
      this.removeGoodsList()
      this.getGoodsData({
        sort: "all",
        page: 1
      });
    },
  },
  computed: {
    ...mapState({
      menuList: state => state.menuList
    })
  },
  methods: {
    ...mapActions(["getGoodsData"]),
    ...mapMutations(["setGoodsType", "removeGoodsList", "setSortActive"]),
    changeActive(i, e) {
      if (!this.move) return;
      this.active = i;
      const { sideWrap } = this.$refs;
      const target = e.target;
      let disX =
        target.getBoundingClientRect().top +
        target.offsetHeight / 2 -
        142 -
        sideWrap.offsetHeight / 2;
      utils.moveTo(sideWrap.scrollTop, disX, sideWrap, "scrollTop");
      this.removeGoodsList()
      this.setSortActive(0)
      this.getGoodsData({
        type: this.menuList[this.active],
        sort: "all",
        page: 1
      });
    }
  }
};
</script>

<style lang='less' scoped>
.side-wrapper {
  position: fixed;
  left: 0;
  top: 142.5px;
  width: 80px;
  height: calc(100% - 192.5px);
  background-color: #f8f8f8;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .side-item {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.3s;
    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0px;
      height: 15px;
      background-color: @themeColor;
      transition: all 0.3s;
    }
    &.active {
      background-color: #fff;
      &::after {
        width: 4px;
      }
    }
  }
}
</style>