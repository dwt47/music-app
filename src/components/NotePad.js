import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

class NotePad extends Component {
	onClickNote(position) {
		this.props.toggleNote(position);
	}

	renderNote(isSelected, isActive, position) {
		const className = `note-pad__note ${isSelected ? 'selected' : ''} ${isActive ? 'active' : ''}`;
		return (
			<li 
				key={position.row}
				className={className}
				onClick={this.onClickNote.bind(this, position)}
			/>
		);
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