import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useParams, Route } from 'react-router-dom';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import Player from './Player.js';

function Nav(props) {
	const { lang } = useParams();
	
	return (
		<div className="nav">
			<div className={'menu '+ (props.playerReducer.isActive ? "inactive": "")}>
				<div className={"tab music " + (props.nowTab == 1 ? "active" : "")} onClick={()=>{
					props.setNowTab(1);
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
				<div className={"tab playlist " + (props.nowTab == 2 ? "active" : "")} onClick={()=>{
					props.setNowTab(2);
				}}>
					<PlaylistPlayIcon style={{fontSize: 35, color:"#fe5245"}}></PlaylistPlayIcon>
					<p className="label">{
						{
							kr: '리스트',
							en: 'Playlist',
							jp: 'プレイリスト'
						}[lang]
					}</p>
				</div>
				<div className={"tab search " + (props.nowTab == 3 ? "active" : "")} onClick={()=>{
					props.setNowTab(3);
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
				<div className={"tab setting " + (props.nowTab == 4 ? "active" : "")} onClick={()=>{
					props.setNowTab(4);
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
        playerReducer : state.playerReducer
    }
}

export default connect(stateToProps)(Nav);