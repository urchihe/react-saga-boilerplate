import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../Sagas'
import { reducer as ArticleReducer } from './Article/Reducers'
import { reducer as AuthReducer } from './Auth/Reducers'
import { reducer as CommentReducer } from './Comment/Reducers'
import { reducer as ProfileReducer } from './Profile/Reducers'
import { reducer as TagReducer } from './Tag/Reducers'
import { reducer as CommonReducer } from './Common/Reducers'
import { reducer as EditorReducer } from './Editor/Reducers'
import { reducer as HomeReducer } from './Home/Reducers'
import { routerReducer } from 'react-router-redux';

export default () => {
  const rootReducer = combineReducers({
    article: ArticleReducer,
    auth: AuthReducer,
    comment: CommentReducer,
    profile: ProfileReducer,
    tag: TagReducer,
    common: CommonReducer,
    editor: EditorReducer,
    home: HomeReducer,
    router: routerReducer,
  })
  return configureStore(rootReducer, rootSaga)
}
