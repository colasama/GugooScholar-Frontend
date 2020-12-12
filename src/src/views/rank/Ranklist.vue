<template>
    <div id="whole_page">
        <a-layout>
            <a-layout-header>
                <div>
                    排行榜
                </div>
            </a-layout-header>
            <a-layout-content>
                <div class="place-mid">
                    <a-row type="flex" justify="space-around" align="middle">
                        <a-col :span="8">
                            <div class="gutter-box" id="dcb1">
                                <div @mouseover="mhover(1,1)" @mouseleave="mleaver(1,1)"  class="in-box" style="font-size: 30px;">
                                    计算机科学与技术
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="gutter-box" id="dcb2">
                                <div @mouseover="mhover(1,2)" @mouseleave="mleaver(1,2)" class="in-box" style="font-size: 30px;">
                                    col-12
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="gutter-box" id="dcb3">
                                <div @mouseover="mhover(1,3)" @mouseleave="mleaver(1,3)" class="in-box" style="font-size: 30px;">
                                    col-12
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="space-around" align="middle">
                        <a-col :span="8">
                            <div class="gutter-box"  id="dcb4">
                                <div @mouseover="mhover(2,1)" @mouseleave="mleaver(2,1)" class="in-box" style="font-size: 30px;">
                                    col-12
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="gutter-box"  id="dcb5">
                                <div @mouseover="mhover(2,2)" @mouseleave="mleaver(2,2)" class="in-box" style="font-size: 30px;">
                                    col-12
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="gutter-box"  id="dcb6">
                                <div @mouseover="mhover(2,3)" @mouseleave="mleaver(2,3)" class="in-box" style="font-size: 30px;">
                                    col-12
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="space-around" align="middle">
                        <a-col :span="8">
                            <div class="gutter-box"  id="dcb7">
                                <div @mouseover="mhover(3,1)" @mouseleave="mleaver(3,1)" class="in-box" style="font-size: 30px;">
                                    col-12
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="gutter-box" id="dcb8">
                                <div @mouseover="mhover(3,2)" @mouseleave="mleaver(3,2)" class="in-box" style="font-size: 30px;">
                                    col-12
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="gutter-box" id="dcb9">
                                <div @mouseover="mhover(3,3)" @mouseleave="mleaver(3,3)" class="in-box" style="font-size: 30px;">
                                    col-12
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
export default {
    data() {
      return {
          hover:false
      }
    },
    methods: {
        mhover(row,col) {
            console.log(row,col);
            var num = (row-1)*3 + col;
            var targetd = document.getElementById("dcb"+num).getElementsByTagName("div")[0];
            targetd.style.fontSize = "40px";
        },
        mleaver(row,col) {
            console.log(row,col);
            var num = (row-1)*3 + col;
            var targetd = document.getElementById("dcb"+num).getElementsByTagName("div")[0];
            targetd.style.fontSize = "30px";
        }
    }

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
    margin: 10%;
    height: 200px;
    display: flex;
}
#dcb1 {
    background:lavenderblush;
}
#dcb2 {
    background:rgb(17, 209, 10);
}
#dcb3 {
    background:rgb(233, 50, 5);
}
#dcb4 {
    background:rgb(37, 2, 83);
}
#dcb5 {
    background:rgb(16, 59, 138);
}
#dcb6 {
    background:rgb(199, 228, 35);
}
#dcb7 {
    background:rgb(128, 6, 6);
}
#dcb8 {
    background:rgb(150, 133, 212);
}
#dcb9 {
    background:rgb(165, 47, 155);
}
.in-box {
    height: 100%;
    width: 100%;
    opacity: 80%;
    line-height: 150px;
    font-family: Roboto-Bold,Roboto;
    font-weight: 700;
    transition: all .2s;
    vertical-align: middle;
    text-align: center;
    background-image: url("../../assets/channel_bg.png");
}
.ant-col {
    background: #fff;
}
.ant-row {
    padding: 8px !important;
    margin: auto;
}
.place-mid {
    width: 80%;
    margin-right: 10%;
    margin-left: 10%;
}

</style>