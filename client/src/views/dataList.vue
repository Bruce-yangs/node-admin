<template>
    <div class="dataList">
        <div class="data-container">
            <el-form label-width="80px" :inline="true" class="data-form">
                <el-form-item label="操作时间" class="data-form-item">
                    <el-date-picker
                            v-model="dataTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="data-form-item">
                    <el-button type="primary" @click="getListData">查询</el-button>
                    <el-button @click="clearParams">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="add-box">
                <el-button type="primary" @click="onClickAdd">新增</el-button>
            </div>
            <el-table
                    :data="dataList"
                    style="width: 100%;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;"
                    border
            >
                <el-table-column
                        type="index"
                        prop="date"
                        label="序号"
                        align="center"
                        width="50">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        width="160">
                    <template slot-scope="scope">
                        {{format(scope.row.date)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="收支类型"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="describe"
                        label="收支描述"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="收入"
                        align="center"
                        width="120">
                    <template slot-scope="scope">
                        <span style="color: #00d053;">+{{scope.row.income}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="支出"
                        width="120"
                >
                    <template slot-scope="scope">
                        <span style="color: #f56767;">-{{scope.row.expend}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="账户现金"
                        width="100">
                    <template slot-scope="scope">
                        <span style="color: #4db3ff;">{{scope.row.cash}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注"
                        width="170">
                </el-table-column>               <!--     fixed="right"-->

                <el-table-column
                        label="操作"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                icon="el-icon-edit"
                                @click.native.prevent="editRow(scope.row)"
                                size="mini">
                            编辑
                        </el-button>
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                @click.native.prevent="deleteRow(scope.row._id)"
                                size="mini">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="foot" v-if="this.total">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="title" width="500px"
                   :before-close="clearDialogParams"
                   :close-on-click-modal="false"
                   :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="请选择类型">
                        <el-option v-for="(item,i) in typeList " :label="item" :key="i" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收支描述" prop="describe" :label-width="formLabelWidth">
                    <el-input v-model="form.describe" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收入" prop="income" :label-width="formLabelWidth">
                    <el-input v-model="form.income" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支出" prop="expend" :label-width="formLabelWidth">
                    <el-input v-model="form.expend" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="现金" prop="cash" :label-width="formLabelWidth">
                    <el-input v-model="form.cash" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                    <el-input type="textarea"
                              :rows="2" v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearDialogParams">取 消</el-button>
                <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        'name': 'dataList',
        data() {
            return {
                dataList: [],
                tableData: [],
                dataTime: '',
                dialogFormVisible: false,
                formLabelWidth: '100px',
                form: {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                },
                submitType: 1,
                title: '新增信息',
                typeList: ['提现', '提现手续费', '充值', '优惠券', '充值礼券', '转账'],
                rules: {
                    describe: [
                        {required: true, message: '请输入收支描述', trigger: 'blur'},
                    ],
                    income: [
                        {required: true, message: '请输入收入内容', trigger: 'blur'}
                    ],
                    expend: [
                        {required: true, message: '请输入支出内容', trigger: 'blur'}
                    ],
                    cash: [
                        {required: true, message: '请输入现金', trigger: 'blur'}
                    ]
                },
                total: null,
                pageSize: 5,
                currentPage: 1

            }
        },
        created() {
            this.getListData();
        },
        methods: {
            //获取列表数据
            getListData() {
                this.$axios.get('/api/profiles', {
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        startDate:this.dataTime[0],
                        endDate:this.dataTime[1]
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        this.dataList = res.data.data;
                        this.total = res.data.total;
                        //尝试前端处理分页数据
                        // this.setPageData();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //提交数据
            postData(url, params) {
                this.$axios.post(url, params).then(res => {
                    if (res.data.code === 200) {
                        this.dialogFormVisible = false;
                        this.getListData();
                        this.$message.success('提交成功');
                        this.clearDialogParams();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //编辑操作
            editRow(row) {
                this.title = '编辑信息';
                this.submitType = 2;
                this.dialogFormVisible = true;
                this.form = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    id: row._id,
                    remark: row.remark
                }
            },
            //删除操作
            deleteRow(id) {
                this.$confirm('确认删除该数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete('/api/profiles/delete/' + id).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getListData();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })

                })
            },
            //新增
            onClickAdd() {
                this.title = '新增信息';
                this.submitType = 1;
                this.dialogFormVisible = true;
            },
            //时间补零
            add0(m) {
                return m < 10 ? '0' + m : m
            },
            //格式化时间戳
            format(times) {
                //time，否则要parseInt转换
                let time = new Date(times);
                let y = time.getFullYear();
                let m = time.getMonth() + 1;
                let d = time.getDate();
                let h = time.getHours();
                let mm = time.getMinutes();
                let s = time.getSeconds();
                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' '
                    + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
            },
            clearParams() {
                this.currentPage = 1;
                this.pageSize = 5;
                this.dataTime = [];
                this.getListData();
            },
            clearDialogParams() {
                this.form = {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                };
                this.dialogFormVisible = false;
                this.$refs['form'].resetFields();
            },
            //提交弹框修改
            onSubmit(form) {
                this.$refs[form].validate((valid) => {
                        if (valid) {
                            let url = {1: '/api/profiles/add', 2: `/api/profiles/edit/${this.form.id}`};
                            console.log(url)
                            this.postData(url[this.submitType], this.form);
                        }
                    }
                )
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getListData();

              /*  this.tableData = this.dataList.filter((item, index) => {
                    return index < val;
                })*/
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getListData();

                //获取当前页
              /*  let index = this.pageSize * (val - 1);
                //数据的总和
                let nums = this.pageSize * val;
                let tables = [];
                for (let i = index; i < nums; i++) {
                    if(this.dataList[i]) {
                        tables.push(this.dataList[i]);
                    }
                }
                this.tableData = tables;*/
            },
            //处理分页数据----------如果前端来处理分页的话 这种情况
            setPageData() {
                //分页属性设置
                // this.dataList
                //当前第一页 每页5条数据
                this.pageSize = 5;
                this.currentPage = 1;
                //总数
                this.total = this.dataList.length;
                //过滤数据
                this.tableData = this.dataList.filter((item, index) => {
                    return index < this.pageSize;
                })
            }
        }

    }
</script>
<style scoped lang="stylus">
    .dataList
        width 100%
        height 100%
        background-color #ccc

    .data-container
        padding 20px
        background-color #ccc
        .add-box
            margin-bottom 10px
            padding 10px
            border-radius 8px
            background-color #fff
        .data-form
            padding 20px
            background #fff
            border-radius 8px
            margin-bottom 10px
            .data-form-item
                margin-top 13px
        .foot
            padding 15px
            background-color #fff
            border-bottom-left-radius 8px
            border-bottom-right-radius 8px
            text-align right
</style>
<style>
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px #f1f4f9;
        border-radius: 10px;
        background-color: #f1f4f9;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px #c2c2c2;
        background-color: #c2c2c2;
    }

    .el-dialog__body .el-form-item {
        width: 317px;
    }

</style>