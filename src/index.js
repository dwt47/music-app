import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import MusicApp from './components/MusicApp';
import reducers from './reducers';

let selectedNotes = [];

for (let i=0; i<8; i++) {
	selectedNotes.push([]);
	for (let j=0; j<8; j++) {
		selectedNotes[i].push(false);
	}
}

const initialState = {
	selectedNotes,
	playback: {
		beat: 0,
		playing: false,
		tempo: 120,
	}
};

const store = createStore(reducers, initialState);

ReactDOM.render(
	<Provider store={store}>
		<MusicApp />
	</Provider>
, document.querySelector('#root'));
