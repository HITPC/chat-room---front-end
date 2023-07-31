<template>
  <div class="">
    {{ roomId }}
  </div>
</template>

<script>
export default {
  name: 'ChatRoom',
  props: {},
  data () {
    return {
      roomId: this.$route.params.id,
    }
  },
  components: {
    
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
