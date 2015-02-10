(function(){
    function Book(){
        this.title = '';
        this.author = '';
        this.date = '';
        this.subject = '';
        this.price = '';
    }

    window.Book = Book;
})();
(function(){
    function BookStore(){
        this.catalog = [];
    }

    BookStore.prototype.getCatalog = function(callback){
        this.catalog.forEach(function(book){
            callback(book);
        })
    };

    window.BookStore = BookStore;
})();
(function() {
    var boodData = [
        ['Dune','Frank Herbert','1965','science fiction','11.25'],
        ['The Moon Is a Harsh Mistress','Robert A. Heinlein','1966','science fiction','10.53'],
        ['Starship Troopers','Robert A. Heinlein','1959','science fiction','15.85'],
        ['Berserk','Kentaro Miura','1997','dark fantasy','12.26'],
        ['The War of the Worlds','H. G. Wells','1898','science fiction','4.28'],
        ['The Time Machine','H. G. Wells','1895','science fiction','2.70'],
        ["The Mote in God's Eye",'Jerry Pournelle and Larry Niven','1974','science fiction','19.99']
    ];

    var bookStore = new BookStore();

    var i = 0;
    var amount = boodData.length;

    for(i = 0; i < amount; i++){
        var book = new Book();
        book.title = boodData[i][0];
        book.author = boodData[i][1];
        book.date = boodData[i][2];
        book.subject = boodData[i][3];
        book.price = boodData[i][4];
        bookStore.catalog[i] = book;
    }

    var getBookList = function(){
        console.log('\nget book list:');
        bookStore.getCatalog(function(book){
            console.log(book.title + ' (' + book.date + ') - ' + book.author);
        });
    };
    getBookList();

    var searchBooks = function(search){
        console.log('\nsearch books:');
        bookStore.getCatalog(function(book){
            for (var item in book) {
                var value = book[item];
                if(typeof value === 'string'){
                    if(value.search(search) > -1){
                        console.log(book.title + ' (' + book.date + ') - ' + book.author);
                    }
                }
            }
        });
    };
    searchBooks('Moon');


    var getBooksByAuthor = function(search){
        console.log('\nget books by author:');
        bookStore.getCatalog(function(book){
            if(book.author.search(search) > -1){
                console.log(book.title + ' (' + book.date + ') - ' + book.author);
            }
        });
    };
    getBooksByAuthor('Robert A. Heinlein');

    var discountPrice = function(){
        console.log('\ndiscount price:');
        bookStore.getCatalog(function(book){
            switch(book.subject) {
                case 'science fiction':
                    book.price = (book.price - book.price * 0.1).toFixed(2);
                    break;
                case 'dark fantasy':
                    book.price = (book.price - book.price * 0.1).toFixed(2);
                    break;
            }
            console.log(book.title + ' (' + book.date + ') - ' + book.author + ' = $' + book.price);
        });
    };
    discountPrice();

    var earnings = function(){
        console.log('\nearnings:');
        var totalAmount = 0;
        bookStore.getCatalog(function(book){
            totalAmount = totalAmount + Number(book.price);
        });
        totalAmount = (totalAmount * 2 * 12).toFixed(2);
        console.log('$' + totalAmount);
    };
    earnings();

})();
