<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <img id='target-single' alt="Charlie cox" src="../assets/Charlie-Cox-Matt-Murdock-Daredevil-842002.jpg">
    <p>{{ poseSingle || 'loading..'}}</p> -->
    <img id='target-multi' alt="Infinity war" src="../assets/InfinityWar5aa86b6fdaeb5.0.jpg">
    <p>{{ poseMulti || 'loading..'}}</p>
    <div class='sketch' id="sketch"></div>
  </div>
</template>

<script>
// import * as posenet from '@tensorflow-models/posenet';
import sketch from './sketch.js'
import p5 from 'p5';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    net: null,
    poseSingle: null,
    poseMulti: null,
    myp5: null,
  },
  mounted: async function() {
    //this.net = await posenet.load();
    this.myp5 = new p5(sketch, document.getElementById('sketch'))
    // this.detectWithTensor();
  },
  methods: {
    detectWithTensor: async function() {
      // for single detection
      let imageScaleFactor = 0.50;
      let flipHorizontal = false;
      let outputStride = 16;

      let imageElementSingle = document.getElementById('target-single');
      this.poseSingle = await this.net.estimateSinglePose(
        imageElementSingle, imageScaleFactor, flipHorizontal, outputStride);

      // for multiple detection
      let maxPoseDetections = 5;
      let scoreThreshold = 0.5;
      let nmsRadius = 20;

      let imageElementMulti = document.getElementById('target-multi');
      this.poseMulti = await this.net.estimateMultiplePoses(
        imageElementMulti, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections, scoreThreshold, nmsRadius);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#sketch {
   width: 100%;
   height:100%;
   position: absolute;
   left: 0;
   top: 0;
   border: 1px solid black;
}
</style>
