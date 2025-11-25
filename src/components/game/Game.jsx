import React, {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import { useGestureDetection } from "../../common/gesture_detection/GestureDetectionContext.jsx";
import Gamescreen from "../gamescreen";
import {useNavigate} from "react-router";

export const Game = ({ reportNewScore }) => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState(null);
    const [correctAnswerGiven, setCorrectAnswerGiven] = useState(null);
    const [numOfCorrects, setNumOfCorrects] = useState(0);

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const { gesture, gestureProgress } = useGestureDetection();

    //Load the questions
    useEffect(() => {
        fetch("/questions.json")
            .then((res) => res.json())
            .then((data) => setQuestions(data))
    }, []);
    useEffect(() => {
        if (questions.length > 0) pickNextQuestion();
    }, [questions]);


    const pickNextQuestion = () => {
        const index = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[index]);
        setCorrectAnswer(questions[index].correct_answer);
        setSelected(null);
        setCorrectAnswerGiven(null);
    };

    const handleAnswer = (answerNum) => {
        const isCorrect = answerNum === correctAnswer;

        setSelected(answerNum);
        setCorrectAnswerGiven(isCorrect);
        setNumOfCorrects((c) => c + (isCorrect ? 1 : 0));

        if (isCorrect) {
            setTimeout(() => pickNextQuestion(questions), 3000);
        } else {
            reportNewScore(Date.now(), numOfCorrects)
            setTimeout(() => {
                navigate("/end-screen")
            }, 3000)
        }
    };

    useEffect(() => {
        if (gestureProgress.progress >= 10 && selected === null) {
            let chosen = null;

            switch (gestureProgress.gesture) {
                case "thumbs_up":
                    chosen = 0;
                    break;
                case "thumbs_down":
                    chosen = 1;
                    break;
                default:
                    break;
            }

            if (chosen !== null) handleAnswer(chosen);
        }
    }, [gestureProgress, gesture, selected]);

    if(!currentQuestion){
        return (
        <Box sx={{ width: 120, display: "flex", justifyContent: "center" }}>
            <CircularProgress aria-label="loading spinner" size={30} />
        </Box>
        )
    }
    else {
        return (
            <Gamescreen
                selected={selected}
                correctAnswerGiven={correctAnswerGiven}
                numOfCorrects={numOfCorrects}
                onAnswer={handleAnswer}
                currentQuestion={currentQuestion}
                gestureProgress={gestureProgress}
            />
        );
    }
};

export default Game;
