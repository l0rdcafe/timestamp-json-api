import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { bdate: "", loading: false };
}
handleSubmit = () => {
try {
this.setState({ loading: true }, async () => {
const { bdate } = this.state;
const result = await fetch(`api/v1/timestamp/${bdate}`);
const resp = await result.json();
  this.setState({ ...resp, loading: false });
});
  } catch (e) {
   this.setState({ error: e.message, loading: false });
  }
}
handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
}
  render() {
const { loading, bdate, error, unix, utc } = this.state;
console.log(this.state);
return (
<div className="main">
  <h3>Find out your epoch bdate!</h3>
     <input onChange={this.handleChange} type="text" name="bdate" value={bdate} placeholder="YYYY-MM-DD" />
       {loading && <p className="loading">Loading...</p>}
           {!loading && error && <p className="error">{error}</p>}
            <button onClick={this.handleSubmit}>Find out!</button>
       {!loading && !error && unix && utc && <h2 className="banner">{`Wowwwww, you were born after ${unix} milliseconds since 1/1/1970 AND ur EPOCH~! bdate is ${utc}`}</h2>}
  </div>
    );
  }
}

export default App;
