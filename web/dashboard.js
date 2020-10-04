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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xpZW50L2Rhc2hib2FyZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLGFBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsU0FBQSxFQUFBOztBQUFBLE1BQUEsR0FBUzs7QUFDVCxLQUFBLEdBQVE7O0FBQ1IsYUFBQSxHQUFnQjs7QUFFaEIsTUFBQSxHQUFTLFFBQUEsQ0FBQSxDQUFBO0FBQ1QsTUFBQSxZQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxZQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtFQUFFLElBQU8sYUFBUDtJQUNFLFFBQVEsQ0FBQyxjQUFULENBQXdCLE1BQXhCLENBQStCLENBQUMsU0FBaEMsR0FBNEM7QUFDNUMsV0FGRjs7RUFJQSxJQUFBLEdBQU87RUFDUCxJQUFBLElBQVEsQ0FBQSxvQkFBQSxDQUFBLENBQ2dCLEtBQUssQ0FBQyxLQUR0QixDQUFBLE1BQUE7RUFJUixJQUFBLElBQVEsQ0FBQTs7cUNBQUE7RUFNUixZQUFBLEdBQWU7QUFDZjtFQUFBLEtBQUEscUNBQUE7O0lBQ0UsWUFBQSxHQUFlO0lBQ2YsSUFBRyxJQUFJLENBQUMsRUFBTCxLQUFXLGFBQWQ7TUFDRSxZQUFBLElBQWdCO01BQ2hCLFlBQUEsR0FBZSxJQUFJLENBQUMsTUFGdEI7O0lBR0EsSUFBQSxJQUFRLENBQUEsK0JBQUEsQ0FBQSxDQUMyQixZQUQzQixDQUFBLHFCQUFBLENBQUEsQ0FDK0QsSUFBSSxDQUFDLEVBRHBFLENBQUEsR0FBQSxDQUFBLENBQzRFLElBQUksQ0FBQyxJQURqRixDQUFBLE1BQUE7RUFMVjtFQVNBLElBQUEsSUFBUSxDQUFBOztvQ0FBQTtBQU1SO0VBQUEsS0FBQSx3Q0FBQTs7SUFDRSxZQUFBLEdBQWU7SUFDZixJQUFHLElBQUksQ0FBQyxFQUFMLEtBQVcsWUFBZDtNQUNFLFlBQUEsSUFBZ0Isa0JBRGxCOztJQUVBLElBQUEsSUFBUSxDQUFBLDhCQUFBLENBQUEsQ0FDMEIsWUFEMUIsQ0FBQSxvQkFBQSxDQUFBLENBQzZELElBQUksQ0FBQyxFQURsRSxDQUFBLEdBQUEsQ0FBQSxDQUMwRSxJQUFJLENBQUMsSUFEL0UsQ0FBQSxNQUFBO0VBSlY7RUFRQSxJQUFBLElBQVEsQ0FBQTtNQUFBO1NBSVIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBK0IsQ0FBQyxTQUFoQyxHQUE0QztBQTVDckM7O0FBOENULFNBQUEsR0FBWSxRQUFBLENBQUMsRUFBRCxDQUFBO0FBQ1osTUFBQSxhQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7RUFBRSxhQUFBLEdBQWdCO0VBQ2hCLGFBQUEsR0FBZ0I7QUFDaEI7RUFBQSxLQUFBLHFDQUFBOztJQUNFLElBQUcsSUFBSSxDQUFDLE9BQVI7TUFDRSxhQUFBLEdBQWdCLElBQUksQ0FBQyxHQUR2Qjs7SUFFQSxJQUFHLElBQUksQ0FBQyxFQUFMLEtBQVcsRUFBZDtNQUNFLGFBQUEsR0FBZ0I7QUFDaEIsWUFGRjs7RUFIRjtFQU1BLElBQU8scUJBQVA7SUFDRSxhQUFBLEdBQWdCLGNBRGxCOztTQUVBLE1BQUEsQ0FBQTtBQVhVOztBQWFaLFFBQUEsR0FBVyxRQUFBLENBQUMsRUFBRCxDQUFBO0VBQ1QsSUFBTyxxQkFBUDtBQUNFLFdBREY7O0VBR0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLFFBQUEsQ0FBQSxDQUFXLGFBQVgsQ0FBQSxJQUFBLENBQUEsQ0FBK0IsRUFBL0IsQ0FBQSxDQUFaO1NBQ0EsTUFBTSxDQUFDLElBQVAsQ0FBWSxLQUFaLEVBQW1CO0lBQ2pCLE1BQUEsRUFBUSxhQURTO0lBRWpCLEtBQUEsRUFBTztFQUZVLENBQW5CO0FBTFM7O0FBVVgsSUFBQSxHQUFPLFFBQUEsQ0FBQSxDQUFBO0VBQ0wsTUFBTSxDQUFDLFFBQVAsR0FBa0I7RUFDbEIsTUFBTSxDQUFDLFNBQVAsR0FBbUI7RUFFbkIsTUFBQSxHQUFTLEVBQUEsQ0FBQTtTQUNULE1BQU0sQ0FBQyxFQUFQLENBQVUsU0FBVixFQUFxQixRQUFBLENBQUMsUUFBRCxDQUFBO0FBQ3ZCLFFBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7SUFBSSxPQUFPLENBQUMsR0FBUixDQUFZLE9BQVosRUFBcUIsUUFBckI7SUFDQSxLQUFBLEdBQVE7SUFDUixJQUFPLHFCQUFQO0FBQ0U7TUFBQSxLQUFBLHFDQUFBOztRQUNFLElBQUcsSUFBSSxDQUFDLE9BQVI7VUFDRSxhQUFBLEdBQWdCLElBQUksQ0FBQyxHQUR2Qjs7TUFERixDQURGOztXQUlBLE1BQUEsQ0FBQTtFQVBtQixDQUFyQjtBQUxLOztBQWNQLE1BQU0sQ0FBQyxNQUFQLEdBQWdCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwic29ja2V0ID0gbnVsbFxyXG5wb3J0cyA9IG51bGxcclxuY3VycmVudE91dHB1dCA9IG51bGxcclxuXHJcbnJlbmRlciA9IC0+XHJcbiAgaWYgbm90IHBvcnRzP1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpLmlubmVySFRNTCA9IFwiaXMgdGhlIG1hdHJpeCBvbj9cIlxyXG4gICAgcmV0dXJuXHJcblxyXG4gIGh0bWwgPSBcIlwiXHJcbiAgaHRtbCArPSBcIlwiXCJcclxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj4je3BvcnRzLnRpdGxlfTwvZGl2PlxyXG4gICAgXCJcIlwiXHJcblxyXG4gIGh0bWwgKz0gXCJcIlwiXHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwic21hbGxoZWFkZXJcIj5PdXRwdXQ8L2Rpdj5cclxuICAgIFwiXCJcIlxyXG5cclxuICBjdXJyZW50SW5wdXQgPSAwXHJcbiAgZm9yIHBvcnQgaW4gcG9ydHMub3V0cHV0c1xyXG4gICAgb3RoZXJDbGFzc2VzID0gXCJcIlxyXG4gICAgaWYgcG9ydC5pZCA9PSBjdXJyZW50T3V0cHV0XHJcbiAgICAgIG90aGVyQ2xhc3NlcyArPSBcIiBzZWxlY3RlZGJ1dHRvblwiXHJcbiAgICAgIGN1cnJlbnRJbnB1dCA9IHBvcnQuaW5wdXRcclxuICAgIGh0bWwgKz0gXCJcIlwiXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gb3V0cHV0YnV0dG9uI3tvdGhlckNsYXNzZXN9XCIgb25jbGljaz1cInNldE91dHB1dCgje3BvcnQuaWR9KVwiPiN7cG9ydC5uYW1lfTwvZGl2PlxyXG4gICAgXCJcIlwiXHJcblxyXG4gIGh0bWwgKz0gXCJcIlwiXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbGhlYWRlclwiPklucHV0PC9kaXY+XHJcbiAgXCJcIlwiXHJcblxyXG4gIGZvciBwb3J0IGluIHBvcnRzLmlucHV0c1xyXG4gICAgb3RoZXJDbGFzc2VzID0gXCJcIlxyXG4gICAgaWYgcG9ydC5pZCA9PSBjdXJyZW50SW5wdXRcclxuICAgICAgb3RoZXJDbGFzc2VzICs9IFwiIHNlbGVjdGVkYnV0dG9uXCJcclxuICAgIGh0bWwgKz0gXCJcIlwiXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gaW5wdXRidXR0b24je290aGVyQ2xhc3Nlc31cIiBvbmNsaWNrPVwic2V0SW5wdXQoI3twb3J0LmlkfSlcIj4je3BvcnQubmFtZX08L2Rpdj5cclxuICAgIFwiXCJcIlxyXG5cclxuICBodG1sICs9IFwiXCJcIlxyXG4gICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBcIlwiXCJcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIikuaW5uZXJIVE1MID0gaHRtbFxyXG5cclxuc2V0T3V0cHV0ID0gKGlkKSAtPlxyXG4gIGRlZmF1bHRPdXRwdXQgPSBudWxsXHJcbiAgY3VycmVudE91dHB1dCA9IG51bGxcclxuICBmb3IgcG9ydCBpbiBwb3J0cy5vdXRwdXRzXHJcbiAgICBpZiBwb3J0LmRlZmF1bHRcclxuICAgICAgZGVmYXVsdE91dHB1dCA9IHBvcnQuaWRcclxuICAgIGlmIHBvcnQuaWQgPT0gaWRcclxuICAgICAgY3VycmVudE91dHB1dCA9IGlkXHJcbiAgICAgIGJyZWFrXHJcbiAgaWYgbm90IGN1cnJlbnRPdXRwdXQ/XHJcbiAgICBjdXJyZW50T3V0cHV0ID0gZGVmYXVsdE91dHB1dFxyXG4gIHJlbmRlcigpXHJcblxyXG5zZXRJbnB1dCA9IChpZCkgLT5cclxuICBpZiBub3QgY3VycmVudE91dHB1dD9cclxuICAgIHJldHVyblxyXG5cclxuICBjb25zb2xlLmxvZyBcInNldHRpbmcgI3tjdXJyZW50T3V0cHV0fSAtPiAje2lkfVwiXHJcbiAgc29ja2V0LmVtaXQgJ3NldCcsIHtcclxuICAgIG91dHB1dDogY3VycmVudE91dHB1dFxyXG4gICAgaW5wdXQ6IGlkXHJcbiAgfVxyXG5cclxuaW5pdCA9IC0+XHJcbiAgd2luZG93LnNldElucHV0ID0gc2V0SW5wdXRcclxuICB3aW5kb3cuc2V0T3V0cHV0ID0gc2V0T3V0cHV0XHJcblxyXG4gIHNvY2tldCA9IGlvKClcclxuICBzb2NrZXQub24gJ3JlZnJlc2gnLCAocG9ydHNQa3QpIC0+XHJcbiAgICBjb25zb2xlLmxvZyBcIlBLVDogXCIsIHBvcnRzUGt0XHJcbiAgICBwb3J0cyA9IHBvcnRzUGt0XHJcbiAgICBpZiBub3QgY3VycmVudE91dHB1dD9cclxuICAgICAgZm9yIHBvcnQgaW4gcG9ydHMub3V0cHV0c1xyXG4gICAgICAgIGlmIHBvcnQuZGVmYXVsdFxyXG4gICAgICAgICAgY3VycmVudE91dHB1dCA9IHBvcnQuaWRcclxuICAgIHJlbmRlcigpXHJcblxyXG53aW5kb3cub25sb2FkID0gaW5pdFxyXG4iXX0=
