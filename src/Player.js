import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useParams, Route } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

const audio = new Audio();

document.documentElement.style.setProperty("--idc", '#ff0000');
function Player(props) {
	const { lang } = useParams();
	const [isAudioPaused, setAudioPaused] = useState(true);
	const [isPlaylistActive, setPlaylistActive] = useState(false);
	const [unitIdols, setUnitIdols] = useState([]);
	const [isSwiped, setSwiped] = useState(false);
	const [audioProgress, setAudioProgress] = useState(0);
	const handlers = useSwipeable({
			onSwipedRight: (eventData) => setPlaylistActive(false),
  		onSwipedLeft: (eventData) => setPlaylistActive(true)
	});
	const [cp, setCp] = useState(0);
	const audioHandlers = useSwipeable({
		onSwipeStart: (e)=>{audio.pause();setCp(audioProgress);setAudioPaused(true)},
		onSwiping: (e)=>{setAudioProgress(cp+e.deltaX/6)},
		onSwiped: (e)=>{audio.currentTime=audioProgress/100*audio.duration;playPause()}
	});
	var buttonColor= '#eeeeee', color='#ffffff';	
	
	function playPause(){
		if(audio.paused) {			
			audio.play();
		}
		else {
			audio.pause();
		}
		setAudioPaused(audio.paused);
	}
	
	useEffect(()=>{
		let timerID;
		if(!isAudioPaused)
			timerID = setInterval(()=>setAudioProgress(parseFloat(audio.currentTime*1000)/(audio.duration*1000)*100),400);
		return ()=>{
			clearInterval(timerID);
		}
	},[isAudioPaused]);
	
	useEffect(()=>{
		if(props.playerReducer.tagData?.length === 1)
		 color=hex_setSat(props.playerReducer.song?.song_is_unit.data[0]?props.playerReducer.tagData[0].unit_shown_color:props.playerReducer.tagData[0].idol_shown_color, 0.13);
		else 
			color='#ffffff';
		
		if(props.playerReducer.song?.song_is_unit.data[0])
				axios.get(`/api/song_unit_idol_cv/search?song_id=${props.playerReducer.song.song_id}`)
				.then((res)=>{setUnitIdols(res.data.rows)}) 
				.catch(()=>{});

		document.documentElement.style.setProperty("--flc", color);
		audio.src = `/api/audio/${props.playerReducer.song?.song_id}`;
		audio.addEventListener('canplaythrough',()=>{
			audio.play();
			setAudioPaused(false);
		}, false);
		setAudioProgress(0);
		return ()=>{
			audio.pause();
			setAudioPaused(true);
		}
	},[props.playerReducer.reload]);
	

	return (
		<>
		<div className={`${!props.playerReducer.song&&'init'} coverImg ${props.isPlayerActive ? "active" : ""}`} onClick={()=>{props.isPlayerActive?props.dispatch({type:'playerInactive'}):props.dispatch({type:'playerActive'})}}>
			<div className='dot'></div>
			{props.playerReducer.song!==null && <img src={"/api/img/album/"+props.playerReducer.song.album_id}></img>}
		</div>
		
		<div className={"playerPage " + (props.isPlayerActive ? "active" : "")} >
				{
					(props.playerReducer.song?.song_is_unit.data[0] || props.playerReducer.tagData?.length>1) &&
						<div className="infoArea"> {
							eval(props.playerReducer.song.song_is_unit.data[0]?unitIdols:props.playerReducer.tagData).map((idol, i)=>{
								return(<div className={`idolImgArea ${false?'active':''}`} ><img src={"/api/img/idol/"+idol.idol_id}></img></div>)
						})} </div>

				}
			<div className="callGuideArea" {...handlers}>
	
				<div className={`lyricArea ${isPlaylistActive&&'inactive'}`}>
					<div className="text">
						<Dddd></Dddd>
					</div>
				</div>
				<div className={`playlistArea ${!isPlaylistActive&&'inactive'}`}>
					<p>playlistArrddddddddddddddddddddr</p>
				</div>
				<div className='closeIconArea'><ExpandMoreIcon style={{fontSize: 30, color:buttonColor}} onClick={()=>{props.dispatch({type:'playerInactive'})}}></ExpandMoreIcon></div>
				<div className='pageChangeIconArea'>{
					isPlaylistActive?	
						<RecordVoiceOverIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>{setPlaylistActive(false)}}></RecordVoiceOverIcon>
					:
						<PlaylistPlayIcon style={{fontSize: 35, color:buttonColor}} onClick={()=>{setPlaylistActive(true)}}></PlaylistPlayIcon>
				}</div>

			</div>
			
			<div className='playerArea'  {...audioHandlers}>
				<div className='progressBarArea'>
					<div className='progressBar' style={{width: audioProgress+'%'}}></div>
				</div>
				<div className='coverImgArea'></div>
				
				<div className='titleArea'><span>{eval('props.playerReducer.song?.song_title_'+lang)||props.playerReducer.song?.song_title_en}</span></div>
				<div className='artistArea'>{
					props.playerReducer.song?.song_is_unit.data[0] ?
						props.playerReducer.tagData?.map((unit, i)=>{
							return(<span>{(i?", ":"")+(eval('unit.unit_name_'+lang)||unit.unit_name_en)}</span>)
						})
					:		
						props.playerReducer.tagData?.map((idolCV, i)=>{
							if(props.playerReducer.tagData.length === 1)
								return(<span>{(eval('idolCV.idol_name_'+lang)||idolCV.idol_name_en) + (' (CV.'+(eval('idolCV.cv_name_'+lang)||idolCV.cv_name_en) +')')}</span>)
							else return(<span>{(i?", ":"")+(eval('idolCV.idol_name_'+lang)||idolCV.idol_name_en)}</span>)
						})
				}</div>
				<div className='buttonsArea'>
					<SkipPreviousIcon style={{fontSize: 25, color:buttonColor}}></SkipPreviousIcon>
					{
						isAudioPaused?
						<PlayArrowIcon style={{fontSize: 35, color:buttonColor}} onClick={playPause}></PlayArrowIcon>
						:
						<PauseIcon style={{fontSize: 35, color:buttonColor}} onClick={playPause}></PauseIcon>
					}
					<SkipNextIcon style={{fontSize: 25, color:buttonColor}}></SkipNextIcon>
				</div>
				
			</div>
		</div>
		</>
	)
}

function adjust(color, amount) {
	if(color===undefined) return null;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function getBrightness(c){
	c = c.substring(1); // strip # 
	var rgb = parseInt(c, 16); // convert rrggbb to decimal 
	var r = (rgb >> 16) & 0xff; // extract red 
	var g = (rgb >> 8) & 0xff; // extract green 
	var b = (rgb >> 0) & 0xff; // extract blue 
	return (0.2126 * r + 0.7152 * g + 0.0722 * b); // per ITU-R BT.709 0~255 
}

function hexToHSL(H) { // Convert hex to RGB first 
	let r = 0, g = 0, b = 0; if (H.length == 4) { r = "0x" + H[1] + H[1]; g = "0x" + H[2] + H[2]; b = "0x" + H[3] + H[3]; } else if (H.length == 7) { r = "0x" + H[1] + H[2]; g = "0x" + H[3] + H[4]; b = "0x" + H[5] + H[6]; } // Then to HSL 
	r /= 255; g /= 255; b /= 255; let cmin = Math.min(r,g,b), cmax = Math.max(r,g,b), delta = cmax - cmin, h = 0, s = 0, l = 0; if (delta == 0) h = 0; else if (cmax == r) h = ((g - b) / delta) % 6; else if (cmax == g) h = (b - r) / delta + 2; else h = (r - g) / delta + 4; h = Math.round(h * 60); if (h < 0) h += 360; l = (cmax + cmin) / 2; s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); s = +(s * 100).toFixed(1); l = +(l * 100).toFixed(1); return "hsl(" + h + "," + s + "%," + l + "%)";
}
function hex_setSat(H, sat) { // Convert hex to RGB first 
	let r = 0, g = 0, b = 0; if (H.length == 4) { r = "0x" + H[1] + H[1]; g = "0x" + H[2] + H[2]; b = "0x" + H[3] + H[3]; } else if (H.length == 7) { r = "0x" + H[1] + H[2]; g = "0x" + H[3] + H[4]; b = "0x" + H[5] + H[6]; } // Then to HSL 
	let v=Math.max(r,g,b), c=v-Math.min(r,g,b); let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); h=60*(h<0?h+6:h); let s=sat;
	let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0); return `rgb(${f(5)},${f(3)},${f(1)})`; 
}

function Dddd() {
	var ssss=[];
	for(var i=0;i<100;i++)
			ssss.push('가사입니다다다다다다다다다');
	return (
		<div>
			{ssss.map((e)=>{
				return <div>{e}<br/></div>
			})}
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

export default connect(stateToProps)(Player);