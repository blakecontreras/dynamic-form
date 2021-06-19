import './App.css';
import DynamicForm from './DynamicForm';
import data from './data/data'

function App() {
  return (
    <div className="App">
      <DynamicForm formData={data} />
    </div>
  );
}

export default App;
