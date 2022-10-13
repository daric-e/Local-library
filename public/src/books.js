//find the authors id using .find()
function findAuthorById(authors, id) {
  let result = authors.find((ids) => {
    return ids.id === id;
  });
  return result ? result : null;
}
//find the books id using .find()
function findBookById(books, id) {
  let result = books.find((reading) => {
    return reading.id === id;
  });
  return result ? result : null;
}

function partitionBooksByBorrowedStatus(books) {
  let notReturned = books.filter((reading) => {
    let borrows = reading.borrows;
    let nonReturned = borrows.some((currbook) => {
      return currbook.returned === false;
    });
    return nonReturned;
  });
  let isReturned = books.filter((reading) => {
    let borrows = reading.borrows;
    let isReturned = borrows.every((currbook) => {
      return currbook.returned === true;
    });
    return isReturned;
  });

  return [notReturned, isReturned];
}
//
function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const result = borrows.map((borrow) => {
    let foundBook = accounts.find((peeps) => {
      return peeps.id === borrow.id;
    });
    foundBook.returned = borrow.returned;
    return foundBook;
  })
  return result.splice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
