const { subscribe, unsubscribe } = require("../controllers/newsletterCtrl");

const newsLetterRouter = require("express").Router();

newsLetterRouter.post("/", subscribe);
newsLetterRouter.delete("/:id", unsubscribe);

module.exports = newsLetterRouter;