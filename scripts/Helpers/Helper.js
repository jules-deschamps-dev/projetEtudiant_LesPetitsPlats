class Helpers {
  /**
   * Crée un nouvel élément html
   * @param {string} type type d'element html voulu (div, span, img, ...)
   * @param {Array} attributs attributs de l'élément (id, class, src, ...)
   * @param {string} text texte à injecter entre les balises de l'élément
   * @param {string} parent noeud html parent du nouvel element
   * @returns 
   */
  static HTMLElement(type, attributs = {}, text = '', parent)
  {
    // type d'élément html
    const element = document.createElement(type);

    // attributs
    for (const [key, value] of Object.entries(attributs)) {
      element.setAttribute(key, value);
    }

    // texte
    element.textContent = text;

    // noeud parent
    parent.appendChild(element);
    
    return element;
  }
}

export default Helpers;