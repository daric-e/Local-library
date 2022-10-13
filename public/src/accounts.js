const {findAuthorById} = require('./books')


// find accounts name using .find()
function findAccountById(accounts, id) {
  let result = accounts.find((peeps) => {
    return peeps.id === id;
  });
  return result ? result : null;
}

// sort accounts by last same -> .sort()
//.sort needs two
function sortAccountsByLastName(accounts) {
  accounts.sort((accA, accB) => {
    return accA.name.last.toLowerCase() < accB.name.last.toLowerCase() ? -1 : 1;
  });
  return accounts;
}

// loop through books 
function getTotalNumberOfBorrows(account, books) {
  let result = [];
  for (let bookUsed in books) {
    const found = books[bookUsed].borrows.find(
      (borrows) => borrows.id === account.id
    );
    if (found) {
      result.push(found);
    }
  }
  return result.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id
  const bookFilter = books.filter((book) => book.borrows.some((borrow => !borrow.returned && borrow.id === accountId)))
  bookFilter.forEach((book => book.author = findAuthorById(authors, book.authorId)))
  return bookFilter;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
