<template>
    <div class="w">
        <a-layout id="components-layout-demo-basic">
            <a-layout-content>
                <div class="topic">{{title}}</div>
                <div class="author">
                    <author_avatar link="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                   name="耗子尾汁"></author_avatar>
                    <author_avatar link="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                   name="嘤国大力士"></author_avatar>
                    <author_avatar link="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                   name="八十多公斤"></author_avatar>
                    <author_avatar link="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                   name="九十多公斤"></author_avatar>
                    <author_avatar link="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                   name="赖佐田"></author_avatar>
                    <author_avatar link="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                   name="马老师"></author_avatar>
                    <author_avatar link="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                   name="婷婷"></author_avatar>
                </div>
            </a-layout-content>
        </a-layout>
        <div style="margin: 50px 0">
            <div class="details">
                <span class="rowtit">摘要：</span>
                <span class="abstract-text">{{abstract}}</span>
            </div>
            <div class="details">
                <span class="rowtit">关键词：</span>
                <span class="abstract-text">{{keywords}}</span>
            </div>
            <div class="details">
                <span class="rowtit">DOI：</span>
                <span class="abstract-text">{{DOI}}</span>
            </div>
            <div class="details">
                <span class="rowtit">被引量：</span>
                <span class="abstract-text">{{cites}}</span>
            </div>
            <div class="details">
                <span class="rowtit">原文链接：</span>
                <a :href="this.paper_url" class="paper_url">{{paper_url}}</a>
            </div>
            <div class="details">
                <span class="rowtit">相关链接：</span>
                <a :href="this.paper_url" class="paper_url">{{paper_url}}</a>
            </div>
            <div class="details">
                <span class="rowtit">所属期刊：</span>
                <span class="abstract-text">{{journal}}</span>
            </div>
            <div class="details">
                <span class="rowtit">出版年份：</span>
                <span class="abstract-text">{{year}}</span>
            </div>
            <div class="details">
                <span class="rowtit">所属卷数：</span>
                <span class="abstract-text">{{volume}}</span>
            </div>
            <div class="details">
                <span class="rowtit">所属期数：</span>
                <span class="abstract-text">{{issue}}</span>
            </div>
            <div class="details">
                <span class="rowtit">页码：</span>
                <span class="abstract-text">{{page_num}}</span>
            </div>
            <div class="details">
                <span class="rowtit">ISSN：</span>
                <span class="abstract-text">{{issn}}</span>
            </div>
            <div class="details">
                <span class="rowtit">ISBN：</span>
                <span class="abstract-text">{{isbn}}</span>
            </div>
            <div class="details">
                <span class="rowtit">语言：</span>
                <span class="abstract-text">{{language}}</span>
            </div>
        </div>
    </div>

</template>

<script>
    import author_avatar from "../../components/author_avatar";

    export default {
        name: 'paper',
        components: {
            author_avatar
        },
        data() {
            return {
                title: "马保国现象：一个传统武术江湖人士的人设特征解读",
                abstract: "文章运用社会学理论对马保国现象进行分析。" +
                    "马保国是自媒体时代的新型江湖艺人,他将自我塑造成沉浮于市井的文、武兼备之人,并对自身武" +
                    "学品格做出深度描述,打造出全知全能的武师形象。除了对自己的尚武业绩做出虚饰性宣" +
                    "传,还试图占据道德制高点,对古典完人形象进行再度扮演。他塑造的海归武师角色,更像是走向社会表演的非尚武类武者," +
                    "他并未真正走进中国传统武术,也并非武术高手,却竭力在各种场合扮演武林高人的角色," +
                    "最终在实战中败下阵来。\"马保国事件\"可能促进中国传统武术的内部革新,成为重新审视中国传统武术的契机。",
                keywords: "马保国现象;江湖艺人;社会角色;传统武术;现代体育;",
                DOI: "10.15877/j.cnki.nsic.20201009.004",
                cites: "233",
                paper_url: "https://kns.cnki.net/KXReader/Detail?PlatForm=kdoc&TIMESTAMP=637421042801093750&DBCODE=CJFD&TABLEName=CJFDAUTO&FileName=LJTB202005012&RESULT=1&SIGN=KImDfrMgmsANqw9qdedfVFPO2FM%3d",
                related_url: "",
                journal: "体育学研究",
                year: "2020",
                volume: "",
                issue: "05",
                page_num: "第" + "87" + "-" + "94" + "页",
                issn: " ",
                isbn: " ",
                language: "中文",
            }
        }
    }
</script>

<style>
    .w {
        background-color: #fef2da;
    }

    #components-layout-demo-basic .ant-layout-content {
        background: rgb(43, 46, 59);
        color: #fff;
        height: fit-content;
        font-size: 20px;
    }

    #components-layout-demo-basic .topic {
        display: block;
        float: left;
        font-weight: 400;
        color: #ffffff;
        line-height: 50px;
        font-size: 40px;
        margin-top: 15px;
        margin-left: 50px;
        max-width: 22em;
        /*width: 600px;*/
        height: fit-content;
        word-wrap: break-word;
        word-break: break-all;
    }

    #components-layout-demo-basic .author {
        display: block;
        position: relative;
        min-width: 150px;
        max-width: 1000px;
        height: fit-content;
        font-size: 20px;
        margin-top: -22px;
        background-size: cover;
        border-bottom: 10px;
        /*float: bottom;*/
    }

    .details {
        margin-top: 20px;
        margin-left: 50px;
        width: 1100px;
        font-size: 18px;
        font-weight: 500;
        clear: both;
        text-align: justify;
        font-family: "Microsoft YaHei UI", serif;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .details .rowtit {
        display: inline-block;
        vertical-align: middle;
        padding-right: 5px;
        line-height: 26px;
        font-weight: bold;
    }

    .details .abstract-text {
        display: inline;
        color: #675850;
        line-height: 26px;
        font-weight: normal;
        text-align: justify;
        text-justify: inter-word;
    }

    .details .paper_url {
        text-decoration: underline;
        color: #675850;
        width: 1100px;
        overflow: hidden;
    }

    .details .paper_url:hover {
        color: #6aaddf
    }

</style>