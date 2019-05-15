import React from 'react';

import logo from './assets/img/logo.svg';
import init from './assets/img/init.svg';

import project1 from './assets/img/project1.jpg';
import project2 from './assets/img/project2.jpg';
import project3 from './assets/img/project3.jpg';
import project4 from './assets/img/project4.jpg';
import project5 from './assets/img/project5.jpg';
import project6 from './assets/img/project6.jpg';
import project7 from './assets/img/project7.jpg';
import project8 from './assets/img/project8.jpg';
import project9 from './assets/img/project9.jpg';
import project10 from './assets/img/project10.jpg';
import project11 from './assets/img/project11.jpg';
import project12 from './assets/img/project12.jpg';

class Homepage extends React.Component {
  // define initial states and bind functions
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      success: '',
      emailValue: '',
      response: '',
      status: ''
    }
    this.onTextboxChange = this.onTextboxChange.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  onTextboxChange(event) {
    this.setState({
      emailValue: event.target.value
    });
  }
  subscribe(event) {

    this.setState({
      isLoading: true
    });

    const {
      emailValue
    } = this.state;

    if(emailValue) {
      fetch('/subscribe', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({
          emailValue: emailValue
        })
      })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            status: 'success',
            response: json.message,
            isLoading: false,
            emailValue: ''
          });
        } else {
          this.setState({
            status: 'error',
            response: json.message,
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        status: 'error',
        response: 'Please enter a valid email address.',
        isLoading: false
      });
    }
  }
  render() {
    const {
      isLoading,
      emailValue,
      response,
      status
    } = this.state;
    return (
      <div>
        <section className="half">
          <img src={project1} alt="" />
          <img src={project2} alt="" />
          <img src={project3} alt="" />
          <img src={project4} alt="" />
          <img src={project5} alt="" />
          <img src={project6} alt="" />
          <img src={project7} alt="" />
          <img src={project8} alt="" />
          <img src={project9} alt="" />
          <img src={project10} alt="" />
          <img src={project12} alt="" />
          <img src={project11} alt="" />
        </section>
        <section className="half">
          <div className="flex">
            <header>
              <img src={logo} alt="heard" />
              <h3>
                In case you haven’t, is a grassroots initiative 
                combating the extortion efforts of major record 
                labels on musical talent.
              </h3>
            </header>
            <section>
              <h2>Get Invited</h2>
              <p>
                Heard is a monthly subscription 
                service allowing artists to download 
                instrumentals, while automatically 
                redistributing monthly earnings back to 
                the producers on a per download basis.
              </p>
              <div id="form">
                <input 
                  type="email" 
                  placeholder="email@address.." 
                  value={emailValue}
                  onChange={this.onTextboxChange}
                />
                <button onClick={this.subscribe}>
                  {
                    (isLoading) ? (
                      <span>...</span>
                    ) : (
                      <span>Go</span>
                    )
                  }
                </button>
                {
                  (response) ? (
                    <p className={status}>{response}</p>
                  ) : (null)
                }
              </div>
            </section>
          </div>
          <footer>
            Built for you by <a href="https://theinitgroup.com" target="_blank" rel="noopener noreferrer"><img src={init} alt="The INiT Group" /></a>
          </footer>
        </section>
      </div>
    );
  }
}

export default Homepage;
