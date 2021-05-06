import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import SongCard from './SongCard.js';

function SongCardList(props) {
	const [searchText, setSearchText] = useState('');
	const [songsFilter, setSongsFilter] = useState([]);
	const [songs, setSongs] = useState([]);
	const [idoCVs, setIdoCVs] = useState([]);
	
	var timerID;

	useEffect(()=>{ 	
		axios.get('/api/song')
		.then((res)=>{setSongs(res.data.rows);setSongsFilter(res.data.rows)}) 
		.catch(()=>{});
		return ()=>clearTimeout(timerID);
	}, []);
	
	function getSongIdol(e){
		return axios.get(`/api/song_idol_cv/search?idol_name_kr=${e.target.value}&idol_name_jp=${e.target.value}&idol_name_en=${e.target.value}&cv_name_kr=${e.target.value}&cv_name_jp=${e.target.value}&cv_name_en=${e.target.value}`);				 
	}
	function getSongUnit(e){
		return axios.get(`/api/song_unit_idol_cv/search?idol_name_kr=${e.target.value}&idol_name_jp=${e.target.value}&idol_name_en=${e.target.value}&cv_name_kr=${e.target.value}&cv_name_jp=${e.target.value}&cv_name_en=${e.target.value}&unit_name_kr=${e.target.value}&unit_name_jp=${e.target.value}&unit_name_en=${e.target.value}`);
	}
	return (
		<>
		<div className="songSearchArea">
			<div className='songSearchBar'>
			<input className="songSearchInput" type="search" name="" placeholder="제목, 아이돌, 성우..." onChange={(e)=>{
				clearTimeout(timerID);
				timerID=setTimeout(()=>{
					axios.all([getSongIdol(e), getSongUnit(e)]).then(axios.spread((res1, res2)=>{
						setSongsFilter(songs.filter(({song_title_kr: tk, song_title_en: te, song_title_jp: tj, song_id: si})=>tk?.toLowerCase().includes(e.target.value.toLowerCase())||te?.toLowerCase().includes(e.target.value.toLowerCase())||tj?.toLowerCase().includes(e.target.value.toLowerCase())||res1.data.rows.some((song)=>song['song_id']===si)||res2.data.rows.some((song)=>song['song_id']===si)));
					})).catch();
				},500);
			}}/>
			</div>  
		</div>
		
		<div className='songCardList'>
			
			{ 
				songsFilter.map((song, idx)=>{
					return (<>
						<SongCard key={idx} song={song}> </SongCard>
						<SongCard key={idx} song={song}> </SongCard>
					</>)
				})
			}
		</div>
		</>
	)
}


export default SongCardList;