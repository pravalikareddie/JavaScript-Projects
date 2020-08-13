class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class BookTasks{
    storeBooks;
    constructor(){
        this.storeBooks=new StoreBooks();
    }

    displayBookList(){
        const books=this.storeBooks.getBooks();
        books.forEach(book => {
            this.addBookToList(book);
        });

    }
    addBookToList(book){
            const table= document.querySelector("#books");
            const row=document.createElement("tr");
            row.innerHTML=`<td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`;
            table.appendChild(row);
     
    }
    deleteBookFromList(event){

        if(event.target.classList.contains("delete")){
            event.target.parentElement.parentElement.remove();
           const isbn = event.target.parentElement.previousElementSibling.textContent;
            console.log(event.target.parentElement.previousElementSibling)
            this.storeBooks.deleteBookFromStorage(isbn);
        }
       
    }
    showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert ${className}`;
        const container=document.querySelector('.wrapper');
        const form=document.querySelector('#book-form');
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div,form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);



    }
}


class StoreBooks{
    getBooks(){
        let books=localStorage.getItem("books");
        if(books==null)
        books=[];
        else
         books=JSON.parse(books);
        return books;
    }
    addBookToStorage(book){
        const books=this.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }
    deleteBookFromStorage(isbn){
        const books=JSON.parse(localStorage.getItem("books"));
        books.forEach((book,index)=>{
        if(book.isbn==isbn){
            books.splice(index,1);
        }
    }
        )
        localStorage.setItem("books",JSON.stringify(books));



    }
}
const bookTask=new BookTasks()
document.addEventListener('DOMContentLoaded',bookTask.displayBookList());
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    

    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    if(title==''|| author==''|| isbn=='' ){
        new BookTasks().showAlert('Please fill all fields',"danger")
    }
    else{
    const book=new Book(title,author,isbn);
    bookTask.addBookToList(book);
    new StoreBooks().addBookToStorage(book);     

    new BookTasks().showAlert("Added book successfully","success")
    }

})
document.querySelector("#books").addEventListener('click',(e)=>{
    new BookTasks().deleteBookFromList(e)
    new BookTasks().showAlert("Deleted book successfully","danger")

})