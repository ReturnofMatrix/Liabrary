const myLibrary = JSON.parse(sessionStorage.getItem("myArray") || "[]").map(book =>
    Object.setPrototypeOf(book, Book.prototype)
  );

function Book(title, author, pages, readstatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readstatus = readstatus || 'No';
}

Book.prototype.toggle = function(change){
    this.readstatus = change;
}

// this function sends data to the Book constructor to instantiate the book objects.
// And push it onto myLibrary array with push() function.
function addBookToLibrary(title, author, pages, readstatus){

    let book = new Book(title, author, pages, readstatus);
    myLibrary.push(book);
    sessionStorage.setItem("myArray", JSON.stringify(myLibrary));
}

const divtable = document.querySelector('.table');
// If div table is there then only run rendertable function or else no.
if(divtable){

    rendertable();

}


// To check it there actual book objects in my array.
// To add the table only to the div class table of index.
function rendertable(){

    if (myLibrary.length != 0){

            const table = document.createElement('table');
            const tablerow = document.createElement('tr');

        // Only to add header to the table. 
        const headers = ['Book No.', 'Title', 'Author', 'Pages', 'Pages_Status', 'Remove']
        for(const header of headers){
            const th = document.createElement('th');
            const text = document.createTextNode(header);
            th.appendChild(text);
            tablerow.appendChild(th);
        } 
    
        const caption = document.createElement('caption');
        const captext = document.createTextNode('Book List');
        caption.appendChild(captext);
        table.appendChild(caption);
    
        table.appendChild(tablerow);
        const body = document.querySelector('body');
        body.appendChild(table);
    
        let num = 0;
        // Loop to get all the objects in myLibrary array.
        for(const book of myLibrary){
            
            // To keep track of number of books in the table. i helps with that. first column of table.
            num;
            const tablerow  = document.createElement('tr')
            const tabledata = document.createElement('td');
            incre = num + 1;
            const tabletext = document.createTextNode(incre);
            tabledata.appendChild(tabletext);
            tablerow.appendChild(tabledata);
    
            // To loop over the properties of the book objects.
            for(const key of Object.keys(book)){
                let tabledata = document.createElement('td');
                
                // To change the reading status of i have given three select menus wherein 
                // after pressing the change button with the help of prototype function 
                // it can change the actual reading status in the myLibrary.
                if(key == 'readstatus'){
                    const select = document.createElement('select');

                    let options = ['No', 'Yes', 'Half']

                    for(const opt of options){
                        const option = document.createElement('option');
                        option.textContent = opt;
                        select.appendChild(option);
                    }

                    const toggle = document.createElement('button');
                    toggle.textContent = 'Change';

                    const form = document.createElement('form');
                    form.appendChild(select);
                    form.appendChild(toggle);

                    tabledata.appendChild(form);
                    tablerow.appendChild(tabledata);

                    let tablespan = document.createElement('span');
                    tablespan.textContent = book[key];

                    toggle.addEventListener('click', ()=>{
                        event.preventDefault();
                        value = select.value;
                        book.toggle(value);

                        tablespan.textContent = value;
                    })
        
                    tabledata.insertBefore(tablespan, form);
                    tablerow.appendChild(tabledata);
                }
                else
                {
                let tabletext = document.createTextNode(book[key]);
                tabledata.appendChild(tabletext);
                tablerow.appendChild(tabledata);
                }
              
            }

            //Add remove button to each book row.
            const removebutton = document.createElement('button');
            const removetext = document.createTextNode('X');
            removebutton.appendChild(removetext);
            // removebutton.setAttribute('class', 'removebutton');
            tablerow.appendChild(removebutton);
            tablerow.setAttribute('class', num);
            num++;
            table.appendChild(tablerow);

            // this addEventListener is for every button it created so it knows reference to 
            // which row it is calling.

            removebutton.addEventListener('click', ()=>{
            
            //i am adding class number to each row so when that specific remove button is clicked
            // due to that class no. we will get to know which tr it was and remove it.
            bookindex = myLibrary.indexOf(book);
            
            if(bookindex !== -1)
            {
                myLibrary.splice(bookindex,1);
                sessionStorage.setItem("myArray", JSON.stringify(myLibrary));
            }
            table.removeChild(tablerow);
        
            if(myLibrary.length == 0)
            {
                divtable.remove();
            }
            });
        }

        divtable.appendChild(table)
    }
}
        
// from the addbookform.html button we have form to input the book info. and save it in
//  localStorage and redirect to the index.html.

const booksubmit = document.querySelector(".booksubmit");

if(booksubmit){

    booksubmit.addEventListener('click', ()=>{

        event.preventDefault();
        const titleinput = document.querySelector('#title');
        let title = titleinput.value;
    
        const authorinput = document.querySelector('#author');
        let author = authorinput.value;
    
        const pagesinput = document.querySelector('#pages');
        let pages = pagesinput.value;
    
        const readinput = document.querySelector('#read');
        let read = readinput.value;
    
        addBookToLibrary(title, author, pages, read);
        window.location.href = "index.html";
    })
}


