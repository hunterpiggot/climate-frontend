"use client";
import { ClimateNewsArticle } from "./ClimateNewsArticle";

import { useEffect, useRef, useState } from "react";

export const CLimateNewsCard = () => {
  const fakeNewsArticle = [
    {
      title:
        "These city maps show how much hotter it is from neighborhood to neighborhood",
      description:
        "An analysis of 44 cities shows which neighborhoods are hotter than others. It’s a problem called the urban heat island effect, and climate change is making it worse.",
      link: "https://www.google.com/",
    },
    {
      title: "The Safest Places to Be During a Hurricane",
      description:
        "A depressing byproduct of global climate change is more—and more powerful— hurricanes. With tropical storms and hurricanes even brewing in the Pacific Ocean now, everyone near either U.S. coast is potentially in danger from these vicious storms. But you can k…",
      link: "https://www.google.com/",
    },
    {
      title: "10 Facts That Prove the World Is in a Climate Emergency",
      description:
        "An analysis of 44 cities shows which neighborhoods are hotter than others. It’s a problem called the urban heat island effect, and climate change is making it worse.",
      link: "https://www.google.com/",
    },
  ];

  const scrollDivRef = useRef<any>(null);
  const [isTopFading, setIsTopFading] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = scrollDivRef.current.scrollTop;
      if (scrollPosition > 0) {
        setIsTopFading(true);
      } else {
        setIsTopFading(false);
      }
    };

    const currentScrollDivRef = scrollDivRef?.current;

    if (currentScrollDivRef) {
      currentScrollDivRef.addEventListener("scroll", handleScroll);

      return () => {
        currentScrollDivRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="overflow-hidden mb-[26px] relative z-0">
      <div className="text-[40px] leading-[59px] text-center">News</div>
      <div
        ref={scrollDivRef}
        className="pt-2.5 divide-y divide-solid divide-black px-1.5 overflow-y-scroll h-full no-scrollbar pb-20"
      >
        <ClimateNewsArticle
          title={fakeNewsArticle[0].title}
          description={fakeNewsArticle[0].description}
          link={fakeNewsArticle[0].link}
        />
        <ClimateNewsArticle
          title={fakeNewsArticle[1].title}
          description={fakeNewsArticle[1].description}
          link={fakeNewsArticle[1].link}
        />
        <ClimateNewsArticle
          title={fakeNewsArticle[2].title}
          description={fakeNewsArticle[2].description}
          link={fakeNewsArticle[2].link}
        />
        <ClimateNewsArticle
          title={fakeNewsArticle[2].title}
          description={fakeNewsArticle[2].description}
          link={fakeNewsArticle[2].link}
        />
      </div>
      {isTopFading ? (
        <div className="absolute inset-x-0 top-[59px] z-10 flex items-end justify-end h-10 bg-gradient-to-b from-dashboard-tile-3"></div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-end h-10 bg-gradient-to-t from-dashboard-tile-3"></div>
    </div>
  );
};
