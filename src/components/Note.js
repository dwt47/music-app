import React, {Component} from 'react';

export default class Note extends Component {
	static scale = [
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'A#',
		'B',
	];

	constructor(props) {
		super(props);

		this.state = {
			modStep: 0,
		}
	}

	getNote() {
		let {note: [name, octave, ...rest]} = this.props,
			{modStep = 0} = this.state,
			n = Note.scale.length,
			i = Note.scale.indexOf(name);

		if (i+modStep >= n) {
			octave++;
		} else if (i + modStep < 0) {
			octave--;
		}

		name = Note.scale[(i+n+modStep)%n];

		return [name, octave, ...rest]
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selected && nextProps.playing && !this.props.playing ||
			nextProps.selected && !this.props.selected) {
			this.play();
		}

		if (this.props.selected && !nextProps.selected && this.state.modStep) {
			this.setState({modStep: 0});
		}
	}

	play() {
		this.props.piano.play(...this.getNote())
	}

	render() {
		const {
			// for className
			selected, 
			playing, 
			className = '',
			// don't pass these to li as props
			note,
			piano,
			// rest of props to add to li
			...restOfProps
		} = this.props;
		const internalClassName = className + ' note-pad__note '
			+ (selected ? 'selected ' : '')
			+ (playing ? 'active ' : '');

		return (
			<li 
				{...restOfProps}
				className={internalClassName}
			>
				<span 
					onClick={e => {
						e.stopPropagation(); 
						this.setState({modStep: 1-this.state.modStep})
					}} 
					style={{background: this.state.modStep ? "blue" : "green"}}
				>
					AA
				</span>
			</li>
		);
	}
}