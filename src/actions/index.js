import {
	TOGGLE_NOTE,
	START_PLAYBACK,
	STOP_PLAYBACK,
	NEXT_BEAT,
	SET_TEMPO,
} from './types';

export function toggleNote({row, col}) {
	return {
		type: TOGGLE_NOTE,
		payload: {position: {row, col}},
	};
}

export function startPlayback() {
	return {
		type: START_PLAYBACK,
	};
}

export function stopPlayback() {
	return {
		type: STOP_PLAYBACK,
	};
}

export function nextBeat() {
	return {
		type: NEXT_BEAT,
	};
}

export function setTempo(newTempo) {
	return {
		type: SET_TEMPO,
		payload: newTempo,
	};
}