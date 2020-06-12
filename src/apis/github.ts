import axios from 'axios'

export function fetchRepos (username: string, params: {}) {
    const api = `https://api.github.com/users/${username}/repos`
    return axios.get(api, { params })
}