<template>

  <a-layout>
    <a-layout-header class="headtext">
      <div class="search">
        <a-input-group compact>
          <a-select v-model="searchType" style="width: 120px;" size="large" @change="handleChange">
            <a-select-option value="主题">
              主题
            </a-select-option>
            <a-select-option value="摘要">
              摘要
            </a-select-option>
            <a-select-option value="关键词">
              关键词
            </a-select-option>
            <a-select-option value="篇名">
              篇名
            </a-select-option>
            <a-select-option value="全文">
              全文
            </a-select-option>
            <a-select-option value="作者">
              作者
            </a-select-option>
            <a-select-option value="分类号">
              分类号
            </a-select-option>
            <a-select-option value="学术领域">
              学术领域
            </a-select-option>
          </a-select>
          <a-input style="width: 30%;" placeholder="搜索你想要的" size="large" v-model="searchContent" />
          <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large" @click="onSearch">搜索
          </a-button>
        </a-input-group>
      </div>
    </a-layout-header>
    <a-layout-content class="homemain">
      <div class="classify" style="margin-top:10px">
        <a-menu mode="horizontal">
          <a-menu-item style="width:180px;">
            <a-icon type="book" />论文 </a-menu-item>
          <a-menu-item style="width:180px">
            <a-icon type="reconciliation" />专利 </a-menu-item>
          <a-menu-item style="width:180px">
            <a-icon type="user" />科研人员</a-menu-item>
        </a-menu>

      </div>
      <div class="content">
        <div v-for="(article,index) in localData" :key="index">
          <a-card class="result" :hoverable="true">
            <div style="text-align:left">
              <p style="font-weight:700;">
                <a-icon type="book" />&#12288;{{article.Title}}
                <template>
                  <div style="float:right">{{article.Time}}{{'  citations'}}</div>
                </template>
              </p>
              <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">{{article.Source}}</p>
              <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                <template v-for="(author,index2) in article.Authors">{{author}}
                  <template v-if="index2 < article.Authors.length-1">{{'，'}}</template>
                </template>
              </p>
              <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                <template v-for="(field,index3) in article.Fields">
                  <a-button style="height:25px;width:auto;padding-left:5px;padding-right:5px" :key="index3">
                    <a-icon style="padding-left:5px" type="experiment" />{{field}}
                  </a-button>
                  <template v-if="index3 < article.Fields.length-1">{{'，'}}</template>
                </template>
              </p>
              <p
                style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
                <template>
                  {{article.Abstract}}
                </template>
              </p>
            </div>
          </a-card>
        </div>
      </div>
    </a-layout-content>
  </a-layout>

</template>
<script>
  // @ is an alias to /src
  export default {
    name: "search",
    components: {

    },
    data() {
      return {
        memberName: "",
        keywords: [
          "关键词1",
          "关键词2",
          "关键词3",
          "关键词4",
          "关键词5",
          "关键词6",
          "关键词7",
          "关键词8",
          "关键词9",
          "关键词10",
          "关键词11",
          "关键词12",
        ],
        comma: ", ",
        localData: [{
            Title: 'Automobile pollution control using catalysis',
            Authors: ['Dey S.', 'Mehta N.S.'],
            Source: 'Environmental Engineering Department, RGPV Bhopal, India;Department of Electronics and Communication, Roorkee College of Engineering, India',
            Time: 7777,
            Fields: ['Engine and fuel modification', 'Catalytic converter'],
            Abstract: 'The emissions of pollutants from vehicles are generally low but the numbers of vehicles increasing on the road therefore the environmental pollutions are also increases. About 35% of CO, 30% of HC and 25% percent of NOx produced into the atmosphere is from the transportation sector. These pollutants have adverse effec'+
            'ts on the environment and human health. The emissions from vehicles are' +
              'generally depends upon the air–fuel ratio. The control techniques for exhaust gas emissions are engine modifications, fuel pretreatment, fuel additives, exhaust gas recirculation (EGR), positive crankcase ventilation (PCV) and an application of catalytic converters. A catalytic converter is a device that'+' converts more toxic exhaust gas pollutants into less toxic pollutants. There are different types of catalysts used in'}
              ,
          {
            Title: '基于深度学习的人脸识别',
            Authors: ['任志玲', '薛新根'],
            Source: '辽宁工程技术大学电气与控制工程学院',
            Time: 546,
            Fields: ['机器学习', '人工智能'],
            Abstract: '人脸识别是图像领域的经典问题，为解决目前人脸识别中普遍存在的识别精度不高、' +
              '特征点估计较为粗糙等问题，采用一种基于R-CNN（ResNet-Convolutional Neural Network）算法的人脸识别方法。' +
              '该方法用人脸特征探测器有效的提取了人脸特征，同时将R-CNN卷积神经网络用于2D人脸识别，' +
              '采集了400张目标脸，和人脸库中的1000张样本脸混合，模型共训练130轮,其网络识别的准确率达到了90%以上，结合了深度学习方法，具有较高的识别率。人脸识别是图像领域的经典问题，为解决目前人脸识别中普遍存在的识别精度不高、' +
              '特征点估计较为粗糙等问题，采用一种基于R-CNN（ResNet-Convolutional Neural Network）算法的人脸识别方法。' +
              '该方法用人脸特征探测器有效的提取了人脸特征，同时将R-CNN卷积神经网络用于2D人脸识别，' +
              '采集了400张目标脸，和人脸库中的1000张样本脸混合，模型共训练130轮,其网络识别的准确率达到了90%以上，结合了'
          },
          {
            Title: '爱情心理学',
            Authors: ['韦志中', '薄艳艳'],
            Source: '北京:台海出版社',
            Time: 1,
            Fields: ['恋爱心理学-通俗读物'],
            Abstract: '本书精选了关于婚姻爱情的20个非常重要的主题, 包括找一个什么样的人结婚、婆媳关系、家庭文化的冲突与融合、角' +
              '色匹配、爱情仪式、离婚、再婚、破解家庭暴力、婚姻危机干预、亲子关系、女性的自我成长、家庭未来建设等等, 并针对每' +
              '个主题都提供了与之相应的心理成长技术。通过这20个主题的学习和成长, 人们将会揭开美满爱情的神秘面纱, 通过爱情和婚姻, 遇见一个更好的自己。'
          },
        ],
        searchType: "主题",
        searchContent: "",
      };
    },
    watch: {

    },
    updated() {},
    mounted() {
      if (this.$route.query.searchType)
        this.searchType = this.$route.query.searchType;
      if (this.$route.query.searchContent)
        this.searchContent = this.$route.query.searchContent;
    },
    methods: {
      handleChange(value) {
        this.searchType = value;
      },
      onSearch() {
        this.$router.push("/404");
      },
    },
  };
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .headtext {
    width: 100%;
    height: 120px;
    line-height: 80px;
    color: #9feaf9;
    background-color: black;
  }

  .homemain {
    width: 100%;
    text-align: center;
    background-color: white;
  }

  .homemain .content {
    margin-top: 20px
  }

  .homemain .content .result {
    width: 700px;
    margin: 0px auto;
    margin-bottom: 10px
  }

  /*.homemain .img {
    width: 250px;
    height: 250px;
    margin: 40px auto 40px;
    background: url(../assets/logo_s.png) no-repeat;
  }*/

  .headtext .search {
    width: 100%;
    height: 50px;
    margin: 0 auto;
    margin-top: 35px;
  }

  .keywords {
    color: #9feaf9;
  }

  .keywords .keyword {
    margin: 0 3px;
  }
</style>