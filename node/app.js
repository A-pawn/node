var express = require('express'); //express框架模块  npm install express --save
var path = require('path'); //系统路径模块    npm install path --save
var fs = require('fs'); //文件模块   npm install fs --save
var bodyParser = require('body-parser'); //对post请求的请求体进行解析模块  npm install body-parser --save
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
})); //bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
var hostName = '127.0.0.1'; //ip
var port = 8888; //端口

//设置允许跨域请求
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
  res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
  res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//============================查询数据get接口=============================
app.get('/query', function (req, res) {
  // console.log(req.body); //获取请求参数

  var file = path.join(__dirname, 'mock/test.json'); //文件路径，__dirname为当前运行js文件的目录
  //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

  //读取json文件
  fs.readFile(file, 'utf-8', function (err, data) {
    console.log(data)
    if (err) {
      res.send('文件读取失败');
    } else {
      res.send(data);
      console.log('data', data)
    }
  });
});

//============================查询详情post接口=============================
app.post('/detail', function (req, res) {
  // console.log(req.body); //获取请求参数

  var file = path.join(__dirname, 'mock/test.json'); //文件路径，__dirname为当前运行js文件的目录
  //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径
  var id = req.body.id
  //读取json文件
  fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
      res.send('查询失败');
      return console.error(err);
    }
    var person = data.toString(); //将二进制的数据转换为字符串
    person = JSON.parse(person); //将字符串转换为json对象
    //把数据读出来删除
    for (var i = 0; i < person.data.length; i++) {
      if (id == person.data[i].id) {
        //console.log(person.data[i])
        var detail = person.data.splice(i, 1);
        var obj={}
        obj['data']=detail
      }
    }
    res.send(obj);
  })

});

//============================根据姓名查询列表post接口=============================
app.post('/queryName', function (req, res) {
  // console.log(req.body); //获取请求参数

  var file = path.join(__dirname, 'mock/test.json'); //文件路径，__dirname为当前运行js文件的目录
  //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径
  var name = req.body.name
  //读取json文件
  var details=[]

  fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
      res.send('查询失败');
      return console.error(err);
    } else {
      //把数据读出来删除
      if (name != '') {
        var person = data.toString(); //将二进制的数据转换为字符串
         person = JSON.parse(person); //将字符串转换为json对象
        for (var i = 0; i < person.data.length; i++) {
          if (name == person.data[i].name) {
            var detail = person.data.splice(i, 1);
            details=details.concat(detail)
            var obj={}
              obj['data']=details
          }
        }
        res.send(obj);

      } else {
        res.send(data);
      }
    }


  })

});

//========================添加数据get接口==================================
app.post('/add', function (req, res) {
  var file = path.join(__dirname, 'mock/test.json'); //文件路径，__dirname为当前运行js文件的目录
  var params = {
    "id": req.body.id,
    "name": req.body.name,
    // post请求用 req.body  get请求用 req.query
  }
  //写入json文件选项
  function writeJson(params) {
    //现将json文件读出来
    fs.readFile(file, 'utf-8', function (err, data) {
      if (err) {
        res.send('新增失败');
        return console.error(err);
      }
      var person = data.toString(); //将二进制的数据转换为字符串
      person = JSON.parse(person); //将字符串转换为json对象
      person.data.push(params); //将传来的对象push进数组对象中

      var str = JSON.stringify(person); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
      fs.writeFile(file, str, function (err) {
        if (err) {
          console.error(err);
        }
        console.log('----------新增成功-------------');
      })
      res.send('新增成功');
    })
  }
  writeJson(params) //执行一下;

});

//===============================删除数据接口====================================
app.post('/deleted', function (req, res) {
  // console.log(req.body); //获取请求参数

  var file = path.join(__dirname, 'mock/test.json'); //文件路径，__dirname为当前运行js文件的目录
  //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

  var params = {
    "id": req.body.id,
    // post请求用 req.body  get请求用 req.query
  }
  //写入json文件选项
  function deleteJson(id) {

    fs.readFile(file, 'utf-8', function (err, data) {
      if (err) {
        res.send('删除失败');
        return console.error(err);
      }
      var person = data.toString();
      person = JSON.parse(person);
      //把数据读出来删除
      for (var i = 0; i < person.data.length; i++) {
        if (id == person.data[i].id) {
          //console.log(person.data[i])
          person.data.splice(i, 1);
        }
      }
      person.total = person.data.length;
      var str = JSON.stringify(person);
      //然后再把数据写进去
      fs.writeFile(file, str, 'utf-8', function (err) {
        if (err) {
          console.error(err);
        }
        console.log("----------删除成功------------");
      })
      res.send('删除成功');
    })
  }

  deleteJson(Number(params.id)); //执行一下
});

//===============================修改数据接口====================================
app.post('/change', function (req, res) {
  var file = path.join(__dirname, 'mock/test.json'); //文件路径，__dirname为当前运行js文件的目录
  var id = req.body.id
  var params = {
    "name": req.body.name,
    // post请求用 req.body  get请求用 req.query
  }
  //写入json文件选项
  function changeJson(id, params) {
    fs.readFile(file, function (err, data) {
      if (err) {
        res.send('修改失败');
        console.error(err);
      }
      var person = data.toString();
      person = JSON.parse(person);
      //把数据读出来,然后进行修改
      for (var i = 0; i < person.data.length; i++) {
        if (id == person.data[i].id) {
          console.log('id一样的');
          for (var key in params) {
            if (person.data[i][key]) {
              person.data[i][key] = params[key];
            }
          }
        }
      }
      person.total = person.data.length;
      var str = JSON.stringify(person);
      //console.log(str);
      fs.writeFile(file, str, function (err) {
        if (err) {
          console.error(err);
        }
        console.log('--------------------修改成功');
        console.log(person.data);
      })
      res.send('修改成功');
    })
  }
  changeJson(id, params) //执行一下;

});


app.listen(port, hostName, function () {

  console.log(`服务器运行在http://${hostName}:${port}`);

});
