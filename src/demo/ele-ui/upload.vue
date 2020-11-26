<template>
  <div class="upload-demo">
    <base-upload />
    <avatar-upload />
    <object-value-upload />
    <file-upload />
    <event-upload />
  </div>
</template>

<script>
import baseUpload from './upload/base'
import avatarUpload from './upload/avatar'
import objectValueUpload from './upload/object-value'
import fileUpload from './upload/file'
import eventUpload from './upload/event'
export default {
  components: {
    baseUpload,
    avatarUpload,
    objectValueUpload,
    fileUpload,
    eventUpload
  }
}
</script>

<style scoped>
  .base-demo .box-card{
    margin: 40px 10px;
  }
</style>
