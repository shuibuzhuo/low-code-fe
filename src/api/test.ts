import request from '@/utils/request.ts'

export function testApi() {
  return request({
    url: '/test'
  })
}
