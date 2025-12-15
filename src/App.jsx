import './App.css';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TasksList from './components/TasksList';
import Filters from './components/Filters';
import Footer from './components/Footer';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <InputTask />
      <TasksList />
      <Filters />
      <Footer />
    </div>
  );
}

export default App;
