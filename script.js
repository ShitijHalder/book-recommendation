// A small, hand-picked catalogue. IDs are used in the book details URL and localStorage.
const books = [
  {
    id: 'alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    year: '1988',
    isbn: '9780062315007',
    description: 'Santiago, a young shepherd, sets out in search of a treasure and discovers the value of listening to his heart along the way.'
  },
  {
    id: 'pride',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Classics',
    year: '1813',
    isbn: '9780141439518',
    description: 'Elizabeth Bennet navigates family expectations, first impressions and an unexpected connection with the reserved Mr. Darcy.'
  },
  {
    id: 'atomic',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-help',
    year: '2018',
    isbn: '9780735211292',
    description: 'A practical look at how small, consistent changes can shape better habits and help us make progress over time.'
  },
  {
    id: 'kite',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    genre: 'Fiction',
    year: '2003',
    isbn: '9781594631931',
    description: 'A moving story of friendship, guilt and redemption that follows Amir from his childhood in Kabul into adulthood.'
  },
  {
    id: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'Non-fiction',
    year: '2011',
    isbn: '9780062316097',
    description: 'An exploration of the history of humankind, from early human species to the societies we live in today.'
  },
  {
    id: 'hobbit',
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    genre: 'Fantasy',
    year: '1937',
    isbn: '9780547928227',
    description: 'Bilbo Baggins leaves the comfort of home for an adventure filled with dwarves, riddles and a formidable dragon.'
  },
  {
    id: 'silent',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Mystery',
    year: '2019',
    isbn: '9781250301697',
    description: 'A psychotherapist becomes fascinated by a famous painter who has stopped speaking after a shocking act of violence.'
  },
  {
    id: 'little-prince',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Classics',
    year: '1943',
    isbn: '9780156012195',
    description: 'A pilot meets a curious little prince whose travels offer a thoughtful perspective on friendship, love and what matters.'
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    genre: 'Classics',
    year: '1949',
    isbn: '9780451524935',
    description: 'Winston Smith quietly questions life under the watchful eye of a government that controls truth and thought.'
  },
  {
    id: 'psychology',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Non-fiction',
    year: '2020',
    isbn: '9780857197689',
    description: 'Short stories explore the surprising ways behaviour, personal experience and emotions influence our relationship with money.'
  },
  {
    id: 'murder',
    title: 'Murder on the Orient Express',
    author: 'Agatha Christie',
    genre: 'Mystery',
    year: '1934',
    isbn: '9780062693662',
    description: 'Detective Hercule Poirot investigates a murder aboard a train stranded in the snow, where every passenger is a suspect.'
  },
  {
    id: 'potter',
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J. K. Rowling',
    genre: 'Fantasy',
    year: '1997',
    isbn: '9781408855652',
    description: 'Harry discovers a world of magic, friendship and mystery when he begins his first year at Hogwarts School of Witchcraft and Wizardry.'
  }
];

const page = document.body.dataset.page;
const app = document.querySelector('#app');
function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

let saved = readStorage('reading-room-saved', []);
let ratings = readStorage('reading-room-ratings', {});
if (!Array.isArray(saved)) saved = [];
if (typeof ratings !== 'object' || Array.isArray(ratings)) ratings = {};
function persist() {
  try {
    localStorage.setItem('reading-room-saved', JSON.stringify(saved));
    localStorage.setItem('reading-room-ratings', JSON.stringify(ratings));
  } catch {
    /* Browsing still works when storage is unavailable. */
  }
}

function cover(book) {
  return `<img class="cover" src="https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false" alt="Cover of ${book.title}" loading="lazy" data-cover="${book.id}">`;
}

function header() {
  return `<div class="top-note">A little space for your next great read</div>
    <header class="site-header">
      <nav class="wrap nav flex items-center justify-between" aria-label="Main navigation">
        <a class="brand" href="index.html">
          <span class="brand-mark">R</span>The Reading Room<span style="color:#bd6742">.</span>
        </a>
        <div class="nav-links flex items-center gap-8">
          <a class="${page==='home'?'active':''}" href="index.html">Home</a>
          <a class="${page==='books'?'active':''}" href="books.html">Books</a>
          <a class="${page==='contact'?'active':''}" href="contact.html">Contact</a>
          <a class="nav-list" href="books.html?list=1">Want to Read <span class="count" id="saved-count">${saved.length}</span>
          </a>
        </div>
      </nav>
    </header>`;
}

function footer() {
  return `<footer class="footer">
      <div class="wrap">
        <div class="footer-main flex flex-wrap justify-between">
          <div>
            <a class="brand" href="index.html">The Reading Room<span style="color:#d89270">.</span>
            </a>
            <p>Good books have a way of finding you.<br>Let us help you find the next one.</p>
          </div>
          <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="books.html">Browse books</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Made for readers, by readers.</span>
          <span>Web Technology Project · Group 10</span>
        </div>
      </div>
    </footer>`;
}

function card(book) {
  const isSaved = saved.includes(book.id);
  return `<article class="book-card">
      <a href="book.html?id=${book.id}" aria-label="View details for ${book.title}">
        <div class="cover-wrap">${cover(book)}</div>
        <span class="tag">${book.genre}</span>
        <h3>${book.title}</h3>
        <div class="author">${book.author}</div>
      </a>
      <div class="card-bottom">
        <a class="text-link" href="book.html?id=${book.id}">Book details →</a>
        <button class="save-btn" data-save="${book.id}" aria-pressed="${isSaved}">${isSaved?'✓ Saved':'+ Want to Read'}</button>
      </div>
    </article>`;
}

function home() {
  return `<main>
      <div class="wrap hero">
        <div>
          <span class="eyebrow">For the love of reading</span>
          <h1>A good book is<br>always a <em>good idea.</em>
          </h1>
          <p>Whether you're looking for an old favourite or something entirely new, there's a story waiting for you here.</p>
          <a class="button" style="margin-top:25px" href="books.html">Find your next read <span>↗</span>
          </a>
        </div>
        <div class="hero-art" aria-label="A selection of book covers">
          <div class="hero-books">${cover(books[0])}${cover(books[1])}${cover(books[5])}</div>
          <span class="art-label">Your next chapter starts here</span>
        </div>
      </div>
      <section class="section section-alt">
        <div class="wrap">
          <div class="section-heading flex justify-between">
            <div>
              <span class="eyebrow">A place to begin</span>
              <h2>Picked for your shelf</h2>
              <p class="muted">A few good reads to get you started.</p>
            </div>
            <a class="text-link" href="books.html">Explore all books →</a>
          </div>
          <div class="book-grid grid grid-cols-2 md:grid-cols-4 gap-6">${books.slice(0,4).map(card).join('')}</div>
        </div>
      </section>
      <section class="quote-band">
        <div class="wrap">
          <span class="eyebrow">Your reading list</span>
          <h2>Keep the stories that catch your eye.</h2>
          <p class="muted">Save books for later and make a little list of your own.</p>
          <a class="text-link" href="books.html?list=1">See your Want to Read list →</a>
        </div>
      </section>
    </main>`;
}

function catalogue() {
  return `<main class="wrap">
      <div class="page-intro">
        <span class="eyebrow">The bookshelf</span>
        <h1 class="page-title">Find something worth reading.</h1>
        <p class="muted">Browse the collection, or look for a book you already have in mind.</p>
      </div>
      <div class="filters">
        <label class="field search-field" for="search">Search by title or author<input id="search" type="search" placeholder="Try a title or an author...">
        </label>
        <label class="field" for="genre">Genre<select id="genre">
            <option value="">All genres</option>${[...new Set(books.map(b=>b.genre))].sort().map(g=>`<option>${g}</option>`).join('')}</select>
        </label>
        <button class="toggle" id="list-toggle" aria-pressed="false">♡ Want to Read only</button>
      </div>
      <p class="results-line" id="results" aria-live="polite">
      </p>
      <div class="book-grid grid grid-cols-2 md:grid-cols-4 gap-6" id="book-grid" style="padding-bottom:80px">
      </div>
    </main>`;
}

function detail() {
  const book = books.find(b=>b.id===new URLSearchParams(location.search).get('id'));
  if (!book) return `<main class="wrap section">
      <h1 class="page-title">Book not found.</h1>
      <p class="muted">This book isn't on our shelf yet.</p>
      <a class="button" href="books.html">Browse books →</a>
    </main>`;
  document.title = `${book.title} | The Reading Room`;
  const isSaved=saved.includes(book.id);
  return `<main class="wrap">
      <div class="page-intro" style="padding-bottom:0">
        <a class="text-link" href="books.html">← Back to books</a>
      </div>
      <div class="detail">
        <div class="detail-cover">${cover(book)}</div>
        <div>
          <span class="tag">${book.genre}</span>
          <h1>${book.title}</h1>
          <p class="author">by ${book.author} · First published ${book.year}</p>
          <p class="detail-copy">${book.description}</p>
          <hr style="border:0;border-top:1px solid #dddcd1;margin:26px 0">
          <strong style="font-size:14px">Your rating</strong>
          <div class="stars" role="group" aria-label="Rate ${book.title} out of five">${[1,2,3,4,5].map(n=>`<button class="star ${n <= (ratings[book.id]||0)?'selected':''}" data-rate="${n}" data-id="${book.id}" aria-label="${n} ${n===1?'star':'stars'}" aria-pressed="${ratings[book.id]===n}">★</button>`).join('')}</div>
          <p class="rating-text" id="rating-text">${ratings[book.id]?`You rated this ${ratings[book.id]} out of 5.`:'Have you read it? Leave your rating.'}</p>
          <button class="button ${isSaved?'outline':''}" style="margin-top:20px" data-save="${book.id}" aria-pressed="${isSaved}">${isSaved?'✓ Saved to Want to Read':'+ Add to Want to Read'}</button>
          <p class="rating-text" style="margin-top:14px">Your list and ratings are saved in this browser.</p>
        </div>
      </div>
    </main>`;
}

function contact() {
  return `<main class="wrap">
      <div class="page-intro">
        <span class="eyebrow">Say hello</span>
        <h1 class="page-title">Let's talk books.</h1>
        <p class="muted">Have a recommendation or a question? We'd love to hear it.</p>
      </div>
      <div class="contact-layout">
        <div>
          <div class="contact-card">
            <span class="eyebrow">A note from us</span>
            <h2>Every good story starts somewhere.</h2>
            <p class="muted">Tell us about a book you loved, suggest a title for the collection, or simply say hello.</p>
          </div>
          <p class="muted" style="font-size:13px;margin-top:20px">The Reading Room is a Web Technology project by Group 10.</p>
        </div>
        <form id="contact-form" class="contact-form grid gap-4">
          <label class="field">Your name<input name="name" required maxlength="100" placeholder="Enter your name">
          </label>
          <label class="field">Email address<input name="email" type="email" required maxlength="254" placeholder="you@example.com">
          </label>
          <label class="field">Your message<textarea name="message" required maxlength="2000" placeholder="What's on your mind?"></textarea>
          </label>
          <div>
            <button class="button" type="submit">Send message <span>↗</span>
            </button>
          </div>
          <p class="notice" id="form-message" role="status">This is a project demo. Messages are not sent to a server.</p>
        </form>
      </div>
    </main>`;
}

app.innerHTML = header() + (page==='home'?home():page==='books'?catalogue():page==='book'?detail():contact()) + footer();
document.addEventListener('error', event => {
  const img=event.target;
  if(!img.matches?.('img[data-cover]')) return;
  const book=books.find(item=>item.id===img.dataset.cover);
  if(!book) return;
  const fallback=document.createElement('span');
  fallback.className='cover-fallback';
  fallback.append(document.createTextNode(book.title));
  const author=document.createElement('small');
  author.textContent=book.author;
  fallback.append(author);
  img.replaceWith(fallback);
}, true);
function renderBooks() {
  const grid=document.querySelector('#book-grid');
  if(!grid) return;
  const query=document.querySelector('#search').value.trim().toLowerCase();
  const genre=document.querySelector('#genre').value;
  const onlySaved=document.querySelector('#list-toggle').getAttribute('aria-pressed')==='true';
  const filtered=books.filter(b=>(b.title.toLowerCase().includes(query)||b.author.toLowerCase().includes(query))&&(!genre||b.genre===genre)&&(!onlySaved||saved.includes(b.id)));
  document.querySelector('#results').textContent=`Showing ${filtered.length} ${filtered.length===1?'book':'books'}${onlySaved?' in your list':''}`;
  grid.innerHTML=filtered.length?filtered.map(card).join(''):`<div class="empty">
      <h2 style="font-size:26px;margin:0 0 8px">Nothing on this shelf yet.</h2>
      <p class="muted">${onlySaved?'Save a book to your Want to Read list, or try another search.':'Try a different search or genre.'}</p>
    </div>`;
}

if(page==='books') {
  const toggle=document.querySelector('#list-toggle');
  if(new URLSearchParams(location.search).get('list')==='1') toggle.setAttribute('aria-pressed','true');
  document.querySelector('#search').addEventListener('input',renderBooks);
  document.querySelector('#genre').addEventListener('change',renderBooks);
  toggle.addEventListener('click',()=> {
    toggle.setAttribute('aria-pressed',toggle.getAttribute('aria-pressed')!=='true');
    renderBooks();
  });
  renderBooks();
}

document.addEventListener('click',event=> {
  const save=event.target.closest('[data-save]');
  if(save) {
    const id=save.dataset.save;
    saved=saved.includes(id)?saved.filter(item=>item!==id):[...saved, id];
    persist();
    document.querySelector('#saved-count').textContent=saved.length;
    if(page==='books') renderBooks();
    else if(page==='book') {
      const yes=saved.includes(id);
      save.textContent=yes?'✓ Saved to Want to Read':'+ Add to Want to Read';
      save.setAttribute('aria-pressed',yes);
      save.classList.toggle('outline',yes);
    } else {
      const yes=saved.includes(id);
      save.textContent=yes?'✓ Saved':'+ Want to Read';
      save.setAttribute('aria-pressed',yes);
    }
  }
  const star=event.target.closest('[data-rate]');
  if(star) {
    const n=Number(star.dataset.rate);
    ratings[star.dataset.id]=n;
    persist();
    document.querySelectorAll('[data-rate]').forEach(item=> {
      item.classList.toggle('selected',Number(item.dataset.rate)<=n);
      item.setAttribute('aria-pressed',Number(item.dataset.rate)===n);
    });
    document.querySelector('#rating-text').textContent=`You rated this ${n} out of 5.`;
  }
});
const form=document.querySelector('#contact-form');
if(form) form.addEventListener('submit',event=> {
  event.preventDefault();
  const data=new FormData(form);
  if(!String(data.get('name')).trim()||!String(data.get('message')).trim()) {
    document.querySelector('#form-message').textContent='Please enter your name and a message.';
    return;
  }
  document.querySelector('#form-message').textContent='Thanks for your message! This demo does not send or store messages.';
  form.reset();
});
