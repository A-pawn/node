<template>
  <div>
    <template>
      <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column label="Date"
          prop="date">

        </el-table-column>
        <el-table-column label="Name"
          prop="name">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header"
            slot-scope="scope">
            <el-input v-model="search"
              size="mini"
              placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            <el-button size="mini"
              type="danger"
              @click="handleAdd(scope.$index, scope.row)">add</el-button>
          </template>
        </el-table-column>
      </el-table>

    </template>
    <template>

      <span v-html="styleInner"></span>

      <el-color-picker v-model="themeColor"
        show-alpha></el-color-picker>
      <div class='themeClass background'>kkkkkk</div>
    </template>

    <template>
      <el-input-number v-model="num8"
        controls-position="right"
        @change="handleChange"
        size="large"
        :precision="2"
        :step="0.1"
        :min="1"
        :max="10"></el-input-number>
    </template>

     <template>
     <div>{{a|capitalize}}</div>
    </template>

  </div>
</template>



<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        num8: 1,
        themeColor: '#112122',
        styleInner: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: '',
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        a : [1, 1, '1','1', '2', 1],
      }
    },
    created() {
      this.filter()
      this.map()
      this.some()
      this.forEach()
      this.splice()
      this.slice()
    },
    watch: {
      themeColor(n, o) {
        this.styleInner = `<style>.themeClass{ color: ${n};}</style>`
      },
    },
    filters: {
      capitalize: function (a) {
        //  let b=[];
        // console.log(a)
        // for(var i=0;i<a.length;i++){
        //    b.push(parseInt(a[i]));
        // }
        //  console.log(b)
        var res = a.filter(function (item, index, array) {
          return array.indexOf(item) === index;
        });
        return res;
      }
    },
      methods: {
        handleChange(value) {

          console.log(value);

        },

        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
          this.tableData.splice(this.tableData.indexOf(row), 1);
        },
        /*点击新增*/
        handleAdd: function () {
          let time = new Date().toLocaleString('cn', {
            hour12: false
          })
          console.log(time)
          this.tableData.push({
            date: time,
            name: Math.random().toString(36).substr(2),
            address: '上海市普陀区金沙江路 1516 弄'
          });

        },
        // ==================================================================
        filter() {
          //不改变原数组，返回的是过滤后的新数据
          this.list1 = this.list.filter(x => {

            return x > 4
          })
          console.log("this.list", this.list)
          console.log('filter', this.list1)
        },
        map() {
          //不改变数组，返回的是处理后的新数组
          this.list2 = this.list.map(x => {
            return x * 2
          })
          console.log("this.list", this.list)
          console.log('map', this.list2)
        },
        forEach() {
          //遍历新数组
          this.list.forEach(x => {
            console.log(x)
          })
        },
        // ====================================================================
        some() {
          this.list3 = this.list.some(x => {
            return x > 9
          })
          console.log('some', this.list3)
        },
        // ==================================================================
        splice() {
          //改变原数组，返回的是删除后的数据，
          let s = this.arr.splice(2, 1, 'a') //2 起始位置的index , 1 删除的是长度  a是添加的元素
          console.log('splice', this.arr) //返回的this.arr是删除后的数组
          console.log('s', s)
        },

        slice() {
          let arr1 = [1, 2, 3, 4, 5, 6, 7];
          let arr2 = arr1.slice(2, 4) //slice 不会改变原数组，返回的是删除的元素， 2表示开始删除位置的索引值， 4表示的是结束为止的索引值（不包括这个索引值）
          console.log('arr1', arr1)
          console.log('arr2', arr2)
        },
        // ========================================================================
      },
    }
</script>

<style scoped>

</style>
