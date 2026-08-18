import React from 'react';

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 1500, // 25 minutes in seconds
      isRunning: false
    };
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  handleStart = () => {
    if (this.state.isRunning) return;

    this.setState({ isRunning: true });
    this.timerID = setInterval(() => this.tick(), 1000);
  };

  handlePause = () => {
    if (!this.state.isRunning) return;

    this.setState({ isRunning: false });
    clearInterval(this.timerID);
  };

  handleReset = () => {
    this.setState({
      timeLeft: 1500,
      isRunning: false
    });
    clearInterval(this.timerID);
  };

  tick() {
    this.setState((prevState) => {
      if (prevState.timeLeft <= 1) {
        clearInterval(this.timerID);
        return {
          timeLeft: 0,
          isRunning: false
        };
      }
      return {
        timeLeft: prevState.timeLeft - 1
      };
    });
  }

  formatTime(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  render() {
    const { timeLeft, isRunning } = this.state;
    const isFinished = timeLeft === 0;

    return (
      <div className={`pomodoro-widget ${isFinished ? 'timer-finished' : ''}`}>
        <div className="timer-circle">
          <div className="timer-glow"></div>
          <div className="timer-face">
            <div className="time-display">
              {isFinished ? '00:00' : this.formatTime(timeLeft)}
            </div>
            <div className="timer-status">
              {isFinished ? 'HẾT GIỜ!' : isRunning ? 'ĐANG TẬP TRUNG' : 'ĐANG TẠM DỪNG'}
            </div>
          </div>
        </div>

        <div className="timer-controls">
          <button
            className="timer-btn play-btn"
            onClick={this.handleStart}
            disabled={isRunning || isFinished}
          >
            Bắt đầu (Play)
          </button>
          <button
            className="timer-btn pause-btn"
            onClick={this.handlePause}
            disabled={!isRunning}
          >
            Tạm dừng (Pause)
          </button>
          <button
            className="timer-btn reset-btn"
            onClick={this.handleReset}
          >
            Đặt lại (Reset)
          </button>
        </div>
      </div>
    );
  }
}

export default PomodoroTimer;
