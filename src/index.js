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

let playerDefault = {isActive:false, song:null, tagData: null};
function playerReducer(state = playerDefault, action) {
    if(action.type === 'active') {
        let cp = JSON.parse(JSON.stringify(state));
				cp.isActive=true;
				return cp;
    } 
		else if(action.type === 'inactive') {
        let cp = JSON.parse(JSON.stringify(state));
				cp.isActive=false;
        return cp;
    } 
		else if(action.type === 'songCardClicked') {
        let cp = JSON.parse(JSON.stringify(state));
				cp.isActive=true;
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



let store = createStore(combineReducers({playerReducer, langReducer, pageReducer}));

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


