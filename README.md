# Future Home of Spark App

## Site should be located at:
sparkAppaz.github.io

## Things needed to run/build site:

- [Node.JS](http://nodejs.org)
- [Grunt](http://gruntjs.com/getting-started)
- [Ruby](https://www.ruby-lang.org/en/)
- [SASS](http://sass-lang.com/)

## Build the project

**First** be sure to download [Node.JS](http://nodejs.org). Next open up the terminal or command line for your system and just type (or copy past):

```
npm install -g grunt-cli
```

If you run into errors with above command trying running this:

```
sudo npm install -g grunt-cli
```

This will ask for your password for your computer, this is okay.

Next move to the project in your terminal or command line by entering this:

Mac Users:
```
	cd ~/Downloads/sparkAppaz.github.io-master
```

or Mac Users:
```
	cd 
```
After cd be sure to add a space, then you can open finder and click and drag the folder to our terminal. Press enter.

Windows Users:
```
	cd downloads/sparkAppaz.github.io-master
```
Press Enter.

**Second**, to get get everything set up run this command:

```
npm install
```

**Lastly**, run this command:
```
grunt serve
```

Then once everything running and you see "waiting......" go to your browser of choice (IE10 and up), and then navigate to localhost:3000, and you should see the full build with a development server running. You now should make your changes in the src directory.