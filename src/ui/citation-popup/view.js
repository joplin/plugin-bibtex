/* 
For some reason, Joplin does not load the scripts in order.
This strange behavior was causing the current script to load before he.min.js
resulting in "he is not defined" error.
The quick and dirty way to solve this bug is to make sure the current script
waits until all the other scripts get loaded by Joplin,
and then starts doing its job
*/
setTimeout(main, 5, 10);

/* UI Elements */
const inputRefsView = document.getElementById("json");
const selectedRefsView = document.getElementById("selected_refs_list");
const output = document.getElementById("output");

function main () {

    /* State */
    const refs = JSON.parse( he.decode(inputRefsView.textContent) );
    const invertedRefsIndex = {};
    refs.forEach(ref => invertedRefsIndex[ ref["id"] ] = ref);
    const state = {
        selectedRefs: new Set()
    };

    configAutoComplete();

    /* Event Listeners */
    selectedRefsView.addEventListener("click", event => {
        if (event.target.classList.contains("icon_remove")) {
            removeReference(event.target.parentNode.id);
        }
    });

    function configAutoComplete () {

        const autoCompleteJS = new autoComplete({
            placeHolder: "Search for references...",
            data: {
                src: refs,
                keys: ["title"],
                filter: list => {
                    return list.filter(item => !state.selectedRefs.has(item.value["id"]));
                }
            },
            resultsList: {
                noResults: true,
                maxResults: 15,
                tabSelect: true
            },
            resultItem: {
                element: (item, data) => {
                    // Modify Results Item Style
                    item.style = "display: flex; justify-content: space-between;";
                    // Modify Results Item Content
                    item.innerHTML = `
                        <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                            ${ data.match }
                        </span>
                    `;
                },
                highlight: true
            },
            events: {
                input: {
                    focus: () => {
                        if (autoCompleteJS.input.value.length) autoCompleteJS.start();
                    }
                }
            }
        });
        autoCompleteJS.searchEngine = "loose";

        autoCompleteJS.input.addEventListener("selection", event => {
            const feedback = event.detail;
            const selection = feedback.selection.value;
            addReference(selection["id"]);
        });

    }

    function addReference (refId = "") {
        state.selectedRefs.add(refId);
        render();
    }

    function removeReference (refId = "") {
        state.selectedRefs.delete(refId);
        render();
    }

    /* Rendering state-based UI */
    function render () {
        const selectedRefsArray = Array.from(state.selectedRefs);
        selectedRefsView.innerHTML = template(selectedRefsArray);
        output.value = JSON.stringify(selectedRefsArray);
    }

    /**
     * Returns an HTML representation of an array of refs
     * @param {Reference[]} refs
     * @returns string
     */
    function template (refs = []) {
        if (refs.length === 0) {
            return "Select some references to be added to the current note";
        }
        return (
            refs
                .map(refId => invertedRefsIndex[refId])             // id => reference
                .map(ref => (`
                    <li id="${ he.encode(ref["id"]) }">
                        <span class="title">${ he.encode(ref["title"]) }</span>
                        <span class="icon_remove">x</span>
                    </li>
                `))                                                 // reference => <li>
                .join(" ")
        );
    }

}
