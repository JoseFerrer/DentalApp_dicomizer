import { combineReducers } from 'redux'
import mwl from './modalitywl';
import choosen from './chpatient';
import images from './chimg';
 
export default combineReducers({ mwl, choosen, images });