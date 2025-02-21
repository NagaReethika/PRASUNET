const playBtn = document.getElementsByClassName("playbtn")[0];
const lapBtn = document.getElementsByClassName("lapbtn")[0];
const resetBtn = document.getElementsByClassName("resetbtn")[0];
const lapS = document.getElementsByClassName("laps")[0];
const clearBtn = document.getElementsByClassName("clearbtn")[0];

const body = document.body; // Get the body element

const innerCircle = document.getElementsByClassName("inner-circle")[0];
const sec = document.getElementsByClassName("sec")[0];
const msec = document.getElementsByClassName("msec")[0];
const min = document.getElementsByClassName("min")[0];
const initialColor = { background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)', color: '#fff' };
const colors = [
    { background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', color: '#fff' },
    { background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', color: '#333' },
    { background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#333' },
    { background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', color: '#333' },
];

let colorIndex = 0;

function changeBackground() {
    colorIndex = (colorIndex + 1) % colors.length;
    body.style.background = colors[colorIndex].background;
    body.style.color = colors[colorIndex].color;
}

let secCounter = 0;
let secs;
let msecCounter = 0;
let msecs;
let minCounter = 0;
let mins;
let lapItem = 0; 

const toggleBtn = () => {
  lapBtn.classList.add("visibility");
  resetBtn.classList.add("visibility");
};

const play = () => {
  toggleBtn();
  if (playBtn.innerHTML === "Start") {
    playBtn.innerHTML = "Pause";

    mins = setInterval(() => {
      min.innerHTML = `${++minCounter}`;
      if (minCounter < 10) {
        min.innerHTML = `0${minCounter} :`;
      }
    }, 60 * 1000);

    secs = setInterval(() => {
      if (secCounter === 59) {
        secCounter = 0;
      }
      sec.innerHTML = `${++secCounter}`;
      if (secCounter < 10) {
        sec.innerHTML = ` 0${secCounter} :`;
      }
    }, 1000);

    msecs = setInterval(() => {
      if (msecCounter === 99) {
        msecCounter = 0;
      }
      msec.innerHTML = `${++msecCounter}`;
      if (msecCounter < 10) {
        msec.innerHTML = ` 0${msecCounter}`;
      }
    }, 10);
  } else {
    playBtn.innerHTML = "Start";
    clearInterval(mins);
    clearInterval(secs);
    clearInterval(msecs);
    setTimeout(changeBackground, 1000); // Change background after 1 second
  }
  if (playBtn.innerHTML === "Pause") {
    lapBtn.classList.remove("visibility");
    resetBtn.classList.remove("visibility");
  }
};

const reset = () => {
  clearInterval(mins);
  clearInterval(secs);
  clearInterval(msecs);

  minCounter = 0;
  secCounter = 0;
  msecCounter = 0;

  min.innerHTML = "00 :";
  sec.innerHTML = " 00 :";
  msec.innerHTML = " 00";

  playBtn.innerHTML = "Start";
  lapBtn.classList.add("visibility");
  resetBtn.classList.add("visibility");
};

const lap = () => {
  const li = document.createElement("li");
  const number = document.createElement("span");
  const timeStamp = document.createElement("span");

  li.setAttribute("class", "lap-item");
  number.setAttribute("class", "number");
  timeStamp.setAttribute("class", "time-stamp");

  number.innerHTML = `${++lapItem}`;
  timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${msecCounter}`;
  
  li.append(number, timeStamp);
  lapS.append(li);
  clearBtn.classList.remove("laptime")
};

const clear = () => {
  lapS.innerHTML = ""
  lapS.append(clearBtn)
  clearBtn.classList.add("laptime")
}

playBtn.addEventListener("click", play);
lapBtn.addEventListener("click", lap);
resetBtn.addEventListener("click", reset);
clearBtn.addEventListener("click", clear);
