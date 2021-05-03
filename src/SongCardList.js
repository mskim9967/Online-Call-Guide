import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import SongCard from './SongCard.js';

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
						<SongCard key={idx} song={song}> </SongCard>
					)
				})
			}
		</div>
	)
}


export default SongCardList;