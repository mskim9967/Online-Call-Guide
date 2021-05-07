import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import SongCardList from './SongCardList.js';
import SongCard from './SongCard.js';
import SongSearch from './SongSearch.js';
import { BrowserRouter as Router, Switch, Link, useHistory, useParams, Route, Redirect, useLocation } from 'react-router-dom';

function Content(props){
	const location = useLocation();
	const { lang, page } = useParams();
		
	useEffect(()=>{ 
		if(page === 'song') props.dispatch({type:'changePage', payload:1});
		else if(page === 'playlist') props.dispatch({type:'changePage', payload:2});
		else if(page === 'search') props.dispatch({type:'changePage', payload:3});
		else if(page === 'setting') props.dispatch({type:'changePage', payload:4});
	}, []);
	
	return(
		<div className={"content "}>
			<div className={"page " + (props.nowPage == 1 ? "active" : "")} >
				<div className={"songs "+ (props.isPlayerActive ? "scrollLock " : "") } >
					<SongCardList></SongCardList>
				</div>
			</div>
			
			<div className={"page " + (props.nowPage == 2 ? "active" : "")} >
				<div className={"playlist"} >
			
				</div>
			</div>
			
			<div className={"page " + (props.nowPage == 3 ? "active" : "")} >
				<div className={"search"} >
				</div>
			</div>
			
			<div className={"page " + (props.nowPage == 4 ? "active" : "")} >
				<div className={"setting"} >
				</div>
			</div>
			
		<Switch>
			<Route path={'/:lang/:page'}>
				
			</Route>
		</Switch>
		</div>
	)
}

function stateToProps(state) {
    return {
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer
    }
}

export default connect(stateToProps)(Content);