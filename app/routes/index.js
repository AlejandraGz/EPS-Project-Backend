module.exports = (app) => {
  app.use("/api/v1/auth", require("./auth.route"));
  app.use("/api/v1/profile", require("./profile.route"));
  // app.use("/api/v1/publication", require("./publication.route"));
};