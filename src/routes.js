const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      // const { name, location } = request.query;
      // console.log("query:", name, location);
      return "homepage";
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookByIdHandler,
  },
  // {
  //   method: "GET",
  //   path: "/about",
  //   handler: (request, h) => {
  //     return "about page";
  //   },
  // },
  //   {
  //     method: "*",
  //     path: "/{any*}",
  //     handler: (request, h) => {
  //       return "halaman tidak ditemukan";
  //     },
  //   },
  // {
  //   method: "GET",
  //   path: "/user/{username}",
  //   handler: (request, h) => {
  //     console.log("params", request.params);
  //     const { username } = request.params;
  //     return `username ${username}`;
  //   },
  // },
  // {
  //   method: "GET",
  //   path: "/hello/{name?}",
  //   handler: (request, h) => {
  //     console.log("params", request.params);
  //     //   const { username } = request.params;
  //     return `username username`;
  //   },
  // },
];

module.exports = routes;
