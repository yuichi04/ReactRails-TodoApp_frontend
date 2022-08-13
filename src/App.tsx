import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Header } from "./components/layout";
import BoardNew from "./components/board/BoardNew";
import Board from "./components/board/Board";
import BoardList from "./components/board/BoardList";
import CompletedBoardList from "./components/board/CompletedBoardList";
import Loading from "./components/uikit/notification/Loading";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Loading>
        <Switch>
          <Route exact path="/" component={BoardList} />
          <Route exact path="/boards/completed" component={CompletedBoardList} />
          <Route exact path="/board/new" component={BoardNew} />
          <Route path="/boards/(:id)?" component={Board} />
        </Switch>
      </Loading>
    </BrowserRouter>
  );
};

export default App;
