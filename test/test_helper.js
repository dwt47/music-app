import chai, {expect} from 'chai';
import chaiJquery from 'chai-jquery';
import _$ from 'jquery';
import jsdom from 'jsdom';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../src/reducers';

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props = {}, state = {}) {
	const componentInstance = TestUtils.renderIntoDocument(
		<Provider store={createStore(reducers, state)}>
			<ComponentClass {...props} />
		</Provider>
	);

	return $(ReactDOM.findDOMNode(componentInstance)); 
}


// build helper for simulating events
$.fn.simulate = function(eventName, value) {
	if (value) {
		this.val(value);
	}

	TestUtils.Simulate[eventName](this[0]);
}


// set up chai-jquery
chaiJquery(chai, chai.util, $);

export {expect, renderComponent};