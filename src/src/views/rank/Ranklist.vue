<template>
    <div id="whole_page">
        <a-layout>
            <a-layout-header>
                <div>
                    排行榜
                </div>
            </a-layout-header>
            <a-layout-content>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div class="gutter-box">
                            col-12
                        </div>
                    </a-col>
                </a-row>
            </a-layout-content>
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
  background: rgb(3, 3, 3);
  color: #fff;
  font-size: 20px;
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
.gutter-box {
    background: rgb(47 50 65 / 88%);
    margin: 10%;
    padding: 5%;
    height: 200px;
    font-size: 25px;
    text-align: left;
}
.ant-col {
    background: #fff;
}
.ant-row {
    padding: 8px !important;
    margin: auto;
}

</style>