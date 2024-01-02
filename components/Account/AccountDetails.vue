<template>
  <div>
    <form action="" class="flex flex-col gap-6">
        <div class="flex gap-6">
            <span class="w-1/2">
                <FormTextField placeholder="First Name"/>
            </span>
            <span class="w-1/2">
                <FormTextField placeholder="Last Name"/>
            </span>
        </div>
        <div>
            <FormTextField placeholder="Display Name"/>                
        </div>
        <div>
            <FormTextField placeholder="Email address"/>                
        </div>
        <h5 class="text-sm font-medium">PASSWORD CHANGE</h5>
        <div>
            <FormTextField placeholder="Current password (leave blank to leave unchanged) "/>                
        </div>
        <div>
            <FormTextField placeholder="New password (leave blank to leave unchanged) "/>                
        </div>
        <div>
            <FormTextField placeholder="Confirm new password  "/>                
        </div>
        <div>
            <button class="px-8 py-4 bg-head text-white text-sm">SAVE CHANGES</button>
        </div>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>