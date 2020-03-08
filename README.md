# Obj2Ref
````
{
  "name": "John",
  "age": 30,
  "cars": [
    {
      "name": "Ford",
      "models": ["Fiesta","Focus","Mustang"]
    },
    {
      "name": "BMW",
      "models": ["320","X3","X5"]
    }
    ]
  }
}
````
obj2ref(..., ' / ') 
````
{
  "name": "John",
  "age": 30,
  "cars / 0 / name": "Ford",
  "cars / 0 / models / 0": "Fiesta",
  "cars / 0 / models / 1": "Focus",
  "cars / 0 / models / 2": "Mustang",
  "cars / 1 / name": "BMW",
  "cars / 1 / models / 0": "320",
  "cars / 1 / models / 1": "X3",
  "cars / 1 / models / 2": "X5"
}
````
ref2obj(..., ' / ') 
````
{
  "name": "John",
  "age": 30,
  "cars": [
    {
      "name": "Ford",
      "models": ["Fiesta","Focus","Mustang"]
    },
    {
      "name": "BMW",
      "models": ["320","X3","X5"]
    }
    ]
  }
}
````
#Functions
````js

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
function ref2obj(arr, separator) {
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
````
