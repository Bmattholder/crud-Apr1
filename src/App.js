import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PeopleList from './components/PeopleList';
import PeopleForm from './components/PeopleForm';
import Nav from './components/Nav';
function App() {
  return (
    <Router>
        <Nav />
      <Routes>
        <Route path='/' element={<PeopleList />}/>
        <Route path='/form' element={<PeopleForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
