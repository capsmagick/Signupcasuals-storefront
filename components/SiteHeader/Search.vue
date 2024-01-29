<template>
  <div class="header-search flex flex-col gap-4">
    <h6 class="text-sm font-medium text-second">WHAT ARE YOU LOOKING FOR?</h6>
    <div class="">
        <div class="flex items-center">
          <input
            id="search-field"
            class="h-full w-full border-b border-second py-3 pl-3 pr-8 text-head placeholder-second focus:border-head focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
            v-model="searchBrand"
          />
          <Magnify class="-ml-7 relative text-second" />
        </div>
      </div>
    <h6 class="text-sm font-medium text-second">QUICKLINKS</h6>
    <ul>
        <li v-for="link in quickLinks" :key="link.title" class="text-sm text-head font-normal capitalize leading-7">{{ link.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name:"HeaderSearch",
    components:{
        Magnify: () => import("vue-material-design-icons/Magnify.vue")
    },
    data(){
        return{
            quickLinks:[
                {
                    title:"new arrivals",
                    link:""
                },
                {
                    title:"dresses",
                    link:""
                },
                {
                    title:"Accessories",
                    link:""
                },
                {
                    title:"Footwear",
                    link:""
                },
                {
                    title:"Sweatshirt",
                    link:""
                },
            ]
        }
    }
}
</script>

<style>

</style>