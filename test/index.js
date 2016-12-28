/**
 * Test compares that all generated files by Sass (actual)
 * are equal to the expected ones
 *
 * In short:
 * test/fixtures/expected/*.expected.css === test/fixtures/*.css
 */

/** REQUIRES **/
const fs = require('fs');
const tape = require('tape');
const glob = require('glob');

/** METHODS **/

/**
 * Gets the expected and actual files and runs tests to compare them
 */
function compareFixtures() {
    const expectedDir = 'test/fixtures/expected/';

    // get corresponding lists of expected and actual files
    const expectedFiles = glob.sync(`${expectedDir}*.expected.css`);
    const actualFiles = getActualFilesFromExpected(expectedFiles);

    expectedFiles.forEach((expectedFile, i) => {// run test for the each pair
        testFilesAreEqual(expectedFile, actualFiles[i])
    });
    if (!expectedFiles.length) {
        console.log('No files found to be tested');
    }
}

/**
 * Read files and compares them via test
 * @param expectedPath {Array}
 * @param actualPath {Array}
 */
function testFilesAreEqual(expectedPath, actualPath) {
    const expected = fs.readFileSync(expectedPath, 'utf8');
    const actual = fs.readFileSync(actualPath, 'utf8');

    tape('expected === scss output', (t) => {
        t.equal(expected, actual, actualPath);
        t.end();
    });
}

/**
 * Helper method to get an array of actual files paths
 * @param expectedFiles {Array}
 * @returns {Array}
 */
function getActualFilesFromExpected(expectedFiles) {
    return expectedFiles.map((expectedFile) => {
        return expectedFile
            .replace('/expected', '')// remove '/expected' form path
            .replace('.expected', '');// remove '.expected'
    });
}

/** RUN **/
compareFixtures();