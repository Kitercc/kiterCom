import React, { memo, useMemo, useEffect, useState } from 'react'
import { Tree } from 'antd'
import { ConnectLine, DataMap, TextStyle, TreeProps } from './type'
const { DirectoryTree } = Tree

import { DirectoryTreeWrapper } from './style'
import SearchInput from './components/SearchInput'
import { findExpanded, findId, formatData, getaccordion } from './common'
import {
  defaultArrowConfig,
  defaultGlobal,
  defaultIconConfig,
  defaultLineStyle,
  defaultSearchConfig,
  defaultStyleConfig
} from './common/defaultValue'
import IconCom from './components/IconCom'
import { conversionData } from '../common/util'
import LczComCon from '../common/LczComCon'
import { ScrollConfig } from '../LczColumnTable/type'

export default memo(function LczDirectoryTree(props: TreeProps) {
  const {
    globalConfig = defaultGlobal,
    searchConfig = defaultSearchConfig,
    arrowConfig = defaultArrowConfig,
    lineStyle = defaultLineStyle,
    styleConfig = defaultStyleConfig,
    iconConfig = defaultIconConfig,
    onClick,
    onChange,
    data = []
  } = props
  const {
    current = 'first',
    defaultId = { value: '' },
    isleafVal = '1',
    parentSelect = true,
    accordionMode = false,
    connectLine = defaultGlobal.connectLine as ConnectLine,
    textStyle = defaultGlobal.textStyle as TextStyle
  } = globalConfig
  const { icon } = arrowConfig

  const [selectedKeys, setSelectKeys] = useState<(string | number)[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [searchVal, setSearchVal] = useState<string>('')
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false)

  const _data = (function () {
    return conversionData(data, { id: 'string', content: 'string', parentid: 'string', isleaf: 'string' })
  })()

  // 处理数据
  const dataMemo = useMemo(() => {
    let _arr: any = []
    if (_data?.length > 0) {
      const datas = _data.map(v => ({
        ...v,
        key: v.id,
        title: v.content,
        isLeaf: String(v.isleaf) === isleafVal
      }))
      _arr = formatData(datas)
    }
    return _arr
  }, [JSON.stringify(_data), isleafVal])

  // 选中展开
  useEffect(() => {
    if (dataMemo?.length > 0) {
      switch (current) {
        case 'first': {
          if (!parentSelect) {
            const first = findId(dataMemo)
            if (first) {
              setSelectKeys([first.id])
              const path = findExpanded(_data, first.id)
              setExpandedKeys(path)
              onChange && onChange(first)
            } else {
              setSelectKeys([])
              setExpandedKeys([])
            }
          } else {
            setSelectKeys([_data[0].id])
            setExpandedKeys([])
            onChange && onChange(_data[0])
          }
          break
        }
        case 'id': {
          selectIdExpand(defaultId.value)
          break
        }
      }
    }
  }, [current, JSON.stringify(defaultId), JSON.stringify(dataMemo), parentSelect])

  function selectIdExpand(id, flag = true) {
    const curr = findId(dataMemo, 'id', id)
    if (curr) {
      if (flag) {
        if (!parentSelect) {
          if (curr?.isLeaf) {
            const param = _data.find(v => v.id == curr.id)
            setSelectKeys([curr.id])
            onChange && onChange(param as DataMap)
          } else {
            setSelectKeys([])
          }
        } else {
          const param = _data.find(v => v.id == id)
          setSelectKeys([curr.id])
          onChange && onChange(param as DataMap)
        }
      }

      const path = findExpanded(_data, curr.id)
      setExpandedKeys(() => path)
    } else {
      setSelectKeys([])
      setExpandedKeys([])
    }
  }

  // 树选中
  const treeHandler = (key, e) => {
    const _key = e?.node?.key || key[0]
    const param = _data.find(v => v.id == _key)

    if (!parentSelect) {
      if (e.node.isLeaf) {
        setSelectKeys(key)
        onClick && onClick(param as DataMap)
        if (!selectedKeys.includes(_key)) {
          onChange && onChange(param as DataMap)
        }
      }
    } else {
      setSelectKeys(key)
      onClick && onClick(param as DataMap)
      if (!selectedKeys.includes(_key)) {
        onChange && onChange(param as DataMap)
      }
    }
  }

  // 树展开
  const treeExpand = (key, e) => {
    const _key = e.node.key
    //@ts-ignore
    const isNode = $(e.nativeEvent.target).closest('.ant-tree-node-content-wrapper').length > 0
    if (parentSelect) {
      if (!isNode) {
        const path = getaccordion(dataMemo, key, _key, _data)
        !accordionMode ? setExpandedKeys(key) : setExpandedKeys(path)
      }
    } else {
      const path = getaccordion(dataMemo, key, _key, _data)
      !accordionMode ? setExpandedKeys(key) : setExpandedKeys(path)
    }
  }

  const searchChange = val => {
    if (searchConfig.display && val) {
      const expandedKeys = _data
        .map(item => {
          if (item.content.indexOf(val) > -1) {
            return findId(dataMemo, 'id', String(item.id)).id
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)

      setSearchVal(val)
      setExpandedKeys([...expandedKeys])
      setAutoExpandParent(expandedKeys.length > 0)
    } else {
      setSearchVal('')
      setAutoExpandParent(false)
      selectIdExpand(selectedKeys[0], false)
    }
  }

  const editIcon = node => {
    if (!iconConfig?.display) return null
    const { expanded, isLeaf } = node
    if (isLeaf) return <IconCom type='child' iconConfig={iconConfig} />
    if (expanded) return <IconCom type='expand' iconConfig={iconConfig} />
    return <IconCom type='stowed' iconConfig={iconConfig} />
  }

  const treeLoop = data => {
    if (!searchVal || !searchConfig.display) return data
    return data.map(item => {
      const index = item.title.indexOf(searchVal)
      const beforeStr = item.title.substr(0, index)
      const afterStr = item.title.substr(index + searchVal.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: searchConfig?.textBox?.searchTextStyle?.mateColor }}>{searchVal}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        )
      if (item.children) {
        return { ...item, title, children: treeLoop(item.children) }
      }
      return { ...item, title }
    })
  }

  return (
    <LczComCon>
      <DirectoryTreeWrapper
        connectLine={connectLine}
        arrowConfig={arrowConfig}
        lineStyle={lineStyle}
        styleConfig={styleConfig}
        iconConfig={iconConfig}
        horcroll={globalConfig.horcroll || ({} as ScrollConfig)}
        className='lcz-directory-tree-wrapper'>
        <SearchInput searchConfig={searchConfig} onChange={searchChange} textStyle={textStyle} />
        <div className='lcz-directory-tree-container'>
          <DirectoryTree
            style={textStyle}
            autoExpandParent={autoExpandParent}
            selectedKeys={selectedKeys}
            expandedKeys={expandedKeys}
            showLine={connectLine.display ? { showLeafIcon: false } : false}
            treeData={treeLoop(dataMemo)}
            onSelect={treeHandler}
            onExpand={treeExpand}
            switcherIcon={<span className={`lcz-switcher-icon iconfont lcz-com-icon-${icon}`} />}
            icon={editIcon}
          />
        </div>
      </DirectoryTreeWrapper>
    </LczComCon>
  )
})
