import Vuex from 'vuex'
import Vue from 'vue'
import axios from "axios";
import { Links } from '@/classes/Links'
import { PER_PAGE } from '@/constants/constants'
import parser from '@/utils/linkParser'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    repos: [],
    currentPage: 1,
    links: {} as Links,
    loadingState: "empty"
  },
  getters: {
    repos: state => state.repos,
    currentPage: state => state.currentPage,
    links: state => state.links,
    loadingState: state => state.loadingState
  },
  mutations: {
    UPDATE_REPOS (state, data) {
      state.repos = data
    },
    UPDATE_CURRENT_PAGE (state, data) {
      state.currentPage = data
    },
    UPDATE_LINKS (state, data) {
      state.links = data
    },
    UPDATE_LOADING_STATE (state, data) {
      state.loadingState = data
    }
  },
  actions: {
    async fetchRepos ({ state, commit }, username) {
      try {
        commit('UPDATE_LOADING_STATE', 'loading')
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
          params: {
            per_page: PER_PAGE,
            page: state.currentPage
          }
        });
        const link: string = response.headers.link
        const data = response.data
        commit('UPDATE_LINKS', parser(link))
        commit('UPDATE_REPOS', state.repos.concat(data))
        commit('UPDATE_CURRENT_PAGE', state.currentPage + 1)
        commit('UPDATE_LOADING_STATE', 'success')
      } catch (e) {
        commit('UPDATE_LOADING_STATE', 'error')
        alert(e)
        console.error(e)
      }
    }
  }
})
