<template>
  <div>
      <router-view></router-view>
      <tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar/Tabbar'
export default {
    components: {
        Tabbar
    }
}
</script>

<style>

</style>