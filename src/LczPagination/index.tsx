/* eslint-disable react/prop-types */
import { Pagination } from 'antd'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { usemEffect } from '../common/hooks'
import LczComCon from '../common/LczComCon'
import { getValueToNumer } from './common'
import { defaultpageSizeConfig } from './common/default'
import { LczPaginationWrapper } from './style'
import { LczPaginationProps } from './type'
const LczPagination = memo((props: LczPaginationProps) => {
  const {
    globalConfig,
    totalConfig,
    elliptical,
    pageSizeConfig = defaultpageSizeConfig,
    skipConfig,
    data = [],
    onClick
  } = props
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(globalConfig.linePageSize)
  const paginationRef = useRef<any>(null)
  const [selectHeight, setSelectHeight] = useState<number>(0)
  const totalValue = useMemo(() => {
    setCurrent(1)
    if (data.length) {
      return getValueToNumer(data[0].count)
    } else {
      return 0
    }
  }, [data])

  const TotalJsx = (total: number) => {
    return (
      <>
        {totalConfig.display ? (
          <div>
            <span> {totalConfig.prefix.content}</span>
            {total}
            <span>{totalConfig.suffix.content}</span>
          </div>
        ) : null}
      </>
    )
  }

  const showQuickJumper = () => {
    return <>{skipConfig.confirmBtnConfig.display ? <button>{skipConfig.confirmBtnConfig.content} </button> : null}</>
  }

  // const pageSizeOpt = useMemo(() => {
  //   const optArr = pageSizeConfig.content.split(',')
  //   return optArr.reduce((t: any, v: any) => (t.includes(v) || !getValueToNumer(v) ? t : [...t, v]), [])
  // }, [pageSizeConfig.content])

  // useEffect(() => {
  //   if (pageSizeOpt.length && pageSizeConfig.display) {
  //     if (pageSizeOpt.some(v => v == globalConfig.linePageSize)) {
  //       setPageSize(globalConfig.linePageSize)
  //     } else {
  //       setPageSize(pageSizeOpt[0])
  //     }
  //   } else {
  //     setPageSize(globalConfig.linePageSize)
  //   }
  // }, [globalConfig.linePageSize, pageSizeOpt, pageSizeConfig.display])

  useEffect(() => {
    setPageSize(globalConfig.linePageSize)
  }, [globalConfig.linePageSize])

  usemEffect(() => {
    const height = $(paginationRef.current).find('.ant-pagination-options-size-changer').height()
    setSelectHeight(height + 4)
  }, [pageSizeConfig])

  const paginationText = useMemo(() => {
    return {
      items_per_page: '条/页',
      jump_to: skipConfig.suffix.content,
      jump_to_confirm: '确定',
      page: '页',
      prev_page: '上一页',
      next_page: '下一页',
      prev_5: '向前 5 页',
      next_5: '向后 5 页',
      prev_3: '向前 3 页',
      next_3: '向后 3 页',
      page_size: '页码'
    }
  }, [skipConfig.suffix.content])

  const onChange = (page: number) => {
    setCurrent(page)
    onClick && onClick({ currentPage: page })
  }

  const onShowSizeChange = (_, size: number) => {
    setPageSize(size)
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <LczPaginationWrapper
        ref={paginationRef}
        className='Lcz-pagination'
        selectHeight={selectHeight}
        elliptical={elliptical}
        globalConfig={globalConfig}
        totalConfig={totalConfig}
        pageSizeConfig={pageSizeConfig}
        skipConfig={skipConfig}>
        {totalValue > 0 && (
          <Pagination
            locale={paginationText}
            current={current}
            // pageSizeOptions={pageSizeOpt}
            pageSize={pageSize}
            total={totalValue}
            showSizeChanger={pageSizeConfig.display}
            showQuickJumper={skipConfig.display ? { goButton: showQuickJumper() } : false}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            showTotal={TotalJsx}
          />
        )}
      </LczPaginationWrapper>
    </LczComCon>
  )
})

LczPagination.displayName = 'Lcz-pagination'
export default LczPagination
