<template>
  <el-container class="home_container">
<!--    头部-->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" class="home_img">
        <span>后台管理系统</span>
      </div>
<!--      -->
      <el-dropdown>
      <span class="el-dropdown-link">
        <div class="avatar_box">
        <img src="../assets/images/cat.jpg" alt="">
      </div>
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </el-header>
    <el-container>
<!--左侧菜单栏-->
      <el-aside :width="collapsed ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i class="el-icon-s-fold"></i>
        </div>
        <el-menu :uniqueOpened="true" background-color="#373D41" text-color="#fff"
              active-text-color="#409EFF" :collapse="collapsed" :collapse-transition="false" router :default-active="activePath">
            <el-submenu :index="userMenu.id + ''" v-for="userMenu in userMenus" :key="userMenu.id">
              <template #title>
                <i :class="userMenu.icon"></i>
                <span>{{userMenu.menuName}}</span>
              </template>
              <!--二级菜单          -->
              <el-submenu :index="menu.id + ''" v-for="menu in userMenu.menus" :key="menu.id" >
                <template #title>
                  <i class="el-icon-menu"></i>
                  <span>{{menu.menuName}}</span>
                </template>
                <!--三级菜单            -->
                <el-menu-item :index="'/' + subMenu.path" v-for="subMenu in menu.menus" :key="subMenu.id" >
                  <template #title>
                    <i class="el-icon-location"></i>
                    <span>{{subMenu.menuName}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
      </el-aside>
      <el-container>
        <!--      主体区域-->
        <el-main>
          <router-view>

          </router-view>
        </el-main>
        <el-footer><span>Copyright 2021-2021 三昷</span></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      userMenus:[],
      collapsed : false,
      activePath : ''
    }
  },
  created() {
    this.getMenuList();
    this.activePath = this.$route.path;
  },
  methods:{
    logout(){
      const res = this.$http.get("logout");
      this.$router.push("/login");
    },
    async getMenuList(){
      const res = await this.$http.get("/menu/loadCurrentUserMenus")
      this.userMenus = res.data;
    },
    toggleCollapse(){
      this.collapsed = !this.collapsed;
    }
  }
}
</script>

<style lang="less" scoped>
.home_container{
  height: 100%;
}
.el-header{
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: white;
  font-size: 20px;
  > div{
    display: flex;
    align-items: center;
  }
}
.el-aside{
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #EAEDF1;
}
.home_img{
  height: 60px;
}
.toggle-button {
  background-color: #4A5064;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
}
.avatar_box {
  height: 30px;
  width: 30px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.el-footer {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
}
</style>