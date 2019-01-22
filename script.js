var currentID = '';

window.onload = function() {
  setUpModal();
  fillBoard();
};

function setUpModal() {
  var modal = document.getElementById('myModal');
  
  // if click on buttons
  var buttonsCloseModal = document.getElementsByClassName("enterModalInput");
  buttonsCloseModal[0].onclick = function() {
    doTheActualSet();
    modal.style.display = "none";
  }
  buttonsCloseModal[1].onclick = function() {
    clearCell();
    modal.style.display = "none";
  }
  
  // if hit enter key
  var input = document.getElementById('modal-input');
  input.addEventListener('keypress', function(e){
    if (e.keyCode == 13) {
      doTheActualSet();
      modal.style.display = "none";
    }
  });
  
  // if click on the x button
  var spanCloseModal = document.getElementsByClassName("closeModal")[0];
  spanCloseModal.onclick = function() {
    modal.style.display = "none";
  }
  
  // if click outside of the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function numberPadSet(number) {
  var input = document.getElementById('modal-input');
  input.value = number;
}

function clearCell() {
  var id = currentID;
  
  document.getElementById(id).innerHTML = '&nbsp;';
  document.getElementById(id).style.background = '#555';
  document.getElementById(id).style.color = 'white';
  
  document.getElementById('modal-input').value = '';
}

function doTheActualSet() {
  var id = currentID;
  var input = document.getElementById('modal-input').value;
  // var input = prompt('Enter a number from 1 to 9.');
  if (input == '') {
    document.getElementById(id).innerHTML = '&nbsp;';
    document.getElementById(id).style.background = '#555';
    document.getElementById(id).style.color = 'white';
  } else if (!isNaN(input) && input < 10 && input > 0) {
    document.getElementById(id).innerHTML = input;
    document.getElementById(id).style.background = 'lightgrey';
    document.getElementById(id).style.color = 'black';
  } else {
    alert('You must enter a number from 1 and 9.');
  }
  document.getElementById('modal-input').value = '';
}

function set(id) {
  currentID = id;
  document.getElementById('modal-input').value = ''; // reset
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  // document.getElementById("modal-input").focus(); // disable focus to prevent "bouncing" interface
}

function inputAction() {
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
  return shuffleArray([1,2,3,4,5,6,7,8,9]);
}

function setFixedNumberCell(row, col, boardRepresentation) {
  var index = (row + 1) + '' + (col + 1);
  document.getElementById(index).disabled = true;
  document.getElementById(index).style.background = 'black';
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

function generateBoard(callback) {
  var boardRepresentation = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
  ];
  var rowIndex = 0; // Math.floor(Math.random() * 9) + 0;
  boardRepresentation[rowIndex] = getRandomRow();
  solve(boardRepresentation, function(solution) {
    callback(solution);
  });
}

function fillBoard() {
  generateBoard(function(response) {
    var boardRepresentation = response;
    for (var j=0; j<9; j++) {
      for (var k=0; k<9; k++) {
        var coin = Math.random();
        if (coin < 0.5) { // TODO: need better algorithm
          setFixedNumberCell(j, k, boardRepresentation);
        } else {
          setBlankCell(j, k, boardRepresentation);
        }
      }
    }
  });
}

function clearBoard() {
  var boardRepresentation = [
    [],[],[],[],[],[],[],[],[] // 9 rows
  ];
  for (var j=0; j<9; j++) {
    for (var k=0; k<9; k++) {
      setBlankCell(j, k, boardRepresentation);
    }
  }
}

function buildRepresentationCopyOfBoard() {
  var boardRepresentation = [
    [],[],[],[],[],[],[],[],[] // 9 rows
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
    alert('Solved! :)');
  } else {
    alert(errorMessage ? errorMessage : 'No conflicts so far! :)');
  }
}

function solve(boardRepresentation, callback) {
  var xmlhttp = new XMLHttpRequest(); // for compatibility
  xmlhttp.onreadystatechange = function() {
    var XMLHttpRequestDONE = XMLHttpRequest.DONE || 4; // for compatibility
    if (xmlhttp.readyState == XMLHttpRequestDONE) {
      var solution = JSON.parse(xmlhttp.responseText).solution;
      callback(solution);
    }
  };
  xmlhttp.open("POST", "https://sugoku.herokuapp.com/solve", true);
  xmlhttp.send();
}
