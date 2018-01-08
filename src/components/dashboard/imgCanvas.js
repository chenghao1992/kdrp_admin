import React, { PropTypes } from 'react'
import styles from './promotion.less'
import QRCode from 'qrcode-react'
import { Link } from 'dva/router'

import img1 from '../../../assets/user.png'
import img2 from '../../../assets/logo_01.png'

class ImgCanvas extends React.Component {

  componentDidMount () {
    // const canvas = document.getElementsByTagName('canvas')[0]
    const canvas = document.getElementById('QRCodeCanvas').children[0]

    if (canvas) {
      canvas.toBlob((blob) => {
        const finishCode = URL.createObjectURL(blob)
        document.getElementById('downloadCode').href = finishCode
      })
    }

    function convertCanvasToImage (canvas) {
      const image = canvas.toDataURL('image/png')
      return image
    }
    const img = convertCanvasToImage(canvas)

    const data = [
      this.props.userImg !== 'null' ? `${this.props.userImg}?${new Date().getTime()}` : img1,
      img,
      img2,
    ]

    const len = data.length
    const c = document.getElementById('myCanvas')
    const ctx = c.getContext('2d')
    // 定义圆角矩形方法
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      if (w < 2 * r) r = w / 2
      if (h < 2 * r) r = h / 2
      this.beginPath()
      this.moveTo(x + r, y)
      this.arcTo(x + w, y, x + w, y + h, r)
      this.arcTo(x + w, y + h, x, y + h, r)
      this.arcTo(x, y + h, x, y, r)
      this.arcTo(x, y, x + w, y, r)
      this.closePath()
      return this
    }

    ctx.lineWidth = 1
    ctx.strokeStyle = '#989898'
    ctx.fillStyle = '#fff'
    ctx.roundRect(0, 0, 1200, 1800, 0).stroke()
    ctx.fill()
    ctx.closePath()
    // 铭牌上班部分 橙色
    ctx.beginPath()
    ctx.fillStyle = '#ee7700'
    ctx.fillRect(0, 0, 1200, 750)
    ctx.closePath()
    ctx.fill()
    // 上半部分中的 白色相框
    ctx.lineWidth = 1
    ctx.strokeStyle = '#fff'
    ctx.fillStyle = '#fff'
    ctx.roundRect(355.5, 117, 489, 489, 10).stroke()
    ctx.fill()
    // 铭牌下半部分 白色
    ctx.fillStyle = '#fff'
    ctx.font = '54px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(this.props.userName, 600, 675)
    ctx.closePath()
    ctx.beginPath()

    // 插入图片
    function drawing (num) {
      if (num < len) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = data[num]
        if (num === 0) {
          img.onload = function () {
            ctx.drawImage(img, 375, 135, 450, 450)
            drawing(num + 1)
          }
        } else if (num === 1) {
          img.onload = function () {
            ctx.borderRadius = 10
            ctx.drawImage(img, 345, 870, 510, 510)
            drawing(num + 1)
          }
        } else if (num === 2) {
          img.onload = function () {
            ctx.drawImage(img, 195, 1500, 843, 282)
            const mycans = c
            mycans.toBlob((blob) => {
              let url = URL.createObjectURL(blob)
              document.getElementById('download').href = url
              drawing(num + 1)
            })
          }
        }
      }
    }
    drawing(0)
  }

  componentDidUpdate () {

  }

  render () {
    return (
      <div>
        <div className={styles.brand_head}>
          <div className={styles.brand_part1}>
            <div className={styles.part1_div}></div>
            <div className={styles.img_box}>
              <img id="personHead" className={styles.brand_img1} src={this.props.userImg ? this.props.userImg : img1} alt="" />
            </div>
            <p>{this.props.userName}</p>
          </div>
          <div className={styles.brand_img2}>
            <QRCode value={this.props.urlCode} width={170} height={170} />
          </div>
            <img className={styles.brand_img3} src={img2} alt="" />
         </div>
        <canvas id="myCanvas" width="1200" height="1800" style={{ width: 400, height: 600, display: 'none' }} >
          您的浏览器不支持 HTML5 canvas 标签。
        </canvas>
        <a id="download" download="铭牌" href="" style={{ marginLeft: 150, marginTop: 15, marginBottom: 6, display: 'block' }}>下载推广铭牌</a>
        <p >
          温馨提示：座牌图片分辨率为1200X1800。可以到照相馆或者网上冲印店<br />使用6寸(4R)照片纸冲印。点击<Link to={{ pathname: this.props.agencyLabel ? '/company/companyInformation_m' : '/personal/personalInfo' }}>【这里】</Link>设置头像。
        </p>
      </div>

    )
  }
}

ImgCanvas.propTypes = {
  userImg: PropTypes.string,
  userName: PropTypes.string,
  urlCode: PropTypes.string,
  agencyLabel: PropTypes.bool,
}

export default ImgCanvas
