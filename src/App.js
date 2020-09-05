import React from "react";
import { BrowserRouter, Link, NavLink, Route, Switch } from "react-router-dom";

const BreedsList = "https://dog.ceo/api/breeds/list/all";
const BreedRandom = "https://dog.ceo/api/breeds/image/random";

class Breeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: [],
      breed: [],
      isLoading: true,
      error: null,
    };
  }

  async componentWillMount() {
    try {
      const response = await fetch(BreedsList);

      const breeds = await response.json();

      this.setState({ breeds: breeds.message });
    } catch (error) {
      this.setState(() => ({ error }));
    } finally {
      this.setState(() => ({ isLoading: false }));
    }
  }

  render() {
    if (this.state.isLoading) {
      return "...Loading...";
    }

    if (this.state.error) {
      return "...Error...";
    }

    return (
      <>
        <ul>
          {Object.keys(this.state.breeds).map((breed, index) => (
            <li>
              <Link to={`/breeds/${breed}`}>{breed}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

class Random extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      random: [],
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(BreedRandom);

      const random = await response.json();

      this.setState({ random: random.message });
    } catch (error) {
      this.setState(() => ({ error }));
    } finally {
      this.setState(() => ({ isLoading: false }));
    }
  }

  render() {
    if (this.state.isLoading) {
      return "...Loading...";
    }

    if (this.state.error) {
      return `...Error...`;
    }

    return (
      <>
        <div>
          <h1>Dogs random image</h1>
          <img src={this.state.random} alt="No"></img>
        </div>
      </>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li>
            <NavLink to="/breeds">Breeds</NavLink>
          </li>

          <li>
            <NavLink to="/random">Random</NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/breeds">
            <Breeds />
          </Route>

          <Route path="/random">
            <Random />
          </Route>
          <Route>No found</Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
