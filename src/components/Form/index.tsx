import React from 'react';
import { ResultData } from '../Result';
import './index.scss';

const schools = [
  '理工学院',
  '经管学院',
  '人文社科学院',
  '数据科学学院',
  '生命与健康科学学院'
];

const colleges = [
  '逸夫书院',
  '学勤书院',
  '思廷书院',
  '祥波书院',
  '道扬书院'
];

export interface FormProps {
  data: ResultData;
  setData: React.Dispatch<React.SetStateAction<ResultData>>;
  downloadResult: () => void;
}

export default function Form({
  data,
  setData,
  downloadResult
}: FormProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    window.localStorage.setItem('localData', JSON.stringify(data));
    downloadResult();
    e.preventDefault();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        <span>学号：</span>
        <input
          name="stuNo"
          value={data.stuNo}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>姓名：</span>
        <input
          name="stuName"
          value={data.stuName}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>宿舍号：</span>
        <input
          name="dormNo"
          value={data.dormNo}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>学院：</span>
        <select
          name="school"
          value={data.school}
          onChange={handleChange}
        >
          {schools.map((school, index) => (
            <option value={school} key={index}>{school}</option>
          ))}
        </select>
      </label>
      <label>
        <span>书院：</span>
        <select
          name="college"
          value={data.college}
          onChange={handleChange}
        >
          {colleges.map((college, index) => (
            <option value={college} key={index}>{college}</option>
          ))}
        </select>
      </label>
      <label>
        <span>联系电话：</span>
        <input
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
      </label>
      <input
        className="submit"
        type="submit"
        value="生成出入校申请"
      />
    </form>
  );
}
