import {
	TOGGLE_NOTE
} from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case TOGGLE_NOTE:
			let {position} = action.payload;
			return state.map((col, colIndex) => {
				if (colIndex == position.col) {
					return col.map((val, rowIndex) => {
						if (position.row == rowIndex) {
							return !val;
						}

						return val;
					});
				}

				return col;
			});
	}
	
	return state;
}