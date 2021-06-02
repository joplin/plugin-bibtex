# BibTeX Plugin
Many users use Joplin for research purposes, so it is natural for them to do citations all the time. Accordingly, adding a feature that supports citations and BibTeX will be of great benefit to Joplin. And here it is :)

- For more info: https://discourse.joplinapp.org/c/gsoc-projects/bibtex-plugin

## Features
- Read from a source of citations (a `.bib` file).
- Allow the user to choose from a list of previously imported citations.
- Insert references into the note content.

## Building the plugin

The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created at the root, which can use to distribute the plugin.

To build the plugin, simply run `npm run dist`.

The project is setup to use TypeScript, although you can change the configuration to use plain JavaScript.
