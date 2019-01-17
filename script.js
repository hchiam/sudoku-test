function set(id) {
  var input = document.getElementById('input').value;
  var reg = /^\d+$/;
  var isAllNumeric = reg.test(input);
  if (isAllNumeric && input < 10 && input > 0) {
    document.getElementById(id).innerHTML = input;
    document.getElementById(id).style.background = 'blue';
    document.getElementById(id).style.color = 'white';
    
    document.getElementById('input').value = '';
    document.getElementById("input").style.background = 'white';
    document.getElementById("input").style.color = 'black';
  } else {
    alert('Please enter a number from 1 to 9.');
    
    document.getElementById("input").style.background = 'blue';
    document.getElementById("input").style.color = 'white';
  }
  document.getElementById("input").focus();
}

function resetInputColour() {
  document.getElementById("input").style.background = 'white';
  document.getElementById("input").style.color = 'black';
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

function startTable() {
  var tableRepresentation = [
    [],[],[],[],[],[],[],[],[]
  ];
  for (var i=0; i<9; i++) {
    tableRepresentation[i] = getRandomRow();
  }
  for (var j=0; j<9; j++) {
    for (var k=0; k<9; k++) {
      var index = (j+1) + '' + (k+1);
      document.getElementById(index).innerHTML = tableRepresentation[j][k];
    }
  }
}

window.onload = function() {
  startTable();
  document.getElementById("input").focus();
};

function checkTable() {
  
}