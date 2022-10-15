const { findAuthorById } = require("./books.js");

// get total counts by usuing .length in both functions
function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}


// use .reduce() to collect total of books being borrowed 

function getBooksBorrowedCount(books) {
  let checkedOut = books.reduce((total, booksUsed) => {
    if (!booksUsed.borrows?.[0].returned) {
      total += 1;
    }
    return total;
  }, 0);
  return checkedOut;
}

// HELPER FUNCTION 
// "_" prefix indicates private function 
function _sortBooksByCount(book1, book2) {
  return book1.count < book2.count ? 1 : -1;
}

function getMostCommonGenres (books) {
  let commonGenreObj = {};
  books.forEach((bookUsed) => {
    let currentBookGenre = bookUsed.genre;
    if (currentBookGenre in commonGenreObj){
      commonGenreObj[currentBookGenre] += 1;
    }else{
      commonGenreObj[currentBookGenre] = 1;
    }
  });
  let genreArray = Object.keys(commonGenreObj);
  let result = genreArray.map((genre)=>{
    return {name: genre, count: commonGenreObj[genre] };  
  }).splice(0, 5).sort(_sortBooksByCount);
  //console.log('RESULT', result);
  return result;
};

function getMostPopularBooks(books) {
  return books
  .map((bookUsed) => {
return {name: bookUsed.title, count: bookUsed.borrows.length };
  })
  .sort(_sortBooksByCount)
  .slice(0, 5);
}


 // most popular author 
 // popularity is determined by the times borrowed
  // return array with two keys
function getMostPopularAuthors(books, authors) {
  const mappedBooks = books.map((book) => {
    const {name: {first, last}} = findAuthorById(authors, book.authorId);
    return {name: `${first} ${last}`, count: book.borrows.length };
  });
  return mappedBooks.sort((book1, book2) => book2.count - book1.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
