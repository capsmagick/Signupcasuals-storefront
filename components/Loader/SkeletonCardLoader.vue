<template>
  <div>
    <div class="w-full mx-auto bg-gray-100 rounded">
        <div class="animate-pulse flex flex-col space-x-4">
        <div class="w-full rounded bg-slate-200"
        :class="[height ? height:'h-80']"
        ></div>
          <!-- <div class="rounded-full bg-slate-200 h-10 w-10"></div> -->
          <div class="flex flex-col flex-1 gap-4 p-4">
            <div class="h-3 bg-gray-200 rounded w-24"></div>
            <div class="h-3 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"ProductSkeletonLoader",
    props:{
      height:{
        type: String,
        default:"h-80"
      }
    }
}
</script>

<style>

</style>