/* =====================
 This file is only used to write javascript with help from the editor,
 results need to be copied into the index.html file.
=====================*/
// elements
let items = document.querySelector('.items')
// add items
let createItem = (template, parameters, values) => {
  // clone template
  let clone = document.importNode(template.content, true)
  let keyInput = clone.querySelector(".input--key")
  let valueInput = clone.querySelector(".input--value")
  // set placeholders
  keyInput.setAttribute('placeholder', parameters.keyLabel)
  valueInput.setAttribute('placeholder', parameters.valueLabel)
  // set values if defined
  if (values !== undefined) {
    keyInput.value = values.key || ''
    valueInput.value = values.value || ''
  }
  // add type Select
  let select = clone.querySelector("select")
  console.log(select)
  if (parameters.typeSelect.length > 0) {
    select.innerHTML = parameters.typeSelect.map(option =>`<option value="${option}">${option}</option>`).join('')
    console.log(select)
  } else {
    select.remove()
  }
  // return item
  return clone
}

let addItem = (container, extension, parameters, values) => {
  // get item template
  let template = document.querySelector('#item')
  // add item to items
  container.appendChild(createItem(template, parameters, values))
  // update height
  extension.window.updateHeight()
}

let removeItem = (item, extension) => {
  if (!item.classList.contains("item")) {
    item = item.closest(".item")
  }
  item.remove()
  extension.window.updateHeight()
}

// http://davidwalsh.name/javascript-debounce-function
let debounce = (func, wait) => {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (!timeout) func.apply(context, args);
    };
}
let validateAndSave = (items, extension) => {
  // get json
  let json = Array.from(items.querySelectorAll('.item')).map(item => {
    return {
      key: item.querySelector('.input--key').value,
      value: item.querySelector('.input--value').value
    }
  }).filter((item) => item.key === '' && item.key === '')

  extension.field.setValue(json)
}

let debouncedValidateAndSave = (items, extension) => debounce(validateAndSave(items, extension), 150)
// extension
let initContentfulKeyValueEditor = extension => {
  let parameters = {
    keyLabel: extension.parameters.instance.keyLabel,
    valueLabel: extension.parameters.instance.valueLabel,
    typeSelect: extension.parameters.instance.typeSelect.split(",").map(string => string.trim())
  }
  // start autoresiser
  extension.window.startAutoResizer();
  // add initial item
  let fields = extension.field.getValue()
  fields.forEach( values => {
    addItem(items, extension, parameters, values)
  })
  // add initial empty field to the end
  addItem(items, extension, parameters)
  // on change
  items.addEventListener('keyup', () => {
    debouncedValidateAndSave(items, extension)
  }, true)
  // delete items on x click
  items.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-purpose') === 'delete') {
      removeItem(e.target, extension)
      debouncedValidateAndSave(items, extension)
      // add item if otherwise no item exists
      if (items.querySelectorAll('.item').length === 0) {
        addItem(items, extension, parameters)
      }
    }
  })
  // add item on add button click
  document.querySelector('[data-purpose=add]').addEventListener('click', () => {
    addItem(items, extension, parameters)
  })
}
// init extension
(window.contentfulExtension || window.contentfulWidget).init(initContentfulKeyValueEditor)
