"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewQuestion,
  setSelectedQuestionId,
  addAnswerToQuestion,
  setSelectedAnswers,
} from "../../redux/stepper/menuSlice";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Header from "../ui/Header";
import Button from "../ui/Button";

const AddQuestion = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswerText, setNewAnswerText] = useState("");

  const dispatch = useDispatch();
  const { addedQuestions, selectedQId, answers } = useSelector(
    (state) => state.menu
  );

  const handleAddQuestion = () => {
    if (newQuestion) {
      dispatch(addNewQuestion(newQuestion));
      setNewQuestion("");
    }
  };

  const handleQuestionChange = (questionId) => {
    dispatch(setSelectedQuestionId(questionId));
    const filteredAnswers = answers.filter(
      (ans) => ans.questionId === questionId
    );
    dispatch(setSelectedAnswers(filteredAnswers));
  };

  const handleAddAnswer = () => {
    if (newAnswerText && selectedQId) {
      const newAnswer = {
        id: answers.length + 1,
        questionId: selectedQId,
        answerText: newAnswerText,
      };
      dispatch(addAnswerToQuestion(newAnswer));
      setNewAnswerText("");
    }
  };
  return (
    <div>
      {/* Menu Item Question */}
      <div className="mt-7">
        <Header secondary title="Menu Item Question" subtitle="(optional)" />
        <SelectInput
          className="w-full p-4  font-light bg-white border-2 border-gray-200 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
          value={selectedQId}
          onChange={(e) => handleQuestionChange(e.target.value)}
          data={addedQuestions}
        />
        <div className="md:flex md:justify-between md:items-center gap-x-3">
          <div className="md:basis-2/3">
            <Input
              label="Add new question"
              type="text"
              id="menu-item-question"
              placeholder="Enter a question.."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
          </div>
          <div className="md:basis-1/3">
            <Button name="Add question" onClick={handleAddQuestion} />
          </div>
        </div>

        <div className="mt-2">
          <Header secondary title="Answers" />
          {answers.map(
            (answer) =>
              answer.questionId === selectedQId && (
                <div key={answer.id} className="p-3 my-2 rounded-md border-2 border-gray-100 bg-amber-500 text-white">
                  {answer.answerText}
                </div>
              )
          )}
          <div className="md:flex md:justify-between md:items-center gap-x-3">
            <div className="md:basis-2/3">
              <Input
                label="Write answer"
                type="text"
                placeholder="Enter an answer.."
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
              />
            </div>
            <div className="md:basis-1/3">
              <Button name="Add answer" onClick={handleAddAnswer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
