import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useParams, Route } from 'react-router-dom';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function Player(props) {
	const { lang } = useParams();
	var buttonColor= '#eeeeee', color='#ffffff';	
	if(props.playerReducer.tagData?.length === 1)
		 color=hex_setSat(props.playerReducer.song?.song_is_unit.data[0]?props.playerReducer.tagData[0].unit_shown_color:props.playerReducer.tagData[0].idol_shown_color, 0.13);
	else color='#ffffff';
	document.documentElement.style.setProperty("--flc", color);
	return (
		<>
		<div className={`coverImg ${props.playerReducer.isActive ? "active" : ""}`} onClick={()=>{props.playerReducer.isActive?props.dispatch({type:'inactive'}):props.dispatch({type:'active'})}}>
			<div className='dot'></div>
			{props.playerReducer.song!==null && <img src={"/api/img/album/"+props.playerReducer.song.album_id}></img>}
		</div>
		
		<div className={"playerPage " + (props.playerReducer.isActive ? "active" : "")}>
			<div className="lyricArea">
				<div className="text">
					今日はオタク君大好物をもってきたよー！
쿄우와 오타쿠쿤 다이코우부츠오 못테키타요-
오늘은 오타쿠 군들이 무지 좋아하는걸 들고 왔어-!

オタクのみんなー！わかってるなー！？一緒にぶちあがっちゃおう！！
오타쿠노민나- 와캇테루나- 잇쇼니 부치아갓챠오우
오타쿠들아―! 알고있지―!? 다함께 끓어올라보자!!

せーの！
세-노
둘-셋!

うりゃおい！　うりゃおい！　うりゃおい！　うりゃおい！
우랴오이! 우랴오이! 우랴오이! 우랴오이!
우랴오이! 우랴오이! 우랴오이! 우랴오이!

パンパパパパンパン　よっしゃシンデレラ！
팡파파파팡팡 욧샤 신데레라
팡파파파팡팡 으쌰 신데렐라!

(キュート！クール！パッション！ピンク！ブルー！オレンジ！ジャージャー！)
(큐-토 쿠-루 팟숑 핑쿠 브루- 오렌지 쟈-쟈-)
(큐트! 쿨! 패션! 핑크! 블루! 오렌지! 쟈―쟈―!)

全力ダンシン
젠료쿠 단싱
전력 댄싱

喉枯れシンギン
노도카레 싱깅
목 터져라 싱잉

チェキって　ハグって
체킷테 하굿테
사진찍고 허그하고

いいこいいこ
이이코 이이코
착하다 착해

無茶ブリ上等
무챠부리 죠우토우
막 나가기 환영

繋がり退場
츠나가리 타이죠우
선 넘는거 퇴장

バイトバイトバイト
바이토 바이토 바이토
알바 알바 알바

So!　アイドル！
So! 아이도루!
So! 아이돌!

(でっかい！ふつう！たぶんふつう！[17])
(뎃카이 후츠우 타분후츠우)
(큼! 보통! 아마 보통!)

(デツブツー！デツブーツー！)
(데츠부츠- 데츠부-츠-)
(큼보통―! 큼보―통―!)

最高！
사이코
최고!

(リンゴ！ポエム！AB！[18])
(링고 포에무 AB)
(사과! 포엠! AB!)

(リポービー！リポービー！)
(리포-비- 리포-비-)
(리포―B―! 리포―B―!)

どうせ推し変　みんなすんじゃん(あ～～～りあむ！！！)
도우세 오시헨 민나슨쟝(아- 리아무)
어차피 환승 다들 하잖아 (아~~~ 리아무!!!)

DD[19]なんて　浮気まんまん(あ～～～りあむ！！！)
DD난테 우와키 만만(아- 리아무)
합승이랍시고 바람기 만땅 (아~~~ 리아무!!!)

どうせぼくに　No No 人権(あ～～～りあむ！！！)
도우세보쿠니 No No 진켄(아- 리아무)
어차피 나한테 No No 인권 (아~~~ 리아무!!!)

誰でも良いから　人権ください
다레데모 이이카라 진켄쿠다사이
아무라도 좋으니까 인권 주십셔

BURN BURN　みんなが燃やせば(PPPH PPPH)
BURN BURN 민나가 모야세바(PPPH PPPH)
BURN BURN 모두가 불타버리면 (PPPH PPPH)

ワンチャン　あるかも！？なんて(PPPH PPPH)

				</div>
			</div>
			<div className='playerArea'>
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
					<PauseIcon style={{fontSize: 35, color:buttonColor}}></PauseIcon>
					{/*<PlayArrowIcon style={{fontSize: 35, color:buttonColor}}></PlayArrowIcon>*/}
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

function stateToProps(state) {
    return {
        playerReducer : state.playerReducer
    }
}

export default connect(stateToProps)(Player);