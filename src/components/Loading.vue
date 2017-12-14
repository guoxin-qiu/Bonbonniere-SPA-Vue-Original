<template>
<div class="loading-div">
    <div class="sk-chasing-dots" :style="styleObject">
        <div class="sk-child sk-dot1"></div>
        <div class="sk-child sk-dot2"></div>
    </div>
</div>
</template>
<style scoped>
.loading-div {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  opacity: 0.3;
  display: block;
}

.sk-chasing-dots {
  margin: auto;
  width: 80px;
  height: 80px;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  -webkit-animation: sk-chasingDotsRotate 2s infinite linear;
  animation: sk-chasingDotsRotate 2s infinite linear;
}

.sk-chasing-dots .sk-child {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #333;
  border-radius: 100%;
  -webkit-animation: sk-chasingDotsBounce 2s infinite ease-in-out;
  animation: sk-chasingDotsBounce 2s infinite ease-in-out;
}

.sk-chasing-dots .sk-dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-chasingDotsRotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes sk-chasingDotsRotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes sk-chasingDotsBounce {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes sk-chasingDotsBounce {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>

<script>
export default {
  computed: {
    styleObject() {
      return {
        marginTop: this.marginTop || 'auto',
        marginLeft: this.marginLeft || 'auto'
      }
    }
  },
  props: ['marginTop', 'marginLeft']
}
</script>
