/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/audio.ts":
/*!**********************!*\
  !*** ./src/audio.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// manage audio part of project
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __webpack_require__(/*! ./global */ "./src/global.ts");
function visualizeMicrophone(visualize) {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => visualize(global_1.audioCtx.createMediaStreamSource(stream)))
        .catch(err => console.log("getUserMedia error: " + err));
}
exports.visualizeMicrophone = visualizeMicrophone;
// export function setSinWave() {
//     var oscillator = audioCtx.createOscillator();
//     oscillator.type = 'square';
//     oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // value in hertz
//     oscillator.start();
//     visualize(oscillator)
// }
// function visualize(audioNode: AudioNode) {
//     const source = audioNode;
//     const analyser = audioCtx.createAnalyser();
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);
//     analyser.fftSize = 2048;
//     source.connect(analyser);
//     draw()
//     function draw() {
//         const WIDTH = canvas.width
//         const HEIGHT = canvas.height;
//         requestAnimationFrame(draw);
//         analyser.getByteTimeDomainData(dataArray);
//         canvasCtx.fillStyle = 'rgb(200, 200, 200)';
//         canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
//         canvasCtx.lineWidth = 2;
//         canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
//         canvasCtx.beginPath();
//         let sliceWidth = WIDTH * 1.0 / bufferLength;
//         let x = 0;
//         for (let i = 0; i < bufferLength; i++) {
//             let v = dataArray[i] / 128.0;
//             let y = v * HEIGHT / 2;
//             if (i === 0) { canvasCtx.moveTo(x, y); }
//             else { canvasCtx.lineTo(x, y); }
//             x += sliceWidth;
//         }
//         canvasCtx.lineTo(canvas.width, canvas.height / 2);
//         canvasCtx.stroke();
//     }
// }
function getMaxFrequencyRange(freqArray, minFreq, maxFreq) {
    const maxFreqSample = global_1.audioCtx.sampleRate / 2;
    const minIndex = Math.round(minFreq / maxFreqSample * freqArray.length);
    const maxIndex = Math.round(maxFreq / maxFreqSample * freqArray.length);
    return Math.max(...freqArray.slice(minIndex, maxIndex)) / 256;
}
exports.getMaxFrequencyRange = getMaxFrequencyRange;


/***/ }),

/***/ "./src/draw.ts":
/*!*********************!*\
  !*** ./src/draw.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// manage visual part of project
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __webpack_require__(/*! ./global */ "./src/global.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function plotDebugCircle(radius = 200) {
    // DEBUG CIRCLE
    global_1.canvasCtx.beginPath();
    global_1.canvasCtx.lineWidth = 1;
    global_1.canvasCtx.strokeStyle = "blue";
    global_1.canvasCtx.arc(0, 0, radius, 0, 2 * Math.PI);
    global_1.canvasCtx.stroke();
}
exports.plotDebugCircle = plotDebugCircle;
function runningCircle({ frame, radius = 200, color = 'rgb(66,44,255)', shapeFactor = 5, frequencySpace = 12 }) {
    const shape = (angle, phase) => Math.cos((angle + phase) * frequencySpace) / shapeFactor;
    movingCircleFactory(frame, radius, color, shape);
}
exports.runningCircle = runningCircle;
function oscillatingCircle({ frame, radius = 200, color = 'rgb(66,44,255)', shapeFactor = 5, frequencySpace = 4 }) {
    const shape = (angle, phase) => Math.cos(phase) * Math.cos(frequencySpace * angle) / shapeFactor;
    movingCircleFactory(frame, radius, color, shape);
}
exports.oscillatingCircle = oscillatingCircle;
function movingCircleFactory(frame, radius, color, shapeFunction) {
    global_1.canvasCtx.beginPath();
    global_1.canvasCtx.lineWidth = 4;
    global_1.canvasCtx.strokeStyle = color;
    const phase = utils_1.degreesToRadians(frame); // As is, 1 degree (over 360) per animation
    Array.from(Array(360).keys()) // every degree
        .map(degree => utils_1.degreesToRadians(degree)) // rad
        .map(rad => ({
        x: radius * (shapeFunction(rad, phase) + 1) * Math.cos(rad),
        y: radius * (shapeFunction(rad, phase) + 1) * Math.sin(rad)
    }))
        .forEach(point => global_1.canvasCtx.lineTo(point.x, point.y));
    global_1.canvasCtx.stroke();
}


/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// export global variable across all the project
Object.defineProperty(exports, "__esModule", { value: true });
// viz
exports.canvas = document.getElementById('canvas');
exports.canvasCtx = exports.canvas.getContext('2d');
// control
exports.potar1 = document.getElementById('potar1');
exports.potar2 = document.getElementById('potar2');
// audio
exports.audioCtx = new window.AudioContext();


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// entrypoint
Object.defineProperty(exports, "__esModule", { value: true });
const audio_1 = __webpack_require__(/*! ./audio */ "./src/audio.ts");
const draw_1 = __webpack_require__(/*! ./draw */ "./src/draw.ts");
const global_1 = __webpack_require__(/*! ./global */ "./src/global.ts");
global_1.canvas.style.border = '1px solid #63eccd';
global_1.canvas.width = window.innerWidth * 2 / 3;
global_1.canvas.height = window.innerHeight * 4 / 5;
global_1.canvasCtx.translate(global_1.canvas.width / 2, global_1.canvas.height / 2);
var frame = 0; // Animation frame
// window.requestAnimationFrame(draw);
// function draw() {
//     canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
//     // context.save();
//     // Debug circle
//     plotDebugCircle();
//     // Running wavy circle
//     runningCircle({ frame })
//     // Oscillating wavy circle
//     oscillatingCircle({
//         frame,
//         frequencySpace: potar1.valueAsNumber,
//         shapeFactor: potar2.valueAsNumber
//     })
//     // context.restore();
//     frame++;
//     window.requestAnimationFrame(draw);
// }
audio_1.visualizeMicrophone(visualize);
function visualize(audioNode) {
    var source = audioNode;
    var analyser = global_1.audioCtx.createAnalyser();
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.fftSize = 2048;
    source.connect(analyser);
    draw();
    function draw() {
        global_1.canvasCtx.clearRect(-global_1.canvas.width / 2, -global_1.canvas.height / 2, global_1.canvas.width, global_1.canvas.height);
        analyser.getByteFrequencyData(dataArray);
        // At maximum, moving circle have an amplitude of 1/2 of the radius. Min is 1/10
        var shapeFactorBass1 = 10 - 8 * audio_1.getMaxFrequencyRange(dataArray, 1, 120);
        var shapeFactorBass2 = 10 - 8 * audio_1.getMaxFrequencyRange(dataArray, 120, 350);
        var shapeFactorMedium1 = 10 - 8 * audio_1.getMaxFrequencyRange(dataArray, 350, 600);
        var shapeFactorMedium2 = 10 - 8 * audio_1.getMaxFrequencyRange(dataArray, 600, 1000);
        var shapeFactorHigh = 10 - 8 * audio_1.getMaxFrequencyRange(dataArray, 1000, 10000);
        draw_1.runningCircle({ frame, color: 'mediumvioletred', shapeFactor: shapeFactorBass1 });
        draw_1.runningCircle({ frame, color: 'mediumslateblue', shapeFactor: shapeFactorBass2 });
        draw_1.runningCircle({ frame, color: 'olivedrab', shapeFactor: shapeFactorMedium1 });
        draw_1.runningCircle({ frame, color: 'mediumturquoise', shapeFactor: shapeFactorMedium2 });
        draw_1.runningCircle({ frame, color: 'mediumspringgreen', shapeFactor: shapeFactorHigh });
        frame++;
        requestAnimationFrame(draw);
    }
}


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// useful functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.degreesToRadians = (angle) => (Math.PI * angle) / 180;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1ZGlvLnRzIiwid2VicGFjazovLy8uL3NyYy9kcmF3LnRzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xGQSwrQkFBK0I7O0FBRS9CLHdFQUF1RDtBQUd2RCxTQUFnQixtQkFBbUIsQ0FBQyxTQUEyQztJQUMzRSxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsaUJBQVEsQ0FBQyx1QkFBdUIsQ0FB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LGtCQUFrQixHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsNEJBQW9CLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFDNUUsSUFBSSxlQUFlLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyw0QkFBb0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztRQUUzRSxvQkFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqRixvQkFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqRixvQkFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLENBQUM7UUFDN0Usb0JBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLENBQUM7UUFDbkYsb0JBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxDQUFDO1FBRWxGLEtBQUssRUFBRTtRQUNQLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ25FRCxtQkFBbUI7O0FBRU4sd0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvLyBtYW5hZ2UgYXVkaW8gcGFydCBvZiBwcm9qZWN0XG5cbmltcG9ydCB7IGF1ZGlvQ3R4LCBjYW52YXNDdHgsIGNhbnZhcyB9IGZyb20gXCIuL2dsb2JhbFwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiB2aXN1YWxpemVNaWNyb3Bob25lKHZpc3VhbGl6ZTogKChhdWRpb05vZGU6IEF1ZGlvTm9kZSkgPT4gdm9pZCkpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gICAgICAgIC50aGVuKHN0cmVhbSA9PiB2aXN1YWxpemUoYXVkaW9DdHguY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKSkpXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coXCJnZXRVc2VyTWVkaWEgZXJyb3I6IFwiICsgZXJyKSlcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNldFNpbldhdmUoKSB7XG4vLyAgICAgdmFyIG9zY2lsbGF0b3IgPSBhdWRpb0N0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4vLyAgICAgb3NjaWxsYXRvci50eXBlID0gJ3NxdWFyZSc7XG4vLyAgICAgb3NjaWxsYXRvci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTAwMCwgYXVkaW9DdHguY3VycmVudFRpbWUpOyAvLyB2YWx1ZSBpbiBoZXJ0elxuLy8gICAgIG9zY2lsbGF0b3Iuc3RhcnQoKTtcblxuLy8gICAgIHZpc3VhbGl6ZShvc2NpbGxhdG9yKVxuLy8gfVxuXG4vLyBmdW5jdGlvbiB2aXN1YWxpemUoYXVkaW9Ob2RlOiBBdWRpb05vZGUpIHtcbi8vICAgICBjb25zdCBzb3VyY2UgPSBhdWRpb05vZGU7XG4vLyAgICAgY29uc3QgYW5hbHlzZXIgPSBhdWRpb0N0eC5jcmVhdGVBbmFseXNlcigpO1xuLy8gICAgIGNvbnN0IGJ1ZmZlckxlbmd0aCA9IGFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50O1xuLy8gICAgIGNvbnN0IGRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlckxlbmd0aCk7XG5cbi8vICAgICBhbmFseXNlci5mZnRTaXplID0gMjA0ODtcbi8vICAgICBzb3VyY2UuY29ubmVjdChhbmFseXNlcik7XG5cbi8vICAgICBkcmF3KClcbi8vICAgICBmdW5jdGlvbiBkcmF3KCkge1xuLy8gICAgICAgICBjb25zdCBXSURUSCA9IGNhbnZhcy53aWR0aFxuLy8gICAgICAgICBjb25zdCBIRUlHSFQgPSBjYW52YXMuaGVpZ2h0O1xuXG4vLyAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcblxuLy8gICAgICAgICBhbmFseXNlci5nZXRCeXRlVGltZURvbWFpbkRhdGEoZGF0YUFycmF5KTtcblxuLy8gICAgICAgICBjYW52YXNDdHguZmlsbFN0eWxlID0gJ3JnYigyMDAsIDIwMCwgMjAwKSc7XG4vLyAgICAgICAgIGNhbnZhc0N0eC5maWxsUmVjdCgwLCAwLCBXSURUSCwgSEVJR0hUKTtcblxuLy8gICAgICAgICBjYW52YXNDdHgubGluZVdpZHRoID0gMjtcbi8vICAgICAgICAgY2FudmFzQ3R4LnN0cm9rZVN0eWxlID0gJ3JnYigwLCAwLCAwKSc7XG4vLyAgICAgICAgIGNhbnZhc0N0eC5iZWdpblBhdGgoKTtcblxuLy8gICAgICAgICBsZXQgc2xpY2VXaWR0aCA9IFdJRFRIICogMS4wIC8gYnVmZmVyTGVuZ3RoO1xuLy8gICAgICAgICBsZXQgeCA9IDA7XG4vLyAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyTGVuZ3RoOyBpKyspIHtcbi8vICAgICAgICAgICAgIGxldCB2ID0gZGF0YUFycmF5W2ldIC8gMTI4LjA7XG4vLyAgICAgICAgICAgICBsZXQgeSA9IHYgKiBIRUlHSFQgLyAyO1xuLy8gICAgICAgICAgICAgaWYgKGkgPT09IDApIHsgY2FudmFzQ3R4Lm1vdmVUbyh4LCB5KTsgfVxuLy8gICAgICAgICAgICAgZWxzZSB7IGNhbnZhc0N0eC5saW5lVG8oeCwgeSk7IH1cbi8vICAgICAgICAgICAgIHggKz0gc2xpY2VXaWR0aDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjYW52YXNDdHgubGluZVRvKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCAvIDIpO1xuLy8gICAgICAgICBjYW52YXNDdHguc3Ryb2tlKCk7XG4vLyAgICAgfVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF4RnJlcXVlbmN5UmFuZ2UoZnJlcUFycmF5OiBVaW50OEFycmF5LCBtaW5GcmVxOiBudW1iZXIsIG1heEZyZXE6IG51bWJlcikge1xuICAgIGNvbnN0IG1heEZyZXFTYW1wbGUgPSBhdWRpb0N0eC5zYW1wbGVSYXRlIC8gMjtcbiAgICBjb25zdCBtaW5JbmRleCA9IE1hdGgucm91bmQobWluRnJlcSAvIG1heEZyZXFTYW1wbGUgKiBmcmVxQXJyYXkubGVuZ3RoKTtcbiAgICBjb25zdCBtYXhJbmRleCA9IE1hdGgucm91bmQobWF4RnJlcSAvIG1heEZyZXFTYW1wbGUgKiBmcmVxQXJyYXkubGVuZ3RoKTtcblxuICAgIHJldHVybiBNYXRoLm1heCguLi5mcmVxQXJyYXkuc2xpY2UobWluSW5kZXgsIG1heEluZGV4KSkgLyAyNTZcbn0iLCIvLyBtYW5hZ2UgdmlzdWFsIHBhcnQgb2YgcHJvamVjdFxuXG5pbXBvcnQgeyBjYW52YXNDdHggYXMgY3R4IH0gZnJvbSBcIi4vZ2xvYmFsXCI7XG5pbXBvcnQgeyBkZWdyZWVzVG9SYWRpYW5zIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gcGxvdERlYnVnQ2lyY2xlKHJhZGl1cyA9IDIwMCkge1xuICAgIC8vIERFQlVHIENJUkNMRVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmx1ZVwiO1xuICAgIGN0eC5hcmMoMCwgMCwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSlcbiAgICBjdHguc3Ryb2tlKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bm5pbmdDaXJjbGUoe1xuICAgIGZyYW1lLFxuICAgIHJhZGl1cyA9IDIwMCxcbiAgICBjb2xvciA9ICdyZ2IoNjYsNDQsMjU1KScsXG4gICAgc2hhcGVGYWN0b3IgPSA1LFxuICAgIGZyZXF1ZW5jeVNwYWNlID0gMTJcbn06IE1vdmluZ0NpcmNsZVBhcmFtcykge1xuICAgIGNvbnN0IHNoYXBlOiBTaGFwZUZ1bmN0aW9uID0gKGFuZ2xlLCBwaGFzZSkgPT4gTWF0aC5jb3MoKGFuZ2xlICsgcGhhc2UpICogZnJlcXVlbmN5U3BhY2UpIC8gc2hhcGVGYWN0b3JcbiAgICBtb3ZpbmdDaXJjbGVGYWN0b3J5KGZyYW1lLCByYWRpdXMsIGNvbG9yLCBzaGFwZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9zY2lsbGF0aW5nQ2lyY2xlKHtcbiAgICBmcmFtZSxcbiAgICByYWRpdXMgPSAyMDAsXG4gICAgY29sb3IgPSAncmdiKDY2LDQ0LDI1NSknLFxuICAgIHNoYXBlRmFjdG9yID0gNSxcbiAgICBmcmVxdWVuY3lTcGFjZSA9IDRcbn06IE1vdmluZ0NpcmNsZVBhcmFtcykge1xuICAgIGNvbnN0IHNoYXBlOiBTaGFwZUZ1bmN0aW9uID0gKGFuZ2xlLCBwaGFzZSkgPT4gTWF0aC5jb3MocGhhc2UpICogTWF0aC5jb3MoZnJlcXVlbmN5U3BhY2UgKiBhbmdsZSkgLyBzaGFwZUZhY3RvclxuICAgIG1vdmluZ0NpcmNsZUZhY3RvcnkoZnJhbWUsIHJhZGl1cywgY29sb3IsIHNoYXBlKVxufVxuXG5mdW5jdGlvbiBtb3ZpbmdDaXJjbGVGYWN0b3J5KGZyYW1lOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nLCBzaGFwZUZ1bmN0aW9uOiBTaGFwZUZ1bmN0aW9uKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LmxpbmVXaWR0aCA9IDQ7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG5cbiAgICBjb25zdCBwaGFzZSA9IGRlZ3JlZXNUb1JhZGlhbnMoZnJhbWUpOyAgIC8vIEFzIGlzLCAxIGRlZ3JlZSAob3ZlciAzNjApIHBlciBhbmltYXRpb25cbiAgICBBcnJheS5mcm9tKEFycmF5KDM2MCkua2V5cygpKSAgIC8vIGV2ZXJ5IGRlZ3JlZVxuICAgICAgICAubWFwKGRlZ3JlZSA9PiBkZWdyZWVzVG9SYWRpYW5zKGRlZ3JlZSkpICAgIC8vIHJhZFxuICAgICAgICAubWFwKHJhZCA9PiAoe1xuICAgICAgICAgICAgeDogcmFkaXVzICogKHNoYXBlRnVuY3Rpb24ocmFkLCBwaGFzZSkgKyAxKSAqIE1hdGguY29zKHJhZCksICAgICAvLyByYWRpdXMgKiAocyh0LHRoZXRhKSArIGNvbnN0KSAqIHBvbGFyMmNhcnRcbiAgICAgICAgICAgIHk6IHJhZGl1cyAqIChzaGFwZUZ1bmN0aW9uKHJhZCwgcGhhc2UpICsgMSkgKiBNYXRoLnNpbihyYWQpXG4gICAgICAgIH0pKVxuICAgICAgICAuZm9yRWFjaChwb2ludCA9PiBjdHgubGluZVRvKHBvaW50LngsIHBvaW50LnkpKVxuICAgIGN0eC5zdHJva2UoKVxufVxuXG5cbi8vIGFuZ2xlIGRlZmluZXMgdGhlIHNoYXBlIGRlcGVuZGluZyBvbiB0aGUgcG9zaXRpb24gKHRoZXRhIHBvbGFyIGNvb3JkaW5hdGUpIG9uIHRoZSBjdXJ2ZVxuLy8gcGhhc2UgaXMgdGhlIHRpbWUgZGVwZW5kZW50IHBhcnQgb2YgdGhlIHNoYXBlXG50eXBlIFNoYXBlRnVuY3Rpb24gPSAoYW5nbGU6IG51bWJlciwgcGhhc2U6IG51bWJlcikgPT4gbnVtYmVyXG5cbmV4cG9ydCBpbnRlcmZhY2UgTW92aW5nQ2lyY2xlUGFyYW1zIHtcbiAgICBmcmFtZTogbnVtYmVyLFxuICAgIHJhZGl1cz86IG51bWJlcixcbiAgICBjb2xvcj86IHN0cmluZyxcbiAgICBmcmVxdWVuY3lTcGFjZT86IG51bWJlcixcbiAgICBzaGFwZUZhY3Rvcj86IG51bWJlcixcbn0iLCIvLyBleHBvcnQgZ2xvYmFsIHZhcmlhYmxlIGFjcm9zcyBhbGwgdGhlIHByb2plY3RcblxuLy8gdml6XG5leHBvcnQgY29uc3QgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmV4cG9ydCBjb25zdCBjYW52YXNDdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuLy8gY29udHJvbFxuZXhwb3J0IGNvbnN0IHBvdGFyMSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3RhcjEnKTtcbmV4cG9ydCBjb25zdCBwb3RhcjIgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG90YXIyJyk7XG5cbmV4cG9ydCBsZXQgcG90YXIzOiBudW1iZXI7XG5leHBvcnQgbGV0IHBvdGFyNDogbnVtYmVyO1xuXG4vLyBhdWRpb1xuZXhwb3J0IHZhciBhdWRpb0N0eCA9IG5ldyB3aW5kb3cuQXVkaW9Db250ZXh0KCk7XG4iLCIvLyBlbnRyeXBvaW50XG5cbmltcG9ydCB7IHZpc3VhbGl6ZU1pY3JvcGhvbmUsIGdldE1heEZyZXF1ZW5jeVJhbmdlIH0gZnJvbSBcIi4vYXVkaW9cIjtcbmltcG9ydCB7IG9zY2lsbGF0aW5nQ2lyY2xlLCBwbG90RGVidWdDaXJjbGUsIHJ1bm5pbmdDaXJjbGUgfSBmcm9tIFwiLi9kcmF3XCI7XG5pbXBvcnQgeyBjYW52YXMsIGNhbnZhc0N0eCwgcG90YXIxLCBwb3RhcjIsIGF1ZGlvQ3R4IH0gZnJvbSBcIi4vZ2xvYmFsXCI7XG5cbmNhbnZhcy5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICM2M2VjY2QnO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggKiAyIC8gMztcbmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiA0IC8gNTtcblxuY2FudmFzQ3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMilcblxudmFyIGZyYW1lID0gMDsgIC8vIEFuaW1hdGlvbiBmcmFtZVxuLy8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcblxuLy8gZnVuY3Rpb24gZHJhdygpIHtcbi8vICAgICBjYW52YXNDdHguY2xlYXJSZWN0KC1jYW52YXMud2lkdGggLyAyLCAtY2FudmFzLmhlaWdodCAvIDIsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4vLyAgICAgLy8gY29udGV4dC5zYXZlKCk7XG5cbi8vICAgICAvLyBEZWJ1ZyBjaXJjbGVcbi8vICAgICBwbG90RGVidWdDaXJjbGUoKTtcblxuLy8gICAgIC8vIFJ1bm5pbmcgd2F2eSBjaXJjbGVcbi8vICAgICBydW5uaW5nQ2lyY2xlKHsgZnJhbWUgfSlcbi8vICAgICAvLyBPc2NpbGxhdGluZyB3YXZ5IGNpcmNsZVxuLy8gICAgIG9zY2lsbGF0aW5nQ2lyY2xlKHtcbi8vICAgICAgICAgZnJhbWUsXG4vLyAgICAgICAgIGZyZXF1ZW5jeVNwYWNlOiBwb3RhcjEudmFsdWVBc051bWJlcixcbi8vICAgICAgICAgc2hhcGVGYWN0b3I6IHBvdGFyMi52YWx1ZUFzTnVtYmVyXG4vLyAgICAgfSlcbi8vICAgICAvLyBjb250ZXh0LnJlc3RvcmUoKTtcbi8vICAgICBmcmFtZSsrO1xuLy8gICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4vLyB9XG5cbnZpc3VhbGl6ZU1pY3JvcGhvbmUodmlzdWFsaXplKVxuXG5mdW5jdGlvbiB2aXN1YWxpemUoYXVkaW9Ob2RlOiBBdWRpb05vZGUpIHtcbiAgICB2YXIgc291cmNlID0gYXVkaW9Ob2RlO1xuICAgIHZhciBhbmFseXNlciA9IGF1ZGlvQ3R4LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IGFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgIHZhciBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xuXG4gICAgYW5hbHlzZXIuZmZ0U2l6ZSA9IDIwNDg7XG4gICAgc291cmNlLmNvbm5lY3QoYW5hbHlzZXIpO1xuXG4gICAgZHJhdygpXG4gICAgZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgICAgY2FudmFzQ3R4LmNsZWFyUmVjdCgtY2FudmFzLndpZHRoIC8gMiwgLWNhbnZhcy5oZWlnaHQgLyAyLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBhbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YShkYXRhQXJyYXkpO1xuXG4gICAgICAgIC8vIEF0IG1heGltdW0sIG1vdmluZyBjaXJjbGUgaGF2ZSBhbiBhbXBsaXR1ZGUgb2YgMS8yIG9mIHRoZSByYWRpdXMuIE1pbiBpcyAxLzEwXG4gICAgICAgIHZhciBzaGFwZUZhY3RvckJhc3MxID0gMTAgLSA4ICogZ2V0TWF4RnJlcXVlbmN5UmFuZ2UoZGF0YUFycmF5LCAxLCAxMjApXG4gICAgICAgIHZhciBzaGFwZUZhY3RvckJhc3MyID0gMTAgLSA4ICogZ2V0TWF4RnJlcXVlbmN5UmFuZ2UoZGF0YUFycmF5LCAxMjAsIDM1MClcbiAgICAgICAgdmFyIHNoYXBlRmFjdG9yTWVkaXVtMSA9IDEwIC0gOCAqIGdldE1heEZyZXF1ZW5jeVJhbmdlKGRhdGFBcnJheSwgMzUwLCA2MDApXG4gICAgICAgIHZhciBzaGFwZUZhY3Rvck1lZGl1bTIgPSAxMCAtIDggKiBnZXRNYXhGcmVxdWVuY3lSYW5nZShkYXRhQXJyYXksIDYwMCwgMTAwMClcbiAgICAgICAgdmFyIHNoYXBlRmFjdG9ySGlnaCA9IDEwIC0gOCAqIGdldE1heEZyZXF1ZW5jeVJhbmdlKGRhdGFBcnJheSwgMTAwMCwgMTAwMDApXG5cbiAgICAgICAgcnVubmluZ0NpcmNsZSh7IGZyYW1lLCBjb2xvcjogJ21lZGl1bXZpb2xldHJlZCcsIHNoYXBlRmFjdG9yOiBzaGFwZUZhY3RvckJhc3MxIH0pXG4gICAgICAgIHJ1bm5pbmdDaXJjbGUoeyBmcmFtZSwgY29sb3I6ICdtZWRpdW1zbGF0ZWJsdWUnLCBzaGFwZUZhY3Rvcjogc2hhcGVGYWN0b3JCYXNzMiB9KVxuICAgICAgICBydW5uaW5nQ2lyY2xlKHsgZnJhbWUsIGNvbG9yOiAnb2xpdmVkcmFiJywgc2hhcGVGYWN0b3I6IHNoYXBlRmFjdG9yTWVkaXVtMSB9KVxuICAgICAgICBydW5uaW5nQ2lyY2xlKHsgZnJhbWUsIGNvbG9yOiAnbWVkaXVtdHVycXVvaXNlJywgc2hhcGVGYWN0b3I6IHNoYXBlRmFjdG9yTWVkaXVtMiB9KVxuICAgICAgICBydW5uaW5nQ2lyY2xlKHsgZnJhbWUsIGNvbG9yOiAnbWVkaXVtc3ByaW5nZ3JlZW4nLCBzaGFwZUZhY3Rvcjogc2hhcGVGYWN0b3JIaWdoIH0pXG5cbiAgICAgICAgZnJhbWUrK1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfVxufSIsIi8vIHVzZWZ1bCBmdW5jdGlvbnNcblxuZXhwb3J0IGNvbnN0IGRlZ3JlZXNUb1JhZGlhbnMgPSAoYW5nbGU6IG51bWJlcikgPT4gKE1hdGguUEkgKiBhbmdsZSkgLyAxODA7Il0sInNvdXJjZVJvb3QiOiIifQ==