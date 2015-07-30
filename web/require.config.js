require.config({
    baseUrl: 'src',
    paths: {
        jquery: 'lib/jquery/dist/jquery',
        underscore: 'lib/underscore/underscore',
        text: 'lib/requirejs-text/text',
        backbone: 'lib/backbone/backbone',
        css: 'lib/require-css/css',
        impress: "lib/impress/impress",
        validation: "lib/backbone-validation/dist/backbone-validation-amd"
    },

    shim: {
        'impress': {
            exports: 'impress'
        }
    }
});