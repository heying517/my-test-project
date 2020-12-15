/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "./style/index.less";
import { VelocityComponent } from "velocity-react";

require("velocity-animate");
require("velocity-animate/velocity.ui");

Survey.StylesManager.applyTheme("default");

const json = {
  pages: [
    {
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
        {
          type: "rating",
          name: "satisfaction",
          title: "How satisfied are you with the Product?",
          isRequired: true,
          mininumRateDescription: "Not Satisfied",
          maximumRateDescription: "Completely satisfied",
        },
        {
          type: "rating",
          name: "recommend friends",
          visibleIf: "{satisfaction} > 3",
          title:
            "How likely are you to recommend the Product to a friend or co-worker?",
          mininumRateDescription: "Will not recommend",
          maximumRateDescription: "I will recommend",
        },
        {
          type: "comment",
          name: "suggestions",
          title: "What would make you more satisfied with the Product?",
        },
      ],
    },
    {
      questions: [
        {
          type: "radiogroup",
          name: "price to competitors",
          title: "Compared to our competitors, do you feel the Product is",
          choices: [
            "Less expensive",
            "Priced about the same",
            "More expensive",
            "Not sure",
          ],
        },
        {
          type: "radiogroup",
          name: "price",
          title: "Do you feel our current price is merited by our product?",
          choices: [
            "correct|Yes, the price is about right",
            "low|No, the price is too low for your product",
            "high|No, the price is too high for your product",
          ],
        },
        {
          type: "multipletext",
          name: "pricelimit",
          title: "What is the... ",
          items: [
            {
              name: "mostamount",
              title: "Most amount you would every pay for a product like ours",
            },
            {
              name: "leastamount",
              title: "The least amount you would feel comfortable paying",
            },
          ],
        },
      ],
    },
    {
      questions: [
        {
          type: "text",
          name: "email",
          title:
            "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button.",
        },
      ],
    },
  ],
};

// let doAnimantion = true;

// // function animate(animitionType, duration) {
// //   if (!duration) duration = 1000;
// //   const element = document.getElementById("surveyElement");
// //   $(element).velocity(animitionType, { duration });
// // }

// function onCurrentPageChanged(sender) {
//   animate("slideDown", 500);
// }

// function onCompleting(sender, options) {
//   if (!doAnimantion) return;
//   options.allowComplete = false;
//   setTimeout(() => {
//     doAnimantion = false;
//     sender.doComplete();
//     doAnimantion = true;
//   }, 500);
//   animate("slideUp", 500);
// }

// animate("slideDown", 1000);

const doAnimantion = true;

export default class MyAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubComponent: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showSubComponent: true,
      });
    }, 0);
  }

  onComplete = (result) => {
    console.log("onComplete", result);
  };

  onValueChanged = (result) => {
    console.log("onValueChanged", result);
  };

  onCurrentPageChanging = (sender, option) => {
    console.log(sender);
    if (option.isNextPage || option.isPrevPage) {
      // option.allowChanging = false;
      sender.currentPage = sender.newCurrentPage;
      this.setState(
        {
          showSubComponent: true,
        },
        () => {
          //
          // sender.currentPageNo = 1;
          console.log(sender.currentPageNo);
        }
      );
    }
  };

  onCurrentPageChanged = (sender, option) => {
    console.log("onCurrentPageChanged");
    console.log(sender.currentPageNo);
    // console.log(option);
    // console.log(option.newCurrentPage);
    // console.log(option.oldCurrentPage);
    // if(sender)
    // this.setState({
    //   showSubComponent: true,
    // });
  };

  render() {
    const model = new Survey.Model(json);
    return (
      <VelocityComponent
        animation={{ opacity: this.state.showSubComponent ? 1 : 0 }}
        duration={500}
      >
        <div className="container">
          <h2>SurveyJS Library - a sample survey below</h2>
          <Survey.Survey
            model={model}
            // onCompleting={onCompleting}
            onComplete={this.onComplete}
            onValueChanged={this.onValueChanged}
            onCurrentPageChanging={this.onCurrentPageChanging}
            onCurrentPageChanged={this.onCurrentPageChanged}
          />
        </div>
      </VelocityComponent>
    );
  }
}
