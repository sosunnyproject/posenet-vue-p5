import * as posenet from '@tensorflow-models/posenet';

export default async function( sketch ) {

    var width = 0;
    var height = 0;
    
    sketch.setup = async function() {
        width = document.getElementById('target-multi').clientWidth;
        height = document.getElementById('target-multi').clientHeight;
        console.log(width, height);
        console.log(document.getElementById('sketch').width);
        sketch.createCanvas(width, height);

        var posenetCoord = await detectWithTensor();
        /* eslint-disable no-console */
        console.log(posenetCoord);
        console.log(typeof(posenetCoord));
        /* eslint-disable no-console */
        sketch.fill('red');

        for (var i=0; i<posenetCoord.length; i++) {
            // per object
            for (var j=0; j<posenetCoord[i]['keypoints'].length; j++) {
                // per point
                var x = posenetCoord[i]['keypoints'][j]['position']['x']
                var y = posenetCoord[i]['keypoints'][j]['position']['y']
                console.log(x,y);
                //sketch.fill('red');
                sketch.ellipse(x, y, 10,10);
            }
        }
    }

    sketch.draw = async function() {
        //sketch.fill(0);
        //sketch.ellipse(sketch.random(0,width), sketch.random(0,height), 10,10);
    }

    sketch.windowResized = function() {
        width = document.getElementById('sketch').clientWidth;
        height = document.getElementById('sketch').clientHeight;
        sketch.resizeCanvas(width, height);
    }

    async function detectWithTensor() {
        let imageScaleFactor = 0.50;
        let flipHorizontal = false;
        let outputStride = 16;
        let maxPoseDetections = 5;
        let scoreThreshold = 0.5;
        let nmsRadius = 20;
  
        let imageElementMulti = document.getElementById('target-multi');
        let net = await posenet.load();
        return await net.estimateMultiplePoses(
          imageElementMulti, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections, scoreThreshold, nmsRadius);
      }

}