import React, { useState, useRef } from "react";
import "./Calendar.css";
const times = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availability, setAvailability] = useState({});
  const sliderRef = useRef();

  const initialAvailability = {
    "2024-03-01": ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
    "2024-03-02": ["9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"],
    "2024-03-03": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    "2024-03-04": ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const monthArray = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames;
  };

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => {
      const prevMonth = new Date(prevDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      const nextMonth = new Date(prevDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  const handleDateClick = (day) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
  };

  const renderCalendarDays = () => {
    // const days = [];
    // const totalDays = new Date(
    //   selectedDate.getFullYear(),
    //   selectedDate.getMonth() + 1,
    //   0
    // ).getDate();
    // for (let i = 1; i <= totalDays; i++) {
    //   const currentDate = new Date(
    //     selectedDate.getFullYear(),
    //     selectedDate.getMonth(),
    //     i
    //   );
    //   const isSelectedDate =
    //     formatDate(currentDate) === formatDate(selectedDate);
    //   days.push(
    //     <div
    //       key={i}
    //       className={`day ${isSelectedDate ? "selected-day" : ""}`}
    //       onClick={() => handleDateClick(i)}
    //     >
    //       <div className="day-number">{i}</div>
    //       {isSelectedDate && <div className="selected-symbol">✓</div>}{" "}
    //       {/* Display a unique symbol only on the selected date */}
    //     </div>
    //   );
    // }
    // return days;

    const days = [];
    const totalDays = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const today = new Date();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      const isSelectedDate =
        currentDate.toDateString() === selectedDate.toDateString();
      const isSameMonthAndYear =
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear();
      const dayOfWeek = currentDate.getDay();
      const isToday =
        i === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear();

      days.push(
        <div
          key={i}
          className={`day ${isSelectedDate ? "selected-day" : ""} ${
            isToday ? "current-day" : ""
          }`}
          onClick={() => handleDateClick(i)}
        >
          <div className="day-number">{i}</div>
          {isSelectedDate && isSameMonthAndYear && (
            <div className="selected-symbol">✓</div>
          )}
        </div>
      );
    }
    return days;
  };

  console.log(initialAvailability[formatDate(selectedDate)]?.[4]);

  // For Multiple slot selected======
  // function isSlotPresent(slot) {
  //   return selectedTime.includes(slot);
  // }
  // const setTimes = (newTime) => {
  //   setSelectedTime((prevTime) => [...prevTime, newTime]);
  // };
  // ====================

  const displayItems = () => {
    const items = [];
    for (let i = currentIndex; i < currentIndex + 3; i++) {
      if (initialAvailability[formatDate(selectedDate)]?.length > 0) {
        items.push(
          <div className="slider-item" key={i}>
            <button
              className={`slider-button ${
                selectedTime ==
                  initialAvailability[formatDate(selectedDate)]?.[i] ||
                initialAvailability[formatDate(selectedDate)]?.[i] ==
                  "undefined"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedTime(
                  initialAvailability[formatDate(selectedDate)]?.[i]
                )
              }
            >
              {initialAvailability[formatDate(selectedDate)]?.[i] == "undefined"
                ? "Not Available"
                : initialAvailability[formatDate(selectedDate)]?.[i]}
            </button>
          </div>
        );
      } else {
        if (times[i]) {
          items.push(
            <div className="slider-item" key={i}>
              <button
                className={`slider-button ${
                  selectedTime === times[i] ? "selected" : ""
                }`}
                onClick={() => setSelectedTime(times[i])}
              >
                {times[i]}
              </button>
            </div>
          );
        }
      }
    }
    return items;
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const handleNext = () => {
    if (initialAvailability[formatDate(selectedDate)]?.length > 0) {
      if (
        currentIndex + 3 <
        initialAvailability[formatDate(selectedDate)]?.length
      ) {
        setCurrentIndex(currentIndex + 3);
      }
    } else {
      if (currentIndex + 3 < times.length) {
        setCurrentIndex(currentIndex + 3);
      }
    }
  };
  console.log(selectedTime);

  return (
    <>
      <div className="calendar">
        <div className="calend_head">
          <h3>BOOK DATE</h3>
        </div>
        <hr />
        <div className="header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <div>
            {monthArray()[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </div>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="weekdays">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <hr />
        <div className="days">{renderCalendarDays()}</div>
        <div>
          <hr className="h-calend" />
          <div className="timeTitle">
            <h1>BOOK TIME</h1>
          </div>
          <hr className="h-timestart" />
        </div>
      </div>

      <div className="slider-container">
        <button className="arrow left" onClick={handlePrev}>
          &lt;
        </button>
        <div className="slider">{displayItems()}</div>
        <button className="arrow right" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default Calendar;
