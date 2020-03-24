import fetch from '@/utils/request'

export function getLineList (data) { // 举例子
  return fetch.post('/address/update', data)
}
