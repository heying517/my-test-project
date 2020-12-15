// eslint-disable-next-line filenames/match-exported
import React from "react";
// import * as ko from "knockout";
import * as SurveyJSCreator from "survey-creator";
import * as Survey from "survey-knockout";
import zhCn from "./simplified-chinese";
import imgURL from "./image/drag-image.png";

import "./style/index.less";
import "survey-creator/survey-creator.css";

// let SurveyJSCreator = SurveyJSCreator.default;

SurveyJSCreator.editorLocalization.defaultLocale = "zh-cn";
SurveyJSCreator.editorLocalization.currentLocale = "zh-cn";
SurveyJSCreator.editorLocalization.locales["zh-cn"] = zhCn;

SurveyJSCreator.StylesManager.ThemeColors.myTheme = {
  "$primary-color": "#4c60bf",
  "$secondary-color": "#4c60bf",
  "$primary-text-color": "#4a4a4a",
  "$secondary-text-color": "#a7a7a7",
  "$inverted-text-color": "#ffffff",
  "$primary-hover-color": "#18a689",
  "$selection-border-color": "#4c60bf",
  "$primary-icon-color": "#3d4d5d",
  "$primary-bg-color": "#fff",
  "$secondary-bg-color": "#f4f4f4",
  "$primary-border-color": "#e7eaec",
  "$secondary-border-color": "#ddd",
  "$error-color": "#ed5565",
};

// color customization
const mainColor = "#4c60bf";
const mainHoverColor = "#4c60bf";
const textColor = "#4a4a4a";
const headerColor = "#4a4a4a";
const headerBackgroundColor = "#4a4a4a";
const bodyContainerBackgroundColor = "#fafafa";

const defaultThemeColorsSurvey = Survey.StylesManager.ThemeColors.default;
defaultThemeColorsSurvey["$main-color"] = mainColor;
defaultThemeColorsSurvey["$main-hover-color"] = mainHoverColor;
defaultThemeColorsSurvey["$text-color"] = textColor;
defaultThemeColorsSurvey["$header-color"] = headerColor;
defaultThemeColorsSurvey["$header-background-color"] = headerBackgroundColor;
defaultThemeColorsSurvey[
  "$body-container-background-color"
] = bodyContainerBackgroundColor;

const defaultThemeColorsEditor =
  SurveyJSCreator.StylesManager.ThemeColors.default;

defaultThemeColorsEditor["$primary-color"] = mainColor;
defaultThemeColorsEditor["$secondary-color"] = mainColor;
defaultThemeColorsEditor["$primary-hover-color"] = mainHoverColor;
defaultThemeColorsEditor["$primary-text-color"] = textColor;
defaultThemeColorsEditor["$selection-border-color"] = mainColor;

Survey.StylesManager.applyTheme();
SurveyJSCreator.StylesManager.applyTheme();

// SurveyJSCreator.StylesManager.applyTheme("myTheme");

class MySurveyCreator extends React.Component {
  surveyCreator;
  componentDidMount() {
    const options = {
      showEmbededSurveyTab: true
    };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(null, options);
    this.surveyCreator.showToolbox = "right";
    this.surveyCreator.showPropertyGrid = "right";
    this.surveyCreator.rightContainerActiveItem("toolbox");
    this.surveyCreator.placeholderHtml = `
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
        <img style="width: 201px; height: 201px" src=${imgURL}/>
        <div style="font-size: 16px; max-width: 210px;">
          拖放一个问题开始设计你的表单
        </div>
      </div>`;
    console.log(this.surveyCreator);
    // this.surveyCreator.topContainer
    this.surveyCreator.isAutoSave = true;
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    // this.surveyCreator.toolbox.addItem({
    //   name: "countries",
    //   isCopied: true,
    //   iconName: "icon-default",
    //   title: "All countries",
    //   json: {
    //     type: "dropdown",
    //     optionsCaption: "Select a country...",
    //     choicesByUrl: {
    //       url: "https://restcountries.eu/rest/v2/all",
    //     },
    //   },
    // });
    // name: "embed",
    // title: this.getLocString("ed.embedSurvey"),
    // template: "se-tab-embed",
    // data: this,
    // action: () => this.showEmbedEditor(),
    // this.surveyCreator.tabs().push({
    //   name: "survey-templates",
    //   title: "My Custom Tab",
    //   template: "custom-tab-survey-templates",
    //   action: () => {
    //     this.surveyCreator.makeNewViewActive("survey-templates");
    //   },
    //   data: {
    //     a: "今天星期五",
    //     b: JSON.stringify(this.surveyCreator.getSurveyJSON()),
    //   },
    // });
    this.surveyCreator.render("surveyCreatorContainer");
  }

  saveMySurvey = () => {
    console.log(this.surveyCreator.text);
    // this.surveyCreator.tabs()[4].data.b = this.surveyCreator.text;
    // console.log(this.surveyCreator.tabs());
    // console.log(this.surveyCreator.getSurveyJSON());
  };

  render() {
    return ( 
      <div>
        <script
          type="text/html"
          id="custom-tab-survey-templates"
        > 
          {' '}
          {
        `<div id="test">
            <div data-bind="text: $data.b"></div>
          </div>`
      }
          {' '}
 
        </script> 
        {' '}
        <div id="surveyCreatorContainer" />
      </div>
    );
  }
}

export default MySurveyCreator;
