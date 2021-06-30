const inputRefsView = document.getElementById("json");
const output = document.getElementById("main");

const refs = JSON.parse(inputRefsView.textContent);

configAutoComplete();


function configAutoComplete () {

    const autoCompleteJS = new autoComplete({
        placeHolder: "Search for references",
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
        // Prepare User's Selected Value
        const selection = feedback.selection.value[feedback.selection.key];
        // Replace Input value with the selected value
        autoCompleteJS.input.value = selection;
        // Console log autoComplete data feedback
        console.log(feedback);
    });

}
