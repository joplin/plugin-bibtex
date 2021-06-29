const inputRefsView = document.getElementById("json");
const output = document.getElementById("main");

const refs = JSON.parse(inputRefsView.textContent);

// The autoComplete.js Engine instance creator

function configAutoComplete () {

    const autoCompleteJS = new autoComplete({
        placeHolder: "Search for references",
        data: {
            src: refs,
            keys: ["title"],
        },
        resultsList: {
            element: (list, data) => {
                const info = document.createElement("p");
                if (data.results.length > 0) {
                    info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
                } else {
                    info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
                }
                list.prepend(info);
            },
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
    autoCompleteJS.searchEngine = "strict";

    autoCompleteJS.input.addEventListener("selection", event => {
        const feedback = event.detail;
        // Prepare User's Selected Value
        const selection = feedback.selection.value[feedback.selection.key];
        // Replace Input value with the selected value
        autoCompleteJS.input.value = selection;
        // Console log autoComplete data feedback
        console.log(feedback);
    });

}
