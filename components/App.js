import { Output } from "./Output.js";

const e = React.createElement;

export class App extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Also listen to enter key press (so users don't always have to click "Go").
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      data: "",
      notFound: false,
    };
  }

  handleClick(event) {
    const inputValue = document
      .getElementById("search-input")
      .value.toLowerCase();
    /* TODO: Create a local cache (dictionary) to store previous queries (keys) and results (values).
      Reference: https://github.com/gbminarelli/pokemon-hangman/blob/master/components/App.js */
    if (inputValue) {
      /* TODO: Update URL after deploying the production server, giving the user the option
      to run the application locally (localhost) or call the production server. */
      fetch(`http://127.0.0.1:3000/v1/weather?${inputValue}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then((data) => {
          this.setState({
            data,
            notFound: false,
          });
        })
        .catch((error) => {
          console.error(error);
          // Checking if the error is 404 (which is expected):
          if (error.status && error.status == "404") {
            this.setState({
              data: "",
              notFound: true,
            });
          }
        });
    }
  }

  render() {
    return e(
      "div",
      null,
      e("input", {
        type: "text",
        placeholder: "City...",
        id: "search-input",
      }),
      e(
        "div",
        null,
        e("button", { id: "search-button", onClick: this.handleClick }, "Go")
      ),
      this.state.data
        ? e(Output, { data: this.state.data })
        : this.state.notFound
        ? e("div", { className: "output-text" }, "CITY NOT FOUND")
        : null
    );
  }
}
