import React from 'react';

class ScoreBoard extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.score !== this.props.score;
  }

  render() {
    console.log('[ScoreBoard] Render được gọi! Score =', this.props.score);

    return (
      <div className="scoreboard-card">
        <div className="scoreboard-header">
          <div className="light-indicator blinking"></div>
          <span className="scoreboard-tag">BẢNG ĐIỂM SỐ</span>
        </div>
        <div className="scoreboard-display">
          <span className="score-label">MATCH SCORE</span>
          <div className="score-value-box">
            <span className="score-value">
              {String(this.props.score).padStart(3, '0')}
            </span>
          </div>
        </div>
        <div className="scoreboard-footer">
          <span className="game-status">LIVE UPDATES ACTIVE</span>
        </div>
      </div>
    );
  }
}

export default ScoreBoard;
