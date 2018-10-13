# Boiler Plate For Started Front End Projects

## How To install: 

**` npm install`**

## after enter:

**` npm install -g gulp-cli`**

# tools installed in this packaged:

* Bootstrap 4
* Font-Awesome 4.7
* Jquery Migrate
* Jquery
* Popper
* Sass
* Jade
* ImageMin
* Slick Carrousel
* ScrollReveal
* Normalize

# Structure from Folder

```
boiler-plate-started-front-end/
	├── build/
	│	├──	jade/
	│	│	├──	_includes/
	│	│	└── index.jade
	│	└──	sass/
	│		├──	functions/
	│		├──	mixins/
	│		├──	modules/
	│		├──	_base.scss
	│		├──	_variables.scss
	│		└──	style.scss
	├── fonts/ (you do have create this folder)
	├── img/ (you do have create this folder)
	└── js/
	gulpfile.js
	package.json
	README.md
```
after install the and run gulp inside the project the WWW folder appear it and this is the your distribuite folder.

You do have the create the folders ``fonts/`` and ``img/`` in the root folder.

# after install
Go inside the **``node_modules/slick-carousel/slick/slick-theme.scss``** and update the path variable $slick-font-path to **``"./fonts/fonts-slick/"``** and rerun the **``gulp``**