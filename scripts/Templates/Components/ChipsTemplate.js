import Helpers from "../../Helpers/Helper.js";


class ChipsTemplate
{
  constructor(element)
  {
    const node = document.querySelector("#chips-container");
    const chips = Helpers.HTMLElement("div", {class : "chips", data : element}, element, node);
    const close = Helpers.HTMLElement("div", {class : "chips-close"}, "", chips);
    Helpers.HTMLElement("img", {src : "/assets/icons/xmark.svg"}, "", close);

    return chips;
  }
}

export default ChipsTemplate;

