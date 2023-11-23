const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll,
  } = require("./customCtrl");
  const BookSession = require("../models/sessionModel");
  
  const postSession = createOne(BookSession);
  const updateSession = updateOne(BookSession);
  const deleteSession = deleteOne(BookSession);
  const getASession = getOne(BookSession);
  const getAllSession = getAll(BookSession);
  
  module.exports = {
    postSession,
    updateSession,
    deleteSession,
    getASession,
    getAllSession,
  };