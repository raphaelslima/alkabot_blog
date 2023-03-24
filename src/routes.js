import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import User from "./pages/user/user";

import Header from "./components/Header/header";

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users/:id" component={User} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
