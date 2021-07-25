window.addEventListener ('load', function () {
  if (typeof Storage !== 'undefined') {
    if (localStorage.getItem (localStorageKey) === null) {
      localStorage.setItem (localStorageKey, null);
    }
  } else {
    alert ('Browser yang Anda gunakan tidak mendukung Web Storage');
  }

  books = JSON.parse (localStorage.getItem (localStorageKey)) || books;
  showBook (books);

  formInput.addEventListener ('submit', addBook);
  formSearch.addEventListener ('submit', findBook);
  document.addEventListener ('newBook', makeBook);
});
