import { Links } from '@/classes/Links'

export default function parser(linkStr: string) {
    return linkStr.split(',').reduce((prev: Links, cur: string) => {
        const link: string = cur.split(';')[0].match(/[^_]page=(\d+)/)?.[1] || ''
        const rel: string = cur.split(';')[1].match(/rel="(.+)"/)?.[1] || ''
        prev[rel] = link
        return prev
    }, {})
}
  