<template>
  <header class="fixed w-full bg-white block">
    <div class="xl:max-w-7xl lg:max-w-4xl mx-auto flex items-center justify-between py-4">
      <div class="flex items-center xl:gap-10 lg:gap-4">
        <img src="~/assets/images/logo.png"/>
        <!--Navigation  -->
        <nav class="flex">
          <ul class="flex items-center xl:gap-10 lg:gap-6 text-sm uppercase text-head font-medium">
            <li v-for="(link, idx) in navLinks" :key="idx"><a href="#">{{ link.title}}</a></li>
          </ul>
        </nav>
      </div>
      <!-- Options -->
      <div class="flex items-center xl:gap-10 lg:gap-6">
        <button>
          <img src="~/assets/images/icons/magnify.svg"/>
        </button>
        <button>
          <img src="~/assets/images/icons/account.svg"/>
        </button>
        <button>
          <img src="~/assets/images/icons/heart.svg"/>
        </button>
        <button>
          <img src="~/assets/images/icons/shopping-bag.svg"/>
        </button>
        <button>
          <img src="~/assets/images/icons/nav-icon.svg"/>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
name:"SiteHeader",
data(){
  return{
    navLinks:[
      {
        title:"Home",
        value:"index"
      },
      {
        title:"Shop",
        value:"shop"
      },
      {
        title:"Collection",
        value:"collection"
      },
      {
        title:"Journal",
        value:"journal"
      },
      {
        title:"Lookbook",
        value:"look-book"
      },
      {
        title:"Pages",
        value:"pages"
      }
    ]
  }
}
}
</script>

<style>

</style>