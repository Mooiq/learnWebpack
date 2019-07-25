<template>
    <div style="height: 100%; border: 1px solid #ccc;overflow: hidden;">
        <div style="position:relative; background: #fff; z-index: 99;text-align:center;">
            <img style="width: 4%;padding-bottom: 10px;" src="../imgs/birIcon.png" alt="" width="100%;">
            <span style="font-size: 1.2rem; font-weight: bolder; color: #d48265;">本月生日</span>
        </div>
        <div class="formBody" style="position: relative; transition: top 0.5s;" :style="{ top }" @mouseenter="Stop()" @mouseleave="Up()">
            <a-row type="flex" v-for="(item, index) in list" :key="index">
                <a-col :span="24" class="center formTd">{{item}}</a-col>
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
            http.get('children/getBirthdayChild').then(res=>{
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

