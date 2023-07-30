<!-- md文档编辑器，可读可写版本 -->
<template>
  <div class="">
    <MdEditor v-model="content" />
  </div>
</template>

<script>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
  name: 'MdEditorPage',
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false,
      default: ""
    }
  },
  data () {
    return {
      content: ""
    }
  },
  components: {
    MdEditor
  },
  computed: {
    
  },
  watch: {
    content(newValue){  
      if(this.type === "add"){
        this.$bus.emit('add-mdContent', newValue);
      }else if(this.type === "edit"){
        this.$bus.emit('update-mdContent', newValue);
      }
      
    },
  },
  methods: {
    
  },
  created() {
    if (this.type === 'edit' && this.text !== '') {
      this.content = this.text;
    }
  },

  mounted () {
    
  },
  beforeUnmount(){
    this.$bus.off("add-mdContent");
    this.$bus.off("update-mdContent");
  }
}
</script>

<style scoped>
  
</style>
