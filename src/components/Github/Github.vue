<script lang="ts">
import axios from "axios";
import Vue from 'vue';
import { Links } from '@/classes/Links'
import { PER_PAGE } from '@/constants/constants'
import parser from '@/utils/linkParser'

export default Vue.component('test', {
  name: 'test',
  data () {
    return {
      repos: [],
      currentPage: 1 ,
      links: {} as Links
    }
  },

  computed: {
    isLast (): boolean {
      return this.currentPage >= Number(this.links.last)
    }
  },

  created() {
    this.fetch();

    window.onscroll = this.handleScroll
  },

  methods: {
    handleScroll() {
      if (this.isLast) return

      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      const needFetch = bottomOfPage || pageHeight < visible
  
      if (needFetch) {
        this.fetch()
      }
    },
  
    async fetch() {
      try {
        const response = await axios.get("https://api.github.com/users/elkhouri/repos", {
          params: {
            per_page: PER_PAGE,
            page: this.currentPage
          }
        });
        const link: string = response.headers.link
        const data = response.data
        this.links = parser(link)
        this.repos = this.repos.concat(data);
        this.currentPage++
      } catch (e) {
        alert(e)
        console.error(e)
      }
    }
  }
})
</script>