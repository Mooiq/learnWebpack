import Vue from 'vue';
import App from './App.vue';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
Vue.use(Antd);
// vue
let vm = new Vue({
    el: '#vue-root',
    data: {},
    template: '<App/>',
    components: {
        App
    }
});

// react
class App2 extends Component {
    render() {
        return <span> 镜子信息养老服务云提供计算服务 </span>
    }
}
ReactDom.render(<App2 />, document.getElementById('react-root'));
