<template>
<!-- 结构布局 -->
    <div id="components-layout-demo-basic">
        <a-layout style="height: 100%;">
            <!-- Header -->
            <a-layout-header style="height:10%; display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;text-align: center;">
                <h1 style="font-size: 2.5rem;margin-bottom: 0;">
                    <img style="width: 13%;padding-bottom: 10px;" src="./imgs/logo.png" alt="logo" width="100%">
                    <span style="margin-left: 10px;">吴中区社会福利中心</span> 
                </h1>
                <div style="position: absolute;top:0;left:20px;margin-top: 20px;font-size: 0.95rem;line-height:1.3;">
                    <span >当前日期：{{today[0]}} {{time}}</span>
                    <br>
                    <span style="dispaly: block;">&emsp;&emsp;&emsp;{{today[1]}}</span>
                </div>
                
            </a-layout-header>

            <!-- Content -->
            <a-layout-content>
                <div style="height: 50%;">
                    <a-row type="flex" style="height: 100%;">
                        <a-col span="17" style="padding: 10px;height: 100%;">
                            <monthPlan/>
                        </a-col>
                        <a-col span="7" style="padding: 10px;">
                            <echart/>
                        </a-col>
                    </a-row>
                </div>
                <div style="height: 50%;">
                    <a-row type="flex" style="height: 100%;">
                        <a-col span="9" style="padding: 10px;">
                            <limbTraining/>
                        </a-col>
                        <a-col span="8" style="padding: 10px;">
                            <intelligenceTraining/>
                        </a-col>
                        <a-col span="7" style="padding: 10px;">
                            <birthday/>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>

            <!-- Footer -->
            <a-layout-footer style="text-align:center;">
                <div id="react-root"></div>
            </a-layout-footer>
        </a-layout>
    </div>
</template>
<script>
import monthPlan from '@/vue-component/monthPlan.vue';
import echart from '@/vue-component/echart.vue';
import limbTraining from '@/vue-component/limbTraining.vue';
import intelligenceTraining from '@/vue-component/intelligenceTraining.vue';
import birthday from '@/vue-component/birthday.vue';
import { setInterval } from 'timers';
var Today = require('./js/getTime');
export default {
    data(){
        return {
            today: Today.today().split(','),
            date: null
        }
    },
    components: {
        monthPlan,
        echart,
        limbTraining,
        intelligenceTraining,
        birthday
    },
    mounted() {
        setInterval(_=>{
            this.date = new Date();
        },1000)
    },
    computed: {
        time() {
            let now = this.date || new Date();
            let h = now.getHours();
            let m = now.getMinutes();
            let s = now.getSeconds();
            if(h < 10) h = '0'+h;
            if(m < 10) m = '0'+m;
            if(s < 10) s = '0'+s;
            return `${h}:${m}:${s}`;
        }
    }
    
}
</script>

<style scoped>
#components-layout-demo-basic {
  /* text-align: center; */
  height: 100%;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #fff;
  /* color: #fff; */
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: #fff;
  /* color: #fff; 
  line-height: 120px;*/
  min-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

