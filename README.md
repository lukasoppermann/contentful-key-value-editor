# Contentful Key Value Editor
> A form for adding key value pairs with an optional type dropdown to an object field.

![Example of key value pairs with a dropdown][example]

## Configuration
You can set the following per instance of the editor:

![Configuration options][configuration]

#### Label for key
This will be shown in the empty field for the `key`. It defaults to `Name` but could for example be `meta-tag`.

#### Label for value
This will be shown in the empty field for the `value`. It defaults to `Value`.

#### Type Dropdown
Empty by default (no dropdown will be shown). If you add a list of comma separated values they will be turned into a dropdown and store with the data.

## Data structure
The data will be stored as an array with an object per item.

```Javascript
Array({
  key: "someKey",
  value: "yourValue",
  type: "Option"
}, {…})
```
## Installation
As this plugin uses parameters, you will need to install it using the [contentful cli](https://github.com/contentful/contentful-cli) with the [extension command](https://github.com/contentful/contentful-cli/tree/master/docs/extension).

1. Install the [contentful cli](https://github.com/contentful/contentful-cli) and [login](https://github.com/contentful/contentful-cli/tree/master/docs/login).

2. [Download](https://github.com/lukasoppermann/contentful-key-value-editor/archive/master.zip) or clone this repo to you computer.

3. In your terminal cd into the folder of this plugin and run the following commands

```bash
# cd into the folder of this extension
cd your/folder/contentful-key-value-editor
# If you did not login yet
contentful login
# Tell contentful to use your main space (alternatively use the --space-id flag in the folllowing commands)
contentful space use
# create an extension
contentful extension create
```

## Updating the extension
If you want to install a new update of this extension, you need to download the latest version to your computer and run the following commands:

```bash
# cd into the folder of this extension
cd your/folder/contentful-key-value-editor
# update the extension
contentful extension update
```

[example]: example.png
[configuration]: configuration.png
