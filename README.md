<span> <h1> Contacto :  </h1> </span>
<h2>A backend application used to add contact in user list.</h2>

<h3>There are 6 Api, 3 for authentication and 3 for contact. Also there is middleware which will verify the user.</h3>

## `Authentication APIs : `

### `Register Api`
<span> Register : <a href="https://contacto-xb2c.onrender.com/api/v1/auth/register"> https://contacto-xb2c.onrender.com/api/v1/auth/register </a>, it is a Post api and need </span> `name`, `email` and `password` in the body. 

### `Login Api`
<span> Login : <a href="https://contacto-xb2c.onrender.com/api/v1/auth/register"> https://contacto-xb2c.onrender.com/api/v1/auth/login </a>, it is a Post api and need </span> `email` and `password` in the body. 

### `User Api`
<span> User : <a href="https://contacto-xb2c.onrender.com/api/v1/auth/register"> https://contacto-xb2c.onrender.com/api/v1/auth/user </a>, it is a Get api and return user details through middleware. </span>

## `Contact APIs : `

### `Create contact Api`
<span> Create : <a href="https://contacto-xb2c.onrender.com/api/v1/auth/register"> https://contacto-xb2c.onrender.com/api/v1/contact/create </a>, it is a Post api and need </span> `name` and `email` are required, whereas `email`, `linkedin` and `twitter` is optional in the body. 

### `Edit contact Api`
<span> Edit : <a href="https://contacto-xb2c.onrender.com/api/v1/auth/register"> https://contacto-xb2c.onrender.com/api/v1/contact/edit </a>, it is a Patch api and need </span> `name` is required, whereas `email`, `linkedin` and `twitter` is optional which user can edit in the body. 

### `Search contact Api`
<span> Search : <a href="https://contacto-xb2c.onrender.com/api/v1/auth/register"> https://contacto-xb2c.onrender.com/api/v1/contact/search </a>, it is a Get api and need </span> `contactName` in the body which will search all the name related contact name and return all the data which contact this name. 

