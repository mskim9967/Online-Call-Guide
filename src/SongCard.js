import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useParams, Route } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

function SongCard(props) {
	const [tagData, setTagData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const { lang } = useParams();
	const ref = useRef(null);
	const isSongUnit = props.song?.song_is_unit.data[0];
	let timerID;
	const componentRef = useRef();
	const [isClicked, setClicked] = useState(false);
	const [isSwiped, setSwiped] = useState(false);
	const handlers = useSwipeable({
			onSwipedRight: (eventData) => setSwiped(false),
  		onSwipedLeft: (eventData) => setSwiped(true)
	});
	function handleClick(e: any) { 
			if(componentRef && componentRef.current){ 
				const ref: any = componentRef.current;
				if(!ref.contains(e.target)){ setSwiped(false); }
				
			} 
		}	

	useEffect(()=>{ 
		setLoading(true);
		setSwiped(false);
		if(props.song)
			isSongUnit ?
				axios.get('/api/song_unit?song_id=' + props.song.song_id)
				.then((res)=>{setTagData(res.data.rows); setLoading(false);}) 
				.catch(()=>{})
			:
				axios.get('/api/song_idol_cv?song_id=' + props.song.song_id)
				.then((res)=>{setTagData(res.data.rows); setLoading(false);}) 
				.catch(()=>{});
		document.addEventListener("touchstart", handleClick, false);	
		return ()=>{
			clearTimeout(timerID);
			document.removeEventListener("touchstart", handleClick);
		}
	}, [props.song]);

	if(!props.song) return (null);

	return (
		<div className={isClicked?'clicked':''} {...handlers}>
		<div className={`songCard pid${props.song.production_id} ${isSwiped?'swiped':''} ${isLoading?'loading':'loaded'}`}  ref={componentRef} onClick={()=>{
				setClicked(true);
				setSwiped(false);
				if(props.song?.song_id!==props.playerReducer.song?.song_id)
					 props.dispatch({type:'songCardClicked', payload:{song: props.song, tagData: tagData}});
				props.dispatch({type:'playerActive'});
				
				timerID = setTimeout(()=>{
					setClicked(false);
				}, 300);
				
			}}>
			<div className="coverImgArea">
				<div className="coverImg">
					<img src={"/api/img/album/"+props.song.album_id}></img>
				</div>
			</div>
			<div className="title"><span>{eval('props.song.song_title_'+lang)||props.song.song_title_en}</span></div>

			<div className='tagsArea' ref={ref}>
				{
					!isSongUnit ?
						tagData.map((idolCV, idx)=>{
							return (
								<>
									<Tag key={idx*2} classify='idol' id={idolCV.idol_id} name={eval('idolCV.idol_name_'+lang)} color={idolCV.idol_color}></Tag>
									<Tag key={idx*2+1} classify='cv' id={idolCV.cv_id} name={eval('idolCV.cv_name_'+lang)} color={idolCV.idol_color}></Tag>
								</>
							)
						})
					:
						tagData.map((unit, idx)=>{
							return (
									<Tag key={idx} classify='unit' id={unit.unit_id} name={unit.unit_name_kr} color={unit.unit_color}></Tag>
							)
						})
						
				}

			</div>
		</div>
		</div>
	)
}

function Tag(props) {
	var lightenColor = adjust(props.color, 90);
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
function adjust(color, amount) {
	if(color===undefined) return null;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function stateToProps(state) {
    return {
        playerReducer : state.playerReducer
    }
}

export default connect(stateToProps)(SongCard);