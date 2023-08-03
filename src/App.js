import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { publicRoutes } from './routers';
import { DefaultLayout, LoginLayout } from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './components/Layout/AdminLayout';

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout;

              if (Layout == null) {
                Layout = LoginLayout;
              } else if (Layout === 1) {
                Layout = AdminLayout;
              } else if (Layout === 2) {
                Layout = DefaultLayout;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
