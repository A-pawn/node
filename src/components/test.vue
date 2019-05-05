<template>
  <div>
    <template>
      <el-table :data="tableData"
        style="width: 100%">
        <el-table-column label="id"
          prop="id">
        </el-table-column>
        <el-table-column label="Name"
          prop="name">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header"
            slot-scope="scope">
            <el-input v-model="searchName"
              size="mini"
              @keyup.enter.native="search()"
              placeholder="输入关键字搜索" />
              <!-- @keyup.enter.native="search()" -->
          </template>
          <template slot-scope="scope">
             <el-button size="mini"
              @click="dialogVisible2=true;handleView(scope.$index, scope.row)">view</el-button>
            <el-button size="mini"
              @click="dialogVisible=true;handleChange(scope.$index, scope.row)">Edit</el-button>
            <el-button size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            <el-button size="mini"
              type="danger"
              @click="handleAddChange(scope.$index, scope.row);dialogVisible1=true">add</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="修改内容"
      :visible.sync="dialogVisible"
       width="30%"
      >
      <el-input v-model="name" placeholder="请输入内容"></el-input>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="dialogVisible = false;handleEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加内容"
      :visible.sync="dialogVisible1"
       width="30%"
      >
      <el-input v-model="name1" placeholder="请输入内容"></el-input>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary"
          @click="dialogVisible1 = false;handleAdd()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看详情"
      :visible.sync="dialogVisible2"
       width="30%"
      >
      <el-table
      :data="detailData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
    </el-table>
    </el-dialog>
  </div>
</template>



<script>
  export default {
    name: 'test',
    data() {
      return {
        id:'',
        name: '',
        name1: '',
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        tableData: [],
        detailData:[],
        searchName: '',
        // list:[{"id":1,"name":"zhangsan"},{"id":2,"name":"lisi"},{"id":3,"name":"wangwu"},{"id":"4","name":"白眉鹰王"}]

      }
    },
    created() {
      this.getData()
    },
    watch: {

    },

    methods: {
      //获取列表数据
      getData() {
        var _this = this
        this.$axios({
            method: 'get',
            dataType: 'json',
            url: 'http://127.0.0.1:8888/query'
          })
          .then(function (response) {
            console.log('response', response)
            var data = response.data
            console.log('data', data)
            var info = data.data
            console.log('info', info)
            _this.tableData = info
            console.log('_this.tableData', _this.tableData)
          })
          .catch(function (error) {
            console.log(error)
          })
      },

      handleChange(index, row) {
       this.id=row.id
       this.name=row.name

      },

      //点击修改
      handleEdit() {
         var _this = this
        var data = {
          "id": this.id,
           "name":this.name
        }
        this.$axios({
            method: 'post',
            dataType: 'json',
            data: this.qs.stringify(data),
            url: 'http://127.0.0.1:8888/change'
          })
          .then(function (response) {
            var data = response.data
            console.log('change-data', data)
            var info = data.data
            console.log('change-info', info)
            _this.getData()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      //点击删除
      handleDelete(index, row) {
        var _this = this
        var data = {
          "id": row.id,
        }

        this.$axios({
            method: 'post',
            dataType: 'json',
            data: this.qs.stringify(data),
            url: 'http://127.0.0.1:8888/deleted'
          })
          .then(function (response) {
            var data = response.data
            console.log('handleDelete-data', data)
            var info = data.data
            console.log('handleDelete-info', info)
            _this.getData()
          })
          .catch(function (error) {
            console.log(error)
          })
        _this.tableData.splice(_this.tableData.indexOf(row), 1);
      },

       handleAddChange(index, row) {
       this.name1=row.name1

      },

      /*点击新增*/
      handleAdd() {
        var _this = this
        var data = {
          "id": Math.random() * 10 + Date.now(),
          "name": this.name1
        }
        this.$axios({
            method: 'post',
            dataType: 'json',
            data: this.qs.stringify(data),
            url: 'http://127.0.0.1:8888/add'
          })
          .then(function (response) {
            var data = response.data
            console.log('handleAdd-data', data)
            var info = data.data
            console.log('handleAdd-info', info)
            _this.getData()
          })
          .catch(function (error) {
            console.log(error)
          })

      },

      handleView(index, row){
         var _this = this
        var data = {
          "id": row.id,
        }
        this.$axios({
            method: 'post',
            dataType: 'json',
            data: this.qs.stringify(data),
            url: 'http://127.0.0.1:8888/detail'
          })
          .then(function (response) {
            var data = response.data
            console.log('handleView-data', data)
            var info = data.data
             _this.detailData = info

          })
          .catch(function (error) {
            console.log(error)
          })

      },
       search(){
         var _this = this
        var data = {
          "name": this.searchName,
        }
        this.$axios({
            method: 'post',
            dataType: 'json',
            data: this.qs.stringify(data),
            url: 'http://127.0.0.1:8888/queryName'
          })
          .then(function (response) {
            var data = response.data
            console.log('searchName-data', response)
            var info = data.data
            console.log('searchName-info', info)
             _this.tableData =info

          })
          .catch(function (error) {
            console.log(error)
          })

      },
    },
  }
</script>

<style scoped>

</style>
