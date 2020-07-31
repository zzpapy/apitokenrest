import React, { Component} from 'react'

class Form extends Component{
    
    submitForm = () => {
        
    }

    render() {
        
        return (
          <form>
            <h2>CONNEXION AVEC JWT</h2>
            <p>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                />
            </p>
            <p>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                />
            </p>
            <p>
              <input type="button" value="Submit" onClick={this.submitForm} />
            </p>
          </form>
        );
      }
}

export default Form