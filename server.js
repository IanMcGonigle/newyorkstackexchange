const path = require("path");
const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const port = process.env.PORT || 5000;

const app = express();
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

const getStackExchange = function(req, res, next) {
  const path = `https://interpersonal.stackexchange.com/questions?page=${Math.round(
    Math.random() * 25
  )}`;

  request(path, function(error, response, body) {
    const $ = cheerio.load(body);
    const links = $(".question-hyperlink");
    const questions = [];
    const qs = links.each(function(item, index) {
      const linkObj = links[item];
      const qUrl = `https://interpersonal.stackexchange.com${
        linkObj.attribs.href
      }`;
      const qText = `"${linkObj.children[0].data}"`.replace(/\[[^\]]*\]/g, "");
      const result = {
        url: qUrl,
        text: qText
      };

      if (qText !== "") {
        questions.push(result);
      }
    });

    res.questions = questions || [];
    next();
  });
};

const getNewYorker = function(req, res, next) {
  request("https://www.newyorker.com/cartoons/random/randomAPI", function(
    error,
    response,
    body
  ) {
    const $ = cheerio.load(body);
    res.cartoon = JSON.parse(body)[0].src || "";

    next();
  });
};

const getRandomQuestion = function(questions) {};

app.use(getStackExchange);
app.use(getNewYorker);

app.get("/", function(req, res) {
  const index = Math.round((res.questions.length - 1) * Math.random());
  const selectedQuestion = res.questions.splice(index, 1);

  res.render("index", {
    title: "Hey",
    message: "Hello there!",
    cartoon: res.cartoon,
    question: selectedQuestion[0]
  });
});

app.listen(port, function() {
  console.log("listening");
});
