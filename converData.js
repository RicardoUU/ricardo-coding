var nodes = [
  {"id":2,"title":"第一级1","parentid":0},
  {"id":3,"title":"第二级1","parentid":2},
  {"id":4,"title":"第二级2","parentid":2},
  {"id":5,"title":"第三级1","parentid":4},
  {"id":6,"title":"第三级2","parentid":3}
];
var treeData = {
  "id": "2",
  "title": "第一级1",
  "children": [
      {
          "id": "3",
          "title": "第二级1",
          "children": [
              {
                  "id": "6",
                  "title": "第三级2",
                  "children": [
                      
                  ]
              }
          ]
      },
      {
          "id": "4",
          "title": "第二级2",
          "children": [
              {
                  "id": "5",
                  "title": "第三级1",
                  "children": [
                      
                  ]
              }
          ]
      }
  ]
}

function convertToTreeData(data, pid) {
  const result = []
  let temp = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentid === pid) {
      const obj = { 'title': data[i].name, 'id': data[i].id }
      temp = this.convertToTreeData(data, data[i].id)
      if (temp.length > 0) {
        obj.children = temp
      }
      result.push(obj)
    }
  }
  return result
}
