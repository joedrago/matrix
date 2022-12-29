(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var currentOutput, init, ports, render, setInput, setOutput, socket;

socket = null;

ports = null;

currentOutput = null;

render = function() {
  var currentInput, html, i, j, len, len1, otherClasses, port, ref, ref1;
  if (ports == null) {
    document.getElementById("main").innerHTML = "is the matrix on?";
    return;
  }
  html = "";
  html += `<div class="header">${ports.title}</div>`;
  html += `<div class="row">
<div class="column">
<div class="smallheader">Output</div>`;
  currentInput = 0;
  ref = ports.outputs;
  for (i = 0, len = ref.length; i < len; i++) {
    port = ref[i];
    otherClasses = "";
    if (port.id === currentOutput) {
      otherClasses += " selectedbutton";
      currentInput = port.input;
    }
    html += `<div class="button outputbutton${otherClasses}" onclick="setOutput(${port.id})">${port.name}</div>`;
  }
  html += `</div>
<div class="column">
<div class="smallheader">Input</div>`;
  ref1 = ports.inputs;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    port = ref1[j];
    otherClasses = "";
    if (port.id === currentInput) {
      otherClasses += " selectedbutton";
    }
    html += `<div class="button inputbutton${otherClasses}" onclick="setInput(${port.id})">${port.name}</div>`;
  }
  html += `</div>
</div>`;
  return document.getElementById("main").innerHTML = html;
};

setOutput = function(id) {
  var defaultOutput, i, len, port, ref;
  defaultOutput = null;
  currentOutput = null;
  ref = ports.outputs;
  for (i = 0, len = ref.length; i < len; i++) {
    port = ref[i];
    if (port.default) {
      defaultOutput = port.id;
    }
    if (port.id === id) {
      currentOutput = id;
      break;
    }
  }
  if (currentOutput == null) {
    currentOutput = defaultOutput;
  }
  return render();
};

setInput = function(id) {
  if (currentOutput == null) {
    return;
  }
  console.log(`setting ${currentOutput} -> ${id}`);
  return socket.emit('set', {
    output: currentOutput,
    input: id
  });
};

init = function() {
  window.setInput = setInput;
  window.setOutput = setOutput;
  socket = io();
  return socket.on('refresh', function(portsPkt) {
    var i, len, port, ref;
    console.log("PKT: ", portsPkt);
    ports = portsPkt;
    if (currentOutput == null) {
      ref = ports.outputs;
      for (i = 0, len = ref.length; i < len; i++) {
        port = ref[i];
        if (port.default) {
          currentOutput = port.id;
        }
      }
    }
    return render();
  });
};

window.onload = init;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xpZW50L2Rhc2hib2FyZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLGFBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsU0FBQSxFQUFBOztBQUFBLE1BQUEsR0FBUzs7QUFDVCxLQUFBLEdBQVE7O0FBQ1IsYUFBQSxHQUFnQjs7QUFFaEIsTUFBQSxHQUFTLFFBQUEsQ0FBQSxDQUFBO0FBQ1QsTUFBQSxZQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxZQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtFQUFFLElBQU8sYUFBUDtJQUNFLFFBQVEsQ0FBQyxjQUFULENBQXdCLE1BQXhCLENBQStCLENBQUMsU0FBaEMsR0FBNEM7QUFDNUMsV0FGRjs7RUFJQSxJQUFBLEdBQU87RUFDUCxJQUFBLElBQVEsQ0FBQSxvQkFBQSxDQUFBLENBQ2dCLEtBQUssQ0FBQyxLQUR0QixDQUFBLE1BQUE7RUFJUixJQUFBLElBQVEsQ0FBQTs7cUNBQUE7RUFNUixZQUFBLEdBQWU7QUFDZjtFQUFBLEtBQUEscUNBQUE7O0lBQ0UsWUFBQSxHQUFlO0lBQ2YsSUFBRyxJQUFJLENBQUMsRUFBTCxLQUFXLGFBQWQ7TUFDRSxZQUFBLElBQWdCO01BQ2hCLFlBQUEsR0FBZSxJQUFJLENBQUMsTUFGdEI7O0lBR0EsSUFBQSxJQUFRLENBQUEsK0JBQUEsQ0FBQSxDQUMyQixZQUQzQixDQUFBLHFCQUFBLENBQUEsQ0FDK0QsSUFBSSxDQUFDLEVBRHBFLENBQUEsR0FBQSxDQUFBLENBQzRFLElBQUksQ0FBQyxJQURqRixDQUFBLE1BQUE7RUFMVjtFQVNBLElBQUEsSUFBUSxDQUFBOztvQ0FBQTtBQU1SO0VBQUEsS0FBQSx3Q0FBQTs7SUFDRSxZQUFBLEdBQWU7SUFDZixJQUFHLElBQUksQ0FBQyxFQUFMLEtBQVcsWUFBZDtNQUNFLFlBQUEsSUFBZ0Isa0JBRGxCOztJQUVBLElBQUEsSUFBUSxDQUFBLDhCQUFBLENBQUEsQ0FDMEIsWUFEMUIsQ0FBQSxvQkFBQSxDQUFBLENBQzZELElBQUksQ0FBQyxFQURsRSxDQUFBLEdBQUEsQ0FBQSxDQUMwRSxJQUFJLENBQUMsSUFEL0UsQ0FBQSxNQUFBO0VBSlY7RUFRQSxJQUFBLElBQVEsQ0FBQTtNQUFBO1NBSVIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBK0IsQ0FBQyxTQUFoQyxHQUE0QztBQTVDckM7O0FBOENULFNBQUEsR0FBWSxRQUFBLENBQUMsRUFBRCxDQUFBO0FBQ1osTUFBQSxhQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7RUFBRSxhQUFBLEdBQWdCO0VBQ2hCLGFBQUEsR0FBZ0I7QUFDaEI7RUFBQSxLQUFBLHFDQUFBOztJQUNFLElBQUcsSUFBSSxDQUFDLE9BQVI7TUFDRSxhQUFBLEdBQWdCLElBQUksQ0FBQyxHQUR2Qjs7SUFFQSxJQUFHLElBQUksQ0FBQyxFQUFMLEtBQVcsRUFBZDtNQUNFLGFBQUEsR0FBZ0I7QUFDaEIsWUFGRjs7RUFIRjtFQU1BLElBQU8scUJBQVA7SUFDRSxhQUFBLEdBQWdCLGNBRGxCOztTQUVBLE1BQUEsQ0FBQTtBQVhVOztBQWFaLFFBQUEsR0FBVyxRQUFBLENBQUMsRUFBRCxDQUFBO0VBQ1QsSUFBTyxxQkFBUDtBQUNFLFdBREY7O0VBR0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLFFBQUEsQ0FBQSxDQUFXLGFBQVgsQ0FBQSxJQUFBLENBQUEsQ0FBK0IsRUFBL0IsQ0FBQSxDQUFaO1NBQ0EsTUFBTSxDQUFDLElBQVAsQ0FBWSxLQUFaLEVBQW1CO0lBQ2pCLE1BQUEsRUFBUSxhQURTO0lBRWpCLEtBQUEsRUFBTztFQUZVLENBQW5CO0FBTFM7O0FBVVgsSUFBQSxHQUFPLFFBQUEsQ0FBQSxDQUFBO0VBQ0wsTUFBTSxDQUFDLFFBQVAsR0FBa0I7RUFDbEIsTUFBTSxDQUFDLFNBQVAsR0FBbUI7RUFFbkIsTUFBQSxHQUFTLEVBQUEsQ0FBQTtTQUNULE1BQU0sQ0FBQyxFQUFQLENBQVUsU0FBVixFQUFxQixRQUFBLENBQUMsUUFBRCxDQUFBO0FBQ3ZCLFFBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7SUFBSSxPQUFPLENBQUMsR0FBUixDQUFZLE9BQVosRUFBcUIsUUFBckI7SUFDQSxLQUFBLEdBQVE7SUFDUixJQUFPLHFCQUFQO0FBQ0U7TUFBQSxLQUFBLHFDQUFBOztRQUNFLElBQUcsSUFBSSxDQUFDLE9BQVI7VUFDRSxhQUFBLEdBQWdCLElBQUksQ0FBQyxHQUR2Qjs7TUFERixDQURGOztXQUlBLE1BQUEsQ0FBQTtFQVBtQixDQUFyQjtBQUxLOztBQWNQLE1BQU0sQ0FBQyxNQUFQLEdBQWdCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwic29ja2V0ID0gbnVsbFxucG9ydHMgPSBudWxsXG5jdXJyZW50T3V0cHV0ID0gbnVsbFxuXG5yZW5kZXIgPSAtPlxuICBpZiBub3QgcG9ydHM/XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpLmlubmVySFRNTCA9IFwiaXMgdGhlIG1hdHJpeCBvbj9cIlxuICAgIHJldHVyblxuXG4gIGh0bWwgPSBcIlwiXG4gIGh0bWwgKz0gXCJcIlwiXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPiN7cG9ydHMudGl0bGV9PC9kaXY+XG4gICAgXCJcIlwiXG5cbiAgaHRtbCArPSBcIlwiXCJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbGhlYWRlclwiPk91dHB1dDwvZGl2PlxuICAgIFwiXCJcIlxuXG4gIGN1cnJlbnRJbnB1dCA9IDBcbiAgZm9yIHBvcnQgaW4gcG9ydHMub3V0cHV0c1xuICAgIG90aGVyQ2xhc3NlcyA9IFwiXCJcbiAgICBpZiBwb3J0LmlkID09IGN1cnJlbnRPdXRwdXRcbiAgICAgIG90aGVyQ2xhc3NlcyArPSBcIiBzZWxlY3RlZGJ1dHRvblwiXG4gICAgICBjdXJyZW50SW5wdXQgPSBwb3J0LmlucHV0XG4gICAgaHRtbCArPSBcIlwiXCJcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gb3V0cHV0YnV0dG9uI3tvdGhlckNsYXNzZXN9XCIgb25jbGljaz1cInNldE91dHB1dCgje3BvcnQuaWR9KVwiPiN7cG9ydC5uYW1lfTwvZGl2PlxuICAgIFwiXCJcIlxuXG4gIGh0bWwgKz0gXCJcIlwiXG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbGhlYWRlclwiPklucHV0PC9kaXY+XG4gIFwiXCJcIlxuXG4gIGZvciBwb3J0IGluIHBvcnRzLmlucHV0c1xuICAgIG90aGVyQ2xhc3NlcyA9IFwiXCJcbiAgICBpZiBwb3J0LmlkID09IGN1cnJlbnRJbnB1dFxuICAgICAgb3RoZXJDbGFzc2VzICs9IFwiIHNlbGVjdGVkYnV0dG9uXCJcbiAgICBodG1sICs9IFwiXCJcIlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBpbnB1dGJ1dHRvbiN7b3RoZXJDbGFzc2VzfVwiIG9uY2xpY2s9XCJzZXRJbnB1dCgje3BvcnQuaWR9KVwiPiN7cG9ydC5uYW1lfTwvZGl2PlxuICAgIFwiXCJcIlxuXG4gIGh0bWwgKz0gXCJcIlwiXG4gICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIFwiXCJcIlxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIikuaW5uZXJIVE1MID0gaHRtbFxuXG5zZXRPdXRwdXQgPSAoaWQpIC0+XG4gIGRlZmF1bHRPdXRwdXQgPSBudWxsXG4gIGN1cnJlbnRPdXRwdXQgPSBudWxsXG4gIGZvciBwb3J0IGluIHBvcnRzLm91dHB1dHNcbiAgICBpZiBwb3J0LmRlZmF1bHRcbiAgICAgIGRlZmF1bHRPdXRwdXQgPSBwb3J0LmlkXG4gICAgaWYgcG9ydC5pZCA9PSBpZFxuICAgICAgY3VycmVudE91dHB1dCA9IGlkXG4gICAgICBicmVha1xuICBpZiBub3QgY3VycmVudE91dHB1dD9cbiAgICBjdXJyZW50T3V0cHV0ID0gZGVmYXVsdE91dHB1dFxuICByZW5kZXIoKVxuXG5zZXRJbnB1dCA9IChpZCkgLT5cbiAgaWYgbm90IGN1cnJlbnRPdXRwdXQ/XG4gICAgcmV0dXJuXG5cbiAgY29uc29sZS5sb2cgXCJzZXR0aW5nICN7Y3VycmVudE91dHB1dH0gLT4gI3tpZH1cIlxuICBzb2NrZXQuZW1pdCAnc2V0Jywge1xuICAgIG91dHB1dDogY3VycmVudE91dHB1dFxuICAgIGlucHV0OiBpZFxuICB9XG5cbmluaXQgPSAtPlxuICB3aW5kb3cuc2V0SW5wdXQgPSBzZXRJbnB1dFxuICB3aW5kb3cuc2V0T3V0cHV0ID0gc2V0T3V0cHV0XG5cbiAgc29ja2V0ID0gaW8oKVxuICBzb2NrZXQub24gJ3JlZnJlc2gnLCAocG9ydHNQa3QpIC0+XG4gICAgY29uc29sZS5sb2cgXCJQS1Q6IFwiLCBwb3J0c1BrdFxuICAgIHBvcnRzID0gcG9ydHNQa3RcbiAgICBpZiBub3QgY3VycmVudE91dHB1dD9cbiAgICAgIGZvciBwb3J0IGluIHBvcnRzLm91dHB1dHNcbiAgICAgICAgaWYgcG9ydC5kZWZhdWx0XG4gICAgICAgICAgY3VycmVudE91dHB1dCA9IHBvcnQuaWRcbiAgICByZW5kZXIoKVxuXG53aW5kb3cub25sb2FkID0gaW5pdFxuIl19
