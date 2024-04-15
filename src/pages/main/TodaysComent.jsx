import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';
import { useEffect, useState } from 'react';

/** 날씨에 따른 의상 추천 & 이미지 보여주기 */
function TodaysComent() {
  const userWeather = useRecoilValue(userWeatherState); // Recoil 상태만 가져오기
  const [recomendClothes, setRecomendClothes] = useState(null);
  const [recommendationImage, setRecommendationImage] = useState(null);

  useEffect(() => {
    const getRecommendedClothes = () => {
      const userTemperature = userWeather?.main.temp - 273.15;
      let selectedDummyData;
      // 더미 데이터를 기반으로 온도에 따른 추천 선택
      for (let i = 0; i < dummyData.length; i++) {
        if (userTemperature <= dummyData[i].temperature) {
          selectedDummyData = dummyData[i];
          break;
        }
      }
      setRecomendClothes(selectedDummyData?.recommendation);
      setRecommendationImage(selectedDummyData?.IMG_URL); // 추천 이미지 설정
    };
    getRecommendedClothes();
  }, [userWeather]); // userWeather가 변경될 때마다 실행

  const imagePath = recommendationImage;
  const fileName = imagePath?.split('/').pop(); // 경로에서 파일 이름 추출

  return (
    <div className="bg-primary text-white w-full text-2xl font-bold h-[300px]">
      <div className="p-5">
        <div className="ml-8 mt-[72px] mr-[103px]">
          <h1>짱구님</h1>
          오늘은 {recomendClothes}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[160px] h-[160px] bg-white"></div>
      </div>
      <img src={fileName} className="" style={{ display: 'none' }} />
    </div>
  );
}

export default TodaysComent;