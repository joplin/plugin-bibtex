
# BibTeX Plugin

Many users use Joplin for research purposes, so it is natural for them to do citations all the time. Accordingly, adding a feature that supports citations and BibTeX will be of great benefit to Joplin. And here it is :)
- For more info: https://discourse.joplinapp.org/c/gsoc-projects/bibtex-plugin

![BibTeX Plugin Demo](https://i.ibb.co/JyxhLzg/DEMO-FULL-PLUGIN.gif)

## Features
- Read from a source of citations (a `.bib` file).
- Allow the user to choose from a list of previously imported citations.
- Insert references into the note content.

## Installation
- Go to Tools > Options > Plugins
- Search for `bibtex`
- Click Install plugin
- Restart Joplin to enable the plugin

## How to use
- Prepare a `BibTeX` file (if you are using Zotero, you can export your library as a `.bib` file)
- Go to `Tools` > `Options` > `BibTeX Plugin` Section
- Specify the path of your `.bib` file and click `Apply`
- To Import a reference into your note content, simply click on the plugin icon in the toolbar and choose which reference to include, then click `OK`

## Building the plugin
The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created at the root, which can use to distribute the plugin.

To build the plugin, simply run `npm run dist`.
The project is setup to use TypeScript, although you can change the configuration to use plain JavaScript.

## Testing
To test the plugin, simply run `npm test`. The testing library used is [Jest](https://jestjs.io/).
