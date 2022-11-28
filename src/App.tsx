import React, { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    const localData = window.localStorage.getItem('localData');
    if (localData !== null) {
      setData(JSON.parse(localData) as ResultData);
    }
  }, []);

  const resultRef = useRef<ResultRef>(null);

  return (
    <div className="container">
      <h1 className="title">出入校申请生成器</h1>
      <Form data={data} setData={setData} downloadResult={() => resultRef.current?.downloadResult?.()} />
      <Result ref={resultRef} data={data} />
    </div>
  );
}
