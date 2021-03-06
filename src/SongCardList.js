import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; 
import { makeStyles } from "@material-ui/core/styles";

import FilterListIcon from '@material-ui/icons/FilterList';

import SongCard from './SongCard.js';
import Tag from './Tag.js'


function SongCardList(props) {
	const { lang } = useParams();
	
	const [isFilterActive, setFilterActive] = useState(false);	
	const [songs, setSongs] = useState([]);
	const [songsFilter, setSongsFilter] = useState([]);
	const [songsInputFilter, setSongsInputFilter] = useState([]);
	
	const [productions, setProductions] = useState([]);
	const [productionChecked, setProductionChecked] = useState([]);
	const [productionCheckedCnt, setProductionCheckedCnt] = useState(0);
	
	const [songAttrs, setSongAttrs] = useState([0, 1, 2, 3]);
	const [songAttrChecked, setSongAttrChecked] = useState([false, false, false, false]);
	const [songAttrCheckedCnt, setSongAttrCheckedCnt] = useState(0);
	
	const [levels, setLevelsAttrs] = useState([0, 1, 2]);
	const [levelChecked, setLevelChecked] = useState([false, false, false]);
	const [levelCheckedCnt, setLevelCheckedCnt] = useState(0);
	
	const [inputVal,setInputVal] = useState('');
	
	const [order, setOrder] = useState('');
	const [orderSt, setOrderSt] = useState('');
	
	const dark='#dddddd', light='#555555';
	const useStyles = makeStyles({root: { "& .MuiSvgIcon-root": {color: props.theme==='dark'?'#dddddd':'#555555' }, '& label.Mui-focused': { color: props.theme==='dark'?'#dddddd':'#555555' },'& label': { color: props.theme==='dark'?'#dddddd':'#555555' },"& .MuiOutlinedInput-input": { color: props.theme==='dark'?'#dddddd':'#555555' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: props.theme==='dark'?'#dddddd':'#333333', }, '&.Mui-focused fieldset': { borderColor: props.theme==='dark'?'#dddddd':'#555555', }, },}});
	const classes = useStyles();
	var timerID;

	useEffect(()=>{ 	
		axios.get('/api/song_album_view')
		.then((res)=>{setSongs(shuffle(res.data.rows));setSongsFilter(res.data.rows);setSongsInputFilter(res.data.rows);}) 
		.catch(()=>{});
		axios.get('/api/production')
		.then((res)=>{setProductions(res.data.rows); let temp = new Array(res.data.rows.length+1); setProductionChecked([...temp.fill(false)])}) 
		.catch(()=>{});
		return ()=>clearTimeout(timerID);
	}, []);
	
	useEffect(()=>{ 	
			setSongsFilter(songs.filter((song)=>(productionCheckedCnt?productionChecked[song.production_id]:true)&&(songAttrCheckedCnt?songAttrChecked[song.song_type]:true)&&(levelCheckedCnt?levelChecked[song.song_level]:true)));
	}, [productionCheckedCnt, songAttrCheckedCnt, levelCheckedCnt]);
	
	
	useEffect(()=>{
		inputFilter(inputVal);
	}, [songsFilter]);

	function inputFilter(val){
		axios.all([getSongIdol(val), getSongUnit(val)]).then(axios.spread((res1, res2)=>{
			setSongsInputFilter(songsFilter.filter(({song_title_kr: tk, song_title_en: te, song_title_jp: tj, song_id: si})=>tk?.toLowerCase().includes(val.toLowerCase())||te?.toLowerCase().includes(val.toLowerCase())||tj?.toLowerCase().includes(val.toLowerCase())||res1.data.rows.some((song)=>song['song_id']===si)||res2.data.rows.some((song)=>song['song_id']===si))); 
		})).catch();
	}
	
	useEffect(()=>{
	 let temp = [...songsInputFilter];
		if(orderSt===0) {
			shuffle(temp);
			setSongsInputFilter([...temp]);
		}
		else if(orderSt===1 && order===0) {
			setSongsInputFilter([...temp.sort((a,b)=>{return (eval('a.song_title_'+lang)?eval('a.song_title_'+lang+'.toUpperCase()'):a.song_title_en.toUpperCase())>(eval('b.song_title_'+lang)?eval('b.song_title_'+lang+'.toUpperCase()'):b.song_title_en.toUpperCase())?1:-1})]);
		}
		else if(orderSt===1 && order===1) {
			setSongsInputFilter([...temp.sort((a,b)=>{return (eval('a.song_title_'+lang)?eval('a.song_title_'+lang+'.toUpperCase()'):a.song_title_en.toUpperCase())<(eval('b.song_title_'+lang)?eval('b.song_title_'+lang+'.toUpperCase()'):b.song_title_en.toUpperCase())?1:-1})]);
		}
		else if(orderSt===2 && order===0) {
			setSongsInputFilter([...temp.sort((a,b)=>{return (a.album_release_date>b.album_release_date)?1:-1})]);
		}
		else if(orderSt===2 && order===1) {
			setSongsInputFilter([...temp.sort((a,b)=>{return (a.album_release_date<b.album_release_date)?1:-1})]);
		}
		else if(orderSt===3 && order===0) {
			setSongsInputFilter([...temp.sort((a,b)=>{return (a.song_level>b.song_level)?1:-1})]);
		}
		else if(orderSt===3 && order===1) {
			setSongsInputFilter([...temp.sort((a,b)=>{return (a.song_level<b.song_level)?1:-1})]);
		}
	}, [orderSt, order]);
	
	function getSongIdol(val){
		return axios.get(`/api/song_idol_cv/search?idol_name_kr=${val}&idol_name_jp=${val}&idol_name_en=${val}&cv_name_kr=${val}&cv_name_jp=${val}&cv_name_en=${val}`);				 
	}
	function getSongUnit(val){
		return axios.get(`/api/song_unit_idol_cv_view/search?idol_name_kr=${val}&idol_name_jp=${val}&idol_name_en=${val}&cv_name_kr=${val}&cv_name_jp=${val}&cv_name_en=${val}&unit_name_kr=${val}&unit_name_jp=${val}&unit_name_en=${val}`);
	}
	return (
		<>
		<div className={`songSearchArea`}>
			<div className={`filterArea ${!isFilterActive&&'inactive'}`}>
				<div className={`production wrapper`}>
					<div className='label'>{{kr:'?????????',jp:'????????????',en:'Series'}[lang]}</div>
					<div className='tagsArea alignCenter'>
						<div className='tags production'>{
							productions.map((production, i)=>{
									return(<div className={`tagCtrl ${!productionChecked[i+1]&&'inactive'}`} key={i} onClick={()=>{
											setProductionCheckedCnt(productionChecked[i+1]?(productionCheckedCnt-1):(productionCheckedCnt+1));	
											let temp=[...productionChecked]; 
											temp.splice(i+1, 1, !temp[i+1]);
											setProductionChecked([...temp]);
										}}>
										<Tag key={i} classify='production' id={production.production_id} name={eval('production.series_short_'+lang)} color1={adjust(production.production_color, 200)} color2={adjust(production.production_color, 80)} padding={{1:2,2:2.5,4:3}[i]}></Tag>
								</div>)
							})
						}</div>
					</div>
				</div>
				<div className={`songAttr wrapper`}>
					<div className='label'>{{kr:'???',jp:'???',en:'Song'}[lang]}</div>
					<div className='tagsArea alignCenter'>
						<div className='tags'>{
							songAttrs.map((songAttr, i)=>{
									return(<div className={`tagCtrl ${!songAttrChecked[i]&&'inactive'}`} key={i} onClick={()=>{
											setSongAttrCheckedCnt(songAttrChecked[i]?(songAttrCheckedCnt-1):(songAttrCheckedCnt+1));	
											let temp=[...songAttrChecked]; 
											temp.splice(i, 1, !temp[i]);
											setSongAttrChecked([...temp]);
										}}>
										<Tag key={i} classify='songAttr' id={i} name={{kr:{0:'??????',1:'??????',2:'??????',3:'??????'}[i], en:{0:'Solo',1:'Unit',2:'Multi',3:'ALL'}[i], jp:{0:'??????',1:'????????????',2:'??????',3:'??????'}[i]}[lang]} color1={{0:'#c7ff99',1:'#99fdff',2:'#da99ff',3:'#ffa53d'}[i]} color2={{0:'#99fff0',1:'#bd99ff',2:'#ff99ac',3:'#dfff3d'}[i]} padding={{0:6,1:5,2:5,3:2}[i]}></Tag>
								</div>)
							})
						}</div>
					</div>

				</div>
				<div className={`level wrapper`}>
					<div className='label'>{{kr:'?????????',jp:'?????????',en:'Level'}[lang]}</div>
					<div className='tagsArea alignCenter'>
						<div className='tags'>{
							levels.map((level, i)=>{
									return(<div className={`tagCtrl ${!levelChecked[i]&&'inactive'}`} key={i} onClick={()=>{
											setLevelCheckedCnt(levelChecked[i]?(levelCheckedCnt-1):(levelCheckedCnt+1));	
											let temp=[...levelChecked]; 
											temp.splice(i, 1, !temp[i]);
											setLevelChecked([...temp]);
										}}>
										<Tag key={i} classify='level' id={i} name={{kr:{0:'??????',1:'??????',2:'?????????'}[i], en:{0:'Easy',1:'Normal',2:'Hard'}[i], jp:{0:'??????',1:'??????',2:'??????'}[i]}[lang]} color1={{0:'#24e2ff',1:'#f8ff26',2:'#f57d05'}[i]} color2={{0:'#6b7aff',1:'#8dff5c',2:'#ff3d3d'}[i]} padding={4}></Tag>
								</div>)
							})
						}</div>
					</div>

				</div>
				<div className={`order wrapper`}>
					<div className='label'>{{kr:'??????',jp:'??????',en:'Sort'}[lang]}</div>
					<div className='alignCenter'>

						<FormControl variant="outlined" className={`formCtrl`} style={{width:'40%',maxWidth:'300px', marginRight:'20px' }} className={classes.root} margin="dense">
							<InputLabel id="demo-simple-select-outlined-label" >{{kr:'??????',jp:'??????',en:'Sort by'}[lang]}</InputLabel>
							<Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={orderSt} onChange={e=>setOrderSt(e.target.value)}>
								<MenuItem value={0}>{{kr:'??????',jp:'????????????',en:'Random'}[lang]}</MenuItem> 
								<MenuItem value={1}>{{kr:'??????',jp:'??????',en:'Title'}[lang]}</MenuItem>
								<MenuItem value={2}>{{kr:'?????????',jp:'?????????',en:'Release Date'}[lang]}</MenuItem>
								<MenuItem value={3}>{{kr:'?????????',jp:'?????????',en:'Level'}[lang]}</MenuItem>  
							</Select>
						</FormControl>
						<FormControl variant="outlined" className={`formCtrl`} style={{width:'30%',maxWidth:'220px'}} margin="dense" className={classes.root}>
							<InputLabel id="demo-simple-select-outlined-label" >{{kr:'??????',jp:'??????',en:'Order by'}[lang]}</InputLabel>
							<Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={order} onChange={e=>setOrder(e.target.value)}>
								<MenuItem value={0}>{{kr:'????????????',jp:'??????',en:'Ascending'}[lang]}</MenuItem>
								<MenuItem value={1}>{{kr:'????????????',jp:'??????',en:'Descending'}[lang]}</MenuItem>
							</Select>
						</FormControl>

					</div>
				</div>
			</div>
			<div className='songSearchBar'>
				<div className={`filterButtonArea alignCenter`} onClick={()=>setFilterActive(!isFilterActive)}> <FilterListIcon></FilterListIcon>??</div>
				<div className='inputArea'> 
					<input className="songSearchInput" type="search" name="" placeholder={{kr:"??????, ?????????, ??????, ?????? ??????",jp:'????????????, ????????????, ??????, ???????????? ??????',en:"Title, Idol, CV, Unit search..."}[lang]} onChange={(e)=>{
					clearTimeout(timerID);
					timerID=setTimeout(()=>{
						inputFilter(e.target.value);
						setInputVal(e.target.value);
					},500);
					}}/>
				</div>
			</div> ??
		</div>
		
		<div className='songCardList'  onTouchStart={()=>{setFilterActive(false)}}>
			
			{ 
				songsInputFilter.map((song, idx)=>{
					return (<>
						<SongCard key={idx} song={song}> </SongCard>
					</>)
				})
			}
		</div>
		</>
	)
}

function shuffle(array) { for (let i = array.length - 1; i > 0; i--) { let j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return [...array]; }

function adjust(color, amount) {
	if(!color) return null;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
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

export default connect(stateToProps)(SongCardList);