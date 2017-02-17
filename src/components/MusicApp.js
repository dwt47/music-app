import React, { Component } from 'react';

import TrackChooser from './TrackChooser';
import NotePad from './NotePad';
import PlaybackControls from './PlaybackControls';

export default class MusicApp extends Component {
	render() {
		return (
			<div className="music-app">
				{/* <TrackChooser /> */}
				<NotePad />
				<PlaybackControls />
			</div>
		);
	}
}
