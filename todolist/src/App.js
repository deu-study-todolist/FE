import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './Page/LoginPage';
import SignUp from './Page/SignUp'
import TodoList from './Page/TodoList'

function App() {
  return (
    <Router>  
      <div className="App" style={{ overflow: 'hidden' }}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/TodoList' element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
