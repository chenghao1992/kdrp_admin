import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Row, Col, Card, DatePicker, notification } from 'antd'
import moment from 'moment'
import NumberCard from '../components/dashboard/numberCard'
import OrgnRank from '../components/dashboard/orgnrank'
import SelfOrgnRank from '../components/dashboard/selfOrgnrank'
import Promotion from '../components/dashboard/promotion'
import AgencyPromotion from '../components/dashboard/agencyPromotion'
import BarChart from '../components/dashboard/barChart'
import PieChart from '../components/dashboard/pieChart'
import styles from './dashboard.less'
import commonStyles from '../components/common_list.less'
import { formatMoney } from '../utils/index'

const { RangePicker } = DatePicker

const widthScroll = document.body.scrollWidth

let queryBarChartUrl = '/api/drp/agency_fee_column/'

function Dashboard ({ dispatch, dashboard }) {
  const { barCharts, isloadBar, totalData, personText, personAgree, changeHeightOfNumCard, isChannelBusiness } = dashboard

  const childrens = []
  const data = totalData

  let RangeTimeFlag = true
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: '提示',
      description: '为了更好的体验，查询范围不要超过9天。',
    })
  }

  function disabledDate (current) {
    let rt
    if (current) {
      rt = current.valueOf() > moment().subtract(1, 'days')
      /* || current.valueOf()<moment().subtract(7, 'days')*/
    }
    return rt
  }

  function onChange (dates) {
    const dd = 60 * 60 * 24 * 8 * 1000
    const dt = dates[1] - dates[0]
    if ((dt - dd) > 2) {
      openNotificationWithIcon('warning')
      RangeTimeFlag = false
    } else {
      RangeTimeFlag = true
    }
  }

  function onTimeOk (value) {
    if (RangeTimeFlag) {
      let okData = {
        start_end_time: `${value[0].format('YYYY-MM-DD')}~${value[1].format('YYYY-MM-DD')}`,
        url: queryBarChartUrl,
      }
      dispatch({ type: 'dashboard/queryIncomeBar', payload: okData })
    } else {
      openNotificationWithIcon('warning')
    }
  }


  for (let i = 0; i < data.length; i++) {
    const type = data[i].type
    switch (type) {
      case 'statistics': {
        let argsS = data[i].args
        let dataS = argsS.data
        let numberCards = dataS.map((item, key) => <Col key={key} lg={12} md={12}>
          <NumberCard {...item} />
        </Col>)
        childrens.push(
          <Col lg={argsS.col} md={24} key={i}>

            <Card title={argsS.title} bordered={false} bodyStyle={widthScroll > 768 ? {
              padding: '30px 0px 12px 0px',
              height: changeHeightOfNumCard ? 320 : 420,
            } : { padding: '30px 0px 12px 0px' }}>
              <Row>
                {numberCards}
              </Row>
            </Card>
          </Col>
        )
        break
      }
      case 'rank': {
        let argsR = data[i].args
        let dataR = argsR.data
        let selfRanking = argsR.extra_data
        if (!argsR.extra_data && argsR.data.length > 0) {
          for (let i = 0; i < argsR.data.length; i++) {
            if (argsR.data[i].current) {
              selfRanking = argsR.data[i]
            }
          }
        }
        let highterStatus = ''
        if (!changeHeightOfNumCard) {
          highterStatus = selfRanking ? 1 : 2
        } else {
          highterStatus = 3
        }
        let headerR = argsR.headers
        childrens.push(
          <Col lg={argsR.col} md={24} key={i}>
            <Card title={argsR.title} bordered={false} bodyStyle={{ padding: '0', height: changeHeightOfNumCard ? 320 : 420 }}>
              <OrgnRank data={dataR} header={headerR} changeHeightOfNumCard={changeHeightOfNumCard} highterStatus={highterStatus} />
              {
                !isChannelBusiness ?
                  <p style={{ marginTop: 5, marginLeft: 10, display: selfRanking ? 'block' : 'none' }}>
                    <span className={isChannelBusiness ? '' : commonStyles.common_f_edit}>
                      {selfRanking ? selfRanking.name : ''}
                    </span>排名：第
                    <span>{selfRanking ? selfRanking.index : ''}</span>位&nbsp;&nbsp;组织有效年化交易金额：￥
                    <span>{selfRanking ? formatMoney(selfRanking.value) : ''}</span>
                  </p> : ''
              }
            </Card>
          </Col>
        )
        break
      }
      case 'rankSelf': {
        let argsR = data[i].args
        let dataR = argsR.data
        let selfRanking = argsR.extra_data
        if (!argsR.extra_data && argsR.data.length > 0) {
          for (let i = 0; i < argsR.data.length; i++) {
            if (argsR.data[i].current) {
              selfRanking = argsR.data[i]
            }
          }
        }
        let highterStatus = ''
        if (!changeHeightOfNumCard) {
          highterStatus = selfRanking ? 1 : 2
        } else {
          highterStatus = 3
        }
        let scrollRank = selfRanking ? 240 : 280
        let headerR = argsR.headers
        childrens.push(
          <Col lg={argsR.col} md={24} key={i}>
            <Card title={argsR.title} bordered={false} bodyStyle={{ padding: '0', height: 320 }}>
              <SelfOrgnRank data={dataR} header={headerR} changeHeightOfNumCard={changeHeightOfNumCard} highterStatus={highterStatus} scrollRank={scrollRank} />
              {
                isChannelBusiness ?
                  <p style={{ marginTop: 5, marginLeft: 10, display: selfRanking ? 'block' : 'none' }}>
                    <span className={isChannelBusiness ? '' : commonStyles.common_f_edit}>您的</span>排名：第
                    <span>{selfRanking ? selfRanking.index : ''}</span>位&nbsp;&nbsp;您的有效年化交易金额：￥
                    <span>{selfRanking ? formatMoney(selfRanking.value) : ''}
                    </span>
                  </p> :
                  <p style={{ marginTop: 5, marginLeft: 10, display: selfRanking ? 'block' : 'none' }}>
                    <span className={isChannelBusiness ? '' : commonStyles.common_f_edit}>
                      {selfRanking ? selfRanking.name : ''}
                    </span>排名：第
                    <span>{selfRanking ? selfRanking.index : ''}</span>位&nbsp;&nbsp;组织有效年化交易金额：￥
                    <span>{selfRanking ? formatMoney(selfRanking.value) : ''}</span>
                  </p>
              }
            </Card>
          </Col>
        )
        break
      }
      case 'barCharts': {
        let argsB = data[i].args
        childrens.push(
          <Col lg={argsB.col} md={24} key={i}>
            <Card title={argsB.title} bordered={false} bodyStyle={{ padding: '15px 10px', height: 400 }}>
              <Row>
                <div className={styles.right}>
                  <RangePicker
                    disabledDate={disabledDate}
                    showTime
                    format="YYYY-MM-DD"
                    placeholder={['起始时间', '结束时间']}
                    defaultValue={[moment().subtract(9, 'days'), moment().subtract(1, 'days')]}
                    onOk={onTimeOk}
                    onChange={onChange}
                  />
                </div>
              </Row>
              <BarChart {...barCharts} />
            </Card>
          </Col>
        )
        if (!isloadBar) {
          queryBarChartUrl = argsB.url
          let param = {
            start_end_time: `${moment().subtract(9, 'days').format('YYYY-MM-DD')}~${moment().subtract(1, 'days').format('YYYY-MM-DD')}`,
            url: queryBarChartUrl,
          }
          dispatch({ type: 'dashboard/queryIncomeBar', payload: param })
        }
        break
      }
      case 'pieCharts': {
        let argsP = data[i].args
        let dataP = argsP.data
        childrens.push(
          <Col lg={argsP.col} md={24} key={i}>
            <Card title={argsP.title} bordered={false} bodyStyle={{ padding: '24px 10px', height: 350 }}>
              <PieChart {...dataP} />
            </Card>
          </Col>
        )
        break
      }
      case 'promotion': {
        let argsShare = data[i].args
        let promotion = argsShare.data
        const promotionProps = {
          promotion,
          personText,
          personAgree,
        }
        childrens.push(
          <Col lg={argsShare.col} md={24} key={i}>
            <Card title={argsShare.title} bordered={false} bodyStyle={{ padding: '24px' }}>
              <Promotion {...promotionProps} />
            </Card>
          </Col>
        )
        break
      }
      case 'agencyPromotion': {
        let argsShare = data[i].args
        let promotion = argsShare.data
        const promotionProps = {
          promotion,
        }
        childrens.push(
          <Col lg={argsShare.col} md={24} key={i}>
            <Card title={argsShare.title} bordered={false} bodyStyle={{ padding: '24px' }}>
              <AgencyPromotion {...promotionProps} />
            </Card>
          </Col>
        )
        break
      }
      default :
    }
  }


  return (
    <Row gutter={24}>
      {childrens}
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
