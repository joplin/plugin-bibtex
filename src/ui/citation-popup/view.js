const inputRefsView = document.getElementById("json");
const selectedRefsView = document.getElementById("selected_refs_list");
const output = document.getElementById("output");

const refs = JSON.parse(inputRefsView.textContent);
const refsMap = new Map();
refs.forEach(ref => { refsMap.set(ref["id"], ref); });
const selectedRefs = new Set();

configAutoComplete();

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
                return list.filter(item => !selectedRefs.has(item.value["id"]));
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
    if (selectedRefs.size === 0) {
        selectedRefsView.textContent = "";
    }
    selectedRefs.add(refId);
    selectedRefsView.innerHTML += `
        <li id="${refId}">
            <span class="title">${refsMap.get(refId)["title"]}</span>
            <span class="icon_remove">x</span>
        </li>
    `;
    output.value = JSON.stringify(
        Array.from(selectedRefs)
    );
}

function removeReference (refId = "") {
    selectedRefs.delete(refId);
    document.getElementById(refId).remove();
    if (selectedRefs.size === 0) {
        selectedRefsView.textContent = "Select some references to be added to the current note";
    }
    output.value = JSON.stringify(
        Array.from(selectedRefs)
    );
}
