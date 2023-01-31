let lineNumber = 0;

function exploreDom(ancestor) {
    lineNumber++;
    if (ancestor.children) {
        console.group(`<${ancestor.tagName}>`);
        Array.from(ancestor.children).forEach(v => {
            exploreDom(v);
        });
        console.groupEnd();
    } else {
        console.log(ancestor.tagName);
        return lineNumber;
    }

    return lineNumber;
}

export default exploreDom;