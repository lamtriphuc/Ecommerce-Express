import './App.css'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { Fragment } from 'react'

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page;
            const Layout = route.isShowHeader
              ? DefaultComponent
              : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
