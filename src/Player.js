import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";
import queryString from 'query-string';
import { Element, scroller } from "react-scroll";

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClearIcon from '@material-ui/icons/Clear';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import SaveIcon from '@material-ui/icons/Save';

import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
const WhiteCheckbox = withStyles({ root: { color: grey[700], margin: 'none','&$checked': { color: grey[500], }, }, checked: {}, })((props) => <Checkbox disableGutters color="default" size='small' margin='0' {...props} />);

const audio = new Audio();

function Player(props) {
	
	const location = useLocation();
	const history = useHistory();
	
	const { lang } = useParams();
	const [isAudioPaused, setAudioPaused] = useState(true);
	const [isPlaylistActive, setPlaylistActive] = useState(false);
	const [isShuffleActive, setShuffleActive] = useState(false);
	const [repeatState, setRepeatState] = useState('repeat');
	const [needActive, setNeedActive] = useState(false);
	
	const [songData, setSongData] = useState([]);
	
	const [playlist, setPlaylist] = useState([]);
	const [nowPlay, setNowPlay] = useState(-1);
	const [delay, setDelay] = useState(0.0);
	const [isPlaylistModalActive, setPlaylistModalActive] = useState(false);
	const [isSecondActive, setSecondActive] = useState(null);
	const [loadData, loadDataTrigger] = useState(false);	
	
	const pageRef = useRef(null);
	const inputRef = useRef(null);
	const progressBarAreaRef = useRef(null);
	
	const { search } = useLocation()
	const { song_id } = queryString.parse(search);
	
	const [showLyricMean, setShowLyricMean] = useState(true);
	const [showLyricLex, setShowLyricLex] = useState(true);
	const [showCallLex, setShowCallLex] = useState(true);
	
	const [fanlightColor,setFanlightColor] = useState('#ffffff');
	const [lyricCallData, setLyricCallData] = useState([]);
	const [highlight, setHighlight] = useState(false);
	const [beat, setBeat] = useState(0);
	const [activeBlock, setActiveBlock] = useState(0);
	const [audioProgress, setAudioProgress] = useState(0);
	const [beatLen, setBeatLen] = useState(0.0);
	const [part, setPart] = useState([]);
	const [scrollLock, setScrollLock] = useState(true);
	const handlers = useSwipeable({
			onSwipedRight: (eventData) => setPlaylistActive(false),
  		onSwipedLeft: (eventData) => setPlaylistActive(true),
			onSwipeStart: (eventData) => {
				if(eventData.dir==='Up'||eventData.dir==='Down') setScrollLock(false);
				if(eventData.dir==='Down') 
					if(pageRef.current.scrollTop===0) history.replace(`${location.pathname}`);
			},
	});
	const playlistHandlers = useSwipeable({
			onSwipeStart: (eventData) => {
				if(eventData.dir==='Down') 
					history.replace(`${location.pathname}`);
			},
	});
	const [cp, setCp] = useState(0);
	const audioHandlers = useSwipeable({
		onSwipeStart: (e)=>{pause();setCp(audioProgress);},
		onSwiping: (e)=>{setAudioProgress(cp+e.deltaX/6)},
		onSwiped: (e)=>{if(audio.currentTime) audio.currentTime=audioProgress/100*audio.duration; setHighlight(false); play()}
	});
	var buttonColor= '#eeeeee', themeColor='#ffffff';
	var modalTimer, focusTimerID;
	
	function play(){
		audio.play();
		setAudioPaused(false);
	}
	
	function pause(){
		audio.pause();
		setAudioPaused(true);
	}

	useEffect(()=>{
		return ()=>{clearTimeout(modalTimer);clearTimeout(focusTimerID);}
	},[]);

	useEffect(()=>{
		document.documentElement.style.setProperty("--flc", highlight?'#ffa000':fanlightColor);
	},[highlight]);
	
	useEffect(()=>{
		document.documentElement.style.setProperty("--flc", fanlightColor);
		themeColor=hex_setSat(fanlightColor, 0.13);
		document.documentElement.style.setProperty("--tc", themeColor);
	},[fanlightColor]);
	
	useEffect(()=>{
		if(!song_id || !isPlaylistModalActive) {
			setPlaylistModalActive(false);
			setSecondActive(null);
			inputRef.current.value='';
	 	}
	},[song_id, isPlaylistModalActive]);
	
	useEffect(()=>{
		if(isSecondActive==='new') {
			focusTimerID = setTimeout(()=>{
				inputRef.current.focus();
			},300);
	 	}
	},[isSecondActive]);
	
	useEffect(()=>{
		window.localStorage.setItem("playlists", JSON.stringify(props.playlists));
	},[props.playlists]);
	
	
	useEffect(()=>{
		let timerID, timer2ID;
		if(!isAudioPaused && props.isPlayerActive) {
			timerID = setInterval(()=>{
				setBeat(Math.floor((audio.currentTime*1000+delay)/beatLen));
			},130);
			timer2ID = setInterval(()=>{
				setAudioProgress(parseFloat(audio.currentTime*1000)/(audio.duration*1000)*100);
			},1000);
		}
		else {
			clearInterval(timerID);
			clearInterval(timer2ID);
		}
		return ()=>{
			clearInterval(timerID);
			clearInterval(timer2ID);
		}											
	},[isAudioPaused, props.isPlayerActive]);

	useEffect(()=>{
		let temp = new Array(2000).fill([]);
		lyricCallData.map((block)=>{
			block.lyricLex?.map((lyric)=>{
				for(let i = 0; i < lyric.beats; i++)
					temp[lyric.start + i] = [...lyric.part];
			});
		});
		setPart(temp);
	},[lyricCallData]);
	
	useEffect(()=>{
		setActiveBlock(lyricCallData.findIndex(e=>e.lineStartBeat>beat+2)-1);
		if(lyricCallData[activeBlock]?.highlightEnd === beat) setHighlight(false);
		else if(lyricCallData[activeBlock]?.highlightStart === beat) setHighlight(true);
	}, [beat]);

	useEffect(()=>{
		if(scrollLock)
			document.querySelector('.block.active')?.scrollIntoView({ behavior:'smooth', block:'center'});
		// scroller.scrollTo('ele'+activeBlock, {
		// 	duration:1000, 
		// 	smooth: true
		// });
		// scroll.scrollToBottom();
	}, [activeBlock, scrollLock, lang]);

	function getSongData(link){
		return axios.get(`/api/player_data_view?song_id=${link}`);
	}
	function getLyricCallData(link){
		return axios.get(`/api/lyric_call/${lang}/${link}`);
	}
	useEffect(()=>{	
		if(props.playerReducer.song_id){////////////////////////////////////////////////////////////////////
				let songOrder = playlist.findIndex((ele)=>ele.song_id==props.playerReducer.song_id); 
				if(songOrder>=0) {
					setNowPlay(songOrder);
				}
				else {
					setNowPlay(playlist.length);
					setPlaylist([...playlist, {song_id:props.playerReducer.song_id, needUpdate: true}]);
				}
				setNeedActive(true);
				loadDataTrigger(!loadData);
		}
	},[props.playerReducer.reload]);
	
	
	useEffect(()=>{	
		if(props.playerReducer.playlistNum!==null) {
			setNowPlay(0);
			setPlaylist([...(props.playlists[props.playerReducer.playlistNum].data)]);
			setNeedActive(true);
			setPlaylistActive(true);
			loadDataTrigger(!loadData);
		}
	},[props.playerReducer.playlistReload]);
	
	useEffect(()=>{
		var isPause = audio.paused;
		if(nowPlay!==-1)			
			axios.all([getSongData(playlist[nowPlay].song_id), getLyricCallData(playlist[nowPlay].song_id)]).then(axios.spread((res1, res2)=>{
				setHighlight(false);
				setBeat(0);
				setActiveBlock(0);
				setAudioProgress(0);
				setPart([0]);
				setScrollLock(true);
				setLyricCallData([]);
				
				if(playlist[nowPlay].needUpdate) setPlaylist([...playlist.slice(0, playlist.length-1), res1.data.rows[0]]);
				setSongData(res1.data.rows);
				setBeatLen(60000.0 / res1.data.rows[0].song_bpm);
				if(res1.data.rows[0].song_delay !== null) setDelay(res1.data.rows[0].song_delay);
				
				if(res1.data.rows[0].song_color_type === 0) setFanlightColor(res1.data.rows[0].idol_shown_color);
				else if(res1.data.rows[0].song_color_type === 1) setFanlightColor(res1.data.rows[0].unit_shown_color);
				else if(res1.data.rows[0].song_color_type === 2) setFanlightColor(res1.data.rows[0].song_fixed_color);
				
				props.playerReducer.pass=true;
				history.replace(`${location.pathname}?song_id=${res1.data.rows[0].song_id}`);
				
				setLyricCallData(res2.data);	
				if(needActive){ 
					props.dispatch({type:'playerActive'}); 
					isPause=false;
				}
				
				setNeedActive(false);
				audio.src = `/api/audio/${res1.data.rows[0].song_id}`;
				 
				audio.addEventListener('canplaythrough',()=>{
					play();
				}, false);
			})).catch();
		return ()=>{
			pause();
		}
	},[loadData]);

	audio.onended=()=>{
		if(repeatState==='noRepeat') {
			pause();
		}	
		else if(repeatState==='repeatOne') {
			audio.currentTime=0;
			play();
		}
		else {
			if(isShuffleActive) {
				var temp=parseInt(Math.random()*playlist.length);
				while(temp===nowPlay && playlist.length!==1) temp=parseInt(Math.random()*playlist.length);
				setNowPlay(temp);
			}
			else setNowPlay((nowPlay+1)%playlist.length); 
			loadDataTrigger(!loadData);
		}
 	};
	
	useEffect(()=>{
		setLyricCallData([]);
		if(songData.length)
			axios.get(`/api/lyric_call/${lang}/${songData[0].song_id}`)
			.then((res)=>{
			 	setLyricCallData(res.data);
			 }) 
			.catch(()=>{});
	},[lang]);
	
	function LyricCall() {
		return (<>{
			
		}</>)
	}
	
	return (
		<>
		<div className={`${!songData.length&&'init'} coverImg ${props.isPlayerActive ? "active" : ""}`} onClick={()=>{
			if(props.isPlayerActive){
				history.replace(`${location.pathname}`);
			} else{
				history.push(`${location.pathname}?song_id=${props.playerReducer.song_id}`);
			}
		}}>
			<div className='dot'></div>
			{songData.length && <img src={"/api/img/album/"+songData[0].album_id}></img>}
		</div>
		
		<div className={`playlistModal alignCenter ${!isPlaylistModalActive&&'inactive'}`}>
			<div className={`bg ${!isPlaylistModalActive&&'inactive'}`} onTouchStart={()=>{modalTimer=setTimeout(()=>setSecondActive(null),700);setPlaylistModalActive(false)}}></div>	
			<div className={`modalArea  ${isSecondActive!==null&&isSecondActive}`}>
				<div className={`first alignCenter ${isSecondActive&&'inactive'}`}>
					<div className='new' onClick={()=>setSecondActive('new')}>{{ kr: '??? ????????????????????? ??????', en: 'Save new playlist', jp: '??????????????????????????????????????????' }[lang]}</div>
					<div className='change' onClick={()=>setSecondActive('change')}>{{ kr: '?????? ????????????????????? ??????', en: 'Replace with existing playlist', jp: '????????????????????????????????????' }[lang]}</div>
					<div className='add' onClick={()=>setSecondActive('add')}>{{ kr: '?????? ????????????????????? ??????', en: 'Add to existing playlist', jp: '????????????????????????????????????' }[lang]}</div>
				</div>
				<div className={`second alignCenter ${isSecondActive===null?'inactive':isSecondActive}`}>
					<div className={`new ${isSecondActive==='new'?'active':'inactive'}`}>
						<input className="newPlaylistInput" ref={inputRef} type="text" name="" placeholder={{ kr: '??? ?????????????????? ??????', en: 'New playlist name', jp: '????????????????????????????????????' }[lang]}/>
						<div className={`save alignCenter`} onClick={()=>{
							if(!inputRef.current.value.trim().length) {
								 alert({ kr: '?????????????????? ????????? ???????????????!', en: 'Please enter a playlist name!', jp: '??????????????????????????????????????????????????????!' }[lang]);
								inputRef.current.value='';
							}
							else if(props.playlists.findIndex(e=>e.name==inputRef.current.value)===-1) {
								setPlaylistModalActive(false);
								props.dispatch({type:'saveNew', payload:{name:inputRef.current.value, data: [...playlist]}});
								history.replace(`/${lang}/playlist`);
							}
							else {
								alert({ kr: '?????????????????? ????????? ???????????????!', en: 'Duplicate playlist name!', jp: '?????????????????????????????????????????????!' }[lang]);
								inputRef.current.value='';
							}
						}}>{{ kr: '??????', en: 'Save', jp: '??????' }[lang]}</div>
					</div>
					
					<div className={`change add ${(isSecondActive==='change' || isSecondActive==='add') ?'active':'inactive'}`}>
					{
						props.playlists.map((pl, idx)=>{
							return (<>
							<div className={`playlist`} onClick={()=>{
								setPlaylistModalActive(false);
								if(isSecondActive==='change') props.dispatch({type:'replacePlaylist', payload:{name:pl.name, data: [...playlist]}});
								else props.dispatch({type:'addToPlaylist', payload:{name:pl.name, data: [...playlist]}});
								history.replace(`/${lang}/playlist`);
							}}>
								<div className={`title`}><span>{pl.name}</span></div>
								<div className={`songCnt`}><span>{pl.data.length+{kr: '???', en: ' songs', jp: '???'}[lang]}</span></div>
							</div>
							</>)
						})		
					}
					</div>
				</div>
			</div>
		</div>
		

		
		{songData.length&&<>		
		<div className={`playerPage ${props.isPlayerActive && "active"}`}>
			{
				<div className={`infoArea ${(songData.length===1)&&'inactive'}`}>{
					songData.map((idol, i)=>{
						return(
							<div className={`idolImgArea ${(part[beat]&&((part[beat][0]===9)||(part[beat].includes(i+1))))?'active':''}`}
								style={{boxShadow: (part[beat]&&((part[beat][0]===9)||(part[beat].includes(i+1))))?`0 0 8px 2px ${idol.idol_shown_color}`:''}}>
								<div className='shadow'><img src={"/api/img/idol/"+idol.idol_id}></img></div>
							</div>
						)
					}
				)}</div>
			}

		<div className={`callGuideArea ${highlight ? "highlight":"highlightEnd"}`} {...handlers}>
			<div className={`lyricArea ${isPlaylistActive&&'inactive'}`} >
				<div className='iconsArea'>
					<div className='scrollLockIconArea'>{
						scrollLock?	
							<LockIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>{setScrollLock(false)}}></LockIcon>
						:
							<LockOpenIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>{setScrollLock(true)}}></LockOpenIcon>
					}</div>

					<div className='checkBoxesArea'>
						
						<WhiteCheckbox defaultChecked fontSize="small" color="default" onChange={(event)=>{
							event.target.checked?setShowLyricMean(true):setShowLyricMean(false);		
						}}></WhiteCheckbox>
						<div className='label'>{{ kr: '??????', en: 'Lyrics', jp: '??????' }[lang]}</div>

						<WhiteCheckbox defaultChecked fontSize="small" color="default" onChange={(event)=>{
							event.target.checked?setShowLyricLex(true):setShowLyricLex(false);		
						}}></WhiteCheckbox>
						<div className='label'>{{ kr: '??????', en: 'Romanized', jp: '??????' }[lang]}</div>

						<WhiteCheckbox defaultChecked fontSize="small" color="default" onChange={(event)=>{
							event.target.checked?setShowCallLex(true):setShowCallLex(false);		
						}}></WhiteCheckbox>
						<div className='label'>{{ kr: '???', en: 'Call', jp: '?????????' }[lang]}</div>
					</div>
				</div>

				<div className="text" ref={pageRef}>{
					lyricCallData.length!==0?
						lyricCallData.map((block, idx)=>{
							return (
								<div className={`block ${idx===activeBlock&&'active'}`}>
									<Element name={'ele'+idx}>
										{block.lyricMean&&<div className={`lyricMeanLine ${(idx===activeBlock)&&'active'} ${!showLyricMean&&'disable'} ${!showLyricLex&&'moveTop'}`}> <span className='lyricMean'>{block.lyricMean}</span></div>}
										{
											block.lyricLex&&<div className={`lyricLexLine ${!showLyricLex&&'disable'}`}>{ block.lyricLex?.map((lyric, id)=>{
												return( <span className={`lyricLex ${lyric.start<=beat&&lyric.start+lyric.beats>beat&&'active'}`} onClick={()=>{audio.currentTime=lyric.start*beatLen/1000.0; setHighlight(false);}}>{lyric.text}</span>)
											})}</div>
										}
										{
											block.callLex&&<div className={`callLexLine ${!showCallLex&&'disable'}`}>{block.callLex?.map((call, id)=>{
												return( <span className={`call ${call.start<=beat&&call.start+call.beats>beat&&'active'}`} onClick={()=>{audio.currentTime=call.start*beatLen/1000.0; setHighlight(false);}}>{call.text}</span>)
											})}</div>
										}
										{
											block.behavior&&<div className='lyricLexLine'>{block.behavior?.map((behavior, id)=>{
												return( <span className={`behavior ${behavior.start<=beat&&behavior.start+behavior.beats>beat&&'active'}`}>{behavior.text}</span>)
											})}</div>
										}
									</Element>
								</div>
							)
						})
					:
						<div className='alert'>{
							{
								kr: '????????? ?????? ???????????? ???????????????',
								en: 'Lyric is not uploaded yet :(',
								jp: '?????????????????????????????????????????? :('
							}[lang]
						}</div>
					}</div>
				</div>
				
				<div className={`playlistArea ${!isPlaylistActive&&'inactive'}`} {...playlistHandlers} >
					
					<div className='iconsArea'>
					<div className='shuffleIconArea'>{
						isShuffleActive?	
							<ShuffleIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>{setShuffleActive(false)}}></ShuffleIcon>
						:
							<ShuffleIcon style={{fontSize: 25, color:'#444444'}} onClick={()=>{setShuffleActive(true)}}></ShuffleIcon>
					}</div>

					<div className='repeatIconArea'>{
					{
						noRepeat: <RepeatIcon style={{fontSize: 25, color:'#444444'}} onClick={()=>setRepeatState('repeat')}></RepeatIcon>,
						repeat: <RepeatIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>setRepeatState('repeatOne')}></RepeatIcon>,
						repeatOne: <RepeatOneIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>setRepeatState('noRepeat')}></RepeatOneIcon>
					}[repeatState]}</div>
				</div>

					<div className='labelArea'>{{
						kr: '??????????????????',
						en: 'Playlist',
						jp: '??????????????????'
					}[lang]}
						<div className='saveIconArea'>
							<SaveIcon style={{fontSize: 30, color:buttonColor}} onClick={()=>setPlaylistModalActive(true)}></SaveIcon>
						</div>
					</div>

					
					<div className='songsArea'>
					{
						playlist.map((song, i)=>{ return(
							<div className={`songArea ${i===nowPlay&&'active'}`} onClick={(e)=>{setNowPlay(i);loadDataTrigger(!loadData);}}>
								<div className={`coverArea`}>
									<div className="cover">
										<img src={"/api/img/album/"+song.album_id}></img>
									</div>
								</div>
								<div className={`titleArea`}>
									<span>{(eval('song.song_title_'+lang)||song.song_title_en)}</span>
								</div>
								<div className={`iconsArea`}>
									<div className={`clearIconArea alignCenter`}><IconButton size='small' onClick={(e)=>{
										e.stopPropagation();
										e.nativeEvent.stopImmediatePropagation();
										if(playlist.length!==1) {
											let temp=[...playlist];
											temp.splice(i, 1);
											setPlaylist([...temp]);
											if(nowPlay>=i) { 
												if(nowPlay===0 && i===0) setNowPlay(0);
 												else setNowPlay(nowPlay-1);
												if(nowPlay===i) loadDataTrigger(!loadData);
											}
										}
									}}><ClearIcon style={{color:'#eeeeee'}}></ClearIcon></IconButton></div>
									<div className={`upIconArea alignCenter`} onClick={(e)=>{
										e.stopPropagation();
										e.nativeEvent.stopImmediatePropagation();
										if(i!==0) {
											if(i===nowPlay) setNowPlay(nowPlay-1);
											else if(i===nowPlay+1) setNowPlay(nowPlay+1);
											let temp = [...playlist];
											[temp[i], temp[i-1]]=[temp[i-1], temp[i]];
											setPlaylist([...temp]);
										}
									}} ><IconButton size='small'><ArrowDropUpIcon style={{color:'#eeeeee'}} fontSize='large'></ArrowDropUpIcon></IconButton></div>
									<div className={`downIconArea alignCenter`}><IconButton size='small' onClick={(e)=>{
										e.stopPropagation();
										e.nativeEvent.stopImmediatePropagation();
										if(i!==playlist.length-1) {
											if(i===nowPlay) setNowPlay(nowPlay+1);
											else if(i===nowPlay-1) setNowPlay(nowPlay-1);
											let temp = [...playlist];
											[temp[i+1], temp[i]]=[temp[i], temp[i+1]];
											setPlaylist([...temp]);
										}
									}} ><ArrowDropDownIcon style={{color:'#eeeeee'}} fontSize='large'></ArrowDropDownIcon></IconButton></div>
								</div>
							</div>
						)})
					}
					</div>
				</div>
			
				<div className={`closeIconArea ${(songData[0].song_type===0)&&'solo'}`}><ExpandMoreIcon style={{fontSize: 30, color:buttonColor}} onClick={()=>{ history.replace(`${location.pathname}`);}}></ExpandMoreIcon></div>
				
				<div className='pageChangeIconArea'>{
					isPlaylistActive?	
						<MenuBookIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>{setPlaylistActive(false)}}></MenuBookIcon>
					:
						<PlaylistPlayIcon style={{fontSize: 30, color:buttonColor}} onClick={()=>{setPlaylistActive(true)}}></PlaylistPlayIcon>
				}</div>
				


			</div>
			
			<div className='playerArea'  {...audioHandlers}>
				<div className='progressBarArea' ref={progressBarAreaRef} onClick={(e)=>{console.log(progressBarAreaRef.current.offsetWidth+" " +e.clientX); setAudioProgress(e.clientX/progressBarAreaRef.current.offsetWidth*100);
audio.currentTime=e.clientX/progressBarAreaRef.current.offsetWidth*audio.duration; setHighlight(false); play()}}>
					<div className='progressBar' style={{width: audioProgress+'%'}}></div>
				</div>
				
				<div className='coverImgArea'></div>
				
				<div className='titleArea'><span>{(eval('songData[0].song_title_'+lang)||songData[0].song_title_en)}</span></div>
				
				<div className='artistArea'>{
					(songData[0].song_type===1 || songData[0].song_type===3) ?
						<span>{(eval('songData[0].unit_name_'+lang)||songData[0].unit_name_en)}</span>
					:		
						songData.map((idolCV, i)=>{
							if(songData.length === 1)
								return(<span>{(eval('idolCV.idol_name_'+lang)||idolCV.idol_name_en) + (' (CV.'+(eval('idolCV.cv_name_'+lang)||idolCV.cv_name_en) +')')}</span>)
							else return(<span>{(i?", ":"")+(eval('idolCV.idol_name_'+lang)||idolCV.idol_name_en)}</span>)
						})
				}</div>
				
				<div className='buttonsArea'>
					<SkipPreviousIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>{
							if(audio.currentTime>3) audio.currentTime=0;
							else {
								if(isShuffleActive) {
									var temp=parseInt(Math.random()*playlist.length);
									while(temp===nowPlay && playlist.length!==1) temp=parseInt(Math.random()*playlist.length);
									setNowPlay(temp);
									loadDataTrigger(!loadData);
								}
								else
									setNowPlay((nowPlay-1+playlist.length)%playlist.length);
									loadDataTrigger(!loadData);
							}
					}}></SkipPreviousIcon>
					{
						isAudioPaused?
						<PlayArrowIcon style={{fontSize: 35, color:buttonColor}} onClick={play}></PlayArrowIcon>
						:
						<PauseIcon style={{fontSize: 35, color:buttonColor}} onClick={pause}></PauseIcon>
					}
					<SkipNextIcon style={{fontSize: 25, color:buttonColor}} onClick={()=>{
						if(isShuffleActive) {
							var temp=parseInt(Math.random()*playlist.length);
							while(temp===nowPlay && playlist.length!==1) temp=parseInt(Math.random()*playlist.length);
							setNowPlay(temp);
							loadDataTrigger(!loadData);
						}
						else
							setNowPlay((nowPlay+1)%playlist.length);
							loadDataTrigger(!loadData);
						
					}}></SkipNextIcon>
				</div>
				
			</div>
		</div>
		</>}
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
	let r = 0, g = 0, b = 0; if (H.length === 4) { r = "0x" + H[1] + H[1]; g = "0x" + H[2] + H[2]; b = "0x" + H[3] + H[3]; } else if (H.length === 7) { r = "0x" + H[1] + H[2]; g = "0x" + H[3] + H[4]; b = "0x" + H[5] + H[6]; } // Then to HSL 
	r /= 255; g /= 255; b /= 255; let cmin = Math.min(r,g,b), cmax = Math.max(r,g,b), delta = cmax - cmin, h = 0, s = 0, l = 0; if (delta === 0) h = 0; else if (cmax === r) h = ((g - b) / delta) % 6; else if (cmax === g) h = (b - r) / delta + 2; else h = (r - g) / delta + 4; h = Math.round(h * 60); if (h < 0) h += 360; l = (cmax + cmin) / 2; s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); s = +(s * 100).toFixed(1); l = +(l * 100).toFixed(1); return "hsl(" + h + "," + s + "%," + l + "%)";
}
function hex_setSat(H, sat) { // Convert hex to RGB first 
	let r = 0, g = 0, b = 0; if (H.length === 4) { r = "0x" + H[1] + H[1]; g = "0x" + H[2] + H[2]; b = "0x" + H[3] + H[3]; } else if (H.length === 7) { r = "0x" + H[1] + H[2]; g = "0x" + H[3] + H[4]; b = "0x" + H[5] + H[6]; } // Then to HSL 
	let v=Math.max(r,g,b), c=v-Math.min(r,g,b); let h= c && ((v===r) ? (g-b)/c : ((v===g) ? 2+(b-r)/c : 4+(r-g)/c)); h=60*(h<0?h+6:h); let s=sat;
	let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0); return `rgb(${f(5)},${f(3)},${f(1)})`; 
}

function stateToProps(state) {
    return {
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer,
				playlists: state.playlistsReducer
 ?? ??}
}

export default connect(stateToProps)(Player);