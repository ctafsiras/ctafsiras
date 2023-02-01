import React, { useState } from 'react';

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState(null);

  const handleChange = event => {
    setDob(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const today = new Date();
    const birthDate = new Date(dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    const months =
      today.getMonth() - birthDate.getMonth() + 12 * (calculatedAge - 1);
    const days = Math.floor(
      (today - new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    setAge({ years: calculatedAge, months: months, days: days });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">Age Calculator</h1>
      <form onSubmit={handleSubmit} className="bg-white p-10 shadow-lg rounded-lg">
        <div className="mb-5">
          <label htmlFor="dob" className="block font-bold mb-2">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={handleChange}
            className="p-2 rounded-lg"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Calculate
        </button>
      </form>
      {age !== null && (
        <p className="text-xl mt-5">
          Your age is: {age.years} years, {age.months} months and {age.days} days old
        </p>
      )}
    </div>
  );
};

export default AgeCalculator;
