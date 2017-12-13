<template>
<div class="loading-div">
    <div class="sk-chasing-dots" :style="styleObject">
        <div class="sk-child sk-dot1"></div>
        <div class="sk-child sk-dot2"></div>
    </div>
</div>
</template>

<script>
  export default{
    computed: {
      styleObject(){
        return {
          marginTop: this.marginTop || 'auto',
          marginLeft: this.marginLeft || 'auto'
        }
      }
    },
    props:['marginTop','marginLeft']
  }
</script>
