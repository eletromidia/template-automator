## Template teste

- Video:
http://localhost:3000/?video=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F82%2FCircular_panoramic_view_of_the_Champs_de_Mars_-_Palace_of_Electricity.ogv&config={%22id%22:%22%22,%22name%22:%22%22,%22width%22:800,%22height%22:600,%22bgColor%22:%22%23ffffff%22,%22elements%22:[{%22type%22:%22image%22,%22alias%22:%22IMAGEM%22,%22properties%22:{%22pos_x%22:%22620%22,%22pos_y%22:%22420%22,%22width%22:%22160%22,%22height%22:%22160%22,%22color%22:%22%23000000%22,%22border%22:%22rounded%22},%22transition%22:{%22type%22:%22slide%22,%22start%22:%222000ms%22}},{%22type%22:%22text%22,%22alias%22:%22TITULO%22,%22properties%22:{%22pos_x%22:%2220%22,%22pos_y%22:%2220%22,%22width%22:%22760%22,%22height%22:%2240%22,%22color%22:%22%23575757%22,%22font%22:%22gothamBold%22,%22font_size%22:24,%22align%22:%22center%22},%22transition%22:{%22type%22:%22fadeIn%22,%22start%22:%221000ms%22}}]}

- Imagem:
http://localhost:3000/?video=http://pudim.com.br/pudim.jpg&config={%22id%22:%22%22,%22name%22:%22%22,%22width%22:800,%22height%22:600,%22bgColor%22:%22%23ffffff%22,%22elements%22:[{%22type%22:%22image%22,%22alias%22:%22IMAGEM%22,%22properties%22:{%22pos_x%22:%22620%22,%22pos_y%22:%22420%22,%22width%22:%22160%22,%22height%22:%22160%22,%22color%22:%22%23000000%22,%22border%22:%22rounded%22},%22transition%22:{%22type%22:%22slide%22,%22start%22:%222000ms%22}},{%22type%22:%22text%22,%22alias%22:%22TITULO%22,%22properties%22:{%22pos_x%22:%2220%22,%22pos_y%22:%2220%22,%22width%22:%22760%22,%22height%22:%2240%22,%22color%22:%22%23575757%22,%22font%22:%22gothamBold%22,%22font_size%22:24,%22align%22:%22center%22},%22transition%22:{%22type%22:%22fadeIn%22,%22start%22:%221000ms%22}}]}


## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
