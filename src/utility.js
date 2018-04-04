/**
    Author: Alexander Zhu
    Date Created: March 3, 2017
    Description: Functions used in several modules
*/

function egg() {
	if (egg.elements === undefined) {
		egg.elements = document.getElementsByTagName('*');
	}

    for (var i = 0; i < egg.elements.length; i++) {
        var element = egg.elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(/angel/gi, "Agnel");

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }

    setTimeout(egg, 5000);
}