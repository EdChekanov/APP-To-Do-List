import { Route, Routes } from 'react-router';
import Todo from './components/Todo';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<RegisterForm />} />
      <Route path="/" element={<Todo />} />
      <Route path="*" element={<h1>Упс: Ничего не найдено!</h1>} />
    </Routes>
  );
}

export default App;
