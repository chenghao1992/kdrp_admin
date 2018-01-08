import React, { PropTypes } from 'react'
import { connect } from 'dva'

import Basic from '../../components/company/Basic'
import Contact from '../../components/company/Contact'
import Financial from '../../components/company/Financial'
import Address from '../../components/company/Address'
import StatusAction from '../../components/company/StatusAction'

function CompanyInformation ({ dispatch, company, app }) {
  const {
    avatarUrl,
    isUploading,
    fileList,
    addStatusOfImg,
  } = company

  const fullname = company.basic.full_name

  const { roles } = app

  const isChannelMnger = roles.some((value) => {
    return ['channel_leader', 'channel_master'].indexOf(value.key) >= 0 && value.is_active
  })

  const isDisabled = company.status === 'freezing' || company.status === 'disable'

  const editAbleState = !(isChannelMnger || isDisabled)

  const statusProps = {
    fullname,
    status: company.status,
    handleEnable () {
      dispatch({
        type: 'company/changeCompanyState',
        payload: {
          action: 'enable',
        },
      })
    },
    handleFreeze () {
      dispatch({
        type: 'company/changeCompanyState',
        payload: {
          action: 'freeze',
        },
      })
    },
    handleDisable () {
      dispatch({
        type: 'company/changeCompanyState',
        payload: {
          action: 'disable',
        },
      })
    },
    handleUnfreeze () {
      dispatch({
        type: 'company/changeCompanyState',
        payload: {
          action: 'unfreeze',
        },
      })
    },
  }

  const basicProps = {
    editAbleState,
    data: company.basic,
    avatarUrl,
    isUploading,
    fileList,
    addStatusOfImg,
    changeImage (lastUrl) {
      dispatch({
        type: 'company/imgUploads',
        payload: {
          key: lastUrl,
        },
      })
    },
    disabledUpload (param) {
      dispatch({
        type: 'company/uploading',
        payload: {
          isUploading: param,
        },
      })
    },
    setFileListNum (param) {
      dispatch({
        type: 'company/setFileListNum',
        payload: param,
      })
    },
    onMouseover () {
      dispatch({
        type: 'company/addStatusOfImg',
        payload: true,
      })
    },
    onMouseMove () {
      dispatch({
        type: 'company/addStatusOfImg',
        payload: false,
      })
    },
    handleCancel () {
      dispatch({
        type: 'company/view',
        payload: {
          module: 'basic',
        },
      })
    },
    handleSave (values) {
      dispatch({
        type: 'company/updateBasic',
        payload: values,
      })
    },
    handleEdit () {
      dispatch({
        type: 'company/edit',
        payload: {
          module: 'basic',
        },
      })
    },
  }

  const contactProps = {
    editAbleState,
    data: company.contact,
    handleCancel () {
      dispatch({
        type: 'company/view',
        payload: {
          module: 'contact',
        },
      })
    },
    handleSave (values) {
      dispatch({
        type: 'company/updateContact',
        payload: {
          'business_contact.name': values.business_contact.name,
          'business_contact.mobile': values.business_contact.mobile,
          'business_contact.email': values.business_contact.email,
          'business_contact.phone': values.business_contact.phone,
          'finance_contact.name': values.finance_contact.name,
          'finance_contact.mobile': values.finance_contact.mobile,
          'finance_contact.email': values.finance_contact.email,
          'finance_contact.phone': values.finance_contact.phone,
        },
      })
    },
    handleEdit () {
      dispatch({
        type: 'company/edit',
        payload: {
          module: 'contact',
        },
      })
    },
  }

  const financialProps = {
    editAbleState,
    data: company.financial,
    handleCancel () {
      dispatch({
        type: 'company/view',
        payload: {
          module: 'financial',
        },
      })
    },
    handleSave (values) {
      dispatch({
        type: 'company/updateFinance',
        payload: {
          tax_no: values.tax_no,
          tax_company_address: values.tax_company_address,
          tax_company_phone: values.tax_company_phone,
          'bank_account.bank': values.bank_account.bank,
          'bank_account.branch': values.bank_account.branch,
          'bank_account.name': values.bank_account.name,
          'bank_account.account_no': values.bank_account.account_no,
        },
      })
    },
    handleEdit () {
      dispatch({
        type: 'company/edit',
        payload: {
          module: 'financial',
        },
      })
    },
  }

  const addressProps = {
    editAbleState,
    data: company.address,
    handleCancel () {
      dispatch({
        type: 'company/view',
        payload: {
          module: 'address',
        },
      })
    },
    handleSave (values) {
      dispatch({
        type: 'company/updateAddress',
        payload: {
          'manage_address.city': values.manage_address.city,
          'manage_address.province': values.manage_address.province,
          'manage_address.county': values.manage_address.county,
          'manage_address.detail': values.manage_address.detail,

          'invoice_address.city': values.invoice_address.city,
          'invoice_address.province': values.invoice_address.province,
          'invoice_address.county': values.invoice_address.county,
          'invoice_address.detail': values.invoice_address.detail,
        },
      })
    },
    handleEdit () {
      dispatch({
        type: 'company/edit',
        payload: {
          module: 'address',
        },
      })
    },
  }

  return (
    <div className="content-inner">

      <StatusAction {...statusProps} />
      <Basic {...basicProps} />
      <Contact {...contactProps} />
      <Financial {...financialProps} />
      <Address {...addressProps} />
    </div>
  )
}

function mapStateToProps ({ company, app }) {
  return { company, app }
}

CompanyInformation.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  company: PropTypes.object,
  app: PropTypes.object,
}

export default connect(mapStateToProps)(CompanyInformation)
