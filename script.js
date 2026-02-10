var ArrayPlayingField = [];
var LastCheckers = null;
var NumberPlayer = 1;
var NamePlayer1 = '';
var NamePlayer2 = '';
var CheckersFirstPlayer = [];
var CheckersSecondPlayer = [];
var ImgCheckers = "Images/шашка.png";
var ImgCheckers2 = "Images/шашка2.png";
var PlayContent = document.getElementById('Content');
var PlayPlace = document.getElementById("Place");
var player = document.getElementById("PlayerPlay");
var TimerElem = document.getElementById('Timer');
var timer = null; 
var flag1 = null;
var flag2 = null;
var Summ1 = 0;
var Summ2 = 0;

const URLbd = "https://65a1943242ecd7d7f0a6c73e.mockapi.io/CheckersPlay";
let app = new Vue({
    el: '#ManualFull',
    data: {
      arr: [],
      loading: true,
      errored: false,
      name1: '',
      score1: 0,
      resalt1: 0,
      name2: '',
      score2: 0,
      resalt2: 0,
    },
    mounted() {
        fetch(URLbd)
        .then((res) => res.json())
        .then((CheckersPlay) => {
          this.arr = CheckersPlay;
          CheckersPlay.forEach((CheckersPlay) => {
            
          });
        });
      },
    methods: {
      AllCheckersPlay: function(){
        axios
            .get(URLbd)
            .then(response =>(this.arr = response))
            .catch(error => this.errored = true)
            .finally(() => this.loading = false);
      },
      addbd: function (){
        axios.post(URLbd, {Name: this.name1, Score: this.score1, Resalt: this.resalt1});
        axios.post(URLbd, {Name: this.name2, Score: this.score2, Resalt: this.resalt2});
      },     
    }
});

function StartPlayField(){
  let files1 = document.getElementById('checkers1');
  let files2 = document.getElementById('checkers2');
  timer = 150;
  player.textContent = "Сейчас ходит "+ NamePlayer1;
    for(let i=0; i<5; i++){
        ArrayPlayingField[i] = [];
        let block = document.createElement('tr');
        let str = 'column' + i;
        block.setAttribute('id', str);
        PlayPlace.appendChild(block);
        for(let j=0; j<5; j++){
            test=document.getElementById(str); 
            if((j%2 == 0 && i%2== 0) || (i%2!=0 && j%2!=0)){
                let block2 = document.createElement('td');
                block2.setAttribute('style', 'width: 100px; height: 100px; background-color: #8B4513;');
                block2.setAttribute('id', "black i "+ i + " j " + j);
                ArrayPlayingField[i][j] = block2;
              }
              else{
                let block1 = document.createElement('td');
                block1.setAttribute('style', 'width: 100px; height: 100px; background-color: #FFDEAD;');
                block1.setAttribute('id', "white i "+ i + " j " + j);
                ArrayPlayingField[i][j] = block1;
              }
            test.appendChild(ArrayPlayingField[i][j]);
            if(i<1 || i>3){
              let img = document.createElement('div');
              img.style.width = '100px';
              img.style.height = '100px';
              img.textContent = '1';
              img.style.textAlign = 'center';
              img.style.lineHeight = '100px';
              if(i<1){
                img.style.color = '#FFDEAD';
                CheckersSecondPlayer.push(img);
                img.setAttribute('id', 'Player2');
                if(files2.files[0]!=null){
                  img.style.backgroundImage = "url('"+ window.URL.createObjectURL(files2.files[0])+"')";
                  img.style.backgroundSize = '100px 100px';
                }
                else{
                  img.style.backgroundImage = "url('"+ ImgCheckers+"')";
                }
              }
              else{
                CheckersFirstPlayer.push(img);
                img.setAttribute('id', 'Player1');
                img.style.color = '#552507';
                if(files1.files[0]!=null){
                  img.style.backgroundImage = "url('"+ window.URL.createObjectURL(files1.files[0])+"')";
                  img.style.backgroundSize = '100px 100px';
                } 
                else{
                  img.style.backgroundImage = "url('"+ ImgCheckers2+"')";
                }
                img.setAttribute('onclick', 'ColorMoving(this)');
              }
              ArrayPlayingField[i][j].appendChild(img);
            }
        }
    }
}

function ColorMoving(elem){
  if(LastCheckers!=elem && LastCheckers!=null){
    let parent = LastCheckers.parentElement;
    let str2 = parent.getAttribute('id');
    let i = Number(str2.split(' ')[2]);
    let j = Number(str2.split(' ')[4]);
    OFFMovement(i, j);
  }
  let parent = elem.parentElement;
  let str = parent.getAttribute('id');
  let i = Number(str.split(' ')[2]);
  let j = Number(str.split(' ')[4]);
  ONMovement(i,j, elem.getAttribute('id'));
  LastCheckers = elem;
}

function ONMovement(i, j, id){
  if((i+1<5) && (ArrayPlayingField[i+1][j].children.length == 0 || ArrayPlayingField[i+1][j].children[0].getAttribute('id')!=id)){
    ArrayPlayingField[i+1][j].style.backgroundColor = '#FFC618';
    ArrayPlayingField[i+1][j].setAttribute('onclick', 'MovementCheckers(this)'); 
  }
  if((i-1>-1) && (ArrayPlayingField[i-1][j].children.length == 0 || ArrayPlayingField[i-1][j].children[0].getAttribute('id')!=id)){
    ArrayPlayingField[i-1][j].style.backgroundColor = '#FFC618';
    ArrayPlayingField[i-1][j].setAttribute('onclick', 'MovementCheckers(this)'); 
  }
  if((j+1<5) && (ArrayPlayingField[i][j+1].children.length == 0 || ArrayPlayingField[i][j+1].children[0].getAttribute('id')!=id)){
    ArrayPlayingField[i][j+1].style.backgroundColor = '#FFC618';
    ArrayPlayingField[i][j+1].setAttribute('onclick', 'MovementCheckers(this)'); 
  }
  if((j-1>-1) && (ArrayPlayingField[i][j-1].children.length == 0 || ArrayPlayingField[i][j-1].children[0].getAttribute('id')!=id)){
    ArrayPlayingField[i][j-1].style.backgroundColor = '#FFC618';
    ArrayPlayingField[i][j-1].setAttribute('onclick', 'MovementCheckers(this)'); 
  }
}
function OFFMovement(i,j){
  if(i+1<5){
    let str2 = ArrayPlayingField[i+1][j].getAttribute('id');
    let color = str2.split(' ')[0];
    if(color == 'white'){
      ArrayPlayingField[i+1][j].style.backgroundColor = '#FFDEAD';
    }
    else{
      ArrayPlayingField[i+1][j].style.backgroundColor = '#8B4513';
    }
    ArrayPlayingField[i+1][j].setAttribute('onclick', ''); 
  }
  if(i-1>-1){
    let str2 = ArrayPlayingField[i-1][j].getAttribute('id');
    let color = str2.split(' ')[0];
    if(color == 'white'){
      ArrayPlayingField[i-1][j].style.backgroundColor = '#FFDEAD';
    }
    else{
      ArrayPlayingField[i-1][j].style.backgroundColor = '#8B4513';
    }
    ArrayPlayingField[i-1][j].setAttribute('onclick', ''); 
  }
  if(j+1<5){
    let str2 = ArrayPlayingField[i][j+1].getAttribute('id');
    let color = str2.split(' ')[0];
    if(color == 'white'){
      ArrayPlayingField[i][j+1].style.backgroundColor = '#FFDEAD';
    }
    else{
      ArrayPlayingField[i][j+1].style.backgroundColor = '#8B4513';
    }
    ArrayPlayingField[i][j+1].setAttribute('onclick', ''); 
  }
  if(j-1>-1){
    let str2 = ArrayPlayingField[i][j-1].getAttribute('id');
    let color = str2.split(' ')[0];
    if(color == 'white'){
      ArrayPlayingField[i][j-1].style.backgroundColor = '#FFDEAD';
    }
    else{
      ArrayPlayingField[i][j-1].style.backgroundColor = '#8B4513';
    }
    ArrayPlayingField[i][j-1].setAttribute('onclick', ''); 
  }
}
function MovementCheckers(elemMovement){
  let parent =LastCheckers.parentElement;
  let stroka = parent.getAttribute('id');
  let i = Number(stroka.split(' ')[2]);
  let j = Number(stroka.split(' ')[4]);
  OFFMovement(i, j);
  parent.removeChild(LastCheckers);
  elemMovement.appendChild(LastCheckers);
  ChangePlayer();
  if(elemMovement.children.length>1){
    EatingCheckers(elemMovement);
  }
}

function ChangePlayer(){
  if(NumberPlayer == 1){
    CheckersFirstPlayer.forEach(function(entry) {
      entry.setAttribute('onclick', ''); 
    });
    CheckersSecondPlayer.forEach(function(entry) {
      entry.setAttribute('onclick', 'ColorMoving(this)');
    });
    NumberPlayer = 2;
    player.textContent = "Сейчас ходит "+ NamePlayer2;
  }
  else{
    CheckersSecondPlayer.forEach(function(entry) {
      entry.setAttribute('onclick', ''); 
    });
    CheckersFirstPlayer.forEach(function(entry) {
      entry.setAttribute('onclick', 'ColorMoving(this)');
    });
    NumberPlayer = 1;
    player.textContent = "Сейчас ходит "+ NamePlayer1;
  }
  
}

function EatingCheckers(elem){
  let elem1 = elem.children[0];
  let elem2 = elem.children[1];
  let num1 = Number(elem1.textContent);
  let num2 = Number(elem2.textContent);
  if(num1 == num2){
    random1 = getRandomInt(0, 100);
    random2 = getRandomInt(0, 100);
    while(random1 == random2){
      random1 = getRandomInt(0, 100);
      random2 = getRandomInt(0, 100);
    }
    console.log('random1' + random1);
    console.log('random2' + random2);
    if(random1 > random2){
      elem1.textContent = num1+1;
      if(elem2.getAttribute('id') == 'Player1'){
        let index = CheckersFirstPlayer.indexOf(elem2);
        CheckersFirstPlayer.splice(index, 1);
      }
      else{
        let index = CheckersSecondPlayer.indexOf(elem2);
        CheckersSecondPlayer.splice(index, 1);
      }
      if(LastCheckers == elem2){
        LastCheckers = null;
      }
      elem.removeChild(elem2);
    }
    else{
      elem2.textContent = num2+1;
      if(elem1.getAttribute('id') == 'Player1'){
        let index = CheckersFirstPlayer.indexOf(elem1);
        CheckersFirstPlayer.splice(index, 1);
      }
      else{
        let index = CheckersSecondPlayer.indexOf(elem1);
        CheckersSecondPlayer.splice(index, 1);
      }
      if(LastCheckers == elem1){
        LastCheckers = null;
      }
      elem.removeChild(elem1);
    }
  }
  else if(num1>num2){
    elem1.textContent = num1+1;
    if(elem2.getAttribute('id') == 'Player1'){
      let index = CheckersFirstPlayer.indexOf(elem2);
      CheckersFirstPlayer.splice(index, 1);
    }
    else{
      let index = CheckersSecondPlayer.indexOf(elem2);
      CheckersSecondPlayer.splice(index, 1);
    }
    if(LastCheckers == elem2){
      LastCheckers = null;
    }
    elem.removeChild(elem2);
  }
  else{
    elem2.textContent = num2+1;
    if(elem1.getAttribute('id') == 'Player1'){
      let index = CheckersFirstPlayer.indexOf(elem1);
      CheckersFirstPlayer.splice(index, 1);
    }
    else{
      let index = CheckersSecondPlayer.indexOf(elem1);
      CheckersSecondPlayer.splice(index, 1);
    }
    if(LastCheckers == elem1){
      LastCheckers = null;
    }
    elem.removeChild(elem1);
  }
  Final();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function Final(){
  if(CheckersFirstPlayer.length == 0){
    player.textContent = 'Победил '+NamePlayer2+'!!!!';
    CheckersFirstPlayer.forEach(function(entry) {
      console.log(Number(entry.textContent));
      Summ1 +=  Number(entry.textContent);
    });
    CheckersSecondPlayer.forEach(function(entry){
      console.log(Number(entry.textContent));
      Summ2 +=  Number(entry.textContent);
    });
    PlayPlace.setAttribute('style', 'display:none;');
    TimerElem.setAttribute('style', 'display:none;');
    app.score1 = Summ1;
    app.score2 = Summ2;
    FinalFinal();
  }
  else if(CheckersSecondPlayer.length == 0){
    player.textContent = 'Победил '+ NamePlayer1+'!!!!';
    CheckersFirstPlayer.forEach(function(entry) {
      console.log(Number(entry.textContent));
      Summ1 +=  Number(entry.textContent);
    });
    CheckersSecondPlayer.forEach(function(entry){
      console.log(Number(entry.textContent));
      Summ2 +=  Number(entry.textContent);
    });
    PlayPlace.setAttribute('style', 'display:none;');
    TimerElem.setAttribute('style', 'display:none;');
    app.score1 = Summ1;
    app.score2 = Summ2;
    FinalFinal();
  }
}
let Timer = setInterval(function() {
  if(timer!=null){
    if(timer<1){
      clearInterval(Timer);
      if(CheckersFirstPlayer.length<CheckersSecondPlayer.length){
        player.textContent = 'Время вышло, победил '+ NamePlayer2;
        app.resalt1 = 'Проиграл';
        app.resalt2 = 'Победил';
      }
      else if(CheckersFirstPlayer.length>CheckersSecondPlayer.length){
        player.textContent = 'Время вышло, победил '+ NamePlayer1;
        app.resalt1= 'Победил';
        app.resalt2 = 'Проиграл';
      }
      else{
        player.textContent = 'Время вышло, Ничья';
        app.resalt1 = 'Ничья';
        app.resalt2 = 'Ничья';
      }
      CheckersFirstPlayer.forEach(function(entry) {
        console.log(Number(entry.textContent));
        Summ1 +=  Number(entry.textContent);
      });
      CheckersSecondPlayer.forEach(function(entry){
        console.log(Number(entry.textContent));
        Summ2 +=  Number(entry.textContent);
      });
      PlayPlace.setAttribute('style', 'display:none;');
      TimerElem.setAttribute('style', 'display:none;');
      app.score1 = Summ1;
      app.score2 = Summ2;
      FinalFinal();
    }
    if(timer%60 <10){
      TimerElem.textContent = 'Осталось '+ Math.floor(timer/60) + ':0' + timer%60;
    }
    else{
      TimerElem.textContent = 'Осталось '+ Math.floor(timer/60) + ':' + timer%60;
    }
    timer--;
  }
}, 1000);

var button = document.getElementById('ButtonStart');
var StringCheck = document.getElementById('CheckString');

function Check(){
  let input1 = document.getElementById('Name1');
  let input2 = document.getElementById('Name2');
  let button = document.getElementById('ButtonStart');
  let StringCheck = document.getElementById('CheckString');
  console.log('input1 '+input1.value+ ', '+ 'input2 '+input2.value);
  if(input1.value!='' && input2.value!=''){
    NamePlayer1 = input1.value;
    NamePlayer2 = input2.value;
    app.name1 = NamePlayer1;
    app.name2 = NamePlayer2;  
    document.getElementById('Manual').setAttribute('style', 'display: none;');
    document.getElementById('Timer').setAttribute('style', 'display: ;');
    document.getElementById('Place').setAttribute('style', 'display:block;');
    StartPlayField();
  }
  else{
    StringCheck.setAttribute('style', 'display: ;');
  }
}
function FinalFinal(){
  document.getElementById('Manual2').setAttribute('style', 'display: ;');
}
function Message1(){
  document.getElementById('mess').setAttribute('style', 'display: ;');
}