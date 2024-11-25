import React, { useState, useEffect } from "react";
import Header from "./Header";

export default function InputField({
  setValues,
  values,
  setPop,
  setIndex,
  count,
  setCount,
  setNum,
  num,
}) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [color, setColor] = useState("");

  // Function to add new event
  const value = (e) => {
    e.preventDefault();
    if (eventName && eventDate && eventLocation) {
      const newEvent = {
        name: eventName,
        date: eventDate,
        location: eventLocation,
        color: "",
        num: 0, 
      };
      setValues((v) => [...v, newEvent]);
      setCount((c) => c + 1); 

      setEventName("");
      setEventDate("");
      setEventLocation("");
    }
  };

  const Date = (e) => {
    setEventDate(e.target.value);
  };

  // Toggle color and count on button click

  // const handleClick = () => {
  //   setColor((c) => {
  //     if (c === 'bg-tertiary text-white') {
  //       setNum((n) => n - 1); // Decrease num if color is already applied
  //       return ''; // Remove color
  //     } else {
  //       setNum((n) => n + 1); // Increase num if color is applied
  //       return 'bg-tertiary text-white'; // Apply color
  //     }
  //   });
  // };

  const handleClick = (index) => {
    setValues((prevValues) => {
      const updatedValues = prevValues.map((item, i) => {
        if (i === index) {
          const isColorAdded = item.color === "bg-tertiary text-white";
          return {
            ...item,
            color: isColorAdded ? "" : "bg-tertiary text-white",
          };
        }
        return item;
      });

      return updatedValues;
    });

    setNum((prevNum) => {
      const currentItem = values[index];
      const isColorAdded = currentItem.color === "bg-tertiary text-white";

      return isColorAdded ? prevNum - 1 : prevNum + 1;
    });
  };

  const openPopup = (index) => {
    setIndex(index);
    setPop(true);
  };

  useEffect(() => {
    const storedCount = window.localStorage.getItem("Count");
    if (storedCount !== null) {
      setCount(parseInt(storedCount, 10) || 0);
    } else {
      setCount(0);
    }

    const storedNum = window.localStorage.getItem("Num");
    if (storedNum !== null) {
      setNum(parseInt(storedNum, 10) || 0); 
    } else {
      setNum(0); 
    }
  }, []);

  // Save count to localStorage
  useEffect(() => {
    if (typeof count === "number") {
      const saveToLocalStorage = setTimeout(() => {
        window.localStorage.setItem("Count", count.toString()); // Save as string
      }, 1000);
      return () => clearTimeout(saveToLocalStorage);
    }
  }, [count]);

  // Save num to localStorage
  useEffect(() => {
    if (typeof num === "number") {
      const saveToLocalStorage = setTimeout(() => {
        window.localStorage.setItem("Num", num.toString()); 
      }, 1000);
      return () => clearTimeout(saveToLocalStorage);
    }
  }, [num]);

  // Save events to localStorage
  useEffect(() => {
    const data = window.localStorage.getItem("Value");
    if (data !== null) setValues(JSON.parse(data));
  }, []); 

  useEffect(() => {
    const saveToLocalStorage = setTimeout(() => {
      window.localStorage.setItem("Value", JSON.stringify(values)); 
    }, 1000);
    return () => clearTimeout(saveToLocalStorage);
  }, [values]);

  return (
    <div>
      <Header count={count} num={num} />
      <div className="flex justify-center">
        <form
          onSubmit={value}
          className="w-[85%] bg-primary p-5 rounded-md shadow-2xl"
        >
          <div className="flex justify-between mb-5">
            <div className="flex flex-col gap-y-4">
              <label htmlFor="text" className="font-semibold">
                Event Name
              </label>
              <input
                type="text"
                name="Text"
                placeholder="Tech Conference 2024"
                className="border-[1px] px-4 py-2 border-secondary"
                value={eventName}
                required
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <label htmlFor="date" className="font-semibold">
                Date
              </label>
              <input
                type="date"
                name="Date"
                value={eventDate}
                required
                className="border-[1px] px-4 py-2 border-secondary"
                onChange={Date}
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <label htmlFor="text" className="font-semibold">
                Location
              </label>
              <input
                type="text"
                name="Location"
                placeholder="Nigeria"
                className="border-[1px] px-4 py-2 border-secondary"
                value={eventLocation}
                required
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-primary bg-tertiary rounded-md px-4 py-2"
          >
            Add Event
          </button>
        </form>
      </div>

      <ul className="flex flex-col items-center justify-center mt-10 gap-y-8">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-primary p-5 shadow-2xl rounded-md w-[85%] flex items-center justify-between"
          >
            <div>
              <h1 className="font-bold text-2xl">{value.name}</h1>
              <div className="flex gap-5 items-center">
                <p className="my-3">
                  <i className="fa-solid fa-calendar text-xl text-tertiary" />
                </p>
                <p className="font-semibold">{value.date}</p>
              </div>
              <div className="flex gap-5">
                <p className="text-xl">📍</p>
                <p className="font-semibold">{value.location}</p>
              </div>
            </div>
            <div>
              <button
                className={`h-12 w-12 rounded-full flex items-center justify-center text-tertiary bg-primary shadow-2xl shadow-secondary ${value.color}`}
                onClick={() => handleClick(index)}
              >
                <p>
                  <i className="fa-solid fa-check text-2xl" />
                </p>
              </button>
              <button
                className="h-12 w-12 rounded-full flex items-center justify-center text-tertiary bg-primary shadow-2xl mt-5"
                onClick={() => openPopup(index)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
