import React, { useState, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Link, useHistory, useParams, Route } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

import { Button, Box } from '@material-ui/core';
import { typography } from '@material-ui/system';


import SongCard from './SongCard.js';
import SongCardList from './SongCardList.js';
import Nav from './Nav.js';

function App(props) {
	const [nowTab, setNowTab] = useState(1);
	const handlers = useSwipeable({
		onSwipedRight: (eventData) => setNowTab((nowTab-1)>0?nowTab-1:nowTab),
  		onSwipedLeft: (eventData) => setNowTab((nowTab+1)<5?nowTab+1:nowTab),
	});
	let { lang, ddd } = useParams();
	
	useEffect(()=>{ 
		props.dispatch({type:'setLang', payload:lang||'kr'});
	}, [lang, ddd]);
	
	return (
	<div className="App"> 
	<Switch>
		<Route path="/:lang">
			<div className="content">
				<div className={"page songs " + (nowTab == 1 ? "active" : "")} >
					<SongCardList></SongCardList>
				</div>
				<div className={"page playlist " + (nowTab == 2 ? "active" : "")}>
					{lang }
				</div>
				<div className={"page search " + (nowTab == 3 ? "active" : "")}>

				</div>
				<div className={"page setting " + (nowTab == 4 ? "active" : "")}>

				</div>

			</div>
			<Nav nowTab={nowTab} setNowTab={setNowTab}></Nav>
		</Route>
	</Switch>
	</div>
	);
	
	


}


function stateToProps(state) {
    return {
        playerReducer : state.playerReducer,
				lang: state.langReducer
    }
}

function adjust(color, amount) {
	if(color===undefined) return null;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}




export default connect(stateToProps)(App);
