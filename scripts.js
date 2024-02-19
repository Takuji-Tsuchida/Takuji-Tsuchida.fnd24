"use strict"; // スクリプト全体の厳格モード構文

const input1  = document.getElementById('input1');
const button1 = document.getElementById('button1');
const par     = document.getElementById("place1");
//
function callBack1(event) {
    par.innerText = input1.value;
    geoQuery(input1.value) // modules/helper.js
 }
button1.addEventListener("click", callBack1)
