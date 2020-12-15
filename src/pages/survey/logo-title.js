import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "./style/index.less";

Survey.StylesManager.applyTheme("default");

const json = {
  title: "Survey Title&Logo demo",
  description:
    "Please take look at the survey title and logo. Test the settings on the right panel ->",
  logo: "https://surveyjs.io/favicon.ico",
  logoWidth: 60,
  logoHeight: 60,
  // "cookieName": "my123",
  questionTitleLocation: "left",
  showQuestionNumbers: "off",
  questions: [
    {
      name: "name",
      type: "text",
      title: "Please enter your name:",
      placeHolder: "Jon Snow",
      isRequired: true,
    },
    {
      name: "birthdate",
      type: "text",
      inputType: "date",
      title: "Your birthdate:",
      isRequired: true,
    },
    {
      name: "color",
      type: "text",
      inputType: "color",
      title: "Your favorite color:",
    },
    {
      name: "email",
      type: "text",
      inputType: "email",
      title: "Your e-mail:",
      placeHolder: "jon.snow@nightwatch.org",
      isRequired: true,
      validators: [
        {
          type: "email",
        },
      ],
    },
  ],
};

export default function LogoTitle() {
  const model = new Survey.Model(json);
  const onComplete = (result) => {
    console.log(result);
  };
  const onValueChanged = (result) => {
    console.log(result);
  };

  return (
    <div className="container">
      <h2> SurveyJS Library - a sample survey below </h2>
      <Survey.Survey
        model={model}
        onComplete={onComplete}
        onValueChanged={onValueChanged}
      />
    </div>
  );
}
