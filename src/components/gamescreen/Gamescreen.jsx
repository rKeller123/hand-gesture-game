import React, { useState } from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";

const DESIGN_WIDTH = 1200;
const DESIGN_HEIGHT = 1000;

const ImageRow = ({ images = [] }) => (
    <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        {images.map((src, i) => (
            <Card key={i} sx={{ flex: 1, minWidth: 0 }}>
                <CardMedia
                    component="img"
                    image={src}
                    alt={`img-${i}`}
                    sx={{ width: "100%", objectFit: "cover" }}
                />
            </Card>
        ))}
    </Box>
);

export const Gamescreen = () => {
    const [selected, setSelected] = useState(null);
    const [correctAnswerGiven, setCorrectAnswerGiven] = useState(null);
    const [numOfCorrects, setNumOfCorrects] = useState(0);

    const correctAnswer = 2;

    const handleClick = (answerNum) => {
        const isCorrect = answerNum === correctAnswer;

        setSelected(answerNum);
        setCorrectAnswerGiven(isCorrect);
        setNumOfCorrects((c) => c + (isCorrect ? 1 : 0));

        if (isCorrect) {
            // TODO: load next
        } else {
            // TODO: send to final screen
        }
    };

    const answerBorder = (optionNum, baseBg) => {
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

    const titanicImages = [
        "pictures/bild1.jpg",
        "pictures/bild2.jpg",
        "pictures/bild3.jpg",
    ];

    const avatarImages = [
        "pictures/bild4.jpg",
        "pictures/bild5.jpg",
        "pictures/bild6.jpg",
    ];

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
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
                        <Box sx={{ p: 2, width: "80%", height:"50%", flexDirection: "column", border:"1px solid black" }}>
                            {/* Header */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                                    <CardMedia component="img" image="logo.png" alt="Logo" sx={{ width: 120, height: "auto" }} />
                                </Box>

                                <Box sx={{ textAlign: "right" }}>
                                    <Typography>Score Player 1: {numOfCorrects}</Typography>
                                    <Typography>Highscore Player 2: 0</Typography>
                                </Box>
                            </Box>

                            {/* TITANIC */}
                            <Box
                                onClick={() => handleClick(1)}
                                sx={answerBorder(1, "#ffddf1")}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" mb={1}>
                                        TITANIC
                                    </Typography>
                                    <ImageRow images={titanicImages} />
                                </Box>
                            </Box>

                            {/* QUESTION */}
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 0,
                                    overflow: "visible",
                                    display: "flex",
                                    justifyContent: "center",
                                    pointerEvents: "none",
                                    position: "relative",
                                }}
                            >
                                <Card
                                    sx={{
                                        p: 2,
                                        width: "60%",
                                        height: "20%",
                                        minHeight: 15,
                                        position: "relative",
                                        transform: "translateY(-50%)"
                                    }}
                                >
                                    <Typography variant="subtitle1" align="center">
                                        Welcher Film hat weltweit mehr Geld eingespielt? Titanic oder Avatar.
                                    </Typography>
                                </Card>
                            </Box>


                            {/* AVATAR */}
                            <Box
                                onClick={() => handleClick(2)}
                                sx={answerBorder(2, "#2596be")}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <ImageRow images={avatarImages} />
                                </Box>
                                <Typography variant="h6" mb={1} sx={{ alignSelf: "center" }}>
                                    AVATAR
                                </Typography>
                            </Box>
                        </Box>
                    <Box
                        sx={{
                            width: "20%",
                            bgcolor: "red",
                            border: "2px solid black",
                        }}
                    ></Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Gamescreen;
