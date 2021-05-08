import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useParams, Route,useHistory, useLocation, Link } from 'react-router-dom';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import LanguageIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';

import { Switch } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import Player from './Player.js';

function Popup(props) {
	const { lang, page } = useParams();
	const history = useHistory();
	const location = useLocation();
	
	const [isPopupActiveded, setPopupActiveded] = useState(false);
	
	const iconColor = '#777777';
	
	// useEffect(()=>{
	// 	if(lang)
	// 		props.dispatch({type:'setLang', payload:lang});
	// }, [lang]);
	
	return (
		<div className={`popup ${props.isPlayerActive&&'inactive'}`}>
			<div className='userImgArea' onClick={()=>{setPopupActiveded(!isPopupActiveded)}}>
				{false?
					<div className='userImg'><img></img></div>
					:
					<div className='alignCenter iconArea'><PersonIcon style={{fontSize: 35, color:iconColor}}></PersonIcon></div>
				}
			</div>	
			
			<div className={`detailsArea ${!isPopupActiveded&&'inactive'}`}>
				<div className={`alignCenter loginArea`}>login하셈</div>
				<div className='alignCenter langLabel'><LanguageIcon></LanguageIcon></div>
				<div className='alignCenter langSetting'>
					<ToggleButtonGroup size='small' exclusive={true} value={lang} onChange={(event, value)=>{
						if(value) history.push(`/${value}/${page}`);
					}}>
						<ToggleButton value='kr'>한국어</ToggleButton>
						<ToggleButton value='en'>&nbsp;ENG&nbsp;</ToggleButton>
						<ToggleButton value='jp'>日本語</ToggleButton>
					</ToggleButtonGroup>
				</div>
				
				<div className='alignCenter themeLabel'><Brightness6Icon></Brightness6Icon></div>
				<div className='alignCenter themeSetting'>
					<Switch color='primary' checked={props.theme==='light'} onChange={(event)=>{
					event.target.checked?props.dispatch({type:'lightTheme'}):props.dispatch({type:'darkTheme'});		
					}}></Switch>
				</div>
				
			</div>	
			
			<div className={`bg ${!isPopupActiveded&&'inactive'}`} onTouchStart={()=>{setPopupActiveded(false)}}></div>	
		</div>
	)
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

export default connect(stateToProps)(Popup);