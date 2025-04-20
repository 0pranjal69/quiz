import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Question from './component/Question';
import Result from './component/Result';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Question questionIndex={0} />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;