<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6">
    <h5 class="text-2xl uppercase text-center mb-8">top categories</h5>
    <div class="grid grid-cols-8 gap-4">
        <div v-for="category in categories" :key="category.value" class="flex justify-center items-center gap-4 flex-col">
            <div class="md:h-28 md:w-28 bg-white rounded-full flex items-center justify-center">
                <img :src="require(`~/assets/images/icons/categories/${category.icon}`)" alt="">
            </div>
            <h1 class="text-sm font-medium text-head">{{ category.name }}</h1>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"HomeTopCategories",
    data(){
        return{
            categories:[
                { name:"Handbags", value:"handbags", icon:'handbag.svg'},
                { name:"Clothings", value:"clothings", icon:'clothes-hanger.svg'},
                { name:"Jackets", value:"jackets", icon:'hoodie.svg'},
                { name:"Watches", value:"watches", icon:'wristwatch.svg'},
                { name:"Dresses", value:"dresses", icon:'wedding-dress.svg'},
                { name:"Shoes", value:"shoes", icon:'shoes.svg'},
                { name:"Jeans", value:"jeans", icon:'trousers.svg'},
                { name:"Shirts", value:"shirts", icon:'tshirt.svg'}
            ]
        }
    }
};
</script>

<style></style>
