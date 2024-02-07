import './App.css';
import { useState, useEffect } from 'react'
import Data from './deadline.json';
import {
  TwitterShareButton,
  XIcon,
} from "react-share"
import { FaGithub } from "react-icons/fa"

const App = () => {
  const [mode, setMode] = useState(0);
  const [type, setType] = useState(0);

  const limit = new Date(Data.data[type].year, Data.data[type].month - 1, Data.data[type].day, Data.data[type].hour, Data.data[type].minute,)
  const [data, setData] = useState((limit.getTime() - Date.now()) / 1000);

  const mode_array = [
    [1000, "秒"],
    [1000 * 60, "分"],
    [1000 * 60 * 60, "時間"],
    [1000 * 60 * 60 * 24, "日"],
    [1000 * 60 * 60 * 24 * 365, "年"]
  ];

  useEffect(() => {

    const interval = setInterval(() => {
      const now = new Date();
      const lim = new Date(Data.data[type].year,
        Data.data[type].month - 1,
        Data.data[type].day,
        Data.data[type].hour,
        Data.data[type].minute,);
      setData((lim.getTime() - now.getTime()));

    }, 50);

    return () => clearInterval(interval);
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, type]
  );

  const url = 'https://oshamashama.github.io/owarukana/'
  const content = `${Data.data[type].name} まで，あと${(data / mode_array[mode][0]).toFixed(3)} ${mode_array[mode][1]}`


  return <>
    <div className="App">
      <div
        role="button"
        tabIndex="0"
        onClick={() => setType((type + 1) % Data.data.length)}> {Data.data[type].name} まで，あと </div>
      <div
        role="button"
        tabIndex="0"
        onClick={() => setMode((mode + 1) % mode_array.length)}> {(data / mode_array[mode][0]).toFixed(3)} {mode_array[mode][1]}
      </div>

      <div className='info'>
        <TwitterShareButton url={url} title={`${content}`} hashtags={['owarukana']}
        >
          <XIcon size={60} round />
        </TwitterShareButton>
        <a href={'https://github.com/oshamashama/owarukana/'}>
          <FaGithub size={60} color='#FFFFFF' />
        </a>
      </div>
    </div >
  </>;
}

export default App;
