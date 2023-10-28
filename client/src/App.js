import './App.scss';
import Layout from './layout';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './Pages/indexPage';
import Login from './Pages/loginPage';
import Register from './Pages/registerPage';
import { UserContextProvider } from "./UserContext";
import CreatePost from './Pages/createPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/create' element={<CreatePost/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
