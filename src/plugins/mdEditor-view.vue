<!-- md文档编辑器，只读版本 -->
<template>
  <MdPreview :editorId="id" :modelValue="text" />
</template>

<script>
import {  MdPreview  } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
export default {
  name: 'MdEditorPage',
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      id: 'preview-only',
    }
  },
  components: {
    MdPreview,
  },
  computed: {
    
  },
  watch: {
  },
  methods: {
    
  },
  created () {
    
  },
  mounted () {
    
  },
}
</script>

<style scoped>
  
</style>
