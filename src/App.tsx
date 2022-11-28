import React, { useState, useRef } from 'react';
import Result, { ResultRef, ResultData } from './components/Result';
import Form from './components/Form';
import './index.scss';
import './reset.scss';

export default function App() {
  const [data, setData] = useState<ResultData>({
    stuNo: "000000000",
    stuName: "杜子德",
    dormNo: "Z999",
    school: "理工学院",
    college: "逸夫书院",
    phone: "11111111111"
  });

  const resultRef = useRef<ResultRef>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    resultRef.current?.downloadResult();
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="title">出入校申请生成器</h1>
      <Form data={data} setData={setData} handleSubmit={handleSubmit} />
      <Result ref={resultRef} data={data} />
    </div>
  );
}
