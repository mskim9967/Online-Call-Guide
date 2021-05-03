import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useParams, Route } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

function SongCard(props) {
	const [tagData, setTagData] = useState([]);
	const { lang } = useParams();
	const ref = useRef(null);
	const isSongUnit = props.song.song_is_unit.data[0];
	let timerID;
	const componentRef = useRef();
		
	const [isSwiped, setSwiped] = useState(false);
	const handlers = useSwipeable({
			onSwipedRight: (eventData) => setSwiped(false),
  		onSwipedLeft: (eventData) => {
				setSwiped(true);
			}
	});
	
	useEffect(()=>{ 
		isSongUnit ?
			axios.get('api/song_unit?song_id=' + props.song.song_id)
			.then((res)=>{setTagData(res.data.row);}) 
			.catch(()=>{})
		:
			axios.get('api/song_idol_cv?song_id=' + props.song.song_id)
			.then((res)=>{setTagData(res.data.rows);}) 
			.catch(()=>{});
		
		function handleClick(e: any) { 
			if(componentRef && componentRef.current){ 
				const ref: any = componentRef.current;
				if(!ref.contains(e.target)){ setSwiped(false); }
			} 
		}
		document.addEventListener("touchend", handleClick, false);	
		return ()=>{
			clearTimeout(timerID);
			document.removeEventListener("touchend", handleClick);
		}
	}, []);
	
	return (
		<div {...handlers}>
		<div className={`songCard pid${props.song.production_id} ${isSwiped?'swiped':''}`}  ref={componentRef} onClick={()=>{
				timerID = setTimeout(()=>props.dispatch({type:'songCardClicked', payload:props.song}), 100);
			}}>
			<div className="coverImgArea">
				<div className="coverImg">
					<img src={"/api/img/album/"+props.song.album_id}></img>
				</div>
			</div>
			<div className="title">{eval('props.song.song_title_'+lang)||props.song.song_title_en}</div>

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
						<Tag classify='unit' id={tagData.unit_id} name={tagData.unit_name_kr} color={tagData.unit_color}></Tag>
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