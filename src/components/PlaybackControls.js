import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

class PlaybackControls extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tempoText: props.tempo,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tempo != this.state.tempoText) {
			this.setState({tempoText: nextProps.tempo});
		}
	}

	play() {
		const {
			playing, 
			tempo,
			startPlayback,
			nextBeat,
		} = this.props;

		if (!playing) {
			this.nextBeatInterval = setInterval(nextBeat, 60*1000 / tempo)
			startPlayback();
		}
	}

	stop() {
		const {playing, stopPlayback} = this.props;

		if (playing) {
			clearInterval(this.nextBeatInterval);
			stopPlayback();
		}
	}

	clear() {
		this.props.clearAllNotes();
	}

	setTempo(e) {
		e.preventDefault();

		const {tempoText} = this.state;
		let newTempo = parseInt(tempoText);
		console.log('setTempo:', tempoText, this.props.tempo);

		if (isNaN(newTempo)) {
			newTempo = this.props.tempo;
		}

		newTempo = Math.max(10, newTempo);
		newTempo = Math.min(600, newTempo);

		if (newTempo != this.props.tempo) {
			this.props.setTempo(newTempo);
		}
	}

	render() {
		return (
			<div className="playback-controls">
				<div className="playback-buttons">
					<button onClick={this.play.bind(this)} className="play">PLAY</button>
					<button onClick={this.stop.bind(this)} className="stop">STOP</button>
					<button onClick={this.clear.bind(this)} className="clear">CLEAR</button>
					<form onSubmit={this.setTempo.bind(this)}>
						<label>Tempo:</label>
						<input 
							onBlur={this.setTempo.bind(this)}
							onChange={e => this.setState({tempoText: e.target.value})}
							ref="tempoInput" 
							type="text"
							value={this.state.tempoText}
						/>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {...state.playback};
}

export default connect(mapStateToProps, actions)(PlaybackControls);