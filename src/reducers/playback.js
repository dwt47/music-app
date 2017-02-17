import {
	START_PLAYBACK,
	STOP_PLAYBACK,
	NEXT_BEAT,
	SET_TEMPO,
} from '../actions/types';

export default function (state = {}, action) {
	switch(action.type) {
		case START_PLAYBACK:
			return {
				...state,
				playing: true,
			};
		case STOP_PLAYBACK:
			return {
				...state,
				beat: 0,
				playing: false,
			};
		case NEXT_BEAT:
			return {
				...state,
				beat: (state.beat + 1) % 8
			};
		case SET_TEMPO:
			return {
				...state,
				tempo: action.payload,
			};
	}

	return state;
}