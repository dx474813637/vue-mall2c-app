import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
const storage = localStorage
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [],
    goodsList: [],
    size: 10,
    type: "",
    sortActive: 0,
    cart: storage['cart'] ? JSON.parse(storage['cart']) : {}
  },
  mutations: {
    setSortActive(state, i) {
      state.sortActive = i
    },
    setMenuList(state, list) {
      state.menuList = list
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list]
      // console.log(state.goodsList)
    },
    removeGoodsList(state) {
      state.goodsList = []
    },
    setGoodsType(state, type) {
      state.type = type;
    },
    setCart(state, {id, num}) {
      // if(state.cart[id]) {
      //   state.cart[id] = num
      // }else {
        if(num == 0) {
          Vue.delete(state.cart, id)
        }else {
          Vue.set(state.cart, id, num)
        }
        
        storage.cart = JSON.stringify(state.cart)
      // }
      
    },
    emptyCart(state) {
      state.cart = {}
      storage.removeItem('cart')
    }
  },
  actions: {
    async getSideMenuData({commit}, type) {
      let res = await api.getSideList(type)
      commit('setMenuList', res)
      commit('setSortActive', 0)
    },
    async getGoodsData({state, commit}, options) {
      
      const type = options.type || state.type;
      // console.log(type, options)
      commit('setGoodsType', type);
      const { list, total } = await api.getGoodsList(type, options.page, state.size, options.sort)
      commit('setGoodsList', list)
      if(total > state.goodsList.length) {
        return true
      }else {
        return false
      }
    }
  },
  modules: {
  }
})
