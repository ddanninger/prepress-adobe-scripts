/**
 * Multiply arts in 2-D fashion.
 */

#target Illustrator
#include '../.lib/ui-duplicate.js'

var BOUNDS_TEXT = [0, 0, 50, 21]
var BOUNDS_EDIT = [0, 0, 100, 21]
var BOUNDS_EDIT_SMALL = [0, 0, 36, 21]

checkSingleSelection()

init('Duplicate')
root.duplicate = root.addDuplicateGroup()
duplicateHEdit.active = true

addAction('Cancel')
addAction('OK', function() { duplicate() })
show()