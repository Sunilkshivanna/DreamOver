import React, { useState } from "react";

const BALLS_PER_OVER = 6;

const CricketPrediction = () => {
    const initialOvers = Array.from({ length: 20 }, () => ({
        balls: [],
        isFrozen: false,
    }));

    const [overs, setOvers] = useState(initialOvers);

    const runOptions = ["0", "1", "2", "3", "4", "5", "6", "Wide", "No Ball", "Wicket"];

    const handlePrediction = (overIndex, run) => {
        setOvers((prevOvers) => {
            const newOvers = [...prevOvers];
            const currentOver = { ...newOvers[overIndex] };
    
            if (currentOver.isFrozen) return newOvers;
    
            const balls = [...currentOver.balls];
            const legalBalls = balls.filter((ball) => ball !== "Wide" && ball !== "No Ball").length;
    
            // Prevent any further entries after 6 legitimate balls
            if (legalBalls >= BALLS_PER_OVER) return newOvers;
    
            balls.push(run);
            currentOver.balls = balls;
            newOvers[overIndex] = currentOver;
    
            return newOvers;
        });
    };
    

    const deleteLastEntry = (overIndex) => {
        setOvers((prevOvers) => {
            const newOvers = [...prevOvers];
            const currentOver = { ...newOvers[overIndex] };

            if (currentOver.isFrozen) return newOvers;

            const balls = [...currentOver.balls];
            if (balls.length > 0) balls.pop();

            currentOver.balls = balls;
            newOvers[overIndex] = currentOver;

            return newOvers;
        });
    };

    const playOver = (overIndex) => {
        setOvers((prevOvers) => {
            const newOvers = [...prevOvers];
            const currentOver = { ...newOvers[overIndex] };

            const legalBalls = currentOver.balls.filter((ball) => ball !== "Wide" && ball !== "No Ball").length;
            if (legalBalls < BALLS_PER_OVER) {
                alert("You must enter all 6 legitimate balls before confirming!");
                return newOvers;
            }

            currentOver.isFrozen = true;
            newOvers[overIndex] = currentOver;
            return newOvers;
        });
    };

    const undoOver = (overIndex) => {
        setOvers((prevOvers) => {
            const newOvers = [...prevOvers];
            newOvers[overIndex] = { ...newOvers[overIndex], isFrozen: false };
            return newOvers;
        });
    };

    const copyToNextOver = (overIndex) => {
        setOvers((prevOvers) => {
            const newOvers = [...prevOvers];

            if (overIndex >= 19) return newOvers;

            const currentOver = { ...newOvers[overIndex] };
            const nextOver = { ...newOvers[overIndex + 1] };

            const legalBalls = currentOver.balls.filter((ball) => ball !== "Wide" && ball !== "No Ball").length;

            if (legalBalls < BALLS_PER_OVER || nextOver.balls.length > 0) return newOvers;

            nextOver.balls = [...currentOver.balls];
            newOvers[overIndex + 1] = nextOver;

            return newOvers;
        });
    };

    const getBallStyle = (ball) => {
        if (ball === "Wicket") return { backgroundColor: "white", color: "Red" };
        if (ball === "No Ball") return { backgroundColor: "red", color: "white" };
        if (ball === "Wide") return { backgroundColor: "white", color: "green" };
        if (ball === "4") return { backgroundColor: "green", color: "white" };
        if (ball === "6") return { backgroundColor: "purple", color: "white" };
        
        return { color: "black" };
    };

    return (
        <div style={styles.container}>
            <h1>Cricket Prediction</h1>

            <div style={styles.grid}>
                {overs.map((over, index) => {
                    const legalBalls = over.balls.filter((ball) => ball !== "Wide" && ball !== "No Ball").length;
                    const isCopyEnabled = legalBalls === BALLS_PER_OVER && index < 19 && overs[index + 1].balls.length === 0;
                    const getOrdinal = (num) => {
                        if (num % 10 === 1 && num % 100 !== 11) return `${num}st`;
                        if (num % 10 === 2 && num % 100 !== 12) return `${num}nd`;
                        if (num % 10 === 3 && num % 100 !== 13) return `${num}rd`;
                        return `${num}th`;
                    };
                    
                    return (
                        <div key={index} style={{ ...styles.overBox, backgroundColor: over.isFrozen ? "#d4edda" : "#f9f9f9" }}>
                            <h4>Over {index + 1}</h4>

                            {/* Ball Display Section (First Three Rows) */}
                            <div style={styles.ballDisplay}>
                                {over.balls.map((ball, i) => (
                                    <div key={i} style={styles.ballContainer}>
                                        <span style={styles.ballOrder}>{getOrdinal(i + 1)}</span>

                                        <span style={{ ...styles.ballCircle, ...getBallStyle(ball) }}>
                                            {ball === "Wicket" ? "WK" : ball === "No Ball" ? "NB" : ball === "Wide" ? "WD" : ball}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Separator Line */}
                            <hr style={styles.separator} />

                            {/* Button Section at the Bottom */}
                            <div style={styles.buttonsContainer}>
                                {runOptions.map((run, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePrediction(index, run)}
                                        style={{
                                            ...styles.runButton,
                                            opacity: over.isFrozen ? 0.5 : 1,
                                            cursor: over.isFrozen ? "not-allowed" : "pointer",
                                        }}
                                        disabled={over.isFrozen}
                                    >
                                        {run}
                                    </button>
                                ))}
                            </div>

                            {!over.isFrozen ? (
                                <>
                                    <button onClick={() => deleteLastEntry(index)} style={styles.deleteButton}>
                                        Delete Last Entry
                                    </button>
                                    <button onClick={() => playOver(index)} style={styles.freezeButton}>
                                        Play
                                    </button>
                                    <button
                                        onClick={() => copyToNextOver(index)}
                                        style={{ ...styles.copyButton, opacity: isCopyEnabled ? 1 : 0.5, cursor: isCopyEnabled ? "pointer" : "not-allowed" }}
                                        disabled={!isCopyEnabled}
                                    >
                                        Copy to Next Over
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p style={styles.frozenText}>Over Confirmed ✅</p>
                                    <button onClick={() => undoOver(index)} style={styles.undoButton}>
                                        Undo
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: "10px", textAlign: "center", fontFamily: "Arial, sans-serif" },
    grid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "25px", justifyContent: "center", padding: "10px" },
    overBox: { border: "10px solid #ccc", padding: "8px", borderRadius: "50px", textAlign: "center" },
    ballDisplay: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "5px", justifyContent: "center", marginBottom: "50px", minHeight: "100px" },
    ballContainer: { display: "flex", flexDirection: "column", alignItems: "center" },
    ballOrder: { fontSize: "10px", fontWeight: "bold", color: "red" },
    ballCircle: { width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: "bold", border: "3px solid black", fontSize: "14px" },
    separator: { margin: "10px 0", borderTop: "2px solid grey" },
};

export default CricketPrediction;
