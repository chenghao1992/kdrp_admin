import React, { PropTypes } from 'react'
import { Card, Col, Row, Input, Form, Cascader } from 'antd'
import { AREAS } from '../../utils/areas.js'
import Extra from '../ui/Extra'
// import classNames from 'classnames'

const FormItem = Form.Item

function FivethChunk ({
   editStatu,
   address_info,
   buttonClick,
  editStatus,
   form: {
     getFieldDecorator,
     resetFields,
     validateFieldsAndScroll,
   },
 }) {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }
  // const changeArea = () => {
  //
  // }
  const cancleChange = (status) => {
    buttonClick.changeEditStatu(status)
    resetFields()
  }
  // const extraContent = (<div>
  //    <Button onClick={() => cancleChange(true)} className={classNames({ isHide: editStatu })} style={{ marginRight: '15px' }}>放弃修改</Button>
  //    <Button type="primary" style={{ marginRight: '15px' }} className={classNames({ isHide: !editStatu })} onClick={() => buttonClick.changeEditStatu(false)}>编辑</Button>
  //    <Button type="primary" onClick={changeArea} className={classNames({ isHide: editStatu })} style={{ marginRight: '15px' }}>保存</Button>
  //  </div>)
  const extraProps = {
    status: editStatu,
    buttons: ['修改'],
    handleMenuClick (e) {
      if (e.key === '修改') {
        buttonClick.changeEditStatu('edit')
      }
    },
    handleCancel () {
      cancleChange('view')
    },
    handleSave (e) {
      e.preventDefault()
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          const data = {
            work_province: values.work_info ? values.work_info[0] : '',
            work_city: values.work_info ? values.work_info[1] : '',
            work_county: values.work_info ? values.work_info[2] : '',
            work_detail: values.work_detail,
            home_province: values.home_info ? values.home_info[0] : '',
            home_city: values.home_info ? values.home_info[1] : '',
            home_county: values.home_info ? values.home_info[2] : '',
            home_detail: values.home_detail,

          }
          buttonClick.subChangeArea(data)
          buttonClick.changeEditStatu('view')
        }
      })
    },
  }
  return (
     <Card title="地址信息" bordered extra={editStatus ? <Extra {...extraProps} /> : ''}>
       <div className="personal_info">
         <div className="right_con">
           <Row gutter={40} >
             <Col>
               <Form>
                 <Row gutter={20}>
                   {editStatu === 'edit' ? <Col span={24}>
                       <FormItem {...formItemLayout} label="工作地址">
                         {getFieldDecorator('work_info',
                           {
                             initialValue: address_info.work_address ? address_info.work_address.region : '',

                           })(
                           <Cascader
                             options={AREAS}
                             placeholder="请选择工作地址"
                             expandTrigger="hover"
                             style={{ width: '100%' }}
                             disabled={editStatu === 'view'}
                           />
                         )}
                       </FormItem>
                       <Col offset={5} span={19}>
                         <FormItem>
                           {getFieldDecorator('work_detail',
                             {
                               initialValue: address_info.work_address ? address_info.work_address.detail : '',
                               rules: [
                                 { max: 255, message: '最大长度不能超过255' },
                               ],

                             })(
                             <Input type="textarea" placeholder="请输入详细的街道和门牌号地址" disabled={editStatu === 'view'} />
                           )}

                         </FormItem>
                       </Col>

                     </Col> :
                     <Col>
                       <FormItem {...formItemLayout}
                         label={'工作地址'}
                       >{address_info.work_address ? address_info.work_address.region : ''}{address_info.work_address ? address_info.work_address.detail : ''}</FormItem>

                     </Col>


                   }
                 </Row>
                 <Row gutter={20}>
                   {editStatu === 'edit' ? <Col span={24}>
                       <FormItem {...formItemLayout} label="居住地址">

                         {getFieldDecorator('home_info',
                           {
                             initialValue: address_info.home_address ? address_info.home_address.region : '',

                           })(
                           <Cascader
                             options={AREAS}
                             placeholder="请选择居住地址"
                             expandTrigger="hover"
                             style={{ width: '100%' }}
                             disabled={editStatu === 'view'}
                           />
                         )}
                       </FormItem>
                       <Col offset={5} span={19}>
                         <FormItem>
                           {getFieldDecorator('home_detail',
                             {
                               initialValue: address_info.home_address ? address_info.home_address.detail : '',
                               rules: [
                                 { max: 255, message: '最大长度不能超过255' },
                               ],

                             })(
                             <Input type="textarea" placeholder="请输入详细的街道和门牌号地址" disabled={editStatu === 'view'} />
                           )}

                         </FormItem>
                       </Col>
                     </Col> :
                     <Col>
                       <FormItem {...formItemLayout}
                         label={'居住地址'}
                       >{address_info.home_address ? address_info.home_address.region : ''}{address_info.home_address ? address_info.home_address.detail : ''}</FormItem>
                       {/* <Col span={24}>*/}
                         {/* <FormItem {...formItemLayout} label='工作居住地址'>{address_info.home_address?address_info.home_address.detail:''}</FormItem>*/}
                       {/* </Col>*/}
                     </Col>
                   }
                 </Row>


               </Form>

             </Col>
           </Row>
         </div>
       </div>
     </Card>
   )
}

FivethChunk.propTypes = {
  editStatu: PropTypes.string,
  address_info: PropTypes.object,
  buttonClick: PropTypes.object,
  editStatus: PropTypes.bool,
  form: PropTypes.object,
}

export default Form.create()(FivethChunk)
