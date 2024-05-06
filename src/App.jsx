import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions";
import Select from "react-select";
import { setTranslation } from "./redux/slices/translateSlice";

const App = () => {
  const { isLoading, error, languages } = useSelector(
    (store) => store.languageReducer
  );
  const answer = useSelector((store) => store.translateReducer);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const [text, setText] = useState();

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    setText(answer.translation);
    dispatch(setTranslation(text));
  };

  const formatedLangs = useMemo(
    () =>
      languages.map((lang) => ({
        value: lang.code,
        label: lang.name,
      })),
    [languages]
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  return (
    <div className="bg-black h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">It Means ++</h1>

        {error ? (
          <p className="text-center text-white bg-red-600 text-xl p-2 rounded ring-2 ring-white">
            There something wrong with server or internet !!!
          </p>
        ) : (
          <div className=" flex gap-2 text-black ">
            <Select
              isDisabled={isLoading}
              isLoading={isLoading}
              value={sourceLang}
              onChange={(e) => setSourceLang(e)}
              className="flex-1"
              options={formatedLangs}
            />
            <button
              onClick={handleSwap}
              className="rounded py-2 px-6 bg-orange-500 text-white transition hover:ring-white hover:ring-1 hover:bg-orange-700"
            >
              CHANGE
            </button>
            <Select
              isDisabled={isLoading}
              isLoading={isLoading}
              value={targetLang}
              onChange={(e) => setTargetLang(e)}
              className="flex-1"
              options={formatedLangs}
            />
          </div>
        )}
        <div className="flex mt-5 gap-3 md:gap-[130px] max-md:flex-col">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="resize-none w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
            ></textarea>
          </div>

          <div className="flex-1 relative">
            <textarea
              value={text ? answer.translation : undefined}
              disabled
              className="resize-none w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black bg-orange-200"
            ></textarea>

            {answer.isLoading ? (
              <div className="absolute top-[49%] left-[50%]  right-[50%]">
                <div className="loader "></div>
              </div>
            ) : (
              answer.error && (
                <p className="absolute top-[40%] left-[17%] w-[300px] text-center text-white bg-red-600 text-xl p-2 rounded ring-2 ring-white">
                  There something wrong with server or internet !!!
                </p>
              )
            )}
          </div>
        </div>
        <button
          onClick={handleTranslate}
          className="rounded py-2 px-6 bg-orange-500 text-white transition hover:ring-white hover:ring-1 
        hover:bg-orange-700 mt-3 max-md:w-full w-[50%] place-self-center"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
