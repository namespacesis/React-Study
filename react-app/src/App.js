import { useState } from 'react';
import './App.css';

const Header = (props) => {
  return (
    <header>
      <h1><a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  );
}

const Nav = (props) => {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(e) => {
        e.preventDefault();
        props.onChangeMode(Number(e.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

const Article = (props) => {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

const Create = (props) => {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={e => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create" /></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ]);
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB" />
  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopic = { id: nextId, title: title, body: body };
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }} />
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }} />
      <Nav topics={topics} onChangeMode={(id) => {
        setMode('READ');
        setId(id);
      }} />
      {content}
      <a href="/create" onClick={e => {
        e.preventDefault();
        setMode('CREATE');
      }}>Create</a>
    </div>
  );
}

export default App;
