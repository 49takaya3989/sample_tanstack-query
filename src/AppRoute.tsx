import {
  BrowserRouter,
  Route,
  Routes,
  type RouteProps,
} from "react-router-dom";
import App from './App';
import Task from './task/[id]';

const routes = [
  {
    path: '/',
    Component: App
  },
  {
    path: '/task/:id',
    Component: Task
  },
] as const satisfies RouteProps[];

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }, i) => <Route key={i} path={path} element={<Component />} />)}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute;