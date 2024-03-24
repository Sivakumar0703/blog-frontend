
import './App.css';
import {Routes,Route} from 'react-router-dom'
import SignUp from './components/account/SignUp';
import Home from './components/home/Home';
import WriteBlog from './components/writeBlog/WriteBlog';
import ViewPost from './components/displayPosts/ViewPost';
import UpdatePost from './components/displayPosts/UpdatePost';
import Contact from './components/contact/Contact';
import MyPage from './components/myPage/MyPage';

function App() {
  return (
    <div>
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/write_blog" element={<WriteBlog/>} />
        <Route path="/view_post/:id" element={<ViewPost />} />
        <Route path="/update_post/:id" element={<UpdatePost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<MyPage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;

