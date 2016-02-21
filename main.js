var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// XXX: check correctness of this
function randomInRange(lo, hi) {
  return Math.floor(((random()) * (hi - lo))) + lo;
}

$(function() {
  console.log('hello world');
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Point.prototype.toString = function() {
    return this.x.toString() + ',' + this.y.toString();
  };

  var Glyph = function(numPoints, size) {
    this.points = [];
    this.fitness = 0;

    if (size) {
      // TODO: fancy point stuff
    } else {
      // we'll use 8 points, with size of 10
      this.size = 10;
      // use CS coords, not Cartesian
      this.points.push(
        (new Point(0, 0)),
        (new Point(0, this.size / 2)),
        (new Point(0, this.size - 1)),
        (new Point(this.size / 2, this.size - 1)),
        (new Point(this.size - 1, this.size - 1)),
        (new Point(this.size - 1, this.size / 2)),
        (new Point(this.size - 1, 0)),
        (new Point(this.size / 2, 0))
      );

      // should be 0,0 0,5 0,9 5,9 9,9 9,5 9,0 5,0 
    }
  };

  

  Glyph.prototype.evolve = function() {
  };

  Glyph.prototype.toSVG = function() {
    /*
    this.points.sort(function(a, b) {
      return (a.x - b.x) || (a.y - b.y);
    });
    */
    var ret = '<svg viewBox="0 0 10 10">';

    ret += '<polygon points="';

    for (var pointInd in this.points) {
      ret += this.points[pointInd].toString() + ' ';
    }

    ret += '" style="fill:black;stroke:black;stroke-width:1" />';

    ret += '</svg>';

    return ret;
  };

  /*
  this.size = size || 100;

  for (var i = 0; i < numPoints; i++) {
    this.points
  }
  */

  var iteration = 0;
  var glyph_alphabet = {};
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (var chrInd in ALPHABET) {
    glyph_alphabet[ALPHABET[chrInd]] = new Glyph();
  }

  var placeSVGs = function() {
    var svgs = '';
    var randMsg = '';
    var chars = Object.keys(glyph_alphabet);
    for (var i = 0; i < 10; i++) {
      var randCharInd = randomInRange(0, 25);
      var randChar = chars[randCharInd];
      randMsg += randChar;

      svgs += glyph_alphabet[randChar].toSVG();
    }

    $('#text').html(svgs);
    return randMsg;
  };

  var randMsg = placeSVGs();

  $('form').submit(function(event) {
    event.preventDefault();
    var msg = $('input').val().toUpperCase();
    $('input').val('');
    console.log(msg);
    iteration++;

    //eval the fitness of all the individuals in the population
    
    for (var charInd in randMsg) {
      var actualChar = randMsg[charInd];
      var userChar = msg[charInd];

      if (actualChar === userChar) {
        glyph_alphabet[acutalChar].fitness++;
      }

      //TODO
    }
      
  });

  $('#print-btn').click(function(event) {
    event.preventDefault();
    console.log(glyph_alphabet);
  });
});
