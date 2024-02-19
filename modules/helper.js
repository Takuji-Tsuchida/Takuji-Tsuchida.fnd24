"use strict"; // スクリプト全体の厳格モード構文

/**
 * 現在の日時を文字列に変換して返す
 * @returns {string} : 現在の日時を表す文字列
 */
const getTime = () => {
    var now  = new Date();
    var year = now.getFullYear();
    var mon  = now.getMonth()+1; //１を足すこと
    var day  = now.getDate();
    var hour = now.getHours();
    var min  = now.getMinutes();
    var sec  = now.getSeconds();

    //出力用
    var s = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分" + sec + "秒";
    return s;
}

/**
 * 地図を表示する
 * @returns : 無し
 */
const loc           = [NaN /* longitude */, NaN /* latitude */];
let   map           = undefined;
const drawMap       = () => {if ( map === undefined ) { map = L.map('map_leaflet').setView(loc, 17); }}

/**
 * 地図内の右下位置に「leafletライブラリ」と「Open Street Map」の著作権クレジットを表示する
 * @returns : 無し
 */
const osm_mark_url  = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const osm_credit    = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const drawMapCredit = () => L.tileLayer(osm_mark_url, {attribution: osm_credit} ).addTo(map);

/**
 * 地図の表示倍率を基準値に戻す
 * @returns : 無し
 */
const resetZoomRatio= () => map.setView(loc,17);

/**
 * 地図の検索位置にポップアップマーカーを表示する
 * @param {string} msg : ポップアップマーカーに表示させるメッセージ
 * @returns : 無し
 */
const drawMaker     = (msg) => L.marker(loc).addTo(map).bindPopup(msg).openPopup();

/**
 * 地図外の右下位置に地図を表示させた時刻を表示する
 * @returns : 無し
 */
const drawTime      = () => document.getElementById("view_time").innerHTML = getTime();

/**
 * （１）国土地理院のジェオコーディングＤ/Ｂにネット経由でアクセスして、指定位置の緯度・経度の値を得る
 * （２）leafletライブラリを使って地図を表示する
 * @param {string} query : 地図検索用住所（ex. "愛知県豊田市トヨタ町１番地")
 * @returns : 無し
 */
async function geoQuery(query) {
    //
    // 国土地理院のジェオコーディングＤ/Ｂにネット経由でアクセスして、指定位置の緯度・経度の値を得る
    const response = await fetch('https://msearch.gsi.go.jp/address-search/AddressSearch?q=' + query);
    const data     = await response.json();
    loc[0]         = data[0].geometry.coordinates[1]; // longitude: E-W
    loc[1]         = data[0].geometry.coordinates[0]; // latitude : N-S
    //
    // leafletライブラリを使って地図を表示する
    drawMap();
    drawMapCredit();
    resetZoomRatio();
    drawMaker(query);
    drawTime();
}
