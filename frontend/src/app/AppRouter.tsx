import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { SeoPage } from './routes/SeoPage';
import { NotFound } from './routes/NotFound';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:slug" element={<SeoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
