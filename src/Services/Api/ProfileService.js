import { ApiService } from '../ApiService'

function followUser(username) {
  return ApiService.post(`/profiles/${username}/follow`)
}

function getProfile(username) {
    return ApiService.post(`/profiles/${username}`)
}

function unfollowUser(username) {
    return ApiService.delete(`/profiles/${username}/follow`)
}

export const ProfileService = {
    followUser,
    getProfile,
    unfollowUser,
  }
  