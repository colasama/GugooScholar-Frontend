<template>
    <div id="whole_page">
        <a-layout>
            <a-layout-header>Header</a-layout-header>
            <a-layout-content>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col class="gutter-row" :span="5">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="5">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col class="gutter-row" :span="5">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="5">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col class="gutter-row" :span="5">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="5">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                </a-row>
            </a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </div>
</template>

<script>
export default {
    

}
</script>

<style scoped>
#whole_page {
  margin-top: 0px !important;
}
.ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
.ant-layout-header {
  background: #7dbcea;
  color: #fff;
}
.ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}

</style>