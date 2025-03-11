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

            if (legalBalls >= BALLS_PER_OVER && run !== "Wide" && run !== "No Ball") return newOvers;

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

            if (overIndex >= 19) return newOvers; // Prevent copying to 21st over (out of bounds)

            const currentOver = { ...newOvers[overIndex] };
            const nextOver = { ...newOvers[overIndex + 1] };

            const legalBalls = currentOver.balls.filter((ball) => ball !== "Wide" && ball !== "No Ball").length;

            if (legalBalls < BALLS_PER_OVER || nextOver.balls.length > 0) return newOvers;

            nextOver.balls = [...currentOver.balls]; // Copy all balls
            newOvers[overIndex + 1] = nextOver;

            return newOvers;
        });
    };

    const getBallStyle = (ball) => {
        if (ball === "Wicket") return { backgroundColor: "red", color: "white" };
        if (ball === "No Ball") return { backgroundColor: "blue", color: "white" };
        if (ball === "Wide") return { backgroundColor: "green", color: "white" };
        if (ball === "4" || ball === "6") return { color: "orange" };
        return { color: "black" };
    };

    const getOrdinal = (num) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    return (
        <div style={styles.container}>
            <h1>Cricket Prediction</h1>

            <div style={styles.grid}>
                {overs.map((over, index) => {
                    const legalBalls = over.balls.filter((ball) => ball !== "Wide" && ball !== "No Ball").length;
                    const nextOverExists = index < 19;
                    const isCopyEnabled = legalBalls === BALLS_PER_OVER && nextOverExists && overs[index + 1].balls.length === 0;

                    return (
                        <div key={index} style={{ ...styles.overBox, backgroundColor: over.isFrozen ? "#d4edda" : "#f9f9f9" }}>
                            <h4>Over {index + 1}</h4>

                            <div style={styles.ballDisplay}>
                                {over.balls.length
                                    ? over.balls.map((ball, i) => (
                                          <div key={i} style={styles.ballContainer}>
                                              <span style={styles.ballOrder}>{getOrdinal(i + 1)}</span>
                                              <span style={{ ...styles.ballCircle, ...getBallStyle(ball) }}>
                                                  {ball === "Wicket" ? "WK" : ball === "No Ball" ? "NB" : ball === "Wide" ? "WD" : ball}
                                              </span>
                                          </div>
                                      ))
                                    : "No predictions yet"}
                            </div>

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
    container: {
        padding: "10px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        justifyContent: "center",
        padding: "10px",
    },
    overBox: {
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
    },
    ballDisplay: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5px",
    },
    ballContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
    },
    ballOrder: { fontSize: "10px", fontWeight: "bold", color: "red" },
    ballCircle: { width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: "bold", border: "1px solid black" },
    copyButton: { marginTop: "5px", padding: "5px", fontSize: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "3px", width: "100%" },
};

export default CricketPrediction;
