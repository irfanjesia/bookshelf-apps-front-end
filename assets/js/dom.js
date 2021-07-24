const localStorageKey = "BOOKSHELF_APPS";

const title = document.querySelector("#inputBookTitle");
const author = document.querySelector("#inputBookAuthor");
const year = document.querySelector("#inputBookYear");
const isComplete = document.querySelector("#inputBookIsComplete");

const submitBook = document.querySelector("#bookInput");
const searchBook = document.querySelector("#bookSearch");

const formSearch = document.querySelector("#searchBook");
const formInput = document.querySelector("#inputBook")

const unreadBook = document.querySelector("#unread");
const readBook = document.querySelector("#read");

const searchValue = document.querySelector("#searchBookTitle");
const search = document.querySelector("#search");

const newBook = new Event("newBook");

let books = [];

function addBook(event) {
    event.preventDefault();

    const bookTitle = title,
        bookAuthor = author,
        bookYear = year,
        bookIsComplete = isComplete,
        book = {
            id: +new Date,
            title: bookTitle.value,
            author: bookAuthor.value,
            year: bookYear.value,
            isComplete: bookIsComplete.checked
        };
    books.push(book),
        document.dispatchEvent(newBook)
}

function findBook(event) {
    event.preventDefault();

    if (searchValue.value == "") {
        search.innerHTML = "";
        showBook(books)
    } else {
        showBook(books.filter((function(event) { return event.title.toLowerCase().includes(searchValue.value.toLowerCase()) })))
        search.innerHTML = "";
        const p = document.createElement("p");
        p.innerText = "Menampilkan hasil pencarian buku dengan judul \"" + searchValue.value + "\"";
        search.appendChild(p);
    }
}

function showRead(n) {
    const num = Number(n.target.id),
        idx = books.findIndex((function(event) { return event.id === num }));
    ((books[idx] = {...books[idx], isComplete: true }), document.dispatchEvent(newBook))
}

function showUnread(n) {
    const num = Number(n.target.id),
        idx = books.findIndex((function(event) { return event.id === num }));
    ((books[idx] = {...books[idx], isComplete: false }), document.dispatchEvent(newBook))
}

function deleteBook(n) {
    let con = confirm("Apakah anda yakin untuk menghapus buku ini?");

    if (con == true) {
        const del = Number(n.target.id),
            idx = books.findIndex((function(event) { return event.id === del }));
        books.splice(idx, 1);
        document.dispatchEvent(newBook);
    } else {
        return 0;
    }
}

function showBook(books) {
    unreadBook.innerHTML = "";
    readBook.innerHTML = "";

    for (const book of books) {
        const div_item = document.createElement("div");
        div_item.classList.add("bookshelf-item");

        const h2 = document.createElement("h2");
        h2.innerText = book.title;

        const p = document.createElement("p");
        p.innerText = "Penulis: " + book.author;

        const p2 = document.createElement("p");
        p2.innerText = "Tahun: " + book.year;

        if (div_item.appendChild(h2), div_item.appendChild(p), div_item.appendChild(p2), book.isComplete) {
            const div_action = document.createElement("div");
            div_action.classList.add("action");
            const unread_button = document.createElement("button");
            unread_button.id = book.id,
                unread_button.innerText = "Belum Selesai Dibaca",
                unread_button.classList.add("blue"),
                unread_button.addEventListener("click", showUnread);
            const del_button = document.createElement("button");
            del_button.id = book.id,
                del_button.innerText = "Hapus Buku",
                del_button.classList.add("red"),
                del_button.addEventListener("click", deleteBook),
                div_action.appendChild(unread_button),
                div_action.appendChild(del_button),
                div_item.appendChild(div_action),
                readBook.appendChild(div_item)
        } else {
            const div_action = document.createElement("div");
            div_action.classList.add("action");
            const read_button = document.createElement("button");
            read_button.id = book.id,
                read_button.innerText = "Selesai Dibaca",
                read_button.classList.add("green"),
                read_button.addEventListener("click", showRead);
            const del_button = document.createElement("button");
            del_button.id = book.id,
                del_button.innerText = "Hapus Buku",
                del_button.classList.add("red"),
                del_button.addEventListener("click", deleteBook),
                div_action.appendChild(read_button),
                div_action.appendChild(del_button),
                div_item.appendChild(div_action),
                unreadBook.appendChild(div_item)
        }
    }
}

function makeBook() {
    (function(event) { localStorage.setItem(localStorageKey, JSON.stringify(event)) })(books),
    showBook(books)
}