import React, { Component } from 'react';
import './App.css';
import './style/style.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            information: [],
            extraJokes: [],
        };
    }

    // == Gets the random joke
    getRandomJoke() {
        fetch('https://api.chucknorris.io/jokes/random').then(results => {
            return results.json();
        }).then(data => {
            // == Checking if data is applicable
            if (data !== null) {
                this.setState({information: this.state.information.concat([data.value])});
            } else {
                this.setState({information: 'Some problem has occured. Please reload.'})
            }
        });
    }

    // Gets joke by given data
    getJokeByQuery(request) {
        console.log(request)
        fetch('https://api.chucknorris.io/jokes/search?query=' + request).then(results => {
            return results.json();
        }).then(data => {
            if (data !== null) {
                console.log(data.result)
                data.result.forEach(joke => {
                    if (this.state.extraJokes.length < 5) {
                        this.setState({extraJokes: this.state.extraJokes.concat([joke.value])});
                    }
                })
            } else {
                this.setState({extraJokes: 'Some problem has occured. Please reload.'})
            }
            // == Checking if data is applicable

        });
    }

// == just testing to see in console
    getQuoteCategory(categoryName) {
        return fetch('https://api.chucknorris.io/jokes/random', {
            params: {
                category: categoryName
            }
        } ).then(results => {
            return results.json()
        }).then(data => {
            console.log ('CATEGORY RETRIEVAL')
            console.log(data.value)
        })
    }

    componentWillMount() {
        this.getRandomJoke();
    }

    updateSearch(event) {
        this.getJokeByQuery(event.target.value);
    }
// == Rendering the data
    render() {
        const badass = this.state.extraJokes.map( (joke) => <li>{joke}</li> );
        const jokes = this.state.information.map( (joke) => <p>{joke}</p> );
        return (
            <div className="App">
                <header className="App-header">
                    <div className="logo-head App-logo col-md-2 col-md-offset-5 col-sm-4 col-sm-offset-5 col-xs-6 col-xs-offset-3"></div>
                </header>
                <h1 className="App-title">Chuck Norris Facts & Jokes</h1>
                <div className="col-md-10 col-md-offset-1">
                    <div className="col-md-6">
                        <input type="text" className="form-control" id="usr" placeholder="Search for 5 random Chuck jokes"
                               ref="query" onChange={(e) => this.updateSearch(e) } />
                        <div className="content">
                            <ol><p>{ badass }</p></ol>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2>Random</h2>
                        <div className="content">
                            <p>{ jokes }</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;