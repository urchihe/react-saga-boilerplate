import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    followUser: ['username'],
    followUserSuccess: ['profile'],
    followUserError: ['error'],
    getProfile: ['username'],
    profileSuccess: ['profile'],
    profileError: ['error'],
    unfollowUser: ['username'],
    unfollowUserSuccess: ['profile'],
    unfollowUserError: ['error'],
    profilePageLoaded: ['action'],
})
export const ProfileTypes = Types
export default Creators