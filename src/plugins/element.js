import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import {
    ElButton, ElForm, ElFormItem, ElInput, ElMessage, ElContainer, ElMain, ElHeader, ElAside, ElMenuItem, ElMenuItemGroup, ElSubmenu, ElMenu,
    ElCol, ElFooter, ElBreadcrumb, ElBreadcrumbItem, ElCard, ElRow, ElCollapse, ElTable,ElTableColumn,ElTooltip,ElPagination,ElSwitch,ElDropdown,
    ElDropdownItem,ElDropdownMenu,ElDialog,ElMessageBox
} from "element-plus";

export default (app) => {
    locale.use(lang)
    app.use(ElButton)
    app.use(ElForm)
    app.use(ElFormItem)
    app.use(ElInput)
    app.use(ElContainer)
    app.use(ElMain)
    app.use(ElHeader)
    app.use(ElAside)
    app.use(ElMenuItem)
    app.use(ElMenuItemGroup)
    app.use(ElSubmenu)
    app.use(ElMenu)
    app.use(ElCol)
    app.use(ElFooter)
    app.use(ElBreadcrumb)
    app.use(ElBreadcrumbItem)
    app.use(ElCard)
    app.use(ElRow)
    app.use(ElCollapse)
    app.use(ElTable)
    app.use(ElTableColumn)
    app.use(ElTooltip)
    app.use(ElPagination)
    app.use(ElSwitch)
    app.use(ElDropdown)
    app.use(ElDropdownMenu)
    app.use(ElDropdownItem)
    app.use(ElDialog)
    app.config.globalProperties.$message = ElMessage
    app.config.globalProperties.$confirm = ElMessageBox
}
