import { html } from 'lit-html';
import crypto from 'crypto';

export const page = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossorigin="anonymous"
      />
    </head>
    <body>
      <div class="container pt-4">
        <p>Click the two buttons below to see how a loop in node wil block execution.</p>
        <p>
          Clicking on 'immediate' first will provide an immediate response, but clicking on
          'blocking' first will hold up the request made by 'immediate'
        </p>
        <p>The /blocking end point will take 5 seconds to respond</p>

        <button id="blockingBtn" class="btn btn-warning m-3">Click to call /blocking</button>
        <button id="immediateBtn" class="btn btn-warning m-3">Click to call /immediate</button>
        <button id="hashBtn" class="btn btn-warning m-3">Click to call /hash</button>
        <button id="resetBtn" class="btn btn-danger m-3">RESET</button>

        <div id="displayBoard"></div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"
      ></script>
      <script>
        const displayBoard = document.querySelector('#displayBoard');

        document.querySelectorAll('button').forEach((button) =>
          button.addEventListener('click', (e) => {
            if (button.id === 'resetBtn') return;

            const thisId = Math.floor(Math.random() * 1000000);
            const selector = '#a' + thisId;
            const route = '/' + button.id.replace('Btn', '')
            
            createDisplay(thisId, route);

            fetch('http://localhost:3000' + route)
              .then((res) => res.text())
              .then((data) => {
                console.log('daTA', data)
                document.querySelector(selector).textContent = data
              });
          })
        );

        document.querySelector('#resetBtn').addEventListener('click', async () => {
          clearDisplays();
        });

        const clearDisplays = () => {
          displayBoard.innerHTML = '';
        };

        const createDisplay = (id, route) => {
          const display = document.createElement('div');
          display.textContent = 'Requesting ' + route;
          display.id = 'a'+id;
          display.classList = 'm-2 border border-primary';
          displayBoard.append(display);
        };
      </script>
    </body>
  </html>`;

export const blockingLoop = (startTime: number = Date.now(), size: number = 5e7) => {
  console.log('Starting Loop', startTime);
  Array(size)
    .fill(null)
    .forEach((el) => {});
  console.log('Finished loop', Date.now() - startTime);
  return `/blocking endpoint complete ${Date.now() - startTime}`;
};

export const createHash = (start: number) =>
  crypto.pbkdf2('a', 'b', 600000, 512, 'sha512', (error, key) => {
    console.log(`HASH: `, Date.now() - start);
    return 'Hash Complete ' + key;
  });
