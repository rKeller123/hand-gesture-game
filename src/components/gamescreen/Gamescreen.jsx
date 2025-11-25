import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";

const DESIGN_WIDTH = 1200;
const DESIGN_HEIGHT = 1000;

const ImageRow = ({ images = [] }) => (
    <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        {images.map((src, i) => (
            <Card key={i} sx={{ flex: 1, minWidth: 0, margin:2, marginTop:0 }}>
                <Card
                    key={i}
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 2
                    }}
                >
                    <Box
                        component="img"
                        src={src}
                        alt={`img-${i}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            objectFit: "cover",
                            zIndex: 2
                        }}
                    />
                    {/* This forces the card to maintain a fixed aspect ratio (e.g., 16:9) */}
                    <Box sx={{ paddingTop: "52.16%" }} />
                </Card>
            </Card>
        ))}
    </Box>
);



export const Gamescreen = ({
                               selected,
                               correctAnswerGiven,
                               numOfCorrects,
                               onAnswer,
                               currentQuestion,
                               gestureProgress
                           }) => {
    const borderWhenAnswerGiven = (optionNum, baseBg) => {
        const isSelected = selected === optionNum;

        const border =
            correctAnswerGiven === null
                ? undefined
                : isSelected
                    ? correctAnswerGiven
                        ? "20px solid green"
                        : "20px solid red"
                    : undefined;

        return {
            background: baseBg,
            border,
            boxSizing: "border-box",
            cursor: selected === null ? "pointer" : "default",
            display: "flex",
            gap: 2,
            alignItems: "center",
            p: 1,
        };
    };

    const imagesFirstAnswer = currentQuestion.answer1_imgs;

    const imagesSecondAnswer = currentQuestion.answer2_imgs;

    const getGestureProgressFor = (optionNum) => {
        if (!gestureProgress || selected !== null) return 0;

        const isTarget =
            (gestureProgress.gesture === "thumbs_up" && optionNum === 0) ||
            (gestureProgress.gesture === "thumbs_down" && optionNum === 1);

        return isTarget ? Math.min(gestureProgress.progress * 10, 100) : 0;
    }

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <Box
                sx={{
                    width: `${DESIGN_WIDTH}px`,
                    height: `${DESIGN_HEIGHT}px`,
                    transformOrigin: "top center",
                }}
            >
                <Box sx={{ flex: 3, display: "flex", flexDirection: "row", gap: 2 }}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "50%",
                            flexDirection: "column",
                            border: "1px solid black",
                        }}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                                <CardMedia
                                    component="img"
                                    image="logo.png"
                                    alt="Logo"
                                    sx={{ width: 120, height: "auto" }}
                                />
                            </Box>

                            <Box sx={{ textAlign: "right" }}>
                                <Typography>Score Player 1: {numOfCorrects}</Typography>
                                <Typography>Highscore Player 2: 0</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ border: "5px solid black" }}>

                            {/* First answer */}
                            <Box
                                onClick={() => onAnswer(0)}
                                sx={{
                                    ...borderWhenAnswerGiven(0, "#ffddf1"),
                                    position: "relative",
                                    overflow: "hidden",
                                    height: "40vh",
                                    p:10,
                                }}
                            >
                                {/* FULL-SIZE CONTAINER */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                    }}
                                >
                                    {/* PROGRESS BAR */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            width: `${getGestureProgressFor(0)}%`,
                                            height: "100%",
                                            background: "#ff4455",
                                            transition: "width 0.1s linear",
                                            pointerEvents: "none",
                                            zIndex: 1,
                                        }}
                                    />

                                    {/* CONTENT */}
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        position: "relative",
                                        zIndex: 2
                                    }}>
                                        <Typography variant="h6" mb={1}>
                                            {currentQuestion.answer1 + "👍"}
                                        </Typography>

                                        <Box sx={{ flex: 1, overflow: "hidden" }}>
                                            <ImageRow images={imagesFirstAnswer} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>


                            {/* QUESTION / EXPLANATION*/}
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 0,
                                    overflow: "visible",
                                    display: "flex",
                                    justifyContent: "center",
                                    pointerEvents: "none",
                                    position: "relative",
                                    zIndex: 10,
                                }}
                            >
                                <Card
                                    sx={{
                                        p: 2,
                                        width: "60%",
                                        height: "20%",
                                        minHeight: 15,
                                        position: "relative",
                                        transform: "translateY(-50%)",
                                    }}
                                >
                                    <Typography variant="subtitle1" align="center">
                                        {selected === null ?
                                            currentQuestion.question :
                                            correctAnswerGiven ?
                                                "Richtig! " + currentQuestion.explanation :
                                                    "Leider falsch. " + currentQuestion.explanation}
                                    </Typography>
                                </Card>
                            </Box>

                            {/* Second answer */}
                            <Box
                                onClick={() => onAnswer(1)}
                                sx={{...borderWhenAnswerGiven(1, "#2596be"),
                                    position: "relative",
                                    overflow: "hidden",
                                    height: "40vh",
                                    p:10,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                    }}
                                >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                        width: `${getGestureProgressFor(1)}%`,
                                        height: "100%",
                                        background: "#3322ff",
                                        transition: "width 0.1s linear",
                                        pointerEvents: "none",
                                        zIndex: 1,
                                    }}
                                />
                                <Box sx={{ flex: 1,  height: "40vh" }}>
                                    <ImageRow images={imagesSecondAnswer} />
                                    <Typography variant="h6" mb={1} sx={{ alignSelf: "center" }}>
                                        {currentQuestion.answer2 + "👎"}
                                    </Typography>
                                </Box>
                                    </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Gamescreen;
