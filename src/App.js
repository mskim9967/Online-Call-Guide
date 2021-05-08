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
import Popup from './Popup.js';


function App(props) {
	let { lang, page } = useParams();
	const history = useHistory();
	
	useEffect(()=>{
	if(props.theme==='light') {
		document.documentElement.style.setProperty("--text", '#545454');
		document.documentElement.style.setProperty("--pageBg", '#fbfbfb');
		document.documentElement.style.setProperty("--tabBg", '#ffffff');
		document.documentElement.style.setProperty("--lightShadow", '#ffffff');
		document.documentElement.style.setProperty("--shadow", '#8f8f8f');
		document.documentElement.style.setProperty("--darkShadow", '#000000');	
		
		document.documentElement.style.setProperty("--im", '#fff7f7');	
		document.documentElement.style.setProperty("--cg", '#e6efff');	
		document.documentElement.style.setProperty("--ml", '#ffffeb');	
		document.documentElement.style.setProperty("--sm", '#f7fffa');
		document.documentElement.style.setProperty("--sc", '#f7ffff');	
	}
	else {
		document.documentElement.style.setProperty("--text", '#ffffff');
		document.documentElement.style.setProperty("--pageBg", '#222222');
		document.documentElement.style.setProperty("--tabBg", '#1a1a1a');
		document.documentElement.style.setProperty("--lightShadow", '#0a0a0a');
		document.documentElement.style.setProperty("--shadow", '#555555');
		document.documentElement.style.setProperty("--darkShadow", '#999999');	
		
		document.documentElement.style.setProperty("--im", '#592e2e');	
		document.documentElement.style.setProperty("--cg", '#181a29');	
		document.documentElement.style.setProperty("--ml", '#1f1e16');	
		document.documentElement.style.setProperty("--sm", '#072b13');
		document.documentElement.style.setProperty("--sc", '#2b3b45');	

	}
	
},[props.theme])

	return (
	<div className={`App ${props.theme}`}> 
	<Switch>
		<Route path="/:lang/:page">
			<Popup></Popup>
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
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer,
				theme: state.themeReducer
    }
}

function adjust(color, amount) {
	if(color===undefined) return null;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}




export default connect(stateToProps)(App);
