<template>
    <div id="whole_page">
        <a-layout>
            <a-layout-header>
                <div>
                    排行榜
                </div>
            </a-layout-header>
            <a-layout-content style="text-align:center">
                    <div @click="toAuthor" class="gutter-box" id="dcb1">
                                <div @mouseover="mhover(1,1)" @mouseleave="mleaver(1,1)"  class="in-box box-author" style="font-size: 30px;">
                                    人才热度排行榜
                                </div>
                            </div>
                            <div @click="toPaper" class="gutter-box" id="dcb4">
                                <div @mouseover="mhover(2,1)" @mouseleave="mleaver(2,1)" class="in-box box-paper" style="font-size: 30px;">
                                    论文热度排行榜
                                </div>
                            </div>
                <div style="margin:0 auto;text-align:center">
                <div class="box-paper"></div></div>
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
  text-align:center;
}
.gutter-box {
    margin: 48px 0;
    height: 180px;
    width: 1231px;
    display:inline-block;
    cursor: pointer;
}

.in-box {
    height: 180px;
    width: 1231px;
    opacity: 100%;
    padding-left: 5%;
    line-height: 100px;
    font-family: Roboto-Bold,Roboto;
    font-weight: 700;
    transition: all .2s;
    text-align: left;
}
.box-paper {
    background: url("../../assets/dark-background-papers.png");
    display:inline-block;
}
.box-author {
    background: url("../../assets/dark-background-experts.png");
    display:inline-block;
}

</style>