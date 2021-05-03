<template>
  <div>
    <!--面包屑导航      -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <!--      搜索框区域-->
    <el-card class="box-card" >
    <el-row :gutter="20" ref="searchBox">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryInfo.username" clearable @clear="fetchUsers">
          <template #append>
            <el-button icon="el-icon-search" @click="fetchUsers"></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="info" plain @click="addDialogVisible = true"><i class="el-icon-plus"></i>添加</el-button>
      </el-col>
    </el-row>
    </el-card>
      <!--      列表区域-->
      <defaultTable :tableData="users" :tableColumns="columns" :total="total" @pageChange="pageChange">
        <template v-slot:col-enabled="scope">
          <el-switch v-model="scope.data.enabled" :active-value="1" :inactive-value="0" inactive-color="red"
                     @change="changeUserState(scope.data)"></el-switch>
        </template>
        <template v-slot:col-locked="scope">
          <el-switch v-model="scope.data.locked" :active-value="1" :inactive-value="0" inactive-color="red"
                     @change="changeUserState(scope.data)"></el-switch>
        </template>
        <template v-slot:col-operation="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showEditDialog(scope.data.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteDialog(scope.data.id)"></el-button>
          <el-tooltip class="item" effect="dark" content="提示：分配角色" placement="top">
            <el-button type="primary" icon="el-icon-setting" size="mini" circle></el-button>
          </el-tooltip>
        </template>
      </defaultTable>

    <!--    添加用户对话框-->
    <el-dialog title="添加用户" v-model="addDialogVisible" width="50%" @close="closeAddDialogClosed">
      <span>
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="addDialogVisible = false">关 闭</el-button>
      <el-button type="primary" @click="insertUser">保 存</el-button>
    </span>
      </template>
    </el-dialog>
    <!--    修改用户对话框-->
    <el-dialog title="修改用户" v-model="editDialogVisible" width="50%" @close="closeEditDialogVisible">
      <span>
        <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="editDialogVisible = false">关 闭</el-button>
      <el-button type="primary" @click="editUser">保 存</el-button>
    </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import defaultTable from '../common/Table'
export default {
  components: {defaultTable},
  data(){
    var checkEmail = (rule,value,callbak) =>{
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callbak();
      }else{
        callbak(new Error("请输入合法邮箱！"))
      }
    }
    var checkMobile = (rule,value,callbak) =>{
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return callbak();
      }else{
        callbak(new Error("请输入合法手机号码！"))
      }
    }
    return {
      queryInfo: {
        pageable: 1
      },
      users: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible:false,
      addForm:{
        username:'',
        name:'',
        mobile:'',
        email:''
      },
      editForm:{},
      addFormRules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        name:[{required:true,message:'请输入姓名',trigger:'blur'}],
        mobile:[{required:true,message:'请输入手机号码',trigger:'blur'},{validator:checkMobile,trigger: 'blur'}],
        email:[{required:true,message:'请输入电子邮箱',trigger:'blur'},{validator:checkEmail,trigger: 'blur'}],
      },
      columns:[
        {name:'用户名',value:'username'},
        {name:'姓名',value:'name'},
        {name:'手机',value:'mobile'},
        {name:'邮箱',value:'email'},
        {name:'角色',value:'role.roleName'},
        {name:'启用状态',value:'enabled',hasTemplate:true},
        {name:'锁定状态',value:'locked',hasTemplate:true},
      ],
    }
  },
  created() {
  },
  methods:{
    async fetchUsers() {
      const res = await this.$http.post('user/query', this.queryInfo)
      this.users = res.data
      this.total = res.count
    },
    pageChange(pageInfo) {
      this.queryInfo.pageSize = pageInfo.pageSize
      this.queryInfo.pageNum = pageInfo.pageNum
      this.fetchUsers()
    },
    async changeUserState(row) {
      const res = await this.$http.put('user', row)
      if (res.code == 200) {
        this.$message.success("修改成功！")
      } else {
        this.$message.error("修改失败！")
      }
    },
    insertUser(){
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return
        }else{
          const result = await this.$http.post('user',this.addUser);
          if (result.code == 200) {
            this.$message.success("添加用户成功！")
            this.addDialogVisible = false
            this.fetchUsers()
          }else{
            this.$message.error("添加用户失败！")
          }
        }
      })
    },
    async showEditDialog(id){
      const result = await this.$http.get('user/'+id,this.editForm);
      this.editForm = result.data
      this.editDialogVisible = true;
    },
    editUser(){
      console.log(this.$refs.editFormRef)
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return
        }else{
          const result = await this.$http.put('user',this.editForm);
          if (result.code == 200) {
            this.$message.success("修改用户成功！")
            this.editDialogVisible = false
            this.fetchUsers()
          }else{
            this.$message.error("修改用户失败！")
          }
        }
      })
    },
    deleteDialog(id){
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
        this.$http.delete('user/'+id).then((res)=>{
          if(res.code == 200){
            this.$message({type: 'success', message: '删除成功!'});
            this.fetchUsers()
          }else{
            this.$message({type: 'error', message: '删除失败!'});
          }
        })
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'});
      });
    },
    closeAddDialogClosed(){
      this.$refs.addFormRef.resetFields();
    },
    closeEditDialogVisible(){
      this.$refs.editFormRef.resetFields();
    },
  }
}
</script>
<style lang="less" scoped>
.search-card{
  margin-bottom: 5px;
}
</style>