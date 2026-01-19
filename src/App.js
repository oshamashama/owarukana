import "./App.css";
import { useState, useEffect } from "react";
import datajson from "./deadline.json";
import { TwitterShareButton, XIcon } from "react-share";
import { FaGithub } from "react-icons/fa";
import { MdSwapHoriz } from "react-icons/md";

// Helper function to create a Date object in JST (UTC+9)
// The deadline dates in JSON are specified in JST timezone
const createJSTDate = (year, month, day, hour, minute) => {
  // Create a date string in ISO format for JST timezone
  // month is 1-indexed in the input, so we need to pad with 0
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00+09:00`;
  return new Date(dateStr);
};

const Data = datajson.data.filter((d) => {
  const dd = createJSTDate(d.year, d.month, d.day + 3, d.hour, d.minute);
  const now = new Date();
  return dd > now;
});
const App = () => {
  const [mode, setMode] = useState(0);
  const [type, setType] = useState(0);
  const limit = createJSTDate(
    Data[type].year,
    Data[type].month,
    Data[type].day,
    Data[type].hour,
    Data[type].minute
  );
  const [data, setData] = useState((limit.getTime() - Date.now()) / 1000);

  const mode_array = [
    [1000, "秒"],
    [1000 * 60, "分"],
    [1000 * 60 * 60, "時間"],
    [1000 * 60 * 60 * 24, "日"],
    [1000 * 60 * 60 * 24 * 365, "年"],
  ];

  useEffect(
    () => {
      const interval = setInterval(() => {
        const now = new Date();
        const lim = createJSTDate(
          Data[type].year,
          Data[type].month,
          Data[type].day,
          Data[type].hour,
          Data[type].minute
        );
        setData(lim.getTime() - now.getTime());
      }, 50);

      return () => clearInterval(interval);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, type]
  );

  const url = "https://oshamashama.github.io/owarukana/";
  const content = `${Data[type].name} まで，あと${(data / mode_array[mode][0]).toFixed(3)} ${mode_array[mode][1]}`;

  return (
    <>
      <div className="App">
        {data > 0 ? (
          <>
            <div
              role="button"
              tabIndex="0"
              onClick={() => setType((type + 1) % Data.length)}
            >
              <MdSwapHoriz style={{ verticalAlign: 'middle', marginRight: '0.2em' }} />
              {Data[type].name} まで，あと{" "}
            </div>
            <div
              role="button"
              tabIndex="0"
              onClick={() => setMode((mode + 1) % mode_array.length)}
            >
              <MdSwapHoriz style={{ verticalAlign: 'middle', marginRight: '0.2em' }} />
              {(data / mode_array[mode][0]).toFixed(3)} {mode_array[mode][1]}
            </div>
          </>
        ) : (
          <>
            <div
              role="button"
              tabIndex="0"
              onClick={() => setType((type + 1) % Data.length)}
            >
              <MdSwapHoriz style={{ verticalAlign: 'middle', marginRight: '0.2em' }} />
              {Data[type].name} から，既に{" "}
            </div>
            <div
              role="button"
              tabIndex="0"
              onClick={() => setMode((mode + 1) % mode_array.length)}
            >
              <MdSwapHoriz style={{ verticalAlign: 'middle', marginRight: '0.2em' }} />
              {-(data / mode_array[mode][0]).toFixed(3)} {mode_array[mode][1]}
              {" 経過🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"}
            </div>
          </>
        )}

        <div className="info">
          <TwitterShareButton
            url={url}
            title={`${content}`}
            hashtags={["owarukana"]}
          >
            <XIcon size={60} round />
          </TwitterShareButton>
          <a href={"https://github.com/oshamashama/owarukana/"}>
            <FaGithub size={60} color="#FFFFFF" />
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
