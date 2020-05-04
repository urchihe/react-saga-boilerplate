import { ApiService } from '../ApiService'

function getTags() {
  return ApiService.get('/tags')
}

export const TagService = {
    getTags,
  }