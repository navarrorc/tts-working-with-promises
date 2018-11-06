## Running this example

### Make sure you have **[nodejs](https://nodejs.org/en/)** installed on your machine then run the following commands in a command prompt or terminal

---

Run the following in the project's directory to install all the dependencies:

`npm install`

---

After all the dependencies have been installed then run the following in the project's directory to start a browser-sync server (see the contents of the **index.js** file):

`npm start`

---

#### Supporting sources
* Why are the static files stored in the **docs** directory? [supporting documentation](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/)
    * In short: "You can configure GitHub Pages to publish your site's source files from ... or a  `/docs` folder on your master branch."
* Using [browser-sync](https://browsersync.io/docs/options#option-watch) as a module in **index.js**
* The Visual Studio Code [REST Client](https://github.com/Huachao/vscode-restclient/blob/master/README.md) extension is being used to understand the [JSONPlaceholder](https://github.com/typicode/jsonplaceholder) Mock API, see the **rest.http** file