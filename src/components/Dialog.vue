<template>
  <transition name="dialog">
    <div class="dialog-mask">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <div class="dialog-header">
            <button type="button" class="close" @click="$emit('close')">
              <span>&times;</span>
            </button>
            <slot name="dialog-header"></slot>
          </div>
          <div class="dialog-body">
            <slot name="dialog-body"></slot>
          </div>
          <div class="dialog-footer">
            <slot name="dialog-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default{

  }
</script>

<style scoped>
  .dialog-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
  }

  .dialog-header .close span {
      font-size: 36px;
  }

  .dialog-wrapper {
      display: table-cell;
      vertical-align: middle;
  }

  .dialog-enter {
      opacity: 0;
  }

  .dialog-leave-active {
      opacity: 0;
  }

  .dialog-enter .dialog-content,
  .dialog-leave-active .dialog-content {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
  }

  .dialog-content {
      width: 800px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
  }
</style>
