/*
Create Variable 
*/ 
var id = 1;
var category = "smartphones";
const inputElem = document.querySelector('#input-name');
const form = document.querySelector('#form');
const listElem = document.querySelector('#commentList');
const buttonElem = document.querySelector('#commentList button');
const toDoArray = JSON.parse(localStorage.getItem('to-do-list')) || [];