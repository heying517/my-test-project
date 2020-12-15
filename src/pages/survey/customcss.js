import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "./style/index.less";

Survey.StylesManager.applyTheme("");

const myCss = {
  matrix: {
    root: "table table-striped",
  },
  navigationButton: "button btn-lg",
};

const json = {
  questions: [
    {
      type: "matrix",
      name: "Quality",
      title:
        "Please indicate if you agree or disagree with the following statements",
      columns: [
        {
          value: 1,
          text: "Strongly Disagree",
        },
        {
          value: 2,
          text: "Disagree",
        },
        {
          value: 3,
          text: "Neutral",
        },
        {
          value: 4,
          text: "Agree",
        },
        {
          value: 5,
          text: "Strongly Agree",
        },
      ],
      rows: [
        {
          value: "affordable",
          text: "Product is affordable",
        },
        {
          value: "does what it claims",
          text: "Product does what it claims",
        },
        {
          value: "better then others",
          text: "Product is better than other products on the market",
        },
        {
          value: "easy to use",
          text: "Product is easy to use",
        },
      ],
    },
  ],
};

function onComplete(result) {
  console.log(result);
}

export default function Customcss() {
  const model = new Survey.Model(json);
  return (
    <div className="container">
      <h2> SurveyJS Library - Customcss </h2>
      <Survey.Survey model={model} css={myCss} onComplete={onComplete} />
    </div>
  );
}
