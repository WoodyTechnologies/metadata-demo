# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


/!\ For use browser :

```
Add "<div id="modal" />" in HTML page.
```



For use sessionID or browseUrl in metadata :

Ex : 

```
const configBrowser = {
  sessionID : "session_945aab3d-298a-420a-8304-3ce60fb39149",
  browseUrl : "https://localhost:4443/browser/browse"
}

<Metadata data={meta} onChange={handleChange} {...configBrowser} />
```