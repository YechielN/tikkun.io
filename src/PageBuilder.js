/*jslint browser: true */

(function (Tikkun) {
    "use strict";

    var newPage = Tikkun.Page;

    function isLastLineOfColumn(lineIndex, columnIndex, arrangement) {
        return lineIndex >= arrangement[columnIndex].length - 1;
    }

    function isLastColumn(columnIndex, arrangement) {
        return columnIndex >= arrangement.length - 1;
    }

    function firstLineOfNextColumn(columnIndex, arrangement) {
        if (!isLastColumn(columnIndex, arrangement)) {
            return arrangement[columnIndex + 1][0];
        }

        return null;
    }

    function lineAfterLineInColumn(lineIndex, columnIndex, arrangement) {
        if (isLastLineOfColumn(lineIndex, columnIndex, arrangement)) {
            return firstLineOfNextColumn(columnIndex, arrangement);
        }

        return arrangement[columnIndex][lineIndex + 1];
    }

    function newPageBuilder(spec) {

        var arrangement = spec.arrangement,
            torahText = spec.torahText,
            aliyot = spec.aliyot,
            newLine = spec.newLine,
            newLineBuilder = spec.newLineBuilder,
            pageAtIndex = function (pageIndex) {
                var thisColumn = arrangement[pageIndex] || [],
                    lines = thisColumn.map(function (lineStart, lineIndex) {
                        var nextLine = lineAfterLineInColumn(lineIndex, pageIndex, arrangement),
                            lineBuilder = newLineBuilder(torahText, aliyot, lineStart, nextLine);

                        return newLine({
                            text: lineBuilder.text,
                            verses: lineBuilder.verses,
                            aliyot: lineBuilder.aliyot
                        });
                    });

                return newPage({lines: lines});
            };

        return Object.freeze({
            pageAtIndex: pageAtIndex
        });
    }

    Tikkun.PageBuilder = newPageBuilder;
}(window.Tikkun));
