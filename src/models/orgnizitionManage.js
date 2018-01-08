import { create, update, query, queryOrgnizition } from '../services/orgnizitionManage'
import { message } from 'antd'

// 从列表进来，需要根据查询id来查询对应的组织，并且将id存入queryOrgId
export default {
  namespace: 'organiztionManage',
  state: {
    channelName: '',
    queryOrgId: '',
    modalVisible: false,
    currentItem: {},
    modalType: 'add',
    actionType: '',
    selectedKeys: [],
    preCode: '',
    expandedKeys: [],
    searchKey: '',
    autoExpandParent: true,
    tree: [],
    selectTriggle: false,
  },
  reducers: {
    triggleSelect (state) {
      return { ...state, selectTriggle: true }
    },
    slcOrgInAdd (state, action) {
      return { ...state, ...action.payload }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    queryOrgnizitionSuccess (state, action) {
      return { ...state, currentItem: action.payload }
    },
    add (state, action) {
      return { ...state, ...action.payload, actionType: 'add', modalVisible: true, modalType: 'add' }
    },
    edit (state, action) {
      return { ...state, ...action.payload, actionType: 'edit', modalVisible: true, modalType: 'edit' }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    expandTree (state, action) {
      return { ...state, ...action.payload }
    },
    onExpandTree (state, action) {
      return { ...state, ...action.payload }
    },
  },
  effects: {
    *query ({ payload }, { call, put, select }) {
      const queryOrgId = yield select(state => state.organiztionManage.queryOrgId)
      const args = payload || {}

      if (!(payload && payload.id)) {
        if (queryOrgId) {
          args.id = queryOrgId
        }
      }

      const data = yield call(query, args)
      if (data && data.status === 'success') {
        const treeData = data.data.tree
        const keys = []
        const generateList = (d) => {
          for (let i = 0; i < d.length; i++) {
            const node = d[i]
            keys.push(node.key)
            if (node.children) {
              generateList(node.children)
            }
          }
        }
        generateList(treeData)

        yield put({
          type: 'querySuccess',
          payload: {
            channelName: data.data.channel_name,
            tree: data.data.tree,
            queryOrgId: args.id,
            expandedKeys: keys,
          },
        })
      }
    },
    *queryOrgnizition ({ payload }, { call, put }) {
      const data = yield call(queryOrgnizition, { id: payload.selectedKeys })
      if (data && data.status === 'success') {
        yield put({
          type: 'edit',
          payload,
        })
        yield put({
          type: 'queryOrgnizitionSuccess',
          payload: data.data,
        })
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload.data)
      if (data && data.status === 'success') {
        message.success('新增下级成功')
        yield put({
          type: 'query',
        })
        yield put({
          type: 'hideModal',
        })
        payload.resetFields()
      }
    },
    *update ({ payload }, { call, put }) {
      const data = yield call(update, payload.data)
      if (data && data.status === 'success') {
        message.success('修改成功')
        yield put({
          type: 'query',
        })
        yield put({
          type: 'hideModal',
        })
        payload.resetFields()
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/organization/manage') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
}
