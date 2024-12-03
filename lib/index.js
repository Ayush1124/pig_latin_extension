// import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
// import { Widget } from '@lumino/widgets';
import { Widget } from '@lumino/widgets';
// Helper function to convert text to Pig Latin
function toPigLatin(text) {
    return text.replace(/\b(\w+)(\W*)/g, (match, word, punctuation) => {
        const vowels = /^[aeiouAEIOU]/;
        if (vowels.test(word)) {
            return `${word}way${punctuation}`; // If it starts with a vowel, add "way"
        }
        else {
            const firstVowelIndex = word.search(/[aeiouAEIOU]/);
            if (firstVowelIndex === -1) {
                return `${word}ay${punctuation}`; // No vowels, just add "ay"
            }
            // Consonant cluster logic
            return `${word.slice(firstVowelIndex)}${word.slice(0, firstVowelIndex)}ay${punctuation}`;
        }
    });
}
// Create a new sidebar widget
class PromptSidebar extends Widget {
    constructor() {
        super();
        this.addClass('jp-PromptSidebar');
        // Create a container for the UI
        const container = document.createElement('div');
        container.style.padding = '10px';
        // Create a text input
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter text here';
        input.style.width = '100%';
        input.style.marginBottom = '10px';
        // Create a submit button
        const button = document.createElement('button');
        button.textContent = 'Submit';
        button.style.display = 'block';
        // Create a display area for the translated text
        const output = document.createElement('div');
        output.style.marginTop = '10px';
        output.style.color = 'blue';
        // Add event listener for the button
        button.addEventListener('click', () => {
            const text = input.value; // Get the text from the input box
            if (text.trim()) { // Ensure non-empty input
                const pigLatin = toPigLatin(text); // Convert to Pig Latin
                output.textContent = `Pig Latin: "${pigLatin}"`; // Display Pig Latin
                input.value = ''; // Clear the input box
            }
            else {
                output.textContent = 'Please enter some text before submitting.';
                output.style.color = 'red'; // Show error in red
            }
        });
        // Append the elements to the container
        container.appendChild(input);
        container.appendChild(button);
        container.appendChild(output);
        // Append the container to the widget's DOM node
        this.node.appendChild(container);
    }
}
// Register the extension as a plugin
const extension = {
    id: 'jupyterlab-prompt-sidebar',
    autoStart: true,
    activate: (app) => {
        console.log('JupyterLab extension jupyterlab-prompt-sidebar is activated!');
        const sidebar = new PromptSidebar();
        sidebar.id = 'prompt-sidebar';
        sidebar.title.label = 'ContentGen Pig Latin Sidebar';
        sidebar.title.closable = true;
        app.shell.add(sidebar, 'right'); // Add the sidebar to the right area
    }
};
export default extension;
