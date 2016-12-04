(function () {
    const cssFileNamesSelect = document.querySelector('.css-file-names');
    const cssLink = document.querySelector('.css-link');
    const cssSourceEl = document.querySelector('.css-source');
    const cssNativeEl = document.querySelector('.css-native');
    const cssSassEl = document.querySelector('.css-sass');


    function applyTest(cssFileName) {
        const cssGeneratedPath = '../fixtures';
        const cssExpectedPath = '../fixtures/expected';
        const cssToApplyPath = `${cssGeneratedPath}/${cssFileName}.css`;
        const testName = cssFileName.replace('-native', '').replace('-sass', '');

        const cssNativePath = `${cssGeneratedPath}/${testName}-native.css`;
        const cssSassPath = `${cssGeneratedPath}/${testName}-sass.css`;
        const cssSourcePath = `${cssExpectedPath}/${testName}.scss`;

        cssLink.href = cssToApplyPath;

        // show the code
        fetch(cssSourcePath)
            .then((res) => res.text())
            .then((text) => {
                cssSourceEl.innerHTML = hljs.highlight("scss", text).value;
            });

        fetch(cssNativePath)
            .then((res) => res.text())
            .then((text) => {
                cssNativeEl.innerHTML = hljs.highlight("css", text).value;
            });

        fetch(cssSassPath)
            .then((res) => res.text())
            .then((text) => {
                cssSassEl.innerHTML = hljs.highlight("css", text).value;
            });
    }

    function getSelectedCssFileName() {
        return cssFileNamesSelect.options[cssFileNamesSelect.selectedIndex].innerHTML;
    }

    cssFileNamesSelect.addEventListener('change', function () {
        applyTest(getSelectedCssFileName());
    });

    // INIT
    applyTest(getSelectedCssFileName());
}());