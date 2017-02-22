import React, {Component} from 'react';
import {connect} from 'react-redux';
import Synth from '../external/AudioSynth';

import * as actions from '../actions';
import Note from './Note';

class NotePad extends Component {
	constructor(props) {
		super(props);

		this.piano = Synth.createInstrument('piano');
	}

	getScale() {
		return [
			['C', 4, 1],
			['B', 3, 1],
			['A', 3, 1],
			['G', 3, 1],
			['F', 3, 1],
			['E', 3, 1],
			['D', 3, 1],
			['C', 3, 1],
		];
	}

	onClickNote(position) {
		this.props.toggleNote(position);
	}

	renderNote(isSelected, isActive, position) {
		return <Note 
			selected={isSelected} 
			playing={isActive}
			key={position.row}
			note={this.getScale()[position.row]}
			piano={this.piano}
			onClick={this.onClickNote.bind(this, position)}
		/>
	}

	renderCols() {
		const {
			selectedNotes, 
			activeCol,
		} = this.props;

		return selectedNotes.map((column, col) => {
			const isActive = col === activeCol;
			return (
				<li key={col}>
					<ul className="note-pad__col">
						{column.map((isSelected, row) => {
							return this.renderNote(isSelected, isActive, {col, row});
						})}
						<li className={`note-pad__active-column-marker ${activeCol == col ? 'active' : ''}`}></li>
					</ul>
				</li>
			);
		})
	}

	render() {
		return (
			<div className="note-pad">
				<ul className="note-pad__cols">
					{this.renderCols()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps({selectedNotes, playback: {playing, beat}}) {
	return {
		selectedNotes,
		activeCol: playing ? beat : -1,
	};
}

export default connect(mapStateToProps, actions)(NotePad);