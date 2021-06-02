var currentID = "";

window.onload = function () {
  setUpModal();
  fillBoard();
};

function setUpModal() {
  var modal = document.getElementById("myModal");

  // if click on buttons
  var buttonsCloseModal = document.getElementsByClassName("enterModalInput");
  buttonsCloseModal[0].onclick = function () {
    doTheActualSet();
    // modal.style.display = "none";
  };
  buttonsCloseModal[1].onclick = function () {
    clearCell();
    // modal.style.display = "none";
  };

  // if hit enter key
  var input = document.getElementById("modal-input");
  input.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 || e.code === "Enter") {
      doTheActualSet();
      modal.style.display = "none";
    }
  });

  // // if click on the x button
  // var spanCloseModal = document.getElementsByClassName("closeModal")[0];
  // spanCloseModal.onclick = function () {
  //   modal.style.display = "none";
  // };

  // // if click outside of the modal
  // window.onclick = function (event) {
  //   if (event.target === modal) {
  //     modal.style.display = "none";
  //   }
  // };

  makeModalDraggable();
}

function numberPadSet(number) {
  var input = document.getElementById("modal-input");
  input.value = number;
}

function clearCell() {
  var text = "&nbsp;";
  var background = "#555";
  var color = "white";
  var selectedElements = document.querySelectorAll("[selected]");
  for (var i = 0; i < selectedElements.length; i++) {
    var selectedElement = selectedElements[i];
    update(selectedElement, text, background, color);
  }

  document.getElementById("modal-input").value = "";
}

function doTheActualSet() {
  var input = document.getElementById("modal-input").value;
  // var input = prompt('Enter a number from 1 to 9.');
  if (input === "") {
    // clear value
    var text = "&nbsp;";
    var background = "#555";
    var color = "white";
    var selectedElements = document.querySelectorAll("[selected]");
    for (var i = 0; i < selectedElements.length; i++) {
      var selectedElement = selectedElements[i];
      update(selectedElement, text, background, color);
    }
  } else if (!isNaN(input) && input < 10 && input > 0) {
    // set value
    var text = input;
    var background = "lightgrey";
    var color = "black";
    var selectedElements = document.querySelectorAll("[selected]");
    for (var i = 0; i < selectedElements.length; i++) {
      var selectedElement = selectedElements[i];
      update(selectedElement, text, background, color);
    }
  } else {
    alert("You must enter a number from 1 and 9.");
  }
}

function update(element, text, background, color) {
  element.innerHTML = text;
  element.style.background = background;
  element.style.color = color;
  element.removeAttribute("selected");
}

function keyboardEnterNumber(event) {
  var keynum;

  if (window.event) {
    // IE
    keynum = event.keyCode;
  } else if (event.which) {
    // Netscape/Firefox/Opera
    keynum = event.which;
  }

  var char = parseInt(String.fromCharCode(keynum));

  if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(char)) {
    document.getElementById("modal-input").value = char;
    doTheActualSet();
    document.getElementById("myModal").style.display = "none";
  } else if (keynum === 13 || event.code === "Enter") {
    document.getElementById("myModal").style.display = "none";
  }
}

function set(id) {
  currentID = id;
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var currentCell = document.getElementById(currentID);
  currentCell.style.background = "green";
  currentCell.setAttribute("selected", true);
  // document.getElementById("myModal").focus();
  // document.getElementById("modal-input").focus(); // disable focus on input to prevent "bouncing" in touchscreen interfaces
}

function inputAction() {
  var input = document.getElementById("input").value;
  var reg = /(\D|\d{2,})/;
  document.getElementById("input").value = input.replace(reg, "");
}

function shuffleArray(array) {
  for (var i = 0; i < array.length; i++) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getRandomRow() {
  return shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
}

function setFixedNumberCell(row, col, boardRepresentation) {
  var index = row + 1 + "" + (col + 1);
  document.getElementById(index).disabled = true;
  document.getElementById(index).style.background = "black";
  document.getElementById(index).style.color = "white";
  document.getElementById(index).innerHTML = boardRepresentation[row][col];
  document.getElementById(index).removeAttribute("selected");
}

function setBlankCell(row, col, boardRepresentation) {
  var index = row + 1 + "" + (col + 1);
  document.getElementById(index).disabled = false;
  document.getElementById(index).style.background = "#555";
  document.getElementById(index).style.color = "white";
  document.getElementById(index).innerHTML = "&nbsp;";
  document.getElementById(index).removeAttribute("selected");
}

function generateBoard(callback) {
  var boardRepresentation = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  var rowIndex = 0; // Math.floor(Math.random() * 9) + 0;
  boardRepresentation[rowIndex] = getRandomRow();
  solve(boardRepresentation, function (solution) {
    callback(solution);
  });
}

function fillBoard() {
  generateBoard(function (response) {
    var boardRepresentation = response;
    for (var j = 0; j < 9; j++) {
      for (var k = 0; k < 9; k++) {
        var coin = Math.random();
        if (coin < 0.5) {
          // TODO: need better algorithm
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
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [], // 9 rows
  ];
  for (var j = 0; j < 9; j++) {
    for (var k = 0; k < 9; k++) {
      setBlankCell(j, k, boardRepresentation);
    }
  }
}

function buildRepresentationCopyOfBoard() {
  var boardRepresentation = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [], // 9 rows
  ];
  for (var j = 0; j < 9; j++) {
    for (var k = 0; k < 9; k++) {
      var index = j + 1 + "" + (k + 1);
      var value = document.getElementById(index).innerHTML;
      boardRepresentation[j][k] = value != "&nbsp;" ? value : [];
    }
  }
  return boardRepresentation;
}

function getInvalidRows(boardRepresentation) {
  var message = "";
  for (var row = 0; row < 9; row++) {
    // get row
    var temp = JSON.parse(JSON.stringify(boardRepresentation[row]));
    temp.sort();
    // check for repeats
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (
          i != j &&
          temp[i] != "&nbsp;" &&
          temp[j] != "&nbsp;" &&
          temp[i] === temp[j]
        ) {
          message += "\n" + temp[i] + " is repeated in row " + (row + 1);
        }
      }
    }
  }
  return message ? "Invalid columns: \n" + message : "";
}

function getInvalidCols(boardRepresentation) {
  var message = "";
  for (var col = 0; col < 9; col++) {
    // get column
    var temp = [];
    for (var row = 0; row < 9; row++) {
      if (boardRepresentation[row][col] != "&nbsp;") {
        temp.push(boardRepresentation[row][col]);
      } else {
        temp.push([]);
      }
    }
    temp.sort();
    // check for repeats
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (i != j && temp[i] && temp[j] && temp[i] === temp[j]) {
          message += "\n" + temp[i] + " is repeated in column " + (col + 1);
        }
      }
    }
  }
  return message ? "Invalid column(s): \n" + message : "";
}

function getInvalidSquares(boardRepresentation) {
  var message = "";
  for (var row = 0; row < 9; row += 3) {
    // get square
    var temp = [];
    temp.push(boardRepresentation[row][row]);
    temp.push(boardRepresentation[row][row + 1]);
    temp.push(boardRepresentation[row][row + 2]);

    temp.push(boardRepresentation[row + 1][row]);
    temp.push(boardRepresentation[row + 1][row + 1]);
    temp.push(boardRepresentation[row + 1][row + 2]);

    temp.push(boardRepresentation[row + 2][row]);
    temp.push(boardRepresentation[row + 2][row + 1]);
    temp.push(boardRepresentation[row + 2][row + 2]);

    temp.sort();
    // check for repeats
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (i != j && temp[i] && temp[j] && temp[i] === temp[j]) {
          message += "\n" + temp[i] + " is repeated in a square";
        }
      }
    }
  }
  return message ? "Invalid square(s) info: \n" + message : "";
}

function checkBoard() {
  var boardRepresentation = buildRepresentationCopyOfBoard();
  var errorMessage = "";

  // check for conflicts
  var invalidRows = getInvalidRows(boardRepresentation);
  var invalidCols = getInvalidCols(boardRepresentation);
  var invalidSquares = getInvalidSquares(boardRepresentation);
  errorMessage += invalidRows;
  errorMessage += invalidCols ? "\n\n" + invalidCols : "";
  errorMessage += invalidSquares ? "\n\n" + invalidSquares : "";

  // check if solved
  var count = 0;
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      var index = row + 1 + "" + (col + 1);
      if (document.getElementById(index).innerHTML != "&nbsp;") {
        count++;
      }
    }
  }
  if (count === 9 * 9 && !errorMessage) {
    alert("Solved! :)");
    celebrate();
  } else {
    alert(errorMessage ? errorMessage : "No conflicts so far! :)");
  }
}

function confettiPiece() {
  var div = document.createElement("div");
  div.style.width = "10px";
  div.style.height = "10px";
  div.style.position = "fixed";
  var colourChoice = Math.floor(Math.random() * 5);
  if (colourChoice === 0) {
    div.style.background = "red";
  } else if (colourChoice === 1) {
    div.style.background = "white";
  } else if (colourChoice === 2) {
    div.style.background = "blue";
  } else if (colourChoice === 3) {
    div.style.background = "green";
  } else if (colourChoice === 4) {
    div.style.background = "yellow";
  }
  div.style.transform = "rotate(20deg)";

  var pos = Math.random() * -100;
  var leftStart = Math.random() * window.innerWidth;
  var speed = Math.random() * 100 + 10;
  var timer = setInterval(frame, 100);
  function frame() {
    if (pos >= window.innerHeight) {
      clearInterval(timer);
      div.parentNode.removeChild(div);
    } else {
      pos += speed;
      div.style.top = pos + "px";
      div.style.left = leftStart + Math.random() * 10 + "px";
      div.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    }
  }

  document.getElementById("confetti-box").appendChild(div);
}

function celebrate() {
  for (var i = 0; i < 150; i++) {
    confettiPiece();
  }
}

function solve(boardRepresentation, callback) {
  var xmlhttp = new XMLHttpRequest(); // for compatibility
  xmlhttp.onreadystatechange = function () {
    var XMLHttpRequestDONE = XMLHttpRequest.DONE || 4; // for compatibility
    if (xmlhttp.readyState === XMLHttpRequestDONE) {
      var solution = JSON.parse(xmlhttp.responseText).solution;
      callback(solution);
    }
  };
  xmlhttp.open("POST", "https://sugoku.herokuapp.com/solve", true);
  xmlhttp.send();
}

function makeModalDraggable() {
  var modal = document.querySelector(".modal-content");
  var settings = {};
  makeElementDraggable(modal, settings);
}
