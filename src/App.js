import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { useSwipeable } from "react-swipeable";
import { Button, Box } from '@material-ui/core';
import { typography } from '@material-ui/system';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

function App() {
	const [nowTab, setNowTab] = useState(1);
	const [isPlayerActive, setPlayerActive] = useState(false);
	const handlers = useSwipeable({
		onSwipedRight: (eventData) => setNowTab((nowTab-1)>0?nowTab-1:nowTab),
  		onSwipedLeft: (eventData) => setNowTab((nowTab+1)<5?nowTab+1:nowTab),
	});
	
	
	const songCardClick = (song)=> {
		setPlayerActive(true);
	};
	
	return (
	<div className="App" {...handlers}>
		<div className="content">
			<div className={"page music " + (nowTab == 1 ? "active" : "")} >
				<SongCardList></SongCardList>
			</div>
			<div className={"page playlist " + (nowTab == 2 ? "active" : "")}>
				
			</div>
			<div className={"page search " + (nowTab == 3 ? "active" : "")}>
				
			</div>
			<div className={"page setting " + (nowTab == 4 ? "active" : "")}>
				
			</div>

		</div>
			
		<div className="nav">
			<div className={'menu '+ (isPlayerActive ? "unActive": "")}>
				<div className={"tab music " + (nowTab == 1 ? "active" : "")} onClick={()=>{
					setNowTab(1);
				}}>
					<MusicNoteIcon style={{fontSize: 35, color:"#fe5245"}}></MusicNoteIcon>
					<p className="label">곡 선택</p>
				</div>
				<div className={"tab playlist " + (nowTab == 2 ? "active" : "")} onClick={()=>{
					setNowTab(2);
				}}>
					<PlaylistPlayIcon style={{fontSize: 35, color:"#fe5245"}}></PlaylistPlayIcon>
					<p className="label">리스트</p>
				</div>
				<div className={"tab search " + (nowTab == 3 ? "active" : "")} onClick={()=>{
					setNowTab(3);
				}}>
					<SearchIcon style={{fontSize: 35, color:"#fe5245"}}></SearchIcon>
					<p className="label">검색</p>
				</div>
				<div className={"tab setting " + (nowTab == 4 ? "active" : "")} onClick={()=>{
					setNowTab(4);
				}}>
					<SettingsIcon style={{fontSize: 35, color:"#fe5245"}}></SettingsIcon>
					<p className="label">설정</p>
				</div>
			</div>
			
			<div className={"player " + (isPlayerActive ? "active" : "")}>
				<div className="lyricPage"></div>
				<div className='coverImg' onClick={()=>{
					setPlayerActive(!isPlayerActive);
				}
			}></div>
			</div>
		</div>
	</div>
	);
}

function Tag(props) {
	//document.documentElement.style.setProperty('--tagBgColor', props.color);
	var lightenColor = adjust(props.color, 90);
	
	//name={idolCV.idol_name_kr} color={idolCV.idol_color
	return (
		<div className="tag" style={{backgroundImage: `linear-gradient(110deg, `+props.color+`, 30%,`+lightenColor+`)`}}>
			<div className='image'>
				<img src={"/api/img/"+props.classify+"/"+props.id}></img>
			</div>
			<div className='name'>
				{props.name}
			</div>
		</div>
	)
}

function SongCardList(props) {
	const [songs, setSongs] = useState([]);
	
	useEffect(()=>{ 
		axios.get('api/song')
		.then((res)=>{setSongs(res.data.rows)}) 
		.catch(()=>{});
	}, []);
	
	if (songs === null)
  	return null;
	
	return (
		<div className='songCardList'>
			{ 
				songs.map((song, idx)=>{
					return (
						<SongCard key={idx} song={song} onClick={songCardClick(song)}> </SongCard>
					)
				})
			}
		</div>

	)
}

function SongCard(props) {
	const [tagData, setTagData] = useState([]);
	const isSongUnit = props.song.song_is_unit.data[0];
	
	useEffect(()=>{ 
		isSongUnit ?
			axios.get('api/song_unit?song_id=' + props.song.song_id)
			.then((res)=>{setTagData(res.data.row);}) 
			.catch(()=>{})
		:
			axios.get('api/song_idol_cv?song_id=' + props.song.song_id)
			.then((res)=>{setTagData(res.data.rows);}) 
			.catch(()=>{});
	}, []);
	
	return (
		<div className={"songCard pid" + props.song.production_id}>
			<div className="coverImgArea">
				<div className="coverImg">
					<img src={"/api/img/album/"+props.song.album_id}></img>
				</div>
			</div>
			<div className="title">{props.song.song_title_kr}</div>
			
			<div className='tagsArea'>
				{
					!isSongUnit ?
						tagData.map((idolCV, idx)=>{
							return (
								<>
									<Tag key={idx*2} classify='idol' id={idolCV.idol_id} name={idolCV.idol_name_kr} color={idolCV.idol_color}></Tag>
									<Tag key={idx*2+1} classify='cv' id={idolCV.cv_id} name={idolCV.cv_name_kr} color={idolCV.idol_color}></Tag>
								</>
							)
						})
					:
						<Tag classify='unit' id={tagData.unit_id} name={tagData.unit_name_kr} color={tagData.unit_color}></Tag>
				}
				
			</div>
		</div>
	)
}




function adjust(color, amount) {
	if(color===undefined) return null;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}




export default App;
