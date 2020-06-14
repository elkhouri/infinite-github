<script lang="ts">
import debounce from 'lodash-es/debounce';
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import { GITHUB_USERNAME } from '@/constants/constants'
import * as loadingStates from '@/constants/loadingStates'

export default Vue.component('test', {
  name: 'test',
  data () {
    return {
      GITHUB_USERNAME,
      ...loadingStates
    }
  },

  computed: {
    ...mapGetters(['repos', 'currentPage', 'links', 'loadingState']),
    isLast (): boolean {
      return this.currentPage >= Number(this.links.last)
    }
  },

  created() {
    this.handleScroll()

    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    ...mapActions(['fetchRepos']),
    handleScroll: debounce(function () {
      // eslint-disable-next-line
      this.scroll()
    }, 300),
    scroll () {
      if (this.isLast) return

      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      const needFetch = bottomOfPage || pageHeight < visible
  
      if (needFetch) {
        this.fetchRepos(GITHUB_USERNAME)
      }
    }
  }
})
</script>

<template src="./Github.html"></template>
<style lang="scss" src="./Github.scss" scoped></style>