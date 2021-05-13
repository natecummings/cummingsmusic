export const indexPage = (req, res, next) => {
  res.render('layout', {content: 'index', title: 'Deanne\'s Music'})
}

export const aboutPage = (req, res, next) => {
  res.render('layout', {content: 'about', title: 'Deanne\'s Music'})
}

export const registerPage = (req, res, next) => {
  res.render('layout', {content: 'register', title: 'Deanne\'s Music'})
}

export const loginPage = (req, res, next) => {
  res.render('layout', {content: 'login', title: 'Deanne\'s Music'})
}