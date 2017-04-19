/* eslint-env node */
'use strict';

var MergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var path = require('path');

function distDirFor(packageName) {
  try {
    var resolved = require.resolve(packageName + '/package.json');
    return path.join(path.dirname(resolved), 'dist');
  } catch (e) {
    return null;
  }
}

module.exports = {
  name: 'ember-mobiledoc-apple-news-renderer',

  treeForVendor: function() {
    var files = []
    var dir = distDirFor('@bustle/mobiledoc-apple-news-renderer');

    files.push(new Funnel(dir, {
      files: [
        'amd/mobiledoc-apple-news-renderer.js',
        'amd/mobiledoc-apple-news-renderer.map'
      ],
      destDir: 'mobiledoc-apple-news-renderer'
    }))

    return new MergeTrees(files)
  },

  included: function(app) {
    app.import('vendor/mobiledoc-apple-news-renderer/amd/mobiledoc-apple-news-renderer.js')
  }
};
