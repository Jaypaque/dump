function obj2ref(arr, separator) {
  var out = {};
  separator = typeof separator == "string" ? separator : "/";
  var ref = function(d, prefix) {
    prefix = typeof prefix == "undefined" ? "" : prefix;
    var keys = Object.keys(d);
    for (var i = 0; i < keys.length; i++) {
      if (typeof d[keys[i]] == "object" && d[keys[i]] != null) {
        ref(d[keys[i]], prefix + keys[i] + separator);
      } else {
        out[prefix + keys[i]] = d[keys[i]];
      }
    }
  };
  ref(arr);
  return out;
}
function ref2Obj(arr, separator) {
  separator = typeof separator == "string" ? separator : "/";
  var keys = Object.keys(arr);
  var ref = [];
  for (var i = 0; i < keys.length; i++) {
    var f = keys[i].split(separator).map(function(x) {
      var i = parseInt(x);
      return isNaN(i) ? x : i;
    });
    ref.push([...f, arr[keys[i]]]);
  }
  var tempObj = isNaN(ref[0][0]) ? {} : [];
  for (var j = 0; j < ref.length; j++) {
    tempObj = Object.assign(tempObj, func(ref[j]));
  }
  function func(refArray) {
    var ni = isNaN(refArray[refArray.length - 2]) ? {} : [];
    ni[refArray[refArray.length - 2]] = refArray[refArray.length - 1];
    if (refArray.length == 2) {
      return ni;
    }
    var oi = Object.assign({}, tempObj);
    for (var i = 0; i < refArray.length - 2; i++) {
      if (oi) {
        oi = oi[refArray[i]];
      }
    }
    if (oi) {
      ni = Object.assign(oi, ni);
    }
    return func([...refArray.slice(0, refArray.length - 2), ni]);
  }
  return tempObj;
}
