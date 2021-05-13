// Required by Webpack - do not touch
// require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// TODO
import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap'
import App from './components/App'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import SignOut from './components/SignOut'



if(document.getElementById('main')){
  ReactDOM.render(<App/>, document.getElementById('main'))
}else if (document.getElementById('login')){
  ReactDOM.render(<LoginForm/>, document.getElementById('login'))
}else if (document.getElementById('register')){
  ReactDOM.render(<RegisterForm/>, document.getElementById('register'))
}

if(document.querySelector('#_sign_user_out')){
  document.querySelector('#_sign_user_out').onclick = (e) => {
    let el = document.createElement('div')
    document.body.appendChild(el)
    ReactDOM.render(<SignOut/>, el)
  }
}