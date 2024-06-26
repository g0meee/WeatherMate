import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

/** 날씨에 따른 의상 추천 & 이미지 보여주기 */
function TodaysComent() {
  const userWeather = useRecoilValue(userWeatherState); // Recoil 상태만 가져오기
  const [recomendClothes, setRecomendClothes] = useState(null);
  const [recommendationImage, setRecommendationImage] = useState(null);
  // const [mainImgUrl, setMainImgUrl] = useState(null);
  useEffect(() => {
    const getRecommendedClothes = () => {
      const userTemperature = userWeather?.main.temp - 273.15;
      // test할 때 여기 온도 바꿔서 테스 디폴트는 273.15
      // 4도 이하일 땐 298.15
      // 8도 이하일 땐 291.15
      // 12도 이하일 땐 289.15
      // 16도 이하일 땐 285.15
      // 19도 이하일 땐 281.15
      // 22도 이하일 땐 278.15
      // 27도 이하일 땐 273.15
      // 29도 이하일 땐 271

      console.log('현재온도', userTemperature);
      let closestTemperature = dummyData[0].temperature; // 가장 가까운 온도로 초기화
      let selectedDummyData = dummyData[0]; // 가장 가까운 온도에 해당하는 데이터로 초기화

      // 더미 데이터를 기반으로 가장 가까운 온도 선택
      for (let i = 1; i < dummyData.length; i++) {
        if (
          Math.abs(userTemperature - dummyData[i].temperature) <
          Math.abs(userTemperature - closestTemperature)
        ) {
          closestTemperature = dummyData[i].temperature;
          selectedDummyData = dummyData[i];
        }
      }
      setRecomendClothes(selectedDummyData?.recommendation);
      setRecommendationImage(selectedDummyData?.CLOTHES_IMG);
    };

    getRecommendedClothes();
  }, [userWeather]);

  // 메인화면 애니메이션
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    tl.from('.comment-text', { opacity: 0, x: -100, duration: 1 });
    tl.from('.comment-text2', { opacity: 0, x: 100, duration: 1 });
    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const imagePath = recommendationImage;
  const fileName = imagePath; // 경로에서 파일 이름 추출

  console.log(fileName, 'xxxx');

  return (
    <div className=" w-full text-[1.775rem] font-bold h-[300px] font-UhBeeKang-Ja">
      <div className="p-5">
        <div className=" w-full ml-8 mt-[72px] ">
          {/* user name 받아와 저장해야합니다 */}
          <div className=" w-[350px] flex flex-wrap">
            <p className="text-primary mb-3">짱구님 안녕하세요?</p>
            <p className="comment-text whitespace-normal truncate ">
              {recomendClothes}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="">
          {/* {메인 캐릭터 이미지 추가 } */}
          <img
            src={fileName}
            alt="main-img"
            className="w-[200px] pl-9 ml-32 comment-text2 "
          />
        </div>
      </div>
    </div>
  );
}

export default TodaysComent;
