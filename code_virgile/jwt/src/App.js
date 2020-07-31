import React, {Component} from 'react';

import { loginUser, getPosts } from './api/ApiHandler'

class App extends Component {
  state = {
    JWT : null,
    message : ""
  }

  handleCheckAuth = async () => {
    let message = "pas connecté";
    if(this.state.JWT !== null){
      await getPosts(this.state.JWT).then(data => {
        console.log(data[0])
        message = "Titre du premier article : "+data[0].title
      })
      await this.setState({
        message : message
      })
    }
  }

  submitForm = (event) => {
    event.preventDefault()
    let data = {
      username : event.target.elements.username.value,
      password : event.target.elements.password.value
    }
    loginUser(data).then(response => {
      console.log(response)
      if(typeof response.token !== 'undefined'){
        this.setState({
          JWT : response.token
        })
      }
      
    })
  }

  renderForm(){
    return (
      <form method="post" onSubmit={this.submitForm}>
            <h2>CONNEXION AVEC JWT</h2>
            <p>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username" value="Squalli"
                />
            </p>
            <p>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password" value="admin"
                />
            </p>
            <p>
              <input type="submit" value="submit" />
            </p>
        </form>
    )
  }

  renderPosts(){
    return (
      <div>
        { JSON.stringify(this.state.posts) }
      </div>
    )
  }
   
  render(){
    
    const message = this.state.message
 
    return (
      <div>
        { this.renderForm() }
        
        <button onClick={ this.handleCheckAuth }>Vérifier si connecté</button>
        <p>{ message }</p>
      </div>
    )
  }
}

export default App;
