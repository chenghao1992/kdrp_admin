import './index.html'
import dva from 'dva'
import {message,notification} from "antd"
import { browserHistory ,hashHistory} from 'dva/router'
import createLoading from 'dva-loading';
import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


let models = [],
  initialState = {};

models.push(require('./models/app'));

models.forEach((m) => initialState[m.namespace] = m.state);

// 1. Initialize
const app = dva({
  history: hashHistory,
  onError (error) {
    const {message} = error;

    notification.error({
      message: '错误',
      description: message,
    });

    console.error('app onError -- ', message)
  },
  onReducer: reducer => (state, action) => {
    const newState = reducer(state, action);
    if (action.type == 'app/logout') {
      return {
        routing: newState.routing,
        loading:newState.loading,
        ...initialState
      }
    }else {
      return newState
    }
  }
})

app.use(createLoading());

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
