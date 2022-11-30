import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import * as htmlToImage from 'html-to-image';
import logo from '../../assets/logo.png';
import './index.scss';

const d = new Date();
const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const collegeCNToEN = {
  '逸夫书院': 'SHAW',
  '学勤书院': 'DILIGENTIA',
  '思廷书院': 'MUSE',
  '祥波书院': 'HARMONIA',
  '道扬书院': 'LING'
}

export interface ResultData {
  stuNo: string;
  stuName: string;
  dormNo: string;
  school: string;
  college: string;
  phone: string;
}

export interface ResultRef {
  downloadResult: () => void;
}

export interface ResultProps {
  data: ResultData
}

export default forwardRef<ResultRef, ResultProps>(function Result(
  {
    data: {
      stuNo,
      stuName,
      dormNo,
      school,
      college,
      phone
    }
  },
  selfRef
) {
  const ref = useRef<HTMLDivElement>(null);

  const downloadResult = async () => {
    if (ref.current !== null) {
      // sb html-to-image在safari上有bug图片显示不出来，调用两次即可解决
      // https://github.com/tsayen/dom-to-image/issues/343#issuecomment-1259942481
      await htmlToImage.toBlob(ref.current);
      const blob = await htmlToImage.toBlob(ref.current);
      if (blob !== null) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = `出入校申请-${stuName}.png`;
        a.href = url;
        a.click();
      }
    }
  };

  useImperativeHandle(selfRef, () => ({
    downloadResult
  }));

  return (
    <div className="result" ref={ref}>
      <div className="nav-bar">
        <img className="logo" src={logo} />
        <span className="nav">我的申请</span>
        <span className="nav">我的任务</span>
        <span className="nav">个人中心</span>
        <span className="nav">回到旧版</span>
        <svg className="lang-icon" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="43" stroke="white" strokeWidth="7" fill="none" />
          <text x="23" y="63" fontSize="32pt" fill="white">EN</text>
        </svg>
      </div>
      <div className="content">
        <h2 className="title">出入校申请</h2>
        <div className="card">
          <ul className="tabs">
            <li className="tab active">申请表单</li>
            <li className="tab">疫苗信息</li>
          </ul>
          <div className="card-content">
            <div className="info">
              <div>
                <span>申请类型：离校不离深</span>
                <span className="valid-day"> 申请有效天数：1</span>
              </div>
              <div>
                有效期（从）：<span className="valid-start-date">{date}</span> 到 <span className="valid-end-date">{date}</span>
              </div>
              <div>
                当前申请单状态： <span className="pass-tag">审批通过</span>
              </div>
              <div>
                类别：<span>临时外出</span>
              </div>
            </div>
            <div className="sub-card">
              <h3 className="sub-card-head">基本信息</h3>
              <ul className="sub-card-content">
                <li className="item">
                  <label className="label">学号</label>
                  <div className="value">
                    <input className="input" readOnly value={stuNo} />
                  </div>
                </li>
                <li className="item">
                  <label className="label">姓名</label>
                  <div className="value">
                    <input className="input" readOnly value={stuName} />
                  </div>
                </li>
                <li className="item">
                  <label className="label">宿舍号</label>
                  <div className="value">
                    <input className="input" readOnly value={dormNo} />
                  </div>
                </li>
                <li className="item">
                  <label className="label">学院</label>
                  <div className="value">
                    <input className="input" readOnly value={school} />
                  </div>
                </li>
                <li className="item">
                  <label className="label">书院</label>
                  <div className="value">
                    <input className="input" readOnly value={college} />
                  </div>
                </li>
                <li className="item">
                  <label className="label">联系电话</label>
                  <div className="value">
                    <input className="input" readOnly value={phone} />
                  </div>
                </li>
                <li className="item">
                  <label className="label">计划离校日期</label>
                  <div className="value">
                    <input className="input" readOnly value={date} />
                  </div>
                </li>
                <li className="item">
                  <label className="label">计划返校日期</label>
                  <div className="value">
                    <input className="input" readOnly value={date} />
                  </div>
                </li>
                <li className="item">
                  <label className="label">类别</label>
                  <div className="value">
                    <input className="input" readOnly value="临时外出" />
                  </div>
                </li>
                <li className="item">
                  <label className="label">审批部门</label>
                  <div className="value">
                    <span className="text"> {collegeCNToEN[college]} </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="sub-card">
              <h3 className="sub-card-head">目的地 1</h3>
              <ul className="sub-card-content">
                <li className="item">
                  <label className="label">省/直辖市</label>
                  <div className="value">
                    <input className="input" readOnly value="广东" />
                  </div>
                </li>
                <li className="item">
                  <label className="label">区/市</label>
                  <div className="value">
                    <input className="input" readOnly value="深圳" />
                  </div>
                </li>
                <li className="item">
                  <label className="label">区/县</label>
                  <div className="value">
                    <input className="input" readOnly value="龙岗区" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})
