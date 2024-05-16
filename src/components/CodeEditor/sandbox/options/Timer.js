import { connect } from "react-redux";
import { setShouldCount, setTimer } from "../../../../redux/slices/examSlice";
import { useEffect } from "react";

function TimerComponent({ timer, setTimerDispatch, shouldTimerCount }) {
  useEffect(() => {
    let interval;
    if (shouldTimerCount) {
      interval = setInterval(() => {
        setTimerDispatch(timer + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, setTimerDispatch, shouldTimerCount]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime =
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;
    return formattedTime;
  };

  return (
    <div>
      <div className="flex items-center bg-gray-200 rounded-md px-2 py-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1zm-1-1a1 1 0 110-2 1 1 0 010 2z"
            clipRule="evenodd"
          />
        </svg>
        <b className="text-gray-600">{formatTime(timer)}</b>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  timer: state.timer.timer,
  shouldTimerCount: state.timer.shouldCount,
});

const mapDispatch = {
  setTimerDispatch: setTimer,
  shouldCountDispatch: setShouldCount,
};

const Timer = connect(mapState, mapDispatch)(TimerComponent);

export default Timer;
