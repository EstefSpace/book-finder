
async function findBook(name) {
    const url = `https://libros1.p.rapidapi.com/books?Title=${name}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5e00cde1famshb159301a3052367p1cda0cjsnb5ff23b6cd60',
		'x-rapidapi-host': 'libros1.p.rapidapi.com',
		Accept: 'application/ld+json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();

	

	const numberBooks = result["hydra:totalItems"];
	const books = result["hydra:member"];

	if(numberBooks === 0) {
		return document.getElementById("book-error").setAttribute("open", "true")
	}
	
	document.getElementById("book-view").setAttribute("open", "true");
	document.getElementById("number-books").innerHTML = `${numberBooks}`;

	books.forEach((book, index) => {
		const divBooks = document.getElementById("books");

		const divBook = document.createElement("div");

		if(book.PagesInFile === 0) { 
			return divBook.innerHTML = `
			<details>
		<summary>${book.Title}</summary>
		<p><strong>Autor:</strong> ${book.Author}</p>
		<p><a href="${book.downloadUrl}" disabled target="_blank" rel="noopener noreferrer">Descargar libro</a></p>
	  </details>
	  <hr>`
		}
		

		divBook.innerHTML = `
		<details>
		<summary>${book.Title}</summary>
		<p><strong>Autor:</strong> ${book.Author}</p>
		<p><strong>Paginas:</strong> ${book.PagesInFile}</p>
		<p><a href="${book.downloadUrl}" target="_blank" rel="noopener noreferrer">Descargar libro</a></p>
	  </details>
	  <hr>`
	  divBook.style.marginBottom = `15px`;

	  divBooks.appendChild(divBook)
	})
} catch (error) {
	console.error(error)
	document.getElementById("book-error").setAttribute("open", "true");
}
}

document.querySelector("form").addEventListener("submit", () => {
	event.preventDefault();
	const title = document.querySelector("input").value;

	if(title.trim() === "") {
		document.querySelector("input").setAttribute("aria-invalid", "true");
		document.querySelector("input").setAttribute("placeholder", "Escribe algo porfavor.");
	} else {
		document.querySelector("input").setAttribute("aria-invalid", "false");

		const title = document.querySelector("input").value;


		findBook(title)
	}	

})

// para cerrar los modals

document.getElementById("close-dialog-view").addEventListener("click", () => {
	document.getElementById("book-view").removeAttribute("open")
	const divBooks = document.getElementById("books");

	while(divBooks.firstChild) {
		divBooks.removeChild(divBooks.firstChild)
	}
})


document.getElementById("close-dialog-error").addEventListener("click", () => {
	document.getElementById("book-error").removeAttribute("open")
})
