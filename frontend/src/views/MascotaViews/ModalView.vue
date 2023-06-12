<template>
  
  <div :style="{display: open?'block':'none', position: 'absolute',
    top: '30%'}"  class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button @click="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="controls"></slot>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  props: {
    onClose: {
      type: Function,
      required: true
    },
    open: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  close() {
    this.onClose();
  }
}
</script>
