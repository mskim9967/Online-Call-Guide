import React from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import Player from './Player.js';
 
function Nav(props) {
	const { lang  } = useParams();
	const history = useHistory();
	const location = useLocation();
	const iconColor='#909090',iconActiveColor='#f0757c';
	const handlers = useSwipeable({
			onSwipedUp: (eventData) => history.push(`${location.pathname}?song_id=${props.playerReducer.song_id}`)
	});
	
	return (
		<div className="nav" {...handlers}>
			<div className={'menu '+ (props.isPlayerActive ? "inactive": "")}>
				<div className={"tab music " + (props.nowPage === 'songs' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'songs') history.replace(`/${lang}/songs`);
					}}>
					<MusicNoteIcon style={{fontSize: 35, color:props.nowPage==='songs'?iconActiveColor:iconColor}}></MusicNoteIcon>
					<p className="label">{{ kr: '곡 선택', en: 'Songs', jp: '曲選択' }[lang]}</p>
				</div>

				<div className={"tab playlist " + (props.nowPage === 'playlist' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'playlist') history.replace(`/${lang}/playlist`);
					}}>
					<QueueMusicIcon style={{fontSize: 35, color:props.nowPage==='playlist'?iconActiveColor:iconColor}}></QueueMusicIcon>
					<p className="label">{{ kr: '리스트', en: 'Playlist', jp: 'プレイリスト' }[lang]}</p>
				</div>

				<div className={"tab search " + (props.nowPage === 'search' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'search') history.replace(`/${lang}/search`);
					}}>
					<SearchIcon style={{fontSize: 35, color:props.nowPage==='search'?iconActiveColor:iconColor}}></SearchIcon>
					<p className="label">{{ kr: '검색', en: 'Search', jp: '検索'}[lang]}</p>
				</div>

				<div className={"tab setting " + (props.nowPage === 'setting' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'setting') history.replace(`/${lang}/setting`);
					}}>
					<SettingsIcon style={{fontSize: 35, color:props.nowPage==='setting'?iconActiveColor:iconColor}}></SettingsIcon>
					<p className="label">{{kr: '설정', en: 'Setting', jp: '設定'}[lang]}</p>
				</div>
				
			</div>
			<Player></Player>
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

export default connect(stateToProps)(Nav);