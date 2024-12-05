// Partendo dall'esercizio precedente, integriamo le API che abbiamo sviluppato durante il modulo su ExpressJS. Al caricamento dell'applicazione.

// sfruttando l'hook useEffect, recuperiamo la lista dei post dal backend e la mostriamo nella tabella.

// Infine Implementiamo la funzionalità di cancellazione
//////////////////////////////////////////////////////////////////////////////////////////////
import { useState } from "react";
import postsData from "./data/posts";
import { useEffect } from "react";

function App() {
  const [newPost, setNewPost] = useState({
    autore: "",
    contenuto: "",
    immagine: "",
    categoria: "",
    published: true,
  });

  const [posts, setPosts] = useState(postsData);

  useEffect(() => {
    if (newPost.published) {
      alert("Articolo Pubblico");
    } else {
      alert("Articolo privato");
    }
  }, [newPost.published]);

  function handleInput(e) {
    const { name, value, type, checked } = e.target;
    let currentAuthor = newPost.autore;
    let currentContent = newPost.contenuto;
    let currentImg = newPost.immagine;
    let currentCategory = newPost.categoria;
    let currentPublished = newPost.published;

    if (name === "autore") {
      currentAuthor = value;
      console.log("modifying author with value " + value);
    } else if (name === "contenuto") {
      currentContent = value;
    } else if (name === "immagine") {
      currentImg = value;
    } else if (name === "categoria") {
      currentCategory = value;
    } else if (name === "published" && type === "checkbox") {
      currentPublished = checked;
    }

    setNewPost({
      autore: currentAuthor,
      contenuto: currentContent,
      immagine: currentImg,
      categoria: currentCategory,
      published: currentPublished,
    });

    console.log(newPost);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !newPost.autore ||
      !newPost.contenuto ||
      !newPost.categoria ||
      !newPost.immagine
    ) {
      console.log(newPost);
      alert("Hai lasciato un campo vuoto");
      return;
    }

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);

    setNewPost({
      autore: "",
      contenuto: "",
      immagine: "",
      categoria: "",
      published: true,
    });
    console.log(updatedPosts);
  }

  function handleDelete(i) {
    const updatedPosts = posts.filter((post, index) => i !== index);
    setPosts(updatedPosts);
  }

  return (
    <>
      <div className="container">
        <h1 className="mt-5">BoolBlog</h1>
        <div className="wrapper mt-5">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <div className="col-4">
                  <input
                    type="text"
                    name="autore"
                    placeholder="Inserisci il nome"
                    onChange={handleInput}
                    className="form-control mb-2"
                    value={newPost.autore}
                  />
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    name="contenuto"
                    className="form-control mb-2"
                    placeholder="Inserisci il contenuto"
                    onChange={handleInput}
                    value={newPost.contenuto}
                  />
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    name="immagine"
                    className="form-control mb-2"
                    placeholder="Inserisci l'URL immagine"
                    onChange={handleInput}
                    value={newPost.immagine}
                  />
                </div>
                <div className="col-4">
                  <select
                    name="categoria"
                    className="form-select mb-2"
                    onChange={handleInput}
                    value={newPost.categoria}
                  >
                    <option value="">Seleziona una categoria</option>
                    <option value="Ozio">Ozio</option>
                    <option value="Scoperte">Scoperte</option>
                    <option value="Giochi">Giochi</option>
                    <option value="Tv">Tv</option>
                  </select>
                </div>
                <div className="col-4">
                  <label>
                    <input
                      type="checkbox"
                      name="published"
                      className="ms-2"
                      checked={newPost.published}
                      onChange={handleInput}
                    />
                    Vuoi che il post sia pubblico?
                  </label>
                </div>
                <div className="col-4">
                  <button className="btn btn-primary">Invia</button>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            {posts.map((post, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={post.immagine}
                    className="card-img-top"
                    alt="Post"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post.autore}</h5>
                    <p className="card-text">{post.contenuto}</p>
                    <p>Categoria: {post.categoria}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-secondary btn-sm">
                      Modifica titolo
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(i)}
                    >
                      Cancella
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
