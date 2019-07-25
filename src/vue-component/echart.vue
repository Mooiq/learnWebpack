<template>
    <div id="echart" style="width: 100%; height:100%;"></div>
</template>
<script>
var echarts = require('echarts');
var http = require('../js/http-config.service');
export default {
    data(){
        return {
            
        }
    },
    mounted(){
        this.getList();
        setInterval(_=>{
            this.getList();
        },60*1000)
    },
    methods: {
        getList(){
            http.get('children/getChildAgeSpread').then(res=>{
                if(res.code === 0){
                    if(res.data){
                        let resdate = res.data;
                        let legendData = Object.keys(res.data);
                        let selected = {};
                        let seriesData = legendData.map(el=>{
                            selected[el] = true;
                            return {
                                name: el,
                                value: resdate[el]
                            }
                        });
                        console.log({
                            legendData: legendData,
                            seriesData: seriesData,
                            selected: selected
                        })
                        let myChart = echarts.init(document.getElementById('echart'));
                        let data = {
                            legendData: legendData,
                            seriesData: seriesData,
                            selected: selected
                        }
                        // 绘制图表
                        myChart.setOption({
                            title : {
                                text: '儿童年龄分布',
                                x:'left'
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                type: 'scroll',
                                orient: 'vertical',
                                right: 20,
                                top: 20,
                                bottom: 20,
                                data: data.legendData,

                                selected: data.selected
                            },
                            series : [
                                {
                                    name: '年龄',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['40%', '50%'],
                                    data: data.seriesData,
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        });
                    }
                }else{
                    this.$message.error(res.message);
                }
            })
        }
    }
}
</script>

<style scoped>

</style>

