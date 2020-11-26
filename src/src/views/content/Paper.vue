<template>

    <div>
        <a-layout id="components-layout-demo-basic">
            <a-layout-content>
                <div class="topic">
                    混元形意太极拳教程之闪电五连鞭
                    <div class="author">
                        <div class="avatar">
                            <a-avatar :size="64" icon="user" src=""/>
                        </div>
                        <div class="au_name">赖佐田</div>
                    </div>
                    <div class="author">
                        <div class="avatar">
                            <a-avatar :size="64" icon="user"/>
                        </div>
                        <div class="au_name">马保国</div>
                    </div>
                    <div class="author">
                        <div class="avatar">
                            <a-avatar :size="64" icon="user" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                        </div>
                        <div class="au_name">太极雷</div>
                    </div>
                    <div class="author">
                        <div class="avatar">
                            <a-avatar :size="64" icon="user"/>
                        </div>
                        <div class="au_name">666</div>
                    </div>
                </div>
            </a-layout-content>
        </a-layout>

    </div>

</template>

<script>

</script>

<style>
    #components-layout-demo-basic .ant-layout-content {
        background: rgb(43, 46, 59);
        color: #fff;
        min-height: 360px;
        line-height: 360px;
        font-size: 20px;
    }

    #components-layout-demo-basic .topic {
        display: block;
        float: left;
        font-weight: 400;
        color: #ffffff;
        line-height: 50px;
        font-size: 40px;
        margin-top: 40px;
        margin-left: 50px;
        max-width: 20em;
        width: 600px;
        height: 200px;
        word-wrap: break-word;
        word-break: break-all;
    }

    #components-layout-demo-basic .topic .author {
        font-size: 20px;
        float: left;
    }

    #components-layout-demo-basic .topic .author .avatar {
        display: block;
        float: left;
        margin: 40px 20px 0 20px;
    }

    #components-layout-demo-basic .topic .author .au_name {
        display: block;
        float: bottom;
        margin: 0 10px;
    }


    /*button, html [type="button"]{*/
    /*    -webkit-appearance: button;*/
    /*    color: #ffffff;*/
    /*    background-color:#1890ff;*/
    /*}*/
</style>