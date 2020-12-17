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
                        <a-col :span="24">
                            <div @click="toAuthor" class="gutter-box" id="dcb1">
                                <div @mouseover="mhover(1,1)" @mouseleave="mleaver(1,1)"  class="in-box box-author" style="font-size: 30px;">
                                    人才热度排行榜
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="space-around" align="middle">
                        <a-col :span="24">
                            <div @click="toPaper" class="gutter-box"  id="dcb4">
                                <div @mouseover="mhover(2,1)" @mouseleave="mleaver(2,1)" class="in-box box-paper" style="font-size: 30px;">
                                    论文热度排行榜
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
        },
        toAuthor() {
            this.$router.push({
                path:'/rank',
                query:{
                    rankType:1
                }
            })
        },
        toPaper() {
            this.$router.push({
                path:'/rank',
                query:{
                    rankType:2
                }
            })
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
    margin: 3%;
    height: 180px;
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
.in-box {
    height: 100%;
    width: 100%;
    opacity: 80%;
    padding-left: 5%;
    line-height: 100px;
    font-family: Roboto-Bold,Roboto;
    font-weight: 700;
    transition: all .2s;
    vertical-align: middle;
    text-align: left;
}
.box-paper {
    background-image: url("../../assets/dark-background-papers.png");
}
.box-author {
    background-image: url("../../assets/dark-background-experts.png");
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