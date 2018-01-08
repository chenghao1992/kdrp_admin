import { queryNumbers, queryList } from '../services/serviceCharge'
import { color } from '../utils/theme'
import { parse } from 'qs'
export default {
  namespace: 'serviceCharge',
  state: {
    loading: false,
    numbers: [
      {
        icon: 'pay-circle-o',
        color: color.yellow,
        title: '待结算服务费(元)',
        number: 0,
      }, {
        icon: 'like-o',
        color: color.purple,
        title: '已结算待发放服务费(元)',
        number: 0,
      }, {
        icon: 'hourglass',
        color: color.green,
        title: '已发放服务费(元)',
        number: 0,
      },
    ],
    list: [],
    pagination: {
      /* showSizeChanger: true,*/
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/servicecharge/extra') {
          dispatch({ type: 'queryList' })
          dispatch({ type: 'queryNumbers' })
        }
      })
    },
  },
  effects: {
    *queryNumbers ({ payload }, { call, put }) {
      const data = yield call(queryNumbers, parse(payload))

      if (data && data.status === 'success') {
        let numbersData = [
          {
            icon: 'pay-circle-o',
            color: color.yellow,
            title: '待结算服务费(元)',
            number: '--',
            type: '',
          }, {
            icon: 'like-o',
            color: color.purple,
            title: '已结算待发放服务费(元)',
            number: '--',
            type: '',
          }, {
            icon: 'hourglass',
            color: color.green,
            title: '已发放服务费(元)',
            number: '--',
            type: '',
          },
        ]
        // numbersData[0].number = data.data.accrued_amount ? data.data.accrued_amount : 0;
        // numbersData[1].number = data.data.accounting_amount ? data.data.accounting_amount : 0;
        // numbersData[2].number = data.data.actally_amount ? data.data.actally_amount : 0;
        yield put({
          type: 'queryNumbersSuccess',
          payload: { numbers: numbersData },
        })
      }
    },
    *queryList ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(queryList, parse(payload))
      if (data && data.status === 'success') {
        yield put({
          type: 'queryListSuccess',
          payload: {
            list: data.data,
            pagination: data.page,
          },
        })
      }
    },
  },
  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    queryNumbersSuccess (state, action) {
      const { numbers } = action.payload
      return {
        ...state,
        numbers,
      }
    },
    queryListSuccess (state, action) {
      const { list, pagination } = action.payload
      return {
        ...state,
        list,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
}
