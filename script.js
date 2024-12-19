const myLibrary = [];

function Book(title, author, pages, readstatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readstatus = readstatus;
}

function addBookToLibrary(title, author, pages, readstatus){

    let book = new Book(title, author, pages, readstatus);
    myLibrary.push(book);

}

// addBookToLibrary("Almanac", "Naval", 340, "Yes");
addBookToLibrary("Superior Man", "David Dieta", 450, "Yes");
addBookToLibrary("Shoe Dog", "Reed Hastings", 749, "No");
addBookToLibrary("Principles", "Ray Dalio", 531, "No");

console.log(myLibrary)

if (myLibrary[0] != undefined){

    const table = document.createElement('table');
    const tablerow = document.createElement('tr');

    const th0 = document.createElement('th');
    const text0 = document.createTextNode('Book No.');
    th0.appendChild(text0);
    tablerow.appendChild(th0);

    const th1 = document.createElement('th');
    const text1 = document.createTextNode('Title');
    th1.appendChild(text1);
    tablerow.appendChild(th1);

    const th2 = document.createElement('th');
    const text2 = document.createTextNode('Author');
    th2.appendChild(text2);
    tablerow.appendChild(th2);

    const th3 = document.createElement('th');
    const text3 = document.createTextNode('Pages');
    th3.appendChild(text3);
    tablerow.appendChild(th3);

    const th4 = document.createElement('th');
    const text4 = document.createTextNode('Read_Status');
    th4.appendChild(text4);
    tablerow.appendChild(th4);

    const caption = document.createElement('caption');
    const captext = document.createTextNode('Book List');
    caption.appendChild(captext);
    table.appendChild(caption);

    table.appendChild(tablerow);
    const body = document.querySelector('body');
    body.appendChild(table);

    let num = 0;
    for(const book of myLibrary){
        
        const tablerow  = document.createElement('tr')
        num++;
        const tabledata = document.createElement('td');
        const tabletext = document.createTextNode(num);
        tabledata.appendChild(tabletext);
        tablerow.appendChild(tabledata);

        for(const key in book){

            const tabledata = document.createElement('td');
            const tabletext = document.createTextNode(book[key]);
            tabledata.appendChild(tabletext);
            tablerow.appendChild(tabledata);
        }
        table.appendChild(tablerow);
    }
}
        
const booksubmit = document.querySelector(".booksubmit");

booksubmit.addEventListener('click', ()=>{

    const titleinput = document.querySelector('#title');
    let title = titleinput.value;

    const authorinput = document.querySelector('#author');
    let author = authorinput.value;

    const pagesinput = document.querySelector('#pages');
    let pages = pagesinput.value;

    const readinput = document.querySelector('#read');
    let read = readinput.value;

    console.log(title, author, pages, read);
    addBookToLibrary(title, author, pages, read);
    event.preventDefault();
})
