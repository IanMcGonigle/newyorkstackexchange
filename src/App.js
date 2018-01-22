import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const scraperjs = require("scraperjs");

class App extends Component {
  componentDidMount() {
    // scraperjs.StaticScraper.create(
    //   "https://interpersonal.stackexchange.com/questions?page=25&sort=newest"
    // )
    //   .scrape(function($) {
    //     return $(".question-hyperlink")
    //       .map(function() {
    //         return $(this).text();
    //       })
    //       .get();
    //   })
    //   .then(function(news) {
    //     console.log(news);
    //   });

    axios
      .get(
        "https://interpersonal.stackexchange.com/questions?page=25&sort=newest"
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
