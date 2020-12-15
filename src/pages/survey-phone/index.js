import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";

const surveyJSON = {
  pages: [
    {
      name: "页面1",
      elements: [
        { type: "boolean", name: "问题6" },
        { type: "comment", name: "问题7" },
        {
          type: "checkbox",
          name: "问题2",
          choices: ["item1", "item2", "item3"],
        },
        { type: "text", name: "问题5" },
        {
          type: "image",
          name: "问题3",
          imageLink:
            "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg",
        },
        {
          type: "matrixdropdown",
          name: "问题4",
          columns: [
            { name: "Column 1" },
            { name: "Column 2" },
            { name: "Column 3" },
          ],
          choices: [1, 2, 3, 4, 5],
          rows: ["Row 1", "Row 2"],
        },
        { type: "panel", name: "面板1" },
        {
          type: "radiogroup",
          name: "问题1",
          choices: ["item1", "item2", "item3"],
        },
      ],
    },
  ],
};

const SurveyPhone = () => {
  const model = new Survey.Model(surveyJSON);
  const onComplete = (result) => {
    console.log(result);
  };

  return (
    <div className="">
      <h2> SurveyJS Library - a sample survey below </h2>
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default SurveyPhone;
