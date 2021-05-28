<template>
  <div class="tab-wrapper van-hairline--bottom" ref="tabWrap">
    <div class="list">
      <div
        class="list-item"
        :class="{active: active == index}"
        v-for="(item, index) in menuList"
        :key="index"
        @touchend="scrollTo(index, $event)"
        @touchstart="move = false"
        @touchmove="move = true"
      >
        <div class="item-img">
          <van-image width="90" height="90" radius="50%" :src="item.imgURL" />
        </div>
        <div class="item-title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import utils from "@/utils/index.js";
export default {
  data() {
    return {
      active: 0,
      menuList: [
        {
          title: "时令水果",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg"
        },
        {
          title: "酒水冲调",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg"
        },
        {
          title: "安心乳品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg"
        },
        {
          title: "休闲零食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg"
        },
        {
          title: "肉蛋食材",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg"
        },
        {
          title: "新鲜蔬菜",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg"
        },
        {
          title: "熟食餐饮",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg"
        },
        {
          title: "海鲜水产",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg"
        },
        {
          title: "粮油调味",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg"
        },
        {
          title: "某手美食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg"
        },
        {
          title: "纸杯清洁",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg"
        },
        {
          title: "个人护理",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg"
        },
        {
          title: "美妆护肤",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg"
        },
        {
          title: "家居收纳",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg"
        },
        {
          title: "家用电器",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg"
        },
        {
          title: "3C数码",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg"
        },
        {
          title: "母婴用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg"
        },
        {
          title: "鲜花绿植",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg"
        },
        {
          title: "宠物用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg"
        },
        {
          title: "图书玩具",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg"
        },
        {
          title: "手表配饰",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg"
        }
      ],
      move: false
    };
  },
  created() {
    // this.getSideMenuData(this.menuList[this.active].title);
  },
  watch: {
    active: {
      immediate: true,
      handler(i) {
        this.getSideMenuData(this.menuList[this.active].title);
      }
    }
  },
  methods: {
    ...mapActions(["getSideMenuData"]),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.active = i;
      // 计算移动的距离
      const { tabWrap } = this.$refs;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const wrapperWidth = tabWrap.offsetWidth;
      utils.moveTo(tabWrap.scrollLeft, itemWidth / 2 + itemLeft - wrapperWidth / 2, tabWrap, 'scrollLeft');
    },
  }
};
</script>

<style lang="less" scoped>
.tab-wrapper {
  width: 375px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none !important;
    width: 0px;
    height: 0px;
  }
  .list {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 6px 8px;
    .list-item {
      // width: 60px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item-img {
        width: 49px;
        height: 49px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid transparent;
        margin-bottom: 6px;
        transition: all 0.3s;
      }
      .item-title {
        text-align: center;
        font-size: 12px;
        white-space: nowrap;
        padding: 0 5px;
        transition: all 0.3s;
      }
      &.active {
        .item-img {
          border: 2px solid @themeColor;
        }
        .item-title {
          background-color: @themeColor;
          color: #fff;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>