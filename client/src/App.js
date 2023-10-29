import './App.scss';
import Layout from './layout';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './Pages/indexPage';
import Login from './Pages/loginPage';
import Register from './Pages/registerPage';
import { UserContextProvider } from "./UserContext";
import CreatePost from './Pages/createPost';
import PostPage from './Pages/postPage';
import EditPost from './Pages/editPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/create' element={<CreatePost/>} />
          <Route path='/post/:id' element={<PostPage/>} />
          <Route path='/edit-post/:id' element={<EditPost/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
