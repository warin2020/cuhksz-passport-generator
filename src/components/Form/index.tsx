import React from 'react';
import { ResultData } from '../Result';
import './index.scss';

export interface FormProps {
  data: ResultData;
  setData: React.Dispatch<React.SetStateAction<ResultData>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({
  data,
  setData,
  handleSubmit
}: FormProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value
    }));
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
        <input
          name="school"
          value={data.school}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>书院：</span>
        <input
          name="college"
          value={data.college}
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
