<template>
  <div>
    <div>
      <SkeletonCardLoader />
    </div>

    <div class="flex items-center gap-2">
      <div class="h-10 w-4 bg-red-500 animate-bounce"></div>
      <div class="h-10 w-4 bg-red-500 animate-bounce delay-300"></div>
      <div class="h-10 w-4 bg-red-500 animate-bounce"></div>
    </div>
  </div>
</template>

<script>
import SkeletonCardLoader from '~/components/Loader/SkeletonCardLoader.vue'
export default {
  components:{
    SkeletonCardLoader
  },
    data(){
        return{
            isMenuOpen: false
        }
    },
    methods:{
        toggleMenu(){
            this.isMenuOpen = !this.isMenuOpen
        },
        async fetchLookBook(){
          try {
            const pro= await this.$axios.$get("/api/products?tags[]=ptag_01HP6MFJBRBSJE4MYMXQA404QP");

          } catch (error) {
              console.log(error)
          }
        }
    },
    async mounted(){
      await this.fetchLookBook()
    }
}
</script>

<style>

</style>