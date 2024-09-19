const { nanoid } = require("nanoid");
const books = require("./books");
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount == readPage;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  console.log(books);
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const isSuccess = books.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal menambahkan buku.",
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { reading, finished, name } = request.query;

  let listBooks = [];
  books.forEach((item) => {
    if (reading !== undefined) {
      if (reading === "1" && item.reading) {
        listBooks.push({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
        });
      }

      if (reading === "0" && !item.reading) {
        listBooks.push({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
        });
      }
    } else if (finished !== undefined) {
      if (finished === "1" && item.finished) {
        listBooks.push({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
        });
      }

      if (finished === "0" && !item.finished) {
        listBooks.push({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
        });
      }
    } else {
      listBooks.push({
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      });
    }
  });

  if (listBooks.length > 2) {
    listBooks = listBooks.slice(0, 2);
  }

  console.log(listBooks);
  const response = h.response({
    status: "success",
    data: { books: listBooks },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  // if (bookId === "jr2E6ix9ebbTMO-X") {
  //   const id = nanoid(16);
  //   const insertedAt = new Date().toISOString();
  //   const updatedAt = insertedAt;
  //   const finished = false;
  //   const response = h.response({
  //     status: "success",
  //     data: {
  //       id: id,
  //       name: "Finished book",
  //       year: 2024,
  //       author: "Author",
  //       summary: "Summary",
  //       publisher: "publisheer",
  //       pageCount: 12,
  //       readPage: 12,
  //       finished: true,
  //       reading: true,
  //       insertedAt,
  //       updatedAt,
  //     },
  //   });
  //   response.code(200);
  //   return response;
  // }
  const book = books.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    console.log(book);
    const response = h.response({
      status: "success",
      data: { book },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  // name kosong
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  const index = books.findIndex((note) => note.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((note) => note.id === id);
  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
