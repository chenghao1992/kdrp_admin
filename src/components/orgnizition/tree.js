import React, { PropTypes } from 'react'
import { Tree, Input } from 'antd'
import styles from './tree.less'

const TreeNode = Tree.TreeNode
const Search = Input.Search


const OrgTree = ({
  addChildren,
  edit,
  onChange,
  onExpand,
  autoExpandParent,
  dataSource,
  expandedKeys,
  searchKey,
}) => {
  const onSelect = (selectedKeys, info) => {
    console.log(info)
  }

  const customTitle = (item) => {
    return (
      <div
        className={styles.orgTree}
      >
        <span className={styles.orgTree__title}>{item.title}</span>
        <span className={styles.orgTree__name}>{item.manager ? item.manager : '暂无管理员'}</span>

        {item.editable && !item.is_bottom ?
          <span className={styles.orgTree__addChildren} onClick={addChildren(item.key, item.code)}>增加下级</span>
          : null}
        {item.editable ?
          <span className={styles.orgTree__edit} onClick={edit(item.key)}>编辑</span>
          : null}

      </div>
    )
  }


  const loop = data => data.map((item) => {
    if (item.children.length > 0) {
      return (
        <TreeNode className="treenode1" key={item.key} title={customTitle(item)} isLeaf={false}>
          {loop(item.children)}
        </TreeNode>
      )
    }
    return <TreeNode className="treenode1" key={item.key} title={customTitle(item)} isLeaf />
  })

  const gData = dataSource


  const filterTreeNode = (node) => {
    return node.props.eventKey === searchKey
  }

  const dataList = []
  /**
   * 扁平化tree data
   * @param data
   */
  const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const { key, title, code } = node
      dataList.push({ key, title, code })
      if (node.children) {
        generateList(node.children, node.key)
      }
    }
  }
  generateList(gData)


  return (
    <div className={styles.normal}>
      {/* <Button type="primary" icon="plus">新建组织</Button>*/}

      <Search
        placeholder="请输入组织名称或组织代码"
        style={{ width: 300 }}
        onChange={onChange(dataList, gData)}
      />

      {/*
       <Button type="primary" icon="plus" onClick={addNew}>新建组织</Button>
       */}

      <Tree
        filterTreeNode={filterTreeNode}
        defaultExpandAll={false}
        autoExpandParent={autoExpandParent}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        onSelect={onSelect}
      >
        {loop(gData)}
      </Tree>
    </div>
  )
}

OrgTree.propTypes = {
  addChildren: PropTypes.func,
  edit: PropTypes.func,
  onChange: PropTypes.func,
  onExpand: PropTypes.func,
  autoExpandParent: PropTypes.bool,
  dataSource: PropTypes.array,
  expandedKeys: PropTypes.array,
  searchKey: PropTypes.string,
}

export default OrgTree
