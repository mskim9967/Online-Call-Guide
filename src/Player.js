import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

function Player(props) {
	return (
		<div className={"player " + (props.playerReducer.isActive ? "active" : "")}>
			<div className="lyricPage"></div>
			<div className='coverImg' onClick={()=>{props.playerReducer.isActive?props.dispatch({type:'inactive'}):props.dispatch({type:'active'})}}>
				{props.playerReducer.song!==null && <img src={"/api/img/album/"+props.playerReducer.song.album_id}></img>}
			</div>
		</div>
	)
}


function stateToProps(state) {
    return {
        playerReducer : state.playerReducer
    }
}

export default connect(stateToProps)(Player);