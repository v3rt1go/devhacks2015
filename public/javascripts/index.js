'use stritct';

const React = require('react');
const ReactDOM = require('react-dom');
const falcor = require('falcor');
const _ = require('lodash');

const PanicButton = React.createClass({
  render() {
    return (
      <button className='btn btn-danger btn-lg'>Simulate Accident</button>
    );
  }
});

const Main = React.createClass({
  render() {
    return (
      <div>
        <PanicButton />
        <div>Hello!</div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('reactTest'));
