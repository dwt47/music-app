import {combineReducers} from 'redux';

import notepadReducer from './notepad';
import playbackReducer from './playback';

const rootReducer = combineReducers({
	selectedNotes: notepadReducer,
	playback: playbackReducer,
});

export default rootReducer;
