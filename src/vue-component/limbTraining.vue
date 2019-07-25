<template>
    <div style="height: 100%; border: 1px solid #ccc;overflow: hidden;">
        <div style="position:relative; background: #fff; z-index: 99;">
            <p style="font-size: 1rem; padding-top: 12px; padding-left: 20px;">肢体康复训练记录</p>
            <div style="margin-bottom: 10px;">
                <a-row type="flex">
                    <a-col :span="4" class="center formTh">姓名</a-col>
                    <a-col :span="4" class="center formTh">年龄</a-col>
                    <a-col :span="6" class="center formTh">康复项目</a-col>
                    <a-col :span="4" class="center formTh">训练表现</a-col>
                    <a-col :span="6" class="center formTh">康复师</a-col>
                </a-row>
            </div>
        </div>
        <div class="formBody" style="position: relative; transition: top 0.5s;" :style="{ top }" @mouseenter="Stop()" @mouseleave="Up()">
            <a-row type="flex" v-for="(item, index) in list" :key="index">
                <a-col :span="4" class="center formTd">{{item.name}}</a-col>
                <a-col :span="4" class="center formTd">{{item.age}}</a-col>
                <a-col :span="6" class="center formTd">{{item.project}}</a-col>
                <a-col :span="4" class="center formTd">{{item.perfermence}}</a-col>
                <a-col :span="6" class="center formTd">{{item.therapist}}</a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
var http = require('../js/http-config.service');
export default {
    data(){
        return {
            list: [],
            activeIndex: 0,
            intnum: undefined,
        }
    },
    created() {
        this.getList();
        setInterval(_=>{
            this.getList();
        },60*1000)
    },
    mounted() {
        this.ScrollUp();
    },
    methods: {
        ScrollUp(){
            this.intnum = setInterval(_ => {
                if (this.list.length < 10) return;
                if (this.activeIndex < this.data.length - 1) {
                  this.activeIndex += 1;
                } else {
                  this.activeIndex = 0;
                }
            }, 1000);
        },
        Stop(){
            clearInterval(this.intnum);
        },
        Up(){
            this.ScrollUp();
        },
        getList(){
            http.get('training/listLocalMonth',{type: 1}).then(res=>{
                console.log(res);
                if(res.code === 0){
                    if(res.data instanceof Array){
                        this.list = res.data;
                    }
                }else{
                    this.$message.error(res.message);
                }
            })
        }
    },
    computed: {
      top() {
        return - this.activeIndex * 35 + 'px';
      }
    },
}
</script>

<style scoped>
.center {
    text-align: center;
}
.formTh {
    font-size: 0.95rem;
    font-weight:bold;
}
.formTd {
    font-size: 0.95rem;
    padding: 4px 0;
}
.formBody .ant-row-flex:nth-child(2n+0) {
    background-color: #ddd;
}
</style>

