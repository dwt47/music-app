import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

class TrackChooser extends Component {
	render() {
		return (
			<div className="track-chooser">TrackChooser</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, actions)(TrackChooser);