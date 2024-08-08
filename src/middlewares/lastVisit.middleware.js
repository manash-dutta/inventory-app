import cookieParser from "cookie-parser";

export const setLastVisit = (req, res, next) => {
  // if cookie is set, then add a local variable with last visit time data
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  next();
};

// // These are the correct implementation of setting up and retrieving cookies?
// // A
// app.use(cookieParser());
// const setCookie = (req, res, next) => {
//   res.cookie("name", "coding Ninjas", {
//     maxAge: 5 * 24 * 60 * 60 * 1000,
//   });
//   res.cookie("lastvisit", new Date().toLocaleString(), {
//     maxAge: 5 * 24 * 60 * 60 * 1000,
//   });
//   next();
// };

// app.get("/", setCookie, (req, res) => {
//   console.log(req.cookies);
//   res.send("hello");
// });
// // B
// app.use(cookieParser());
// const setCookie = (req, res, next) => {
//   res.cookie("name", "coding Ninjas", {
//     maxAge: 5 * 24 * 60 * 60 * 1000,
//   });
//   res.cookie("lastvisit", new Date().toLocaleString(), {
//     maxAge: 5 * 24 * 60 * 60 * 1000,
//   });
//   next();
// };
// const getCookie = (req, res, next) => {
//   const { name, lastVisit } = req.cookies;
//   console.log(name, lastVisit);
//   next();
// };
// app.get("/", setCookie, getCookie, (req, res) => {
//   res.send("hello");
// });
