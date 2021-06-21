/* UI Elements */
let referenceIdInput = document.getElementById("reference_id");
let refs = document.getElementsByTagName("li");

console.log(refs);

/* Event Listeners */

// When selecting a certain reference, set the "reference_id" field accordingly
let selectedReferenceView = null;
for (let i = 0; i < refs.length; i++) {
    let ref = refs[i];
    ref.addEventListener("click", event => {
        referenceIdInput.value = event.target.id;
        
        // Attach some css style
        if (selectedReferenceView !== null) {
            selectedReferenceView.className = "";
        }

        selectedReferenceView = event.target;
        console.log(event.target);
        selectedReferenceView.className = "selected";
    });
}
