
function obj2ref(arr, separator) {
  var out = {};
  separator = typeof separator == "string" ? separator : "/";
  var ref = function(d, prefix) {
    prefix = typeof prefix == "undefined" ? "" : prefix;
    var keys = Object.keys(d);
    for (var i = 0; i < keys.length; i++) {
      if (typeof d[keys[i]] == "object") {
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
  print(ref);
  function func(refArray) {
    print("func()", refArray);
    var len = refArray.length;
    var ni = isNaN(refArray[len - 2]) ? {} : [];
    var type = ni;
    ni[refArray[len - 2]] = refArray[len - 1];
    if (len == 2) {
      return ni;
    }
    var oi = Object.assign({}, tempObj);
    for (var i = 0; i < len - 2; i++) {
      if (oi) {
        oi = oi[refArray[i]];
      }
    }
    oi
      ? Array.isArray(oi)
        ? (ni[oi.length - 1] = oi[oi.length - 1])
        : (ni = Object.assign(oi, ni))
      : null;
    return func([...refArray.slice(0, len - 2), ni]);
  }
  var tempObj = {};
  for (var j = 0; j < ref.length; j++) {
    tempObj = Object.assign(tempObj, func(ref[j]));
  }
  return tempObj;
}

var data = JSON.parse(`
{
  "widget": {
    "debug": "on",
    "window": {
      "title": "Sample Konfabulator Widget",
      "name": "main_window",
      "width": 500,
      "height": 500
    },
    "image": {
      "src": "Images/Sun.png",
      "name": "sun1",
      "hOffset": 250,
      "vOffset": 250,
      "alignment": "center"
    },
    "text": {
      "data": "Click Here",
      "size": 36,
      "style": "bold",
      "name": "text1",
      "hOffset": 250,
      "vOffset": 100,
      "alignment": "center",
      "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
  }
}
`);
var ref = obj2ref(data, " / ");
var obj = ref2Obj(ref, " / ");

console.log("Object", data);
console.log("Object to references", ref);
console.log("References to object", obj);
console.log(
  "Object === Object->reference->object",
  JSON.stringify(data) === JSON.stringify(obj)
);
