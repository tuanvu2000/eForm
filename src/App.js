import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateForm from './components/form/CreateForm';
import ListForm from './components/form/ListForm';
import PreviewForm from './components/form/PreviewForm';
// import FormioContrib from '@formio/contrib';
// Formio.use(FormioContrib);

// ----------------------------------------------------------------

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<ListForm />} />
                    <Route path="/create" element={<CreateForm />} />
                    <Route path="/preview" element={<PreviewForm />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
