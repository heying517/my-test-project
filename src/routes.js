/* eslint-disable no-undef, react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "mobx-react";
import store from "@/store";

import Home from "@/pages/home";
import About from "@/pages/about";
import Test from "@/pages/test";
import Antv from "@/pages/antv";
import ExtendAntvG6 from "@/pages/extend-antv-g-6";
import RelationDiscover from "@/pages/relation-discover";
import MySurvey from "@/pages/survey";
import MySurveyCreator from "@/pages/survey-creator";
import SurveyPhone from "@/pages/survey-phone";
import PdmanDemo from "@/pages/pdman-demo/index";
import NotFound404 from "@/pages/not-found-404";

export default () => (
  <Provider {...store}>
    <Router basename={G.root}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/test" component={Test} />
        <Route path="/antv" component={Antv} />
        <Route path="/extend-antv-g6" component={ExtendAntvG6} />
        <Route path="/relation-discover" component={RelationDiscover} />
        <Route path="/survey" component={MySurvey} />
        <Route path="/survey-creator" component={MySurveyCreator} />
        <Route path="/survey-phone" component={SurveyPhone} />
        <Route path="/pdman-demo" component={PdmanDemo} />
        <Route component={NotFound404} />
      </Switch>
    </Router>
  </Provider>
);
