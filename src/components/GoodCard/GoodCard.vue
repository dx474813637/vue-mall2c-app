<template>
  <div class="card van-hairline--bottom">
    <div class="card-img">
      <van-image
        :ref="`img${list.id}`"
        width="200"
        height="200"
        radius="16"
        lazy-load
        :src="list.images[0]"
      />
    </div>
    <div class="card-content">
      <div class="title van-ellipsis">{{list.title}}</div>
      <div class="desc van-ellipsis">{{list.desc}}</div>
      <div class="tag van-ellipsis">
        <div class="tag-item" v-for="(item, index) in list.tags">{{item}}</div>
      </div>
      <!-- <div class="sale">销量{{list.sale}}份</div> -->
      <div class="content-footer">
        <div class="price" :class="{off: list.price_off? true : false}">
          <div class="price-one">{{list.price_off? list.price_off : list.price}}</div>
          <div class="price-dw">元/{{list.unit}}</div>
          <div class="price-two">{{ list.price }}</div>
        </div>
        <div class="footer-item">
          <template v-if="num == 0">
            <van-icon name="cart-circle" size="44" color="#ee0a24" @click="addCar" />
          </template>
          <template v-else>
            <van-stepper
              v-model="num"
              min="0"
              theme="round"
              button-size="38"
              disable-input
              @change="handleChange"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Animate from "@/tools/Animate/index.js";
export default {
  props: {
    list: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      //   num: 0
    };
  },
  computed: {
    ...mapState(["cart"]),
    num: {
      get() {
        return this.cart[this.list.id] || 0;
      },
      set(v) {
        if ((this.cart[this.list.id] || 0) < v) {
          const img = this.$refs[`img${this.list.id}`].$el;
          const target = document.getElementById("carIcon");
          const { left: startX, top: startY } = img.getBoundingClientRect();
          const { offsetWidth: width, offsetHeight: height } = img;
          const { left: tarX, top: tarY } = target.getBoundingClientRect();
          const endX = tarX + target.offsetWidth / 2;
          const endY = tarY + target.offsetHeight / 2;
          // console.log(startX, startY, width, height, endX, endY)
          const src = this.list.images[0];
          Animate({ startX, startY, endX, endY, src, width, height });
        }
        this.setCart({ id: this.list.id, num: v });
      }
    }
  },
  methods: {
    ...mapMutations(["setCart"]),
    addCar() {
      this.num = 1;
    },
    handleChange(value) {}
  }
};
</script>

<style scoped lang="less">
.card {
  display: flex;
  padding: 8px 5px;

  .card-img {
    flex: 0 0 100px;
  }
  .card-content {
    flex: 1;
    padding: 0 5px;
    position: relative;
    overflow: hidden;
    .title {
      font-size: 14px;
      margin-bottom: 4px;
    }
    .desc {
      color: #f90;
      margin-bottom: 4px;
    }
    .tag {
      color: #999;
      display: flex;
      font-size: 10px;
      margin-bottom: 4px;
      .tag-item {
        border: 1px solid #999;
        padding: 0px 4px;
        border-radius: 3px;
        margin-right: 3px;
      }
    }
    .sale {
      color: #999;
      font-size: 12px;
    }
    .content-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      width: 100%;
      padding: 0 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        display: flex;
        align-items: baseline;
        color: @themeColor;
        &.off .price-two {
          display: block;
        }
        .price-one {
          font-size: 16px;
        }
        .price-dw {
          font-size: 12px;
          margin-left: 4px;
        }
        .price-two {
          display: none;
          text-decoration: line-through;
          color: #999;
          margin-left: 4px;
        }
      }
      .footer-item {
      }
    }
  }
}
</style>