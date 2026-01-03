import { HashRouter, Routes, Route } from 'react-router-dom';
import { NewsPage } from './pages/NewsPage';
import { ChatPage } from './pages/ChatPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
