import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.scss';
import App from './App';

import { Provider } from  'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';


function playerActiveReducer(state = false, action) {
    if(action.type === 'playerActive') {
			return true;
    } 
		else if(action.type === 'playerInactive') {
			return false;
    } 
    return state;
}

let playerDefault = {reload: false, lang:false, song_id: null, playerActive:false, playlistReload:false, playlistNum:null, pass:false};
function playerReducer(state = playerDefault, action) { 
	if(action.type === 'playerReload') {
		let cp = JSON.parse(JSON.stringify(state));
		cp.reload=!cp.reload;
		cp.song_id = action.payload.song_id;	
		return cp;
	}
	if(action.type === 'playlistReload') {
		let cp = JSON.parse(JSON.stringify(state));
		cp.playlistReload=!cp.playlistReload;
		cp.playlistNum = action.payload.playlistNum;
		return cp;
	}
	if(action.type === 'langChanged') {
		let cp = JSON.parse(JSON.stringify(state));
		cp.lang=!cp.lang;
		return cp;
	}
	return state;
}

let playlistsDefault = JSON.parse(window.localStorage.getItem("playlists"))||[];
function playlistsReducer(state = playlistsDefault, action) { 
	if(action.type === 'saveNew') {
		let cp = JSON.parse(JSON.stringify(state));
		cp = [...cp, action.payload];
		return cp;
	}
	if(action.type === 'replacePlaylist') {
		let cp = JSON.parse(JSON.stringify(state));
		cp.splice(cp.findIndex(e=>e.name===action.payload.name), 1, action.payload);
		return cp;
	}
	if(action.type === 'addToPlaylist') {
		let cp = JSON.parse(JSON.stringify(state));
		let pl = cp.find(e=>e.name===action.payload.name).data;
		action.payload.data.forEach((e)=>{if(pl.filter(ele=>ele.song_id===e.song_id).length===0) pl.push(e)});
		return cp;
	}
	if(action.type === 'deletePlaylist') {
		let cp = JSON.parse(JSON.stringify(state));
		cp = [...cp.filter((ele)=>ele.name!==action.payload)];
		return cp;
	}
	return state;
}

function langReducer(state = 'en', action) {
	if(action.type === 'setLang') return action.payload;
  return state;
}

function pageReducer(state = 'songs', action) {
    if(action.type === 'changePage') {
      return action.payload;
    } 
    return state;
}

function themeReducer(state = 'light', action) {
    if(action.type === 'darkTheme') {
			localStorage.setItem('userTheme', 'dark');
			return 'dark';
    } 
		if(action.type === 'lightTheme') {
			localStorage.setItem('userTheme', 'light');
      return 'light';
    } 
    return state;
}

function animReducer(state = 'on', action) {
    if(action.type === 'animOff') {
			localStorage.setItem('anim', 'off');
			return 'off';
    } 
		if(action.type === 'animOn') {
			localStorage.setItem('anim', 'on');
			return 'on';
    } 
		return state;
}

let store = createStore(combineReducers({playerActiveReducer, playerReducer, playlistsReducer, langReducer, pageReducer, themeReducer, animReducer}));

ReactDOM.render(
  <React.StrictMode>
	<BrowserRouter>
		 <Provider store={store}>
	  <App />
			  </Provider>
	</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


