
# Joplin BibTeX Plugin

Many users use Joplin for research purposes, so it is natural for them to do citation all the time. Therefore, adding a feature that supports citing references in [BibTeX](http://www.bibtex.org/) format will be of great benefit to Joplin. And here it is :)
- For more info: https://discourse.joplinapp.org/c/gsoc-projects/bibtex-plugin

![BibTeX Plugin Demo](https://i.ibb.co/c3HwRSX/DEMO-RENDER-REFERENCES-AT-THE-BOTTOM.gif)

## Features
- Import a source of research references (a `.bib` file).
- Allow the user to choose from a list of previously imported references.
- Insert references into the note content.
- Render a full list of references at the bottom of the note viewer (in [APA](https://apastyle.apa.org/) format) 

## Installation
- Open Joplin
- Go to Tools > Options > Plugins
- Search for `bibtex`
- Click Install plugin
- Restart Joplin to enable the plugin

## How to use
- Prepare a `BibTeX` file (if you are using Zotero, you can export your library as a `.bib` file).
- Go to `Tools` > `Options` > `BibTeX Plugin` Section.
- Specify the path of your `.bib` file and click `Apply`.
- To Import a reference into your note content, simply click on the plugin icon in the toolbar and choose which references to include, then click `OK`.
- You will see that the references you selected were inserted in the current position in the note body. Furthermore, any reference you include will automatically appear at the bottom of the note viewer.

## Building the plugin
The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created at the root, which can use to distribute the plugin.

To build the plugin, simply run `npm run dist`.
The project is setup to use TypeScript, although you can change the configuration to use plain JavaScript.

## Testing
To test the plugin, simply run `npm test`. The testing library used is [Jest](https://jestjs.io/).
