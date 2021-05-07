import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.scss';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from  'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
	  'NotoSansCJK'
    ].join(','),
  },
});

function playerActiveReducer(state = false, action) {
    if(action.type === 'playerActive') {
			return true;
    } 
		else if(action.type === 'playerInactive') {
			return false;
    } 
    return state;
}


let playerDefault = {reload: false, song:null, tagData: null};
function playerReducer(state = playerDefault, action) { 
	if(action.type === 'songCardClicked') {
		let cp = JSON.parse(JSON.stringify(state));
		cp.reload=!cp.reload;
		cp.song = action.payload.song;
		cp.tagData = action.payload.tagData;
		return cp;
	}
	return state;
}

function langReducer(state = 'kr', action) {
	if(action.type === 'setLang') return action.payload;
  return state;
}

function pageReducer(state = 1, action) {
    if(action.type === 'changePage') {
      return action.payload;
    } 
    return state;
}



let store = createStore(combineReducers({playerActiveReducer, playerReducer, langReducer, pageReducer}));

ReactDOM.render(
  <React.StrictMode>
	<BrowserRouter>
	<MuiThemeProvider theme={theme}>
		 <Provider store={store}>
	  <App />
			  </Provider>
	</MuiThemeProvider>
	</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


