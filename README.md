# portfolio-ivan

https://ivanfernandez2646.github.io/portfolio-ivan/

# to-upload

npm install
npm start
git subtree push --prefix dist origin gh-pages

# to-generate-lang

In gulpfile.js edit "includeHTML()" function
const language = 'es'; --> for SPANISH
const language = 'en'; --> for ENGLISH
default is environment language
Then execute "npm start" for build "dist" folder
