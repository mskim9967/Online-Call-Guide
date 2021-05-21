import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import SongCardList from './SongCardList.js';
import PlaylistTab from './PlaylistTab.js';

import { BrowserRouter as Switch, useParams, Route, useLocation } from 'react-router-dom';
import queryString from 'query-string';

function Content(props){
	const { lang, page } = useParams();
	const location = useLocation();
	const { search } = useLocation();
	const { song_id } = queryString.parse(search);	

	useEffect(()=>{ 
		if(page) props.dispatch({type:'changePage', payload:page});
		
		if(song_id) 
			if(props.playerReducer.song_id!==song_id && !props.playerReducer.pass)
				props.dispatch({type:'playerReload', payload:{song_id: song_id}});
			else
				props.dispatch({type:'playerActive'});
		
		if(song_id===undefined) props.dispatch({type:'playerInactive'});
		
		props.playerReducer.pass = false;
	}, [location]);

	
	return(
		<div className={"content "}>
			<div className={"page " + (props.nowPage === 'songs' ? "active" : "")} >
				<div className={"songs"} >
					<SongCardList></SongCardList>
				</div>
			</div>
			
			<div className={"page " + (props.nowPage === 'playlist'? "active" : "")} >
				<PlaylistTab></PlaylistTab>
			</div>
			
			<div className={"page " + (props.nowPage === 'search' ? "active" : "")} >
				<div className={"search"} >
				</div>
			</div>
			
			<div className={"page " + (props.nowPage === 'setting' ? "active" : "")} >
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
				nowPage: state.pageReducer,
				playlists: state.playlistsReducer,
    }
}

export default connect(stateToProps)(Content);