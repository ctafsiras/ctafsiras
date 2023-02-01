import React, { useState } from 'react';

const LoveCalculator = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [score, setScore] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name1 || !name2) {
            setError("Please enter both names");
            return;
        }
        const calculatedScore = calculateScore(name1, name2);
        setScore(calculatedScore);
        setError(null);
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold mb-5">Love Calculator</h1>
            <form className="bg-white p-10 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name1" className="block font-bold mb-2">Your Name:</label>
                    <input
                        type="text"
                        id="name1"
                        className="w-full border p-2 rounded-lg"
                        value={name1}
                        onChange={e => setName1(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="name2" className="block font-bold mb-2">Partner's Name:</label>
                    <input
                        type="text"
                        id="name2"
                        className="w-full border p-2 rounded-lg"
                        value={name2}
                        onChange={e => setName2(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {score !== null && <p className="text-xl">Your compatibility score is: {score}%</p>}
                <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">Calculate</button>
            </form>

        </div>
    );
};

const calculateScore = (name1, name2) => {
    // Combine the names into a single string
    const combinedName = name1.toLowerCase() + name2.toLowerCase();

    // Calculate the score based on the combined name string
    let score = 0;
    for (let i = 0; i < combinedName.length; i++) {
        score += combinedName.charCodeAt(i);
    }
    score = score % 101;

    return score;
};

export default LoveCalculator;
