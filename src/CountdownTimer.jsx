import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const currentTime = new Date();
    const nextYear = new Date(currentTime.getFullYear() + 1, 0, 1);
    const difference = nextYear - currentTime;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const totalSeconds = 365 * 24 * 60 * 60;
  const remainingSeconds =
    timeLeft.days * 24 * 60 * 60 +
    timeLeft.hours * 60 * 60 +
    timeLeft.minutes * 60 +
    timeLeft.seconds;
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  const totalSecondsInDay = 24 * 60 * 60; // Total seconds in a day
  const remainingSecondsDay =
    timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progressDay =
    ((totalSecondsInDay - remainingSecondsDay) / totalSecondsInDay) * 100;

  const calculateTimeLeftForMonth = () => {
    const currentTime = new Date();
    const nextMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1); // First day of next month
    const difference = nextMonth - currentTime;
    let timeLeftMonth = {};

    if (difference > 0) {
      timeLeftMonth = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeftMonth;
  };

  const [timeLeftMonth, setTimeLeftMonth] = useState(calculateTimeLeftForMonth());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeftMonth(calculateTimeLeftForMonth());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const totalSecondsInMonth = 30 * 24 * 60 * 60; // Total seconds in a month (approximated to 30 days)
  const remainingSecondsMonth =
    timeLeftMonth.days * 24 * 60 * 60 +
    timeLeftMonth.hours * 60 * 60 +
    timeLeftMonth.minutes * 60 +
    timeLeftMonth.seconds;
  const progressMonth = ((totalSecondsInMonth - remainingSecondsMonth) / totalSecondsInMonth) * 100;

  // Calculate the time and progress until the next Monday
  const calculateTimeLeftForWeek = () => {
    const currentTime = new Date();
    const daysUntilNextMonday = 8 - currentTime.getDay(); // Days until next Monday
    const nextMonday = new Date(currentTime.getTime() + daysUntilNextMonday * 24 * 60 * 60 * 1000); // Add days to current time
    const difference = nextMonday - currentTime;
    let timeLeftWeek = {};

    if (difference > 0) {
      timeLeftWeek = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeftWeek;
  };

  const [timeLeftWeek, setTimeLeftWeek] = useState(calculateTimeLeftForWeek());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeftWeek(calculateTimeLeftForWeek());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const totalSecondsInWeek = 7 * 24 * 60 * 60; // Total seconds in a week
  const remainingSecondsWeek =
    timeLeftWeek.days * 24 * 60 * 60 +
    timeLeftWeek.hours * 60 * 60 +
    timeLeftWeek.minutes * 60 +
    timeLeftWeek.seconds;
  const progressWeek =
    ((totalSecondsInWeek - remainingSecondsWeek) / totalSecondsInWeek) * 100;

  return (
    <>
      <div className="progress-day">
        <div className="progress-day-time">
          <p>Time left until New Day</p>
          {timeLeft.hours > 0 && <span>{timeLeft.hours}Hr</span>} &nbsp;
          {timeLeft.minutes > 0 && <span>{timeLeft.minutes}Min </span>}&nbsp;
          {timeLeft.seconds > 0 && <span>{timeLeft.seconds}Sec </span>}
          {Object.keys(timeLeft).length === 0 && <span>Time's up!</span>}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressDay}%` }}></div>
        </div>
      </div>

      <div className="progress-week">
        <div className="progress-week-time">
          <p>Time left until Next Week</p>
          {timeLeftWeek.days > 0 && <span>{timeLeftWeek.days} Days </span>}
          {Object.keys(timeLeftWeek).length === 0 && <span>Time's up!</span>}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressWeek}%` }}></div>
        </div>
      </div>

      <div className="progress-month">
        <div className="progress-month-time">
          <p>Time left until Next Month</p>
          {timeLeftMonth.days > 0 && <span>{timeLeftMonth.days} Days </span>}
          {Object.keys(timeLeftMonth).length === 0 && <span>Time's up!</span>}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressMonth}%` }}></div>
        </div>
      </div>

      <div className="progress-year">
        <div className="progress-year-text">
          <p>Time left until New Year</p>
          {timeLeft.days > 0 && <span>{timeLeft.days} Days </span>}
        </div>
        <div className="countdown">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;
