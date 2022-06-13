'use strict'
const formFrame = document.querySelector('.wrapper');
const openForm = document.querySelector('#formOpen');
const addBtn = document.querySelector('#btnAdd');
const form = document.querySelector('#form');
const taskName = document.querySelector('#taskName')
const message = document.querySelector('#msg');
const date = document.querySelector('#date')
const description = document.querySelector('#description');
const myTasks = document.querySelector('.tasks');
const closeBtn = document.querySelector('.closeForm');
const overlay = document.querySelector('.overlay');
const removeBtn = document.querySelector('#trashBtn');
console.log(overlay);
const radioBtninput = document.getElementsByName('importance');
const checkbox= document.querySelector('.radioBtns')

//loading localStorage item to UI
let storeTasks = [];
    storeTasks = JSON.parse(localStorage.getItem('storeTasks'));
    window.addEventListener('load', function () {
    if (JSON.parse(localStorage.getItem('storeTasks')) === null) {
        storeTasks=[];
    }
    else {
        storeTasks.forEach(el => {
            const html = ` 
            <div id =${el.id} class = 'task-item' style ='border:${el.importance}'>
                <h2>${el.name}</h2>
                 <p>${el.date}</p>
                <p>${el.description}</p>
                <i id ='trashBtn' class="fa-solid fa-trash "></i>
         </div>` 
            myTasks.insertAdjacentHTML('beforeend', html);

         });
    }})

//defining class for object generation
class Task {
    constructor(name, date, description,importance,id) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.importance = importance;
        this.id = Math.floor(Math.random()*10000);  
    }
    generateHtmlElement(){
        let html=`<div id =${this.id} class = 'task-item' style ='border:${this.importance}'>
        <h2>${this.name}</h2>
        <p>${this.date}</p>
        <p>${this.description}</p>
        <i id ='trashBtn' class="fa-solid fa-trash"></i>
    </div>` 
    myTasks.insertAdjacentHTML('beforeend', html);
    }
};

const formFrameManipulation = display =>{
    formFrame.style.display = display;
    overlay.classList.contains('hidden') ? overlay.classList.remove('hidden'):
    overlay.classList.add('hidden');
}

//taking input value and presenting them in the app

const takeInput = function () {
    let task = new Task(taskName.value,date.value,description.value,checkboxValue); 
    storeTasks.push(task); 
    localStorage.setItem('storeTasks', JSON.stringify(storeTasks));
    task.generateHtmlElement(); 
    formFrameManipulation('none');
}
//removing items from UI and storage
myTasks.addEventListener('click', function (e){
    if (e.target === document.querySelector('#trashBtn')) { 
        let clicked= e.target.parentElement.id;
        storeTasks.map((item,i)=>{
            if(item.id == clicked){
                storeTasks.splice(i,1);
            }
            localStorage.setItem('storeTasks',JSON.stringify(storeTasks))
        })
        e.target.parentElement.remove();
    }
})
//getting checkboxvalue
let checkboxValue;//this is the importance property
checkbox.addEventListener('click', e=>{
    checkbox.value = e.target.getAttribute('for')|| e.target.value;
    if(checkbox.value ==='high'){
        checkboxValue= 'solid 5px rgb(160, 48, 48)'
    }else if(checkbox.value ==='medium'){
        checkboxValue= 'solid 5px rgb(211, 134, 46)'}
    })
       
//form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();
});
//FORM VALIDATION
const formValidation =()=>{
    taskName.value ===''?
      message.textContent ='task field cannot be blank'
    : takeInput();  
    formReset()
}

addBtn.addEventListener('click',formValidation);

//UI interference
//for opening the form

openForm.addEventListener('click', () => {
    formFrameManipulation('block')
});

//for closing the form
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formFrameManipulation('none');
    formReset()
})
//reseting form
function formReset(){
   [...form.getElementsByTagName('input')].forEach(input => input.value = '')
    description.value=''
}

//disabeling old date selection in the date input field
let today = new Date().toISOString().split('T')[0];
date.setAttribute('min', today);
