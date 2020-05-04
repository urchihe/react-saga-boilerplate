import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { HomeTypes } from './Actions'

export const homePageLoaded = (state,{action}) => ({
  ...state,
  tags: action.payload[0].tags
})


export const reducer = createReducer(INITIAL_STATE, {
    [HomeTypes.HOME_PAGE_LOADED]: homePageLoaded,
  })