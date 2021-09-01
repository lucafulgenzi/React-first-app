import './App.css';
import {useEffect, useState} from "react";


function App() {

  const photoUrl = 'https://jsonplaceholder.typicode.com/photos/';
  const albumUrl = 'https://jsonplaceholder.typicode.com/albums/';
  const userUrl = 'https://jsonplaceholder.typicode.com/users/';

  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [userSelected, setSelectedUser] = useState(0);
  const [albumSelected, setSelectedAlbum] = useState(0);

  // Photo effect
  useEffect( () => {
    async function getPhotos() {
      const url = albumSelected ? photoUrl + '?albumId=' + albumSelected : photoUrl;
      const photos = await fetch(url).then(res => res.json())
      setPhotos(photos.slice(0,20))
    }
    if ( userSelected && albumSelected ){
      getPhotos();
    }
  }, [albumSelected]);

  // Album effect
  useEffect( () => {
    async function getAlbums() {
      const url = userSelected ? albumUrl + '?userId=' + userSelected : albumUrl;
      const albums = await fetch(url).then(res => res.json())
      setAlbums(albums)
    }
    if ( userSelected ){
      getAlbums();
    }
  }, [userSelected]);

  // User effect
  useEffect( () => {
    async function getUsers() {
      const users = await fetch(userUrl).then(res => res.json())
      setUsers(users)
    }
    getUsers();
  }, []);

  // Pick user
  function manageChangeUser({target}) {
    setSelectedUser(target.value)
  }

  //Pick album
  function manageChangeAlbum({target}){
    setSelectedAlbum(target.value)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>ALBUMS</h1>
        <form className='gallery'>
          <div className='form-group'>
            <label htmlFor="users">Users
              <select name="users" id="users" onChange={manageChangeUser}>
                <option value="">SELECT</option>
                {
                  users.map(a =>
                    <option value={a.id} key={a.id}>
                      {a.name}
                    </option>
                  )
                }
              </select>
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor="albums">Albums
              <select name="albums" id="albums" onChange={manageChangeAlbum}>
                <option value="">SELECT</option>
                {
                  albums.map(a =>
                    <option value={a.id} key={a.id}>
                      {a.title}
                    </option>
                  )
                }
              </select>
            </label>
          </div>
        </form>
        <ul className='photos'>
          {
            photos.map( photo => 
              <li key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title}/>
              </li>
            )
          }
        </ul>
        
      </header>
    </div>
  );
}

export default App;
