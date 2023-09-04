import type { CategoryTopItem } from '@/types/cotegory'
import { http } from '@/utils/https'
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
