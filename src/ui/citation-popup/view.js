const inputRefsView = document.getElementById("json");
const selectedRefsView = document.getElementById("selected_refs_list");

const refs = JSON.parse(inputRefsView.textContent);
const refsMap = new Map();
refs.forEach(ref => { refsMap.set(ref["id"], ref); });
const selectedRefs = new Set();

configAutoComplete();

function configAutoComplete () {

    const autoCompleteJS = new autoComplete({
        placeHolder: "Search for references...",
        data: {
            src: refs,
            keys: ["title"],
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
                        ${data.match}
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
    console.log(refId);
    if (selectedRefs.size === 0) selectedRefsView.textContent = "";
    selectedRefs.add(refId);
    selectedRefsView.innerHTML += `
        <li>
            <span class="title">${refsMap.get(refId)["title"]}</span>
            <span class="icon_remove">x</span>
        </li>
    `;
}
