import React, { useState, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Link, useHistory, useParams, Route, Redirect } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

import { Button, Box } from '@material-ui/core';
import { typography } from '@material-ui/system';


import SongCard from './SongCard.js';
import SongCardList from './SongCardList.js';
import Nav from './Nav.js';
import Content from './Content.js';

function App(props) {
	let { lang, page } = useParams();
	const history = useHistory();
	
	useEffect(()=>{ 
		
	}, []);
	
	return (
	<div className="App"> 
	<Switch>
		<Route path="/:lang/:page">
			<Content></Content>
			<Nav></Nav>
		</Route>
		<Redirect from="/:lang" to='/:lang/songs' />
		<Redirect from="/" to='/kr/songs' />
		
	</Switch>
	</div>
	);
	
	


}


function stateToProps(state) {
    return {
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer
    }
}

function adjust(color, amount) {
	if(color===undefined) return null;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}




export default connect(stateToProps)(App);
