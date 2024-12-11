let counter = 1;

//demo1
function add() {
    let div = document.getElementById('inside');
    let element = document.createElement('div');

    divId(element);

    element.style.width = "100px";
    element.style.height = "100px";
    element.style.border = "2px solid black";
    element.title = "";

    div.appendChild(element);
    document.getElementById('elementKind').addEventListener('change', add);



    //demo2
    let colorElement = document.getElementById('elementColor').value;
    element.style.background = colorElement;

    //demo3
    let elemWidth = document.getElementById('elementWidth').value;
    element.style.width = elemWidth + "px";

    let elemHeight = document.getElementById('elementHeight').value;
    element.style.height = elemHeight + "px";

    //demo4
    let elementContent = document.getElementById('elementContent').value;
    element.innerText = elementContent;

    //demo5
    let colorContent = document.getElementById('colorContent').value;
    element.style.color = colorContent;

    let fontSizeContent = document.getElementById('fontSizeContent').value;
    element.style.fontSize = fontSizeContent + 'px';

    //demo6
    let borderWidth = document.getElementById('borderWidth').value;
    element.style.borderWidth = borderWidth + 'px';

    let borderStyle = document.getElementById('borderStyle').value;
    element.style.borderStyle = borderStyle;

    let borderColor = document.getElementById('borderColor').value;
    element.style.borderColor = borderColor;

    //demo7
    let marginElement = document.getElementById('marginElement').value;
    element.style.margin = marginElement + 'px';

    let paddingElement = document.getElementById('paddingElement').value;
    element.style.padding = paddingElement + 'px';

    //demo8
    let bRadiusElement = document.getElementById('bRadiusElement').value;
    element.style.borderRadius = bRadiusElement + 'px';

    //demo9    
    function replaceElement() {
        // קבלת האלמנט שנבחר מהתפריט הנפתח
        const selectedElementType = document.getElementById('elementKind').value;

        // מציאת האלמנט הראשוני שברצוננו להחליף
        const oldElement = document.getElementById('element');

        // בדיקה אם נבחר סוג אלמנט
        if (selectedElementType) {
            // יצירת האלמנט החדש על בסיס הבחירה
            const newElement = document.createElement(selectedElementType);
            newElement.id = 'element'; // שמירה על אותו ID
            newElement.textContent = 'זהו אלמנט מסוג ' + selectedElementType;

            // החלפת האלמנט הישן בחדש
            oldElement.replaceWith(newElement);
        }
    }

    // הוספת מאזין לאירוע 'change' ב-<select> להפעלת הפונקציה בעת שינוי הבחירה
    document.getElementById('elementKind').addEventListener('change', replaceElement);
    replaceElement()

    //demo10
    let xShadow = +document.getElementById('xShadow').value;
    let yShadow = +document.getElementById('yShadow').value;
    let colorShadow = document.getElementById('colorShadow').value;
    element.style.boxShadow = `${xShadow}px ${yShadow}px ${colorShadow}`;

    //demo11
    let newTitle = document.getElementById('newTitle').value;
    const creationDate = new Date().toLocaleString();
    element.title = newTitle + " " + creationDate;

    //demo12
    function divId(element) {
        let newID = 'id' + counter;
        element.id = newID;

        counter++;
        return newID;

    }


}
//demo13
function clearBoard() {
    document.getElementById('inside').innerHTML = "";
}

//demo14
function saveDesignToLS() {
    localStorage.setItem('content', document.getElementById('inside').innerHTML);

}

function LoadDesignToLS() {
    document.getElementById('inside').innerHTML = localStorage.getItem('content');
}

//demo 15
document.getElementById('inside').addEventListener('input', saveDesignToLS);

