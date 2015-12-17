var path = require('path');
var fs = require('fs');
var extend = require('util')._extend;
var easyimage = require('easyimage');

var resourceDir = process.env.RESOURCE_DIR || path.join(__dirname, 'resources');
var outputDir = process.env.OUTPUT_DIR || path.join(__dirname, 'output');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const appStoreSizes = [
    {width: 640, height: 960}, //3.5
    {width: 640, height: 1136}, //4
    {width: 750, height: 1334}, //4.7
    {width: 1242, height: 2208} //5.5
];

fs.readdir(resourceDir, function (err, files) {
    if (err) {
        console.log(err);
        return false;
    }

    files.forEach(function (file) {
        appStoreSizes.forEach(function (size) {
            var subFolderDir = path.join(outputDir, size.width + 'x' + size.height);

            var options = {
                src: path.join(resourceDir, file),
                dst: path.join(outputDir, size.width + 'x' + size.height, file),
                width: size.width,
                height: size.height
            };

            if (!fs.existsSync(subFolderDir)) {
                fs.mkdirSync(subFolderDir);
            }

            imageResize(options);
        });

    });

});

function imageResize(options) {

    var easyimagegOptions = {
        dst: outputDir,
        flatten: true,
        ignoreAspectRatio: true
    };

    easyimage.resize(
        extend(easyimagegOptions, options)
        )
        .then(function (image) {
            console.log("Image: " + image.name + " resized to: " + image.width + "x" + image.height);
        }, function (error) {
            console.log(error);
        });
}