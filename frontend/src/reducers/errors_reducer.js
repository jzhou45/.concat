import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import ProblemErrorsReducer from './problems_errors_reducer';
import RoomErrorsReducer from './room_errors_reducer';
import DocumentErrorsReducer from './document_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  problems: ProblemErrorsReducer,
  room: RoomErrorsReducer,
  document: DocumentErrorsReducer
});