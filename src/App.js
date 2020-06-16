import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PeopleList } from "./pages/peopleList";
import { favouritesList } from "./pages/favouritesList";
import { Navbar } from "./components/Navbar";
import { ApiState } from "./context/ApiState";
import { HeroDetails } from "./pages/heroDetails";

function App() {
  return (
    <ApiState>
      <BrowserRouter>
        <Navbar />
        <div className="container pt-4">
          <Switch>
            <Route path="/" exact component={PeopleList} />
            <Route path="/favourites" exact component={favouritesList} />
            <Route path="/details" exact component={HeroDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApiState>
  );
}

export default App;
