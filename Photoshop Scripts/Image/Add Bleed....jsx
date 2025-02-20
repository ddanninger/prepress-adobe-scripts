// Increase canvas size and create new guide layout separating content
// and bleed area.

/*
<javascriptresource>
<category>2</category>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var dialog = new Dialog('Add Bleed')
var documentCurrentRadio, documentAllRadio
var bleedEdit, guideLayoutCheck, flattenCheck

var textBounds = [0, 0, 85, 21]
var editBounds = [0, 0, 100, 21]

dialog.hgroup(function(group) {
    group.setHelpTips('Which document should be affected.')
    group.staticText(textBounds, 'Document:', JUSTIFY_RIGHT)
    documentCurrentRadio = group.radioButton(undefined, 'Current', SELECTED)
    documentAllRadio = group.radioButton(undefined, 'All')
})
dialog.hgroup(function(group) {
    group.setHelpTips('Bleed are distributed around image.')
    group.staticText(textBounds, 'Bleed:', JUSTIFY_RIGHT)
    bleedEdit = group.editText(editBounds, unitsOf('2.5 mm'), function(it) {
        it.validateUnits()
        it.active = true
    })
})
dialog.hgroup(function(group) {
    group.setHelpTips('Guides will mark where bleed are added.')
    group.staticText(textBounds, 'Guide Layout:', JUSTIFY_RIGHT)
    guideLayoutCheck = group.checkBox(undefined, 'Enable', SELECTED)
})
dialog.hgroup(function(group) {
    group.setHelpTips('Layers will be flattened.')
    group.staticText(textBounds, 'Flatten:', JUSTIFY_RIGHT)
    flattenCheck = group.checkBox(undefined, 'Enable')
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var isAll = documentAllRadio.value
    var bleed = UnitValue(bleedEdit.text) * 2
    var shouldAddGuide = guideLayoutCheck.value
    var shouldFlatten = flattenCheck.value
    if (!isAll) {
        process(document, bleed, shouldAddGuide, shouldFlatten)
    } else {
        for (var i = 0; i < app.documents.length; i++) {
            app.activeDocument = app.documents[i]
            process(app.activeDocument, bleed, shouldAddGuide, shouldFlatten)            
        }
    }
})
dialog.show()

function process(document, bleed, shouldAddGuide, shouldFlatten) {
    if (shouldAddGuide) {
        document.guides.add(Direction.HORIZONTAL, 0)
        document.guides.add(Direction.HORIZONTAL, document.height)
        document.guides.add(Direction.VERTICAL, 0)
        document.guides.add(Direction.VERTICAL, document.width)
    }
    document.resizeCanvas(document.width + bleed, document.height + bleed)
    if (shouldFlatten) {
        document.flatten()
    }
}