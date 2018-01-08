import React, { PropTypes } from 'react'
import { connect } from 'dva'

import styles from '../../components/common_list.less'
import classNames from 'classnames'
import OrgTree from '../../components/orgnizition/tree'
import OrgModalAdd from '../../components/orgnizition/addModal'
import OrgModalEdit from '../../components/orgnizition/editModal'


function OrgnizionManage ({ dispatch, organiztionManage, selectManager }) {
  const {
    selectTriggle, currentItem, modalVisible, modalType, actionType, tree, selectedKeys, expandedKeys,
    autoExpandParent, preCode, searchKey, channelName,
  } = organiztionManage

  const { data } = selectManager

  const handleChange = (value) => {
    dispatch({
      type: 'organiztionManage/triggleSelect',
    })

    dispatch({
      type: 'selectManager/query',
      payload: value,
    })
  }

  const addNew = function () {
    dispatch({
      type: 'organiztionManage/add',
      payload: {
        selectedKeys: [],
      },
    })
  }

  const addChildren = function (key, code) {
    return function (e) {
      e.stopPropagation()
      // console.log('addkey=>' + key)
      dispatch({
        type: 'organiztionManage/add',
        payload: {
          selectedKeys: [key],
          preCode: code,
        },
      })

      dispatch({
        type: 'selectManager/query',
        payload: '',
      })
    }
  }

  const edit = function (key) {
    return function (e) {
      e.stopPropagation()
      // console.log('editkey=>' + key)
      dispatch({
        type: 'organiztionManage/queryOrgnizition',
        payload: {
          selectedKeys: [key],
        },
      })
    }
  }

  const getParentKey = (key, treeNodes) => {
    let parentKey
    for (let i = 0; i < treeNodes.length; i++) {
      const node = treeNodes[i]
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }

  const onChange = function (dataList, gData) {
    return function (e) {
      const value = e.target.value
      let searchKey = ''
      if (value !== '') {
        const expandedKeys = dataList.map((item) => {
          if (item.title.indexOf(value) > -1 || item.code.indexOf(value) > -1) {
            searchKey = item.key
            return getParentKey(item.key, gData)
          }
          return null
        }).filter((item, i, self) => item && self.indexOf(item) === i)


        console.log(expandedKeys)

        dispatch({
          type: 'organiztionManage/expandTree',
          payload: {
            // expandedKeys,
            searchKey,
          },
        })
      }
    }
  }


  const onExpand = (expandedKeys) => {
    dispatch({
      type: 'organiztionManage/onExpandTree',
      payload: {
        expandedKeys,
        autoExpandParent: false,
      },
    })
  }

  const OrgTreeProps = {
    addNew,
    addChildren,
    edit,
    onChange,
    actionType,
    selectedKeys,
    dataSource: tree,
    autoExpandParent,
    expandedKeys,
    onExpand,
    searchKey,
  }

  // const {options} = selectOrgnizition;
  const OrgModalProps = {
    timer: false,
    selectTriggle,
    tree,
    selectedKeys,
    preCode,
    options: tree,
    data,
    handleChange,
    item: modalType === 'add' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onChange (value, selectedOptions) {
      dispatch({
        type: 'organiztionManage/slcOrgInAdd',
        payload: {
          selectedKeys: [value[value.length - 1]],
          preCode: selectedOptions[selectedOptions.length - 1].code,
        },
      })
      dispatch({
        type: 'selectManager/clearMngData',
      })
    },
    onAddOk (data, resetFields) {
      dispatch({
        type: 'organiztionManage/create',
        payload: {
          data,
          resetFields,
        },
      })
    },
    onEditOk (data, resetFields) {
      dispatch({
        type: 'organiztionManage/update',
        payload: {
          data,
          resetFields,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'organiztionManage/hideModal',
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>组织架构管理</h1>
      <p className={styles.common_header_p}>在每一个组织节点的后面点击【增加下级】可以建立新的组织节点。组织有可能是一个销售管理据点或者一个销售片区区域。名称可以自定义。
        每个组织需要任命一个管理员。可以点击编辑对组织名称、管理员进行修改。</p>
      <h2 className={classNames(styles.common_margin_b10, styles.common_header_h2)}>{channelName}</h2>
      <OrgTree {...OrgTreeProps} />
      <OrgModalAdd {...OrgModalProps} />
      <OrgModalEdit {...OrgModalProps} />
    </div>
  )
}

function mapStateToProps ({ organiztionManage, selectManager, selectOrgnizition }) {
  return { organiztionManage, selectManager, selectOrgnizition }
}

OrgnizionManage.propTypes = {
  dispatch: PropTypes.func,
  organiztionManage: PropTypes.object,
  selectManager: PropTypes.object,
}

export default connect(mapStateToProps)(OrgnizionManage)
