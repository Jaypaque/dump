# Obj2Ref
var input = JSON.parse(`
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
}`)

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
