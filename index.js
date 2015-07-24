function graham_scan(points) {
  // The enveloppe is the points themselves
  if (points.length <= 3) return points;
  
  // Find the pivot
  var pivot = points[0];
  for (var i=0; i<points.length; i++) {
    if (points[i][1] < pivot[1] || (points[i][1] === pivot[1] && points[i][0] < pivot[0]))
      pivot = points[i];
  }

  // Attribute an angle to the points
  for (var i=0; i<points.length; i++) {
    points[i]._graham_angle = Math.atan2(points[i][1] - pivot[1], points[i][0] - pivot[0]);
  }
  points.sort(function(a, b){return a._graham_angle === b._graham_angle
                                        ? a[0] - b[0]
                                        : a._graham_angle - b._graham_angle});

  // Adding points to the result if they "turn left"
  var result = [points[0]], len=1;
  for(var i=1; i<points.length; i++){
    var a = result[len-2],
        b = result[len-1],
        c = points[i];
    while (
        (len === 1 && b[0] === c[0] && b[1] === c[1]) ||
        (len > 1 && (b[0]-a[0]) * (c[1]-a[1]) <= (b[1]-a[1]) * (c[0]-a[0]))) {
        len--;
        b = a;
        a = result[len-2];
    }
    result[len++] = c;
  }
  result.length = len;
  return result;
}

module.exports = graham_scan;
