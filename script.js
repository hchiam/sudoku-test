window.onload = function() {
  fillBoard();
  document.getElementById("input").focus();
};

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

function setFixedNumberCell(row, col, boardRepresentation) {
  var index = (row + 1) + '' + (col + 1);
  document.getElementById(index).disabled = true;
  document.getElementById(index).style.background = '#555';
  document.getElementById(index).style.color = 'white';
  document.getElementById(index).innerHTML = boardRepresentation[row][col];
}

function setBlankCell(row, col, boardRepresentation) {
  var index = (row + 1) + '' + (col + 1);
  document.getElementById(index).disabled = false;
  document.getElementById(index).style.background = '#555';
  document.getElementById(index).style.color = 'white';
  document.getElementById(index).innerHTML = '&nbsp;';
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
      var coin = Math.random();
      if (coin > 0.8) { // TODO: need better algorithm
        setFixedNumberCell(j, k, boardRepresentation);
      } else {
        setBlankCell(j, k, boardRepresentation);
      }
    }
  }
}

function clearBoard() {
  var boardRepresentation = [
    [],[],[],[],[],[],[],[],[]
  ];
  for (var j=0; j<9; j++) {
    for (var k=0; k<9; k++) {
      setBlankCell(j, k, boardRepresentation);
    }
  }
}

function buildRepresentationCopyOfBoard() {
  var boardRepresentation = [
    [],[],[],[],[],[],[],[],[]
  ];
  for (var j=0; j<9; j++) {
    for (var k=0; k<9; k++) {
      var index = (j + 1) + '' + (k + 1);
      var value = document.getElementById(index).innerHTML;
      boardRepresentation[j][k] = (value != '&nbsp;') ? value : [];
    }
  }
  return boardRepresentation;
}

function getInvalidRows(boardRepresentation) {
  var message = '';
  for (var row=0; row<9; row++) {
    // get row
    var temp = JSON.parse(JSON.stringify(boardRepresentation[row]));
    temp.sort();
    // check for repeats
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        if ((i != j) && (temp[i] != '&nbsp;') && (temp[j] != '&nbsp;') && (temp[i] === temp[j])) {
          message += '\n' + temp[i] + ' is repeated in row ' + (row+1);
        }
      }
    }
  }
  return message ? 'Invalid columns: \n' + message : '';
}

function getInvalidCols(boardRepresentation) {
  var message = '';
  for (var col=0; col<9; col++) {
    // get column
    var temp = [];
    for (var row=0; row<9; row++) {
      if (boardRepresentation[row][col] != '&nbsp;') {
        temp.push(boardRepresentation[row][col]);
      } else {
        temp.push([]);
      }
    }
    temp.sort();
    // check for repeats
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        if ((i != j) && (temp[i]) && (temp[j]) && (temp[i] == temp[j])) {
          message += '\n' + temp[i] + ' is repeated in column ' + (col+1);
        }
      }
    }
  }
  return message ? 'Invalid column(s): \n' + message : '';
}

function getInvalidSquares(boardRepresentation) {
  var message = '';
  for (var row=0; row<9; row+=3) {
    // get square
    var temp = [];
    temp.push(boardRepresentation[row][row]);
    temp.push(boardRepresentation[row][row+1]);
    temp.push(boardRepresentation[row][row+2]);
    
    temp.push(boardRepresentation[row+1][row]);
    temp.push(boardRepresentation[row+1][row+1]);
    temp.push(boardRepresentation[row+1][row+2]);
    
    temp.push(boardRepresentation[row+2][row]);
    temp.push(boardRepresentation[row+2][row+1]);
    temp.push(boardRepresentation[row+2][row+2]);
    
    temp.sort();
    // check for repeats
    for (var i=0; i<9; i++) {
      for (var j=0; j<9; j++) {
        if ((i != j) && (temp[i]) && (temp[j]) && (temp[i] == temp[j])) {
          message += '\n' + temp[i] + ' is repeated in a square';
        }
      }
    }
  }
  return message ? 'Invalid square(s) info: \n' + message : '';
}

function checkBoard() {
  var boardRepresentation = buildRepresentationCopyOfBoard();
  var errorMessage = '';
  
  // check for conflicts
  var invalidRows = getInvalidRows(boardRepresentation);
  var invalidCols = getInvalidCols(boardRepresentation);
  var invalidSquares = getInvalidSquares(boardRepresentation);
  errorMessage += invalidRows;
  errorMessage += invalidCols ? '\n\n' + invalidCols : '';
  errorMessage += invalidSquares ? '\n\n' + invalidSquares : '';
  alert(errorMessage ? errorMessage : 'No conflicts! :)');
  
  // check if solved
  var count = 0;
  for (var row=0; row<9; row++) {
    for (var col=0; col<9; col++) {
      var index = (row + 1) + '' + (col + 1);
      if (document.getElementById(index).innerHTML != '&nbsp;') {
        count++;
      }
    }
  }
  if (count == 9*9 && !errorMessage) {
    alert('Solved!');
  }
}