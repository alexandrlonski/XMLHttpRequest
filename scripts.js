const app = document.getElementById('root'),
      logo = document.createElement('img'),
     container = document.createElement('div');

container.setAttribute('class', 'container');
logo.src = 'logo.png';

app.appendChild(logo);
app.appendChild(container);

const request = new XMLHttpRequest()
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function () {
  // Begin accessing JSON data here
  const data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
         data.forEach((movie) => {
              // Create a div with a card class
              const card = document.createElement('div')
              card.setAttribute('class', 'card')

              // Create an h1 and set the text content to the film's title
              const h1 = document.createElement('h1')
              if(movie.title.length > 20) {
                 movie.title = movie.title.substring(0, 20)
                 h1.textContent = `${movie.title}...`
              } else {
                h1.textContent = movie.title
              }
              

              // Create a p and set the text content to the film's description
              const p = document.createElement('p')
              movie.description = movie.description.substring(0, 200) // Limit to 300 chars
              p.textContent = `${movie.description}...` // End with an ellipses

              // Append the cards to the container element
              container.appendChild(card)

              // Each card will contain an h1 and a p
              card.appendChild(h1)
              card.appendChild(p)
            })
          } else {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `Gah, it's not working!`
            app.appendChild(errorMessage)
          }
  }

// Send request
request.send()

