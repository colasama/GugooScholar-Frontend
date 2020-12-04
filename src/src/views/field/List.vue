<template>
    <div id="whole_page">
        <a-layout>
            <a-layout-header class="ant-layout-header">
                <div>
                    学科领域
                </div>
            </a-layout-header>

            <a-layout-content class="ant-layout-content">
                <a-row display="flex" justify="center" align="middle" gutter="40">
                    <a-col :span="6" offset="3" class="ant-col">
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                    <a-col :span="6" class="ant-col" >
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                    <a-col :span="6" class="ant-col">
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                </a-row>
                <a-row display="flex" justify="center" align="middle" gutter="40">
                    <a-col :span="6" offset="3" class="ant-col">
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                    <a-col :span="6" class="ant-col" >
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                    <a-col :span="6" class="ant-col">
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                </a-row>
                <a-row :display="flex" justify="center" align="middle" gutter="40">
                    <a-col :span="6" offset="3" class="ant-col">
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                    <a-col :span="6" class="ant-col" >
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                    <a-col :span="6" class="ant-col">
                        <a-card class="hippoGrid-left">
                            学科A
                        </a-card>
                    </a-col>
                </a-row>
            </a-layout-content>

            <a-layout-footer class="ant-layout-footer">
                <a-pagination :total="36" :item-render="itemRender" />
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script>
    export default {
        methods:{
          Field(){
              this.$router.push("/Field");
          },
            itemRender(current, type, originalElement) {
                if (type === 'prev') {
                    return <a>Previous</a>;
                } else if (type === 'next') {
                    return <a>Next</a>;
                }
                return originalElement;
            },
        },
    }
</script>

<style scoped>
    #whole_page {
        margin-top: 0px ;
    }
    .ant-layout-footer {
        background: #ffffff;
        color: #fff;

    }
    .ant-layout-header {
        background: rgb(3, 3, 3);
        color: #fff;
        font-size: 25px;
        flex-wrap: nowrap;
        justify-content: flex-start;
        text-align: left;
    }
    .ant-layout-content {
        background: #fff;
        color: #fff;
        min-height: 120px;
        line-height: 120px;
    }
    .hippoGrid-left {
        background: rgb(47 50 65);
        padding: 10%;
        margin-top: 10px;
        height: 150px;
        font-size: 30px;
        color: #ffffff;
        text-align: left;
    }
    .hippoGrid-middle {
        background: rgb(47 50 65);
        padding: 10%;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 150px;
        font-size: 30px;
        text-align: left;
    }
    .hippoGrid-right {
        background: rgb(47 50 65);
        padding: 10%;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 150px;
        font-size: 30px;
        text-align: left;
    }
    .ant-col {
        background: #ffffff;
        margin-top: 20px;
    }
    .ant-row {
        padding: 8px !important;
        margin: auto;
    }

</style>