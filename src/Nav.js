import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useParams, Route,useHistory, useLocation, Link } from 'react-router-dom';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import Player from './Player.js';

function Nav(props) {
	const { lang } = useParams();
	const history = useHistory();
	const location = useLocation();
	
	return (
		<div className="nav">
			<div className={'menu '+ (props.playerReducer.isActive ? "inactive": "")}>
				<div className={"tab music " + (props.nowPage === 1 ? "active" : "")} onClick={()=>{
					if(props.nowTab != 1) history.push(`/${lang}/songs`);
					props.dispatch({type:'changePage', payload:1});
				}}>
					<MusicNoteIcon style={{fontSize: 35, color:"#fe5245"}}></MusicNoteIcon>
					<p className="label">{
						{
							kr: '곡 선택',
							en: 'Songs',
							jp: '曲選択'
						}[lang]
					}</p>
				</div>


				<div className={"tab playlist " + (props.nowPage === 2 ? "active" : "")} onClick={()=>{
					if(props.nowTab != 2) history.push(`/${lang}/playlist`);
					props.dispatch({type:'changePage', payload:2});
				}}>
					<QueueMusicIcon style={{fontSize: 35, color:"#fe5245"}}></QueueMusicIcon>
					<p className="label">{
						{
							kr: '리스트',
							en: 'Playlist',
							jp: 'プレイリスト'
						}[lang]
					}</p>
				</div>

				<div className={"tab search " + (props.nowPage === 3 ? "active" : "")} onClick={()=>{
					if(props.nowTab != 3) history.push(`/${lang}/search`);
					props.dispatch({type:'changePage', payload:3});
				}}>
					<SearchIcon style={{fontSize: 35, color:"#fe5245"}}></SearchIcon>
					<p className="label">{
						{
							kr: '검색',
							en: 'Search',
							jp: '検索'
						}[lang]
					}</p>
				</div>


				<div className={"tab setting " + (props.nowPage === 4 ? "active" : "")} onClick={()=>{
					if(props.nowTab != 4) history.push(`/${lang}/setting`);
					props.dispatch({type:'changePage', payload:4});
				}}>
					<SettingsIcon style={{fontSize: 35, color:"#fe5245"}}></SettingsIcon>
					<p className="label">{
						{
							kr: '설정',
							en: 'Setting',
							jp: '設定'
						}[lang]
					}</p>
				</div>
			</div>


			<Player></Player>
		</div>
	)
}

function stateToProps(state) {
    return {
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer
    }
}

export default connect(stateToProps)(Nav);