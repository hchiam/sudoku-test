function set(id) {
  var input = document.getElementById('input').value;
  var reg = /^\d+$/;
  var isAllNumeric = reg.test(input);
  if (isAllNumeric && input < 10 && input > 0) {
    document.getElementById(id).innerHTML = input;
    document.getElementById(id).style.background = 'blue';
    document.getElementById(id).style.color = 'white';
    resetInputColour();
  } else {
    alert('Please enter a number from 1 to 9.');
    highlightInputColour();
  }
  document.getElementById('input').value = '';
  document.getElementById("input").focus();
}

function resetInputColour() {
  document.getElementById("input").style.background = 'white';
  document.getElementById("input").style.color = 'black';
}

function highlightInputColour() {
  document.getElementById("input").style.background = 'blue';
  document.getElementById("input").style.color = 'white';
}

function inputAction() {
  resetInputColour();
  var input = document.getElementById('input').value;
  var reg = /(\D|\d{2,})/;
  document.getElementById('input').value = input.replace(reg,'');
}

function shuffleArray(array) {
  for (var i=0; i<array.length; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getRandomRow() {
  return shuffleArray([[1],[2],[3],[4],[5],[6],[7],[8],[9]]);
}

function fillBoard() {
  var boardRepresentation = [
    [],[],[],[],[],[],[],[],[]
  ];
  for (var i=0; i<9; i++) {
    boardRepresentation[i] = getRandomRow();
  }
  for (var j=0; j<9; j++) {
    for (var k=0; k<9; k++) {
      var index = (j+1) + '' + (k+1);
      document.getElementById(index).innerHTML = boardRepresentation[j][k];
    }
  }
}

window.onload = function() {
  fillBoard();
  document.getElementById("input").focus();
};

function clearBoard() {
  var boardRepresentation = [
    [],[],[],[],[],[],[],[],[]
  ];
  for (var j=0; j<9; j++) {
    for (var k=0; k<9; k++) {
      var index = (j+1) + '' + (k+1);
      document.getElementById(index).innerHTML = '&nbsp;';
    }
  }
}

function checkBoard() {
  
}